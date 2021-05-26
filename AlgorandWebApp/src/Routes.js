import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import Extracheck from "./Extracheck";

//import Activitypage from "./3-";

const Routes=()=>{

    return(

        <Router>
        

        <Switch>
        {/* <Route path="/" exact component={StartPage} /> */}
        <Route path="/" exact component={App} />
            <Route path="/apps" exact component={Extracheck} />                          
        </Switch>

        </Router>

    );

}
export default Routes;