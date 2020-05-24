import React from 'react';
import Board from 'components/board/board';
import BaseContainer from 'containers/base/base';

import './home.scss';

interface HomeProps {
    history: any;
}

export class Home extends React.Component<HomeProps> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <BaseContainer history={this.props.history}>
                <div className="board-container">
                    <Board />
                </div>
            </BaseContainer>
        )
    }

}
