import React from 'react'
import classNames from 'classnames'

class Spinner extends React.Component {
    state = {
        visible: this.props.visible
    };

    componentWillReceiveProps(nextProps) {
        this.setState({visible: nextProps.visible});
    }

    render() {
        return (
            <div className={classNames('spinner-container', {'_visible': this.state.visible})}>
                <div className="spinner"></div>
            </div>
        );
    }
}

export default Spinner