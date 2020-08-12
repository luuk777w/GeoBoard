import React from 'react';

import './menu.scss';
import { motion } from 'framer-motion';
import { BoardElementViewModel } from 'models/BoardElementViewModel';
import { removeAction } from './menuAction/removeAction';

interface MenuProps {
    visable: boolean;
    hideMenu: any;
    element: BoardElementViewModel;
}

export class Menu extends React.Component<MenuProps> {

    constructor(props: any) {
        super(props);

        this.state = {
        }
    }

    render() {

        const menuAnimation = {
            open: {
                clipPath: `circle(500px at 40px 40px)`,
                transition: {
                    type: "spring",
                    stiffness: 50
                }
            },
            closed: {
                clipPath: "circle(0px at -10px 27px)",
                transition: {
                    type: "spring",
                    stiffness: 450,
                    damping: 40
                }
            }
        }

        return (
            <>
                <motion.div
                    className={this.props.visable ? "menu" : "menu"}
                    onClick={() => this.props.hideMenu()}
                    animate={this.props.visable ? "open" : "closed"}
                    variants={menuAnimation}>

                    <ul>
                        <li onClick={() => { removeAction(this.props.element.id) }}>
                            <div className="icon"><i className="fas fa-trash fa-fw"></i></div> {/* Verwijderen verzoeken als dit niet het element van de gebruiker is. */}
                            <div className="body">Remove</div>
                        </li>
                        <li onClick={() => { console.warn("Not implemented yet.") }}>
                            <div className="icon"><i className="fas fa-pen fa-fw"></i></div>
                            <div className="body">Edit</div>
                        </li>
                        <li onClick={() => { console.warn("Not implemented yet.") }}>
                            <div className="icon"><i className="fas fa-share fa-fw"></i></div>
                            <div className="body">Move</div>
                        </li>
                        <li onClick={() => { console.warn("Not implemented yet.") }}>
                            <div className="icon"><i className="fas fa-copy fa-fw"></i></div>
                            <div className="body">Copy</div>
                        </li>
                        <li onClick={() => { console.warn("Not implemented yet.") }}>
                            <div className="icon"><i className="fas fa-thumbtack fa-fw"></i></div>
                            <div className="body">Pin</div>
                        </li>
                        <li onClick={() => { console.warn("Not implemented yet.") }}>
                            <div className="icon"><i className="fas fa-arrows-alt fa-fw"></i></div>
                            <div className="body">Move on board</div>
                        </li>
                        <li onClick={() => { console.warn("Not implemented yet.") }}>
                            <div className="icon"><i className="fas fa-bell fa-fw"></i></div>
                            <div className="body">Alert</div>
                        </li>
                    </ul>

                </motion.div>
            </>
        )
    }
}
