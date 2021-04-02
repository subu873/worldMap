import React, {Fragment, useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios"
import {RAPID_API_KEY} from "../../../utils/helper";
import Loader from "react-loader-spinner";

const cache = {};

const CountryDetail = () => {

    const router = useRouter()

    const [countryName, setCountryName] = useState('')
    const [data, setData] = useState({})
    const [loader, setLoader] = useState(false)

    const getCountryFullInfo = (countryName) => {
        setLoader(true)

        if (cache[countryName]) {
            const cachedData = cache[countryName];
            console.log('cache data', cache)
            setData(cachedData);
            setLoader(false)
        } else {
            
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
    }

    const handleEditInfo = () => {
        const info = JSON.stringify(data)
        router.push('/editInfo/' + countryName + '?info=' + info, '/editInfo/' + countryName, {shallow: true})
    }

    useEffect(() => {
        if (router.query.countryName !== undefined) {
            console.log('country name', router.query.countryName)
            setCountryName(router.query.countryName)
            getCountryFullInfo(router.query.countryName)
        }
    }, [router.query])


    return (
        <Fragment>


            <section className="detailPage">
                <div className="container">
                    <div className="col-md-12 text-center mt-5">

                        <div className="grid">
                            {!loader && Object.keys(data).length > 0 &&
                            <Fragment>
                                <img src={data.flag_img} className="flagIcon mb-3"/>
                                <h1>
                                    {data.name}
                                </h1>
                                <h6>
                                    Capital - {data.capital}
                                </h6>

                                <h6>
                                    Currency - {data.currency}
                                </h6>
                                <h6>
                                    Calling Code - {data.calling_code}
                                </h6>
                                <h6>
                                    Prime Minister - {data.prime_minister}
                                </h6>
                                <h6>
                                    President - {data.president}
                                </h6>

                            </Fragment>
                            }

                            {loader &&
                            <Loader color={"#333"} type="Oval" width={45} height={45}/>
                            }

                            {!loader && Object.keys(data).length === 0 &&
                            <p className="alert alert-danger">
                                API is not giving proper response
                            </p>
                            }

                            <button className="btn btn-warning mt-5" onClick={handleEditInfo}>
                                Edit Basic Info
                            </button>

                        </div>

                    </div>
                </div>
            </section>

        </Fragment>
    )
}

export default CountryDetail
