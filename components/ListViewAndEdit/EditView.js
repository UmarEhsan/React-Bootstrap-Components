import React from 'react';
import { Field, Form, Formik, useFormik } from 'formik';
import * as yup from 'yup';

import { getFormsFields, formInitialValues } from './FormFields';
export default function EditView({ mapping, item }) {
     return (
        <div className="edit">
            {
               <Formik initialValues={formInitialValues(item, mapping)}>
                    {
                        ({ values, handleChange }) => {
                            return (
                                //This method has to be change 
                                //as it's not the good approach 
                                //to pass parameters like this
                                getFormsFields(formInitialValues(), values, handleChange, item, mapping)
                            )
                        }
                    }
                </Formik>
            }
        </div>
    )
}
