import React from 'react';
import styles from './navbar.scss';
import spacing from '../../css/spacing.scss';

export class Navbar extends React.Component {

    render() {

        //TODO implementeer dit
        const currentBoard = "Hallo"

        const displayNone = {
            display: "none"
        }

        return (
            <nav className={styles.navbar}>
                <div className={styles.branding}>
                    <img className="logo-dark" src="../assets/media/logo/GeoBoard_Dark.png" alt="GeoBoard" />
                    <img className="logo-light" src="../assets/media/logo/GeoBoard_Light.png" alt="GeoBoard" style={displayNone} />
                </div>
                <div className={styles.boardInfo}>
                    <span className={styles.boardInfoPrefix}>Current board</span>
                    <span className={styles.boardInfoName}>{currentBoard}</span>
                </div>

                <ul className="activeBoardUsers">

                </ul>

                <ul className={`${styles.navLinks} ${spacing.mlAuto}`}>
                    <li className={styles.navLink} data-target="theme"></li>
                    <li className={styles.navLink} data-target="logout">
                        <i className="fas fa-sign-out-alt fa-fw mr-1"></i>Log out
                    </li>
                    <li className={`${styles.navLink} ${styles.sidebarLink}`} data-target="sidebar">
                        <i className="fas fa-bars fa-lg fa-fw"></i>
                    </li>
                </ul>

            </nav>
        )
    }

}
