import React from 'react';
import { Board } from '../../components/board/board';
import { BaseLayout } from '../../layouts/base/base';

import './home.scss';

export class Home extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <BaseLayout>
                <div className="board-container">
                    <Board />
                </div>
            </BaseLayout>
        )
    }

}
