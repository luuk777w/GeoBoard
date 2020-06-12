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
import { FormGroup } from "components/form/formGroup";
import { FormLabel } from "components/form/formLabel";
import { FormInput } from 'components/form/formInput';
import { FormFieldValidationErrors } from "components/formFieldValidationErrors/formFieldValidationErrors";
import { mapToType, dateToReadableString } from "helpers/helpers";

import Alert from "components/alert/alert";
import { showAlert, hideAlert } from "store/alert/actions";
import { BoardUserViewModel } from "models/BoardUserViewModel";
import { Button } from "components/button/button";
import { AlertType } from "store/alert/types";
import { throws } from "assert";

interface ManageBoardModalProps {
    manageBoardModal: ManageBoardModalState,

    hideManageBoardModal: typeof hideManageBoardModal,
    showAlert: typeof showAlert;
    hideAlert: typeof hideAlert;
}

interface ManageBoardModelState {
    board: BoardViewModel;
    errors: any;

    formFields: {
        name: string;
        description: string;
        addUsername: string;
    }

    isSubmitting: boolean;
    isAddingUser: boolean;
    isEditingName: boolean;
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
                description: '',
                addUsername: ''
            },
            isSubmitting: false,
            isAddingUser: false,
            isEditingName: false
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
                            description: '', // TODO: Change database to support description
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

    async onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({ isSubmitting: true });

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
                this.setState({ isSubmitting: true });
            });

        console.log('Submit');
    }

    async addUser() {
        this.props.hideAlert();
        this.setState({ isAddingUser: true });

        const data = {
            username: this.state.formFields.addUsername
        };

        await this.httpService.postWithAuthorization<Array<BoardUserViewModel>>(`/boards/${this.state.board.id}/users`, JSON.stringify(data))
            .then((boardUsers: Array<BoardUserViewModel>) => {
                this.props.showAlert(AlertType.Success, `${this.state.formFields.addUsername} has been added to ${this.state.board.name}.`);

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
                        isAddingUser: false,
                        formFields: {
                            ...prevState.formFields,
                            addUsername: ''
                        }
                    }
                });
            });
    }

    async removeUser(userId: string, username: string) {
        this.props.hideAlert();

        await this.httpService.deleteWithAuthorization<Array<BoardUserViewModel>>(`/boards/${this.state.board.id}/users/${userId}`)
            .then((boardUsers: Array<BoardUserViewModel>) => {
                this.props.showAlert(AlertType.Success, `${username} has been removed from ${this.state.board.name}.`);

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

    render() {
        return (
            <Modal id="manageBoardModal" isOpen={this.props.manageBoardModal.isOpen} onModalClose={() => null} customHeader>

                <div className="modal-header">
                    <div className="modal-meta">

                        {this.state.isEditingName
                        ?
                            <form method="post" className="edit-board-name-form" onSubmit={(event) => this.onSubmit(event)}>
                                <FormInput type="text" id="name" name="name" className="m-0" placeholder="Name this board" onChange={this.handleInputChange} value={this.state.formFields.name} autoFocus />
                                <FormFieldValidationErrors field="Name" errors={this.state.errors} />

                                <Button type="submit" isLoading={this.state.isSubmitting} className="edit-board-name ml-2" title="Save name"><i className="fas fa-check fa-fw"></i></Button>
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

                <form method="post" onSubmit={(event) => this.onSubmit(event)}>
                    <Alert slideIn={true} />

                    <div className="modal-body">
                        {this.state.board.users?.length > 0 &&
                            <div className="add-user-section">
                                <button type="button" className="button button-green button-small addUserButton">Add user</button>
                            </div>
                        }

                        {this.state.board.users?.length > 0
                        ?   <table className="table table-sm table-bordered table-full">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Added on</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.board.users?.map((boardUser: BoardUserViewModel, index: any) => {
                                        return (
                                            <tr key={index}>
                                                <td>{boardUser.username}</td>
                                                <td>{dateToReadableString(boardUser.createdAt)}</td>
                                                <td>
                                                    <button type="button" className="button button-red button-small" onClick={() => this.removeUser(boardUser.id, boardUser.username)}>Remove</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                        :   <div className="no-users-container">
                                <div className="no-users">
                                    <i className="icon icon-user-add icon-8x"></i>

                                    <h2>No users added to '{this.state.board.name}'</h2>
                                    <button type="button" className="button button-green button-small mt-4">Add user</button>
                                </div>
                            </div>

                        }
                    </div>
                </form>
            </Modal>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    manageBoardModal: state.manageBoardModal
})

export default connect(mapStateToProps, { hideManageBoardModal, showAlert, hideAlert })(ManageBoardModal);
