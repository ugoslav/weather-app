import { useEffect, useState } from "react"
import axios from "axios"

import FilterName from "./components/FilterName"
import Heading from "./components/Heading"
import Display from "./components/Display"
import "./styles/main.css"

const App = () => {

  const [countries , setCountries] = useState([])
  const [countriesToShow , setCountriesToShow] = useState([])
  const [filterValue , setFilterValue] = useState("")
  const [emptyInputField , setEmptyInputField] = useState(true)
  const [displayType , setDisplayType] = useState(0)

  useEffect(() => {
    const data = axios.get("https://restcountries.com/v3.1/all")
    data.then(response => {
      setCountries(response.data)
    })
  },[])

  const filterHandler = (e) => setFilterValue(e.target.value)

  const submitHandler = (e) => {
    e.preventDefault()
    if(!filterValue)
    {
      console.log("displayType is 0")
      setEmptyInputField(true)
      setCountriesToShow([])
      setDisplayType(0)
    }
    else
    {
      setEmptyInputField(false)
      let filteredNames = countries.filter(country => country.name.common.toLowerCase().includes(filterValue.toLowerCase()))
      if(filteredNames.length > 5)
      {
        setCountriesToShow([])
        setEmptyInputField(false)
        setDisplayType(1)
      }
      else
      {
        setCountriesToShow(filteredNames)
        setEmptyInputField(false)

        if(filteredNames.length > 1)
          setDisplayType(2)

        else if(filteredNames.length === 1)
          setDisplayType(3)

        else if(filteredNames.length === 0)
          setDisplayType(4)

      }
    }
  }

  const resetHandler = () => {
    setEmptyInputField(true)
    setCountriesToShow([])
    setFilterValue("")
  }

  return(
    <div className="main">
      <Heading heading="Countries" />
      <FilterName 
        filterValue={filterValue}
        filterHandler={filterHandler}
        submitHandler={submitHandler}
        resetHandler={resetHandler}
        emptyInputField={emptyInputField}
      />
      {countries.length !== 0 ? null : <h3>Please wait,loading data...</h3>}
      <Display displayType={displayType} countriesToShow={countriesToShow}/>
    </div>
  )
}

export default App