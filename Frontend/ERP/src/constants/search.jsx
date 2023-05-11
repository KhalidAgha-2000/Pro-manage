
// Search Function
export const filteredArrayToSearch = (dataToFilter, keyToFilter, search) => {
    const filteredAdminsToSearch = dataToFilter.filter(val => {
        if (search === '') {
            return dataToFilter;
        } else if (val[keyToFilter].toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
            return val;
        }
    });
    return filteredAdminsToSearch
}


// No Value Match
const NoValueMatchSeaarch = () => {
    return (
        <h1 className='w-fit h-fit m-auto p-3 my-8 rounded-md bg-orange text-lg font-alkatra text-light'>
            No value match your search input
        </h1>
    )
}

export default NoValueMatchSeaarch