import React from 'react';


export default class SkillsCircularBar extends React.PureComponent {

    constructor(props) {
        super(props);
        console.log(props.heading);
    }



    render() {
        const { totalCount, rank } = this.props;

        return (
            <div>
                {Array.from(Array(totalCount), (e, i) => {
                    return <div key={i} className={i < rank ? 'red' : 'white'}></div>
                })}
            </div>
        );
    }
}
