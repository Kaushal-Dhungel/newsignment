import React from 'react';
import Home from './Home';
import { BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Login from './Login';
import CreateArticles from './CreateArticles';
import ViewArticle from './ViewArticle';
import Submitted from './Submitted';
import Navbar from './Navbar';

const App = () => {
    return (
        <>
            <BrowserRouter >
                <Navbar />
                <Switch>
                    <Route exact path = '/' component = {Home}/> 
                    <Route exact path = '/login' component = {Login}/> 
                    <Route exact path = '/create' component = {CreateArticles}/> 
                    <Route exact path = '/view/:id' component = {ViewArticle}/> 
                    <Route exact path = '/submitted' component = {Submitted}/> 

                    <Redirect to  ="/" />
                </Switch>
            </BrowserRouter>
        </>
    )
}
export default App;