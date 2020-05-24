import React from 'react';
import { Board } from 'components/board/board';
import BaseContainer from 'containers/base/base';

import './home.scss';

export class Home extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <BaseContainer>
                <div className="board-container">
                    <Board />
                </div>
            </BaseContainer>
        )
    }

}
