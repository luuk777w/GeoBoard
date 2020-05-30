import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { showAlert, hideAlert } from 'store/alert/actions'
import { AlertType } from 'store/alert/types';
import { HttpService } from 'services/http.service';
import { container } from 'tsyringe';

interface CreateBoardState {
    isOpen: boolean;
    boardName: string;
}

interface CreateBoardProps {
    showAlert: typeof showAlert;
    hideAlert: typeof showAlert;
    onAddBoard: Function;
}

class CreateBoard extends React.Component<CreateBoardProps, CreateBoardState> {

    private httpService: HttpService;

    constructor(props: any) {
        super(props);

        this.httpService = container.resolve(HttpService);

        this.state = {
            isOpen: false,
            boardName: ''
        }
    }

    toggleCreateBoard() {
        this.setState(state => ({
            isOpen: !state.isOpen
        }));
    }

    handleInputChange(event: any) {
        this.setState(() => ({
            boardName: event.target.value
        }));
    }

    createBoard() {

        if (this.state.boardName == "") {
            this.props.showAlert(AlertType.Warning, "Please enter a boardname");
            setTimeout(() => {
                this.props.hideAlert();
            }, 2000);
            return;
        }

        let data = {
            name: this.state.boardName
        };

        this.httpService.postWithAuthorization(`/boards`, JSON.stringify(data)).then(result => {
            this.props.showAlert(AlertType.Success, "Board created!");

            this.props.onAddBoard(result);

            this.setState(() => ({
                isOpen: false,
                boardName: ''
            }));

            setTimeout(() => {
                this.props.hideAlert();
            }, 2000);
        }, error => {
            this.props.showAlert(AlertType.Error, error);

            setTimeout(() => {
                this.props.hideAlert();
            }, 2000);
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
                            <input type="text" name="boardName" onChange={() => this.handleInputChange(event)} />
                            <button className="button button-small button-green create-board-button" onClick={() => this.createBoard()}><i className="fa fa-check"></i></button>
                        </div>
                    </div>
                </CSSTransition >
            </>
        )
    }
}

export default connect(null, { showAlert, hideAlert })(CreateBoard);
