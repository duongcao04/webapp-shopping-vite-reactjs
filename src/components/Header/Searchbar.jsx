import React, { useState } from "react"
import { BiSearch } from "react-icons/bi";

import Input from "@/components/ui/Input"

function Searchbar() {
  const [isCollapse, setIsCollapse] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const handleSearch = () => {
    window.location = (`/san-pham?name=${searchKey}`)
  }

  return (
	<React.Fragment>
    <div className="flex justify-end mr-10">
      <div className={`relative ${isCollapse ? 'w-[95%]' : 'w-[40%]'}`}>
        <Input className={'w-full h-9 border-none rounded-full placeholder:text-xs text-sm p-4 bg-white-300'} placeholder={'Search Product'} 
          onFocus={() => setIsCollapse(true)} 
          onBlur={()=>setIsCollapse(false)}
          value={searchKey}
            onChange={(e)=>setSearchKey(e.target.value)}
          />
        <BiSearch className="absolute right-3 top-[10px] cursor-pointer" onClick={handleSearch}/>
      </div>
    </div>
  </React.Fragment>
  )
}

export default Searchbar