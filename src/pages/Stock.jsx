import { useState, useEffect } from "react"
import StockItem from "../components/StockItem"

export default function Stock(){
    const [items, setItems] = useState([])
    const container = `p-4 flex flex-col gap-4 
                       md:flex-row md:flex-wrap md:items-center md:justify-center 
                       md:my-10`

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:8000/stock")
                if(!res.ok){throw new Error("Unable to fetch the data")}
                const data = await res.json()
                setItems(data.rows)
            } catch (err) {
                console.error("there was an error fetching the data: ", err) 
            }
        }
        fetchData()
    }, [])

    const itemsArr = items.map(i => <StockItem key={i.id} data={i} />)

    return(
        <section className={container}>
            {itemsArr}
        </section>
    )
}