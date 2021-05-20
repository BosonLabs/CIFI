/* global AlgoSigner */
import './App.css';
import {Button, Container, Header, Message} from "semantic-ui-react";
import {useState, useCallback} from "react";
import { Link } from "react-router-dom";
import Compress from "react-image-file-resizer";

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

  const [tid,setId] = useState("");

  const [tname,setName] = useState("");

  const [currentSymbol, setCurrentSymbol] = useState('ETH')

  const [buffer,setBuffer] = useState("");

  let [Img,setImg] = useState("");
  
  const changeFruit = (newFruit) => {
    setCurrentSymbol(newFruit)
  }


  const captureFile =(event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()

    Compress.imageFileResizer(file, 300, 300, 'JPEG', 10, 0,
    uri => {
      console.log("iuri",uri)
setImg(uri)
    },
    'base64'
    );
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => convertToBuffer(reader);    
  };
const convertToBuffer = async(reader) => {
  //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
  //set this buffer -using es6 syntax
    setBuffer(buffer);
};

  

const waitForConfirmation = async function (algodclient, txId) {
  let response = await algodclient.status().do();
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
  let accountInfo = await algodclient.accountInformation(account).do();
  for (let idx = 0; idx < accountInfo['created-assets'].length; idx++) {
      let scrutinizedAsset = accountInfo['created-assets'][idx];
      if (scrutinizedAsset['index'] === assetid) {
          console.log("AssetID = ",scrutinizedAsset['index']);
          let myparms = JSON.stringify(scrutinizedAsset['params'], undefined, 2);
          console.log("parmsprint",myparms);
          break;
      }
  }
};


// Function used to print asset holding for account and assetid
const printAssetHolding = async function (algodclient, account, assetid) {
  // note: if you have an indexer instance available it is easier to just use this
  //     let accountInfo = await indexerClient.searchAccounts()
  //    .assetID(assetIndex).do();
  // and in the loop below use this to extract the asset for a particular account
  // accountInfo['accounts'][idx][account]);
  let accountInfo = await algodclient.accountInformation(account).do();
  for (let idx = 0; idx < accountInfo['assets'].length; idx++) {
      let scrutinizedAsset = accountInfo['assets'][idx];
      if (scrutinizedAsset['asset-id'] === assetid) {
          let myassetholding = JSON.stringify(scrutinizedAsset, undefined, 2);
          console.log("assetholdinginfo = " + myassetholding);
          break;
      }
  }
};

const Rasset=async()=>{

let AssId='';

const algosdk = require('algosdk');
//

var account1_mnemonic = "tackle dove endorse style mind boring hidden fiction power wrap diesel more cruel ecology few field they chase oil deliver useless paddle nation abandon domain";
var account2_mnemonic = "gallery relief plastic pen hidden outer artist shrimp pioneer body icon banner siege palace prefer wedding path minor moon mosquito among cloud dwarf about history";
var account3_mnemonic = "runway genuine lazy assist ticket junior pilot flush rocket swallow ripple risk alien mobile chat recall run quiz cause weekend range april vicious about spoon";

var recoveredAccount1 = algosdk.mnemonicToSecretKey(account1_mnemonic);
var recoveredAccount2 = algosdk.mnemonicToSecretKey(account2_mnemonic);
var recoveredAccount3 = algosdk.mnemonicToSecretKey(account3_mnemonic);

// var recoveredAccount1 = '';
// var recoveredAccount2 = '';
// var recoveredAccount3 = '';


console.log(recoveredAccount1.addr);
console.log(recoveredAccount2.addr);
console.log(recoveredAccount3.addr);


//

//var account3_mnemonic = "tackle dove endorse style mind boring hidden fiction power wrap diesel more cruel ecology few field they chase oil deliver useless paddle nation abandon domain";


//var recoveredAccount1 = algosdk.mnemonicToSecretKey(account3_mnemonic);

//let accc=recoveredAccount1.addr;

//console.log("cacc",accc)

let addr = recoveredAccount1.addr;

    let note = undefined; // arbitrary data to be stored in the transaction; here, none is stored
// Asset creation specific parameters
// The following parameters are asset specific
// Throughout the example these will be re-used. 
// We will also change the manager later in the example

//let addr = recoveredAccount1.addr;
//'5N4B6FZMCQXFZDDKKZDPUSIQ2FCNXVIAZNE6QQPBOIWL6NJKEZJNC7FAUI';
//recoveredAccount1.addr;
// Whether user accounts will need to be unfrozen before transacting    
let defaultFrozen = false;
// integer number of decimals for asset unit calculation
let decimals = 0;
// total number of this asset available for circulation   
let totalIssuance = 1000;
// Used to display asset units to user    
let unitName = currentSymbol;
//"ASA";
// Friendly name of the asset    
let assetName = tname;
//"demoRam";
// Optional string pointing to a URL relating to the asset
let assetURL = "http://someurl";
//Img;

//"http://someurl";
// Optional hash commitment of some sort relating to the asset. 32 character length.
let assetMetadataHash = "16efaa3924a6fd9d3a4824799a4ac65d";
// The following parameters are the only ones
// that can be changed, and they have to be changed
// by the current manager
// Specified address can change reserve, freeze, clawback, and manager
let manager = recoveredAccount2.addr
//'7P7QMGOJUYCPZEKCJIDN43UJB475TA7IZCGCCOFLCQZSRJBCWU6PD6PK3Q';
//recoveredAccount2.addr;
// Specified address is considered the asset reserve
// (it has no special privileges, this is only informational)
let reserve = recoveredAccount2.addr
//'7P7QMGOJUYCPZEKCJIDN43UJB475TA7IZCGCCOFLCQZSRJBCWU6PD6PK3Q';
//recoveredAccount2.addr;
// Specified address can freeze or unfreeze user asset holdings 
let freeze = recoveredAccount2.addr
//'7P7QMGOJUYCPZEKCJIDN43UJB475TA7IZCGCCOFLCQZSRJBCWU6PD6PK3Q';
//recoveredAccount2.addr;
// Specified address can revoke user asset holdings and send 
// them to other addresses    
let clawback = recoveredAccount2.addr
//'7P7QMGOJUYCPZEKCJIDN43UJB475TA7IZCGCCOFLCQZSRJBCWU6PD6PK3Q';

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
let getre=await waitForConfirmation(algodclient, tx.txId);
console.log("result",getre);
// Get the new asset's information from the creator account
let ptx = await algodclient.pendingTransactionInformation(tx.txId).do();
assetID = ptx["asset-index"];

console.log("Cassptx",ptx);
console.log("Cass",assetID);

let result2=await printCreatedAsset(algodclient, recoveredAccount1.addr, assetID);

let result3=await printAssetHolding(algodclient, recoveredAccount1.addr, assetID);

console.log("resul",result2);
console.log("resuls",result3);

let accountInfos = await algodclient.accountInformation(recoveredAccount1.addr).do();


console.log("leng",accountInfos['created-assets'].length);
  for (let idx = 0; idx < accountInfos['created-assets'].length; idx++) {

      let scrutinizedAsset = accountInfos['created-assets'][idx];
      console.log("scr",scrutinizedAsset);
      if (scrutinizedAsset['index'] === assetID) 
      {
          console.log("AssetID",scrutinizedAsset['index']);
          AssId=scrutinizedAsset['index']
          let myparms = JSON.stringify(scrutinizedAsset['params'], undefined, 2);
          console.log("parmss" , myparms);
          break;
      }
  }

//console.log("ab",ab);


let accountInfo = await algodclient.accountInformation(recoveredAccount1.addr).do();


  console.log("accIn",accountInfo['amount']);

  console.log("assIn",accountInfo['assets']);

  params = await algodclient.getTransactionParams().do();
    //comment out the next two lines to use suggested fee
    params.fee = 1000;
    params.flatFee = true;
    // Asset configuration specific parameters
    // all other values are the same so we leave 
    // Them set.
    // specified address can change reserve, freeze, clawback, and manager
    manager = recoveredAccount1.addr;

    // Note that the change has to come from the existing manager
    let ctxn = algosdk.makeAssetConfigTxnWithSuggestedParams(recoveredAccount2.addr, note, 
        assetID, manager, reserve, freeze, clawback, params);

    // This transaction must be signed by the current manager
    rawSignedTxn = ctxn.signTxn(recoveredAccount2.sk)
    let ctx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
    console.log("Transaction : " + ctx.txId);
    // wait for transaction to be confirmed
    await waitForConfirmation(algodclient, ctx.txId);

    // Get the asset information for the newly changed asset
    // use indexer or utiltiy function for Account info
 
    // The manager should now be the same as the creator
    await printCreatedAsset(algodclient, recoveredAccount1.addr, assetID);


    params = await algodclient.getTransactionParams().do();
    //comment out the next two lines to use suggested fee
    params.fee = 1000;
    params.flatFee = true;

    let sender = recoveredAccount3.addr;
    let recipient = sender;
    // We set revocationTarget to undefined as 
    // This is not a clawback operation
    let revocationTarget = undefined;
    // CloseReaminerTo is set to undefined as
    // we are not closing out an asset
    let closeRemainderTo = undefined;
    // We are sending 0 assets
    let amount = 0;


     // signing and sending "txn" allows sender to begin accepting asset specified by creator and index
     let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, recipient, closeRemainderTo, revocationTarget,
      amount, note, assetID, params);

 // Must be signed by the account wishing to opt in to the asset    
 rawSignedTxn = opttxn.signTxn(recoveredAccount3.sk);
 let opttx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
 console.log("Transaction : " + opttx.txId);
 // wait for transaction to be confirmed
 await waitForConfirmation(algodclient, opttx.txId);

 //You should now see the new asset listed in the account information
 console.log("Account 3 = " + recoveredAccount3.addr);
 await printAssetHolding(algodclient, recoveredAccount3.addr, assetID);


 params = await algodclient.getTransactionParams().do();
 //comment out the next two lines to use suggested fee
 params.fee = 1000;
 params.flatFee = true;

 sender = recoveredAccount1.addr;
 recipient = recoveredAccount3.addr;
 revocationTarget = undefined;
 closeRemainderTo = undefined;
 //Amount of the asset to transfer
 amount = 1000;

 // signing and sending "txn" will send "amount" assets from "sender" to "recipient"
 let xtxn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, recipient, closeRemainderTo, revocationTarget,
      amount,  note, assetID, params);
 // Must be signed by the account sending the asset  
 rawSignedTxn = xtxn.signTxn(recoveredAccount1.sk)
 let xtx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
 console.log("Transaction : " + xtx.txId);
 // wait for transaction to be confirmed
 await waitForConfirmation(algodclient, xtx.txId);

 // You should now see the 10 assets listed in the account information
 console.log("Account 3 = " + recoveredAccount3.addr);
 await printAssetHolding(algodclient, recoveredAccount3.addr, assetID);


 params = await algodclient.getTransactionParams().do();
    //comment out the next two lines to use suggested fee
    params.fee = 1000;
    params.flatFee = true;

    let from = recoveredAccount2.addr;
    let freezeTarget = recoveredAccount3.addr;
    let freezeState = true;

    // The freeze transaction needs to be signed by the freeze account
    let ftxn = algosdk.makeAssetFreezeTxnWithSuggestedParams(from, note,
        assetID, freezeTarget, freezeState, params)

    // Must be signed by the freeze account   
    rawSignedTxn = ftxn.signTxn(recoveredAccount2.sk)
    let ftx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
    console.log("Transaction : " + ftx.txId);
    // wait for transaction to be confirmed
    await waitForConfirmation(algodclient, ftx.txId);

    // You should now see the asset is frozen listed in the account information
    console.log("Account 3 = " + recoveredAccount3.addr);
    await printAssetHolding(algodclient, recoveredAccount3.addr, assetID);


    params = await algodclient.getTransactionParams().do();
    //comment out the next two lines to use suggested fee
    params.fee = 1000;
    params.flatFee = true;   
    
    sender = recoveredAccount2.addr;
    recipient = recoveredAccount1.addr;
    revocationTarget = recoveredAccount3.addr;
    closeRemainderTo = undefined;
    amount = 1000;
    // signing and sending "txn" will send "amount" assets from "revocationTarget" to "recipient",
    // if and only if sender == clawback manager for this asset
    
    let rtxn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, recipient, closeRemainderTo, revocationTarget,
       amount, note, assetID, params);
    // Must be signed by the account that is the clawback address    
    rawSignedTxn = rtxn.signTxn(recoveredAccount2.sk)
    let rtx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
    console.log("Transaction : " + rtx.txId);
    // wait for transaction to be confirmed
    await waitForConfirmation(algodclient, rtx.txId);

    // You should now see 0 assets listed in the account information
    // for the third account
    console.log("Account 3 = " + recoveredAccount3.addr);
    await printAssetHolding(algodclient, recoveredAccount3.addr, assetID);



    // params = await algodclient.getTransactionParams().do();
    // //comment out the next two lines to use suggested fee
    // params.fee = 1000;
    // params.flatFee = true;

    // // The address for the from field must be the manager account
    // // Which is currently the creator addr1
    // addr = recoveredAccount1.addr;
    // note = undefined;
    // // if all assets are held by the asset creator,
    // // the asset creator can sign and issue "txn" to remove the asset from the ledger. 
    // let dtxn = algosdk.makeAssetDestroyTxnWithSuggestedParams(addr, note, assetID, params);
    // // The transaction must be signed by the manager which 
    // // is currently set to account1
    // rawSignedTxn = dtxn.signTxn(recoveredAccount1.sk)
    // let dtx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
    // console.log("Transaction : " + dtx.txId);
    // // wait for transaction to be confirmed
    // await waitForConfirmation(algodclient, dtx.txId);

    // // The account3 and account1 should no longer contain the asset as it has been destroyed
    // console.log("Asset ID: " + assetID);
    // console.log("Account 1 = " + recoveredAccount1.addr);
    // await printCreatedAsset(algodclient, recoveredAccount1.addr, assetID);
    // await printAssetHolding(algodclient, recoveredAccount1.addr, assetID);
    // console.log("Account 3 = " + recoveredAccount3.addr);
    // await printAssetHolding(algodclient, recoveredAccount3.addr, assetID);  


  



//   // Asset configuration specific parameters
// // all other values are the same so we leave 
// // Them set.
// // specified address can change reserve, freeze, clawback, and manager
// manager = recoveredAccount1.addr;
// // Note that the change has to come from the existing manager
// let ctxn = algosdk.makeAssetConfigTxnWithSuggestedParams(recoveredAccount2.addr, note, 
//     assetID, manager, reserve, freeze, clawback, params);
// // This transaction must be signed by the current manager
// rawSignedTxn = ctxn.signTxn(recoveredAccount2.sk)
// let ctx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
// console.log("Transaction : " + ctx.txId);
// // wait for transaction to be confirmed
// await waitForConfirmation(algodclient, ctx.txId);
// // Get the asset information for the newly changed asset
// // use indexer or utiltiy function for Account info
// // The manager should now be the same as the creator
// //await printCreatedAsset(algodclient, recoveredAccount1.addr, assetID);



alert("your Asset id "+AssId);  

window.location.reload(false)
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


    <div>

<center>

    <div style={{backgroundColor:'white',height:'600px',width:'500px'}}>

  


<br></br>
<h1>CREATE NFT-TOKEN</h1>

<br></br>



<label for="name">NFT  Name    </label>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<input
id="nameid"
type='text'
name="tname"
required
onChange={event => setName(event.target.value)}

/>
<br></br>
    <br></br>

  <label for="symbol">NFT  Symbol    </label>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


  <select style={{backgroundColor:'white',height:'20px',width:'160px'}}
      onChange={(event) => changeFruit(event.target.value)}
      value={currentSymbol}>

      <option value="ETH">ETH     </option> 
      <option value="BNB">BNB     </option>
      <option value="ALGORAND">ASA  </option>
    </select>
<br></br>
<br></br>


<label for="id">NFT Token-Id   {' '}   </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<input
id="idid"
type='text'
name="tid"
required
onChange={event => setId( event.target.value)}

/>

<br></br>
<br></br>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label for="images">Choose Your Image     </label>
          
          <input style={{backgroundColor:'white',height:'22px',width:'230px'}}
           name="tfile" id="fileid" type = "file" onChange = {captureFile} required />
    
           {/* <button 
           type="submit"> 
           Upload Image NFT
           </button> */}
     <br></br>
     <br></br>
     <br></br>

{/* 
            <button
              type="submit"> 
              Create NFT
              </button> */}


<button
                type="button"
                onClick= {Rasset}>
                  {/* TransferAss */}
               Create Asset
              </button>
              </div>
</center>
              </div>

</>
  );
};

export default App;
