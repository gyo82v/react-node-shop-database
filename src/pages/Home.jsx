import { useState } from "react"
import FormEl from "../components/FormEl"

export default function Home(){
    const [formdata, setFormdata] = useState({name : "", category : "", qty : "", price : "", available : true})

    const handleChange = e => {
        const {name, value, type} = e.target 
        if (type === "radio" && name === "available") {
           setFormdata((p) => ({ ...p, available: value === "true" }));
          return;
        }
        setFormdata(f => ({...f , [name] : value}))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        
        const qty = Number(formdata.qty)
        const price = Number(formdata.price)
        if(!formdata.name.trim()) {console.log("Name is required"); return}
        if(!formdata.category.trim()) {console.log("Category is required"); return}
        if(!Number.isFinite(qty) && qty < 0) {console.log("Qty must be a positive number"); return}
        if(!Number.isFinite(price) && price <= 0) {console.log("Price must be a positive number"); return}

        const payload = {
            name : formdata.name,
            category : formdata.category,
            qty,
            price,
            available : formdata.available
        }

        try {
            const res = await fetch("http://localhost:8000/", {
                method : "POST",
                headers : {"Content-Type": "application/json"},
                body : JSON.stringify(payload)
            })
            if(!res.ok) throw new Error("respose error POST")
            setFormdata({name : "", category : "", qty : "", price : "", available : true})
        } catch (err) {
            console.error("there was an error POST /", err)
        }
    }
    return(
        <section className="p-4 flex flex-col items-center">
            <FormEl data={formdata} handleChange={handleChange} handleSubmit={handleSubmit} />
        </section>
    )
}