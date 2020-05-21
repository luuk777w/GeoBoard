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
                />
                <BoardElement
                    id="4567"
                    number={2}
                    user={new UserViewModel}
                    direction={1}
                    imagePath="https://geoboard.luukwuijster.dev/images/userImages/25-04-2020T22.03.37.797.jpg"
                    createdAt="21-05-2020 20:01"
                />
            </>
        )
    }

}
