// server/server.js
import http from "node:http";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { PGlite } from "@electric-sql/pglite";

const PORT = 8000;

// modern ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// directory where PGlite will persist DB files
const DB_DIR = path.join(__dirname, "pglite-db");

// helper to send responses
function serveResponse(res, statusCode, contentType, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", contentType);
  if (contentType.includes("json")) {
    res.end(JSON.stringify(payload));
  } else {
    res.end(String(payload));
  }
}

// Initialize DB and schema
async function initDb() {
  // ensure directory exists
  await fs.mkdir(DB_DIR, { recursive: true });

  // create/open PGlite instance (persisted to DB_DIR)
  const db = await PGlite.create(DB_DIR);

  // create the stock table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS stock (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT,
      qty INTEGER,
      price INTEGER,
      available BOOLEAN
    );
  `);

  // seed data if empty
  const countRes = await db.query("SELECT COUNT(*)::int AS count FROM stock;");
  const count = (countRes.rows && Number(countRes.rows[0].count)) || 0;
  if (count === 0) {
    await db.exec(`
      INSERT INTO stock (name, category, qty, price, available) VALUES
      ('Candles', 'Accessories', 32, 5, true),
      ('Soap', 'Bath', 20, 4, true),
      ('Sponge', 'Bath', 50, 3, true),
      ('Sofa', 'House', 5, 500, false),
      ('Table', 'House', 10, 80, true),
      ('Tv', 'Eletronic', 20, 230, true),
      ('Microwave', 'Eletronic', 30, 50, true),
      ('Mirror', 'House', 10, 140, true),
      ('Coach', 'House', 12, 300, false),
      ('Carpet', 'House', 30, 50, true);
    `);
  }

  return db;
}

const dbPromise = initDb();

const server = http.createServer(async (req, res) => {
  // CORS for local development
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // wait for DB ready
  const db = await dbPromise;

  // GET / => return all stock items
  if (req.url === "/" && req.method === "GET") {
    try {
      const result = await db.query("SELECT * FROM stock ORDER BY id DESC;");
      console.log("result: ", result)
      serveResponse(res, 200, "application/json", { rows: result.rows });
    } catch (err) {
      console.error("DB error on GET /:", err);
      serveResponse(res, 500, "application/json", { error: "DB error" });
    }
    return;
  }

  // POST / => insert a new stock item
  if (req.url === "/" && req.method === "POST") {
    let body = "";

    try {
      // read the request body with async iterator (for await)
      for await (const chunk of req) {
        body += chunk;
        // optional: protect against huge bodies
        if (body.length > 1e6) {
          req.socket.destroy();
          return;
        }
      }

      const payload = body ? JSON.parse(body) : {};

      // Validation
      const errors = [];

      // name - required
      const name = (payload.name || "").toString().trim();
      if (!name) errors.push("Field 'name' is required");

      // category - optional
      const category = payload.category !== undefined && payload.category !== null
        ? String(payload.category).trim()
        : null;

      // qty - optional integer (>=0) or null
      let qty = null;
      if (payload.qty !== undefined && payload.qty !== null && payload.qty !== "") {
        const parsedQty = Number(payload.qty);
        if (!Number.isInteger(parsedQty) || parsedQty < 0) {
          errors.push("Field 'qty' must be an integer >= 0");
        } else {
          qty = parsedQty;
        }
      } else {
        qty = null;
      }

      // price - optional integer (>=0) or null
      let price = null;
      if (payload.price !== undefined && payload.price !== null && payload.price !== "") {
        const parsedPrice = Number(payload.price);
        if (!Number.isFinite(parsedPrice) || !Number.isInteger(parsedPrice) || parsedPrice < 0) {
          errors.push("Field 'price' must be an integer >= 0");
        } else {
          price = parsedPrice;
        }
      } else {
        price = null;
      }

      // available - optional boolean or null
      let available = null;
      if (payload.available !== undefined && payload.available !== null && payload.available !== "") {
        if (typeof payload.available === "boolean") {
          available = payload.available;
        } else if (payload.available === "true" || payload.available === "false") {
          available = payload.available === "true";
        } else {
          errors.push("Field 'available' must be a boolean (true/false)");
        }
      } else {
        available = null;
      }

      if (errors.length) {
        serveResponse(res, 400, "application/json", { errors });
        return;
      }

      // Parameterized insert to prevent SQL injection
      const insertQuery = `
        INSERT INTO stock (name, category, qty, price, available)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      const params = [name, category, qty, price, available];

      const insertRes = await db.query(insertQuery, params);
      serveResponse(res, 201, "application/json", { item: insertRes.rows[0] });
    } catch (err) {
      console.error("Error handling POST /:", err);
      serveResponse(res, 400, "application/json", { error: "Invalid JSON or DB error" });
    }
    return;
  }

  // fallback
  serveResponse(res, 404, "text/plain", "Not found");
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
