import {Fragment, useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import styles from "../../styles/EditInfo.module.css"
import {useRouter} from "next/router";


const cache = {};

const EditInfo = (props) => {

    const router = useRouter()

    const [info, setInfo] = useState({})

    const initialValues = {
        countryName: info.name,
        president: info.president,
        primeMinister: info.prime_minister,
        callingCode: info.calling_code,
        capital: info.capital
    };

    const countryValidationSchema = Yup.object({
        countryName: Yup.string().required("Country Name is required"),
        president: Yup.string().required("President Name is required"),
        primeMinister: Yup.string().required("Prime Minister Name is required"),
        callingCode: Yup.string().required("Calling Code  is required"),
        capital: Yup.string().required("Capital Name is required"),
    });

    const handleSubmit = (values) => {
        console.log('values', values)
        cache[info.name] = values;
    }

    const handleBackClick = () => {
        router.back()
    }

    useEffect(() => {
        if (router.query && router.query.info) {
            try {
                const jsonData = JSON.parse(router.query.info)
                setInfo(jsonData)
                console.log('json info', jsonData)
            } catch (e) {
                console.log('fail to parse', router.query.info)
                setInfo({})
            }

        }
    }, [router])

    return (
        <Fragment>
            <section className={styles.editInfoPage}>
                <div className="container">
                    <div className="col-md-12">
                        <h1 className={styles.mainHeading}>
                            Edit Country Basic Info
                        </h1>


                        <Formik enableReinitialize={true}
                                initialValues={initialValues}
                                validationSchema={countryValidationSchema}
                                onSubmit={(values) => handleSubmit(values)}>

                            <Form>
                                <div className="row mt-5">
                                    <div className="col-md-6 mt-2">
                                        <label htmlFor="password" className="customLabel">
                                            Country Name
                                        </label>
                                        <Field className="form-control customInput"
                                               name="countryName"
                                               type="text"/>
                                        <p className="text-danger errorMessageModal">
                                            <ErrorMessage name="countryName"/>
                                        </p>
                                    </div>

                                    <div className="col-md-6 mt-2">
                                        <label htmlFor="president" className="customLabel">
                                            president
                                        </label>
                                        <Field className="form-control customInput"
                                               name="president"
                                               type="text"/>
                                        <p className="text-danger errorMessageModal">
                                            <ErrorMessage name="president"/>
                                        </p>
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <label htmlFor="primeMinister" className="customLabel">
                                            primeMinister
                                        </label>
                                        <Field className="form-control customInput"
                                               name="primeMinister"
                                               type="text"/>
                                        <p className="text-danger errorMessageModal">
                                            <ErrorMessage name="primeMinister"/>
                                        </p>
                                    </div>

                                    <div className="col-md-6 mt-2">
                                        <label htmlFor="callingCode" className="customLabel">
                                            callingCode
                                        </label>
                                        <Field className="form-control customInput"
                                               name="callingCode"
                                               type="text"/>
                                        <p className="text-danger errorMessageModal">
                                            <ErrorMessage name="callingCode"/>
                                        </p>
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <label htmlFor="president" className="customLabel">
                                            capital
                                        </label>
                                        <Field className="form-control customInput"
                                               name="capital"
                                               type="text"/>
                                        <p className="text-danger errorMessageModal">
                                            <ErrorMessage name="capital"/>
                                        </p>
                                    </div>


                                    <div className="col-md-12">
                                        <div className="btn">
                                            <button className="btn btn-primary" type="submit">
                                                Change Information
                                            </button>
                                            <button className="btn btn-danger ml-4" onClick={handleBackClick}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </Form>


                        </Formik>

                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default EditInfo
