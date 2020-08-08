import React from 'react';

import './menu.scss';

interface MenuProps {
    visable: boolean;
}

export class Menu extends React.Component<MenuProps> {

    constructor(props: any) {
        super(props);

        this.state = {
        }
    }

    displayMenu() {

    }

    render() {

        return (
            <>
                <div className={this.props.visable ? "menu" : "menu hidden"}></div>
            </>
        )
    }
}
