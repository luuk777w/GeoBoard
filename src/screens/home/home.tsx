import React from 'react';
import ReactDOM from 'react-dom';
import { Board } from '../../components/board/board';
import { Sidebar } from '../../components/sidebar/sidebar';
import { BaseLayout } from '../../layouts/base/base';

export class Home extends React.Component<HomeProps, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <BaseLayout>
                <Board />
                <Sidebar isOpen={this.props.sidebarIsOpen} toggleSidebar={this.props.toggleSidebar} />
            </BaseLayout>
        )
    }

}

interface HomeProps {
    sidebarIsOpen: boolean;
    toggleSidebar: () => void;
}
