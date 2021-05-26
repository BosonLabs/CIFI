import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Activitypage from "./Activitypage";
import Howitworkpage from "./Howitworkpage";
import Communitypage from "./Communitypage";
import Mypurchasepage from './Mypurchasepage'
import Createandpurchasepage from './Createandpurchasepage'
import Receivedpage from './Receivedpage';
import Explore from './Explore';
//import Popup from './src/Popup';
import Salepagecopy from "./Salepagecopy";
import Nft from "./Nft";
import App from "./App";
import DisplayData from "./DisplayData";
import Followingpage from "./Followingpage";
import Register from "./Login/Register";
import History from "./History";
import AdminRoute from "./AdminRoute";
import StartPage from "./StartPage";

import Demotesting from "./Demotesting";
//import historys from "./History";


const Routes=()=>{

    return(

        <Router>
        

        <Switch>
        {/* <Route path="/" exact component={StartPage} /> */}
        <Route path="/" exact component={App} />
            <Route path="/register" exact component={Register} />
            <Route path="/explore" exact component={Explore} />
            <Route path="/explore/:key/:oaddress" component={DisplayData} />
            <Route path="/salepagecopy" exact component={Salepagecopy} />
              {/* <Route path="/salepagecopy/:address" component={DisplayData} /> */}
              <Route path="/communitypage"  component={Communitypage} />
              <Route path="/activitypage" component={Activitypage} />
              <Route path="/howitworkpage"  component={Howitworkpage} />
              <Route path="/followingpage"  component={Followingpage} />
              <Route path="/receivedpage" component={Receivedpage} />
              <Route path="/nft" component={Nft} />
              <Route path="/testing" component={Demotesting}/>
              
              
        </Switch>

        </Router>

    );

}
export default Routes;