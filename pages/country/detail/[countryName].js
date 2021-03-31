import {Fragment, useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios"
import {RAPID_API_KEY} from "../../../utils/helper";

const CountryDetail = () => {

    const router = useRouter()

    const [countryName, setCountryName] = useState('')
    const [data, setData] = useState({})

    const getCountryFullInfo = (countryName) => {
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
        })
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


            <div className="container">
                <div className="col-md-12 text-center mt-5">
                    {Object.keys(data).length > 0 &&
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
                </div>
            </div>
        </Fragment>
    )
}

export default CountryDetail
