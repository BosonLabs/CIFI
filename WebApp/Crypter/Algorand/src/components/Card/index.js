/* global AlgoSigner */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";
import fireDb from "../../screens/UploadDetails/firebase";
import axios from 'axios';
import FolowStepsd from "./FolowStepsd";
import Modald from "../../components/ModalD";
import web3 from '../../screens/./UploadDetails/web3';
import {abi} from './data'
//import Modald from "../../components/ModalD";
import FolowStep from "../../screens/Profile/FolowStep";
import FolowSteps from "../../screens/Profile/FolowSteps";
import TextInput from "../../components/TextInput";
const Card = ({ className, item }) => {
  const [urlprize,setUrlprize] = useState(null);
  let history=useHistory();
  const [isOpens, setIsOpens] = useState(false);
  const [isOpenss, setIsOpenss] = useState(false);
  const [visible, setVisible] = useState(false);
  const [historydb, sethistorydb] = useState([]);
  console.log("hist",historydb)
  //const [historydbasset, sethistorydbasset] = useState([]);
  //console.log("histasset",historydbasset)
  const [isOpen, setIsOpen] = useState(false)


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


  async function waitForAlgosignerConfirmationtest(tx) {
    console.log(`Transaction ${tx.txId} waiting for confirmation...`);
    let status = await AlgoSigner.algod({
      ledger: 'TestNet',
      path: '/v2/transactions/pending/' + tx.txId
    });  
    while(true) {
      if(status['confirmed-round'] !== null && status['confirmed-round'] > 0) {
        //Got the completed Transaction
        console.log(`Transaction confirmed in round ${status['confirmed-round']}.`);
        break;
      }  
      status = await AlgoSigner.algod({
        ledger: 'TestNet',
        path: '/v2/transactions/pending/' + tx.txId
      });
    }    
    return tx;
  }

  async function waitForAlgosignerConfirmationmain(tx) {
    console.log(`Transaction ${tx.txId} waiting for confirmation...`);
    let status = await AlgoSigner.algod({
      ledger: 'MainNet',
      path: '/v2/transactions/pending/' + tx.txId
    });  
    while(true) {
      if(status['confirmed-round'] !== null && status['confirmed-round'] > 0) {
        //Got the completed Transaction
        console.log(`Transaction confirmed in round ${status['confirmed-round']}.`);
        break;
      }  
      status = await AlgoSigner.algod({
        ledger: 'MainNet',
        path: '/v2/transactions/pending/' + tx.txId
      });
    }    
    return tx;
  }

  const addlikedb=async()=>{
    if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === ''){

    }else{    
    let getalgo=localStorage.getItem("wallet");
    console.log("addlikedb function call");    
    fireDb.database().ref(`imagereflikes/${getalgo}`).child(item.highestBid).set({
      id:item.title,imageUrl:item.image,priceSet:item.price,cAddress:item.categoryText,keyId:item.highestBid,
      userName:item.counter,userSymbol:"Algos",ipfsUrl:item.ipfsurl,
      ownerAddress:item.bid,soldd:item.soldd,extra1:item.extra,
      previousoaddress:item.previousaddress,datesets:item.date,
      description:item.description,whois:'likes',history:item.url,Mnemonic:item.Mnemonic
      //,paramsdb:item.image2x,privatekey:item.category
      }).then(()=>{
        setVisible(!visible)
        window.location.reload(false)   
      });    
  }
  }
  const setpricedb =async()=>{
    console.log("iitem",item)
    console.log("ititem",item.price)
    if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === ''){

      }
    else{      
      setIsOpens(true)
      let getalgo=localStorage.getItem("wallet");
      console.log("1",item.bid)
      console.log("2",item.highestBid)
      console.log("3",item.category)
      console.log("4",item.image2x)
      console.log("5",item.title)
      console.log("6",item.categoryText)
      console.log("7",item.counter)
      console.log("8",item.image2x)
    const algosdk = require('algosdk');
    let idget="";
    const port = "";  
      if(localStorage.getItem("net") === "mainnet"){
    const server = "https://mainnet-algorand.api.purestake.io/ps2";      
    const token = {
      'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
    }
    let indexerClient = new algosdk.Indexer(token, server, port);
    (async()=> {
      //const txnInfo2 =  await indexerClient.searchForTransactions().txid('H6QGCDZGS64ZD6SXYUHQKFEG5CTF4VB3JCCT4WAGWRH2LTY7UV3A').do()
      //console.log(txnInfo2)
      let txnInfo =  await indexerClient.searchForTransactions().txid(item.categoryText).do();      
      console.log(txnInfo)
      idget=txnInfo.transactions[0]["created-asset-index"];
      console.log("assetidget",txnInfo.transactions[0]["created-asset-index"])  
      console.log("end")  
      setIsOpens(true)
      fireDb.database().ref(`imagerefexploreoneAlgos/${getalgo}`).child(item.highestBid).set({
        id:idget,imageUrl:item.image,priceSet:item.price,cAddress:item.categoryText,keyId:item.highestBid,
        userName:item.counter,userSymbol:"Algos",ipfsUrl:item.ipfsurl,
        ownerAddress:item.bid,soldd:item.soldd,extra1:item.extra,
        previousoaddress:item.previousaddress,datesets:item.date,
        description:item.description,whois:'readytosale',history:item.url,Mnemonic:item.Mnemonic
      }).then(()=>{
        fireDb.database().ref(`imagerefAlgo/${getalgo}`).child(item.highestBid).remove();
          console.log("remove db");
          setIsOpens(false)
          window.location.reload(false)   
      })    
    })().catch(e => {
        console.log(e);
    });  
      }
      else{

        if(urlprize === "" || urlprize === null)
        {

          alert("please enter prize...")
        }else{
          const token = {
            'X-API-Key': 'U5ivl9nv603lYUBRN3sHH5g0AzCwsetC7OAtYj9D'
           };
          const server = "https://testnet-algorand.api.purestake.io/ps2";
          const port = "";
          let algodclient = new algosdk.Algodv2(token, server, port);
          let params = await algodclient.getTransactionParams().do();
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
    // comment out the next two lines to use suggested fee
    params.fee = 1000;
    params.flatFee = true;
    let firstAcc;
    //let creatorAccount = algosdk.mnemonicToSecretKey("output rocket fashion claw define win sudden all purpose wall group idea half chalk caught sound inquiry sheriff conduct burst miracle stand wink about grape");
  
    AlgoSigner.connect()
  .then((d) => {
  AlgoSigner.accounts({
  ledger: 'TestNet'
  })
  .then(async(d) => {
  let accounts = d;
  firstAcc = localStorage.getItem("wallet");
  let senderCallapp = firstAcc;
  let index = item.applicationid;//40791643;//appid
  console.log("creator account", senderCallapp)
  //console.log(lsig.address())
  let appArgs = [];
  appArgs.push(new Uint8Array (Buffer.from("S")));
  appArgs.push(algosdk.encodeUint64(Number(parseInt((urlprize)))));
  // let accArgs = [];
  // accArgs.push(lsig.address());
  let tx1 = algosdk.makeApplicationNoOpTxn(senderCallapp, params, index, appArgs);
  let senderTx2 = firstAcc;
  let receiverTx2 = item.escrowaddress;  //"5PXX6TXPQVB6P7J67TEIGEG2DZVXOZDBPYTAJ62RP457DMXELGMMKFJCBU";
  let nft_id = item.title;//40789121;//assetid
  let tx2Amount =1;
  let closeRemainderTo = undefined;
  let  revocationTarget = undefined;
  let note = undefined;
  let tx2 = algosdk.makeAssetTransferTxnWithSuggestedParams(senderTx2, receiverTx2, closeRemainderTo, revocationTarget, tx2Amount, note, nft_id, params);
  console.log("after tx2");
  let txns = [tx1, tx2];
    // Group both transactions
    let txgroup = algosdk.assignGroupID(txns);
    console.log(txgroup)
  //changes
    let txn_b64_1 = tx1.toByte();
    let txn_b64_2 = tx2.toByte();  
    let base64Txs1 = AlgoSigner.encoding.msgpackToBase64(txn_b64_1);
    let base64Txs2 = AlgoSigner.encoding.msgpackToBase64(txn_b64_2);
    let signedTxs = await AlgoSigner.signTxn([
      {
        txn: base64Txs1,
      },
      {
        txn: base64Txs2,
      }
    ]);
    console.log("logic",signedTxs)
    //let rawSignedTxn2 = algosdk.signLogicSigTransactionObject(tx2, lsig);
    //let rawSignedTxn3 = algosdk.signLogicSigTransactionObject(tx3, lsig);
    let binarySignedTxs1 =  AlgoSigner.encoding.base64ToMsgpack(signedTxs[0].blob);
    let binarySignedTxs2 =  AlgoSigner.encoding.base64ToMsgpack(signedTxs[1].blob);
    //let binarySignedTxs = signedTxs.map((txn) => AlgoSigner.encoding.base64ToMsgpack(txn[0].blob));
    let signArr = [binarySignedTxs1, binarySignedTxs2];
    //console.log("signed",rawSignedTxn2.blob)
    let trans = await algodclient.sendRawTransaction(signArr).do();
     console.log("Send complete");
  //   console.log("txID", trans);
     console.log("id", trans.txId);
   await waitForConfirmation(algodclient, trans.txId);
    console.log("signed")
  
    
  
        //setdb code added here
        fireDb.database().ref(`imagerefAlgo/${getalgo}`).child(item.highestBid).update({
          id:item.title,imageUrl:item.image,priceSet:urlprize,cAddress:item.categoryText,keyId:item.highestBid,
          userName:item.counter,userSymbol:"Algos",ipfsUrl:item.ipfsurl,
          ownerAddress:item.bid,soldd:item.soldd,extra1:item.extra,
          previousoaddress:item.previousaddress,datesets:item.date,
          description:item.description,whois:'readytosale',history:item.url,Mnemonic:item.Mnemonic,applicationid:item.applicationid,usdcids:item.usdcids,escrowaddress:item.escrowaddress
        
        }).then(()=>{  
        setIsOpens(false);
        setIsOpenss(true)    
        })
  
  
  
    // Sign each transaction in the group 
    // let signedTx1 = tx1.signTxn( creatorAccount.sk );
    // let signedTx2 = algosdk.signLogicSigTransaction( tx2, lsig );
    // let signedTx3 = algosdk.signLogicSigTransaction( tx3, lsig );
  
    // // Combine the signed transactions
    // let signed = []
    // signed.push( signedTx1 )
    // signed.push( signedTx2 )
    // signed.push( signedTx3 )
  
    // let tx = (await algodclient.sendRawTransaction(signed).do());
  
    // console.log("Transaction : " + tx.txId);
  
    // // Wait for transaction to be confirmed
    // await waitForConfirmation(algodclient, tx.txId)
  })
  .catch((e) => {
  console.error(e);
  });
  })
  .catch((e) => {
  console.error(e);
  });
  
  
  
         
      //     const baseServer = "https://testnet-algorand.api.purestake.io/idx2";
      // const token = {
      //   'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
      // }
      // let indexerClient = new algosdk.Indexer(token, baseServer, port);
      // (async()=> {
      //   //const txnInfo2 =  await indexerClient.searchForTransactions().txid('H6QGCDZGS64ZD6SXYUHQKFEG5CTF4VB3JCCT4WAGWRH2LTY7UV3A').do()
      //   //console.log(txnInfo2)
      //   let txnInfo =  await indexerClient.searchForTransactions().txid(item.categoryText).do();      
      //   console.log(txnInfo)
      //   idget=txnInfo.transactions[0]["created-asset-index"];
      //   console.log("assetidget",txnInfo.transactions[0]["created-asset-index"])  
      //   console.log("end")  
        
      //   //ended here
            
      // })().catch(e => {
      //     console.log(e);
      // });        

        }
     
      }                
  }
}

  const saledbset=async()=>{

    if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === ''){

      alert("nothing")
    }
    else{  
    setIsOpens(true)  
    let getalgo=localStorage.getItem("wallet");
    console.log("checkowner",item.title)
    console.log("checkowners",getalgo)
    if(getalgo === item.bid)
    {
    if(localStorage.getItem("net") === "mainnet"){
      fireDb.database().ref(`imagerefexploreoneAlgos/${getalgo}`).child(item.highestBid).set({
        id:item.title,imageUrl:item.image,priceSet:item.price,cAddress:item.categoryText,keyId:item.highestBid,
        userName:item.counter,userSymbol:"Algos",ipfsUrl:item.ipfsurl,
        ownerAddress:item.bid,soldd:item.soldd,extra1:item.extra,
        previousoaddress:item.previousaddress,datesets:item.date,
        description:item.description,whois:'readytosale',history:item.url,Mnemonic:item.Mnemonic,
        applicationid:item.applicationid,usdcids:item.usdcids,escrowaddress:item.escrowaddress
      }).then(()=>{
        fireDb.database().ref(`imagerefAlgo/${getalgo}`).child(item.highestBid).remove();
          console.log("remove db");
          setIsOpens(false)
          window.location.reload(false)   
      })
    }
    else{
      fireDb.database().ref(`imagerefexploreoneAlgos/${getalgo}`).child(item.highestBid).set({
        id:item.title,imageUrl:item.image,priceSet:item.price,cAddress:item.categoryText,keyId:item.highestBid,
        userName:item.counter,userSymbol:"Algos",ipfsUrl:item.ipfsurl,
        ownerAddress:item.bid,soldd:item.soldd,extra1:item.extra,
        previousoaddress:item.previousaddress,datesets:item.date,
        description:item.description,whois:'readytosale',history:item.url,Mnemonic:item.Mnemonic,
        applicationid:item.applicationid,usdcids:item.usdcids,escrowaddress:item.escrowaddress
      }).then(()=>{
        fireDb.database().ref(`imagerefAlgo/${getalgo}`).child(item.highestBid).remove();
          console.log("remove db");
          setIsOpens(false)
          window.location.reload(false)   
      })
    }
  }
}
          
  //})
  // .catch((e) => 
  // { 
  //     // handle errors and perform error cleanup here
  //     console.error(e); 
  // });


    //   const baseServer = "https://testnet-algorand.api.purestake.io/idx2";
    // const token = {
    //   'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
    // }
    // let indexerClient = new algosdk.Indexer(token, baseServer, port);
    
    // (async()=> {
    //   //const txnInfo2 =  await indexerClient.searchForTransactions().txid('H6QGCDZGS64ZD6SXYUHQKFEG5CTF4VB3JCCT4WAGWRH2LTY7UV3A').do()
    //   //console.log(txnInfo2)
    //   let txnInfo =  await indexerClient.searchForTransactions().txid(item.categoryText).do();      
    //   console.log(txnInfo)
    //   idget=txnInfo.transactions[0]["created-asset-index"];
    //   console.log("assetidget",txnInfo.transactions[0]["created-asset-index"])  
    //   console.log("end")  
    //   console.log("setitem",item)
    //   console.log("settitem",item.price)


    //   //shyam send code


    //   const waitForConfirmation = async function (algodclient, txId) {
    //     let response = await algodclient.status().do();
    //     let lastround = response["last-round"];
    //     while (true) {
    //         const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
    //         if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
    //             console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
    //             break;
    //         }
    //         lastround++;
    //         await algodclient.statusAfterBlock(lastround).do();
    //     }
    // };


// AlgoSigner.connect()
// .then(async(d) => {
//   AlgoSigner.accounts({
//     ledger: 'TestNet'
//   })
//   .then(async(d) => {
// let accounts =d;
//     console.log("238")
//   const algosdk = require('algosdk');
//   //const baseServer = "https://testnet-algorand.api.purestake.io/idx2";
//   const algodServer = 'https://testnet-algorand.api.purestake.io/ps2'
//   const port = "";
//   const token = {
  
//       'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
//   }
//   //let algodClient = new algosdk.Algodv2(token, baseServer, port);
//   let algodClient = new algosdk.Algodv2(token, algodServer, port);
//   console.log("247")

//   setIsOpens(true);

// //let params=algodClient.getTransactionParams().do()
// //.then(async(d) => {
// let  params = await algodClient.getTransactionParams().do();
//   //comment out the next two lines to use suggested fee
//   params.fee = 1000;
//   params.flatFee = true;

//   let note =undefined;
//   console.log("254")
//   let account3_mnemonic = "ability awesome abandon photo acoustic ensure awful banana amount marine nurse candy cattle avoid pool code glance embrace cactus abandon foster luxury harbor abandon pony"
// let recoveredAccount3 = algosdk.mnemonicToSecretKey(account3_mnemonic);
//   let program = new Uint8Array(Buffer.from("ASAEADoKAS0VIhJAACIvFSISQAAVLRUjEkAAAC4VIg1AAAAvFSQNQAAGLS4TQAAAJQ==", "base64"));
//   const args=[];
//   //args.push([...Buffer.from(idget.toString())]);
//   //const args=[];
//   args.push([...Buffer.from(localStorage.getItem("wallet"))]);//creator address
//   args.push([...Buffer.from('RWYPYF5XX40P2L6BCMZAA4ETP3S3HSF32QSWSGMXAU05NBJPKPHR6YCCAE')]);//lsig address
//   args.push([...Buffer.from('')]);

//   let lsig = algosdk.makeLogicSig(program,args);
//   lsig.sign(recoveredAccount3.sk);
// //let ctxn = algosdk.makeAssetConfigTxnWithSuggestedParams(localStorage.getItem("wallet"), note, 
// //parseInt(idget), lsig.address(), lsig.address(), lsig.address(), lsig.address(), params);        
// console.log("275")
// //let rawSignedTxn = algosdk.signLogicSigTransaction(ctxn,lsig).blob;
// console.log("277")
// //let ctx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
// console.log("279")
// //let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(localStorage.getItem("wallet"),lsig.address(),undefined,undefined,1,undefined,parseInt(idget),params);     
// //let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(item.bid,localStorage.getItem("wallet"),undefined,undefined,1,undefined,parseInt(item.title),params);
// //console.log("282",txn)
// //new logic ram
// let assetID = Number(parseInt(idget));


//     params = await algodClient.getTransactionParams().do();
//     //comment out the next two lines to use suggested fee
//     params.fee = 1000;
//     params.flatFee = true;

//     let sender = recoveredAccount3.addr;
//     let recipient = sender;
//     // We set revocationTarget to undefined as 
//     // This is not a clawback operation
//     let revocationTarget = undefined;
//     // CloseReaminerTo is set to undefined as
//     // we are not closing out an asset
//     let closeRemainderTo = undefined;
//     // We are sending 0 assets
//     let amount = 0;

//     // signing and sending "txn" allows sender to begin accepting asset specified by creator and index
//     let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, recipient, closeRemainderTo, revocationTarget,
//          amount, note, assetID, params);
//          let rawSignedTxn = opttxn.signTxn(recoveredAccount3.sk);
//          let opttx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
//     console.log("Transaction : " + opttx.txId);
//     // wait for transaction to be confirmed
//     await waitForConfirmation(algodClient, opttx.txId);
//     //You should now see the new asset listed in the account information
//     console.log("Account 3 = " + recoveredAccount3.addr); 
//     await printAssetHolding(algodClient, recoveredAccount3.addr, assetID);

//     //transfer
//     let assetId = Number(parseInt(idget));
// let from = localStorage.getItem("wallet")
// let to = recoveredAccount3.addr
// amount = 1
// note = undefined

//  AlgoSigner.algod({ 
//         ledger: 'TestNet', 
//         path: '/v2/transactions/params'
//     })
//     .then((txParams) => AlgoSigner.sign({
//       assetIndex: assetId,
//         from: from,
//         to: to,
//         amount: +amount,
//         note: note,
//         type: 'axfer',
//         fee: txParams['min-fee'],
//         firstRound: txParams['last-round'],
//         lastRound: txParams['last-round'] + 1000,
//         genesisID: txParams['genesis-id'],
//         genesisHash: txParams['genesis-hash'],
//         flatFee: true
//     })) 
//     .then((signedTx) => AlgoSigner.send({ 
//         ledger: 'TestNet', 
//         tx: signedTx.blob 
//     }))
//     // wait for confirmation from the blockchain
//     .then((tx) => waitForAlgosignerConfirmationtest(tx)) // see algosignerutils.js
//     .then((tx) => {
//         // our transaction was successful, we can now view it on the blockchain 
//         console.log("success",tx)
        
        

// //end logic ram
// //start new code 
// //console.log(accounts)
// //let getacc=lsig.sign(accounts[1].address);
// // let ctxn = algosdk.makeAssetConfigTxnWithSuggestedParams(lsig.address(), note, 
// // parseInt(idget), lsig.address(), localStorage.getItem("wallet"), localStorage.getItem("wallet"), localStorage.getItem("wallet"), params);        
// // let rawSignedTxn = algosdk.signLogicSigTransaction(ctxn,lsig).blob;
// // let ctx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
// // console.log("success optin")
// // //assetId = Number(parseInt(idget))
// // let from = localStorage.getItem("wallet"); 
// // let to = lsig.address(); 
// // let amount = 1; 
// // //let note = undefined; 

// // AlgoSigner.algod({ 
// //         ledger: 'TestNet', 
// //         path: '/v2/transactions/params'
// //     })
// //     .then((txParams) => AlgoSigner.sign({
// //       assetIndex: Number(parseInt(idget)),
// //         from: from,
// //         to: to,
// //         amount: +amount,
// //         note: note,
// //         type: 'axfer',
// //         fee: txParams['min-fee'],
// //         firstRound: txParams['last-round'],
// //         lastRound: txParams['last-round'] + 1000,
// //         genesisID: txParams['genesis-id'],
// //         genesisHash: txParams['genesis-hash'],
// //         flatFee: true
// //     })) 
// //     .then((signedTx) => AlgoSigner.send({ 
// //         ledger: 'TestNet', 
// //         tx: signedTx.blob 
// //     }))
// //     // wait for confirmation from the blockchain
// //     .then((tx) => waitForAlgosignerConfirmationtest(tx)) // see algosignerutils.js
// //     .then((tx) => {
// //         // our transaction was successful, we can now view it on the blockchain 
// //         console.log("transfer success",tx)
// //         fireDb.database().ref(`imagerefAlgo/${getalgo}`).child(item.highestBid).update({
// //           id:idget,imageUrl:item.image,priceSet:urlprize,cAddress:item.categoryText,keyId:item.highestBid,
// //             userName:item.counter,userSymbol:"Algos",ipfsUrl:item.ipfsurl,
// //             ownerAddress:item.bid,soldd:item.soldd,extra1:item.extra,
// //             previousoaddress:item.previousaddress,datesets:item.date,
// //             description:item.description,whois:'readytosale',history:item.url,Mnemonic:item.Mnemonic
          
// //           }).then(()=>{  
// //           setIsOpens(false);
// //           setIsOpenss(true)    
// //           })
// //       })
// //       .catch((e) => {
// //         console.error(e);
// //       })

// // let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(localStorage.getItem("wallet"),lsig.address(),undefined,undefined,1,undefined,parseInt(idget),params);
// // let signedTxn = algosdk.signLogicSigTransaction(txn,lsig).blob;
// // let ctxs = (await algodClient.sendRawTransaction(signedTxn).do());
// // await waitForConfirmation(algodClient,ctxs.txId)


      

// //end new code


// // const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
// // AlgoSigner.signTxn([{txn: txn_b64}]) 
// // .then((d) => {
// //   let signedTxs = d;
// //   console.log("289",signedTxs)
// //   //signCodeElem.innerHTML = JSON.stringify(d, null, 2);
// //   AlgoSigner.send({
// //     ledger: 'TestNet',
// //     tx: signedTxs[0].blob
// //   })
// //   .then((d) => {
// //     let tx = d;
// //     console.log("282")
  
    
  
// //   })
// //   .catch((e) => {
// //     console.error(e);
// //   });
  

// // })
// // .catch((e) => {
// //   console.error(e);
// // });


// // algodClient.getTransactionParams().do()
// // .then((d) => {
// //   let txParamsJS = d;


  
  
// //   const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
// //     from: localStorage.getItem("wallet"),
// //     to: lsig.address(),
// //     assetIndex: +parseInt(idget),
// //     note: undefined,
// //     amount: 0,
// //     manager:lsig.address(),
// //     suggestedParams: txParamsJS

// //   });
  
// //   // Use the AlgoSigner encoding library to make the transactions base64
// //   const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
  
// //   AlgoSigner.signTxn([{txn: txn_b64}]) 
// //   .then((d) => {
// //     let signedTxs = d;
// //     //signCodeElem.innerHTML = JSON.stringify(d, null, 2);

// //     AlgoSigner.send({
// //       ledger: 'TestNet',
// //       tx: signedTxs[0].blob
// //     })
// //     .then(async(d) => {
// //       let tx = d;

      
      


// //       fireDb.database().ref(`imagerefAlgo/${getalgo}`).child(item.highestBid).update({
// //         id:idget,imageUrl:item.image,priceSet:urlprize,cAddress:item.categoryText,keyId:item.highestBid,
// //           userName:item.counter,userSymbol:"Algos",ipfsUrl:item.ipfsurl,
// //           ownerAddress:item.bid,soldd:item.soldd,extra1:item.extra,
// //           previousoaddress:item.previousaddress,datesets:item.date,
// //           description:item.description,whois:'readytosale',history:item.url,Mnemonic:item.Mnemonic
        
// //         }).then(()=>{  
// //         setIsOpens(false);
// //         setIsOpenss(true)    
// //         })

// //     })
// //     .catch((e) => {
// //       console.error(e);
// //     });

// //   })
// //   .catch((e) => {
// //     console.error(e);
// //   });


// // })
// // .catch((e) => {
// //   console.error(e);
// // });

  

//   //let params = d;
//   //let accounts = d;
  



// //let signedTxn = algosdk.signLogicSigTransaction(txn,lsig).blob;
// //let ctxs = (await algodClient.sendRawTransaction(signedTxn).do());
// //await waitForConfirmation(algodClient,ctxs.txId)




// // })
// // .catch((e) => {
// //   console.error(e);
// // });

//   //let  params = await algodClient.getTransactionParams().do();
//   //comment out the next two lines to use suggested fee
//   //params.fee = 1000;
//   //params.flatFee = true;

//   //console.log("251")
  
//   })
//   .catch((e) => {
//     console.error(e);
//   });
// })
// .catch((e) => {
//   console.error(e);
// });
      
    



//       //end

//       //let program = new Uint8Array(Buffer.from("AyAEAwHFxKUO6AcyBCISRDMBECMSRDMCEiMSRDMCESQSRDMCASUORDMCFTIDEkQzAiAyAxJEI0M=", "base64"));
//     //let program = new Uint8Array(Buffer.from("AiAHewYBBAAFAyYFAVMBQgJCTgJTTgFDMwAYIhIzABAjEhAxCTIDEhAxIDIDEhBAAAEANwAaACgSQAFrNwAaACkSQAEtNwAaACoSQACNNwAaACsSQAANNwAaACcEEkAAAQAkQzIEJRIzAhAlEhAzAhEiEhAzAhQzAAASEEAAAQAzAxAlEjMDESISEDMDEiQSEEAAAQAzARAkEjMBADMAABIQQAABADMDADMAABJBAA0zAQgzAgEPQAABACRDMwMAMwAAE0EAETMBCDMCATMDAQgPQAABACRDIQRDMwIQJRIzAhEiEhAzAhQzAAASMwIAMwAAEhEQMgQhBRIQQAABADMDECUSMwMRIhIQMwMSJBIQQAABADMEECUSMwQRIhIQQAABADMBECQSMwEAMwAAEhBAAAEAMwIAMwAAEkEAETMBCDMDATMEAQgPQAABACRDMwIUMwAAEkEAFTMBCDMCATMDAQgzBAEID0AAAQAkQyEEQzIEIQYSMwIQJRIQMwIRIhIQMwIUMwAAEhAzARAkEhAzAQAzAAASEDMBCDMCAQ8QQAABACRDMgQhBhIzARAkEhAzAQAzAAASEDMBCDMCAQ8QMwIQJRIQMwIRIhIQMwISJBIQMwIUMwAAEhBAAAEAJEM=", "base64"));
//     //const args=[];
//     //args.push([...Buffer.from(idget.toString())]);
//     //args.push([...Buffer.from(addr2)]);
//     //args.push([...Buffer.from('')]);
    
//     //let lsig = algosdk.makeLogicSig(program,args);

//   //     AlgoSigner.accounts({
//   //       ledger: 'TestNet'
//   //     })
//   //     .then((d) => {
//   //       let accounts = d;
      
//   //   const algosdk = require('algosdk');
//   //   const algodServer = 'https://testnet-algorand.api.purestake.io/ps2'
//   //   const indexerServer = 'https://testnet-algorand.api.purestake.io/idx2'
//   //   const token = { 'X-API-Key': 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin' }
//   //   const port = '';
//   //   let note = undefined;

//   //  let algodClient = new algosdk.Algodv2(token, algodServer, port);

   
//   //   algodClient.getTransactionParams().do()
//   //   .then((d) => {
//   //     let txParamsJS = d;
//   //     //document.getElementById('paramsprint').innerHTML = JSON.stringify(d);
      
//   //     const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
//   //       from: localStorage.getItem("wallet"),
//   //       to: lsig.address(),
//   //       assetIndex: parseInt(idget),
//   //       note: AlgoSigner.encoding.stringToByteArray("hello"),
//   //       amount: 0,
//   //       suggestedParams: {...txParamsJS}
//   //     });
      
//   //     // Use the AlgoSigner encoding library to make the transactions base64
//   //     const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
      
//   //     AlgoSigner.signTxn([{txn: txn_b64}]) 
//   //     .then((d) => {
//   //       let signedTxs = d;
//   //       //signCodeElem.innerHTML = JSON.stringify(d, null, 2);
//   //       AlgoSigner.send({
//   //           ledger: 'TestNet',
//   //           tx: signedTxs[0].blob
//   //         })
//   //         .then((d) => {
//   //           let tx = d;
  
  

// //           })
// //           .catch((e) => {
// //             console.error(e);
// //           });

// //       })
// //       .catch((e) => {
// //         console.error(e);
// //       });
// //     })
// //     .catch((e) => {
// //       console.error(e);
// //     })    
// // })
// // .catch((e) => {
// //   console.error(e);
// // });


      
// // AlgoSigner.connect()
// // .then((d) => {

// //   const algosdk = require('algosdk');
// //      const algodServer = 'https://testnet-algorand.api.purestake.io/ps2'
// //      const indexerServer = 'https://testnet-algorand.api.purestake.io/idx2'
// //      const token = { 'X-API-Key': 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin' }
// //      const port = '';

// //     let algodClient = new algosdk.Algodv2(token, algodServer, port);
// //     algodClient.healthCheck().do()
// // .then(d => { 
  
// //   AlgoSigner.accounts({
// //     ledger: 'TestNet'
// //   })
// //   .then((d) => {
// //     let accounts = d;
// //     algodClient.getTransactionParams().do()
// // .then((d) => {
// //   var recoveredAccount1 = algosdk.mnemonicToSecretKey(item.Mnemonic);
// //   let txParamsJS = d;
// //   const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
// //     from: localStorage.getItem("wallet"),
// //     to: recoveredAccount1.addr,
// //     assetIndex: +parseInt(idget),
// //     note: AlgoSigner.encoding.stringToByteArray("nothing"),
// //     amount: 0,
// //     suggestedParams: {...txParamsJS}
// //   });
  
// //   // Use the AlgoSigner encoding library to make the transactions base64
// //   const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
  
// //   AlgoSigner.signTxn([{txn: txn_b64}]) 
// //   .then((d) => {
// //     let signedTxs = d;
// //     //signCodeElem.innerHTML = JSON.stringify(d, null, 2);

// //     AlgoSigner.send({
// //       ledger: 'TestNet',
// //       tx: signedTxs[0].blob
// //     })
// //     .then((d) => {
// //       let tx = d;


// //       //transfer thiru     
// //       //end thiru

// //       //db here

// //       let checkdb=fireDb.database().ref(`imagerefAlgo/${item.bid}`).child(item.highestBid);
// //     console.log("cdb",checkdb)
// //     console.log("odb",item.bid)
// //     console.log("hdb",item.highestBid)


    

// //     })
// //     .catch((e) => {
// //       console.error(e);
// //     });
// //   })
// //   .catch((e) => {
// //     console.error(e);
// //   });
// // })
// // .catch((e) => {
// //   console.error(e);
// // });
// //   })
// //   .catch((e) => {
// //     console.error(e);
// //   });
// // })
// // .catch(e => { 
// //   console.error(e); 
// // });
  
// // })
// // .catch((e) => {
// //   console.error(e);
// // });    
//     })().catch(e => {
//         console.log(e);
//     });

//     }

    
    
//   }

//   else{
//     alert("Your are not owner so you does not update or set prizes......")
//     }
//   }
// }


    

//     // let getting=[];
//     //   getting=item.url;
//     //   console.log("gett",getting)
//     //   getting.push(item.bid)    
// //     fireDb.database().ref(`imageref/${item.bid}`).child(item.highestBid).update({
// //       id:"",imageUrl:item.image,priceSet:getprize,cAddress:item.categoryText,keyId:item.highestBid,userName:item.counter,
// //       userSymbol:"BNB",ipfsUrl:"",
// //       ownerAddress:item.bid,soldd:"",extra1:"",
// //       //history:item.url,
// //       previousoaddress:"",datesets:new Date().toDateString(),whois:'',
// //       description:""
// //  }).then(()=>{
// //   window.location.reload(false)   
// //  })


//           //   var isd = item.title;//a
//           //   console.log("targetid",isd)
//           //   console.log(`a`,item)
//           //   let getaaaa=new web3.eth.Contract(abi,item.categoryText);
//           //   //alert("con address"+a.addcAdd);
//           //   //alert("token id"+isd);
//           //   const accounts = await  web3.eth.getAccounts();
//           //   console.log("checking")          
//           //   let price=getprize;
//           //   if(accounts[0] === item.bid)
//           //   {
//           //     //change mactimum



//           //     setIsOpens(true);
//           //     await getaaaa.methods.setTokenState([isd],"true").send({
//           //       from:accounts[0],
//           //       //gas: 51753,
//           //       //gasPrice:'10000000000'
//           //     });
              
//           //  // salepage.settokenstate();
//           //   await getaaaa.methods.setTokenPrice([isd],price).send({
//           //     from:accounts[0],
//           //     //gas: 51753,
//           //     //gasPrice:'10000000000'
//           //   })
//           //   //const priceamount = await getaaaa.methods.items(isd).call();
//           //   //console.log(priceamount.price)
//           //   // await getaaaa.methods.setApprovalForAll(a.addcAdd,"true").send({from:accounts[0]})
//           //   await getaaaa.methods.approve(item.categoryText,item.title).send({
//           //     from:accounts[0],
//           //     //gas: 51753,
//           //     //gasPrice:'10000000000'
//           //   })

            
//           //   // let refsellers=fireDb.database().ref(`sellerssavedb/${accounts[0]}`);//.child(a.addKeyI);//ref1
//           //   // const keysellers = refsellers.push().key;          
//           //   // refsellers.child(keysellers).set({
//           //   //   id:a.addIds,imageUrl:a.addImgs,priceSet:price,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addName,userSymbol:a.addSymbol,ipfsUrl:a.addIpfs,ownerAddress:accounts[0],
//           //   //   soldd:"",extra1:"readytosold",datesets:new Date().toDateString(),whois:'Sellers'
//           //   // })            

// //               id:item.title,imageUrl:item.image,priceSet:price,cAddress:item.categoryText,keyId:item.highestBid,userName:item.counter,userSymbol:"BNB",ipfsUrl:item.image,ownerAddress:accounts[0],
// //               soldd:"",extra1:"readytosold",datesets:new Date().toDateString(),whois:'Sellers'
// // }).then(()=>{

//   //setTprice("");
//   //setIsOpensetFirst(false);
//   //setIsOpen(true);


  
//     //window.location.reload(false)   

// //})
// // fireDb.database().ref(`imagerefexplore/${accounts[0]}`).child(a.addKeyI).set({
// //               id:a.addIds,imageUrl:a.addImgs,priceSet:price,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addName,userSymbol:a.addSymbol,ipfsUrl:a.addIpfs,ownerAddress:accounts[0],
// //               soldd:"",extra1:"readytosold",datesets:new Date().toDateString(),whois:'Sellers'
// // }).then(()=> {
// //   setTprice("");
// //   //setIsOpensetFirst(false);
// //   setIsOpen(true);
// //  });  
//}

//   const updatepricedb=async()=>{
//     let getprize = prompt("Please enter Price");
//     if(getprize === ""){
//       getprize = prompt("Please enter Price");
//     }
// else{
//     console.log("setitem",item)
//     console.log("settitem",item.price)

//     let checkdb=fireDb.database().ref(`imageref/${item.ownerAddress}`).child(item.highestBid);
//     console.log("cdb",checkdb)
//     console.log("odb",item.bid)
//     console.log("hdb",item.highestBid)
//     // let getting=[];
//     //   getting=item.url;
//     //   console.log("gett",getting)
//     //   getting.push(item.bid)    
// //     fireDb.database().ref(`imageref/${item.bid}`).child(item.highestBid).update({
// //       id:"",imageUrl:item.image,priceSet:getprize,cAddress:item.categoryText,keyId:item.highestBid,userName:item.counter,
// //       userSymbol:"BNB",ipfsUrl:"",
// //       ownerAddress:item.bid,soldd:"",extra1:"",
// //       //history:item.url,
// //       previousoaddress:"",datesets:new Date().toDateString(),whois:'',
// //       description:""
// //  }).then(()=>{
// //   window.location.reload(false)   
// //  })


//             var isd = item.title;//a
//             console.log("targetid",isd)
//             console.log(`a`,item)
//             let getaaaa=new web3.eth.Contract(abi,item.categoryText);
//             //alert("con address"+a.addcAdd);
//             //alert("token id"+isd);
//             const accounts = await  web3.eth.getAccounts();
//             console.log("checking")          
//             let price=getprize;
//             if(accounts[0] === item.bid)
//             {
//               //change mactimum
//               setIsOpens(true)
//               await getaaaa.methods.setTokenState([isd],"true").send({
//                 from:accounts[0],
//                 //gas: 51753,
//                 //gasPrice:'10000000000'
//               });
//            // salepage.settokenstate();
//             await getaaaa.methods.setTokenPrice([isd],price).send({
//               from:accounts[0],
//               //gas: 51753,
//               //gasPrice:'10000000000'
//             })
//             //const priceamount = await getaaaa.methods.items(isd).call();
//             //console.log(priceamount.price)
//             // await getaaaa.methods.setApprovalForAll(a.addcAdd,"true").send({from:accounts[0]})
//             await getaaaa.methods.approve(item.categoryText,item.title).send({
//               from:accounts[0],
//               //gas: 51753,
//               //gasPrice:'10000000000'
//             })
//             // let refsellers=fireDb.database().ref(`sellerssavedb/${accounts[0]}`);//.child(a.addKeyI);//ref1
//             // const keysellers = refsellers.push().key;          
//             // refsellers.child(keysellers).set({
//             //   id:a.addIds,imageUrl:a.addImgs,priceSet:price,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addName,userSymbol:a.addSymbol,ipfsUrl:a.addIpfs,ownerAddress:accounts[0],
//             //   soldd:"",extra1:"readytosold",datesets:new Date().toDateString(),whois:'Sellers'
//             // })            
// fireDb.database().ref(`imageref/${accounts[0]}`).child(item.highestBid).update({
//               id:item.title,imageUrl:item.image,priceSet:price,cAddress:item.categoryText,keyId:item.highestBid,userName:item.counter,userSymbol:"BNB",ipfsUrl:item.image,ownerAddress:accounts[0],
//               soldd:"",extra1:"readytosold",datesets:new Date().toDateString(),whois:'Sellers'
// }).then(()=>{

//   //setTprice("");
//   //setIsOpensetFirst(false);
//   //setIsOpen(true);

//   setIsOpens(false)

//   setIsOpenss(true)

//     //window.location.reload(false)   

// })
// // fireDb.database().ref(`imagerefexplore/${accounts[0]}`).child(a.addKeyI).set({
// //               id:a.addIds,imageUrl:a.addImgs,priceSet:price,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addName,userSymbol:a.addSymbol,ipfsUrl:a.addIpfs,ownerAddress:accounts[0],
// //               soldd:"",extra1:"readytosold",datesets:new Date().toDateString(),whois:'Sellers'
// // }).then(()=> {
// //   setTprice("");
// //   //setIsOpensetFirst(false);
// //   setIsOpen(true);
// //  });  
// }
// else{
// alert("Your are not owner so you does not update or set prizes......")
// }
// }

// }

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

  // const viewhistorys=()=>{

  //   let getasset=[];
  //   getasset=item.title;
  //   sethistorydbasset(getasset)
  //   console.log("getttt",getasset)
    

  // }


  const onSub=()=>{
    console.log("hello close")
    //setIsOpen(false);
    //history.push("/")
    window.location.reload(false)   
  }

  return (
    <>
    <div className={cn(styles.card, className)}>
      <div className={styles.preview}>        
        <img srcSet={`${item.image} 2x`} src={item.image} alt="Card" />
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
          {item.price === "" || item.price === null || item.price === " " ? (<>            
          </>) : (<>
            <button className={cn("button-small", styles.button)} onClick={saledbset}>
            <span>Place a sale</span>
            <Icon name="scatter-up" size="16" />
          </button>
          </>)}          
        </div>        
      </div>
      <br></br>


      {item.price === "" ? 
(
  <>
  <TextInput
                      className={styles.field}
                      label="Custom prize"
                      name="Url"
                      type="text"
                      placeholder="create prize"
                      required
                      onChange={event => setUrlprize(event.target.value)}
                    />
                    <br></br>
      <button className={cn("button-small")} onClick={setpricedb}>
      <span>Price set</span>
      {/* <Icon name="scatter-up" size="16" /> */}
    </button>
    </>
    )
    :    
    (        
      <>                     
                    <TextInput
                      className={styles.field}
                      label="Custom prize"
                      name="Url"
                      type="text"
                      placeholder="update prize"
                      required
                      onChange={event => setUrlprize(event.target.value)}
                    />
                    <br></br>      
      <button className={cn("button-small")} onClick={setpricedb}>
      <span>Update price</span>
      {/* <Icon name="scatter-up" size="16" /> */}
    </button>
    </>
    )    
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
            {/* <button type="button">History</button> */}                    
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
  <Modald visible={isOpens} >
<FolowStep className={styles.steps} />
</Modald>

<Modald visible={isOpenss} >
<FolowSteps className={styles.steps} onSub={()=>onSub}/>
</Modald>

{/* onClose={() => setIsOpens(false)} */}
</>
  );
};

export default Card;
