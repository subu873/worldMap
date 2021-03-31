import React, {memo} from "react";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import {useRouter} from "next/router";


const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = num => {
    if (num > 1000000000) {
        return Math.round(num / 100000000) / 10 + "Bn";
    } else if (num > 1000000) {
        return Math.round(num / 100000) / 10 + "M";
    } else {
        return Math.round(num / 100) / 10 + "K";
    }
};

const MapChart = ({setTooltipContent, setTooltipCountryFlag}) => {

    const router = useRouter()


    return (
        <>
            <ComposableMap data-tip="" projectionConfig={{scale: 200}}>
                <Geographies geography={geoUrl}>
                    {({geographies}) =>
                        geographies.map(geo => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onMouseEnter={() => {
                                    const {NAME, POP_EST, GDP_YEAR} = geo.properties;
                                    console.log('geo', geo.properties)
                                    setTooltipContent(`${NAME} — ${rounded(POP_EST)} - GDP Year ${GDP_YEAR}`);
                                }}
                                onMouseLeave={() => {
                                    setTooltipContent("");
                                }}

                                onClick={() => {
                                    console.log('geo ', geo)
                                    router.push('/country/detail/' + geo.properties.ISO_A2)
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
        </>
    );
};

export default memo(MapChart);
