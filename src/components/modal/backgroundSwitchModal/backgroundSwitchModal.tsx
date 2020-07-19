import { connect } from "react-redux";
import { Component, CSSProperties } from "react";
import React from "react";
import { BackgroundSwitchModalState } from "store/modals/backgroundSwitchModal/types";
import { SystemState } from "store/system/types";
import { AppState } from "store";
import { hideBackgroundSwitchModal } from "store/modals/backgroundSwitchModal/actions";
import { Modal } from "../modal";

import './backgroundSwitchModal.scss';
import { setBackgroundImage } from "store/system/actions";
import { FileViewModel } from "models/FileViewModel";
import { HttpService } from "services/http.service";
import { container } from "tsyringe";
import { Config } from "util/config";

interface BackgroundSwitchModalProps {
    backgroundSwitchModal: BackgroundSwitchModalState;
    system: SystemState;

    setBackgroundImage: typeof setBackgroundImage;
    hideBackgroundSwitchModal: typeof hideBackgroundSwitchModal;
}

class BackgroundSwitchModal extends Component<BackgroundSwitchModalProps> {

    private listOfImages: Array<FileViewModel> = [];

    private config: Config;
    private httpService: HttpService;

    constructor(props: BackgroundSwitchModalProps) {
        super(props);

        this.config = container.resolve(Config);
        this.httpService = container.resolve(HttpService);
    }

    async componentDidMount() {

        await this.httpService.get<Array<FileViewModel>>('/content/static/backgrounds')
            .then((response: Array<FileViewModel>) => {
                this.listOfImages = response;
            })
            .catch(() => {
                console.warn('Something went wrong while fetching the available backgrounds');
            });

    }

    backgroundImageStyle(imagePath: string): CSSProperties {
        return {
            backgroundImage: `url('${this.config.apiUrl}${imagePath}')`
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

                        {this.props.system.backgroundImage == undefined || this.props.system.backgroundImage == null
                            ?   <div className="no-background-image selected">
                                    <i className="fas fa-ban fa-10x"></i>
                                </div>

                            :   <div className="no-background-image">
                                    <i className="fas fa-ban fa-10x" onClick={() => this.props.setBackgroundImage(null)}></i>
                                </div>
                        }

                        {this.listOfImages.map((file, index) => {
                            if (this.props.system.backgroundImage == file.name) {
                                return (<div key={index} className="background-image selected" style={this.backgroundImageStyle(file.path)}></div>);
                            }

                            return (<div key={index} className="background-image" style={this.backgroundImageStyle(file.path)} onClick={() => this.props.setBackgroundImage(file.name)}></div>);
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

export default connect(mapStateToProps, { hideBackgroundSwitchModal, setBackgroundImage: setBackgroundImage })(BackgroundSwitchModal);
