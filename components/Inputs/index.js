import { Field } from 'formik';


export const CheckboxInput = (props) => (
	<Field {...props} render={({field}) => <input {...field} type="checkbox" checked={field.value} />} />
);

export const InputField = (props) => (
	<Field {...props} render={({field}) => <input {...field} type={props.type} />} />
);