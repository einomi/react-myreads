import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

class Spinner extends React.Component {
    static propTypes = {
        visible: PropTypes.bool
    };

    state = {
        visible: this.props.visible
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.state.visible) {
            this.setState({visible: nextProps.visible});
        }
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