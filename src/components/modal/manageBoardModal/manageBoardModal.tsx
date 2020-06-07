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
    isInviting: boolean;
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
            isInviting: false
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
            await this.httpService.getWithAuthorization<BoardViewModel>(`/boards/${this.props.manageBoardModal.boardId}`).then((response: BoardViewModel) => {
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

    async onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        console.log('Submit');

        this.props.hideManageBoardModal();
    }

    async addUser() {

        this.props.hideAlert();
        this.setState({ isInviting: true });

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
                        isInviting: false,
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
            <Modal id="manageBoardModal" isOpen={this.props.manageBoardModal.isOpen} title="Edit board information" subtitle={this.state.board.name}  onModalClose={() => this.props.hideManageBoardModal()} closable>
                <form method="post" onSubmit={(event) => this.onSubmit(event)}>
                    <div className="modal-body">
                        <Alert slideIn={true} />

                        <FormGroup>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <FormInput type="text" id="name" name="name" placeholder="Choose a cool name for this board." onChange={this.handleInputChange} value={this.state.formFields.name} autoFocus />

                            <FormFieldValidationErrors field="Name" errors={this.state.errors} />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel htmlFor="description">Description</FormLabel>
                            <FormInput type="text" id="description" name="description" placeholder="Optional description" onChange={this.handleInputChange} value={this.state.formFields.description} />

                            <FormFieldValidationErrors field="Description" errors={this.state.errors} />
                        </FormGroup>
                    </div>
                    <div className="modal-body">
                        <h4 className="mt-0">Users</h4>
                        {this.state.board.users?.length > 0
                            ?
                            <table className="table table-sm table-bordered table-full">
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

                            : <p>No users added to this board.</p>
                        }
                    </div>
                    <div className="modal-body">
                        <FormGroup>
                            <h4 className="mt-0">Invite user</h4>
                            <div className="input-group">
                                <FormInput type="text" name="addUsername" placeholder="Type the name of the user you want to invite" value={this.state.formFields.addUsername} onChange={this.handleInputChange} />
                                <Button type="button" isLoading={this.state.isInviting} className="button button-small button-blue" onClick={() => this.addUser()}>Invite</Button>
                            </div>
                        </FormGroup>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="button button-green button-small">Save</button>
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
