import React from 'react';
import ListViewAndEdit from './ListViewAndEdit';
import { getListingData } from './MockData';
export default class Profile extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            listings: [],
        }
    };
    componentWillMount() {
        this.updateState({ listings: getListingData() })
    };
   
    //This is for edit will be functional in few days
    handleChange = (stateObj, index) => {
        let data = this.state[stateObj]['data'];
        data[index].isEdit = true;
        const stateProps = {
            [stateObj] : {
                data: data,
                title: this.state[stateObj]['title']
            }
        }
        this.updateState(stateProps);
      }

      updateState = (object) => {
        this.setState(object, () => {
            console.log('State updated', this.state)
        });
        }



    render() {
       const { listings } = this.state;
        return (
            <div>
                 <ListViewAndEdit
                    data={listings.data}
                    title={listings.title}
                    editType={'listing'}
                    edit={this.handleChange}
                    test={this.state}
                 />
              
                </div>
        );
    }
}
