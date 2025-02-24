const FilterMenu = () => {
    return(
    <div className="filter sort flex-row flex-wrap gap-5 hidden md:block w-[20vw] h-full bg-gray-700 text-white ">
        <input type="text" className="focus-visible:outline-none text-black" placeholder="/Type to filter..."></input>
        <select className="bg-gray-800" >
          <option>tags</option>
          <option>content</option>
          <option>title</option>
        </select>
        <select className="bg-gray-800" >
          <option>date created (latest)</option>
          <option>date modified (latest)</option>
          <option>completed (most)</option>
        </select>
        <select className="bg-gray-800" >
          <option>high to low</option>
          <option>low to high</option>
        </select>
      </div>
    )
}

export default FilterMenu;