import React from "react";
import Users from "../app/layouts/users";
import NavBar from "./components/ui/navBar/navBar";
import Main from "../app/layouts/main";
import { Route, Switch } from "react-router-dom";
import Login from "../app/layouts/login";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/users/:userId/:edit?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users" component={Users} />
            </Switch>
        </div>
    );
}

export default App;
