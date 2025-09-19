CREATE TABLE IF NOT EXISTS stock (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  qty INTEGER,
  price INTEGER,
  available BOOLEAN
);
