import React from "react";
import Users from "./components/users";
import NavBar from "./components/navBar/navBar";
import Main from "./components/main";
import { Route, Switch } from "react-router-dom";
import Login from "./components/login";
import User from "./components/user";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route
                    path="/users/:userId"
                    render={(props) => <User {...props} />}
                />
                <Route path="/login" component={Login} />
                <Route path="/users" component={Users} />
            </Switch>
        </div>
    );
}

export default App;
