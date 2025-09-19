import { useState, useEffect } from "react"
import FormEl from "../components/FormEl"

export default function Home(){
    const [formdata, setFormdata] = useState({name : "", category : "", qty : "", price : "", available : true})

    const container = `p-4 flex flex-col items-center`

    const handleChange = e => {
        const {name, value, type} = e.target 
        if (type === "radio" && name === "available") {
           setFormdata((p) => ({ ...p, available: value === "true" }));
          return;
        }
        setFormdata(f => ({...f , [name] : value}))
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log("submit: ",formdata)
    }
    return(
        <section className={container}>
            <FormEl data={formdata} handleChange={handleChange} handleSubmit={handleSubmit} />
        </section>
    )
}