import { Component } from "react";
import React from "react";

import './modal.scss';

export interface BaseModelProps {
    isOpen: boolean;
    onModalClose: () => void
}

interface ModalProps extends BaseModelProps {
    id: string;
    title: string;
    subtitle?: string;
    closable?: boolean;
}
export class Modal extends Component<ModalProps> {
    constructor(props: ModalProps) {
        super(props);
    }

    render() {
        if (! this.props.isOpen) {
            return (<></>)
        }

        return (
            <div id={this.props.id} className="modal show">
                <div className="modal-dialog">
                    <div className="modal-content animated fadeInDown">
                        {(this.props.title || this.props.closable) &&
                            <div className="modal-header">
                                <div className="modal-meta">
                                    {this.props.title && <h3 className="modal-title">{this.props.title}</h3>}
                                    {this.props.subtitle && <small className="modal-subtitle">{this.props.subtitle}</small>}
                                </div>
                                {this.props.closable &&
                                    <button type="button" className="modal-close-button" onClick={() => this.props.onModalClose()}>
                                        <i title="Close dialog" className="fa fa-times fa-fw"></i>
                                    </button>
                                }
                            </div>
                        }

                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}