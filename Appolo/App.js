/* global AlgoSigner */
import { signLogicSigTransactionObject } from 'algosdk';
import './App.css';
import { useEffect } from "react";
import { useState } from "react";

const optin = () => {
  global.TextEncoder = require("util").TextEncoder; 
const algosdk = require('algosdk');


// user declared algod connection parameters
//purestake api used
let algodServer = "https://testnet-algorand.api.purestake.io/ps2";
let algodToken = {
    'X-API-Key': '9oXsQDRlZ97z9mTNNd7JFaVMwhCaBlID2SXUOJWl'
   };

let algodPort = "";
// declare application state storage (immutable)
// let localInts = 1;
// let localBytes = 0;
// let globalInts = 5;
// let globalBytes = 3;


// helper function to await transaction confirmation
// Function used to wait for a tx confirmation
const waitForConfirmation = async function (algodclient, txId) {
    let status = (await algodclient.status().do());
    let lastRound = status["last-round"];
      while (true) {
        const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
        if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
          //Got the completed Transaction
          console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
          break;
        }
        lastRound++;
        await algodclient.statusAfterBlock(lastRound).do();
      }
    };

// optIn
async function optInApp(client, account, index) {
    // define sender
    let sender = account;
    console.log("sender complete", sender);
    let txID;
	// get node suggested parameters
    let params = await client.getTransactionParams().do();
    // comment out the next two lines to use suggested fee
    params.fee = 1000;
    params.flatFee = true;

    // create unsigned transaction
    let txn = algosdk.makeApplicationOptInTxn(sender, params, index);
    console.log("txn complete")
    let txId = txn.txID().toString();

    // Sign the transaction
    // let signedTxn = txn.signTxn(account.sk);
    // console.log("Signed transaction with txID: %s", txId);

    let txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
    let signedTxs = await AlgoSigner.signTxn([{txn:txn_b64}]);
    console.log("txn signing")
    let signedT = AlgoSigner.encoding.base64ToMsgpack(signedTxs[0].blob);
    let transcat = await client.sendRawTransaction(signedT).do();
    console.log("txn working")
    await waitForConfirmation(client, transcat.txId);
    // AlgoSigner.signTxn([{txn: txn_b64}])
  
    // .then(async (d) => {
    //   let signedTxs = d;
    //   // Submit the transaction
    //   console.log("sign", signedTxs[0].blob);
    // // await client.sendRawTransaction(signedTxs[0].blob).do();

    // AlgoSigner.send({
    //   ledger: 'TestNet',
    //   tx: signedTxs[0].blob
    // })
    // .then((d) => {
    //   txID = d;
    //   // document.getElementById("txid").innerHTML = "Transaction ID : " + JSON.stringify(txID);
    //   console.log(txID);
    // })
    // .catch((e) => {
    //   console.error(e);
    // });



    // // Wait for confirmation
    // await waitForConfirmation(client, txId);

    // // display results
    // let transactionResponse = await client.pendingTransactionInformation(txId).do();
    // console.log("Opted-in to app-id:",transactionResponse['txn']['txn']['apid'])
    // })
     
    //  .catch((e) => {
    //      console.error(e);
    //  });
}





async function main() {
    try {
    // initialize an algodClient
    let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

    // get accounts from mnemonic
    // let creatorAccount = algosdk.mnemonicToSecretKey("bitter never rather carry picture firm rare gloom repeat truck volume surprise candy thumb parent side before popular turtle analyst similar vehicle gas absent public");
    // let userAccount = algosdk.mnemonicToSecretKey("unique urban normal exchange shrimp inspire steel domain family cheap sea river input credit embark day organ dune try squeeze subject trial can about fault");
   
    // compile programs 
    // let approvalProgram = await compileProgram(algodClient, approvalProgramSourceInitial);
    // let clearProgram = await compileProgram(algodClient, clearProgramSource);

    // create new application
    //let appId = await createApp(algodClient, creatorAccount, approvalProgram, clearProgram, localInts, localBytes, globalInts, globalBytes);
    let appId = 37005781;
    // opt-in to application
    let accounts;
    AlgoSigner.connect()
    .then((d) => {
      AlgoSigner.accounts({
        ledger: 'TestNet'
      })
      .then(async (d) => {
        accounts = d;
      console.log("Address 1", d[0]);
        await optInApp(algodClient, d[1].address, appId);
      })
      .catch((e) => {
        console.error(e);
      });
    })
    .catch((e) => {
      console.error(e);
    });




    // // call application without arguments
    // let amount = 1000;
    // await callApp(userAccount, appId , amount); //atomic involved

    // // read local state of application from user account
    // await readLocalState(algodClient, userAccount, appId);

    // // read global state of application
    // await readGlobalState(algodClient, creatorAccount, appId);

    // // update application
    // approvalProgram = await compileProgram(algodClient, approvalProgramSourceRefactored);
    // await updateApp(algodClient, creatorAccount, appId, approvalProgram, clearProgram);

    // // call application with arguments
    // let ts = new Date(new Date().toUTCString());
    // console.log(ts)
    // let appArgs = [];
    // console.log("(line:516) appArgs = ",appArgs)
    // appArgs.push(new Uint8Array(Buffer.from(ts)));
    // await callApp(algodClient, userAccount, appId, appArgs);

    // read local state of application from user account
    // await readLocalState(algodClient, userAccount, appId);

    // // close-out from application
    // await closeOutApp(algodClient, userAccount, appId)

    // // opt-in again to application
    // await optInApp(algodClient, userAccount, appId)

    // // call application with arguments
    // await callApp(algodClient, userAccount, appId, appArgs)

    // // read local state of application from user account
    // await readLocalState(algodClient, userAccount, appId);

    // // delete application
    // await deleteApp(algodClient, creatorAccount, appId)

    // // clear application from user account
    // await clearApp(algodClient, userAccount, appId)

    }
    catch (err){
        console.log("err", err);  
    }
}

main();
}

const donate = () => {
  global.TextEncoder = require("util").TextEncoder; 
const algosdk = require('algosdk');


// user declared algod connection parameters
//purestake api used
let algodServer = "https://testnet-algorand.api.purestake.io/ps2";
let algodToken = {
    'X-API-Key': '9oXsQDRlZ97z9mTNNd7JFaVMwhCaBlID2SXUOJWl'
   };

let algodPort = "";
// declare application state storage (immutable)
// let localInts = 1;
// let localBytes = 0;
// let globalInts = 5;
// let globalBytes = 3;



// helper function to compile program source  
// async function compileProgram(client, programSource) {
//     let encoder = new TextEncoder();
//     let programBytes = encoder.encode(programSource);
//     let compileResponse = await client.compile(programBytes).do();
//     let compiledBytes = new Uint8Array(Buffer.from(compileResponse.result, "base64"));
//     return compiledBytes;
// }

// helper function to await transaction confirmation
// Function used to wait for a tx confirmation
const waitForConfirmation = async function (algodclient, txId) {
    let status = (await algodclient.status().do());
    let lastRound = status["last-round"];
      while (true) {
        const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
        if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
          //Got the completed Transaction
          console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
          break;
        }
        lastRound++;
        await algodclient.statusAfterBlock(lastRound).do();
      }
    };



async function callApp(account, index, amount) {
  // define sender
  let sender = account;
  let client = new algosdk.Algodv2(algodToken, algodServer, algodPort);
// get node suggested parameters
  let params = await client.getTransactionParams().do();
  // comment out the next two lines to use suggested fee
  params.fee = 1000;
  params.flatFee = true;

  let appArgs = [];
  appArgs.push(new Uint8Array(Buffer.from("donate")));
  console.log("(line:516) appArgs = ",appArgs)

  // create unsigned transaction
  let transaction1 = algosdk.makeApplicationNoOpTxn(sender, params, index, appArgs)
  //  let txId1 = transaction1.txID().toString();

  // // Sign the transaction
  // let signedTxn = txn.signTxn(account.sk);
  // console.log("Signed transaction with txID: %s", txId);

  let transaction2 = algosdk.makePaymentTxnWithSuggestedParams(sender, "OUVJXNKNE5IKMESSMEFTR3PJ3E5PBTC2AGXA7VPSJNPIJL6IUCAF4LUF4Q", amount, undefined, undefined, params);  
  
  let txns = [transaction1, transaction2];
  let txgroup = algosdk.assignGroupID(txns);
  console.log("group = ", txgroup);

    let txn_b64_1 = transaction1.toByte();
    let txn_b64_2 = transaction2.toByte();

    //let signTx = [];

    // let signArr = AlgoSigner.signTxn([{txn: txn_b64_1}, {txn: txn_b64_2}]);
    let signArr = [txn_b64_1, txn_b64_2];
    let base64Txs = signArr.map((binary) => AlgoSigner.encoding.msgpackToBase64(binary));
console.log("line 1318");
    let signedTxs = await AlgoSigner.signTxn([
      {
        txn: base64Txs[0],
      },
      {
        txn: base64Txs[1],
      },
    ]);
  console.log("sign complete");
    let binarySignedTxs = signedTxs.map((tx) => AlgoSigner.encoding.base64ToMsgpack(tx.blob));
    let trans = await client.sendRawTransaction(binarySignedTxs).do();
    console.log("Send complete");
    console.log("txID", trans);
    console.log("id", trans.txId);
   await waitForConfirmation(client, trans.txId);
  
}





async function main() {
    try {
    // initialize an algodClient
    let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

    // get accounts from mnemonic
    let creatorAccount = algosdk.mnemonicToSecretKey("bitter never rather carry picture firm rare gloom repeat truck volume surprise candy thumb parent side before popular turtle analyst similar vehicle gas absent public");
    let userAccount = algosdk.mnemonicToSecretKey("unique urban normal exchange shrimp inspire steel domain family cheap sea river input credit embark day organ dune try squeeze subject trial can about fault");
   let userAddress =[];
   userAddress =["K3ASZETXZ47FOFEEDG7WVU4PNFOTKE32HFWAE7ODFLUUYAYVKDBJRWLRV4","4BLKKSIOUAC3TYFS2KQR4HDFZE6CWYZTDJXHHGDROACPNSJXGTHHY6I6GM"];
    // compile programs 
    // let approvalProgram = await compileProgram(algodClient, approvalProgramSourceInitial);
    // let clearProgram = await compileProgram(algodClient, clearProgramSource);

    // create new application
    //let appId = await createApp(algodClient, creatorAccount, approvalProgram, clearProgram, localInts, localBytes, globalInts, globalBytes);
    let appId = 37005781;
    // opt-in to application
    // await optInApp(algodClient, userAccount, appId);
let accounts;
    AlgoSigner.connect()
    .then((d) => {
      AlgoSigner.accounts({
        ledger: 'TestNet'
      })
      .then(async (d) => {
        accounts = d;
        let amount = 1000000;
        let acc = accounts[0].address;
        let length = userAddress.length;
        let confirm ;
        console.log("length",userAddress.length)
        for(let i=0;i<2;i++){
          if(userAddress[i]==acc)
          {
            await callApp(accounts[1].address, appId , amount);
          }
          else{
            confirm = 1;
          }
        }
      if(confirm == 1){
        alert("Not able to donate");
      }
        
      })
      .catch((e) => {
        console.error(e);
      });
    })
    .catch((e) => {
      console.error(e);
    });



    // // call application without arguments
 //atomic involved

    // // read local state of application from user account
    // await readLocalState(algodClient, userAccount, appId);

    // // read global state of application
    // await readGlobalState(algodClient, creatorAccount, appId);

    // // update application
    // approvalProgram = await compileProgram(algodClient, approvalProgramSourceRefactored);
    // await updateApp(algodClient, creatorAccount, appId, approvalProgram, clearProgram);

    // // call application with arguments
    // let ts = new Date(new Date().toUTCString());
    // console.log(ts)
    // let appArgs = [];
    // console.log("(line:516) appArgs = ",appArgs)
    // appArgs.push(new Uint8Array(Buffer.from(ts)));
    // await callApp(algodClient, userAccount, appId, appArgs);

    // read local state of application from user account
    // await readLocalState(algodClient, userAccount, appId);

    // // close-out from application
    // await closeOutApp(algodClient, userAccount, appId)

    // // opt-in again to application
    // await optInApp(algodClient, userAccount, appId)

    // // call application with arguments
    // await callApp(algodClient, userAccount, appId, appArgs)

    // // read local state of application from user account
    // await readLocalState(algodClient, userAccount, appId);

    // // delete application
    // await deleteApp(algodClient, creatorAccount, appId)

    // // clear application from user account
    // await clearApp(algodClient, userAccount, appId)

    }
    catch (err){
        console.log("err", err);  
    }
}

main();
}
const claim = () => {
  global.TextEncoder = require("util").TextEncoder; 
const algosdk = require('algosdk');



// user declared algod connection parameters
//purestake api used
let algodServer = "https://testnet-algorand.api.purestake.io/ps2";
let algodToken = {
    'X-API-Key': '9oXsQDRlZ97z9mTNNd7JFaVMwhCaBlID2SXUOJWl'
   };

let algodPort = "";
// declare application state storage (immutable)
// let localInts = 1;
// let localBytes = 0;
// let globalInts = 5;
// let globalBytes = 3;

//var fs = require('fs'),



// helper function to compile program source  
// async function compileProgram(client, programSource) {
//     let encoder = new TextEncoder();
//     let programBytes = encoder.encode(programSource);
//     let compileResponse = await client.compile(programBytes).do();
//     let compiledBytes = new Uint8Array(Buffer.from(compileResponse.result, "base64"));
//     return compiledBytes;
// }

// helper function to await transaction confirmation
// Function used to wait for a tx confirmation
const waitForConfirmation = async function (algodclient, txId) {
    let status = (await algodclient.status().do());
    let lastRound = status["last-round"];
      while (true) {
        const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
        if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
          //Got the completed Transaction
          console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
          break;
        }
        lastRound++;
        await algodclient.statusAfterBlock(lastRound).do();
      }
    };



async function claimApp(account, index, amount) {

  var escrowdata = `#pragma version 2
  global GroupSize
  int 2
  ==
  // The first transaction must be 
  // an ApplicationCall (ie call stateful smart contract)
  gtxn 0 TypeEnum
  int 6
  ==
  &&
  // The specific App ID must be called
  // This should be changed after creation
  gtxn 0 ApplicationID
  int 37005781
  ==
  &&
  // The applicaiton call must either be
  // A general applicaiton call or a delete
  // call
  gtxn 0 OnCompletion
  int NoOp
  ==
  int DeleteApplication
  gtxn 0 OnCompletion
  ==
  ||
  &&
  // verify neither transaction
  // contains a rekey
  gtxn 1 RekeyTo
  global ZeroAddress
  ==
  &&
  gtxn 0 RekeyTo
  global ZeroAddress
  ==
  &&
  `;
    
  // define sender
  let sender = account;
  let client = new algosdk.Algodv2(algodToken, algodServer, algodPort);

 // get node suggested parameters
  let params = await client.getTransactionParams().do();
  // comment out the next two lines to use suggested fee
  params.fee = 1000;
  params.flatFee = true;

  let appArgs = [];
  appArgs.push(new Uint8Array(Buffer.from("claim")));
  console.log("(line:516) appArgs = ",appArgs)

  // create unsigned transaction
  let transaction1 = algosdk.makeApplicationNoOpTxn(sender, params, index, appArgs)
  //  let txId1 = transaction1.txID().toString();

  let results = await client.compile(escrowdata).do();
  console.log("Hash = " + results.hash);
  console.log("Result = " + results.result);
  let program = new Uint8Array(Buffer.from(results.result, "base64"));
  let args = [];
    args.push(algosdk.encodeUint64(123));

    let lsig = algosdk.makeLogicSig(program, args);
    

let sender1 = lsig.address();
console.log("logic",sender1)
    let receiver = sender;
    // let receiver = "<receiver-address>"";
    
    let closeToRemaninder = sender;
    let note = undefined;
    let transaction2 = algosdk.makePaymentTxnWithSuggestedParams(sender1, receiver, amount, closeToRemaninder, note, params)
    
    let txns = [transaction1, transaction2];
    let txgroup = algosdk.assignGroupID(txns);
    console.log("group = ", txgroup);
    let txn_b64_1 = transaction1.toByte();
    let txn_b64_2 = transaction2.toByte();
    // let base64Txs1 =  AlgoSigner.encoding.msgpackToBase64(txn_b64_1);
    let base64Txs2 =  AlgoSigner.encoding.msgpackToBase64(txn_b64_2);
    console.log("signing")
    
    let base64Txs1 = AlgoSigner.encoding.msgpackToBase64(txn_b64_1);
    
    let signedTxs = await AlgoSigner.signTxn([
      {
        txn: base64Txs1,
      }
    ]);
    console.log("logic",signedTxs)
    let rawSignedTxn = algosdk.signLogicSigTransactionObject(transaction2, lsig);
    let binarySignedTxs =  AlgoSigner.encoding.base64ToMsgpack(signedTxs[0].blob);
    //let binarySignedTxs = signedTxs.map((txn) => AlgoSigner.encoding.base64ToMsgpack(txn[0].blob));
    let signArr = [binarySignedTxs,rawSignedTxn.blob];
    console.log("signed",rawSignedTxn.blob)
    let trans = await client.sendRawTransaction(signArr).do();
     console.log("Send complete");
  //   console.log("txID", trans);
     console.log("id", trans.txId);
   await waitForConfirmation(client, trans.txId);
    console.log("signed")
    
}





async function main() {
    try {
    // initialize an algodClient
    let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

   
    // compile programs 
    // let approvalProgram = await compileProgram(algodClient, approvalProgramSourceInitial);
    // let clearProgram = await compileProgram(algodClient, clearProgramSource);

    // create new application
    //let appId = await createApp(algodClient, creatorAccount, approvalProgram, clearProgram, localInts, localBytes, globalInts, globalBytes);
    let appId = 37005781;
    // opt-in to application
    // await optInApp(algodClient, userAccount, appId);
let accounts;
    AlgoSigner.connect()
    .then((d) => {
      AlgoSigner.accounts({
        ledger: 'TestNet'
      })
      .then(async (d) => {
        accounts = d;
        let amount = 1000000;
        await claimApp(accounts[1].address, appId , amount);
      })
      .catch((e) => {
        console.error(e);
      });
    })
    .catch((e) => {
      console.error(e);
    });



    // // call application without arguments
 //atomic involved

    // // read local state of application from user account
    // await readLocalState(algodClient, userAccount, appId);

    // // read global state of application
    // await readGlobalState(algodClient, creatorAccount, appId);

    // // update application
    // approvalProgram = await compileProgram(algodClient, approvalProgramSourceRefactored);
    // await updateApp(algodClient, creatorAccount, appId, approvalProgram, clearProgram);

    // // call application with arguments
    // let ts = new Date(new Date().toUTCString());
    // console.log(ts)
    // let appArgs = [];
    // console.log("(line:516) appArgs = ",appArgs)
    // appArgs.push(new Uint8Array(Buffer.from(ts)));
    // await callApp(algodClient, userAccount, appId, appArgs);

    // read local state of application from user account
    // await readLocalState(algodClient, userAccount, appId);

    // // close-out from application
    // await closeOutApp(algodClient, userAccount, appId)

    // // opt-in again to application
    // await optInApp(algodClient, userAccount, appId)

    // // call application with arguments
    // await callApp(algodClient, userAccount, appId, appArgs)

    // // read local state of application from user account
    // await readLocalState(algodClient, userAccount, appId);

    // // delete application
    // await deleteApp(algodClient, creatorAccount, appId)

    // // clear application from user account
    // await clearApp(algodClient, userAccount, appId)

    }
    catch (err){
        console.log("err", err);  
    }
}

main();
}
const reclaim = () => {
  global.TextEncoder = require("util").TextEncoder; 
const algosdk = require('algosdk');



// user declared algod connection parameters
//purestake api used
let algodServer = "https://testnet-algorand.api.purestake.io/ps2";
let algodToken = {
    'X-API-Key': '9oXsQDRlZ97z9mTNNd7JFaVMwhCaBlID2SXUOJWl'
   };

let algodPort = "";
// declare application state storage (immutable)
// let localInts = 1;
// let localBytes = 0;
// let globalInts = 5;
// let globalBytes = 3;

//var fs = require('fs'),



// helper function to compile program source  
// async function compileProgram(client, programSource) {
//     let encoder = new TextEncoder();
//     let programBytes = encoder.encode(programSource);
//     let compileResponse = await client.compile(programBytes).do();
//     let compiledBytes = new Uint8Array(Buffer.from(compileResponse.result, "base64"));
//     return compiledBytes;
// }

// helper function to await transaction confirmation
// Function used to wait for a tx confirmation
const waitForConfirmation = async function (algodclient, txId) {
    let status = (await algodclient.status().do());
    let lastRound = status["last-round"];
      while (true) {
        const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
        if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
          //Got the completed Transaction
          console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
          break;
        }
        lastRound++;
        await algodclient.statusAfterBlock(lastRound).do();
      }
    };



async function reclaimApp(account, index, amount) {

  var escrowdata = `#pragma version 2
  global GroupSize
  int 2
  ==
  // The first transaction must be 
  // an ApplicationCall (ie call stateful smart contract)
  gtxn 0 TypeEnum
  int 6
  ==
  &&
  // The specific App ID must be called
  // This should be changed after creation
  gtxn 0 ApplicationID
  int 38490519
  ==
  &&
  // The applicaiton call must either be
  // A general applicaiton call or a delete
  // call
  gtxn 0 OnCompletion
  int NoOp
  ==
  int DeleteApplication
  gtxn 0 OnCompletion
  ==
  ||
  &&
  // verify neither transaction
  // contains a rekey
  gtxn 1 RekeyTo
  global ZeroAddress
  ==
  &&
  gtxn 0 RekeyTo
  global ZeroAddress
  ==
  &&
  `;
    
  // define sender
  let sender = account;
  let client = new algosdk.Algodv2(algodToken, algodServer, algodPort);

 // get node suggested parameters
  let params = await client.getTransactionParams().do();
  // comment out the next two lines to use suggested fee
  params.fee = 1000;
  params.flatFee = true;

  let appArgs = [];
  appArgs.push(new Uint8Array(Buffer.from("reclaim")));
  console.log("(line:516) appArgs = ",appArgs)

  // create unsigned transaction
 
  //  let txId1 = transaction1.txID().toString();

  let results = await client.compile(escrowdata).do();
  console.log("Hash = " + results.hash);
  console.log("Result = " + results.result);
  let program = new Uint8Array(Buffer.from(results.result, "base64"));
  let args = [];
    args.push(algosdk.encodeUint64(123));

    let lsig = algosdk.makeLogicSig(program, args);
    

let sender1 = lsig.address();
let accounts =[];
accounts.push(sender1);
let transaction1 = algosdk.makeApplicationNoOpTxn(sender, params, index, appArgs,accounts)
console.log("logic",sender1)
    let receiver = sender;
    // let receiver = "<receiver-address>"";
    
    let closeToRemaninder = undefined;
    let note = undefined;
    let transaction2 = algosdk.makePaymentTxnWithSuggestedParams(sender1, receiver, 0, closeToRemaninder, note, params)
    
    let txns = [transaction1, transaction2];
    let txgroup = algosdk.assignGroupID(txns);
    console.log("group = ", txgroup);
    let txn_b64_1 = transaction1.toByte();
    let txn_b64_2 = transaction2.toByte();
    // let base64Txs1 =  AlgoSigner.encoding.msgpackToBase64(txn_b64_1);
    let base64Txs2 =  AlgoSigner.encoding.msgpackToBase64(txn_b64_2);
    console.log("signing")
    
    let base64Txs1 = AlgoSigner.encoding.msgpackToBase64(txn_b64_1);
    
    let signedTxs = await AlgoSigner.signTxn([
      {
        txn: base64Txs1,
      }
    ]);
    console.log("logic",signedTxs)
    let rawSignedTxn = algosdk.signLogicSigTransactionObject(transaction2, lsig);
    let binarySignedTxs =  AlgoSigner.encoding.base64ToMsgpack(signedTxs[0].blob);
    //let binarySignedTxs = signedTxs.map((txn) => AlgoSigner.encoding.base64ToMsgpack(txn[0].blob));
    let signArr = [binarySignedTxs,rawSignedTxn.blob];
    console.log("signed",signArr)
    let trans = await client.sendRawTransaction(signArr).do();
     console.log("Send complete");
  //   console.log("txID", trans);
     console.log("id", trans.txId);
   await waitForConfirmation(client, trans.txId);
    console.log("signed")
    
}





async function main() {
    try {
    // initialize an algodClient
    let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

   
    // compile programs 
    // let approvalProgram = await compileProgram(algodClient, approvalProgramSourceInitial);
    // let clearProgram = await compileProgram(algodClient, clearProgramSource);

    // create new application
    //let appId = await createApp(algodClient, creatorAccount, approvalProgram, clearProgram, localInts, localBytes, globalInts, globalBytes);
    let appId = 38490519;
    // opt-in to application
    // await optInApp(algodClient, userAccount, appId);
let accounts;
    AlgoSigner.connect()
    .then((d) => {
      AlgoSigner.accounts({
        ledger: 'TestNet'
      })
      .then(async (d) => {
        accounts = d;
        let amount = 499000;
        await reclaimApp(accounts[3].address, appId , amount);
      })
      .catch((e) => {
        console.error(e);
      });
    })
    .catch((e) => {
      console.error(e);
    });



    }
    catch (err){
        console.log("err", err);  
    }
}

main();
}

function App() {
  global.TextEncoder = require("util").TextEncoder; 
const algosdk = require('algosdk');

let appId = 38490519;

// user declared algod connection parameters
//purestake api used
let algodServer = "https://testnet-algorand.api.purestake.io/ps2";
let algodToken = {
    'X-API-Key': '9oXsQDRlZ97z9mTNNd7JFaVMwhCaBlID2SXUOJWl'
   };

let algodPort = "";
// read local state of application from user account
async function readLocalState(client, account, index){
  let accountInfoResponse = await client.accountInformation(account).do();
  for (let i = 0; i < accountInfoResponse['apps-local-state'].length; i++) { 
      if (accountInfoResponse['apps-local-state'][i].id == index) {
          console.log("User's local state:");
          for (let n = 0; n < accountInfoResponse['apps-local-state'][i][`key-value`].length; n++) {
              console.log(accountInfoResponse['apps-local-state'][i][`key-value`][n]);
          }
      }
  }
}
// read global state of application
async function readGlobalState(client, account, index){
  let accountInfoResponse = await client.accountInformation(account).do();
  for (let i = 0; i < accountInfoResponse['created-apps'].length; i++) { 
      if (accountInfoResponse['created-apps'][i].id == index) {
          console.log("Application's global state:");
          for (let n = 0; n < accountInfoResponse['created-apps'][i]['params']['global-state'].length; n++) {
              console.log(accountInfoResponse['created-apps'][i]['params']['global-state'][n]);
              let enc = accountInfoResponse['created-apps'][i]['params']['global-state'][n];
              var decodedString = window.atob(enc.key);
              console.log(decodedString);
          }
      }
  }
}

const first = async () => {
  let client = new algosdk.Algodv2(algodToken, algodServer, algodPort);
  let account = "USTLFIOCUYDTURGK5E3KL63HB3TEALMXUDXS73VKPE6DQMVXOOJDHRINHQ";
  console.log("account",account);
// read local state of application from user account
  await readLocalState(client, account, appId);
  // read global state of application
  await readGlobalState(client, account, appId);



}
useEffect(() =>{first()},[])
  return (
    <div className="App">
      <button onClick={() => optin()} > optin </button><br />
      <button onClick={() => donate()} > donate </button><br></br>
      <button onClick={() => claim()} > claim </button><br></br>
      <button onClick={() => reclaim()} > Reclaim </button>
    </div>
  );
}

export default App;
