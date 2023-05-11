
const Circles = ({ className1, className2, className3 }) => {
    return (
        <>
            <span className={`absolute object-cover rounded-full ${className1}`} />
            <span className={`absolute object-cover rounded-full ${className2}`} />
            <span className={`absolute object-cover rounded-full ${className3}`} />
        </>
    )
}

export default Circles