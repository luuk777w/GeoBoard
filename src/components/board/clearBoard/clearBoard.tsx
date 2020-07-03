import { Component, useRef, useState } from "react";
import React from "react";

import './clearBoard.scss';
import { motion, useElementScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { BlinkingArrow } from "./blinkingArrow";

export const ClearBoard = () => {

    const [spring, setSpring] = useState<boolean>();
    const [requestClearBoard, setRequestClearBoard] = useState<boolean>();
    const [hovering, setHovering] = useState<boolean>();
    const [started, setStarted] = useState<boolean>(false);

    const y = useMotionValue(0);
    const ySpring = useSpring(y, { stiffness: 200, damping: 20 });
    const yRange = useTransform(y, [10, 170], [0, 1]);
    const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

    const onDrag = () => {
        if (y.get() == 170) {
            console.log("del");
            setRequestClearBoard(true);

            setTimeout(() => {
                setHovering(false);
                setStarted(false)
                setSpring(true);
                y.set(0);
            }, 1000);
        }
    }

    const start = () => {
        setStarted(true)
        setRequestClearBoard(false);
        setSpring(false);
    }

    const end = () => {
        setStarted(false)
        setHovering(false);
        setSpring(true);
        y.set(0);
    }

    const startHover = () => {
        setHovering(true);
    }

    const endHover = () => {
        if (started == false) {
            setHovering(false);
        }
    }

    return (
        <>
            <div className="clear-board-container">
                <motion.div className="clear-board-button"
                    drag={requestClearBoard ? false : "y"}
                    style={spring ? { y: ySpring } : { y: y }}
                    dragConstraints={{
                        top: 0,
                        bottom: 170,
                    }}
                    dragElastic={false}
                    dragMomentum={false}
                    onDrag={() => onDrag()}
                    onHoverStart={() => startHover()}
                    onHoverEnd={() => endHover()}
                    onDragStart={() => start()}
                    onDragEnd={() => end()}
                >
                    <div className="clear-board-button-icon">
                        <svg className="clear-board-progress" viewBox="0 0 44 44" x="0px" y="0px" width="70" height="70">
                            <motion.path
                                fill="none"
                                strokeWidth={3}
                                stroke="white"
                                strokeDasharray="0 1"
                                d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                                style={{
                                    pathLength,
                                    rotate: 90,
                                    translateX: 2,
                                    translateY: 2,
                                    scaleX: -1 // Reverse direction of line animation
                                }}
                            />
                        </svg>
                    </div>


                </motion.div>

                <AnimatePresence>

                    {hovering &&
                        <>
                            <BlinkingArrow key={1} delay={false} />
                            <BlinkingArrow key={2} delay={true} />
                        </>
                    }

                </AnimatePresence>

            </div>
        </>
    );
}
