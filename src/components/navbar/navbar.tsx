import 'css/spacing.scss';
import './navbar.scss';

import { AppState } from 'store';
import React from 'react';
import { SystemState } from 'store/system/types';
import { connect } from "react-redux";
import { toggleDarkTheme } from 'store/system/actions';
import { toggleSidebar } from 'store/sidebar/actions'
import { BoardState } from 'store/board/types';
import { JWTService } from 'services/jwt.service';
import { container } from 'tsyringe';
import { Avatar } from 'components/avatar/avatar';
import { BoardHubService } from 'services/hubs/boardHub.service';
import { BoardUserViewModel } from 'models/BoardUserViewModel';
import { setJoinedUsers } from 'store/board/actions';

interface NavbarProps {
    toggleDarkTheme: typeof toggleDarkTheme;
    toggleSidebar: typeof toggleSidebar;
    setJoinedUsers: typeof setJoinedUsers;
    system: SystemState;
    activeBoard: BoardState;
    history: any;
}

class Navbar extends React.Component<NavbarProps> {

    private JWTService: JWTService;
    private boardHubService: BoardHubService;

    constructor(props: NavbarProps) {
        super(props);

        this.JWTService = container.resolve(JWTService);
        this.boardHubService = container.resolve(BoardHubService);
    }

    componentDidMount() {
        this.boardHubService.getConnection().on('UserJoinedBoard', (response) => {
            this.props.setJoinedUsers(response.joinedUsers);
        });

        this.boardHubService.getConnection().on('UserLeftBoard', (response) => {
            this.props.setJoinedUsers(response.joinedUsers);
        });
    }

    handleLogout() {
        this.JWTService.clearToken();
        this.props.history.push("/login");
    }

    toggleSidebar() {
        if (this.props.activeBoard.boardId != null) {
            this.props.toggleSidebar();
        }
    }

    render() {
        return (
            <nav className="navbar">
                <div className="branding">

                    {this.props.system.darkThemeIsActive
                        ? <img className="logo-light" src="/assets/media/logo/GeoBoard_Light.png" alt="GeoBoard" />
                        : <img className="logo-dark" src="/assets/media/logo/GeoBoard_Dark.png" alt="GeoBoard" />
                    }

                </div>

                {this.props.activeBoard.boardId &&
                    <div className="board-info">
                        <span className="board-info-prefix">Current board</span>
                        <span className="board-info-name">{this.props.activeBoard.name}</span>
                    </div>
                }

                <div className="active-board-users">
                    {this.props.activeBoard.joinedUsers?.map((user: BoardUserViewModel, index: any) => {
                        return <Avatar key={index} username={user.username} animated={true} />
                    })}
                </div>

                <ul className="nav-links ml-auto">
                    <li className="nav-link mr-0" onClick={this.props.toggleDarkTheme}>
                        {this.props.system.darkThemeIsActive
                            ? <i className="fas fa-sun fa-lg fa-fw"></i>
                            : <i className="fas fa-moon fa-lg fa-fw"></i>
                        }
                    </li>
                    <li className="nav-link sidebar-link mr-2" onClick={() => this.toggleSidebar()}>
                        <i className="fas fa-bars fa-lg fa-fw"></i>
                    </li>
                </ul>
                <div className="dropdown user-dropdown">
                    <button className="dropdown-toggle">
                        <div className="avatar-wrapper ml-2">
                            <Avatar size="sm" username={this.JWTService.getUsername()} />{this.JWTService.getUsername()}
                        </div>
                    </button>
                    <ul className="dropdown-content">
                        <li className="dropdown-item" onClick={() => this.handleLogout()}><i className="fas fa-sign-out-alt fa-fw mr-2"></i>Log out</li>
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    system: state.system,
    activeBoard: state.activeBoard
});

export default connect(mapStateToProps, { toggleDarkTheme, toggleSidebar, setJoinedUsers })(Navbar);
