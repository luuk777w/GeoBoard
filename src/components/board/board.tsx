import React from 'react';
import { BoardElement } from './boardElement/boardElement';
import { UserViewModel } from '../../models/UserViewModel';
import { Config } from 'services/config.service';
import { container } from 'tsyringe';

import './board.scss'
import { BoardState } from 'store/board/types';
import { AppState } from 'store';
import { connect } from 'react-redux';

interface BoardProps {
    board: BoardState;
}

class Board extends React.Component<BoardProps> {

    private configService: Config;

    constructor(props: any) {
        super(props);

        this.configService = container.resolve(Config);
    }

    render() {

        if (this.props.board.activeBoardId != '') {
            document.title = `${this.configService.siteName} | ${this.props.board.activeBoardName}`;
        }
        else
        {
            document.title = this.configService.siteName;
        }

        return (
            <div className="board-elements">
                <BoardElement
                    id="1234"
                    number={1}
                    user={new UserViewModel}
                    direction={1}
                    note="Hallo daar"
                    createdAt="21-05-2020 20:00"
                />
                <BoardElement
                    id="4567"
                    number={2}
                    user={new UserViewModel}
                    direction={1}
                    imagePath="https://geoboard.luukwuijster.dev/images/userImages/25-04-2020T22.03.37.797.jpg"
                    createdAt="21-05-2020 20:01"
                />
            </div>
        )
    }

}

const mapStateToProps = (state: AppState) => ({
    board: state.board
});

export default connect(mapStateToProps, { })(Board);
