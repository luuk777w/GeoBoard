import { Component, useRef, useState } from "react";
import React from "react";

import './clearBoard.scss';
import { motion, useElementScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { BlinkingArrow } from "./blinkingArrow";
import { HttpService } from "services/http.service";
import { container } from "tsyringe";

export const ClearBoard = () => {

    const [spring, setSpring] = useState<boolean>();
    const [isFinished, setIsFinished] = useState<boolean>();
    const [hovering, setHovering] = useState<boolean>();
    const [started, setStarted] = useState<boolean>(false);
    const [drag, setDrag] = useState<boolean>(true);

    const y = useMotionValue(0);
    const ySpring = useSpring(y, { stiffness: 200, damping: 20 });
    const yRange = useTransform(y, [2, 170], [0, 1]);
    const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

    const springStyle = spring ? { y: ySpring } : { y: y };
    const background = isFinished && { background: "linear-gradient(90deg, #4CAF50 50%, #43A047 50%)" };
    const backgroundImage = isFinished && { backgroundImage: "none" };

    const httpService: HttpService = container.resolve(HttpService);

    const start = () => {
        setDrag(true);
        setStarted(true)
        setIsFinished(false);
        setSpring(false);
    }

    const end = () => {
        setStarted(false);
        setHovering(false);

        if (y.get() == 170) {
            setDrag(false);

            httpService.deleteWithAuthorization("/boards/clear").then(() => {
                setIsFinished(true);

                setTimeout(() => {
                    setDrag(true);
                    setIsFinished(false);
                    setSpring(true);
                    y.set(0);
                }, 1000);

            }, error => {
                setDrag(true);
                setSpring(true);
                y.set(0);
            });

        } else {
            setSpring(true);
            y.set(0);
        }
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
                    drag={drag ? "y" : false}
                    style={{ ...springStyle, ...background }}
                    dragConstraints={{
                        top: 0,
                        bottom: 170,
                    }}
                    dragElastic={false}
                    dragMomentum={false}
                    onHoverStart={() => startHover()}
                    onHoverEnd={() => endHover()}
                    onDragStart={() => start()}
                    onDragEnd={() => end()}
                >
                    <div className="clear-board-button-icon" style={{ ...backgroundImage }} >
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

                            <motion.path
                                fill="none"
                                strokeWidth="5"
                                stroke="white"
                                d="M14,26 L 22,33 L 35,16"
                                initial={false}
                                strokeDasharray="0 1"
                                style={{
                                    translateY: -3,
                                    translateX: -2
                                }}
                                animate={{ pathLength: isFinished ? 1 : 0 }}
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
