export default function FormEl({data, handleSubmit, handleChange}){
    const form = `flex flex-col gap-3 text-slate-600 w-11/12 md:w-5/12 xl:w-4/12
                  bg-gradient-to-br from-slate-300 to-slate-200 
                  p-4 rounded-lg shadow-lg shadow-slate-700/30 
                  mt-10`
    const input = `bg-slate-100 rounded-lg p-4 shadow-lg shadow-slate-700/30 
                   text-slate-700 text-semibold border-2 border-slate-200
                   transition-transform transition-colors transition-shadow duration-300 ease-in-out 
                   focus:outline-none focus:ring-2 focus:bg-slate-200 focus:ring-slate-500 focus:scale-105 
                   focus:shadow-xl hover:border-slate-500`
    const btn = `bg-gradient-to-br from-slate-600 to-slate-500 text-slate-200 font-bold text-lg 
                 rounded-lg p-4 shadow-lg shadow-slate-700/30
                 transition-transform transition-colors transition-shadow duration-300 ease-in-out 
                 hover:scale-110 active:scale-95 hover:shadow-xl hover:from-slate-500 hover:to-slate-600 `
    const fieldset = `border border-slate-500 rounded-lg p-4 flex gap-4 items-center`
    const legend = `ml-3 font-semibold`
    const inputRadio = `accent-slate-500`
    const label = ``
    return (
        <form className={form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter name..."
              aria-label="Enter name"
              className={input}
              value={data.name}
              onChange={handleChange}
              required 
            />
            <input
              type="text"
              name="category"
              placeholder="Enter the category..."
              aria-label="Enter the category"
              className={input}
              value={data.category}
              onChange={handleChange}
              required
            />
            <input 
              type="number"
              name="qty"
              placeholder="Enter the quantity..."
              aria-label="Enter the quantity"
              className={`${input} no-spinner`}
              value={data.qty}
              onChange={handleChange}
              required
            />
            <input 
              type="number"
              name="price"
              placeholder="Enter the unit price..."
              aria-label="Enter the unit price"
              className={`${input} no-spinner`}
              value={data.price}
              onChange={handleChange}
              required
            />
            <fieldset className={fieldset}>
                <legend className={legend}>Is the item ready available?</legend>
                <label className={label}>
                    <input
                      type="radio"
                      name="available"
                      value="true"
                      checked={data.available === true}
                      onChange={handleChange}
                      className={inputRadio}
                    />
                    True
                </label>
                <label className={label}>
                    <input 
                      type="radio"
                      name="available"
                      value="false"
                      checked={data.available === false}
                      onChange={handleChange}
                      className={inputRadio}
                    />
                    False
                </label>
            </fieldset>
            <button className={btn} type="submit">Add Item to the stock</button>
        </form>
    )
}