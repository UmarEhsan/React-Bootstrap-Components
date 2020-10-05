import React, {useState}  from 'react';
// import EditView from './EditView';
export default function ProfileListing({ data, editType, edit }) {

    //This object is for mapping data with this model to create dynamic form.
    // const [fieldsMapping, setFieldsMapping] = useState({
    //     image: {
    //         type: 'image',
    //         label: 'Image',
    //         name: 'image',
    //         id: 'image',
    //     },
    //     title: {
    //         type: 'text',
    //         id: 'title',
    //         name: 'title',
    //         label: 'Title',
    //     },
    //     summary: {
    //         type: 'textarea',
    //         id: 'summary',
    //         name: 'summary',
    //         label: 'Summary'
    //     },
    //     highlihtedTags: {
    //         type: 'chips',
    //         id: 'highlihtedTags',
    //         name: 'highlihtedTags',
    //         label: 'Highlihted Tags'
    //     },
    //     start_date: {
    //         type: 'text',
    //         id: 'start_date',
    //         name: 'start_date',
    //         label: 'Start Date'
    //     },
    //     is_present: {
    //         type: 'checkbox',
    //         id: 'is_present',
    //         name: 'is_present',
    //         label: 'Present'
    //     },
    //     end_date: {
    //         type: 'text',
    //         id: 'end_date',
    //         name: 'end_date',
    //         label: 'End Date'
    //     },
    //     duration: {
    //         type: 'text',
    //         id: 'duration',
    //         name: 'duration',
    //         label: 'Duration'
    //     },
    //     description: {
    //         type: 'textarea',
    //         id: 'description',
    //         name: 'description',
    //         label: 'Description'
    //     }


    // });

    const editItem = (elem, index, type) => {
        edit(type, index);
    }

   


    return (
        <div>
            {data.map((elem, idx) => {
                return (
                    <div className="row" key={elem._id}>

                        {!elem.isEdit ?
                            <> 
                            <div className="col-1">
                                <img 
                                className="info-image" 
                                src={elem.image} 
                                alt={elem.name} 
                                />
                            </div>
                            <div className="col-9">
                                <p>{elem.title}</p>
                                <p>{elem.summary && elem.summary}</p>
                                {
                                ( elem.highlihtedTags && 
                                    elem.highlihtedTags.length > 0) && 
                                       elem.highlihtedTags.map((elem) => (
                                        <span>
                                            {elem} &nbsp; &nbsp; &nbsp; &nbsp;
                                        </span>
                                ))
                                }
                                <p>
                                    {elem.start_date} ---- {elem.is_present && 'Present' || elem.end_date}
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                    {elem.duration && elem.duration}
                                </p>
                                <p>{elem.description && elem.description}</p>
                                </div>
                            </> : 
                            <p>Edit view is process</p>
                            // <EditView 
                            //     mapping = {fieldsMapping}
                            //     item = {elem}
                            //   />
                              }
                        {/* <div className="col-1 edit">
                            <p onClick={() => editItem(elem, idx, editType)}>Edit</p>
                        </div> */}

                    </div>

                )
            })}
        </div>
    )
}
