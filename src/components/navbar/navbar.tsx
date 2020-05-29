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

interface NavbarProps {
    toggleDarkTheme: typeof toggleDarkTheme;
    toggleSidebar: typeof toggleSidebar;
    system: SystemState;
    activeBoardState: BoardState;
    history: any;
}

class Navbar extends React.Component<NavbarProps> {

    private JWTService: JWTService;

    constructor(props: NavbarProps) {
        super(props);
        this.JWTService = container.resolve(JWTService);
    }

    handleLogout() {
        this.JWTService.clearToken();
        this.props.history.push("/login");
    }

    render() {
        return (
            <nav className="navbar">
                <div className="branding">

                    {this.props.system.darkThemeIsActive
                        ? <img className="logo-light" src="assets/media/logo/GeoBoard_Light.png" alt="GeoBoard" />
                        : <img className="logo-dark" src="assets/media/logo/GeoBoard_Dark.png" alt="GeoBoard" />
                    }

                </div>

                {this.props.activeBoardState.boardId &&
                    <div className="board-info">
                        <span className="board-info-prefix">Current board</span>
                        <span className="board-info-name">{this.props.activeBoardState.name}</span>
                    </div>
                }

                <div className="active-board-users">
                    <Avatar imagePath="https://i.imgur.com/7RcAN5C.jpg" name="Matthijs" />
                    <Avatar name="Luuk" />
                </div>

                <ul className="nav-links ml-auto">
                    <li className="nav-link" onClick={this.props.toggleDarkTheme}>
                        {this.props.system.darkThemeIsActive
                            ? <i className="far fa-sun fa-lg fa-fw"></i>
                            : <i className="fas fa-moon fa-lg fa-fw"></i>
                        }
                    </li>
                    <li className="nav-link" data-target="logout" onClick={() => this.handleLogout()}>
                        <i className="fas fa-sign-out-alt fa-fw mr-1"></i>Log out
                    </li>
                    <li className="nav-link sidebar-link" onClick={this.props.toggleSidebar}>
                        <i className="fas fa-bars fa-lg fa-fw"></i>
                    </li>
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    system: state.system,
    activeBoardState: state.activeBoard
});

export default connect(mapStateToProps, { toggleDarkTheme, toggleSidebar })(Navbar);
