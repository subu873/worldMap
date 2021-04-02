import {Fragment, useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import styles from "../../styles/EditInfo.module.css"
import {useRouter} from "next/router";

const EditInfo = (props) => {

    const router = useRouter()

    const [countryName, setCountryName] = useState('')
    const [info, setInfo] = useState({})

    const initialValues = {
        name: info.name,
        president: info.president,
        prime_minister: info.prime_minister,
        calling_code: info.calling_code,
        capital: info.capital
    };

    const countryValidationSchema = Yup.object({
        name: Yup.string().required("Country Name is required"),
        president: Yup.string().required("President Name is required"),
        prime_minister: Yup.string().required("Prime Minister Name is required"),
        calling_code: Yup.string().required("Calling Code  is required"),
        capital: Yup.string().required("Capital Name is required"),
    });

    const handleSubmit = (values) => {
        console.log('values', values);
        console.log('main data', info);

        if (Object.keys(info).length > 0) {
            const mainInfo = info
            const localValues = values
            const saveData = {...mainInfo, ...localValues};
            console.log('going to save data', saveData)

            localStorage.setItem(countryName.trim(), JSON.stringify(saveData))
        }
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

        if (router.query && router.query.name) {
            setCountryName(router.query.name)
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
                                        <label htmlFor="name" className="customLabel">
                                            Country Name
                                        </label>
                                        <Field className="form-control customInput"
                                               name="name"
                                               type="text"/>
                                        <p className="text-danger errorMessageModal">
                                            <ErrorMessage name="name"/>
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
                                        <label htmlFor="prime_minister" className="customLabel">
                                            primeMinister
                                        </label>
                                        <Field className="form-control customInput"
                                               name="prime_minister"
                                               type="text"/>
                                        <p className="text-danger errorMessageModal">
                                            <ErrorMessage name="prime_minister"/>
                                        </p>
                                    </div>

                                    <div className="col-md-6 mt-2">
                                        <label htmlFor="calling_code" className="customLabel">
                                            callingCode
                                        </label>
                                        <Field className="form-control customInput"
                                               name="calling_code"
                                               type="text"/>
                                        <p className="text-danger errorMessageModal">
                                            <ErrorMessage name="calling_code"/>
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
