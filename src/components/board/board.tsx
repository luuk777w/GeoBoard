import React from 'react';
import { BoardElement } from './boardElement/boardElement';
import { UserViewModel } from '../../models/UserViewModel';
import './board.scss'

export class Board extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <>
                <BoardElement
                    id="1234"
                    number={1}
                    user={new UserViewModel}
                    direction={1}
                    note="Hallo daar"
                    createdAt="21-05-2020 20:00"
                ></BoardElement>
            </>
        )
    }

}
