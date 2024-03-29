import { Component } from "react";
import React from "react";

import './avatar.scss';

interface AvatarProps {
    userName: string;
    imagePath?: string;
    size?: "sm" | "m";
    animated?: boolean;
}

export class Avatar extends Component<AvatarProps> {

    // TODO: Extend attributes (for data-tags)

    constructor(props: any) {
        super(props);
    }

    getNameAbbreviation(): string {

        if (this.props.userName == undefined) {
            return "X";
        }

        return this.props.userName[0]?.toUpperCase();
    }

    render() {
        const sizeClass = (this.props.size) ? ` avatar-${this.props.size}` : '';
        const animationClass = (this.props.animated) ? ' animated bounceIn' : '';

        return (
            <div className={`avatar${sizeClass}${animationClass}`} title={this.props.userName}>
                {this.props.imagePath
                    ? <img src={this.props.imagePath} alt={this.props.userName} className="avatar-img"></img>
                    : <span className="avatar-title">{this.getNameAbbreviation()}</span>
                }
            </div>
        );
    }

}

{/* <li className="avatar" title="matthijs" data-user="1234">
    <img src="https://i.imgur.com/7RcAN5C.jpg" width="400" alt="..." className="avatar-img">
</li>

<li className="avatar" title="luuk" data-user="5678">
    <span className="avatar-title">L</span>
</li> */}
