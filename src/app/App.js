import React from "react";
import Users from "./components/users/users";
import NavBar from "./components/navBar/navBar";
import Main from "./components/mainPage/mainPage";
import { Route, Switch } from "react-router-dom";
import Login from "./components/loginPage/loginPage";
import UserPage from "./components/userPage/userPage";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/users/:userId" component={Users} />
                <Route path="/login" component={Login} />
                <Route path="/users" component={Users} />
            </Switch>
        </div>
    );
}

export default App;
