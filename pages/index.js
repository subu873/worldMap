import React, {Fragment, useState} from "react";
import styles from "../styles/Home.module.css"
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import Loader from "react-loader-spinner";
import {rounded} from "../utils/helper";
import {useRouter} from "next/router";


const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const WorldMap = () => {

    const router = useRouter()
    const [content, setContent] = useState("");
    const [countryName, setCountryName] = useState("")
    const [countryFullName, setCountryFullName] = useState("")
    const [population, setPopulation] = useState('')
    const [loader, setLoader] = useState(false)


    return (
        <div className="container">
            <div className="col-md-12">

                <div className="tooltip-ex">
                    <span className="tooltip-ex-text tooltip-ex-top">
                        {!loader &&
                        <Fragment>
                            <div className="col-md-12 text-center">
                                <img
                                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryName}.svg`}
                                    className={styles.flagIcon} alt={countryName}/>
                                <p>{countryFullName}</p>
                                <p>Population - {rounded(population)}</p>
                            </div>
                        </Fragment>
                        }

                        {loader &&
                        <Loader color={"#fff"} type="Oval" width={45} height={45}/>
                        }
                    </span>
                </div>

                <ComposableMap data-tip="" projectionConfig={{scale: 200}}>
                    <Geographies geography={geoUrl}>
                        {({geographies}) =>
                            geographies.map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => {
                                        const {NAME, POP_EST, GDP_YEAR, ISO_A2} = geo.properties;
                                        console.log('geo', geo.properties)
                                        setCountryName(ISO_A2)
                                        setCountryFullName(NAME)
                                        setPopulation(POP_EST)
                                        setLoader(false)
                                    }}
                                    onMouseLeave={() => {
                                        setLoader(true)
                                        setCountryName('')
                                        setCountryFullName('')
                                        setPopulation('')
                                    }}

                                    onClick={() => {
                                        console.log('geo ', geo)
                                        router.push('/country/detail/' + geo.properties.NAME)
                                    }}

                                    style={{
                                        default: {
                                            fill: "#D6D6DA",
                                            outline: "none"
                                        },
                                        hover: {
                                            fill: "#F53",
                                            outline: "none"
                                        },
                                        pressed: {
                                            fill: "#E42",
                                            outline: "none"
                                        }
                                    }}
                                />
                            ))
                        }
                    </Geographies>

                </ComposableMap>


            </div>
        </div>
    );
}

export default WorldMap
