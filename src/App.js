import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components"
import Home from "./components/Home"
import Pizza from "./components/Pizza"

const AppComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  margin: auto;
`

const App = () => {
  return (
    <AppComponent>
      <Switch>
        <Route 
          path="/pizza"
          render={props => (
            <Pizza {...props} />
          )}
        />
        <Route 
          path="/"
          render={props => (
            <Home {...props} />
          )}
        />
      </Switch>
    </AppComponent>
  );
};
export default App;
