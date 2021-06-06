import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import listUser from "./components/list-user/listUser";
// import { listUser } from "./components/list-user/listUser";
import Register from "./components/register/Register";
// import ExampleComponent from "./components/test";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Register} />
        <Route exact path="/list-user" component={listUser} />
      </Switch>
    );
  }
}

export default Routes;
