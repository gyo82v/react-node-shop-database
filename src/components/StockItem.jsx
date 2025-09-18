export default function StockItem({data}){
    const container = `bg-gradient-to-br from-slate-300 to-slate-200 
                       p-4 rounded-lg shadow-lg shadow-slate-700/30 text-slate-500
                       transition-transform transition-colors transition-shadow duration-300 ease-in-out 
                       hover:cursor-pointer hover:scale-105 hover:shadow-xl hover:from-slate-400 hover:to-slate-300
                       md:w-90`
    const span = `font-semibold mr-2 text-slate-700`
    return(
        <section className={container}>
            <h2 className="font-bold">
                <span className={span}>Item: </span>
                <span className="italic text-lg">{data.name}</span>
            </h2>
            <p><span className={span}>Category: </span>{data.category}</p>
            <p><span className={span}>Qty: </span>{data.qty}</p>
            <p><span className={span}>Price: </span>£{data.price}</p>
            <p>
                <span className={span}>Available: </span>
                {data.available ? 
                <span className="text-green-500 font-bold">True</span> : 
                <span className="text-amber-700 font-bold">False</span>
                }
            </p>
        </section>
    )
}