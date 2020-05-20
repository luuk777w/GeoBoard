import "reflect-metadata";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/main.scss'
import './index.scss';
import { Home } from './components/home/home'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Navbar } from './components/navbar/navbar';

class App extends Component<{}, AppState> {

    constructor(props: any) {
        super(props);

        this.state = {
            sidebarIsOpen: false
        };
    }

    toggleSidebar() {
        this.setState(state => ({
            sidebarIsOpen: !state.sidebarIsOpen
        }));
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/">
                        <Navbar sidebarIsOpen={this.state.sidebarIsOpen} toggleSidebar={() => this.toggleSidebar()} />
                        <Home sidebarIsOpen={this.state.sidebarIsOpen} toggleSidebar={() => this.toggleSidebar()} />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

interface AppState {
    sidebarIsOpen: boolean;
}
