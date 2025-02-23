const FilterMenu = () => {
    return(
    <div className="filter sort flex flex-nowrap flex-col flex-initial fixed bottom-6 left-2">
        <input type="text" className="flex-none" placeholder="/Type to filter..."></input>
        <select className="flex-none" >
          <option>tags</option>
          <option>content</option>
          <option>title</option>
        </select>
        <select className="flex-none" >
          <option>date created (latest)</option>
          <option>date modified (latest)</option>
          <option>completed (most)</option>
        </select>
        <select className="flex-none" >
          <option>high to low</option>
          <option>low to high</option>
        </select>
      </div>
    )
}

export default FilterMenu;