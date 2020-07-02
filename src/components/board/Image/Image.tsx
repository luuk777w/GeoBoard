import { Component, useRef } from "react";
import React from "react";

import './Image.scss';
import { motion, useElementScroll } from "framer-motion";

interface ImageProps {
    imageUrl: string;
    showLargeImage: boolean;
    setRef: any;
    onLargeImageClose: any;
}

interface ImageState {
    imageNotFound: boolean;
    zoom: number;
}

export class Image extends Component<ImageProps, ImageState> {

    private ref: any;
    private prevZoom = 1.0;

    constructor(props: ImageProps) {
        super(props);

        this.state = {
            imageNotFound: false,
            zoom: 1.0
        }

        this.listenToScroll = this.listenToScroll.bind(this);
    }

    onImageError() {
        this.setState({
            imageNotFound: true
        });
    }

    close(event: any) {
        let zoom = this.state.zoom;

        this.setState({
            zoom: 1.0
        });

        let time = 20;
        if (zoom > 1.0 && zoom < 2.0) { time = parseInt(zoom.toString()[2]) * 20; }
        if (zoom > 1.9) { time = 200 }

        setTimeout(() => {
            this.props.onLargeImageClose(event);
        }, time);
    }

    componentDidMount() {
        this.ref.addEventListener('mousewheel', this.listenToScroll)
    }

    componentWillUnmount() {
        this.ref.removeEventListener('mousewheel', this.listenToScroll)
    }

    listenToScroll(e: any) {
        let zoom = this.state.zoom;

        if (e.deltaY == -100) {
            if (zoom < 2) {
                zoom += 0.1;
                this.setState({
                    zoom: zoom
                })
            }
        } else if (e.deltaY == 100) {
            if (zoom > 1) {
                zoom -= 0.1;
                this.setState({
                    zoom: zoom
                })
            }
        }
    }

    zoomUpdate() {
        if (this.prevZoom == this.state.zoom || this.state.zoom == 2.0 || this.state.zoom == 1.0) {
            return false;
        } else {
            this.prevZoom = this.state.zoom;
            return true;
        }
    }

    render() {

        if (this.state.imageNotFound) {
            return (
                <div className="board-element-image-error">
                    <i className="icon icon-image icon-8x"></i>
                    <span className="board-element-image-error-message">Image not available</span>
                </div>
            )
        }

        return (
            <>

                <motion.div
                    className={"large-image-overlay"}
                    animate={this.props.showLargeImage ? { opacity: 0.8 } : { opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ pointerEvents: this.props.showLargeImage ? "auto" : "none" }}
                >
                </motion.div>

                <div
                    className={this.props.showLargeImage ? "large-image-container-open" : "large-image-container-closed"}
                    onClick={() => this.close(event)}
                    ref={(ref) => this.ref = ref}
                >
                    <motion.img
                        layoutTransition={this.zoomUpdate() ? false : {
                            damping: 30,
                            stiffness: 200
                        }}
                        animate={{ scale: this.state.zoom }}
                        className={this.props.showLargeImage ? "large-image" : "board-element-image"}
                        src={this.props.imageUrl}
                        onError={() => this.onImageError()}
                        ref={(ref) => this.props.setRef(ref)} />
                </div>

            </>
        );
    }
}
