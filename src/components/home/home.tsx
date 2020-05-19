import React from 'react';
import ReactDOM from 'react-dom';
import { Board } from '../board/board';
import { SideNav } from '../sidenav/sidenav';

export class Home extends React.Component {

    render() {
        return (
            <div>
                <Board />
                <SideNav />
            </div>
        )
    }

}
