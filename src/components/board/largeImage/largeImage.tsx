import { Component } from "react";
import React from "react";

import './largeImage.scss';
import { AnimatePresence, motion } from "framer-motion";

interface largeImageProps {
    imageUrl: string;
    show: boolean;
    onClose: any;
}

export class LargeImage extends Component<largeImageProps> {
    constructor(props: largeImageProps) {
        super(props);
    }

    close(event: any) {
        if (event.target.localName == "img") return;

        this.props.onClose();
    }

    render() {

        return (
            <>
                <AnimatePresence initial={false} >
                    {this.props.show &&
                        <div className="large-image-container" onClick={() => this.close(event)}>

                            <motion.img className="large-image" src={this.props.imageUrl}
                                key={1}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.2 }}
                                whileHover={{ scale: 1.5 }}
                            />

                        </div>
                    }
                </AnimatePresence>


            </>
        );
    }
}
