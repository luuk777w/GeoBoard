import { connect } from "react-redux";
import { Component, CSSProperties } from "react";
import React from "react";
import { BackgroundSwitchModalState } from "store/modals/backgroundSwitchModal/types";
import { SystemState } from "store/system/types";
import { AppState } from "store";
import { hideBackgroundSwitchModal } from "store/modals/backgroundSwitchModal/actions";
import { Modal } from "../modal";

import './backgroundSwitchModal.scss';
import { setBackgroundImageUrl } from "store/system/actions";

interface BackgroundSwitchModalProps {
    backgroundSwitchModal: BackgroundSwitchModalState;
    system: SystemState;

    setBackgroundImageUrl: typeof setBackgroundImageUrl;
    hideBackgroundSwitchModal: typeof hideBackgroundSwitchModal;
}

class BackgroundSwitchModal extends Component<BackgroundSwitchModalProps> {

    private listOfImages: Array<any> = [];

    constructor(props: BackgroundSwitchModalProps) {
        super(props);
    }

    importAll(r: any): any {
        return r.keys().map(r);
    }

    componentDidMount() {
        // this.listOfImages = this.importAll(require.context('./assets/media/backgrounds/', false, /\.(png|jpe?g|svg)$/));

        // const images = this.importAll(require.context('/media/backgrounds', false, /\.(png|jpe?g|svg)$/));

        // console.log(images);

        this.listOfImages = [
            "bi1", "bi2", "bi3", "bi4", "bi5", "bi6", "bi7", "bi8", "bi9", "bi10", "bi11"
        ];

        console.log('Current image', this.props.system.backgroundImageUrl);
    }

    backgroundImageStyle(imageName: string): CSSProperties {
        return {
            backgroundImage: `url('assets/media/backgrounds/${imageName}.jpg')`
        }
    }

    render () {

        return (
            <Modal
                id="backgroundSwitchModal"
                isOpen={this.props.backgroundSwitchModal.isOpen}
                title="Choose your favorite background"
                size="extra-large"
                onModalClose={() => this.props.hideBackgroundSwitchModal()}
                closable
            >

                <div className="modal-body">
                    <div className="backgrounds">

                        {this.props.system.backgroundImageUrl == undefined || this.props.system.backgroundImageUrl == null
                            ?   <div className="no-background-image selected">
                                    <i className="fas fa-ban fa-10x"></i>
                                </div>

                            :   <div className="no-background-image">
                                    <i className="fas fa-ban fa-10x" onClick={() => this.props.setBackgroundImageUrl(null)}></i>
                                </div>
                        }

                        {this.listOfImages.map((path, index) => {
                            if (this.props.system.backgroundImageUrl == path) {
                                return (<div key={index} className="background-image selected" style={this.backgroundImageStyle(path)}></div>);
                            }

                            return (<div key={index} className="background-image" style={this.backgroundImageStyle(path)} onClick={() => this.props.setBackgroundImageUrl(path)}></div>);
                        })}
                    </div>
                </div>

            </Modal>
        )
    }

}

const mapStateToProps = (state: AppState) => ({
    backgroundSwitchModal: state.backgroundSwitchModal,
    system: state.system
})

export default connect(mapStateToProps, { hideBackgroundSwitchModal, setBackgroundImageUrl })(BackgroundSwitchModal);
