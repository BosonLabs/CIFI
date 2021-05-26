/* global AlgoSigner */
import './App.css';
//import {useState} from 'react';
import React, { useState,useEffect } from "react";
import web3 from './web3';
import lottery from './nftcontract';//this line import lottery folder
import lottery2 from './helloworldcontract';//this line import lottery folder
import ipfs from './ipfs';
//import storehash from './storehash';
import { Router, Route, Switch,Link } from "react-router-dom";
//import history from "./utils/history";
//import First from "./First";
//import Second from "./Second";
// import NewPage from './Newpage';
// import Tokencreate from './Tokencreate';
// import PrintallImage from './Printallimage';
// import Sendpage from './Sendpage';
// import firebase from "./firebase";
import fireDb from './firebase';
import Compress from "react-image-file-resizer";

// import Mypurchasepage from './Mypurchasepage'
// import Explore from './Explore';
// import {Modal} from 'react-bootstrap';
// import {Button} from 'react-bootstrap'
// import Receivedpage from './Receivedpage';
import Popup from './Popup';


function Nft() {



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [isLoading, setLoading] = useState(false)

  const [symbolget,setsymbolget] = useState()

  const [currentSymbol, setCurrentSymbol] = useState('ETH')
  
  const changeFruit = (newFruit) => {
    setCurrentSymbol(newFruit)
  }
  

  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(false);

    window.location.reload(false)
    
  }

  // const togglePopups = () => {
  //   setIsOpen(true);
  // }

  const [tTransferAlgo,setTransferAlgo]=useState();

  const TransferAsset=async()=>{


    // Function used to wait for a tx confirmation
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
  // note: if you have an indexer instance available it is easier to just use this
  //     let accountInfo = await indexerClient.searchAccounts()
  //    .assetID(assetIndex).do();
  // and in the loop below use this to extract the asset for a particular account
  // accountInfo['accounts'][idx][account]);
  let accountInfo = await algodclient.accountInformation(account).do();
  for (let idx = 0; idx < accountInfo['created-assets'].length; idx++) {
      let scrutinizedAsset = accountInfo['created-assets'][idx];
      if (scrutinizedAsset['index'] === assetid) {
          console.log("AssetID = " + scrutinizedAsset['index']);
          let myparms = JSON.stringify(scrutinizedAsset['params'], undefined, 2);
          console.log("parms = " + myparms);
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


    

    alert("Transfer Asset");

    const algosdk = require('algosdk');
  var account1_mnemonic = "tackle dove endorse style mind boring hidden fiction power wrap diesel more cruel ecology few field they chase oil deliver useless paddle nation abandon domain";
  var account2_mnemonic = "tackle dove endorse style mind boring hidden fiction power wrap diesel more cruel ecology few field they chase oil deliver useless paddle nation abandon domain";
  //var account3_mnemonic = "tackle dove endorse style mind boring hidden fiction power wrap diesel more cruel ecology few field they chase oil deliver useless paddle nation abandon domain";
  var account3_mnemonic = "runway genuine lazy assist ticket junior pilot flush rocket swallow ripple risk alien mobile chat recall run quiz cause weekend range april vicious about spoon";
  var recoveredAccount1 = algosdk.mnemonicToSecretKey(account1_mnemonic);
  var recoveredAccount2 = algosdk.mnemonicToSecretKey(account2_mnemonic);
  var recoveredAccount3 = algosdk.mnemonicToSecretKey(account3_mnemonic);
  
  console.log(recoveredAccount3.addr);
  const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
  
      
  const port = "";
  
  //B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab
  
  const token = {
  
      'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
  }
  
  let algodclient = new algosdk.Algodv2(token, baseServer, port);

  
    alert("transferAlgo"+tTransferAlgo)  

    // Opting in to an Asset:
    // Opting in to transact with the new asset
    // Allow accounts that want recieve the new asset
    // Have to opt in. To do this they send an asset transfer
    // of the new asset to themseleves 
    // In this example we are setting up the 3rd recovered account to 
    // receive the new asset

    // First update changing transaction parameters
    // We will account for changing transaction parameters
    // before every transaction in this example
    let params = await algodclient.getTransactionParams().do();
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
let note=undefined;
let assetID='15940921';

    // signing and sending "txn" allows sender to begin accepting asset specified by creator and index
    let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, recipient, closeRemainderTo, revocationTarget,
         amount, note, assetID, params);

    // Must be signed by the account wishing to opt in to the asset    
    let rawSignedTxn = opttxn.signTxn(recoveredAccount3.sk);
    let opttx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
    console.log("Transaction : " + opttx.txId);
    // wait for transaction to be confirmed
    await waitForConfirmation(algodclient, opttx.txId);

    //You should now see the new asset listed in the account information
    console.log("Account 3 = " + recoveredAccount3.addr);
    await printAssetHolding(algodclient, recoveredAccount3.addr, assetID);

    
    // Transfer New Asset:
    // Now that account3 can recieve the new tokens 
    // we can tranfer tokens in from the creator
    // to account3
    // First update changing transaction parameters
    // We will account for changing transaction parameters
    // before every transaction in this example

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




  }


  const CreateAsset=()=>{

    const algosdk = require('algosdk');
  var account1_mnemonic = "tackle dove endorse style mind boring hidden fiction power wrap diesel more cruel ecology few field they chase oil deliver useless paddle nation abandon domain";
  var account2_mnemonic = "tackle dove endorse style mind boring hidden fiction power wrap diesel more cruel ecology few field they chase oil deliver useless paddle nation abandon domain";
  //var account3_mnemonic = "tackle dove endorse style mind boring hidden fiction power wrap diesel more cruel ecology few field they chase oil deliver useless paddle nation abandon domain";
  var account3_mnemonic = "runway genuine lazy assist ticket junior pilot flush rocket swallow ripple risk alien mobile chat recall run quiz cause weekend range april vicious about spoon";
  var recoveredAccount1 = algosdk.mnemonicToSecretKey(account1_mnemonic);
  var recoveredAccount2 = algosdk.mnemonicToSecretKey(account2_mnemonic);
  var recoveredAccount3 = algosdk.mnemonicToSecretKey(account3_mnemonic);
  
  console.log(recoveredAccount3.addr);
  const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
  
      
  const port = "";
  
  //B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab
  
  const token = {
  
      'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
  }
  
  let algodclient = new algosdk.Algodv2(token, baseServer, port);
  
  
// Function used to wait for a tx confirmation
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
    // note: if you have an indexer instance available it is easier to just use this
    //     let accountInfo = await indexerClient.searchAccounts()
    //    .assetID(assetIndex).do();
    // and in the loop below use this to extract the asset for a particular account
    // accountInfo['accounts'][idx][account]);
    let accountInfo = await algodclient.accountInformation(account).do();
    for (let idx = 0; idx < accountInfo['created-assets'].length; idx++) {
        let scrutinizedAsset = accountInfo['created-assets'][idx];
        if (scrutinizedAsset['index'] === assetid) {
            console.log("AssetID = " + scrutinizedAsset['index']);
            let myparms = JSON.stringify(scrutinizedAsset['params'], undefined, 2);
            console.log("parms = " + myparms);
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



(async () => {
    // Asset Creation:
    // The first transaciton is to create a new asset
    // Get last round and suggested tx fee
    // We use these to get the latest round and tx fees
    // These parameters will be required before every 
    // Transaction
    // We will account for changing transaction parameters
    // before every transaction in this example
    let params = await algodclient.getTransactionParams().do();
    //comment out the next two lines to use suggested fee
    params.fee = 1000;
    params.flatFee = true;
    console.log(params);
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
    let unitName = currentSymbol;
    // Friendly name of the asset    
    let assetName = tname;
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
   // console.log("AssetID = " + assetID);
    
    await printCreatedAsset(algodclient, recoveredAccount1.addr, assetID);
    await printAssetHolding(algodclient, recoveredAccount1.addr, assetID);
    
    
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
  



    //this below is transfer usefull function

    // Opting in to an Asset:
    // Opting in to transact with the new asset
    // Allow accounts that want recieve the new asset
    // Have to opt in. To do this they send an asset transfer
    // of the new asset to themseleves 
    // In this example we are setting up the 3rd recovered account to 
    // receive the new asset

    // First update changing transaction parameters
    // We will account for changing transaction parameters
    // before every transaction in this example
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
//let note=undefined;
//assetID='15940921';

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

    
    // Transfer New Asset:
    // Now that account3 can recieve the new tokens 
    // we can tranfer tokens in from the creator
    // to account3
    // First update changing transaction parameters
    // We will account for changing transaction parameters
    // before every transaction in this example

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




    

    // freeze asset

    // The asset was created and configured to allow freezing an account
    // If the freeze address is set "", it will no longer be possible to do this.
    // In this example we will now freeze account3 from transacting with the 
    // The newly created asset. 
    // The freeze transaction is sent from the freeze acount
    // Which in this example is account2 

    // First update changing transaction parameters
    // We will account for changing transaction parameters
    // before every transaction in this example
   // await getChangingParms(algodclient);
    // params = await algodclient.getTransactionParams().do();
    // //comment out the next two lines to use suggested fee
    // params.fee = 1000;
    // params.flatFee = true;

    // let from = recoveredAccount2.addr;
    // let freezeTarget = recoveredAccount3.addr;
    // let freezeState = true;

    // // The freeze transaction needs to be signed by the freeze account
    // let ftxn = algosdk.makeAssetFreezeTxnWithSuggestedParams(from, note,
    //     assetID, freezeTarget, freezeState, params)

    // // Must be signed by the freeze account   
    // rawSignedTxn = ftxn.signTxn(recoveredAccount2.sk)
    // let ftx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
    // console.log("Transaction : " + ftx.txId);
    // // wait for transaction to be confirmed
    // await waitForConfirmation(algodclient, ftx.txId);

    // // You should now see the asset is frozen listed in the account information
    // console.log("Account 3 = " + recoveredAccount3.addr);
    // await printAssetHolding(algodclient, recoveredAccount3.addr, assetID);



    // Revoke an Asset:
    
    // params = await algodclient.getTransactionParams().do();
    // //comment out the next two lines to use suggested fee
    // params.fee = 1000;
    // params.flatFee = true;   
    
    // sender = recoveredAccount2.addr;
    // recipient = recoveredAccount1.addr;
    // revocationTarget = recoveredAccount3.addr;
    // closeRemainderTo = undefined;
    // amount = 10;
    // // signing and sending "txn" will send "amount" assets from "revocationTarget" to "recipient",
    // // if and only if sender == clawback manager for this asset
    
    // let rtxn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, recipient, closeRemainderTo, revocationTarget,
    //    amount, note, assetID, params);
    // // Must be signed by the account that is the clawback address    
    // rawSignedTxn = rtxn.signTxn(recoveredAccount2.sk)
    // let rtx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
    // console.log("Transaction : " + rtx.txId);
    // // wait for transaction to be confirmed
    // await waitForConfirmation(algodclient, rtx.txId);

    // // You should now see 0 assets listed in the account information
    // // for the third account
    // console.log("Account 3 = " + recoveredAccount3.addr);
    // await printAssetHolding(algodclient, recoveredAccount3.addr, assetID);


    
    // // Destroy and Asset:
    
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


    let refalgo=fireDb.database().ref(`algorandData/${recoveredAccount1.addr}`);

    let dateset=new Date().toDateString();

    console.log("dateget",dateset)

    const db = refalgo.push().key;

     
    console.log("dbcheck",db)

    refalgo.child(db).set({algocreator:recoveredAccount1.addr,algotrasnfer:recoveredAccount3.addr,algoid:assetID,algoname:tname,algosymbol:currentSymbol});

setLoading(false);

setIsOpen(true);




})().catch(e => {
    console.log(e);
    console.trace();
});


  }


  

  let btn;
  var accounts;


  const connectmm = async () => {


    //var getaddress=localStorage.getItem('myaddress')

    //if(getaddress !== ""){


      //var btn = document.getElementById("bu");
        //btn.value = accounts[0]; // will just add a hidden value
        //btn.innerHTML = accounts[0];
        //btn.innerHTML = "CONNECTED"



    //}
    //else{


      //window.alert("Do you want to connect with metamask");


      //event.preventDefault();
     //bring in user's metamask account address

     

     //const demo=await getaaa.methods.setTokenPrice([isd],price).send({from:accounts[0]})

      
      //alert("acc"+accounts[0])

      accounts = await web3.eth.getAccounts();//.send({from:accounts[0]})

      if(accounts[0] !== ""){

      

        //accounts[0
        //document.getElementById("bu").
        //document.getElementById("bu").append("CONNECTED")

        btn= document.getElementById("bu");
        //btn.value = accounts[0]; // will just add a hidden value
        //btn.innerHTML = accounts[0];
        btn.innerHTML = "CONNECTED"


        localStorage.setItem('myaddress', accounts[0]);
      
      }
      else{
        //document.getElementById("bu").remove("");
        //document.getElementById("bu").replaceWith("NOT CONNECTED")
        var btns = document.getElementById("bu");
        //btns.value = accounts[0]; // will just add a hidden value
        btns.innerHTML = "NOT CONNECTED";
        localStorage.setItem('myaddress', "");
      }

    
  };    
  useEffect(()=>{connectmm()},[])



  //firebase 

  var studentlist = [];

  var stuset=[];


  const [currentid, setCurrentid] = useState("");

  const [toaddress,setToaddress] = useState("");
  const [tid,setId] = useState("");
  //const [turi,setUri] = useState("");
  const [tname,setName] = useState("");
  const [tsymbol,settSymbol] = useState("");
  //const [tokenuri,setTokenUri] = useState("");
  //var [getimageurl,setgetImage] = useState("");
  //const [tfile,setTfile] = useState("");
  const [ipfsHash,setIpfsHash] = useState(null);
  var [buffer,setBuffer] = useState("");
  //const [ethAddress,setEthAddress] = useState("");
  //const [blockNumber,setBlocknumber] = useState("");
  //const [transactionHash,setTransaction] = useState("");
  //const [gasUsed,setGasUsed] = useState("");
  //const [txReceipt,se] = useState("");

  let tf;

  let [Img,setImg] = useState("");

  let address="";

  //start


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
const onSubmitImage = async (event) => {
  event.preventDefault();
 //bring in user's metamask account address
  const accounts = await web3.eth.getAccounts();
 
  console.log('Sending from Metamask account: ' + accounts[0]);

  await ipfs.add(buffer, (err, ipfsHash) => {
    console.log(err,ipfsHash);

    console.log("buff",buffer);

  
    setIpfsHash(ipfsHash[0].hash);
  }) 
}; 
//end

  

   const onSubmitNFT = async (event) => {

    setLoading(true);
  
    event.preventDefault();
    
      //new write below

      const accounts = await web3.eth.getAccounts();
    
    
      //alert("waiting for pic url"); 
    
      var ta=tname;
      //var tb=tsymbol;
      var tb=currentSymbol;
      var tc='https://ipfs.io/ipfs/'+ipfsHash;
      var td=toaddress;
      var te=tid;
      tf='https://ipfs.io/ipfs/'+ipfsHash;


      if(Img === '')
      {

        alert("Please upload images...")

      }
      else{


        var getaddress=localStorage.getItem('myaddress')

    //alert("getdata from SYMBOL  "+tb);
    

    if(tb==="BNB")
    {

      await lottery.deploy({
    
        data:'60806040523480156200001157600080fd5b506040516200474c3803806200474c833981018060405260a08110156200003757600080fd5b8101908080516401000000008111156200005057600080fd5b820160208101848111156200006457600080fd5b81516401000000008111828201871017156200007f57600080fd5b505092919060200180516401000000008111156200009c57600080fd5b82016020810184811115620000b057600080fd5b8151640100000000811182820187101715620000cb57600080fd5b50509291906020018051640100000000811115620000e857600080fd5b82016020810184811115620000fc57600080fd5b81516401000000008111828201871017156200011757600080fd5b505060208083015160409093015191945091925090859085908290829062000165907f01ffc9a70000000000000000000000000000000000000000000000000000000090620002c1811b901c565b6200017d6380ac58cd60e01b620002c160201b60201c565b6200019563780e9d6360e01b620002c160201b60201c565b8151620001aa90600990602085019062000679565b508051620001c090600a90602084019062000679565b50620001d9635b5e139f60e01b620002c160201b60201c565b50505050620001fd620001f16200039060201b60201c565b6200039560201b60201c565b6200020d6200039060201b60201c565b600f80546001600160a01b0319166001600160a01b0392831617908190556040519116906000906000805160206200470a833981519152908290a3601580546001600160a01b038084166001600160a01b031992831617909255601680549285169290911691909117905582516200028d90601490602086019062000679565b506000601355620002a581620003e7602090811b901c565b620002b6816200039560201b60201c565b50505050506200071b565b7fffffffff0000000000000000000000000000000000000000000000000000000080821614156200035357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b7fffffffff00000000000000000000000000000000000000000000000000000000166000908152602081905260409020805460ff19166001179055565b335b90565b620003b081600e6200047760201b620034a41790919060201c565b6040516001600160a01b038216907f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f690600090a250565b620003f76200051b60201b60201c565b6200046357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b62000474816200054a60201b60201c565b50565b620004898282620005f660201b60201c565b15620004f657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b600f546000906001600160a01b03166200053b62000390602090811b901c565b6001600160a01b031614905090565b6001600160a01b038116620005ab576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180620046e46026913960400191505060405180910390fd5b600f546040516001600160a01b038084169216906000805160206200470a83398151915290600090a3600f80546001600160a01b0319166001600160a01b0392909216919091179055565b60006001600160a01b03821662000659576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806200472a6022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620006bc57805160ff1916838001178555620006ec565b82800160010185558215620006ec579182015b82811115620006ec578251825591602001919060010190620006cf565b50620006fa929150620006fe565b5090565b6200039291905b80821115620006fa576000815560010162000705565b613fb9806200072b6000396000f3fe6080604052600436106102725760003560e01c80638f32d59b1161014f578063b5a99345116100c1578063d6dd3cc31161007a578063d6dd3cc314610d70578063dc8e92ea14610d9a578063e564da6914610e48578063e985e9c514610ef8578063f2fde38b14610f33578063fc885bf714610f6657610272565b8063b5a9934514610ad6578063b88d4fde14610aeb578063bfb231d214610bbc578063c87b56dd14610c81578063d4477b3c14610cab578063d50f15cf14610d5b57610272565b80639abc8320116101135780639abc8320146109f0578063a22cb46514610a05578063aa271e1a14610a40578063adecec2d14610a73578063af640d0f14610aac578063b4a99a4e14610ac157610272565b80638f32d59b146108b157806395d89b41146108c6578063983b2d56146108db57806398588a2b1461090e57806398650275146109db57610272565b8063446c33db116101e85780636352211e116101ac5780636352211e1461078a57806370a08231146107b4578063715018a6146107e757806380482491146107fc5780638462151c146108195780638da5cb5b1461089c57610272565b8063446c33db1461064457806345cefcec146106705780634f6ccce71461068557806350655d8c146106af57806350bb4e7f146106c457610272565b80631239ec8c1161023a5780631239ec8c146103f457806318160ddd1461053457806323b872dd1461055b5780632f745c591461059e57806342842e0e146105d757806342966c681461061a57610272565b806301ffc9a71461027757806306fdde03146102bf578063081812fc14610349578063095ea7b31461038f5780630bb78ec1146103ca575b600080fd5b34801561028357600080fd5b506102ab6004803603602081101561029a57600080fd5b50356001600160e01b031916610f90565b604080519115158252519081900360200190f35b3480156102cb57600080fd5b506102d4610faf565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561030e5781810151838201526020016102f6565b50505050905090810190601f16801561033b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561035557600080fd5b506103736004803603602081101561036c57600080fd5b5035611046565b604080516001600160a01b039092168252519081900360200190f35b34801561039b57600080fd5b506103c8600480360360408110156103b257600080fd5b506001600160a01b0381351690602001356110ab565b005b3480156103d657600080fd5b506102d4600480360360208110156103ed57600080fd5b50356111d9565b34801561040057600080fd5b506103c86004803603606081101561041757600080fd5b6001600160a01b038235169190810190604081016020820135600160201b81111561044157600080fd5b82018360208201111561045357600080fd5b803590602001918460208302840111600160201b8311171561047457600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b8111156104c357600080fd5b8201836020820111156104d557600080fd5b803590602001918460208302840111600160201b831117156104f657600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550611274945050505050565b34801561054057600080fd5b50610549611474565b60408051918252519081900360200190f35b34801561056757600080fd5b506103c86004803603606081101561057e57600080fd5b506001600160a01b0381358116916020810135909116906040013561147a565b3480156105aa57600080fd5b50610549600480360360408110156105c157600080fd5b506001600160a01b03813516906020013561148a565b3480156105e357600080fd5b506103c8600480360360608110156105fa57600080fd5b506001600160a01b0381358116916020810135909116906040013561150d565b34801561062657600080fd5b506103c86004803603602081101561063d57600080fd5b5035611528565b6103c86004803603604081101561065a57600080fd5b506001600160a01b038135169060200135611583565b34801561067c57600080fd5b506103c86116ad565b34801561069157600080fd5b50610549600480360360208110156106a857600080fd5b5035611740565b3480156106bb57600080fd5b506103736117a9565b3480156106d057600080fd5b506102ab600480360360608110156106e757600080fd5b6001600160a01b0382351691602081013591810190606081016040820135600160201b81111561071657600080fd5b82018360208201111561072857600080fd5b803590602001918460018302840111600160201b8311171561074957600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506117b8945050505050565b34801561079657600080fd5b50610373600480360360208110156107ad57600080fd5b50356117d8565b3480156107c057600080fd5b50610549600480360360208110156107d757600080fd5b50356001600160a01b031661182f565b3480156107f357600080fd5b506103c861189a565b6102ab6004803603602081101561081257600080fd5b5035611940565b34801561082557600080fd5b5061084c6004803603602081101561083c57600080fd5b50356001600160a01b0316611b96565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015610888578181015183820152602001610870565b505050509050019250505060405180910390f35b3480156108a857600080fd5b50610373611bf7565b3480156108bd57600080fd5b506102ab611c06565b3480156108d257600080fd5b506102d4611c2c565b3480156108e757600080fd5b506103c8600480360360208110156108fe57600080fd5b50356001600160a01b0316611c8d565b34801561091a57600080fd5b506103c8600480360360a081101561093157600080fd5b6001600160a01b0382351691602081013591810190606081016040820135600160201b81111561096057600080fd5b82018360208201111561097257600080fd5b803590602001918460018302840111600160201b8311171561099357600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955050823593505050602001351515611ce4565b3480156109e757600080fd5b506103c8611ed4565b3480156109fc57600080fd5b506102d4611ee6565b348015610a1157600080fd5b506103c860048036036040811015610a2857600080fd5b506001600160a01b0381351690602001351515611f41565b348015610a4c57600080fd5b506102ab60048036036020811015610a6357600080fd5b50356001600160a01b0316612049565b348015610a7f57600080fd5b506102d460048036036040811015610a9657600080fd5b506001600160a01b03813516906020013561205c565b348015610ab857600080fd5b506105496120dd565b348015610acd57600080fd5b506103736120e3565b348015610ae257600080fd5b506102d46120f2565b348015610af757600080fd5b506103c860048036036080811015610b0e57600080fd5b6001600160a01b03823581169260208101359091169160408201359190810190608081016060820135600160201b811115610b4857600080fd5b820183602082011115610b5a57600080fd5b803590602001918460018302840111600160201b83111715610b7b57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506121ad945050505050565b348015610bc857600080fd5b50610be660048036036020811015610bdf57600080fd5b503561220e565b6040518085815260200184815260200180602001836003811115610c0657fe5b60ff168152602001828103825284818151815260200191508051906020019080838360005b83811015610c43578181015183820152602001610c2b565b50505050905090810190601f168015610c705780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b348015610c8d57600080fd5b506102d460048036036020811015610ca457600080fd5b50356122c0565b348015610cb757600080fd5b506103c860048036036040811015610cce57600080fd5b810190602081018135600160201b811115610ce857600080fd5b820183602082011115610cfa57600080fd5b803590602001918460208302840111600160201b83111715610d1b57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550505050351515905061240e565b348015610d6757600080fd5b5061084c612632565b348015610d7c57600080fd5b5061054960048036036020811015610d9357600080fd5b5035612743565b348015610da657600080fd5b506103c860048036036020811015610dbd57600080fd5b810190602081018135600160201b811115610dd757600080fd5b820183602082011115610de957600080fd5b803590602001918460208302840111600160201b83111715610e0a57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550612761945050505050565b348015610e5457600080fd5b506103c860048036036040811015610e6b57600080fd5b810190602081018135600160201b811115610e8557600080fd5b820183602082011115610e9757600080fd5b803590602001918460208302840111600160201b83111715610eb857600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295505091359250612902915050565b348015610f0457600080fd5b506102ab60048036036040811015610f1b57600080fd5b506001600160a01b0381358116916020013516612992565b348015610f3f57600080fd5b506103c860048036036020811015610f5657600080fd5b50356001600160a01b03166129c0565b348015610f7257600080fd5b506102ab60048036036020811015610f8957600080fd5b5035612a25565b6001600160e01b03191660009081526020819052604090205460ff1690565b60098054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561103b5780601f106110105761010080835404028352916020019161103b565b820191906000526020600020905b81548152906001019060200180831161101e57829003601f168201915b505050505090505b90565b600061105182612a3a565b61108f57604051600160e51b62461bcd02815260040180806020018281038252602c815260200180613df8602c913960400191505060405180910390fd5b506000908152600260205260409020546001600160a01b031690565b60006110b6826117d8565b9050806001600160a01b0316836001600160a01b0316141561110c57604051600160e51b62461bcd028152600401808060200182810382526021815260200180613ebb6021913960400191505060405180910390fd5b806001600160a01b031661111e612a57565b6001600160a01b0316148061113f575061113f8161113a612a57565b612992565b61117d57604051600160e51b62461bcd028152600401808060200182810382526038815260200180613cfb6038913960400191505060405180910390fd5b60008281526002602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b600d6020908152600091825260409182902080548351601f60026000196101006001861615020190931692909204918201849004840281018401909452808452909183018282801561126c5780601f106112415761010080835404028352916020019161126c565b820191906000526020600020905b81548152906001019060200180831161124f57829003601f168201915b505050505081565b60005b8151811015611304576112b18484838151811061129057fe5b60200260200101518484815181106112a457fe5b602002602001015161147a565b6003601260008484815181106112c357fe5b6020026020010151815260200190815260200160002060030160006101000a81548160ff021916908360038111156112f757fe5b0217905550600101611277565b507fe0bdff057bc74b2545c13ac89393038d336f254b2245c876efa9669ddcc09b97601260008360008151811061133757fe5b602002602001015181526020019081526020016000206002018383604051808060200180602001806020018481038452878181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156113e35780601f106113b8576101008083540402835291602001916113e3565b820191906000526020600020905b8154815290600101906020018083116113c657829003601f168201915b50508481038352865181528651602091820191808901910280838360005b83811015611419578181015183820152602001611401565b50505050905001848103825285818151815260200191508051906020019060200280838360005b83811015611458578181015183820152602001611440565b50505050905001965050505050505060405180910390a1505050565b60075490565b611485838383612a5b565b505050565b60006114958361182f565b82106114d557604051600160e51b62461bcd02815260040180806020018281038252602b815260200180613c28602b913960400191505060405180910390fd5b6001600160a01b03831660009081526005602052604090208054839081106114f957fe5b906000526020600020015490505b92915050565b611485838383604051806020016040528060008152506121ad565b611539611533612a57565b82612a7a565b61157757604051600160e51b62461bcd028152600401808060200182810382526030815260200180613f5e6030913960400191505060405180910390fd5b61158081612b21565b50565b61158e611533612a57565b6115cc57604051600160e51b62461bcd028152600401808060200182810382526031815260200180613edc6031913960400191505060405180910390fd5b3361160b57604051600160e51b62461bcd028152600401808060200182810382526024815260200180613cab6024913960400191505060405180910390fd5b6000818152600160205260409020546001600160a01b031661162c82612b33565b6001600160a01b038116600090815260036020526040902061164d90612b6e565b33600090815260036020526040902061166590612b85565b60008281526001602052604080822080546001600160a01b03191633908117909155905184926001600160a01b03851691600080516020613e9b8339815191529190a4505050565b6116b5611c06565b6117095760408051600160e51b62461bcd02815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6040517ff58fef8e187ef8dfd7bef096c1ef3e4f3c54f98d95b8ad5659349b07e61204df90600090a16015546001600160a01b0316ff5b600061174a611474565b821061178a57604051600160e51b62461bcd02815260040180806020018281038252602c815260200180613f0d602c913960400191505060405180910390fd5b6007828154811061179757fe5b90600052602060002001549050919050565b6015546001600160a01b031681565b60006117c48484612b8e565b6117ce8383612baf565b5060019392505050565b6000818152600160205260408120546001600160a01b03168061150757604051600160e51b62461bcd028152600401808060200182810382526029815260200180613d5d6029913960400191505060405180910390fd5b60006001600160a01b03821661187957604051600160e51b62461bcd02815260040180806020018281038252602a815260200180613d33602a913960400191505060405180910390fd5b6001600160a01b038216600090815260036020526040902061150790612c49565b6118a2611c06565b6118f65760408051600160e51b62461bcd02815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600f546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600f80546001600160a01b0319169055565b60008181526012602052604081206001015434101561199a5760408051600160e51b62461bcd02815260206004820152600b6024820152600160a81b6a507269636520697373756502604482015290519081900360640190fd5b600082815260126020526040902060039081015460ff16908111156119bb57fe5b6001146119ff5760408051600160e51b62461bcd0281526020600482015260076024820152600160c81b664e6f2053616c6502604482015290519081900360640190fd5b60008281526012602052611a1234612c4d565b90506000611a203483612c68565b6015546040519192506001600160a01b03169082156108fc029083906000818181858888f19350505050158015611a5b573d6000803e3d6000fd5b506016546040516001600160a01b039091169083156108fc029084906000818181858888f19350505050158015611a96573d6000803e3d6000fd5b505050601554611ab0906001600160a01b03163384612a5b565b60008281526012602090815260409182902060038101805460ff19166002908117909155835186815234948101859052606093810184815292820180546001811615610100026000190116929092049381018490527f46e70e87b058d8f3cde334fc179a61ac8acadcc4fdc26735e4195106b3c88eb394879492939092608083019085908015611b815780601f10611b5657610100808354040283529160200191611b81565b820191906000526020600020905b815481529060010190602001808311611b6457829003601f168201915b505094505050505060405180910390a1919050565b6060611ba182612caa565b805480602002602001604051908101604052809291908181526020018280548015611beb57602002820191906000526020600020905b815481526020019060010190808311611bd7575b50505050509050919050565b600f546001600160a01b031690565b600f546000906001600160a01b0316611c1d612a57565b6001600160a01b031614905090565b600a8054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561103b5780601f106110105761010080835404028352916020019161103b565b611c9d611c98612a57565b612049565b611cdb57604051600160e51b62461bcd028152600401808060200182810382526030815260200180613d866030913960400191505060405180910390fd5b61158081612cc4565b611cef611c98612a57565b611d2d57604051600160e51b62461bcd028152600401808060200182810382526030815260200180613d866030913960400191505060405180910390fd5b6028841115611d735760408051600160e51b62461bcd0281526020600482015260076024820152600160cc1b6604f7665722034302604482015290519081900360640190fd5b60005b84811015611ecc57601354611d9290600163ffffffff612d0c16565b601381815560009182526012602090815260408084206001018790559154835291208551611dc892600290920191870190613b2f565b5060018215151415611df8576013546000908152601260205260409020600301805460ff19166001179055611e15565b6013546000908152601260205260409020600301805460ff191690555b611e2186601354612b8e565b7fadef11a3979b8ceb0573eb6ef0678134a09c23a0d94e5ea47cd18ac3a9fc0194601354856040518083815260200180602001828103825283818151815260200191508051906020019080838360005b83811015611e89578181015183820152602001611e71565b50505050905090810190601f168015611eb65780820380516001836020036101000a031916815260200191505b50935050505060405180910390a1600101611d76565b505050505050565b611ee4611edf612a57565b612d69565b565b6014805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561126c5780601f106112415761010080835404028352916020019161126c565b611f49612a57565b6001600160a01b0316826001600160a01b03161415611fb25760408051600160e51b62461bcd02815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015290519081900360640190fd5b8060046000611fbf612a57565b6001600160a01b03908116825260208083019390935260409182016000908120918716808252919093529120805460ff191692151592909217909155612003612a57565b60408051841515815290516001600160a01b0392909216917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319181900360200190a35050565b6000611507600e8363ffffffff612db116565b6011602052816000526040600020818154811061207557fe5b600091825260209182902001805460408051601f6002600019610100600187161502019094169390930492830185900485028101850190915281815294509092509083018282801561126c5780601f106112415761010080835404028352916020019161126c565b60135481565b6017546001600160a01b031681565b606060005b6103e88110156121a9576000818152600d602090815260409182902080548351601f60026000196101006001861615020190931692909204918201849004840281018401909452808452606093928301828280156121965780601f1061216b57610100808354040283529160200191612196565b820191906000526020600020905b81548152906001019060200180831161217957829003601f168201915b5050600190950194506120f79350505050565b5090565b6121be6121b8612a57565b83612a7a565b6121fc57604051600160e51b62461bcd028152600401808060200182810382526031815260200180613edc6031913960400191505060405180910390fd5b61220884848484612e1b565b50505050565b60126020908152600091825260409182902080546001808301546002808501805488519481161561010002600019011691909104601f8101879004870284018701909752868352929590949192918301828280156122ad5780601f10612282576101008083540402835291602001916122ad565b820191906000526020600020905b81548152906001019060200180831161229057829003601f168201915b5050506003909301549192505060ff1684565b6000818152600d60209081526040918290208054835160026001831615610100026000190190921691909104601f810184900484028201840190945283815260609384939192918301828280156123585780601f1061232d57610100808354040283529160200191612358565b820191906000526020600020905b81548152906001019060200180831161233b57829003601f168201915b5050506000868152601260209081526040918290206002908101805484516001821615610100026000190190911692909204601f81018490048402830184019094528382529596506124079587955090935091908301828280156123fd5780601f106123d2576101008083540402835291602001916123fd565b820191906000526020600020905b8154815290600101906020018083116123e057829003601f168201915b5050505050612e70565b9392505050565b612419611c98612a57565b61245757604051600160e51b62461bcd028152600401808060200182810382526030815260200180613d866030913960400191505060405180910390fd5b60005b825181101561251257600182151514156124be5760016012600085848151811061248057fe5b6020026020010151815260200190815260200160002060030160006101000a81548160ff021916908360038111156124b457fe5b021790555061250a565b6000601260008584815181106124d057fe5b6020026020010151815260200190815260200160002060030160006101000a81548160ff0219169083600381111561250457fe5b02179055505b60010161245a565b507fefd56044628f374cec68c952a0580a76d23b4bd06d17bb887193f2176ba6c48b82601260008560008151811061254657fe5b60200260200101518152602001908152602001600020600201604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b838110156125a357818101518382015260200161258b565b50505050919091018481038352855460026000196101006001841615020190911604808252602090910191508590801561261e5780601f106125f35761010080835404028352916020019161261e565b820191906000526020600020905b81548152906001019060200180831161260157829003601f168201915b505094505050505060405180910390a15050565b60608061263e33611b96565b905060005b815181101561273e5760016012600084848151811061265e57fe5b6020026020010151815260200190815260200160002060030160009054906101000a900460ff16600381111561269057fe5b141561273657601960008383815181106126a657fe5b60209081029190910181015182528101919091526040016000205460ff166127365760188282815181106126d657fe5b602090810291909101810151825460018181018555600094855292842001558351909160199185908590811061270857fe5b6020026020010151815260200190815260200160002060006101000a81548160ff0219169083151502179055505b600101612643565b505090565b6018818154811061275057fe5b600091825260209091200154905081565b61276c611c98612a57565b6127aa57604051600160e51b62461bcd028152600401808060200182810382526030815260200180613d866030913960400191505060405180910390fd5b60005b81518110156127da576127d28282815181106127c557fe5b6020026020010151612b21565b6001016127ad565b507f68f2536b9ff968bd2acc006b7cf7be7ca83c2f4a462c355e925bb354e5ce43d5601260008360008151811061280d57fe5b60200260200101518152602001908152602001600020600201826040518080602001806020018381038352858181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156128b45780601f10612889576101008083540402835291602001916128b4565b820191906000526020600020905b81548152906001019060200180831161289757829003601f168201915b50508381038252845181528451602091820191808701910280838360005b838110156128ea5781810151838201526020016128d2565b5050505090500194505050505060405180910390a150565b61290d611c98612a57565b61294b57604051600160e51b62461bcd028152600401808060200182810382526030815260200180613d866030913960400191505060405180910390fd5b60005b825181101561148557816012600085848151811061296857fe5b6020026020010151815260200190815260200160002060010181905550808060010191505061294e565b6001600160a01b03918216600090815260046020908152604080832093909416825291909152205460ff1690565b6129c8611c06565b612a1c5760408051600160e51b62461bcd02815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b61158081612eac565b60196020526000908152604090205460ff1681565b6000908152600160205260409020546001600160a01b0316151590565b3390565b612a66838383612f50565b612a708382613088565b611485828261317d565b6000612a8582612a3a565b612ac357604051600160e51b62461bcd02815260040180806020018281038252602c815260200180613ccf602c913960400191505060405180910390fd5b6000612ace836117d8565b9050806001600160a01b0316846001600160a01b03161480612b095750836001600160a01b0316612afe84611046565b6001600160a01b0316145b80612b195750612b198185612992565b949350505050565b611580612b2d826117d8565b826131bb565b6000818152600260205260409020546001600160a01b03161561158057600090815260026020526040902080546001600160a01b0319169055565b8054612b8190600163ffffffff612c6816565b9055565b80546001019055565b612b988282613203565b612ba2828261317d565b612bab81613328565b5050565b612bb882612a3a565b612bf657604051600160e51b62461bcd02815260040180806020018281038252602c815260200180613e24602c913960400191505060405180910390fd5b8051612c0990600b906020840190613b2f565b506000828152600d602090815260409091208251612c2992840190613b2f565b506000828152600c60209081526040909120825161148592840190613b2f565b5490565b600080612c5b83600261336c565b90506124078160646133c8565b600061240783836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525061340a565b6001600160a01b0316600090815260056020526040902090565b612cd5600e8263ffffffff6134a416565b6040516001600160a01b038216907f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f690600090a250565b6000828201838110156124075760408051600160e51b62461bcd02815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b612d7a600e8263ffffffff61352816565b6040516001600160a01b038216907fe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb6669290600090a250565b60006001600160a01b038216612dfb57604051600160e51b62461bcd028152600401808060200182810382526022815260200180613e506022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b612e26848484612a5b565b612e3284848484613592565b61220857604051600160e51b62461bcd028152600401808060200182810382526032815260200180613c536032913960400191505060405180910390fd5b606061240783836040518060200160405280600081525060405180602001604052806000815250604051806020016040528060008152506136ec565b6001600160a01b038116612ef457604051600160e51b62461bcd028152600401808060200182810382526026815260200180613c856026913960400191505060405180910390fd5b600f546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600f80546001600160a01b0319166001600160a01b0392909216919091179055565b826001600160a01b0316612f63826117d8565b6001600160a01b031614612fab57604051600160e51b62461bcd028152600401808060200182810382526029815260200180613e726029913960400191505060405180910390fd5b6001600160a01b038216612ff357604051600160e51b62461bcd028152600401808060200182810382526024815260200180613cab6024913960400191505060405180910390fd5b612ffc81612b33565b6001600160a01b038316600090815260036020526040902061301d90612b6e565b6001600160a01b038216600090815260036020526040902061303e90612b85565b60008181526001602052604080822080546001600160a01b0319166001600160a01b038681169182179092559151849391871691600080516020613e9b83398151915291a4505050565b6001600160a01b0382166000908152600560205260408120546130b290600163ffffffff612c6816565b60008381526006602052604090205490915080821461314d576001600160a01b03841660009081526005602052604081208054849081106130ef57fe5b906000526020600020015490508060056000876001600160a01b03166001600160a01b03168152602001908152602001600020838154811061312d57fe5b600091825260208083209091019290925591825260069052604090208190555b6001600160a01b0384166000908152600560205260409020805490613176906000198301613ba9565b5050505050565b6001600160a01b0390911660009081526005602081815260408084208054868652600684529185208290559282526001810183559183529091200155565b6131c58282613900565b6000818152600d60205260409020546002600019610100600184161502019091160415612bab576000818152600d60205260408120612bab91613bcd565b6001600160a01b0382166132615760408051600160e51b62461bcd02815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015290519081900360640190fd5b61326a81612a3a565b156132bf5760408051600160e51b62461bcd02815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015290519081900360640190fd5b600081815260016020908152604080832080546001600160a01b0319166001600160a01b0387169081179091558352600390915290206132fe90612b85565b60405181906001600160a01b03841690600090600080516020613e9b833981519152908290a45050565b600780546000838152600860205260408120829055600182018355919091527fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c6880155565b60008261337b57506000611507565b8282028284828161338857fe5b041461240757604051600160e51b62461bcd028152600401808060200182810382526021815260200180613dd76021913960400191505060405180910390fd5b600061240783836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f00000000000081525061392c565b6000818484111561349c57604051600160e51b62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360005b83811015613461578181015183820152602001613449565b50505050905090810190601f16801561348e5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6134ae8282612db1565b156135035760408051600160e51b62461bcd02815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b6135328282612db1565b61357057604051600160e51b62461bcd028152600401808060200182810382526021815260200180613db66021913960400191505060405180910390fd5b6001600160a01b0316600090815260209190915260409020805460ff19169055565b60006135a6846001600160a01b0316613994565b6135b257506001612b19565b6000846001600160a01b031663150b7a026135cb612a57565b8887876040518563ffffffff1660e01b815260040180856001600160a01b03166001600160a01b03168152602001846001600160a01b03166001600160a01b0316815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015613650578181015183820152602001613638565b50505050905090810190601f16801561367d5780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b15801561369f57600080fd5b505af11580156136b3573d6000803e3d6000fd5b505050506040513d60208110156136c957600080fd5b50516001600160e01b031916600160e11b630a85bd010214915050949350505050565b6060808690506060869050606086905060608690506060869050606081518351855187518951010101016040519080825280601f01601f191660200182016040528015613740576020820181803883390190505b509050806000805b88518110156137995788818151811061375d57fe5b602001015160f81c60f81b83838060010194508151811061377a57fe5b60200101906001600160f81b031916908160001a905350600101613748565b5060005b87518110156137ee578781815181106137b257fe5b602001015160f81c60f81b8383806001019450815181106137cf57fe5b60200101906001600160f81b031916908160001a90535060010161379d565b5060005b86518110156138435786818151811061380757fe5b602001015160f81c60f81b83838060010194508151811061382457fe5b60200101906001600160f81b031916908160001a9053506001016137f2565b5060005b85518110156138985785818151811061385c57fe5b602001015160f81c60f81b83838060010194508151811061387957fe5b60200101906001600160f81b031916908160001a905350600101613847565b5060005b84518110156138ed578481815181106138b157fe5b602001015160f81c60f81b8383806001019450815181106138ce57fe5b60200101906001600160f81b031916908160001a90535060010161389c565b50909d9c50505050505050505050505050565b61390a82826139cb565b6139148282613088565b600081815260066020526040812055612bab81613a93565b6000818361397e57604051600160e51b62461bcd028152602060048201818152835160248401528351909283926044909101919085019080838360008315613461578181015183820152602001613449565b50600083858161398a57fe5b0495945050505050565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4708115801590612b195750141592915050565b816001600160a01b03166139de826117d8565b6001600160a01b031614613a2657604051600160e51b62461bcd028152600401808060200182810382526025815260200180613f396025913960400191505060405180910390fd5b613a2f81612b33565b6001600160a01b0382166000908152600360205260409020613a5090612b6e565b60008181526001602052604080822080546001600160a01b0319169055518291906001600160a01b03851690600080516020613e9b833981519152908390a45050565b600754600090613aaa90600163ffffffff612c6816565b60008381526008602052604081205460078054939450909284908110613acc57fe5b906000526020600020015490508060078381548110613ae757fe5b60009182526020808320909101929092558281526008909152604090208290556007805490613b1a906000198301613ba9565b50505060009182525060086020526040812055565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10613b7057805160ff1916838001178555613b9d565b82800160010185558215613b9d579182015b82811115613b9d578251825591602001919060010190613b82565b506121a9929150613c0d565b81548183558181111561148557600083815260209020611485918101908301613c0d565b50805460018160011615610100020316600290046000825580601f10613bf35750611580565b601f01602090049060005260206000209081019061158091905b61104391905b808211156121a95760008155600101613c1356fe455243373231456e756d657261626c653a206f776e657220696e646578206f7574206f6620626f756e64734552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734552433732313a207472616e7366657220746f20746865207a65726f20616464726573734552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e4d696e746572526f6c653a2063616c6c657220646f6573206e6f74206861766520746865204d696e74657220726f6c65526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c65536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f774552433732313a20617070726f76656420717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732314d657461646174613a2055524920736574206f66206e6f6e6578697374656e7420746f6b656e526f6c65733a206163636f756e7420697320746865207a65726f20616464726573734552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776eddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564455243373231456e756d657261626c653a20676c6f62616c20696e646578206f7574206f6620626f756e64734552433732313a206275726e206f6620746f6b656e2074686174206973206e6f74206f776e4552433732314275726e61626c653a2063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564a165627a7a723058202be340baf6ab6dcebd69151f52f6264f9d0f202d4f7ae567514e09d65f22c29100294f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573738be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0526f6c65733a206163636f756e7420697320746865207a65726f2061646472657373',
        arguments: [ta,tb,Img,accounts[0],'0xD264b074c4a772E56536005Ae629518ee1bCc83a']        
        })
      .send({
      from: accounts[0],
      gas: 6241620,//9088550,
      //gasPrice:'10' //'1000000000'
    })
    .then(function(newContractInstance){
      console.log(newContractInstance.options.address) // instance with the new contract address
      localStorage.setItem('myData', newContractInstance.options.address);
    })
     
    

    //firebase get  value

    //var getaddress=localStorage.getItem('myaddress')

    
    }else if(tb==="ETH"){


      await lottery.deploy({
    
        data:'60806040523480156200001157600080fd5b506040516200474c3803806200474c833981018060405260a08110156200003757600080fd5b8101908080516401000000008111156200005057600080fd5b820160208101848111156200006457600080fd5b81516401000000008111828201871017156200007f57600080fd5b505092919060200180516401000000008111156200009c57600080fd5b82016020810184811115620000b057600080fd5b8151640100000000811182820187101715620000cb57600080fd5b50509291906020018051640100000000811115620000e857600080fd5b82016020810184811115620000fc57600080fd5b81516401000000008111828201871017156200011757600080fd5b505060208083015160409093015191945091925090859085908290829062000165907f01ffc9a70000000000000000000000000000000000000000000000000000000090620002c1811b901c565b6200017d6380ac58cd60e01b620002c160201b60201c565b6200019563780e9d6360e01b620002c160201b60201c565b8151620001aa90600990602085019062000679565b508051620001c090600a90602084019062000679565b50620001d9635b5e139f60e01b620002c160201b60201c565b50505050620001fd620001f16200039060201b60201c565b6200039560201b60201c565b6200020d6200039060201b60201c565b600f80546001600160a01b0319166001600160a01b0392831617908190556040519116906000906000805160206200470a833981519152908290a3601580546001600160a01b038084166001600160a01b031992831617909255601680549285169290911691909117905582516200028d90601490602086019062000679565b506000601355620002a581620003e7602090811b901c565b620002b6816200039560201b60201c565b50505050506200071b565b7fffffffff0000000000000000000000000000000000000000000000000000000080821614156200035357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b7fffffffff00000000000000000000000000000000000000000000000000000000166000908152602081905260409020805460ff19166001179055565b335b90565b620003b081600e6200047760201b620034a41790919060201c565b6040516001600160a01b038216907f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f690600090a250565b620003f76200051b60201b60201c565b6200046357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b62000474816200054a60201b60201c565b50565b620004898282620005f660201b60201c565b15620004f657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b600f546000906001600160a01b03166200053b62000390602090811b901c565b6001600160a01b031614905090565b6001600160a01b038116620005ab576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180620046e46026913960400191505060405180910390fd5b600f546040516001600160a01b038084169216906000805160206200470a83398151915290600090a3600f80546001600160a01b0319166001600160a01b0392909216919091179055565b60006001600160a01b03821662000659576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806200472a6022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620006bc57805160ff1916838001178555620006ec565b82800160010185558215620006ec579182015b82811115620006ec578251825591602001919060010190620006cf565b50620006fa929150620006fe565b5090565b6200039291905b80821115620006fa576000815560010162000705565b613fb9806200072b6000396000f3fe6080604052600436106102725760003560e01c80638f32d59b1161014f578063b5a99345116100c1578063d6dd3cc31161007a578063d6dd3cc314610d70578063dc8e92ea14610d9a578063e564da6914610e48578063e985e9c514610ef8578063f2fde38b14610f33578063fc885bf714610f6657610272565b8063b5a9934514610ad6578063b88d4fde14610aeb578063bfb231d214610bbc578063c87b56dd14610c81578063d4477b3c14610cab578063d50f15cf14610d5b57610272565b80639abc8320116101135780639abc8320146109f0578063a22cb46514610a05578063aa271e1a14610a40578063adecec2d14610a73578063af640d0f14610aac578063b4a99a4e14610ac157610272565b80638f32d59b146108b157806395d89b41146108c6578063983b2d56146108db57806398588a2b1461090e57806398650275146109db57610272565b8063446c33db116101e85780636352211e116101ac5780636352211e1461078a57806370a08231146107b4578063715018a6146107e757806380482491146107fc5780638462151c146108195780638da5cb5b1461089c57610272565b8063446c33db1461064457806345cefcec146106705780634f6ccce71461068557806350655d8c146106af57806350bb4e7f146106c457610272565b80631239ec8c1161023a5780631239ec8c146103f457806318160ddd1461053457806323b872dd1461055b5780632f745c591461059e57806342842e0e146105d757806342966c681461061a57610272565b806301ffc9a71461027757806306fdde03146102bf578063081812fc14610349578063095ea7b31461038f5780630bb78ec1146103ca575b600080fd5b34801561028357600080fd5b506102ab6004803603602081101561029a57600080fd5b50356001600160e01b031916610f90565b604080519115158252519081900360200190f35b3480156102cb57600080fd5b506102d4610faf565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561030e5781810151838201526020016102f6565b50505050905090810190601f16801561033b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561035557600080fd5b506103736004803603602081101561036c57600080fd5b5035611046565b604080516001600160a01b039092168252519081900360200190f35b34801561039b57600080fd5b506103c8600480360360408110156103b257600080fd5b506001600160a01b0381351690602001356110ab565b005b3480156103d657600080fd5b506102d4600480360360208110156103ed57600080fd5b50356111d9565b34801561040057600080fd5b506103c86004803603606081101561041757600080fd5b6001600160a01b038235169190810190604081016020820135600160201b81111561044157600080fd5b82018360208201111561045357600080fd5b803590602001918460208302840111600160201b8311171561047457600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b8111156104c357600080fd5b8201836020820111156104d557600080fd5b803590602001918460208302840111600160201b831117156104f657600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550611274945050505050565b34801561054057600080fd5b50610549611474565b60408051918252519081900360200190f35b34801561056757600080fd5b506103c86004803603606081101561057e57600080fd5b506001600160a01b0381358116916020810135909116906040013561147a565b3480156105aa57600080fd5b50610549600480360360408110156105c157600080fd5b506001600160a01b03813516906020013561148a565b3480156105e357600080fd5b506103c8600480360360608110156105fa57600080fd5b506001600160a01b0381358116916020810135909116906040013561150d565b34801561062657600080fd5b506103c86004803603602081101561063d57600080fd5b5035611528565b6103c86004803603604081101561065a57600080fd5b506001600160a01b038135169060200135611583565b34801561067c57600080fd5b506103c86116ad565b34801561069157600080fd5b50610549600480360360208110156106a857600080fd5b5035611740565b3480156106bb57600080fd5b506103736117a9565b3480156106d057600080fd5b506102ab600480360360608110156106e757600080fd5b6001600160a01b0382351691602081013591810190606081016040820135600160201b81111561071657600080fd5b82018360208201111561072857600080fd5b803590602001918460018302840111600160201b8311171561074957600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506117b8945050505050565b34801561079657600080fd5b50610373600480360360208110156107ad57600080fd5b50356117d8565b3480156107c057600080fd5b50610549600480360360208110156107d757600080fd5b50356001600160a01b031661182f565b3480156107f357600080fd5b506103c861189a565b6102ab6004803603602081101561081257600080fd5b5035611940565b34801561082557600080fd5b5061084c6004803603602081101561083c57600080fd5b50356001600160a01b0316611b96565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015610888578181015183820152602001610870565b505050509050019250505060405180910390f35b3480156108a857600080fd5b50610373611bf7565b3480156108bd57600080fd5b506102ab611c06565b3480156108d257600080fd5b506102d4611c2c565b3480156108e757600080fd5b506103c8600480360360208110156108fe57600080fd5b50356001600160a01b0316611c8d565b34801561091a57600080fd5b506103c8600480360360a081101561093157600080fd5b6001600160a01b0382351691602081013591810190606081016040820135600160201b81111561096057600080fd5b82018360208201111561097257600080fd5b803590602001918460018302840111600160201b8311171561099357600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955050823593505050602001351515611ce4565b3480156109e757600080fd5b506103c8611ed4565b3480156109fc57600080fd5b506102d4611ee6565b348015610a1157600080fd5b506103c860048036036040811015610a2857600080fd5b506001600160a01b0381351690602001351515611f41565b348015610a4c57600080fd5b506102ab60048036036020811015610a6357600080fd5b50356001600160a01b0316612049565b348015610a7f57600080fd5b506102d460048036036040811015610a9657600080fd5b506001600160a01b03813516906020013561205c565b348015610ab857600080fd5b506105496120dd565b348015610acd57600080fd5b506103736120e3565b348015610ae257600080fd5b506102d46120f2565b348015610af757600080fd5b506103c860048036036080811015610b0e57600080fd5b6001600160a01b03823581169260208101359091169160408201359190810190608081016060820135600160201b811115610b4857600080fd5b820183602082011115610b5a57600080fd5b803590602001918460018302840111600160201b83111715610b7b57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506121ad945050505050565b348015610bc857600080fd5b50610be660048036036020811015610bdf57600080fd5b503561220e565b6040518085815260200184815260200180602001836003811115610c0657fe5b60ff168152602001828103825284818151815260200191508051906020019080838360005b83811015610c43578181015183820152602001610c2b565b50505050905090810190601f168015610c705780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b348015610c8d57600080fd5b506102d460048036036020811015610ca457600080fd5b50356122c0565b348015610cb757600080fd5b506103c860048036036040811015610cce57600080fd5b810190602081018135600160201b811115610ce857600080fd5b820183602082011115610cfa57600080fd5b803590602001918460208302840111600160201b83111715610d1b57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550505050351515905061240e565b348015610d6757600080fd5b5061084c612632565b348015610d7c57600080fd5b5061054960048036036020811015610d9357600080fd5b5035612743565b348015610da657600080fd5b506103c860048036036020811015610dbd57600080fd5b810190602081018135600160201b811115610dd757600080fd5b820183602082011115610de957600080fd5b803590602001918460208302840111600160201b83111715610e0a57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550612761945050505050565b348015610e5457600080fd5b506103c860048036036040811015610e6b57600080fd5b810190602081018135600160201b811115610e8557600080fd5b820183602082011115610e9757600080fd5b803590602001918460208302840111600160201b83111715610eb857600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295505091359250612902915050565b348015610f0457600080fd5b506102ab60048036036040811015610f1b57600080fd5b506001600160a01b0381358116916020013516612992565b348015610f3f57600080fd5b506103c860048036036020811015610f5657600080fd5b50356001600160a01b03166129c0565b348015610f7257600080fd5b506102ab60048036036020811015610f8957600080fd5b5035612a25565b6001600160e01b03191660009081526020819052604090205460ff1690565b60098054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561103b5780601f106110105761010080835404028352916020019161103b565b820191906000526020600020905b81548152906001019060200180831161101e57829003601f168201915b505050505090505b90565b600061105182612a3a565b61108f57604051600160e51b62461bcd02815260040180806020018281038252602c815260200180613df8602c913960400191505060405180910390fd5b506000908152600260205260409020546001600160a01b031690565b60006110b6826117d8565b9050806001600160a01b0316836001600160a01b0316141561110c57604051600160e51b62461bcd028152600401808060200182810382526021815260200180613ebb6021913960400191505060405180910390fd5b806001600160a01b031661111e612a57565b6001600160a01b0316148061113f575061113f8161113a612a57565b612992565b61117d57604051600160e51b62461bcd028152600401808060200182810382526038815260200180613cfb6038913960400191505060405180910390fd5b60008281526002602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b600d6020908152600091825260409182902080548351601f60026000196101006001861615020190931692909204918201849004840281018401909452808452909183018282801561126c5780601f106112415761010080835404028352916020019161126c565b820191906000526020600020905b81548152906001019060200180831161124f57829003601f168201915b505050505081565b60005b8151811015611304576112b18484838151811061129057fe5b60200260200101518484815181106112a457fe5b602002602001015161147a565b6003601260008484815181106112c357fe5b6020026020010151815260200190815260200160002060030160006101000a81548160ff021916908360038111156112f757fe5b0217905550600101611277565b507fe0bdff057bc74b2545c13ac89393038d336f254b2245c876efa9669ddcc09b97601260008360008151811061133757fe5b602002602001015181526020019081526020016000206002018383604051808060200180602001806020018481038452878181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156113e35780601f106113b8576101008083540402835291602001916113e3565b820191906000526020600020905b8154815290600101906020018083116113c657829003601f168201915b50508481038352865181528651602091820191808901910280838360005b83811015611419578181015183820152602001611401565b50505050905001848103825285818151815260200191508051906020019060200280838360005b83811015611458578181015183820152602001611440565b50505050905001965050505050505060405180910390a1505050565b60075490565b611485838383612a5b565b505050565b60006114958361182f565b82106114d557604051600160e51b62461bcd02815260040180806020018281038252602b815260200180613c28602b913960400191505060405180910390fd5b6001600160a01b03831660009081526005602052604090208054839081106114f957fe5b906000526020600020015490505b92915050565b611485838383604051806020016040528060008152506121ad565b611539611533612a57565b82612a7a565b61157757604051600160e51b62461bcd028152600401808060200182810382526030815260200180613f5e6030913960400191505060405180910390fd5b61158081612b21565b50565b61158e611533612a57565b6115cc57604051600160e51b62461bcd028152600401808060200182810382526031815260200180613edc6031913960400191505060405180910390fd5b3361160b57604051600160e51b62461bcd028152600401808060200182810382526024815260200180613cab6024913960400191505060405180910390fd5b6000818152600160205260409020546001600160a01b031661162c82612b33565b6001600160a01b038116600090815260036020526040902061164d90612b6e565b33600090815260036020526040902061166590612b85565b60008281526001602052604080822080546001600160a01b03191633908117909155905184926001600160a01b03851691600080516020613e9b8339815191529190a4505050565b6116b5611c06565b6117095760408051600160e51b62461bcd02815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6040517ff58fef8e187ef8dfd7bef096c1ef3e4f3c54f98d95b8ad5659349b07e61204df90600090a16015546001600160a01b0316ff5b600061174a611474565b821061178a57604051600160e51b62461bcd02815260040180806020018281038252602c815260200180613f0d602c913960400191505060405180910390fd5b6007828154811061179757fe5b90600052602060002001549050919050565b6015546001600160a01b031681565b60006117c48484612b8e565b6117ce8383612baf565b5060019392505050565b6000818152600160205260408120546001600160a01b03168061150757604051600160e51b62461bcd028152600401808060200182810382526029815260200180613d5d6029913960400191505060405180910390fd5b60006001600160a01b03821661187957604051600160e51b62461bcd02815260040180806020018281038252602a815260200180613d33602a913960400191505060405180910390fd5b6001600160a01b038216600090815260036020526040902061150790612c49565b6118a2611c06565b6118f65760408051600160e51b62461bcd02815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600f546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600f80546001600160a01b0319169055565b60008181526012602052604081206001015434101561199a5760408051600160e51b62461bcd02815260206004820152600b6024820152600160a81b6a507269636520697373756502604482015290519081900360640190fd5b600082815260126020526040902060039081015460ff16908111156119bb57fe5b6001146119ff5760408051600160e51b62461bcd0281526020600482015260076024820152600160c81b664e6f2053616c6502604482015290519081900360640190fd5b60008281526012602052611a1234612c4d565b90506000611a203483612c68565b6015546040519192506001600160a01b03169082156108fc029083906000818181858888f19350505050158015611a5b573d6000803e3d6000fd5b506016546040516001600160a01b039091169083156108fc029084906000818181858888f19350505050158015611a96573d6000803e3d6000fd5b505050601554611ab0906001600160a01b03163384612a5b565b60008281526012602090815260409182902060038101805460ff19166002908117909155835186815234948101859052606093810184815292820180546001811615610100026000190116929092049381018490527f46e70e87b058d8f3cde334fc179a61ac8acadcc4fdc26735e4195106b3c88eb394879492939092608083019085908015611b815780601f10611b5657610100808354040283529160200191611b81565b820191906000526020600020905b815481529060010190602001808311611b6457829003601f168201915b505094505050505060405180910390a1919050565b6060611ba182612caa565b805480602002602001604051908101604052809291908181526020018280548015611beb57602002820191906000526020600020905b815481526020019060010190808311611bd7575b50505050509050919050565b600f546001600160a01b031690565b600f546000906001600160a01b0316611c1d612a57565b6001600160a01b031614905090565b600a8054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561103b5780601f106110105761010080835404028352916020019161103b565b611c9d611c98612a57565b612049565b611cdb57604051600160e51b62461bcd028152600401808060200182810382526030815260200180613d866030913960400191505060405180910390fd5b61158081612cc4565b611cef611c98612a57565b611d2d57604051600160e51b62461bcd028152600401808060200182810382526030815260200180613d866030913960400191505060405180910390fd5b6028841115611d735760408051600160e51b62461bcd0281526020600482015260076024820152600160cc1b6604f7665722034302604482015290519081900360640190fd5b60005b84811015611ecc57601354611d9290600163ffffffff612d0c16565b601381815560009182526012602090815260408084206001018790559154835291208551611dc892600290920191870190613b2f565b5060018215151415611df8576013546000908152601260205260409020600301805460ff19166001179055611e15565b6013546000908152601260205260409020600301805460ff191690555b611e2186601354612b8e565b7fadef11a3979b8ceb0573eb6ef0678134a09c23a0d94e5ea47cd18ac3a9fc0194601354856040518083815260200180602001828103825283818151815260200191508051906020019080838360005b83811015611e89578181015183820152602001611e71565b50505050905090810190601f168015611eb65780820380516001836020036101000a031916815260200191505b50935050505060405180910390a1600101611d76565b505050505050565b611ee4611edf612a57565b612d69565b565b6014805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561126c5780601f106112415761010080835404028352916020019161126c565b611f49612a57565b6001600160a01b0316826001600160a01b03161415611fb25760408051600160e51b62461bcd02815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015290519081900360640190fd5b8060046000611fbf612a57565b6001600160a01b03908116825260208083019390935260409182016000908120918716808252919093529120805460ff191692151592909217909155612003612a57565b60408051841515815290516001600160a01b0392909216917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319181900360200190a35050565b6000611507600e8363ffffffff612db116565b6011602052816000526040600020818154811061207557fe5b600091825260209182902001805460408051601f6002600019610100600187161502019094169390930492830185900485028101850190915281815294509092509083018282801561126c5780601f106112415761010080835404028352916020019161126c565b60135481565b6017546001600160a01b031681565b606060005b6103e88110156121a9576000818152600d602090815260409182902080548351601f60026000196101006001861615020190931692909204918201849004840281018401909452808452606093928301828280156121965780601f1061216b57610100808354040283529160200191612196565b820191906000526020600020905b81548152906001019060200180831161217957829003601f168201915b5050600190950194506120f79350505050565b5090565b6121be6121b8612a57565b83612a7a565b6121fc57604051600160e51b62461bcd028152600401808060200182810382526031815260200180613edc6031913960400191505060405180910390fd5b61220884848484612e1b565b50505050565b60126020908152600091825260409182902080546001808301546002808501805488519481161561010002600019011691909104601f8101879004870284018701909752868352929590949192918301828280156122ad5780601f10612282576101008083540402835291602001916122ad565b820191906000526020600020905b81548152906001019060200180831161229057829003601f168201915b5050506003909301549192505060ff1684565b6000818152600d60209081526040918290208054835160026001831615610100026000190190921691909104601f810184900484028201840190945283815260609384939192918301828280156123585780601f1061232d57610100808354040283529160200191612358565b820191906000526020600020905b81548152906001019060200180831161233b57829003601f168201915b5050506000868152601260209081526040918290206002908101805484516001821615610100026000190190911692909204601f81018490048402830184019094528382529596506124079587955090935091908301828280156123fd5780601f106123d2576101008083540402835291602001916123fd565b820191906000526020600020905b8154815290600101906020018083116123e057829003601f168201915b5050505050612e70565b9392505050565b612419611c98612a57565b61245757604051600160e51b62461bcd028152600401808060200182810382526030815260200180613d866030913960400191505060405180910390fd5b60005b825181101561251257600182151514156124be5760016012600085848151811061248057fe5b6020026020010151815260200190815260200160002060030160006101000a81548160ff021916908360038111156124b457fe5b021790555061250a565b6000601260008584815181106124d057fe5b6020026020010151815260200190815260200160002060030160006101000a81548160ff0219169083600381111561250457fe5b02179055505b60010161245a565b507fefd56044628f374cec68c952a0580a76d23b4bd06d17bb887193f2176ba6c48b82601260008560008151811061254657fe5b60200260200101518152602001908152602001600020600201604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b838110156125a357818101518382015260200161258b565b50505050919091018481038352855460026000196101006001841615020190911604808252602090910191508590801561261e5780601f106125f35761010080835404028352916020019161261e565b820191906000526020600020905b81548152906001019060200180831161260157829003601f168201915b505094505050505060405180910390a15050565b60608061263e33611b96565b905060005b815181101561273e5760016012600084848151811061265e57fe5b6020026020010151815260200190815260200160002060030160009054906101000a900460ff16600381111561269057fe5b141561273657601960008383815181106126a657fe5b60209081029190910181015182528101919091526040016000205460ff166127365760188282815181106126d657fe5b602090810291909101810151825460018181018555600094855292842001558351909160199185908590811061270857fe5b6020026020010151815260200190815260200160002060006101000a81548160ff0219169083151502179055505b600101612643565b505090565b6018818154811061275057fe5b600091825260209091200154905081565b61276c611c98612a57565b6127aa57604051600160e51b62461bcd028152600401808060200182810382526030815260200180613d866030913960400191505060405180910390fd5b60005b81518110156127da576127d28282815181106127c557fe5b6020026020010151612b21565b6001016127ad565b507f68f2536b9ff968bd2acc006b7cf7be7ca83c2f4a462c355e925bb354e5ce43d5601260008360008151811061280d57fe5b60200260200101518152602001908152602001600020600201826040518080602001806020018381038352858181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156128b45780601f10612889576101008083540402835291602001916128b4565b820191906000526020600020905b81548152906001019060200180831161289757829003601f168201915b50508381038252845181528451602091820191808701910280838360005b838110156128ea5781810151838201526020016128d2565b5050505090500194505050505060405180910390a150565b61290d611c98612a57565b61294b57604051600160e51b62461bcd028152600401808060200182810382526030815260200180613d866030913960400191505060405180910390fd5b60005b825181101561148557816012600085848151811061296857fe5b6020026020010151815260200190815260200160002060010181905550808060010191505061294e565b6001600160a01b03918216600090815260046020908152604080832093909416825291909152205460ff1690565b6129c8611c06565b612a1c5760408051600160e51b62461bcd02815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b61158081612eac565b60196020526000908152604090205460ff1681565b6000908152600160205260409020546001600160a01b0316151590565b3390565b612a66838383612f50565b612a708382613088565b611485828261317d565b6000612a8582612a3a565b612ac357604051600160e51b62461bcd02815260040180806020018281038252602c815260200180613ccf602c913960400191505060405180910390fd5b6000612ace836117d8565b9050806001600160a01b0316846001600160a01b03161480612b095750836001600160a01b0316612afe84611046565b6001600160a01b0316145b80612b195750612b198185612992565b949350505050565b611580612b2d826117d8565b826131bb565b6000818152600260205260409020546001600160a01b03161561158057600090815260026020526040902080546001600160a01b0319169055565b8054612b8190600163ffffffff612c6816565b9055565b80546001019055565b612b988282613203565b612ba2828261317d565b612bab81613328565b5050565b612bb882612a3a565b612bf657604051600160e51b62461bcd02815260040180806020018281038252602c815260200180613e24602c913960400191505060405180910390fd5b8051612c0990600b906020840190613b2f565b506000828152600d602090815260409091208251612c2992840190613b2f565b506000828152600c60209081526040909120825161148592840190613b2f565b5490565b600080612c5b83600261336c565b90506124078160646133c8565b600061240783836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525061340a565b6001600160a01b0316600090815260056020526040902090565b612cd5600e8263ffffffff6134a416565b6040516001600160a01b038216907f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f690600090a250565b6000828201838110156124075760408051600160e51b62461bcd02815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b612d7a600e8263ffffffff61352816565b6040516001600160a01b038216907fe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb6669290600090a250565b60006001600160a01b038216612dfb57604051600160e51b62461bcd028152600401808060200182810382526022815260200180613e506022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b612e26848484612a5b565b612e3284848484613592565b61220857604051600160e51b62461bcd028152600401808060200182810382526032815260200180613c536032913960400191505060405180910390fd5b606061240783836040518060200160405280600081525060405180602001604052806000815250604051806020016040528060008152506136ec565b6001600160a01b038116612ef457604051600160e51b62461bcd028152600401808060200182810382526026815260200180613c856026913960400191505060405180910390fd5b600f546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600f80546001600160a01b0319166001600160a01b0392909216919091179055565b826001600160a01b0316612f63826117d8565b6001600160a01b031614612fab57604051600160e51b62461bcd028152600401808060200182810382526029815260200180613e726029913960400191505060405180910390fd5b6001600160a01b038216612ff357604051600160e51b62461bcd028152600401808060200182810382526024815260200180613cab6024913960400191505060405180910390fd5b612ffc81612b33565b6001600160a01b038316600090815260036020526040902061301d90612b6e565b6001600160a01b038216600090815260036020526040902061303e90612b85565b60008181526001602052604080822080546001600160a01b0319166001600160a01b038681169182179092559151849391871691600080516020613e9b83398151915291a4505050565b6001600160a01b0382166000908152600560205260408120546130b290600163ffffffff612c6816565b60008381526006602052604090205490915080821461314d576001600160a01b03841660009081526005602052604081208054849081106130ef57fe5b906000526020600020015490508060056000876001600160a01b03166001600160a01b03168152602001908152602001600020838154811061312d57fe5b600091825260208083209091019290925591825260069052604090208190555b6001600160a01b0384166000908152600560205260409020805490613176906000198301613ba9565b5050505050565b6001600160a01b0390911660009081526005602081815260408084208054868652600684529185208290559282526001810183559183529091200155565b6131c58282613900565b6000818152600d60205260409020546002600019610100600184161502019091160415612bab576000818152600d60205260408120612bab91613bcd565b6001600160a01b0382166132615760408051600160e51b62461bcd02815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015290519081900360640190fd5b61326a81612a3a565b156132bf5760408051600160e51b62461bcd02815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015290519081900360640190fd5b600081815260016020908152604080832080546001600160a01b0319166001600160a01b0387169081179091558352600390915290206132fe90612b85565b60405181906001600160a01b03841690600090600080516020613e9b833981519152908290a45050565b600780546000838152600860205260408120829055600182018355919091527fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c6880155565b60008261337b57506000611507565b8282028284828161338857fe5b041461240757604051600160e51b62461bcd028152600401808060200182810382526021815260200180613dd76021913960400191505060405180910390fd5b600061240783836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f00000000000081525061392c565b6000818484111561349c57604051600160e51b62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360005b83811015613461578181015183820152602001613449565b50505050905090810190601f16801561348e5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6134ae8282612db1565b156135035760408051600160e51b62461bcd02815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b6135328282612db1565b61357057604051600160e51b62461bcd028152600401808060200182810382526021815260200180613db66021913960400191505060405180910390fd5b6001600160a01b0316600090815260209190915260409020805460ff19169055565b60006135a6846001600160a01b0316613994565b6135b257506001612b19565b6000846001600160a01b031663150b7a026135cb612a57565b8887876040518563ffffffff1660e01b815260040180856001600160a01b03166001600160a01b03168152602001846001600160a01b03166001600160a01b0316815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015613650578181015183820152602001613638565b50505050905090810190601f16801561367d5780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b15801561369f57600080fd5b505af11580156136b3573d6000803e3d6000fd5b505050506040513d60208110156136c957600080fd5b50516001600160e01b031916600160e11b630a85bd010214915050949350505050565b6060808690506060869050606086905060608690506060869050606081518351855187518951010101016040519080825280601f01601f191660200182016040528015613740576020820181803883390190505b509050806000805b88518110156137995788818151811061375d57fe5b602001015160f81c60f81b83838060010194508151811061377a57fe5b60200101906001600160f81b031916908160001a905350600101613748565b5060005b87518110156137ee578781815181106137b257fe5b602001015160f81c60f81b8383806001019450815181106137cf57fe5b60200101906001600160f81b031916908160001a90535060010161379d565b5060005b86518110156138435786818151811061380757fe5b602001015160f81c60f81b83838060010194508151811061382457fe5b60200101906001600160f81b031916908160001a9053506001016137f2565b5060005b85518110156138985785818151811061385c57fe5b602001015160f81c60f81b83838060010194508151811061387957fe5b60200101906001600160f81b031916908160001a905350600101613847565b5060005b84518110156138ed578481815181106138b157fe5b602001015160f81c60f81b8383806001019450815181106138ce57fe5b60200101906001600160f81b031916908160001a90535060010161389c565b50909d9c50505050505050505050505050565b61390a82826139cb565b6139148282613088565b600081815260066020526040812055612bab81613a93565b6000818361397e57604051600160e51b62461bcd028152602060048201818152835160248401528351909283926044909101919085019080838360008315613461578181015183820152602001613449565b50600083858161398a57fe5b0495945050505050565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4708115801590612b195750141592915050565b816001600160a01b03166139de826117d8565b6001600160a01b031614613a2657604051600160e51b62461bcd028152600401808060200182810382526025815260200180613f396025913960400191505060405180910390fd5b613a2f81612b33565b6001600160a01b0382166000908152600360205260409020613a5090612b6e565b60008181526001602052604080822080546001600160a01b0319169055518291906001600160a01b03851690600080516020613e9b833981519152908390a45050565b600754600090613aaa90600163ffffffff612c6816565b60008381526008602052604081205460078054939450909284908110613acc57fe5b906000526020600020015490508060078381548110613ae757fe5b60009182526020808320909101929092558281526008909152604090208290556007805490613b1a906000198301613ba9565b50505060009182525060086020526040812055565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10613b7057805160ff1916838001178555613b9d565b82800160010185558215613b9d579182015b82811115613b9d578251825591602001919060010190613b82565b506121a9929150613c0d565b81548183558181111561148557600083815260209020611485918101908301613c0d565b50805460018160011615610100020316600290046000825580601f10613bf35750611580565b601f01602090049060005260206000209081019061158091905b61104391905b808211156121a95760008155600101613c1356fe455243373231456e756d657261626c653a206f776e657220696e646578206f7574206f6620626f756e64734552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734552433732313a207472616e7366657220746f20746865207a65726f20616464726573734552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e4d696e746572526f6c653a2063616c6c657220646f6573206e6f74206861766520746865204d696e74657220726f6c65526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c65536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f774552433732313a20617070726f76656420717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732314d657461646174613a2055524920736574206f66206e6f6e6578697374656e7420746f6b656e526f6c65733a206163636f756e7420697320746865207a65726f20616464726573734552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776eddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564455243373231456e756d657261626c653a20676c6f62616c20696e646578206f7574206f6620626f756e64734552433732313a206275726e206f6620746f6b656e2074686174206973206e6f74206f776e4552433732314275726e61626c653a2063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564a165627a7a723058202be340baf6ab6dcebd69151f52f6264f9d0f202d4f7ae567514e09d65f22c29100294f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573738be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0526f6c65733a206163636f756e7420697320746865207a65726f2061646472657373',
        arguments: [ta,tb,Img,accounts[0],'0xD264b074c4a772E56536005Ae629518ee1bCc83a']        
        })
      .send({
      from: accounts[0],
      gas: 9088550,
      gasPrice:1000000000
    })
    .then(function(newContractInstance){
      console.log(newContractInstance.options.address) // instance with the new contract address
      localStorage.setItem('myData', newContractInstance.options.address);
    })
     
     //address=  localStorage.getItem('myData');

    //firebase get  value

    //var getaddress=localStorage.getItem('myaddress')

    }
    else if(tb === "Maticmum"){

      alert("Maticmum");

        alert("acc"+accounts[0]);

      await lottery.deploy({
    
        data:'60806040523480156200001157600080fd5b506040516200474c3803806200474c833981018060405260a08110156200003757600080fd5b8101908080516401000000008111156200005057600080fd5b820160208101848111156200006457600080fd5b81516401000000008111828201871017156200007f57600080fd5b505092919060200180516401000000008111156200009c57600080fd5b82016020810184811115620000b057600080fd5b8151640100000000811182820187101715620000cb57600080fd5b50509291906020018051640100000000811115620000e857600080fd5b82016020810184811115620000fc57600080fd5b81516401000000008111828201871017156200011757600080fd5b505060208083015160409093015191945091925090859085908290829062000165907f01ffc9a70000000000000000000000000000000000000000000000000000000090620002c1811b901c565b6200017d6380ac58cd60e01b620002c160201b60201c565b6200019563780e9d6360e01b620002c160201b60201c565b8151620001aa90600990602085019062000679565b508051620001c090600a90602084019062000679565b50620001d9635b5e139f60e01b620002c160201b60201c565b50505050620001fd620001f16200039060201b60201c565b6200039560201b60201c565b6200020d6200039060201b60201c565b600f80546001600160a01b0319166001600160a01b0392831617908190556040519116906000906000805160206200470a833981519152908290a3601580546001600160a01b038084166001600160a01b031992831617909255601680549285169290911691909117905582516200028d90601490602086019062000679565b506000601355620002a581620003e7602090811b901c565b620002b6816200039560201b60201c565b50505050506200071b565b7fffffffff0000000000000000000000000000000000000000000000000000000080821614156200035357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b7fffffffff00000000000000000000000000000000000000000000000000000000166000908152602081905260409020805460ff19166001179055565b335b90565b620003b081600e6200047760201b620034a41790919060201c565b6040516001600160a01b038216907f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f690600090a250565b620003f76200051b60201b60201c565b6200046357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b62000474816200054a60201b60201c565b50565b620004898282620005f660201b60201c565b15620004f657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b600f546000906001600160a01b03166200053b62000390602090811b901c565b6001600160a01b031614905090565b6001600160a01b038116620005ab576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180620046e46026913960400191505060405180910390fd5b600f546040516001600160a01b038084169216906000805160206200470a83398151915290600090a3600f80546001600160a01b0319166001600160a01b0392909216919091179055565b60006001600160a01b03821662000659576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806200472a6022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620006bc57805160ff1916838001178555620006ec565b82800160010185558215620006ec579182015b82811115620006ec578251825591602001919060010190620006cf565b50620006fa929150620006fe565b5090565b6200039291905b80821115620006fa576000815560010162000705565b613fb9806200072b6000396000f3fe6080604052600436106102725760003560e01c80638f32d59b1161014f578063b5a99345116100c1578063d6dd3cc31161007a578063d6dd3cc314610d70578063dc8e92ea14610d9a578063e564da6914610e48578063e985e9c514610ef8578063f2fde38b14610f33578063fc885bf714610f6657610272565b8063b5a9934514610ad6578063b88d4fde14610aeb578063bfb231d214610bbc578063c87b56dd14610c81578063d4477b3c14610cab578063d50f15cf14610d5b57610272565b80639abc8320116101135780639abc8320146109f0578063a22cb46514610a05578063aa271e1a14610a40578063adecec2d14610a73578063af640d0f14610aac578063b4a99a4e14610ac157610272565b80638f32d59b146108b157806395d89b41146108c6578063983b2d56146108db57806398588a2b1461090e57806398650275146109db57610272565b8063446c33db116101e85780636352211e116101ac5780636352211e1461078a57806370a08231146107b4578063715018a6146107e757806380482491146107fc5780638462151c146108195780638da5cb5b1461089c57610272565b8063446c33db1461064457806345cefcec146106705780634f6ccce71461068557806350655d8c146106af57806350bb4e7f146106c457610272565b80631239ec8c1161023a5780631239ec8c146103f457806318160ddd1461053457806323b872dd1461055b5780632f745c591461059e57806342842e0e146105d757806342966c681461061a57610272565b806301ffc9a71461027757806306fdde03146102bf578063081812fc14610349578063095ea7b31461038f5780630bb78ec1146103ca575b600080fd5b34801561028357600080fd5b506102ab6004803603602081101561029a57600080fd5b50356001600160e01b031916610f90565b604080519115158252519081900360200190f35b3480156102cb57600080fd5b506102d4610faf565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561030e5781810151838201526020016102f6565b50505050905090810190601f16801561033b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561035557600080fd5b506103736004803603602081101561036c57600080fd5b5035611046565b604080516001600160a01b039092168252519081900360200190f35b34801561039b57600080fd5b506103c8600480360360408110156103b257600080fd5b506001600160a01b0381351690602001356110ab565b005b3480156103d657600080fd5b506102d4600480360360208110156103ed57600080fd5b50356111d9565b34801561040057600080fd5b506103c86004803603606081101561041757600080fd5b6001600160a01b038235169190810190604081016020820135600160201b81111561044157600080fd5b82018360208201111561045357600080fd5b803590602001918460208302840111600160201b8311171561047457600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b8111156104c357600080fd5b8201836020820111156104d557600080fd5b803590602001918460208302840111600160201b831117156104f657600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550611274945050505050565b34801561054057600080fd5b50610549611474565b60408051918252519081900360200190f35b34801561056757600080fd5b506103c86004803603606081101561057e57600080fd5b506001600160a01b0381358116916020810135909116906040013561147a565b3480156105aa57600080fd5b50610549600480360360408110156105c157600080fd5b506001600160a01b03813516906020013561148a565b3480156105e357600080fd5b506103c8600480360360608110156105fa57600080fd5b506001600160a01b0381358116916020810135909116906040013561150d565b34801561062657600080fd5b506103c86004803603602081101561063d57600080fd5b5035611528565b6103c86004803603604081101561065a57600080fd5b506001600160a01b038135169060200135611583565b34801561067c57600080fd5b506103c86116ad565b34801561069157600080fd5b50610549600480360360208110156106a857600080fd5b5035611740565b3480156106bb57600080fd5b506103736117a9565b3480156106d057600080fd5b506102ab600480360360608110156106e757600080fd5b6001600160a01b0382351691602081013591810190606081016040820135600160201b81111561071657600080fd5b82018360208201111561072857600080fd5b803590602001918460018302840111600160201b8311171561074957600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506117b8945050505050565b34801561079657600080fd5b50610373600480360360208110156107ad57600080fd5b50356117d8565b3480156107c057600080fd5b50610549600480360360208110156107d757600080fd5b50356001600160a01b031661182f565b3480156107f357600080fd5b506103c861189a565b6102ab6004803603602081101561081257600080fd5b5035611940565b34801561082557600080fd5b5061084c6004803603602081101561083c57600080fd5b50356001600160a01b0316611b96565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015610888578181015183820152602001610870565b505050509050019250505060405180910390f35b3480156108a857600080fd5b50610373611bf7565b3480156108bd57600080fd5b506102ab611c06565b3480156108d257600080fd5b506102d4611c2c565b3480156108e757600080fd5b506103c8600480360360208110156108fe57600080fd5b50356001600160a01b0316611c8d565b34801561091a57600080fd5b506103c8600480360360a081101561093157600080fd5b6001600160a01b0382351691602081013591810190606081016040820135600160201b81111561096057600080fd5b82018360208201111561097257600080fd5b803590602001918460018302840111600160201b8311171561099357600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955050823593505050602001351515611ce4565b3480156109e757600080fd5b506103c8611ed4565b3480156109fc57600080fd5b506102d4611ee6565b348015610a1157600080fd5b506103c860048036036040811015610a2857600080fd5b506001600160a01b0381351690602001351515611f41565b348015610a4c57600080fd5b506102ab60048036036020811015610a6357600080fd5b50356001600160a01b0316612049565b348015610a7f57600080fd5b506102d460048036036040811015610a9657600080fd5b506001600160a01b03813516906020013561205c565b348015610ab857600080fd5b506105496120dd565b348015610acd57600080fd5b506103736120e3565b348015610ae257600080fd5b506102d46120f2565b348015610af757600080fd5b506103c860048036036080811015610b0e57600080fd5b6001600160a01b03823581169260208101359091169160408201359190810190608081016060820135600160201b811115610b4857600080fd5b820183602082011115610b5a57600080fd5b803590602001918460018302840111600160201b83111715610b7b57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506121ad945050505050565b348015610bc857600080fd5b50610be660048036036020811015610bdf57600080fd5b503561220e565b6040518085815260200184815260200180602001836003811115610c0657fe5b60ff168152602001828103825284818151815260200191508051906020019080838360005b83811015610c43578181015183820152602001610c2b565b50505050905090810190601f168015610c705780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b348015610c8d57600080fd5b506102d460048036036020811015610ca457600080fd5b50356122c0565b348015610cb757600080fd5b506103c860048036036040811015610cce57600080fd5b810190602081018135600160201b811115610ce857600080fd5b820183602082011115610cfa57600080fd5b803590602001918460208302840111600160201b83111715610d1b57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550505050351515905061240e565b348015610d6757600080fd5b5061084c612632565b348015610d7c57600080fd5b5061054960048036036020811015610d9357600080fd5b5035612743565b348015610da657600080fd5b506103c860048036036020811015610dbd57600080fd5b810190602081018135600160201b811115610dd757600080fd5b820183602082011115610de957600080fd5b803590602001918460208302840111600160201b83111715610e0a57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550612761945050505050565b348015610e5457600080fd5b506103c860048036036040811015610e6b57600080fd5b810190602081018135600160201b811115610e8557600080fd5b820183602082011115610e9757600080fd5b803590602001918460208302840111600160201b83111715610eb857600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295505091359250612902915050565b348015610f0457600080fd5b506102ab60048036036040811015610f1b57600080fd5b506001600160a01b0381358116916020013516612992565b348015610f3f57600080fd5b506103c860048036036020811015610f5657600080fd5b50356001600160a01b03166129c0565b348015610f7257600080fd5b506102ab60048036036020811015610f8957600080fd5b5035612a25565b6001600160e01b03191660009081526020819052604090205460ff1690565b60098054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561103b5780601f106110105761010080835404028352916020019161103b565b820191906000526020600020905b81548152906001019060200180831161101e57829003601f168201915b505050505090505b90565b600061105182612a3a565b61108f57604051600160e51b62461bcd02815260040180806020018281038252602c815260200180613df8602c913960400191505060405180910390fd5b506000908152600260205260409020546001600160a01b031690565b60006110b6826117d8565b9050806001600160a01b0316836001600160a01b0316141561110c57604051600160e51b62461bcd028152600401808060200182810382526021815260200180613ebb6021913960400191505060405180910390fd5b806001600160a01b031661111e612a57565b6001600160a01b0316148061113f575061113f8161113a612a57565b612992565b61117d57604051600160e51b62461bcd028152600401808060200182810382526038815260200180613cfb6038913960400191505060405180910390fd5b60008281526002602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b600d6020908152600091825260409182902080548351601f60026000196101006001861615020190931692909204918201849004840281018401909452808452909183018282801561126c5780601f106112415761010080835404028352916020019161126c565b820191906000526020600020905b81548152906001019060200180831161124f57829003601f168201915b505050505081565b60005b8151811015611304576112b18484838151811061129057fe5b60200260200101518484815181106112a457fe5b602002602001015161147a565b6003601260008484815181106112c357fe5b6020026020010151815260200190815260200160002060030160006101000a81548160ff021916908360038111156112f757fe5b0217905550600101611277565b507fe0bdff057bc74b2545c13ac89393038d336f254b2245c876efa9669ddcc09b97601260008360008151811061133757fe5b602002602001015181526020019081526020016000206002018383604051808060200180602001806020018481038452878181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156113e35780601f106113b8576101008083540402835291602001916113e3565b820191906000526020600020905b8154815290600101906020018083116113c657829003601f168201915b50508481038352865181528651602091820191808901910280838360005b83811015611419578181015183820152602001611401565b50505050905001848103825285818151815260200191508051906020019060200280838360005b83811015611458578181015183820152602001611440565b50505050905001965050505050505060405180910390a1505050565b60075490565b611485838383612a5b565b505050565b60006114958361182f565b82106114d557604051600160e51b62461bcd02815260040180806020018281038252602b815260200180613c28602b913960400191505060405180910390fd5b6001600160a01b03831660009081526005602052604090208054839081106114f957fe5b906000526020600020015490505b92915050565b611485838383604051806020016040528060008152506121ad565b611539611533612a57565b82612a7a565b61157757604051600160e51b62461bcd028152600401808060200182810382526030815260200180613f5e6030913960400191505060405180910390fd5b61158081612b21565b50565b61158e611533612a57565b6115cc57604051600160e51b62461bcd028152600401808060200182810382526031815260200180613edc6031913960400191505060405180910390fd5b3361160b57604051600160e51b62461bcd028152600401808060200182810382526024815260200180613cab6024913960400191505060405180910390fd5b6000818152600160205260409020546001600160a01b031661162c82612b33565b6001600160a01b038116600090815260036020526040902061164d90612b6e565b33600090815260036020526040902061166590612b85565b60008281526001602052604080822080546001600160a01b03191633908117909155905184926001600160a01b03851691600080516020613e9b8339815191529190a4505050565b6116b5611c06565b6117095760408051600160e51b62461bcd02815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6040517ff58fef8e187ef8dfd7bef096c1ef3e4f3c54f98d95b8ad5659349b07e61204df90600090a16015546001600160a01b0316ff5b600061174a611474565b821061178a57604051600160e51b62461bcd02815260040180806020018281038252602c815260200180613f0d602c913960400191505060405180910390fd5b6007828154811061179757fe5b90600052602060002001549050919050565b6015546001600160a01b031681565b60006117c48484612b8e565b6117ce8383612baf565b5060019392505050565b6000818152600160205260408120546001600160a01b03168061150757604051600160e51b62461bcd028152600401808060200182810382526029815260200180613d5d6029913960400191505060405180910390fd5b60006001600160a01b03821661187957604051600160e51b62461bcd02815260040180806020018281038252602a815260200180613d33602a913960400191505060405180910390fd5b6001600160a01b038216600090815260036020526040902061150790612c49565b6118a2611c06565b6118f65760408051600160e51b62461bcd02815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600f546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600f80546001600160a01b0319169055565b60008181526012602052604081206001015434101561199a5760408051600160e51b62461bcd02815260206004820152600b6024820152600160a81b6a507269636520697373756502604482015290519081900360640190fd5b600082815260126020526040902060039081015460ff16908111156119bb57fe5b6001146119ff5760408051600160e51b62461bcd0281526020600482015260076024820152600160c81b664e6f2053616c6502604482015290519081900360640190fd5b60008281526012602052611a1234612c4d565b90506000611a203483612c68565b6015546040519192506001600160a01b03169082156108fc029083906000818181858888f19350505050158015611a5b573d6000803e3d6000fd5b506016546040516001600160a01b039091169083156108fc029084906000818181858888f19350505050158015611a96573d6000803e3d6000fd5b505050601554611ab0906001600160a01b03163384612a5b565b60008281526012602090815260409182902060038101805460ff19166002908117909155835186815234948101859052606093810184815292820180546001811615610100026000190116929092049381018490527f46e70e87b058d8f3cde334fc179a61ac8acadcc4fdc26735e4195106b3c88eb394879492939092608083019085908015611b815780601f10611b5657610100808354040283529160200191611b81565b820191906000526020600020905b815481529060010190602001808311611b6457829003601f168201915b505094505050505060405180910390a1919050565b6060611ba182612caa565b805480602002602001604051908101604052809291908181526020018280548015611beb57602002820191906000526020600020905b815481526020019060010190808311611bd7575b50505050509050919050565b600f546001600160a01b031690565b600f546000906001600160a01b0316611c1d612a57565b6001600160a01b031614905090565b600a8054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561103b5780601f106110105761010080835404028352916020019161103b565b611c9d611c98612a57565b612049565b611cdb57604051600160e51b62461bcd028152600401808060200182810382526030815260200180613d866030913960400191505060405180910390fd5b61158081612cc4565b611cef611c98612a57565b611d2d57604051600160e51b62461bcd028152600401808060200182810382526030815260200180613d866030913960400191505060405180910390fd5b6028841115611d735760408051600160e51b62461bcd0281526020600482015260076024820152600160cc1b6604f7665722034302604482015290519081900360640190fd5b60005b84811015611ecc57601354611d9290600163ffffffff612d0c16565b601381815560009182526012602090815260408084206001018790559154835291208551611dc892600290920191870190613b2f565b5060018215151415611df8576013546000908152601260205260409020600301805460ff19166001179055611e15565b6013546000908152601260205260409020600301805460ff191690555b611e2186601354612b8e565b7fadef11a3979b8ceb0573eb6ef0678134a09c23a0d94e5ea47cd18ac3a9fc0194601354856040518083815260200180602001828103825283818151815260200191508051906020019080838360005b83811015611e89578181015183820152602001611e71565b50505050905090810190601f168015611eb65780820380516001836020036101000a031916815260200191505b50935050505060405180910390a1600101611d76565b505050505050565b611ee4611edf612a57565b612d69565b565b6014805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561126c5780601f106112415761010080835404028352916020019161126c565b611f49612a57565b6001600160a01b0316826001600160a01b03161415611fb25760408051600160e51b62461bcd02815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015290519081900360640190fd5b8060046000611fbf612a57565b6001600160a01b03908116825260208083019390935260409182016000908120918716808252919093529120805460ff191692151592909217909155612003612a57565b60408051841515815290516001600160a01b0392909216917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319181900360200190a35050565b6000611507600e8363ffffffff612db116565b6011602052816000526040600020818154811061207557fe5b600091825260209182902001805460408051601f6002600019610100600187161502019094169390930492830185900485028101850190915281815294509092509083018282801561126c5780601f106112415761010080835404028352916020019161126c565b60135481565b6017546001600160a01b031681565b606060005b6103e88110156121a9576000818152600d602090815260409182902080548351601f60026000196101006001861615020190931692909204918201849004840281018401909452808452606093928301828280156121965780601f1061216b57610100808354040283529160200191612196565b820191906000526020600020905b81548152906001019060200180831161217957829003601f168201915b5050600190950194506120f79350505050565b5090565b6121be6121b8612a57565b83612a7a565b6121fc57604051600160e51b62461bcd028152600401808060200182810382526031815260200180613edc6031913960400191505060405180910390fd5b61220884848484612e1b565b50505050565b60126020908152600091825260409182902080546001808301546002808501805488519481161561010002600019011691909104601f8101879004870284018701909752868352929590949192918301828280156122ad5780601f10612282576101008083540402835291602001916122ad565b820191906000526020600020905b81548152906001019060200180831161229057829003601f168201915b5050506003909301549192505060ff1684565b6000818152600d60209081526040918290208054835160026001831615610100026000190190921691909104601f810184900484028201840190945283815260609384939192918301828280156123585780601f1061232d57610100808354040283529160200191612358565b820191906000526020600020905b81548152906001019060200180831161233b57829003601f168201915b5050506000868152601260209081526040918290206002908101805484516001821615610100026000190190911692909204601f81018490048402830184019094528382529596506124079587955090935091908301828280156123fd5780601f106123d2576101008083540402835291602001916123fd565b820191906000526020600020905b8154815290600101906020018083116123e057829003601f168201915b5050505050612e70565b9392505050565b612419611c98612a57565b61245757604051600160e51b62461bcd028152600401808060200182810382526030815260200180613d866030913960400191505060405180910390fd5b60005b825181101561251257600182151514156124be5760016012600085848151811061248057fe5b6020026020010151815260200190815260200160002060030160006101000a81548160ff021916908360038111156124b457fe5b021790555061250a565b6000601260008584815181106124d057fe5b6020026020010151815260200190815260200160002060030160006101000a81548160ff0219169083600381111561250457fe5b02179055505b60010161245a565b507fefd56044628f374cec68c952a0580a76d23b4bd06d17bb887193f2176ba6c48b82601260008560008151811061254657fe5b60200260200101518152602001908152602001600020600201604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b838110156125a357818101518382015260200161258b565b50505050919091018481038352855460026000196101006001841615020190911604808252602090910191508590801561261e5780601f106125f35761010080835404028352916020019161261e565b820191906000526020600020905b81548152906001019060200180831161260157829003601f168201915b505094505050505060405180910390a15050565b60608061263e33611b96565b905060005b815181101561273e5760016012600084848151811061265e57fe5b6020026020010151815260200190815260200160002060030160009054906101000a900460ff16600381111561269057fe5b141561273657601960008383815181106126a657fe5b60209081029190910181015182528101919091526040016000205460ff166127365760188282815181106126d657fe5b602090810291909101810151825460018181018555600094855292842001558351909160199185908590811061270857fe5b6020026020010151815260200190815260200160002060006101000a81548160ff0219169083151502179055505b600101612643565b505090565b6018818154811061275057fe5b600091825260209091200154905081565b61276c611c98612a57565b6127aa57604051600160e51b62461bcd028152600401808060200182810382526030815260200180613d866030913960400191505060405180910390fd5b60005b81518110156127da576127d28282815181106127c557fe5b6020026020010151612b21565b6001016127ad565b507f68f2536b9ff968bd2acc006b7cf7be7ca83c2f4a462c355e925bb354e5ce43d5601260008360008151811061280d57fe5b60200260200101518152602001908152602001600020600201826040518080602001806020018381038352858181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156128b45780601f10612889576101008083540402835291602001916128b4565b820191906000526020600020905b81548152906001019060200180831161289757829003601f168201915b50508381038252845181528451602091820191808701910280838360005b838110156128ea5781810151838201526020016128d2565b5050505090500194505050505060405180910390a150565b61290d611c98612a57565b61294b57604051600160e51b62461bcd028152600401808060200182810382526030815260200180613d866030913960400191505060405180910390fd5b60005b825181101561148557816012600085848151811061296857fe5b6020026020010151815260200190815260200160002060010181905550808060010191505061294e565b6001600160a01b03918216600090815260046020908152604080832093909416825291909152205460ff1690565b6129c8611c06565b612a1c5760408051600160e51b62461bcd02815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b61158081612eac565b60196020526000908152604090205460ff1681565b6000908152600160205260409020546001600160a01b0316151590565b3390565b612a66838383612f50565b612a708382613088565b611485828261317d565b6000612a8582612a3a565b612ac357604051600160e51b62461bcd02815260040180806020018281038252602c815260200180613ccf602c913960400191505060405180910390fd5b6000612ace836117d8565b9050806001600160a01b0316846001600160a01b03161480612b095750836001600160a01b0316612afe84611046565b6001600160a01b0316145b80612b195750612b198185612992565b949350505050565b611580612b2d826117d8565b826131bb565b6000818152600260205260409020546001600160a01b03161561158057600090815260026020526040902080546001600160a01b0319169055565b8054612b8190600163ffffffff612c6816565b9055565b80546001019055565b612b988282613203565b612ba2828261317d565b612bab81613328565b5050565b612bb882612a3a565b612bf657604051600160e51b62461bcd02815260040180806020018281038252602c815260200180613e24602c913960400191505060405180910390fd5b8051612c0990600b906020840190613b2f565b506000828152600d602090815260409091208251612c2992840190613b2f565b506000828152600c60209081526040909120825161148592840190613b2f565b5490565b600080612c5b83600261336c565b90506124078160646133c8565b600061240783836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525061340a565b6001600160a01b0316600090815260056020526040902090565b612cd5600e8263ffffffff6134a416565b6040516001600160a01b038216907f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f690600090a250565b6000828201838110156124075760408051600160e51b62461bcd02815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b612d7a600e8263ffffffff61352816565b6040516001600160a01b038216907fe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb6669290600090a250565b60006001600160a01b038216612dfb57604051600160e51b62461bcd028152600401808060200182810382526022815260200180613e506022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b612e26848484612a5b565b612e3284848484613592565b61220857604051600160e51b62461bcd028152600401808060200182810382526032815260200180613c536032913960400191505060405180910390fd5b606061240783836040518060200160405280600081525060405180602001604052806000815250604051806020016040528060008152506136ec565b6001600160a01b038116612ef457604051600160e51b62461bcd028152600401808060200182810382526026815260200180613c856026913960400191505060405180910390fd5b600f546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600f80546001600160a01b0319166001600160a01b0392909216919091179055565b826001600160a01b0316612f63826117d8565b6001600160a01b031614612fab57604051600160e51b62461bcd028152600401808060200182810382526029815260200180613e726029913960400191505060405180910390fd5b6001600160a01b038216612ff357604051600160e51b62461bcd028152600401808060200182810382526024815260200180613cab6024913960400191505060405180910390fd5b612ffc81612b33565b6001600160a01b038316600090815260036020526040902061301d90612b6e565b6001600160a01b038216600090815260036020526040902061303e90612b85565b60008181526001602052604080822080546001600160a01b0319166001600160a01b038681169182179092559151849391871691600080516020613e9b83398151915291a4505050565b6001600160a01b0382166000908152600560205260408120546130b290600163ffffffff612c6816565b60008381526006602052604090205490915080821461314d576001600160a01b03841660009081526005602052604081208054849081106130ef57fe5b906000526020600020015490508060056000876001600160a01b03166001600160a01b03168152602001908152602001600020838154811061312d57fe5b600091825260208083209091019290925591825260069052604090208190555b6001600160a01b0384166000908152600560205260409020805490613176906000198301613ba9565b5050505050565b6001600160a01b0390911660009081526005602081815260408084208054868652600684529185208290559282526001810183559183529091200155565b6131c58282613900565b6000818152600d60205260409020546002600019610100600184161502019091160415612bab576000818152600d60205260408120612bab91613bcd565b6001600160a01b0382166132615760408051600160e51b62461bcd02815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015290519081900360640190fd5b61326a81612a3a565b156132bf5760408051600160e51b62461bcd02815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015290519081900360640190fd5b600081815260016020908152604080832080546001600160a01b0319166001600160a01b0387169081179091558352600390915290206132fe90612b85565b60405181906001600160a01b03841690600090600080516020613e9b833981519152908290a45050565b600780546000838152600860205260408120829055600182018355919091527fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c6880155565b60008261337b57506000611507565b8282028284828161338857fe5b041461240757604051600160e51b62461bcd028152600401808060200182810382526021815260200180613dd76021913960400191505060405180910390fd5b600061240783836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f00000000000081525061392c565b6000818484111561349c57604051600160e51b62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360005b83811015613461578181015183820152602001613449565b50505050905090810190601f16801561348e5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6134ae8282612db1565b156135035760408051600160e51b62461bcd02815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b6135328282612db1565b61357057604051600160e51b62461bcd028152600401808060200182810382526021815260200180613db66021913960400191505060405180910390fd5b6001600160a01b0316600090815260209190915260409020805460ff19169055565b60006135a6846001600160a01b0316613994565b6135b257506001612b19565b6000846001600160a01b031663150b7a026135cb612a57565b8887876040518563ffffffff1660e01b815260040180856001600160a01b03166001600160a01b03168152602001846001600160a01b03166001600160a01b0316815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015613650578181015183820152602001613638565b50505050905090810190601f16801561367d5780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b15801561369f57600080fd5b505af11580156136b3573d6000803e3d6000fd5b505050506040513d60208110156136c957600080fd5b50516001600160e01b031916600160e11b630a85bd010214915050949350505050565b6060808690506060869050606086905060608690506060869050606081518351855187518951010101016040519080825280601f01601f191660200182016040528015613740576020820181803883390190505b509050806000805b88518110156137995788818151811061375d57fe5b602001015160f81c60f81b83838060010194508151811061377a57fe5b60200101906001600160f81b031916908160001a905350600101613748565b5060005b87518110156137ee578781815181106137b257fe5b602001015160f81c60f81b8383806001019450815181106137cf57fe5b60200101906001600160f81b031916908160001a90535060010161379d565b5060005b86518110156138435786818151811061380757fe5b602001015160f81c60f81b83838060010194508151811061382457fe5b60200101906001600160f81b031916908160001a9053506001016137f2565b5060005b85518110156138985785818151811061385c57fe5b602001015160f81c60f81b83838060010194508151811061387957fe5b60200101906001600160f81b031916908160001a905350600101613847565b5060005b84518110156138ed578481815181106138b157fe5b602001015160f81c60f81b8383806001019450815181106138ce57fe5b60200101906001600160f81b031916908160001a90535060010161389c565b50909d9c50505050505050505050505050565b61390a82826139cb565b6139148282613088565b600081815260066020526040812055612bab81613a93565b6000818361397e57604051600160e51b62461bcd028152602060048201818152835160248401528351909283926044909101919085019080838360008315613461578181015183820152602001613449565b50600083858161398a57fe5b0495945050505050565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4708115801590612b195750141592915050565b816001600160a01b03166139de826117d8565b6001600160a01b031614613a2657604051600160e51b62461bcd028152600401808060200182810382526025815260200180613f396025913960400191505060405180910390fd5b613a2f81612b33565b6001600160a01b0382166000908152600360205260409020613a5090612b6e565b60008181526001602052604080822080546001600160a01b0319169055518291906001600160a01b03851690600080516020613e9b833981519152908390a45050565b600754600090613aaa90600163ffffffff612c6816565b60008381526008602052604081205460078054939450909284908110613acc57fe5b906000526020600020015490508060078381548110613ae757fe5b60009182526020808320909101929092558281526008909152604090208290556007805490613b1a906000198301613ba9565b50505060009182525060086020526040812055565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10613b7057805160ff1916838001178555613b9d565b82800160010185558215613b9d579182015b82811115613b9d578251825591602001919060010190613b82565b506121a9929150613c0d565b81548183558181111561148557600083815260209020611485918101908301613c0d565b50805460018160011615610100020316600290046000825580601f10613bf35750611580565b601f01602090049060005260206000209081019061158091905b61104391905b808211156121a95760008155600101613c1356fe455243373231456e756d657261626c653a206f776e657220696e646578206f7574206f6620626f756e64734552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734552433732313a207472616e7366657220746f20746865207a65726f20616464726573734552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e4d696e746572526f6c653a2063616c6c657220646f6573206e6f74206861766520746865204d696e74657220726f6c65526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c65536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f774552433732313a20617070726f76656420717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732314d657461646174613a2055524920736574206f66206e6f6e6578697374656e7420746f6b656e526f6c65733a206163636f756e7420697320746865207a65726f20616464726573734552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776eddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564455243373231456e756d657261626c653a20676c6f62616c20696e646578206f7574206f6620626f756e64734552433732313a206275726e206f6620746f6b656e2074686174206973206e6f74206f776e4552433732314275726e61626c653a2063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564a165627a7a723058202be340baf6ab6dcebd69151f52f6264f9d0f202d4f7ae567514e09d65f22c29100294f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573738be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0526f6c65733a206163636f756e7420697320746865207a65726f2061646472657373',
        arguments: [ta,tb,Img,accounts[0],'0xD264b074c4a772E56536005Ae629518ee1bCc83a']        
        })
      .send({
      from: accounts[0],
      //gas: 6241620,//9088550,
      //gasPrice:'20000000000' //'1000000000'
    })
    .then(function(newContractInstance){
      console.log(newContractInstance.options.address) // instance with the new contract address
      localStorage.setItem('myData', newContractInstance.options.address);
    })

    }
    else{
      alert("please select valid network");
    }
  
    
    const abi = [
      {
        "constant": true,
        "inputs": [
          {
            "name": "interfaceId",
            "type": "bytes4"
          }
        ],
        "name": "supportsInterface",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "getApproved",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "_tokenURIs",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "giver",
            "type": "address"
          },
          {
            "name": "recipients",
            "type": "address[]"
          },
          {
            "name": "values",
            "type": "uint256[]"
          }
        ],
        "name": "batchTransfer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "from",
            "type": "address"
          },
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "owner",
            "type": "address"
          },
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "from",
            "type": "address"
          },
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "burn",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_receiver",
            "type": "address"
          },
          {
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "sendss",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "destroyAndSend",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "tokenByIndex",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "maker",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "name": "tokenURI",
            "type": "string"
          }
        ],
        "name": "mintWithTokenURI",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "ownerOf",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "buyThing",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "tokensOfOwner",
        "outputs": [
          {
            "name": "",
            "type": "uint256[]"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "isOwner",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "account",
            "type": "address"
          }
        ],
        "name": "addMinter",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "amountToMint",
            "type": "uint256"
          },
          {
            "name": "metaId",
            "type": "string"
          },
          {
            "name": "setPrice",
            "type": "uint256"
          },
          {
            "name": "isForSale",
            "type": "bool"
          }
        ],
        "name": "batchMint",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "renounceMinter",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "baseUri",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "account",
            "type": "address"
          }
        ],
        "name": "isMinter",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "address"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "auri",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "id",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "Owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getAllURI",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "from",
            "type": "address"
          },
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "name": "_data",
            "type": "bytes"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "items",
        "outputs": [
          {
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "name": "price",
            "type": "uint256"
          },
          {
            "name": "metaId",
            "type": "string"
          },
          {
            "name": "state",
            "type": "uint8"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "tokenURI",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "ids",
            "type": "uint256[]"
          },
          {
            "name": "isEnabled",
            "type": "bool"
          }
        ],
        "name": "setTokenState",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "printitems",
        "outputs": [
          {
            "name": "",
            "type": "uint256[]"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "printitem",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "tokenIds",
            "type": "uint256[]"
          }
        ],
        "name": "batchBurn",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "ids",
            "type": "uint256[]"
          },
          {
            "name": "setPrice",
            "type": "uint256"
          }
        ],
        "name": "setTokenPrice",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "owner",
            "type": "address"
          },
          {
            "name": "operator",
            "type": "address"
          }
        ],
        "name": "isApprovedForAll",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "ispushed",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "fee",
            "type": "address"
          },
          {
            "name": "creator",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "error",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "ErrorOut",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "metaId",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "recipients",
            "type": "address[]"
          },
          {
            "indexed": false,
            "name": "ids",
            "type": "uint256[]"
          }
        ],
        "name": "BatchTransfered",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "metaId",
            "type": "string"
          }
        ],
        "name": "Minted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "metaId",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "ids",
            "type": "uint256[]"
          }
        ],
        "name": "BatchBurned",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "ids",
            "type": "uint256[]"
          },
          {
            "indexed": false,
            "name": "metaId",
            "type": "string"
          }
        ],
        "name": "BatchForSale",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "metaId",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Bought",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "Destroy",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "account",
            "type": "address"
          }
        ],
        "name": "MinterAdded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "account",
            "type": "address"
          }
        ],
        "name": "MinterRemoved",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "to",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "approved",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "operator",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "ApprovalForAll",
        "type": "event"
      }
    ];


    address =  localStorage.getItem('myData');
    
    var geta=new web3.eth.Contract(abi,address);



    alert("check maticmum"+address);
    
    
    //let a=this.state.toaddress;
    //let b=this.state.tokenid;
    //let c=this.state.tokenuri;
    
    
    
    //alert("im work a +b"+td+" "+te+" "+tf);
    
    event.preventDefault();
    
    //const accounts = await web3.eth.getAccounts();
    
    await geta.methods.mintWithTokenURI(accounts[0],te,Img).send({
      from: accounts[0],

      //gas: 21000
      
     }).on('transactionHash',function(hash){

      console.log("hashget",hash)
                //start


                    //this line firebase code added below
                    //const accounts = await web3.eth.getAccounts();

                    let getaddress=localStorage.getItem('myaddress')
                    
                    let getData=localStorage.getItem('myData')
                    
                        fireDb.database().ref("contractaddress").child(accounts[0]).push(getData, (err) => {
                          //   console.log(obj, "obj");
                          if (err)
                              console.log(err);
                          else 
                        setCurrentid("");
                        });
                      
                    

                        let ref2=fireDb.database().ref(`imageref/${accounts[0]}`);

                        let dateset=new Date().toDateString();

                        console.log("dateget",dateset)

                        const db = ref2.push().key;

                         
                        console.log("dbcheck",db)

                        ref2.child(db).set({id:te,imageUrl:Img,priceSet:"",cAddress:getData,keyId:db,userName:ta,userSymbol:tb,ipfsUrl:tf,ownerAddress:accounts[0],soldd:"",extra1:"",previousoaddress:"",datesets:dateset,whois:''})


                        let ref23=fireDb.database().ref(`imagepurcre/${accounts[0]}`);
                

                        ref23.child(db).set({id:te,imageUrl:Img,priceSet:"",cAddress:getData,keyId:db,userName:ta,userSymbol:tb,ipfsUrl:tf,ownerAddress:accounts[0],soldd:"",extra1:"",datesets:dateset,whois:''})


                      
                    
                        //fireDb.database().ref(`imageref/${accounts[0]}`).child(db).push({
                          //id:te,imageUrl:Img,priceSet:"",cAddress:getData,keyId:""
                        //});
                    
          //end          






     })

     setLoading(false);

     //alert("Your token has been deployed and mint successfully......")

     setIsOpen(true);


     //window.location.reload(false)


      }
      
      
}

  const HelloAsset=async()=>{

alert("Hello world");

await lottery2.deploy({
    
  data:'608060405234801561001057600080fd5b506040516104ca3803806104ca8339818101604052602081101561003357600080fd5b810190808051604051939291908464010000000082111561005357600080fd5b8382019150602082018581111561006957600080fd5b825186600182028301116401000000008211171561008657600080fd5b8083526020830192505050908051906020019080838360005b838110156100ba57808201518184015260208101905061009f565b50505050905090810190601f1680156100e75780820380516001836020036101000a031916815260200191505b50604052505050806000908051906020019061010492919061010b565b50506101b0565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061014c57805160ff191683800117855561017a565b8280016001018555821561017a579182015b8281111561017957825182559160200191906001019061015e565b5b509050610187919061018b565b5090565b6101ad91905b808211156101a9576000816000905550600101610191565b5090565b90565b61030b806101bf6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80633d7403a31461003b578063e21f37ce146100f6575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610179565b005b6100fe610193565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561013e578082015181840152602081019050610123565b50505050905090810190601f16801561016b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b806000908051906020019061018f929190610231565b5050565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102295780601f106101fe57610100808354040283529160200191610229565b820191906000526020600020905b81548152906001019060200180831161020c57829003601f168201915b505050505081565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061027257805160ff19168380011785556102a0565b828001600101855582156102a0579182015b8281111561029f578251825591602001919060010190610284565b5b5090506102ad91906102b1565b5090565b6102d391905b808211156102cf5760008160009055506001016102b7565b5090565b9056fea265627a7a72315820fae71f76efa756d45cd620b3bd55a73ed91b6bc03bdb65b2ac7d3e54dc85023364736f6c63430005110032',
  arguments: ['HelloNFTDEPLOY']        
  })
.send({
from: accounts[0]
// gas: 6241620,//9088550,
// gasPrice:'20000000000' //'1000000000'
})
.then(function(newContractInstance){
console.log(newContractInstance.options.address) // instance with the new contract address
localStorage.setItem('myData', newContractInstance.options.address);
})

let address=localStorage.getItem('myData')

alert("local"+localStorage.getItem('myData'));

const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "initMessage",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "newMessage",
				"type": "string"
			}
		],
		"name": "update",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "message",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

var geta=new web3.eth.Contract(abi,address);


alert("alert message"+ await geta.methods.message().call());

  }




     
     //alert('transaction success')}).catch(function(e){ 
      
     // })   
     //.then(function (error, result) {

    //   if (!error) {
    //       console.log("noerror",'ok')
    //       console.log("mintcheck",mint)
    //   } else {

    //     console.log("Error","errorelse")

    //   }
      
    // }
  
    
    
    //await geta.methods.tokenURI(te).send({
    //from: accounts[0]
    //value: this.setState({c:accounts[0]})
    
    //});
    
    //this.setState({ message: 'You have been entered!' });
    
    //var data =await lottery.methods.tokenURI(te).call();
    
    //this.setState({da: String(te)})
    
    //this.setState({ message: 'You have been entered!' });
    
    //alert(" and "+tid +" and "+te+"and   data   ");
    
    
    //alert(localStorage.getItem('myData'));
    
    
    //transfer
    
    //await geta.methods.tokenURI(te).send({
      //from: accounts[0]
      //value: this.setState({c:accounts[0]})
      
    //});
    
    
    //alert("NFT NAME    "+ta+"   NFT SYMBOL    "+tb+"    TOKEN URI    "+tc+"   TOKEN ADDRESS    "+td+"    TOKEN ID   "+te+"  TOKEN URI  "+tf);
    
    
    
    
    
      //end above
    
    
      //alert("waiting for data clear");
    
      //document.getElementById("nameid").innerHTML="";
      //document.getElementById("symbolid").innerHTML="";
      //document.getElementById("addressid").innerHTML="";
      //document.getElementById("idid").innerHTML="";
      //document.getElementById("fileid").innerHTML="";
    
    
      //this.tname.value = "";
      //this.tsymbol.value = "";
      //this.toaddress.value = "";
      //this.tid.value = "";
      //this.tfile.value = "";
    
    
  //}

  //useEffect(()=>{onSubmitNFT()},[])


  // const getkeycheck =async()=>{

  //   const accounts = await web3.eth.getAccounts();

  //   alert(accounts[0])

  //   // let ref2=fireDb.database().ref(`imageref/${accounts[0]}`);

  //   //                     const db = ref2.push({foo: 'bar'}).key;

                         
  //   //                     console.log("dbcheck",db)
                      

  //   // //let getk=firebase.database.ref('imageref/').child(`${accounts[0]}`).key()

  //   // let ref3=firebase.database().ref("imageref/");

  //   // const db2 = ref3.push().key;


  //   // console.log("getkk",db2)

  //   // // getk.push({
  //   // //   id:te,imageUrl:Img,priceSet:"",cAddress:getData
  //   // // }, (err) => {
  //   // //   //   console.log(obj, "obj");
  //   // // });



  // }

  // const handleLogout=()=>{
    
  //   fireDb.auth().signOut();
    
  //     }
    

  


  return (

    
    <div className="App"  >



<div style={{backgroundColor:'white',height:'70px',width:'1500px',marginBlock:'5px',display:'flex'}}>


{/* <div style={{backgroundColor:'white',height:'43px',width:'1017px',marginLeft:'20px',marginBlock:'15px', display:'-webkit-inline-flex'}}> */}

<div style={{backgroundColor:'white',height:'43px',width:'1050px',marginLeft:'150px',marginBlock:'15px'}}>

<Link
              to="/">

              
              <button
              
              style={{outline: 'none'}}
                class="btn btn-info btn-block"
                type="button"
                
              >
                Home
              </button>
              {' '}
</Link>

              


            <Link
              to="/explore">

              
              <button
              
              style={{outline: 'none'}}
                class="btn btn-info btn-block"
                type="button"
                
              >
                Explore
              </button>


              </Link>

              {" "}

              <Link
              to="/salepagecopy">

              
              <button
                class="btn btn-info btn-block"
                type="button"
                // onClick={() => {
                //   history.push("/Salepagecopy");
                // }}
              >
                Myitem     
              </button>
              </Link>

              {" "}

              <Link
              to="/followingpage">

              <button
                class="btn btn-info btn-block"
                type="button"
                // onClick={() => {
                //   history.push("/Followingpage");
                // }}
              >
               Following
              </button>
              </Link>

              {" "}
              <Link
              to="/activitypage">
              <button
                class="btn btn-info btn-block"
                type="button"
                // onClick={() => {
                //   history.push("/Activitypage");
                // }}
              >
               Activity
              </button>
              </Link>

              {" "}

              <Link
              to="/howitworkpage">

              <button
                class="btn btn-info btn-block"
                type="button"
                
              >
               How it works
              </button>

</Link>
              {" "}
              <Link
              to="/communitypage">
              <button
                class="btn btn-info btn-block"
                type="button"
                
              >
               Community
              </button>
              </Link>

              {" "}
              <Link
              to="/nft">
              <button
                class="btn btn-info btn-block"
                type="button"
                // onClick={() => {
                //   history.push("/Nft");
                // }}
              >
               Create
              </button>
              </Link>

              {" "}

              <button
              id="bu"
                class="btn btn-info btn-block"
                type="button"
                onClick= {connectmm}>
               Connect wallet
              </button>

              {' '}
              

              {/* <button onClick={handleLogout}>Logout</button> */}




              <br></br>
<br></br>
      

<br></br>




</div>

</div>


<center>


<div style={{backgroundColor:'white',height:'600px',width:'500px'}}>

  


  <br></br>
  <h1>CREATE NFT-TOKEN</h1>

  <br></br>

<form onSubmit={onSubmitNFT} id="create-course-form" >

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
        <option value="Maticmum">MATICMUM </option>
        <option value="Algos">Algos</option>
      </select>
{/* <input
  id="symbolid"
  type='text'
  name="tsymbol"
  required
  onChange={event => settSymbol( event.target.value)}
  
/> */}

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


<form onSubmit={onSubmitImage}>


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
	</form>



  {/* {isLoading ? "":
              (<button  */}
              <button
                type="submit"> 
                Create NFT
                </button>
   {/* )} */}
  
  <br></br><br></br>

   


{/* <button 




             type="submit"> 
             Upload and Create NFT

             </button> */}

</form>


{/* <button type="submit" onClick={CreateAsset}> Create NFT Algorand </button>

<br></br>
<br></br>


<input
  type='text'
  name="tTransferAlgo"
  required
  onChange={event => setTransferAlgo( event.target.value)}
  
/> */}

<br></br>
<br></br>

{/* <button type="submit" onClick={HelloAsset}> Transfer Algorand </button> */}

{/* <div style={{backgroundColor:'red',height:'100px',width:'500px'}}> */}

{isOpen && <Popup content={<>
        <b>Notification</b>
        <p>Your token has been deployed and mint successfully......</p>
        <button type="button" onClick={togglePopup}>close</button>
      </>}
      // handleClose={togglePopup}
    />}

    {/* </div> */}



</div>


{/* <div style={{backgroundColor:'white',height:'600px',width:'500px'}}>
    {/* <input
      type="button"
      value="Click to Open Popup l"
      onClick={togglePopup}
    /> */}
    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
    {/* {isOpen && <Popup
      content={<>
        <b>Design your Popups</b>
        <p>Hello</p>
        <button type="button" onClick={togglePopup}>Test button</button>
      </>}
      // handleClose={togglePopup}
    />} */}
  {/* </div> */} 



</center>


{isLoading ? <div><h4>Fetching........</h4>
              <img style={{width:"200px",height:"200px"}} src="/4V0b.gif" alt=""/></div>:' '}


      
<br></br>
<br></br>


{/* <div>


      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Loading......</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your Request has been Loading....!</Modal.Body>
        <Modal.Footer>

            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
        </Modal.Footer>
      </Modal>

        </div> */}







{/* <button
                class="btn btn-info btn-block"
                type="button"
                onClick={getkeycheck}
              >
              onclickkey
              </button> */}

<br></br>
<br></br>
  {/* <table bordered responsive>
                
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{tname}</td>
                  </tr>
				  <tr>
                    <td>Symbol</td>
                    <td>{tsymbol}</td>
                  </tr>
				  
				  <tr>
                    <td>Token-Id</td>
                    <td>{tid}</td>
                  </tr>
				  <tr>
                    <td>Image-URL</td>
                    <td>https://ipfs.io/ipfs/{ipfsHash}</td>
                  </tr>
				  <tr>
                    <td>Image-View</td>

                    <td><img src={localStorage.getItem('myimageuri')}  alt={'C - language'} /> 			
					</td>
                  </tr>         
                </tbody>

            </table> */}

			



            {/* <Router history={history}>
          <Switch>
            <Route path="/" exact>
              <div class="display-4 mb-1">Choose a route to go to</div>
              
            
            </Route>
            <Route path="/newpage">
              <NewPage />
            </Route>
            <Route path="/tokenpage">
              <Tokencreate />
            </Route>
            <Route path="/sendpage">
              <Sendpage />
            </Route>
            <Route path="/printallimage">
              <PrintallImage />
            </Route>
            <Route path="/Mypurchasepage">
              <Mypurchasepage />
            </Route>
            <Route path="/Explore">
              <Explore />
            </Route>

            <Route path="/Receivedpage">
              <Receivedpage />
            </Route>
            
          </Switch>
        </Router> */}


        


      </div>      
    
  );
}

export default Nft;
