/* global AlgoSigner */
import './App.css';
import {Button, Container, Header, Message} from "semantic-ui-react";
import {useState, useCallback} from "react";
import { Link } from "react-router-dom";

const appId = 13793863;



/**
 * React Component displaying a title, a button doing some (AlgoSigner-related) actions
 * and a message with the result.
 *
 * @param buttonAction is a (potentially async) function called when clicking on the button
 *   and returning the result to be displayed
 */
const ExampleAlgoSigner = ({title, buttonText, buttonAction}) => {
  const [res, setRes] = useState("");
  
  const [result, setResult] = useState("");
  const onClick = useCallback(async () => {
    const r = await buttonAction();
    setResult(r);
  }, [buttonAction]);

  return (
    <>
      {/* <h1>helloo</h1> */}
      <Link
              to="/apps">

      {/* <button type="button" >App3</button> */}
      </Link>
      <Header as="h2" dividing>{title}</Header>
      <Button primary={true} onClick={onClick}>{buttonText}</Button>
      <Message>
        <code>
          {result}
        </code>
      </Message>
    </>
  );
};

// The following components are all demonstrating some features of AlgoSigner

const CheckAlgoSigner = () => {
  const action = useCallback(() => {
    if (typeof AlgoSigner !== 'undefined') {
      return "AlgoSigner is installed.";
    } else {
      return "AlgoSigner is NOT installed.";
    }
  }, []);

  return <
    ExampleAlgoSigner title="CheckAlgoSigner" buttonText="Check" buttonAction={action}
    />
};

let arr=[];


const GetAccounts = () => {
  const action = useCallback(async () => {    
    await AlgoSigner.connect({
      ledger: 'TestNet'
    });
    const accts = await AlgoSigner.accounts({
      ledger: 'TestNet'
    });
    //const accts = await AlgoSigner.accounts({})
    //alert("acc"+accts);
    arr.push(JSON.stringify(accts, null, 2))

    return JSON.stringify(accts[0], null, 2);

    
  }, []);


  //

  return <ExampleAlgoSigner title="Get Accounts" buttonText="Get Accounts" buttonAction={action}/>
};



console.log("logg",arr);



// const GetParams = () => {
//   const action = useCallback(async () => {
//     try {
//       const r = await AlgoSigner.algod({
//         ledger: 'TestNet',
//         path: `/v2/transactions/params`
//       });
//       return JSON.stringify(r, null, 2);
//     } catch (e) {
//       console.error(e);
//       return JSON.stringify(e, null, 2);
//     }
//   }, []);

//   return <ExampleAlgoSigner title="Get Transaction Params" buttonText="Get Transaction Params" buttonAction={action}/>
// };


// const GetAppGlobalState = () => {
//   const action = useCallback(async () => {
//     try {
//       const r = await AlgoSigner.indexer({
//         ledger: 'TestNet',
//         path: `/v2/applications/${appId}`
//       });
//       return JSON.stringify(r, null, 2);
      
//     } catch (e) {
//       console.error(e);
//       return JSON.stringify(e, null, 2);
//     }
//   }, []);

//   return <ExampleAlgoSigner title="Get Global State" buttonText="Get Global State" buttonAction={action}/>
// };

const App = () => {
  return (
    <Container className="App">
      <Header as="h1" dividing>Simple React App Using AlgoSigner</Header>
      {/* <p>
        The Pure Stake Team provide many examples using AlgoSigner.
        See <a
        href="https://purestake.github.io/algosigner-dapp-example">https://purestake.github.io/algosigner-dapp-example</a> for
        more examples.
      </p> */}

      <CheckAlgoSigner/>

      <GetAccounts/>

      {/* <GetParams/>

      <GetAppGlobalState/> */}

    </Container>
  );
};

export default App;
