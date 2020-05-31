import { Component } from "react";
import React from "react";

import './avatar.scss';

interface AvatarProps {
    username: string;
    imagePath?: string;
    size?: "xs" | "s" | "m" | "l" | "xl";
    animated?: boolean;
}

export class Avatar extends Component<AvatarProps> {

    // TODO: Dynamic animation
    // TODO: Dyanmic sizes (force available strings?)
    // TODO: Extend attributes (for data-tags)

    constructor(props: any) {
        super(props);
    }

    getNameAbbreviation(): string {
        return this.props.username[0].toUpperCase();
    }

    render() {
        return (
            <div className="avatar animated bounceIn" title={this.props.username}>
                {this.props.imagePath
                    ? <img src={this.props.imagePath} alt={this.props.username} className="avatar-img"></img>
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