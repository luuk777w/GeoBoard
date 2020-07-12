import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { showAlert, hideAlert } from 'store/alert/actions'
import { AlertType, AlertState } from 'store/alert/types';
import { HttpService } from 'services/http.service';
import { container } from 'tsyringe';
import { BoardViewModel } from 'models/BoardViewModel';
import { Button } from 'components/button/button';
import { AppState } from 'store';

interface CreateBoardState {
    isOpen: boolean;
    boardName: string;
    isSubmitting: boolean;
}

interface CreateBoardProps {
    alert: AlertState;
    showAlert: typeof showAlert;
    hideAlert: typeof showAlert;
    onBoardCreated: Function;
}

class CreateBoard extends React.Component<CreateBoardProps, CreateBoardState> {

    private httpService: HttpService;

    constructor(props: any) {
        super(props);

        this.httpService = container.resolve(HttpService);

        this.state = {
            isOpen: false,
            boardName: '',
            isSubmitting: false
        }
    }

    toggleCreateBoard() {
        this.setState(state => ({
            isOpen: !state.isOpen
        }));

        this.props.hideAlert();
    }

    handleInputChange(event: any) {
        this.setState(() => ({
            boardName: event.target.value
        }));

        if (this.props.alert.show) {
            this.props.hideAlert();
        }
    }

    createBoard() {

        if (this.state.boardName == "") {
            this.props.showAlert(AlertType.Warning, "Please enter a boardname.");

            return;
        }

        this.setState({ isSubmitting: true });

        let data = {
            name: (this.state.boardName[0].toUpperCase()) + this.state.boardName.slice(1)
        };

        this.httpService.postWithAuthorization<BoardViewModel>(`/boards`, JSON.stringify(data)).then((result: BoardViewModel) => {
            this.props.showAlert(AlertType.Success, `Board '${result.name}' created!`);

            this.props.onBoardCreated(result);

            this.setState(() => ({
                isOpen: false,
                boardName: ''
            }));

            setTimeout(() => {
                this.props.hideAlert();
            }, 3000);

        }, error => {
            if (error.status == 0) {
                this.props.showAlert(AlertType.Error, "Could not reach server. Please try again.");
            }
            else {
                this.props.showAlert(AlertType.Error, "Something went wrong. Please try again.");
            }
        })
            .finally(() => {
                this.setState({ isSubmitting: false });
            });
    }

    render() {

        let buttonClassName = "button button-small";
        buttonClassName += this.state.isOpen ? " button-red" : " button-green";

        return (
            <>
                <div className="section-header-section">
                    <h3 className="sidebar-section-title sidebar-my-boards">{this.state.isOpen ? "Create board" : "My boards"}</h3>
                    <button className={buttonClassName} onClick={() => this.toggleCreateBoard()}>{this.state.isOpen ? "Cancel" : "Create board"}</button>
                </div>

                <CSSTransition in={this.state.isOpen} timeout={200} classNames={{
                    enter: 'create-board-animation-height-3',
                    enterDone: 'create-board-animation-height-3',
                    exit: ''
                }}>
                    <div className="create-board-height-animation-wrapper create-board-animation-height-0">
                        <div className="section-header-section create-board-section">
                            <div className="input-group">
                                <input type="text" name="boardName" placeholder="Choose a unique board name" value={this.state.boardName} onChange={() => this.handleInputChange(event)} />
                                <Button isLoading={this.state.isSubmitting} className="button button-small button-green create-board-button" onClick={() => this.createBoard()}><i className="fa fa-check"></i></Button>
                            </div>
                        </div>
                    </div>
                </CSSTransition >
            </>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    alert: state.alert
})

export default connect(mapStateToProps, { showAlert, hideAlert })(CreateBoard);
