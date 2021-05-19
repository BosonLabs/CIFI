import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'semantic-ui-css/semantic.min.css';

import Routes from "./Routes";

//ReactDOM.render(<App />, document.getElementById("root"));

ReactDOM.render(<Routes />, document.getElementById("root"));


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );