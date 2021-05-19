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


//   await AlgoSigner.connect();
// let client = new algosdk.Algodv2(...);

// let testNetParams = await client.getTransactionParams().do();
// testNetParams.flatFee = true;

// let tx1 = new algosdk.Transaction({
//   to: "5N4B6FZMCQXFZDDKKZDPUSIQ2FCNXVIAZNE6QQPBOIWL6NJKEZJNC7FAUI",
//   from: "5N4B6FZMCQXFZDDKKZDPUSIQ2FCNXVIAZNE6QQPBOIWL6NJKEZJNC7FAUI",
//   amount: 1,
//   ...testNetParams,
// });

// let tx2 = new algosdk.Transaction({
//   to: "7P7QMGOJUYCPZEKCJIDN43UJB475TA7IZCGCCOFLCQZSRJBCWU6PD6PK3Q",
//   from: "7P7QMGOJUYCPZEKCJIDN43UJB475TA7IZCGCCOFLCQZSRJBCWU6PD6PK3Q",
//   amount: 1,
//   ...testNetParams,
// });

// algosdk.assignGroupID([tx1, tx2]);

// let sdkTxs = [tx1, tx2];
// let base64Txs = sdkTxs.map((tx) => {
//   return AlgoSigner.encoding.msgpackToBase64(tx.toByte());
// });
// let walletTxs = base64Txs.map((b64) => {
//   return { tx: b64 };
// });

// let signedTxs = await AlgoSigner.wallet.sign(walletTxs);

// let sendResult = await client
//   .sendRawTransaction(
//     signedTxs.map((signedTx) =>
//       AlgoSigner.encoding.base64ToMsgpack(signedTx.blob)
//     )
//   )
//   .do();
  
}


const App = () => {

const Rasset=async()=>{

const algosdk = require('algosdk');


var account3_mnemonic = "tackle dove endorse style mind boring hidden fiction power wrap diesel more cruel ecology few field they chase oil deliver useless paddle nation abandon domain";

var recoveredAccount1 = algosdk.mnemonicToSecretKey(account3_mnemonic);

let accc=recoveredAccount1.addr;

console.log("cacc",accc)

    let note = undefined; // arbitrary data to be stored in the transaction; here, none is stored
// Asset creation specific parameters
// The following parameters are asset specific
// Throughout the example these will be re-used. 
// We will also change the manager later in the example

let addr = recoveredAccount1.addr;
//'5N4B6FZMCQXFZDDKKZDPUSIQ2FCNXVIAZNE6QQPBOIWL6NJKEZJNC7FAUI';
//recoveredAccount1.addr;
// Whether user accounts will need to be unfrozen before transacting    
let defaultFrozen = false;
// integer number of decimals for asset unit calculation
let decimals = 0;
// total number of this asset available for circulation   
let totalIssuance = 1000;
// Used to display asset units to user    
let unitName = "ASA";
// Friendly name of the asset    
let assetName = "demoRam";
// Optional string pointing to a URL relating to the asset
let assetURL = "http://someurl";
// Optional hash commitment of some sort relating to the asset. 32 character length.
let assetMetadataHash = "16efaa3924a6fd9d3a4824799a4ac65d";
// The following parameters are the only ones
// that can be changed, and they have to be changed
// by the current manager
// Specified address can change reserve, freeze, clawback, and manager
let manager = '7P7QMGOJUYCPZEKCJIDN43UJB475TA7IZCGCCOFLCQZSRJBCWU6PD6PK3Q';
//recoveredAccount2.addr;
// Specified address is considered the asset reserve
// (it has no special privileges, this is only informational)
let reserve = '7P7QMGOJUYCPZEKCJIDN43UJB475TA7IZCGCCOFLCQZSRJBCWU6PD6PK3Q';
//recoveredAccount2.addr;
// Specified address can freeze or unfreeze user asset holdings 
let freeze = '7P7QMGOJUYCPZEKCJIDN43UJB475TA7IZCGCCOFLCQZSRJBCWU6PD6PK3Q';
//recoveredAccount2.addr;
// Specified address can revoke user asset holdings and send 
// them to other addresses    
let clawback = '7P7QMGOJUYCPZEKCJIDN43UJB475TA7IZCGCCOFLCQZSRJBCWU6PD6PK3Q';

//recoveredAccount2.addr;

const baseServer = "https://testnet-algorand.api.purestake.io/ps2";

    
const port = "";

//B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab

const token = {

    'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
}



let algodclient = new algosdk.Algodv2(token, baseServer, port);


console.log("re",algodclient);


let params = await algodclient.getTransactionParams().do();
    //comment out the next two lines to use suggested fee
    params.fee = 1000;
    params.flatFee = true;



// signing and sending "txn" allows "addr" to create an asset
let txn = algosdk.makeAssetCreateTxnWithSuggestedParams(addr, note,
        totalIssuance, decimals, defaultFrozen, manager, reserve, freeze,
    clawback, unitName, assetName, assetURL, assetMetadataHash, params);


    console.log("txnn",txn);    

let rawSignedTxn = txn.signTxn(recoveredAccount1.sk)
let tx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
console.log("Transaction : " + tx.txId);
let assetID = null;
// wait for transaction to be confirmed
//await waitForConfirmation(algodclient, tx.txId);
// Get the new asset's information from the creator account
let ptx = await algodclient.pendingTransactionInformation(tx.txId).do();
assetID = ptx["asset-index"];

console.log("Cass",assetID);


let accountInfo = await algodclient.accountInformation(recoveredAccount1.addr).do();


  console.log("accIn",accountInfo['amount']);

  console.log("assIn",accountInfo['assets']);



  }

  const AnoCreate=async()=>{

    const algosdk = require('algosdk');
    const baseServer = "https://testnet-algorand.api.purestake.io/ps2";

    
const port = "";

//B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab

const token = {

    'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
}



let algodclient = new algosdk.Algodv2(token, baseServer, port);


console.log("re",algodclient);

let account='5N4B6FZMCQXFZDDKKZDPUSIQ2FCNXVIAZNE6QQPBOIWL6NJKEZJNC7FAUI';

let assetid='1234';


//const printCreatedAsset = async function (algodclient, account, assetid) {
  // note: if you have an indexer instance available it is easier to just use this
  //     let accountInfo = await indexerClient.searchAccounts()
  //    .assetID(assetIndex).do();
  // and in the loop below use this to extract the asset for a particular account
  // accountInfo['accounts'][idx][account]);
  let accountInfo = await algodclient.accountInformation(account).do();


  console.log("accIn",accountInfo['amount']);

  console.log("assIn",accountInfo['assets']);

  for (let idx = 0; idx < accountInfo['created-assets'].length; idx++) {
      let scrutinizedAsset = accountInfo['created-assets'][idx];
      if (scrutinizedAsset['index'] === assetid) {
          console.log("AssetID = " + scrutinizedAsset['index']);
          let myparms = JSON.stringify(scrutinizedAsset['params'], undefined, 2);
          console.log("parms = " + myparms);
          break;
      }
  }


  let ac="5N4B6FZMCQXFZDDKKZDPUSIQ2FCNXVIAZNE6QQPBOIWL6NJKEZJNC7FAUI";
  //  let account_info = await algodclient.accountInformation(ac);
    

    let account_info = (await algodclient.accountInformation(ac).do());
    let acct_string = JSON.stringify(account_info);
    console.log("accinfo " + acct_string);
  


  }

  const AssCreate=()=>{

    const algosdk = require('algosdk');
// Retrieve the token, server and port values for your installation in the 
// algod.net and algod.token files within the data directory

// UPDATE THESE VALUES
// const token = "TOKEN";
// const server = "SERVER";
// const port = PORT;

//hackathon
// const token = "ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1";
// const server = "http://hackathon.algodev.network";
// const port = 9100;

// sandbox
const token = "SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin";
//const server = "http://localhost";
const server="https://testnet-algorand.api.purestake.io/idx2";
const port = 4001;


let algodclient = new algosdk.Algod(token, server, port);

// Function used to wait for a tx confirmation
const waitForConfirmation = async function (algodclient, txId) {
    let response = await algodclient.status().do();
    alert("response"+response)
    let lastround = response["last-round"];
    while (true) {
        const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
        if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
            //Got the completed Transaction
            console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
            break;
        }
        lastround++;
        await algodclient.statusAfterBlock(lastround).do();
    }
};


// Function used to print created asset for account and assetid
const printCreatedAsset = async function (algodclient, account, assetid) {
    // note: if you have an indexer instance available it is easier to just use this
    //     let accountInfo = await indexerClient.searchAccounts()
    //    .assetID(assetIndex).do();
    // and in the loop below use this to extract the asset for a particular account
    // accountInfo['accounts'][idx][account]);
    let accountInfo = await algodclient.accountInformation(account).do();
    for (let idx = 0; idx < accountInfo['created-assets'].length; idx++) {
        let scrutinizedAsset = accountInfo['created-assets'][idx];
        if (scrutinizedAsset['index'] == assetid) {
            console.log("AssetID = " + scrutinizedAsset['index']);
            let myparms = JSON.stringify(scrutinizedAsset['params'], undefined, 2);
            console.log("parms = " + myparms);
            break;
        }
    }
};


  }

  const AccCreate=async()=>{
    const algosdk = require('algosdk');
// In order to do this ASA tutorial, we will need to generate 3 accounts
// once created copy off the values which we will past into the TutorialASA code
// once created sucessfully, you will need to add funds to all three
// The Algorand TestNet Dispenser is located here: 
// https://bank.testnet.algorand.network/
let acct = null;

acct = algosdk.generateAccount();

let account1 = acct.addr;
console.log("Account 1 = " + account1);
var account1_mnemonic = algosdk.secretKeyToMnemonic(acct.sk);
console.log("Account Mnemonic 1 = "+ account1_mnemonic);
var recoveredAccount1 = algosdk.mnemonicToSecretKey(account1_mnemonic);
var isValid = algosdk.isValidAddress(recoveredAccount1.addr);
console.log("Is this a valid address: " + isValid);
console.log("Account created. Save off Mnemonic and address");


//const algosdk = require('algosdk');
//const server = 'https://testnet-algorand.api.purestake.io/ps2'

const server="https://testnet-algorand.api.purestake.io/idx2";
//const port = '';
const token = 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin';



// // sandbox
// const token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
// const server = "http://localhost";
const port = 4001;
// Instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, server, port);

//console.log("alcli"+algodclient)

//(async () => {
  let ac="5N4B6FZMCQXFZDDKKZDPUSIQ2FCNXVIAZNE6QQPBOIWL6NJKEZJNC7FAUI";
    let account_info = await algodclient.accountInformation(ac);
    console.log("accinfo " + account_info);
    alert("acc"+account_info)
    let acct_string = JSON.stringify(account_info);
    console.log("Account1Info: " + acct_string);
//})().catch(e => {
    //console.log(e);
  //  alert("error");
//});




  }


  

  const create=async()=>{

    const algosdk = require('algosdk');

const token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const server = "http://localhost";
const port = 4001;

let algodclient = new algosdk.Algodv2(token, server, port);

    let note = undefined; // arbitrary data to be stored in the transaction; here, none is stored
// Asset creation specific parameters
// The following parameters are asset specific
// Throughout the example these will be re-used. 
// We will also change the manager later in the example
//let addr = recoveredAccount1.addr;
let addr="5N4B6FZMCQXFZDDKKZDPUSIQ2FCNXVIAZNE6QQPBOIWL6NJKEZJNC7FAUI";
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
let manager="7P7QMGOJUYCPZEKCJIDN43UJB475TA7IZCGCCOFLCQZSRJBCWU6PD6PK3Q";
//let manager = recoveredAccount2.addr;
// Specified address is considered the asset reserve
// (it has no special privileges, this is only informational)
//let reserve = recoveredAccount2.addr;
let reserve="7P7QMGOJUYCPZEKCJIDN43UJB475TA7IZCGCCOFLCQZSRJBCWU6PD6PK3Q";
// Specified address can freeze or unfreeze user asset holdings 
//let freeze = recoveredAccount2.addr;
let freeze="7P7QMGOJUYCPZEKCJIDN43UJB475TA7IZCGCCOFLCQZSRJBCWU6PD6PK3Q";
// Specified address can revoke user asset holdings and send 
// them to other addresses    
//let clawback = recoveredAccount2.addr;
let clawback="7P7QMGOJUYCPZEKCJIDN43UJB475TA7IZCGCCOFLCQZSRJBCWU6PD6PK3Q";

let params = await algodclient.getTransactionParams().do();
    //comment out the next two lines to use suggested fee
    params.fee = 1000;
    params.flatFee = true;
    console.log(params);

// signing and sending "txn" allows "addr" to create an asset
let txn = algosdk.makeAssetCreateTxnWithSuggestedParams(addr, note,
        totalIssuance, decimals, defaultFrozen, manager, reserve, freeze,
    clawback, unitName, assetName, assetURL, assetMetadataHash, params);

    //let rawSignedTxn = txn.signTxn(recoveredAccount1.sk)
let rawSignedTxn = txn.signTxn(addr.sk)
let tx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
console.log("Transaction : " + tx.txId);
let assetID = null;
// wait for transaction to be confirmed
await waitForConfirmation(algodclient, tx.txId);
// Get the new asset's information from the creator account
let ptx = await algodclient.pendingTransactionInformation(tx.txId).do();
assetID = ptx["asset-index"];
  }


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
                onClick= {Rasset}>
               Balance
              </button>

</>
  );
};

export default App;
