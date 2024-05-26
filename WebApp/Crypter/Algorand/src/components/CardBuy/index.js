/* global AlgoSigner */
import React, { useState,useEffect} from "react";
//import { useHistory } from "react-router-dom";
import cn from "classnames";
import { Link,useHistory } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";
import fireDb from "../../screens/UploadDetails/firebase";
//import axios from 'axios';
import FolowStepsd from "../Card/FolowStepsd";
import Modald from "../../components/ModalD";
//import web3 from '../../screens/./UploadDetails/web3';
//import {abi} from '../Card/data'
//import {tra} from './tra'
import FolowStepsdr from "../../screens/Search01/FolowSteps";

import FolowStepss from "../../screens/Search01/FolowStepss";
import TextInput from "../../components/TextInput";

import algosdk from 'algosdk';
import MyAlgo from '@randlabs/myalgo-connect';


const CardBuy = ({ className, item }) => {

  let history=useHistory();
  const [isOpens, setIsOpens] = useState(false);
  const [isOpenss, setIsOpenss] = useState(false);

  const onSub=()=>{
    console.log("hello close")
    //setIsOpen(false);
    setIsOpens(false)
    history.push("/")
    window.location.reload(false)   
    
  }

  const[getprodata,setgetprodata]=useState([]);
  console.log("getprodata",getprodata)
  const [visible, setVisible] = useState(false);

  //const [Mnemo, setMnemo] = useState("");
  const [historydb, sethistorydb] = useState([]);
  console.log("hist",historydb)

  // const [historydb, sethistorydb] = useState([]);
  // console.log("hist",historydb)
  const [isOpen, setIsOpen] = useState(false);
  const [Mnemo,setMnemo] = useState(null);
  console.log("Mnemocheck",Mnemo)

  const addlikedb=async()=>{
    //let getalgo=localStorage.getItem("walletalgo");
    //console.log("addlikedb function call");
    console.log("addlikedb function call");

    if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === 'undefined' || localStorage.getItem("wallet") === ''){

    }
    else{

      let getalgo=localStorage.getItem("wallet");

    //const accounts = await  web3.eth.getAccounts();
    fireDb.database().ref(`imagereflikes/${getalgo}`).child(item.highestBid).set({
      id:item.title,imageUrl:item.image,priceSet:item.price,cAddress:item.categoryText,keyId:item.highestBid,
      userName:item.counter,userSymbol:"Algos",ipfsUrl:item.ipfsurl,
      ownerAddress:item.bid,soldd:item.soldd,extra1:item.extra,
      previousoaddress:item.previousaddress,datesets:item.date,
      description:item.description,whois:'likes',history:item.url,paramsdb:item.image2x,privatekey:item.category,Mnemonic:item.Mnemonic
        }).then(()=>{
        setVisible(!visible)
        window.location.reload(false)   
      });    

    }

    }

    const usernameget=()=>{

    console.log("inside usernameget function")

    if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === 'undefined' || localStorage.getItem("wallet") === ''){

    }
    else{    
    let getalgo=localStorage.getItem("wallet");
    fireDb.database().ref("profiledata").child(getalgo).on("value", (data) => {
      if (data) {
        console.log("startcon",data.val())        
        let value=data.val();
        console.log("valuess",value)
        setgetprodata(value);   
      }                 
   });
  }
}

useEffect(()=>{usernameget()},[])

  

  const updatepricedb=async()=>{

    console.log("inside buy function")
    if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === ''){
    }

    else{


      // if(Mnemo === null){

      //   alert("please enter your mnemonic")

      // }
      //else{

        //var recoveredAccount1 = algosdk.mnemonicToSecretKey(item.Mnemonic);//from db owner
        //var recoveredAccount2 = algosdk.mnemonicToSecretKey(Mnemo);//current receiver

        //console.log("rec1",recoveredAccount1)
        //console.log("rec2",recoveredAccount2)
        //console.log("rec1addr",recoveredAccount1.addr)
        //console.log("rec2addr",recoveredAccount2.addr)
        let getalgo=localStorage.getItem("wallet");


        

      const waitForConfirmation = async function (algodclient, txId) {
        let response = await algodclient.status().do();
        let lastround = response["last-round"];
        while (true) {
            const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
                console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
                break;
            }
            lastround++;
            await algodclient.statusAfterBlock(lastround).do();
        }
    };
    
    const printCreatedAsset = async function (algodclient, account, assetid) {
       
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

const waitForConfirmation1 = async function (algodClient, txId, timeout) {
  if (algodClient == null || txId == null || timeout < 0) {
      throw new Error("Bad arguments");
  }

  const status = (await algodClient.status().do());
  if (status === undefined) {
      throw new Error("Unable to get node status");
  }

  const startround = status["last-round"] + 1;
  let currentround = startround;

  while (currentround < (startround + timeout)) {
      const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
      if (pendingInfo !== undefined) {
          if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
              //Got the completed Transaction
              return pendingInfo;
          } else {
              if (pendingInfo["pool-error"] != null && pendingInfo["pool-error"].length > 0) {
                  // If there was a pool error, then the transaction has been rejected!
                  throw new Error("Transaction " + txId + " rejected - pool error: " + pendingInfo["pool-error"]);
              }
          }
      }
      await algodClient.statusAfterBlock(currentround).do();
      currentround++;
  }
}
    
  //bnb 0x2cA1655cceB43D27027e6676E880D1Ce4e7d7d18
//   let gettrans=new web3.eth.Contract(tra,'0x2cA1655cceB43D27027e6676E880D1Ce4e7d7d18');
//   let gettest=item.categoryText
//   let getaaa=new web3.eth.Contract(abi,gettest);
//     console.log("insidebutton",item.categoryText)
//     console.log("insidebuttonid",item.price)
//     console.log("insidebuttonids",item.bid)
//     const accounts = await web3.eth.getAccounts();
// //tra start
//   //  await gettrans.methods.sendss(a.addOwnerAddress).send({
//   //    from:accounts[0], 
//   //    value: web3.utils.toWei(a.addPrices, 'ether')
//   //  });

  if(item.bid === getalgo)
  {

    //console.log("Inside Amount",item.price)
    //let amountp=(item.price).replace(/^"(.+(?="$))"$/, '$1');
    //console.log("amountprint",amountp)
    alert("you are owner so you does not purchase this token")

  }
  else{

    setIsOpenss(true)

    //let getprize = null;

    //getprize = prompt("Please enter mnemonic");

    //if(getprize === null){

      //getprize = prompt("Please enter mnemonic");

    //}
    //else
    //{
      const algosdk = require('algosdk');

      // const server = "https://testnet-algorand.api.purestake.io/ps2";
      // const port = "";
      
      // const token = {
      //   'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
      // }
      
      
      // let algodclient = new algosdk.Algodv2(token, server, port);

const algodServer = 'https://testnet-algorand.api.purestake.io/ps2'
const indexerServer = 'https://testnet-algorand.api.purestake.io/idx2'
const token = { 'X-API-Key': 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin' }
const port = '';

let algodClient = new algosdk.Algodv2(token, algodServer, port);
let indexerClient = new algosdk.Indexer(token, indexerServer, port);
let accounts;
let txParamsJS;
let signedTxs;
let tx;

      AlgoSigner.connect()
.then((d) => {
  
  algodClient.healthCheck().do()
.then(d => { 

  AlgoSigner.accounts({
    ledger: 'TestNet'
  })
  .then((d) => {
    accounts = d;

    algodClient.getTransactionParams().do()
.then((d) => {
  txParamsJS = d;
  //let amountp=(item.price).replace(/^"(.+(?="$))"$/, '$1');
  //console.log("amountp",amountp)
  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: accounts[0].address,
    to: item.bid,
    amount: parseInt(item.price),
    note: undefined,
    suggestedParams: {...txParamsJS}
  });
  
  // Use the AlgoSigner encoding library to make the transactions base64
  let txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
  
  AlgoSigner.signTxn([{txn: txn_b64}])
  .then((d) => {
    signedTxs = d;

    AlgoSigner.send({
      ledger: 'TestNet',
      tx: signedTxs[0].blob
    })
    .then((d) => {
      tx = d;
      algodClient.pendingTransactionInformation(tx.txId).do()
.then(async(d) => {
  console.log(d);
  console.log("last success")
  let mnemonic=item.Mnemonic;

  //opt start 

  AlgoSigner.accounts({
    ledger: 'TestNet'
  })
  .then(async(d) => {
    let accounts = d;

    console.log("itemid",item.title)
    let changeid=item.title;
    //let program = new Uint8Array(Buffer.from("AyAEAwHFxKUO6AcyBCISRDMBECMSRDMCEiMSRDMCESQSRDMCASUORDMCFTIDEkQzAiAyAxJEI0M=", "base64"));
    //const args=[];
    //args.push([...Buffer.from((changeid.toString()))]);
    //args.push([...Buffer.from(changeid.toString())]);
    //args.push([...Buffer.from(addr2)]);
    //args.push([...Buffer.from('')]);

    //const algosdk = require('algosdk');
    
    //let lsig = algosdk.makeLogicSig(program,args);

const algodServer = 'https://testnet-algorand.api.purestake.io/ps2'
//const indexerServer = 'https://testnet-algorand.api.purestake.io/idx2'
const token = { 'X-API-Key': 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin' }
const port = '';
let note = undefined;

let algodClient = new algosdk.Algodv2(token, algodServer, port);
let  params = await algodClient.getTransactionParams().do();
params.fee = 1000;
params.flatFee = true;

//new opt
//new sent shyam ganesh

let program = new Uint8Array(Buffer.from("ASAEADoKAS0VIhJAACIvFSISQAAVLRUjEkAAAC4VIg1AAAAvFSQNQAAGLS4TQAAAJQ==", "base64"));
    const args=[];
    //args.push([...Buffer.from(idget.toString())]);
    //const args=[];
    // args.push([...Buffer.from()]);//lsig address
    // args.push([...Buffer.from('')]);//buyer address
    // args.push([...Buffer.from('')]);

  args.push([...Buffer.from('RWYPYF5XX40P2L6BCMZAA4ETP3S3HSF32QSWSGMXAU05NBJPKPHR6YCCAE')]);//lsig address
  args.push([...Buffer.from(accounts[0].address)]);//buyer address
  args.push([...Buffer.from('')]);

    let lsig = algosdk.makeLogicSig(program,args);


let ctxn = algosdk.makeAssetConfigTxnWithSuggestedParams(lsig.address(), note, 
parseInt(item.title), lsig.address(), accounts[0].address, accounts[0].address, accounts[0].address, params);        
let rawSignedTxn = algosdk.signLogicSigTransaction(ctxn,lsig).blob;
let ctx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
console.log("success optin")
let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(lsig.address(),accounts[0].address,undefined,undefined,1,undefined,parseInt(item.title),params);
let signedTxn = algosdk.signLogicSigTransaction(txn,lsig).blob;
let ctxs = (await algodClient.sendRawTransaction(signedTxn).do());
await waitForConfirmation(algodClient,ctxs.txId)



  fireDb.database().ref(`imagerefexploreoneAlgos/${item.bid}`).child(item.highestBid).remove().then(()=>{
    fireDb.database().ref(`imagerefbuy/${getalgo}`).child(item.highestBid).set({
    id:item.title,imageUrl:item.image,priceSet:item.price,cAddress:item.categoryText,keyId:item.highestBid,
    userName:"",userSymbol:"Algos",ipfsUrl:item.ipfsurl,
    ownerAddress:getalgo,soldd:item.soldd,extra1:item.extra,
    previousoaddress:item.bid,datesets:item.date,
    description:item.description,whois:'buyers',history:item.url
    //paramsdb:item.image2x,privatekey:item.category  
          }).then(()=>{
            setIsOpenss(false)
            setIsOpens(true)
            
          }) 
})
.catch((e) => {
  console.error(e);
});




//

//end new opt


//let revocationTarget = undefined;
//let closeRemainderTo = undefined;

//new asset transfer added

// let xtxn = algosdk.makeAssetTransferTxnWithSuggestedParams(lsig.address(),accounts[0].address, closeRemainderTo, revocationTarget,
//   1,  note, item.title, params);


//

//let txn = algosdk.makePaymentTxnWithSuggestedParams(lsig.address(),accounts[0].address,1,undefined,undefined,params);
     
    //let signedTxn = algosdk.signLogicSigTransaction(xtxn,lsig);
//     console.log('txn: '+ txn);
//     console.log(signedTxn);
// let txId = txn.txID().toString();
// await algodClient.sendRawTransaction(signedTxn.blob).do();
//         // Wait for confirmation
//         let confirmedTxn = await waitForConfirmation1(algodClient, txId, 4);
//         //Get the completed Transaction
//         console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
//         let mytxinfo = JSON.stringify(confirmedTxn.txn.txn, undefined, 2);
//         console.log("Transaction information: %o",JSON.stringify(mytxinfo));
//         var string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
//         console.log("Note field: ", string);  

//         console.log("transferred end")
// algodClient.getTransactionParams().do()
// .then((d) => {
//   let txParamsJS = d;
//   //document.getElementById('paramsprint').innerHTML = JSON.stringify(d);
//   const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
//     from: lsig.address(),
//     to: accounts[0].address,
//     assetIndex: parseInt(item.title),
//     note: AlgoSigner.encoding.stringToByteArray("hello"),
//     amount: 0,
//     suggestedParams: {...txParamsJS}
//   });
  
//   // Use the AlgoSigner encoding library to make the transactions base64
//   const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
  
//   AlgoSigner.signTxn([{txn: txn_b64}]) 
//   .then((d) => {
//     let signedTxs = d;
//     //signCodeElem.innerHTML = JSON.stringify(d, null, 2);
//     AlgoSigner.send({
//         ledger: 'TestNet',
//         tx: signedTxs[0].blob
//       })
//       .then((d) => {
//         let tx = d;
        //document.getElementById('opt').innerHTML = JSON.stringify(d);

        //transfer start

        
  //       const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
  //         from: lsig.address(),
  //         to: accounts[0].address,        
  //         assetIndex: parseInt(item.title),
  //         note: AlgoSigner.encoding.stringToByteArray("hello"),
  //         amount: 1,
  //         revocationTarget:undefined,
  //         closeRemainderTo:undefined,
  //         suggestedParams: {...txParamsJS}          
  //       });        

  //       const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
  
  // AlgoSigner.signTxn([{txn: txn_b64}]) 
  // .then((d) => {
  //   let signedTxs = d;
  //   //signCodeElem.innerHTML = JSON.stringify(d, null, 2);
  //   AlgoSigner.send({
  //       ledger: 'TestNet',
  //       tx: signedTxs[0].blob
  //     })
  //     .then((d) => {
  //       let tx = d;


  //       console.log("done all done ",tx)
        //   fireDb.database().ref(`imagerefexploreoneAlgos/${item.bid}`).child(item.highestBid).remove().then(()=>{
//     fireDb.database().ref(`imagerefbuy/${getalgo}`).child(item.highestBid).set({
//     id:item.title,imageUrl:item.image,priceSet:item.price,cAddress:item.categoryText,keyId:item.highestBid,
//     userName:"",userSymbol:"Algos",ipfsUrl:item.ipfsurl,
//     ownerAddress:getalgo,soldd:item.soldd,extra1:item.extra,
//     previousoaddress:item.bid,datesets:item.date,
//     description:item.description,whois:'buyers',history:item.url
//     //paramsdb:item.image2x,privatekey:item.category  
//           }).then(()=>{
//             setIsOpenss(false)
//             setIsOpens(true)
            
//           }) 
// })
// .catch((e) => {
//   console.error(e);
// });


  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });

  // })
  // .catch((e) => {
  //   console.error(e);
  // });


        //end transfer


      })
      .catch((e) => {
        console.error(e);
      });

  })
  .catch((e) => {
    console.error(e);
  });
})
.catch((e) => {
  console.error(e);
})    

//above

})
.catch((e) => {
console.error(e);
});



  //end opt




  //Mnemonic transfer start

  //       (async () => {
    
  //         let assetID= parseInt(item.title)
  //         let params = await algodClient.getTransactionParams().do();
  //         //comment out the next two lines to use suggested fee
  //         params.fee = 1000;
  //         params.flatFee = true;
  //         console.log(params);
    
  //       let sender = recoveredAccount2.addr;
  //       let recipient = recoveredAccount2.addr;
  //       console.log("sender",recoveredAccount2.addr)        
  //       // We set revocationTarget to undefined as 
  //       // This is not a clawback operation
  //       let revocationTarget = undefined
  //       // CloseReaminerTo is set to undefined as
  //       // we are not closing out an asset
  //       let closeRemainderTo = undefined
  //       // We are sending 0 assets
  //       let amount = 0;
  //       let note = AlgoSigner.encoding.stringToByteArray("nothing");    
  //       //item.title;
  //       //let params =  item.image2x;
  //       //let params = await algodClient.getTransactionParams().do();  
  //       console.log("check","287")    
  //       // signing and sending "txn" allows sender to begin accepting asset specified by creator and index
  //       let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, recipient, closeRemainderTo, revocationTarget,amount, note, assetID, params);    
  //       //let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject(sender, recipient, closeRemainderTo, revocationTarget,amount, note, assetID, params);    
        
  //       console.log("304 working")
  //       // Must be signed by the account wishing to opt in to the asset    
  //       let rawSignedTxn = opttxn.signTxn(recoveredAccount2.sk);
  //       let opttx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
  //       console.log("Transaction : " + opttx.txId);
  //       // wait for transaction to be confirmed
  //       await waitForConfirmation(algodClient, opttx.txId);
    
  //       //You should now see the new asset listed in the account information
  //       console.log("Account 3 = " + recoveredAccount2.addr);        
  //       await printAssetHolding(algodClient, recoveredAccount2.addr, assetID);
    
    
  //       console.log("opt","success")

  //       //trans

  //       params = await algodClient.getTransactionParams().do();
  //       params.fee = 1000;
  //       params.flatFee = true;
  //       sender = recoveredAccount1.addr;
  //       recipient = recoveredAccount2.addr;
  //       revocationTarget = undefined;
  //       closeRemainderTo = undefined;
  //       //Amount of the asset to transfer
  //       amount = 1;
  //       note = undefined
  //       assetID= parseInt(item.title)
  //       //params=item.image2x
        
  //       // signing and sending "txn" will send "amount" assets from "sender" to "recipient"
  //       let xtxn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, recipient, closeRemainderTo, revocationTarget,
  //         amount,  note, assetID, params);
  //         console.log("done")
  //    // Must be signed by the account sending the asset  
  //    rawSignedTxn = xtxn.signTxn(recoveredAccount1.sk)
  //    console.log("done2")
  //    let xtx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
  //    console.log("done3")
  //    console.log("Transaction : " + xtx.txId);
  //    // wait for transaction to be confirmed
  //    await waitForConfirmation(algodClient, xtx.txId);    
  //    // You should now see the 10 assets listed in the account information
  //    console.log("Account 3 = " + recoveredAccount2.addr);
  //    await printAssetHolding(algodClient, recoveredAccount2.addr, assetID);
  //    console.log("trans","success")   
  //      })().catch(e => {
  //     console.log(e);
  //     console.trace();
  // });



  //Mnemonic transfer end

  //start shyam code add below

//     let program = new Uint8Array(Buffer.from("ASAEADoKAS0VIhJAACIvFSISQAAVLRUjEkAAAC4VIg1AAAAvFSQNQAAGLS4TQAAAJQ==", "base64"));
//     const args=[];
//     args.push([...Buffer.from(item.bid)]);//owner address
//     args.push([...Buffer.from(accounts[0].address)]);//receiver address
//     args.push([...Buffer.from('')]);
    
//     let lsig = algosdk.makeLogicSig(program,args);
//     let  params = await algodClient.getTransactionParams().do();
//       params.fee = 1000;
//       params.flatFee = true;
//       let revocationTarget = undefined;
//      let closeRemainderTo = undefined;
//        let  amount = 0;
//        let note = undefined;
//        //lsig.address()
//        let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(lsig.address(), accounts[0].address, closeRemainderTo, revocationTarget,
//       amount, note, item.title, params);
  
//  let rawSignedTxn = algosdk.signLogicSigTransaction(opttxn,lsig).blob;
// let opttx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
// console.log("Transaction : " + opttx.txId);//work here now
// await waitForConfirmation(algodClient, opttx.txId);
//      //let manager = lsig.address();
//      let manager = accounts[0].address;
//      let reserve = accounts[0].address;
//      let freeze = accounts[0].address;
//      let clawback = accounts[0].address;
//      //lsig.address()
//       let ctxn = algosdk.makeAssetConfigTxnWithSuggestedParams(lsig.address(), note, 
//       item.title, manager, reserve, freeze, clawback, params);  
//       rawSignedTxn = algosdk.signLogicSigTransaction(ctxn,lsig).blob;
//       let ctx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
//       console.log("Transaction2 : " + ctx.txId);
//       await waitForConfirmation(algodClient, ctx.txId);
//       await printCreatedAsset(algodClient,item.bid, item.title);
    
//cmd above

      // await fetch(`https://nft-app-ec882-default-rtdb.firebaseio.com/NFT/${name}.json`,
      // {
      //   method:'PATCH',
      //   headers:{
      //     'CONTENT-TYPE': 'application/json',
      //   },
      //   body:JSON.stringify({
      //     'WalletAddress': accounts[0].address,
      //   })
      // }
      // );

  
  //end shyam code 
 

  
})
.catch((e) => {
  console.error(e);
});
    })
    .catch((e) => {
      console.error(e);
    });

  })
  .catch((e) => {
      console.error(e);
  });
})
.catch((e) => {
  console.error(e);
});
  // })
  // .catch((e) => {
  //   console.error(e);
  // });

// })
// .catch(e => { 
//   console.error(e); 
// });
// })
// .catch((e) => {
//   console.error(e);
// });




      //const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);


      // trans start

      // let amount = parseInt(item.price.replace(/['"]+/g, ''));
      //   console.log("conscheck",amount)

       //const myAlgoWallet = new MyAlgo();

      // (async () => {
      //   try {
      
      //     let txn = await algodclient.getTransactionParams().do();
            
      //     txn = {
      //       ...txn,
      //       fee: 1000,
      //       flatFee: true,
      //       type: 'pay',
      //       from: getalgo,
      //       to:  item.bid,
      //       amount: amount,
      //       note: new Uint8Array(Buffer.from('paid'))
      //     };
        
      //     let signedTxn = await myAlgoWallet.signTransaction(txn);
      //     console.log(signedTxn.txID);
        
      //     await algodclient.sendRawTransaction(signedTxn.blob).do();
      
        
      //   } catch(err) {
      //     console.error(err); 
      //   }
      // })();

//wallet asset transfer start


// (async () => {
//   try {

//     let txn = await algodclient.getTransactionParams().do();
      
//     txn = {
//       ...txn,
//       fee: 1000,
//       flatFee: true,
//       type: 'axfer',
//       assetIndex: item.title,
//       from: ,
//       to:  getalgo,
//       amount: item.price,
//       note: new Uint8Array(Buffer.from('transfer'))
//     };
  
//     let signedTxn = await myAlgoWallet.signTransaction(txn);
//     console.log(signedTxn.txID);
  
//     await algodclient.sendRawTransaction(signedTxn.blob).do();

  
//   } catch(err) {
//     console.error(err); 
//   }
// })();


//wallet asset transfer end

// trans end

      //console.log("algodclient",algodclient)
      

          //console.log("164")

      //algo transfer

    //   (async() => {

    //     let params = await algodclient.getTransactionParams().do();    
        
    //     var mnemonic = getprize; 
    //     var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic); 
        
    //     let txn = {
    //         "from": recoveredAccount.addr,
    //         "to": item.bid,
    //         "fee": 1,
    //         "amount": amount,
    //         "firstRound": params.firstRound,
    //         "lastRound": params.lastRound,
    //         "genesisID": params.genesisID,
    //         "genesisHash": params.genesisHash,
    //         "note": new Uint8Array(0),
    //     };
    //     console.log(txn);
    
    //     let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
    //     let sendTx = await algodclient.sendRawTransaction(signedTxn.blob).do();
    
    //     console.log("Transaction",sendTx.txId);
    // })().catch(e => {
    //     console.log(e);
    // }); 
    
      //algo transfer
      //start money transfer here and opt and transfer algos

    // const waitForConfirmation = async function (algodclient, txId) {
    //   let response = await algodclient.status().do();
    //   let lastround = response["last-round"];
    //   while (true) {
    //       const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
    //       if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
    //           //Got the completed Transaction
    //           console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
    //           break;
    //       }
    //       lastround++;
    //       await algodclient.statusAfterBlock(lastround).do();
    //   }
    // };
    
    
    // Function used to print created asset for account and assetid
    // const printCreatedAsset = async function (algodclient, account, assetid) {
    //   // note: if you have an indexer instance available it is easier to just use this
    //   //     let accountInfo = await indexerClient.searchAccounts()
    //   //    .assetID(assetIndex).do();
    //   // and in the loop below use this to extract the asset for a particular account
    //   // accountInfo['accounts'][idx][account]);
    //   let accountInfo = await algodclient.accountInformation(account).do();
    //   for (let idx = 0; idx < accountInfo['created-assets'].length; idx++) {
    //       let scrutinizedAsset = accountInfo['created-assets'][idx];
    //       if (scrutinizedAsset['index'] === assetid) {
    //           console.log("AssetID = " + scrutinizedAsset['index']);
    //           let myparms = JSON.stringify(scrutinizedAsset['params'], undefined, 2);
    //           console.log("parms = " + myparms);
    //           break;
    //       }
    //   }
    // };
    // Function used to print asset holding for account and assetid
    // const printAssetHolding = async function (algodclient, account, assetid) {
    //   // note: if you have an indexer instance available it is easier to just use this
    //   //     let accountInfo = await indexerClient.searchAccounts()
    //   //    .assetID(assetIndex).do();
    //   // and in the loop below use this to extract the asset for a particular account
    //   // accountInfo['accounts'][idx][account]);
    //   let accountInfo = await algodclient.accountInformation(account).do();
    //   for (let idx = 0; idx < accountInfo['assets'].length; idx++) {
    //       let scrutinizedAsset = accountInfo['assets'][idx];
    //       if (scrutinizedAsset['asset-id'] === assetid) {
    //           let myassetholding = JSON.stringify(scrutinizedAsset, undefined, 2);
    //           console.log("assetholdinginfo = " + myassetholding);
    //           break;
    //       }
    //   }
    // };
    
    
    // var account1_mnemonic = "canal enact luggage spring similar zoo couple stomach shoe laptop middle wonder eager monitor weather number heavy skirt siren purity spell maze warfare ability ten";
    // var account2_mnemonic = "beauty nurse season autumn curve slice cry strategy frozen spy panic hobby strong goose employ review love fee pride enlist friend enroll clip ability runway";

    //cmd now

  //   var account3_mnemonic =  getprize;
    
  //   var recoveredAccount1 = algosdk.mnemonicToSecretKey(item.category);
  //   var recoveredAccount2 = algosdk.mnemonicToSecretKey(item.category);
  //   var recoveredAccount3 = algosdk.mnemonicToSecretKey(account3_mnemonic);
  //   console.log(recoveredAccount1.addr);
  //   console.log(recoveredAccount2.addr);
  //   console.log(recoveredAccount3.addr);
    
  //   // Instantiate the algod wrapper
    
    
    
  //       (async () => {
    
  //       //params = await algodclient.getTransactionParams().do();
  //       //comment out the next two lines to use suggested fee
  //       //params.fee = 1000;
  //       //params.flatFee = true;
    
  //       let sender = recoveredAccount3.addr;
  //       let recipient = sender;
  //       // We set revocationTarget to undefined as 
  //       // This is not a clawback operation
  //       let revocationTarget = undefined;
  //       // CloseReaminerTo is set to undefined as
  //       // we are not closing out an asset
  //       let closeRemainderTo = undefined;
  //       // We are sending 0 assets
  //       let amount = 0;
  //       let note = undefined;
  //       let assetID= item.title
  //       //item.title;
  //       //let params =  item.image2x;

  //       let params = await algodclient.getTransactionParams().do();
    

  //       console.log("check","287")
    
  //       // signing and sending "txn" allows sender to begin accepting asset specified by creator and index
  //       let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, recipient, closeRemainderTo, revocationTarget,
  //            amount, note, assetID, params);
    
  //       // Must be signed by the account wishing to opt in to the asset    
  //       let rawSignedTxn = opttxn.signTxn(recoveredAccount3.sk);
  //       let opttx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
  //       console.log("Transaction : " + opttx.txId);
  //       // wait for transaction to be confirmed
  //       //await waitForConfirmation(algodclient, opttx.txId);
    
  //       //You should now see the new asset listed in the account information
  //       console.log("Account 3 = " + recoveredAccount3.addr);
  //       //await printAssetHolding(algodclient, recoveredAccount3.addr, assetID);
    
    
  //       console.log("opt","success")

  //       //trans
    
  //       sender = recoveredAccount1.addr;
  //       recipient = recoveredAccount3.addr;
  //       revocationTarget = undefined;
  //       closeRemainderTo = undefined;
  //           //Amount of the asset to transfer
  //       amount = 1;
  //       note = undefined
  //       assetID= item.title
  //       //params=item.image2x

  //       //let params = await algodclient.getTransactionParams().do();
        
    
  //       // signing and sending "txn" will send "amount" assets from "sender" to "recipient"
  //       let xtxn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, recipient, closeRemainderTo, revocationTarget,
  //         amount,  note, assetID, params);
  //    // Must be signed by the account sending the asset  
  //    rawSignedTxn = xtxn.signTxn(recoveredAccount1.sk)
  //    let xtx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
  //    console.log("Transaction : " + xtx.txId);
  //    // wait for transaction to be confirmed
  //    //await waitForConfirmation(algodclient, xtx.txId);
    
  //    // You should now see the 10 assets listed in the account information
  //    console.log("Account 3 = " + recoveredAccount3.addr);
  //    //await printAssetHolding(algodclient, recoveredAccount3.addr, assetID);

  //    console.log("trans","success")

  //    fireDb.database().ref(`imagerefexploreoneAlgos/${item.bid}`).child(item.highestBid).remove().then(()=>{

  //     if(getprodata.displayname === null){
  
  //       fireDb.database().ref(`imagerefbuy/${getalgo}`).child(item.highestBid).set({
  
  
  //   id:item.title,imageUrl:item.image,priceSet:item.price,cAddress:item.categoryText,keyId:item.highestBid,
  //   userName:"",userSymbol:"Algos",ipfsUrl:item.ipfsurl,
  //   ownerAddress:getalgo,soldd:item.soldd,extra1:item.extra,
  //   previousoaddress:item.previousaddress,datesets:item.date,
  //   description:item.description,whois:'buyers',history:item.url,paramsdb:item.image2x,privatekey:item.category
  
  
  //         }).then(()=>{
  //           setIsOpenss(false)
  //           setIsOpens(true)
            
  //         }) 
  
  //     }else{
  
  //       console.log("itemid",item.title)
  //       console.log("itemimage",item.image)
  //       console.log("itemprice",item.price)
  //       console.log("itemcAddress",item.categoryText)
  //       console.log("itemkeyid",item.highestBid)
  //       console.log("itemusername",getprodata.username)
  //       console.log("itempreaddress",item.bid)
  //       console.log("itemacc",getalgo)
        
  
  //       fireDb.database().ref(`imagerefbuyAlgos/${getalgo}`).child(item.highestBid).set({
  
  //   id:item.title,imageUrl:item.image,priceSet:item.price,cAddress:item.categoryText,keyId:item.highestBid,
  //   userName:"",userSymbol:"Algos",ipfsUrl:item.ipfsurl,
  //   ownerAddress:getalgo,soldd:item.soldd,extra1:item.extra,
  //   previousoaddress:item.previousaddress,datesets:item.date,
  //   description:item.description,whois:'buyers',history:item.url,paramsdb:item.image2x,privatekey:item.category
          
  
  //         }).then(()=>{
  //           setIsOpenss(false)
  //           setIsOpens(true)
            
  //           //window.location.reload(false)   
  //         }) 
  
  //     }
  
  //    //alert("amount has been sent")
  // //end trans 
  //    //let thing = a.addIds; 
  //    //let s = await getaaa.methods.items(thing).call(); 
  //    //console.log("sget",s) 
  //    //let state = a.addPrices;       
  //   })    
    
    

  //   })().catch(e => {
  //     console.log(e);
  //     console.trace();
  // });


  

    //end money transfer here and opt and transfer algos

    //}   
//  } 


      }

      
  }  
  }

  //history function
  const viewhistory=()=>{

    console.log("viewhistory inside");
    setIsOpen(true)
    let get=[];
    // get=item.url;

    get.push({
      address:item.url,
      asset:item.title
    })

    sethistorydb(get)
    
    console.log("gettt",get)

    // setIsOpen(true)

    }

  

  return (
    <>
    <div className={cn(styles.card, className)}>
      <div className={styles.preview}>
        
        <img srcSet={`${item.image2x} 2x`} src={item.image} alt="Card" />
        <div className={styles.control}>
          <div
            className={cn(
              { "status-green": item.category === "green" },
              styles.category
            )}
          >
            {item.categoryText}
          </div>
          <button
            className={cn(styles.favorite, { [styles.active]: visible })}
            onClick={addlikedb}
            // ()=>setVisible(!visible)
          >
            <Icon name="heart" size="20" />
          </button>
          {/* <button className={cn("button-small", styles.button)} onClick={saledbset}>
            <span>Place a sale</span>
            <Icon name="scatter-up" size="16" />
          </button> */}
        </div>
        
      </div>
      <br></br>
      {item.price ? (
<>
<TextInput
                      className={styles.field}
                      label="Mnemonic"
                      name="Mnemonic"
                      type="text"
                      placeholder="Enter Your Mnemonic"
                      required
                      onChange={event => setMnemo(event.target.value)}
                    />
                    <br></br>      
      <button className={cn("button-small")} onClick={updatepricedb}>
      <span>Buy</span>
      {/* <Icon name="scatter-up" size="16" /> */}
    </button>
    </>
      )
    :
    (
    <></>
    )
    //   <button className={cn("button-small")} onClick={setpricedb}>
    //         <span>Price set</span>
    //         {/* <Icon name="scatter-up" size="16" /> */}
    //       </button>        
}
      <Link className={styles.link} to={item.url}>
        <div className={styles.body}>
          <div className={styles.line}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.price}>{item.price}</div>
            
          </div>
          <div className={styles.line}>
            <div className={styles.users}>
              {item.users.map((x, index) => (
                <div className={styles.avatar} key={index}>
                  <img src={x.avatar} alt="Avatar" onClick={viewhistory}/>
                  
                </div>
              ))}
            </div>
            <div className={styles.counter}>{item.counter}</div>
          </div>
        </div>
        <div className={styles.foot}>
          <div className={styles.status}>
            
            
            {/* <Icon name="candlesticks-up" size="20" ></Icon> */}
            {/* <button type="button">set price</button> */}
            
            
            {/* Highest bid <span>{item.highestBid}</span> */}
          </div>
          {/* <div
            className={styles.bid}
            dangerouslySetInnerHTML={{ __html: item.bid }}
          /> */}
        </div>
      </Link>
    </div>
    <Modald visible={isOpen} onClose={() => setIsOpen(false)}>
    <FolowStepsd className={styles.steps} viewhistory={historydb}/>
  </Modald>

  <Modald visible={isOpens} onClose={() => setIsOpens(false)}>
<FolowStepsdr className={styles.steps} onSub={()=>onSub}/>
</Modald>

<Modald visible={isOpenss} >
<FolowStepss className={styles.steps} onSub={()=>onSub}/>
</Modald>

    </>
  );
};

export default CardBuy;
