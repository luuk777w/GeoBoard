import React from 'react';
import { Board } from '../../components/board/board';
import Sidebar from '../../components/sidebar/sidebar';
import { BaseLayout } from '../../layouts/base/base';

export class Home extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <BaseLayout>
                <Board />
                <Sidebar />
            </BaseLayout>
        )
    }

}
