import React from 'react';


export default class renderFile extends React.PureComponent {
    state = {
        loading: false,
        display: undefined,
    };
   
    componentWillReceiveProps(nextProps) {
        if (!nextProps.file) { return; }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ loading: false, display: reader.result });
            };

            reader.readAsDataURL(nextProps.file);
            this.props.getFileObject(nextProps.file);
        });
    }

    render() {
        const { file } = this.props;
        const { loading, display } = this.state;

        if (!file) { return null; }

        if (loading) { return <p>loading...</p>; }

        return (<img src={display}
            alt={file.name}
            className="img-thumbnail mt-2"
            height={this.props.height ? this.props.height : 200}
            width={this.props.width ? this.props.width : 200} />);
    }
}