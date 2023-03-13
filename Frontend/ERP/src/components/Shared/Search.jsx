import React from 'react'
import { FaSearch } from 'react-icons/fa'

const Search = () => {
    return (
        <div className="w-1/2 my-4 relative ">
            <input type="search" id='general__search'
                className="block  appearance-none w-full  p-2 pl-10 text-md text-orange
                     placeholder:text-orange placeholder:opacity-50 border border-orange rounded-lg focus:ring-orange focus:border-orange outline-none"
                placeholder="Looking for ..." required
            />
            <FaSearch color='#e04e17' className="absolute left-2 inset-y-3 " />
        </div>
    )
}

export default Search