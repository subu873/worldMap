import React, {Fragment, useState} from "react";
import styles from "../styles/Home.module.css"
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import Loader from "react-loader-spinner";
import {RAPID_API_KEY} from "../utils/helper";
import {useRouter} from "next/router";
import axios from "axios"


const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const WorldMap = () => {

    const router = useRouter()
    const [content, setContent] = useState("");
    const [countryName, setCountryName] = useState("")
    const [countryFullName, setCountryFullName] = useState("")
    const [population, setPopulation] = useState('')
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState({})


    const getCountryFullInfo = (countryName) => {
        setLoader(true)
        const options = {
            headers: {
                "x-rapidapi-key": RAPID_API_KEY,
                "x-rapidapi-host": "wikiapi.p.rapidapi.com",
                "useQueryString": true
            }
        };

        const API_URL = `https://wikiapi.p.rapidapi.com/api/v1/wiki/geography/country/info/${countryName}?lan=en`

        axios.get(API_URL, options)
            .then((res) => {
                console.log('res', res)
                setData(res.data)
            }).catch((err) => {
            console.log('error', err)
            setData({})
        }).finally(() => {
            setLoader(false)
        })
    }


    return (
        <div className="container">
            <div className="col-md-12">
                {!loader && Object.keys(data).length > 0 &&
                <div className="tooltip-ex">
                    <span className="tooltip-ex-text tooltip-ex-top">
                        <Fragment>
                            <div className="col-md-12 text-center">
                                <img
                                    src={data.flag_img}
                                    className={styles.flagIcon} alt={data.name}/>
                                <p className={styles.tooltipText}>{data.name}</p>
                                <p className={styles.tooltipText}> Capital - {data.capital}</p>
                                <p className={styles.tooltipText}>Dialing Code - {data.calling_code}</p>
                                <p className={styles.tooltipText}> Currency - {data.currency}</p>
                                <p className={styles.tooltipText}>Population - {data.population_estimate}</p>
                                <p className={styles.tooltipText}>Area - {data.area}</p>
                            </div>
                        </Fragment>
                    </span>
                </div>
                }

                {loader &&
                <div className="tooltip-ex">
                    <span className="tooltip-ex-text tooltip-ex-top">
                        <Loader color={"#fff"} type="Oval" width={45} height={45}/>
                    </span>
                </div>
                }

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
                                        getCountryFullInfo(NAME.toLowerCase())
                                    }}
                                    onMouseLeave={() => {
                                        setLoader(true)
                                        setCountryName('')
                                        setCountryFullName('')
                                        setPopulation('')
                                    }}

                                    onClick={() => {
                                        console.log('geo ', geo)
                                        router.push('/country/detail/' + geo.properties.NAME.toLowerCase())
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
