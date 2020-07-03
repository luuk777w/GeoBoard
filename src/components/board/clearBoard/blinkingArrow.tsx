import { Component, useRef } from "react";
import React from "react";

import './clearBoard.scss';
import { motion, useElementScroll, AnimatePresence } from "framer-motion";

interface BlinkingArrowProps {
    delay: boolean
}

export class BlinkingArrow extends Component<BlinkingArrowProps> {

    render() {

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}>
                <motion.svg x="0px" y="0px" viewBox="0 0 490.688 490.688" className="clear-board-arrows" width="45" height="45"
                    animate={{
                        fill: this.props.delay
                            ? ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "#EEEEEE", "rgba(0,0,0,0)"]
                            : ["rgba(0,0,0,0)", "#EEEEEE", "rgba(0,0,0,0)", "rgba(0,0,0,0)"]
                    }}
                    transition={{
                        duration: 1.5,
                        loop: Infinity,
                    }}
                >
                    <motion.path d="M472.328,216.529L245.213,443.665L18.098,216.529c-4.237-4.093-10.99-3.975-15.083,0.262
		                                                            c-3.992,4.134-3.992,10.687,0,14.82l234.667,234.667c4.165,4.164,10.917,4.164,15.083,0l234.667-234.667
                                                                    c4.093-4.237,3.975-10.99-0.262-15.083c-4.134-3.993-10.687-3.993-14.821,0L472.328,216.529z"/>
                    <motion.path d="M472.328,24.529L245.213,251.665L18.098,24.529c-4.237-4.093-10.99-3.975-15.083,0.262
		                                                            c-3.992,4.134-3.992,10.687,0,14.821l234.667,234.667c4.165,4.164,10.917,4.164,15.083,0L487.432,39.612
		                                                            c4.237-4.093,4.354-10.845,0.262-15.083c-4.093-4.237-10.845-4.354-15.083-0.262c-0.089,0.086-0.176,0.173-0.262,0.262
                                                                    L472.328,24.529z"/>
                </motion.svg>
            </motion.div>
        );
    }
}
