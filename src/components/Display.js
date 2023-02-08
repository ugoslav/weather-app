import { useState } from "react"

const Country =( {name , capital , area , languages , flag , alt , showTheDetails , multiple } ) => {
    const [showDetails , setShowDetails] = useState(showTheDetails)
    const languageCodes = Object.keys(languages)
    return(
        <>
            {multiple === "yes" 
                ? <h3>{name} <button onClick={() => setShowDetails(!showDetails)}>{!showDetails ? "expand" : "contract"}</button></h3>
                : <h3>{name}</h3>
            }
            
            {
                showDetails  || (multiple === "no")
                    ? 
                    <>
                        <h3>Capital : {capital}</h3>
                        <h4>Area : {area}</h4>
                        <h3>Languages : </h3>
                        <ul>
                            {languageCodes.map(code => {
                                return <li key={code}>{languages[code]}</li>
                            })}
                        </ul>
                        <img src={flag} alt={alt} />
                    </>
                    : null
            }
        </>
    )
}


const Display = ( {displayType , countriesToShow} ) => {
    return(
        <>
            {
                  (displayType === 0) ? null 

                : (displayType === 1) ? <h3>Sorry,there are way too many countries.Please be more specific...</h3>

                : (displayType === 2) ? (
                    <>
                        {countriesToShow.map(country => {
                            return <Country 
                                key={country.cca2} 
                                name={country.name.common} 
                                capital={country.capital[0]}
                                area={country.area}
                                languages={country.languages}
                                flag={country.flags.png}
                                alt={country.flags.alt}
                                showTheDetails={false}
                                multiple="yes" 
                            />
                        })}
                    </>
                )

                : (displayType === 3) ? (
                    <>
                        {countriesToShow.map(country => {
                            return <Country 
                                key={country.cca2} 
                                name={country.name.common} 
                                capital={country.capital[0]}
                                area={country.area}
                                languages={country.languages}
                                flag={country.flags.png}
                                alt={country.flags.alt}
                                showTheDetails={true}
                                multiple="no"
                            />
                        })}
                    </>
                )

                : <h3>Sorry no countries found</h3>
            }
        </>
    )
}

export default Display