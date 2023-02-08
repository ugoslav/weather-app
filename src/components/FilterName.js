import "../styles/filterName.css"

const FilterName = ({ filterValue , filterHandler , submitHandler , resetHandler , emptyInputField}) => {
    return(
        <>
            <form onSubmit={submitHandler}>
                <input type="text" value={filterValue} onChange={filterHandler} className="inputbar" placeholder="Type the name here..."/>
                <button type="submit" className="firstButton">GO!</button>
                {emptyInputField ? null : <button type="submit" onClick={resetHandler}>Reset</button>}
            </form>
        </>
    )
}

export default FilterName