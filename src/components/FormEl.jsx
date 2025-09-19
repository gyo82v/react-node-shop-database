export default function FormEl({data, handleSubmit, handleChange}){
    const transition = `transition-transform transition-colors transition-shadow duration-300 ease-in-out`  
    const shadowAndRadius = `shadow-lg shadow-slate-700/30 rounded-lg p-4`
  
    const form = `flex flex-col gap-3 text-slate-600 w-11/12 md:w-5/12 xl:w-4/12
                  bg-gradient-to-br from-slate-300 to-slate-200 mt-10`
    const input = `bg-slate-100 text-slate-700 text-semibold border-2 border-slate-200
                   focus:outline-none focus:ring-2 focus:bg-slate-200 focus:ring-slate-500 focus:scale-105 
                   focus:shadow-xl hover:border-slate-500`
    const btn = `bg-gradient-to-br from-slate-600 to-slate-500 text-slate-200 font-bold text-lg  
                 hover:scale-110 active:scale-95 hover:shadow-xl hover:from-slate-500 hover:to-slate-600 `
    const fieldset = `border border-slate-500 rounded-lg p-4 flex gap-4 items-center`

    return (
        <form className={`${form} ${shadowAndRadius}`} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter name..."
              aria-label="Enter name"
              className={`${input} ${transition} ${shadowAndRadius}`}
              value={data.name}
              onChange={handleChange}
              required 
            />
            <input
              type="text"
              name="category"
              placeholder="Enter the category..."
              aria-label="Enter the category"
              className={`${input} ${transition} ${shadowAndRadius}`}
              value={data.category}
              onChange={handleChange}
              required
            />
            <input 
              type="number"
              name="qty"
              placeholder="Enter the quantity..."
              aria-label="Enter the quantity"
              className={`${input} ${transition} ${shadowAndRadius} no-spinner`}
              value={data.qty}
              onChange={handleChange}
              required
            />
            <input 
              type="number"
              name="price"
              placeholder="Enter the unit price..."
              aria-label="Enter the unit price"
              className={`${input} ${transition} ${shadowAndRadius} no-spinner`}
              value={data.price}
              onChange={handleChange}
              required
            />
            <fieldset className={fieldset}>
                <legend className="ml-3 font-semibold">Is the item ready available?</legend>
                <label>
                    <input
                      type="radio"
                      name="available"
                      value="true"
                      checked={data.available === true}
                      onChange={handleChange}
                      className="accent-slate-500 mr-1"
                    />
                    True
                </label>
                <label>
                    <input 
                      type="radio"
                      name="available"
                      value="false"
                      checked={data.available === false}
                      onChange={handleChange}
                      className="accent-slate-500 mr-1"
                    />
                    False
                </label>
            </fieldset>
            <button className={`${btn} ${transition} ${shadowAndRadius}`} type="submit">Add Item to the stock</button>
        </form>
    )
}