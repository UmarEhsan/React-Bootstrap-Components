import React from 'react';
import renderFile from './renderFile';

import { Formik } from "formik";
import * as yup from 'yup';

export default class FileUpload extends React.PureComponent {
    constructor(props) {
        super(props);
        this.hiddenFileInput = React.createRef(null);
    }

    handleClick = event => {
        this.hiddenFileInput.current.click();
    }

    getFileObject = (file) => {
        this.props.getFileObject({file, type: this.props.type});
    }
    render() {

        return (
            <div className="container">
                <Formik
                    initialValues={{ file: null }}
                    onSubmit={(values) => {
                        alert(
                            JSON.stringify(
                                {
                                    fileName: values.file.name,
                                    type: values.file.type,
                                    size: `${values.file.size} bytes`
                                },
                                null,
                                2
                            )
                        );
                    }}
                    validationSchema={yup.object().shape({
                        file: yup.mixed().required(),
                    })}
                    render={({ values, handleSubmit, setFieldValue }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    {this.props.label && <label for="file">{this.props.label}</label>}
                                    {this.props.inputText &&
                                        <button onClick={this.handleClick}>
                                            {this.props.inputText}
                                        </button>
                                    }
                                    {this.props.imageUrl && <img src={this.props.imageUrl} alt={this.props.imageName} onClick={this.handleClick}/>}

                                    <input id="file" name="file" type="file" onChange={(event) => {
                                        setFieldValue("file", event.currentTarget.files[0]);
                                    }} className="form-control" style={{ display: 'none' }} ref={this.hiddenFileInput} />

                                    <renderFile
                                        file={values.file}
                                        getFileObject={this.getFileObject}
                                    />
                                </div>
                            </form>
                        );
                    }} />
            </div>
        );
    }
}


