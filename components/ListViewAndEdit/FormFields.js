
export const getFormsFields = (object, values, handleChange) => {

    let fields = [];
    Object.keys(item).forEach(element => {
        let field = '';
        if (mapping[element]) {
            switch (mapping[element].type) {

                case 'textarea':
                break;
                case 'image':
                field = <img
                        src={object[element]}
                        width={mapping[element].width}
                        height={mapping[element].height}
                />
                break;
                case 'chips':
                break;
                case 'checkbox':
                    field =
                        <label>
                            {mapping[element].label}

                            <CheckboxInput
                                type={mapping[element].type}
                                name={mapping[element].name}
                                value={values[element]}
                            />

                        </label>
                break;
                default:
                    field = (
                        <>
                            <InputField
                                id={mapping[element].id}
                                name={mapping[element].name}
                                label={mapping[element].label}
                                onChange={handleChange(mapping[element].name)}
                                value={values[element]}
                                disabled={values[mapping[element].is_disabled]}
                            />
                        </>
                    )


            }
            fields.push(field)
        }
    });
    return fields.filter(Boolean);
}