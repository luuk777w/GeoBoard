import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.scss'
import styles from './index.scss';
import { Home } from './components/home/home'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Navbar } from './components/navbar/navbar';


class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/about">
                    </Route>
                    <Route path="/users">
                    </Route>
                    <Route path="/">
                        <Navbar />
                        <Home />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
