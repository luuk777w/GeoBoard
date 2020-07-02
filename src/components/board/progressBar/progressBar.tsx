import { Component } from "react";
import React from "react";

import './progressBar.scss';
import { AnimatePresence, motion } from "framer-motion";

interface progressBarProps {
    userId: string,
    elementUserId: string,
    precentage: number
}

export class ProgressBar extends Component<progressBarProps> {
    constructor(props: progressBarProps) {
        super(props);
    }

    render() {
        if (this.props.userId == this.props.elementUserId) {

            let roundedPrecentage = Math.round(this.props.precentage);

            return (
                <div className="progress-bar-container">
                    <p>Uploading image...</p>
                    <div className="progress-bar">
                        <div className="progress-bar-inner" style={{ width: roundedPrecentage + "%" }}></div>
                        <div className="progress-bar-precentage">{roundedPrecentage}%</div>
                    </div>
                </div>
            )

        } else {
            return (
                <div className="progress-bar-container" style={{ height: "9rem" }}>
                    <p className="mt-0">Uploading image...</p>
                    <motion.div className="icon icon-rocket icon-6x"
                        animate={{
                            x: [-1, 1, -1]
                        }}
                        transition={{
                            duration: 0.2,
                            loop: Infinity
                        }}
                    ></motion.div>
                </div>
            )
        }

    }
}
