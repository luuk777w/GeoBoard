import { Component, FormEvent } from "react";
import { Modal } from "components/modal/modal";
import React from "react";
import { BoardViewModel } from "models/BoardViewModel";

import "./manageBoardModal.scss";
import { ManageBoardModalState } from "store/modals/manageBoardModal/types";
import { AppState } from "store";
import { connect } from "react-redux";
import { hideManageBoardModal } from "store/modals/manageBoardModal/actions";
import { HttpService } from "services/http.service";
import { container } from "tsyringe";
import { FormInput } from 'components/form/formInput';
import { FormFieldValidationErrors } from "components/formFieldValidationErrors/formFieldValidationErrors";
import { mapToType, dateToReadableString } from "helpers/helpers";

import Alert from "components/alert/alert";
import { showAlert, hideAlert } from "store/alert/actions";
import { BoardUserViewModel } from "models/BoardUserViewModel";
import { Button } from "components/button/button";
import { AlertType } from "store/alert/types";
import { setActiveBoard } from "store/board/actions";
import { BoardState } from "store/board/types";
import { FormGroup } from "components/form/formGroup";

interface ManageBoardModalProps {
    manageBoardModal: ManageBoardModalState,
    activeBoard: BoardState;

    hideManageBoardModal: typeof hideManageBoardModal,
    showAlert: typeof showAlert;
    hideAlert: typeof hideAlert;
    setActiveBoard: typeof setActiveBoard;
}

interface ManageBoardModelState {
    board: BoardViewModel;
    errors: any;

    formFields: {
        name: string;
        addUsername: string;
    }

    isEditingName: boolean;
    isAddingUser: boolean;

    isSubmittingNameChange: boolean;
    isSubmittingUserAdd: boolean;
}

class ManageBoardModal extends Component<ManageBoardModalProps, ManageBoardModelState> {

    private httpService: HttpService;

    constructor(props: ManageBoardModalProps) {
        super(props);

        this.state = {
            board: new BoardViewModel(),
            errors: {},

            formFields: {
                name: '',
                addUsername: ''
            },

            isEditingName: false,
            isAddingUser: false,

            isSubmittingNameChange: false,
            isSubmittingUserAdd: false
        }

        this.httpService = container.resolve(HttpService);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event: React.ChangeEvent<any>) {
        const target = event.target;
        const value = target.type == 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(() => (
            mapToType<ManageBoardModelState>({
                formFields: {
                    [name]: value
                }
            })
        ));
    }

    async componentDidUpdate(prevProps: ManageBoardModalProps) {

        if ((this.props.manageBoardModal.boardId != null) && (this.props.manageBoardModal.boardId != prevProps.manageBoardModal.boardId)) {
            await this.httpService.getWithAuthorization<BoardViewModel>(`/boards/${this.props.manageBoardModal.boardId}`)
                .then((response: BoardViewModel) => {
                    this.setState({
                        board: response,
                        formFields: {
                            name: response.name,
                            addUsername: ''
                        }
                    });
                })
                .catch((e) => {
                    //

                    console.warn(e);
                });
        }
    }

    toggleBoardNameForm() {
        this.setState({ isEditingName: ! this.state.isEditingName });
    }

    toggleAddUserForm() {
        this.setState({ isAddingUser: ! this.state.isAddingUser });
    }

    async onNameChangeSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({ isSubmittingNameChange: true });

        const data = {
            name: this.state.formFields.name
        };

        await this.httpService.putWithAuthorization<BoardViewModel>(`/boards/${this.state.board.id}`, JSON.stringify(data))
            .then((response: BoardViewModel) => {
                this.toggleBoardNameForm();

                this.setState(prevState => {
                    return {
                        ...prevState,
                        board: {
                            ...prevState.board,
                            name: response.name
                        }
                    }
                })

                if (this.props.activeBoard.boardId == response.id) {
                    this.props.setActiveBoard(response.id, response.name);
                }
            })
            .catch((error) => {
                if (error.status == 0) {
                    this.props.showAlert(AlertType.Error, "Could not reach the server. Please try again later.");
                    return;
                }

                error.responseJSON.message != null
                    ? this.props.showAlert(AlertType.Warning, error.responseJSON.message)
                    : this.props.showAlert(AlertType.Error, "An unknown error occurred. Please try again.");
            })
            .finally(() => {
                this.setState({ isSubmittingNameChange: false });
            });
    }

    async submitAddUser(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.props.hideAlert();

        const data = {
            userName: this.state.formFields.addUsername
        };

        if (data.userName.trim() == "") {
            this.props.showAlert(AlertType.Error, "Please enter a userName.")

            return;
        }

        this.setState({ isSubmittingUserAdd: true });

        await this.httpService.postWithAuthorization<Array<BoardUserViewModel>>(`/boards/${this.state.board.id}/users`, JSON.stringify(data))
            .then((boardUsers: Array<BoardUserViewModel>) => {
                this.props.showAlert(AlertType.Success, `${this.state.formFields.addUsername} has been added to '${this.state.board.name}'.`, 3000);

                this.setState(prevState => {
                    return {
                        ...prevState,
                        board: {
                            ...prevState.board,
                            users: boardUsers
                        }
                    }
                });
            })
            .catch((error) => {
                if (error.status == 0) {
                    this.props.showAlert(AlertType.Error, "Could not reach the server. Please try again later.");
                    return;
                }

                error.responseJSON.message != null
                    ? this.props.showAlert(AlertType.Warning, error.responseJSON.message)
                    : this.props.showAlert(AlertType.Error, "An unknown error occurred. Please try again.");
            })
            .finally(() => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        isSubmittingUserAdd: false,
                        isAddingUser: false,
                        formFields: {
                            ...prevState.formFields,
                            addUsername: ''
                        }
                    }
                });
            });
    }

    async removeUser(userId: string, userName: string) {
        if (confirm(`Are you sure you want to remove ${userName} from '${this.state.board.name}'?`)) {
            this.props.hideAlert();

            await this.httpService.deleteWithAuthorization<Array<BoardUserViewModel>>(`/boards/${this.state.board.id}/users/${userId}`)
                .then((boardUsers: Array<BoardUserViewModel>) => {
                    this.props.showAlert(AlertType.Success, `${userName} has been removed from '${this.state.board.name}'.`, 3000);

                    this.setState(prevState => {
                        return {
                            ...prevState,
                            board: {
                                ...prevState.board,
                                users: boardUsers
                            }
                        }
                    });
                })
                .catch((error) => {
                    if (error.status == 0) {
                        this.props.showAlert(AlertType.Error, "Could not reach the server. Please try again later.");
                        return;
                    }

                    error.responseJSON.message != null
                        ? this.props.showAlert(AlertType.Warning, error.responseJSON.message)
                        : this.props.showAlert(AlertType.Error, "An unknown error occurred. Please try again.");
                });
        }
    }

    render() {
        return (
            <Modal id="manageBoardModal" isOpen={this.props.manageBoardModal.isOpen} onModalClose={() => null} customHeader>

                <div className="modal-header">
                    <div className="modal-meta">

                        {this.state.isEditingName
                        ?
                            <form method="post" className="edit-board-name-form" onSubmit={(event) => this.onNameChangeSubmit(event)}>
                                <FormInput type="text" id="name" name="name" className="m-0" placeholder="Name this board" onChange={this.handleInputChange} value={this.state.formFields.name} autoFocus />
                                <FormFieldValidationErrors field="Name" errors={this.state.errors} />

                                <Button type="submit" isLoading={this.state.isSubmittingNameChange} className="edit-board-name ml-2" title="Save name"><i className="fas fa-check fa-fw"></i></Button>
                            </form>
                        :
                            <h3 className="modal-title">{this.state.board.name}<button type="button" className="edit-board-name" onClick={() => this.toggleBoardNameForm()} title="Rename board"><i className="fas fa-pen fa-fw ml-2"></i></button></h3>
                    }

                        <small className="modal-subtitle">Edit board</small>
                    </div>
                    <button type="button" className="modal-close-button" onClick={() => this.props.hideManageBoardModal()}>
                        <i title="Close dialog" className="fa fa-times fa-fw"></i>
                    </button>
                </div>

                <div className="modal-body">
                    <Alert slideIn={true} />

                    {this.state.board.users?.length > 0
                    ?   <>
                            <div className="manage-users-header">
                                <h4>Manage users</h4>
                                <p>Add or remove users from '{this.state.board.name}'. Users have immediate access after you add them.</p>
                            </div>
                            <table className="table table-sm table-bordered table-full">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Added on</th>
                                        <th>
                                            {this.state.isAddingUser
                                            ?   <form method="post" onSubmit={(event) => this.submitAddUser(event)}>
                                                    <div className="input-group input-group-small m-0">
                                                        <input type="text" name="addUsername" placeholder="Add a new user by userName" value={this.state.formFields.addUsername} onChange={this.handleInputChange} autoFocus />
                                                        <FormFieldValidationErrors field="Name" errors={this.state.errors} />

                                                        <Button type="submit" isLoading={this.state.isSubmittingUserAdd} className="button button-small button-blue">Add user</Button>
                                                    </div>
                                                </form>
                                            :
                                                <button type="button" className="button button-green add-user" onClick={() => this.toggleAddUserForm()}><i className="fas fa-plus fa-fw mr-1"></i>Add user</button>
                                            }
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.board.users?.map((boardUser: BoardUserViewModel, index: any) => {
                                        return (
                                            <tr key={index}>
                                                <td>{boardUser.userName}</td>
                                                <td>{dateToReadableString(boardUser.createdAt)}</td>
                                                <td>
                                                    <i title={`Remove ${boardUser.userName} from '${this.state.board.name}'`} className="fas fa-trash remove-user fa-fw mr-1" onClick={() => this.removeUser(boardUser.id, boardUser.userName)}></i>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </>

                    :   <div className="no-users-container">
                            <div className="no-users">
                                <i className="icon icon-user-add icon-8x"></i>

                                <h2>No users added to '{this.state.board.name}'</h2>
                                <form method="post" onSubmit={(event) => this.submitAddUser(event)}>
                                    <div className="input-group">
                                        <input type="text" name="addUsername" placeholder="Add a new user by userName" value={this.state.formFields.addUsername} onChange={this.handleInputChange} />
                                        <FormFieldValidationErrors field="Name" errors={this.state.errors} />

                                        <Button type="submit" isLoading={this.state.isSubmittingUserAdd} className="button button-small button-blue">Add user</Button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    }
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    manageBoardModal: state.manageBoardModal,
    activeBoard: state.activeBoard
})

export default connect(mapStateToProps, { hideManageBoardModal, showAlert, hideAlert, setActiveBoard })(ManageBoardModal);
