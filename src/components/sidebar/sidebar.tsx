import React from 'react';
import Alert from 'components/alert/alert';
import BoardListItem from './boardListItem/boardListItem';
import { CSSTransition } from 'react-transition-group';
import { container } from "tsyringe";
import { connect } from "react-redux";
import { AppState } from 'store';
import { SidebarState as SidebarState } from 'store/sidebar/types';
import { toggleSidebar } from "store/sidebar/actions"
import { HttpService } from 'services/http.service';
import { BoardViewModel } from 'models/BoardViewModel';

import 'css/components/button.scss';
import './sidebar.scss';
import { showAlert, hideAlert } from 'store/alert/actions';
import { AlertType } from 'store/alert/types';
import CreateBoard from './createBoard/createBoard';
import { mapToType } from 'helpers/helpers';
import { BoardState } from 'store/board/types';
import { JWTService } from 'services/jwt.service';
import { motion } from 'framer-motion';
import { SidebarToggle } from './sidebarToggle/sidebarToggle';

interface SidebarProps {
    toggleSidebar: typeof toggleSidebar;
    showAlert: typeof showAlert;
    hideAlert: typeof hideAlert;
    sidebar: SidebarState;
    activeBoard: BoardState;
}

interface LocalSidebarState {
    playerBoards: Array<BoardViewModel>;
}

class Sidebar extends React.Component<SidebarProps, LocalSidebarState> {

    private httpService: HttpService;
    private jwtService: JWTService;

    constructor(props: SidebarProps) {
        super(props);

        this.httpService = container.resolve(HttpService);
        this.jwtService = container.resolve(JWTService);

        this.state = {
            playerBoards: []
        }

        this.addBoard = this.addBoard.bind(this);
        this.removeBoard = this.removeBoard.bind(this);
        this.leaveBoard = this.leaveBoard.bind(this);
    }

    addBoard(board: BoardViewModel) {
        let boards = this.state.playerBoards;
        boards.push(board);

        this.setState(() => ({
            playerBoards: boards
        }))
    }

    removeBoard(boardId: string) {
        let boards = this.state.playerBoards;
        let board = mapToType<BoardViewModel>(boards.find(x => x.id === boardId));

        this.httpService.deleteWithAuthorization(`/boards/${boardId}`)
            .then((response) => {
                boards.splice(boards.indexOf(board), 1);

                this.setState(() => ({
                    playerBoards: boards
                }));

                this.props.showAlert(AlertType.Success, "Board removed!");

                setTimeout(() => {
                    this.props.hideAlert();
                }, 2000);
            })
            .catch((e) => {

                this.props.showAlert(AlertType.Error, e.status);

                setTimeout(() => {
                    this.props.hideAlert();
                }, 2000);
            });

    }

    leaveBoard(boardId: string, boardName: string) {
        let boards = this.state.playerBoards;
        let board = mapToType<BoardViewModel>(boards.find(x => x.id === boardId));

        const userId = this.jwtService.getUserId();

        this.httpService.deleteWithAuthorization(`/boards/${boardId}/users/${userId}`)
            .then((response) => {
                boards.splice(boards.indexOf(board), 1);

                this.setState(() => ({
                    playerBoards: boards
                }));

                this.props.showAlert(AlertType.Success, `You have left ${boardName}`);

                setTimeout(() => {
                    this.props.hideAlert();
                }, 2000);
            })
            .catch((e) => {

                this.props.showAlert(AlertType.Error, e.status);

                setTimeout(() => {
                    this.props.hideAlert();
                }, 2000);
            });
    }

    toggleSidebar() {
        if (this.props.activeBoard.boardId != null) {
            this.props.toggleSidebar();
        }
    }

    componentDidMount() {
        this.httpService.getWithAuthorization<Array<BoardViewModel>>('/player-boards')
            .then((response: Array<BoardViewModel>) => {

                this.setState({
                    playerBoards: response
                });
            })
            .catch((e) => {
                this.props.showAlert(AlertType.Error, "Something went wrong while getting your boards. Please try again.")

                console.warn(e);
            });
    }

    render() {

        const sidebar = {
            open: (height = 1000) => ({
                clipPath: `circle(${height * 2 + 200}px at 22rem 3rem)`,
                transition: {
                    type: "spring",
                    stiffness: 20,
                    restDelta: 2
                }
            }),
            closed: {
                clipPath: "circle(2rem at 22rem 3rem)",
                transition: {
                    delay: 0.5,
                    type: "spring",
                    stiffness: 400,
                    damping: 40
                }
            }
        };

        const variants = {
            open: {
                transition: { staggerChildren: 0.07, delayChildren: 0.2 }
            },
            closed: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 }
            }
        };

        return (

            <motion.aside className="sidebar"
                initial={false}
                animate={this.props.sidebar.isOpen ? "open" : "closed"}
                variants={sidebar}
            >
                <div className="sidebar-header">
                    <h4 className="m-0">Menu</h4>
                    <SidebarToggle toggle={() => this.toggleSidebar()} />
                </div>

                <div className="sidebar-body">
                    <Alert slideIn={true} />

                    <div className="sidebar-section">
                        <div className="section-header">
                            <CreateBoard onBoardCreated={this.addBoard} />
                        </div>

                        <motion.ul className="board-list" variants={variants}>

                            {this.state.playerBoards.length > 0
                                ? this.state.playerBoards.map((board: BoardViewModel) => {
                                    return (<BoardListItem
                                        key={board.id}
                                        boardId={board.id}
                                        boardName={board.name}
                                        userId={board.userId}
                                        username={board.owner.username}
                                        timestamp={board.createdAt}
                                        onBoardRemove={this.removeBoard}
                                        onBoardLeave={this.leaveBoard}
                                    />)
                                })

                                : <p className="sidebar-text">You don't own any boards. Create one!</p>
                            }
                        </motion.ul>
                    </div>

                    <div className="sidebar-section">
                        <div className="section-header">
                            <h3 className="sidebar-section-title">My snapshots</h3>
                        </div>

                        <p className="sidebar-text">No snapshots available.</p>
                    </div>
                </div>
            </motion.aside>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    sidebar: state.sidebar,
    activeBoard: state.activeBoard
})

export default connect(mapStateToProps, { toggleSidebar, showAlert, hideAlert })(Sidebar);

