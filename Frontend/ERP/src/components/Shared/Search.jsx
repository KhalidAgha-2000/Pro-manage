import { useContext, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Context } from '../../Context/Context'

const Search = () => {
    const { setSearch } = useContext(Context)
    const [timeoutId, setTimeoutId] = useState(null);

    const handleChange = (e) => {
        // Clear the existing timeout
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Set a new timeout to execute the function after 500ms of inactivity
        setTimeoutId(setTimeout(() => {
            setSearch(e.target.value)
        }, 2000));
    };

    useEffect(() => {
        // Clear the timeout when the component unmounts
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);


    return (
        <div className="w-1/2 my-4 relative ">
            <input type="search" id='general__search'
                className="block appearance-none w-full p-2 pl-10 text-md text-orange
                     placeholder:text-orange placeholder:opacity-50 
                     rounded-lg focus:ring-orange focus:border-orange outline-none"
                placeholder="Looking for ..."
                onChange={handleChange}
            />
            <FaSearch color='#e04e17' className="absolute left-2 inset-y-3 " />
        </div>
    )
}

export default Search