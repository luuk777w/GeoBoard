import React from 'react';
import ReactDOM from 'react-dom';
import { Board } from '../board/board';
import { Sidebar } from '../sidebar/sidebar';

export class Home extends React.Component<HomeProps, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <>
                <Board />
                <Sidebar isOpen={this.props.sidebarIsOpen} toggleSidebar={this.props.toggleSidebar} />
            </>
        )
    }

}

interface HomeProps {
    sidebarIsOpen: boolean;
    toggleSidebar: () => void;
}
