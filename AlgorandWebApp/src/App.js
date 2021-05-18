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
const con=async()=>{
  let note = undefined; // arbitrary data to be stored in the transaction; here, none is stored
// Asset creation specific parameters
// The following parameters are asset specific
// Throughout the example these will be re-used. 
// We will also change the manager later in the example
let addr = recoveredAccount1.addr;
// Whether user accounts will need to be unfrozen before transacting    
let defaultFrozen = false;
// integer number of decimals for asset unit calculation
let decimals = 0;
// total number of this asset available for circulation   
let totalIssuance = 1000;
// Used to display asset units to user    
let unitName = "LATINUM";
// Friendly name of the asset    
let assetName = "latinum";
// Optional string pointing to a URL relating to the asset
let assetURL = "http://someurl";
// Optional hash commitment of some sort relating to the asset. 32 character length.
let assetMetadataHash = "16efaa3924a6fd9d3a4824799a4ac65d";
// The following parameters are the only ones
// that can be changed, and they have to be changed
// by the current manager
// Specified address can change reserve, freeze, clawback, and manager
let manager = recoveredAccount2.addr;
// Specified address is considered the asset reserve
// (it has no special privileges, this is only informational)
let reserve = recoveredAccount2.addr;
// Specified address can freeze or unfreeze user asset holdings 
let freeze = recoveredAccount2.addr;
// Specified address can revoke user asset holdings and send 
// them to other addresses    
let clawback = recoveredAccount2.addr;

// signing and sending "txn" allows "addr" to create an asset
let txn = algosdk.makeAssetCreateTxnWithSuggestedParams(addr, note,
        totalIssuance, decimals, defaultFrozen, manager, reserve, freeze,
    clawback, unitName, assetName, assetURL, assetMetadataHash, params);

let rawSignedTxn = txn.signTxn(recoveredAccount1.sk)
let tx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
console.log("Transaction : " + tx.txId);
let assetID = null;
// wait for transaction to be confirmed
await waitForConfirmation(algodclient, tx.txId);
// Get the new asset's information from the creator account
let ptx = await algodclient.pendingTransactionInformation(tx.txId).do();
assetID = ptx["asset-index"];
  

}


const App = () => {


  const balance=async()=>{


    const algosdk = require('algosdk');
// In order to do an ASA tutorial, we will need to generate 3 accounts
// once created, copy off the values which we will paste into the tutorial code
// once created sucessfully, you will need to add funds to all three
// The Algorand TestNet Dispenser is located here: 
// https://bank.testnet.algorand.network/
var acct = null;

acct = algosdk.generateAccount();

let account1 = acct.addr;
console.log("Account 1 = " + account1);
var account1_mnemonic = algosdk.secretKeyToMnemonic(acct.sk);
console.log("Account Mnemonic 1 = "+ account1_mnemonic);
var recoveredAccount1 = algosdk.mnemonicToSecretKey(account1_mnemonic);
var isValid = algosdk.isValidAddress(recoveredAccount1.addr);
console.log("Is this a valid address: " + isValid);
console.log("Account created. Save off Mnemonic and address");



// sandbox
const token = "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=";
const server = "http://localhost";
const port = 4001;
// Instantiate the algod wrapper
let algodclient = new algosdk.Algodv2(token, server, port);

(async () => {
    let account_info = (await algodclient.accountInformation(recoveredAccount1.addr).do());
    let acct_string = JSON.stringify(account_info);
    console.log("Account 1 Info: " + acct_string);
    
})().catch(e => {
    console.log(e);
});


//     const algosdk = require('algosdk');


//   let account = algosdk.generateAccount();
// console.log("Account Address: ", account.addr);
// let mn = algosdk.secretKeyToMnemonic(account.sk);
// console.log("Account Mnemonic: ", mn);


// const token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
// const server = "http://localhost";
// const port = 4001;

// // Instantiate the algod wrapper
// let algodclient = new algosdk.Algodv2(token, server, port);

// // (async () => {
// //   let account_info = (await algodclient.accountInformation(recoveredAccount1.addr).do());

// // let acct_string = JSON.stringify(account_info);
// // console.log("Account Info: " + acct_string);
// // })().catch(e => {
// // console.log(e);
// // });



//     //alert("balance")

//     //few order size remove opera beyond result arrive copper deny lens shed kiwi mixture margin permit dream erase season crisp twin forward click abstract sad

//     const passphrase = "still there favorite open script fly cable medal pipe force foster chuckle achieve auto army length vendor print apart hawk question blanket exit about stone";

//     let myAccount = algosdk.mnemonicToSecretKey(passphrase)

//     console.log("My address: %s", myAccount.addr)

//     let accountInfo = await algodclient.accountInformation(myAccount.addr).do();

//     console.log("Account balance: %d microAlgos", accountInfo.amount);


  }

  return (
    <>
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



<button
                type="button"
                onClick= {con}>
               Balance
              </button>

</>
  );
};

export default App;
