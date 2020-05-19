import React from 'react';
import ReactDOM from 'react-dom';
import { Board } from '../board/board';
import { Sidebar } from '../sidebar/sidebar';

export class Home extends React.Component {

    render() {
        return (
            <div>
                <Board />
                <Sidebar />
            </div>
        )
    }

}
