import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './Nav';
import CharacterList from './CharacterList';
import DetailsCard from './DetailsCard';

export default function Routes() {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route exact path="/" component={CharacterList} />
                <Route path="/details/:id" component={DetailsCard} />
            </Switch>
        </Router>
    )
}
