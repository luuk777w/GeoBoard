import React from 'react';
import './alert.scss'
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { AppState } from 'store';
import { AlertState, AlertType } from 'store/alert/types';
import { hideAlert } from 'store/alert/actions';

interface AlertProps {
    slideIn: boolean;
    alert: AlertState;

    hideAlert: typeof hideAlert;
}

class Alert extends React.Component<AlertProps> {

    static defaultProps = {
        slideIn: false
    }

    constructor(props: AlertProps) {
        super(props);
    }

    componentDidUpdate(prevProps: AlertProps) {
        if (
            (prevProps.alert.type == this.props.alert.type) &&
            (prevProps.alert.body == this.props.alert.body)
        )
            return;

        if (this.props.alert.timeout > 0) {
            setTimeout(() => {
                this.props.hideAlert();
            },
            this.props.alert.timeout)
        }
    }

    getTypeIcon(type: AlertType) {
        switch (type) {
            case AlertType.Info: return "fa fa-info-circle fa-fw"
            case AlertType.Success: return "fa fa-check fa-fw"
            case AlertType.Warning: return "fa fa-exclamation fa-fw"
            case AlertType.Error: return "fa fa-times fa-fw"
            default: break;
        }
    }

    render() {

        const cssTransitionEnter = this.props.slideIn ? 'alert-animation-height-5' : 'alert-visible';
        const animationStyle = this.props.slideIn
            ? 'alert-height-animation-wrapper alert-animation-height-0'
            : 'alert-opacity-animation-wrapper alert-hidden';

        const alertStyle = 'alert ' + this.props.alert.type;
        const iconStyle = this.getTypeIcon(this.props.alert.type);

        return (
            <CSSTransition in={this.props.alert.show} timeout={200} classNames={{
                enter: cssTransitionEnter,
                enterDone: cssTransitionEnter,
                exit: ''
            }}>
                <div className={animationStyle}>
                    <div className={alertStyle}>
                        <div className="alert-title">
                            <i className={iconStyle}></i>
                        </div>
                        <div className="alert-body">{this.props.alert.body}</div>
                    </div>
                </div>
            </CSSTransition >
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    alert: state.alert,
})

export default connect(mapStateToProps, { hideAlert })(Alert);
