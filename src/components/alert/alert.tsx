import React from 'react';
import './alert.scss'
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { AppState } from 'store';
import { AlertState } from 'store/alert/types';

interface AlertProps {
    unmountOnExit: boolean;
    alert: AlertState;
}

class Alert extends React.Component<AlertProps> {

    static defaultProps = {
        unmountOnExit: true
    }

    constructor(props: AlertProps) {
        super(props);
    }

    render() {

        return (
            <CSSTransition in={this.props.alert.show} unmountOnExit={this.props.unmountOnExit} timeout={200} classNames={{
                enter: 'alert-animation',
                enterDone: 'alert-animation',
                exit: ''
            }}>
                <div className="alert-animation-wrapper">
                    <div className="alert">
                        <div className="alert-title">
                            <i className="fa fa-exclamation-circle fa-lg"></i>
                        </div>
                        <div className="alert-body">Hallo</div>
                    </div>
                </div>
            </CSSTransition >
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    alert: state.alert,
})

export default connect(mapStateToProps, {})(Alert);
