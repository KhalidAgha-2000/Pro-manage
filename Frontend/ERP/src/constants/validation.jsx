
// Validation
var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const checkIfEmpty = (obj, email) => {
    let status = false
    for (let key in obj) {
        if (obj[key] === "" || !validRegex.test(email)) {
            // if (obj[key] === "" || !validRegex.test(formValues.email)) {
            status = true
        }
    }
    return status;
}
export default checkIfEmpty