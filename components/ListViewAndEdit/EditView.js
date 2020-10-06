import React from 'react';
import { Field, Form, Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { InputField, CheckboxInput } from './Inputs';
import {getFormsFields} from './FormFields';
export default function EditView({ mapping, item }) {
     

    const formInitialValues = (element) => {
        let values = {};
        Object.keys(item).forEach(element => {
            if (mapping[element]) {
                values[element] = item[element];
            }
        });
       return values;
    }

    return (
        <div className="edit">
            {
               <Formik initialValues={formInitialValues()}>
                    {
                        ({ values, handleChange }) => {
                            return (
                                getFields(formInitialValues(), values, handleChange)
                            )
                        }
                    }
                </Formik>
            }
        </div>
    )
}
