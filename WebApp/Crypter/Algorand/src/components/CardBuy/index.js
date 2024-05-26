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
  console.log("itemprintcardbuy",item)
  //console.log("itemprintcardkey",key)
  const [geto, seto] = useState([]);
  const [getno, setno] = useState([]);
  console.log("geto",geto)
  console.log("getno",getno)
const [optedd, setoptted] = useState(false);
const [datedt,setstartdt]= useState("");
const [bid_user,setBid]= useState("");
const [owner,setOwner]= useState("");


const token = {
  'X-API-Key': 'U5ivl9nv603lYUBRN3sHH5g0AzCwsetC7OAtYj9D'
 };
const server = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
let algodclient = new algosdk.Algodv2(token, server, port);

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

  let ro=[];
  let rno=[];
  

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     //setLoading(true);
  //     //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');      
  //   //   let abc=fireDb.database().ref(`Algoopt/${localStorage.getItem("wallet")}`).child(item.applicationid)
  //   // .catch((e) => {
  //   // console.error(e);
  //   // });
  //   //let data=await fetch(`https://demonft-2e778-default-rtdb.firebaseio.com/Algoopt/${localStorage.getItem("wallet")}/${41088000}.json`);
  //   //console.log("abcdata",data)
  //   const nftdata = await fetch(`https://demonft-2e778-default-rtdb.firebaseio.com/Algoopt/${localStorage.getItem("wallet")}/${item.applicationid}/opt.json`);      
  //   const resdata1 = await nftdata.json();
  //   console.log("abc",resdata1)
  //     //setPosts(res.data);
  //     //setLoading(false);

  // // fireDb.database()
  // // .ref(`/Algoopt/${localStorage.getItem("wallet")/41088000}/opt`)
  // // .once('value')
  // // .then(snapshot => {
  // //   console.log('User data: ', snapshot.val);
  // // });
  // let accountInfoResponse = await algodclient.accountInformation(localStorage.getItem("wallet")).do();
  //   for (let i = 0; i < accountInfoResponse['apps-local-state'].length; i++) { 
  //   if (accountInfoResponse['apps-local-state'][i].id === item.applicationid) {    
  //           console.log("User's local state: optted checked",item.applicationid);  
  //           console.log("hello");
  //           ro.push(item.applicationid)            
  //         }
  //         else{
  //           rno.push(item.applicationid)
  //           console.log("hi");
  //         }
  // }
  // seto(ro)
  // setno(rno)
  //   };

  //   fetchPosts();
  // }, []);


      



  //readLocalState(algodclient,localStorage.getItem("wallet"),41088000)      


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
      description:item.description,whois:'likes',history:item.url,paramsdb:item.image2x,privatekey:item.category,Mnemonic:item.Mnemonic,
      applicationid:item.applicationid,usdcids:item.usdcids,escrowaddress:item.escrowaddress

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

// async function readLocalState(client, account, index){
//   let accountInfoResponse = await client.accountInformation(account).do();
//   for (let i = 0; i < accountInfoResponse['apps-local-state'].length; i++) { 
//       if (accountInfoResponse['apps-local-state'][i].id === index) {
//           console.log("User's local state: optted checked");
//           // for (let n = 0; n < accountInfoResponse['apps-local-state'][i][`key-value`].length; n++) {
//           //     let enc = accountInfoResponse['apps-local-state'][i][`key-value`][n];
//           //     var decodedString = window.atob(enc.key);
//           //     if(decodedString === "B"){
//           //       setBid(enc.value.uint);
//           //     }
//           // }
//       }
//       else{
//         console.log("User's local state: not opt checked");
//       }
//   }
// }

// read global state of application
async function readGlobalState(client, account, index){
  let accountInfoResponse = await client.accountInformation(account).do();
  for (let i = 0; i < accountInfoResponse['created-apps'].length; i++) { 
      if (accountInfoResponse['created-apps'][i].id === index) {
          console.log("Application's global state:");
          for (let n = 0; n < accountInfoResponse['created-apps'][i]['params']['global-state'].length; n++) {
            let enc = accountInfoResponse['created-apps'][i]['params']['global-state'][n];

              var decodedString = window.atob(enc.key);
              if(decodedString === "A"){
                setstartdt(enc.value.uint);
              }
          }
      }
  }
}

async function readGlobalState_nftOwner(client, account, index){
let accountInfoResponse = await client.accountInformation(account).do();
for (let i = 0; i < accountInfoResponse['created-apps'].length; i++) { 
    if (accountInfoResponse['created-apps'][i].id === index) {
        console.log("Application's global state:");
        for (let n = 0; n < accountInfoResponse['created-apps'][i]['params']['global-state'].length; n++) {
          let enc = accountInfoResponse['created-apps'][i]['params']['global-state'][n];

            var decodedString = window.atob(enc.key);
            if(decodedString === "O"){
              let address = JSON.stringify(enc.value);
              // let getAddress = algosdk.encodeAddress(address,"base32")
              setOwner(address);
            }
        }
    }
}
}


const buyapplicationid=async()=>{

  if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === ''){
  }
  else{

    if(item.bid === localStorage.getItem("wallet"))
{
  alert("you are owner so you does not purchase this token")
}
else{
  setIsOpenss(true)

  let params = await algodclient.getTransactionParams().do();
//  comment out the next two lines to use suggested fee
  params.fee = 1000;
  params.flatFee = true;

  //4BLKKSIOUAC3TYFS2KQR4HDFZE6CWYZTDJXHHGDROACPNSJXGTHHY6I6GM,40791643
  await readGlobalState(algodclient, localStorage.getItem("wallet"),item.applicationid);
  console.log("Global state", datedt);
  let askPrice = Number(parseInt(item.price));

  // await readGlobalState_nftOwner(algodclient, "4BLKKSIOUAC3TYFS2KQR4HDFZE6CWYZTDJXHHGDROACPNSJXGTHHY6I6GM", 40791643);
  // console.log("Global state", owner);
  // let asset_owner = owner;

  // await readLocalState(algodclient, "4BLKKSIOUAC3TYFS2KQR4HDFZE6CWYZTDJXHHGDROACPNSJXGTHHY6I6GM", 40791643);
  // console.log("Global state", bid_user);
  // let bidPrice = bid_user;

  //let diff = Math.abs(askPrice - bidPrice);

AlgoSigner.connect()
.then((d) => {
AlgoSigner.accounts({
ledger: 'TestNet'
})
.then(async(d) => {
let accounts = d;
let firstAcc = localStorage.getItem("wallet");
let senderCallapp = firstAcc;
let index = Number(parseInt(item.applicationid));//40791643 appid

console.log("creator account", senderCallapp)
//console.log(lsig.address())
let appArgs = [];
appArgs.push(new Uint8Array (Buffer.from("BN")));
// appArgs.push(algosdk.encodeUint64(5));
// let accArgs = [];
// accArgs.push(lsig.address());
let tx1 = algosdk.makeApplicationNoOpTxn(senderCallapp, params, index, appArgs);

let senderTx2 = firstAcc;
let receiverTx2 = item.escrowaddress;//5PXX6TXPQVB6P7J67TEIGEG2DZVXOZDBPYTAJ62RP457DMXELGMMKFJCBU escrowaddress
let tx2Amount = 2000;
let closeToRemaninder = undefined;
let note = undefined;
console.log("Amount", tx2Amount);
////let tx2 = algosdk.makeAssetTransferTxnWithSuggestedParams(senderTx2, receiverTx2, tx2Amount, nft_id, params);
let tx2 = algosdk.makePaymentTxnWithSuggestedParams(senderTx2, receiverTx2, tx2Amount,closeToRemaninder, note, params);
console.log("after tx2");
console.log("price",Number(parseInt(item.price)))
console.log("price",Number(parseInt(item.usdcids)))
console.log("price",Number(parseInt(item.applicationid)))
let usdc_id = Number(parseInt(item.usdcids));//40788570 usdc id
let tx2Amount_buy = Number(parseInt((item.price)));
console.log("prizeprint",tx2Amount_buy)
let closeRemainderTo = undefined;
let revocationTarget = undefined;
note = undefined;
console.log("Amount", tx2Amount);

let tx3 = algosdk.makeAssetTransferTxnWithSuggestedParams(senderTx2, receiverTx2, closeRemainderTo, revocationTarget, tx2Amount_buy, note, usdc_id, params );
console.log("after tx3");
let nft_id = Number(parseInt(item.title));//40789121 nft id
let txNFT_buy = 1;
closeRemainderTo = undefined;
revocationTarget = undefined;
note = undefined;
console.log("Amount", tx2Amount);

let tx4 = algosdk.makeAssetTransferTxnWithSuggestedParams(receiverTx2, senderTx2, closeRemainderTo, revocationTarget, txNFT_buy, note, nft_id, params );
console.log("after tx4");
console.log("dbget",item.bid)
console.log("dbgettype",typeof(item.bid))
let senderTxOwner = item.bid;//item.bid;//BSRLHUHZVMKUIG3JWUUMLQQ6V33WDEQHJCHIC3AUMRRRCJZMPHQXCAWXHE owner address
usdc_id = Number(parseInt(item.usdcids));//40788570 usdc id
txNFT_buy = Number(parseInt(item.price));
closeRemainderTo = undefined;
revocationTarget = undefined;
note = undefined;
console.log("Amount", tx2Amount);

let tx5 = algosdk.makeAssetTransferTxnWithSuggestedParams(receiverTx2, senderTxOwner, closeRemainderTo, revocationTarget, txNFT_buy, note, usdc_id, params );

let buyer_opt = firstAcc;

// let opt_buyer = algosdk.makeAssetTransferTxnWithSuggestedParams

//start
algodclient.getTransactionParams().do()
  .then((d) => {
    let txParamsJS = d;
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: localStorage.getItem("wallet"),
      to:localStorage.getItem("wallet"),
      assetIndex: Number(parseInt(item.title)),//nft_id
      note: undefined,
      amount: 0,
      suggestedParams: txParamsJS
    });
    
    // Use the AlgoSigner encoding library to make the transactions base64
    const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
    
    AlgoSigner.signTxn([{txn: txn_b64}]) 
    .then((d) => {
      let signedTxs = d;
      //signCodeElem.innerHTML = JSON.stringify(d, null, 2);
      AlgoSigner.send({
        ledger: 'TestNet',
        tx: signedTxs[0].blob
      })
      .then(async(d) => {
        let tx = d;
        console.log("Opted", tx);
        
let txns = [tx1, tx2, tx3, tx4, tx5];

  // Group both transactions
  let txgroup = algosdk.assignGroupID(txns);
  console.log(txgroup)
//escrow start

let data = `#pragma version 4
gtxn 0 ApplicationID
int appid                    
==
gtxn 0 TypeEnum
int appl
==
&&
txn CloseRemainderTo
global ZeroAddress
==
&&
txn RekeyTo
global ZeroAddress
==
&&
bnz main_l2
err
main_l2:
gtxna 0 ApplicationArgs 0
byte "S"
==
bnz main_l44
gtxna 0 ApplicationArgs 0
byte "B"
==
bnz main_l41
gtxna 0 ApplicationArgs 0
byte "BN"
==
bnz main_l24
gtxna 0 ApplicationArgs 0
byte "SN"
==
bnz main_l9
gtxna 0 ApplicationArgs 0
byte "C"
==
bnz main_l8
err
main_l8:
int 1
return
main_l9:
global GroupSize
int 4
==
gtxn 2 TypeEnum
int axfer
==
&&
gtxn 2 XferAsset
int usdcid //usdc                    
==
&&
gtxn 2 AssetReceiver
gtxn 0 Sender
==
&&
bnz main_l11
err
main_l11:
gtxn 3 TypeEnum
int axfer
==
gtxn 3 XferAsset
int nftid //nft                    
==
&&
gtxn 3 AssetAmount
int 1
==
&&
bnz main_l13
err
main_l13:
gtxn 1 TypeEnum
int pay
==
gtxn 1 Sender
gtxn 0 Sender
==
&&
bnz main_l15
err
main_l15:
gtxn 3 Sender
gtxn 0 Sender
==
bnz main_l21
gtxn 3 Sender
gtxn 0 Sender
!=
bnz main_l18
int 0
return
main_l18:
gtxn 1 Amount
gtxn 2 Fee
gtxn 3 Fee
+
>=
bnz main_l20
err
main_l20:
int 1
return
main_l21:
gtxn 1 Amount
gtxn 2 Fee
>=
bnz main_l23
err
main_l23:
int 1
return
main_l24:
gtxn 2 TypeEnum
int axfer
==
gtxn 2 XferAsset
int usdcid //usdc                  
==
&&
gtxn 2 AssetReceiver
gtxn 0 Sender
==
gtxn 2 Sender
gtxn 0 Sender
==
||
&&
global GroupSize
int 5
==
&&
bnz main_l26
err
main_l26:
gtxn 3 TypeEnum
int axfer
==
gtxn 3 XferAsset
int nftid //nft                    
==
&&
gtxn 3 AssetAmount
int 1
==
&&
bnz main_l28
err
main_l28:
gtxn 4 TypeEnum
int axfer
==
gtxn 4 XferAsset
int usdcid //usdc                    
==
&&
bnz main_l30
err
main_l30:
gtxn 1 TypeEnum
int pay
==
gtxn 1 Sender
gtxn 0 Sender
==
&&
bnz main_l32
err
main_l32:
gtxn 2 Sender
gtxn 0 Sender
==
bnz main_l38
gtxn 2 AssetReceiver
gtxn 0 Sender
==
bnz main_l35
int 0
return
main_l35:
gtxn 1 Amount
gtxn 2 Fee
gtxn 3 Fee
+
gtxn 4 Fee
+
>=
bnz main_l37
err
main_l37:
int 1
return
main_l38:
gtxn 1 Amount
gtxn 3 Fee
gtxn 4 Fee
+
>=
bnz main_l40
err
main_l40:
int 1
return
main_l41:
global GroupSize
int 3
==
gtxn 2 TypeEnum
int axfer
==
&&
gtxn 2 XferAsset
int usdcid //usdc                    
==
&&
gtxn 2 AssetReceiver
gtxn 0 Sender
==
&&
gtxn 1 TypeEnum
int pay
==
&&
gtxn 1 Sender
gtxn 0 Sender
==
&&
gtxn 1 Amount
gtxn 2 Fee
>=
&&
bnz main_l43
err
main_l43:
int 1
return
main_l44:
global GroupSize
int 3
==
gtxn 1 TypeEnum
int pay
==
&&
gtxn 1 Sender
gtxn 0 Sender
==
&&
gtxn 1 Amount
gtxn 2 Fee
>=
&&
gtxn 2 TypeEnum
int axfer
==
&&
gtxn 2 XferAsset
int nftid //nft                    
==
&&
gtxn 2 AssetAmount
int 1
==
&&
gtxn 2 AssetReceiver
gtxn 0 Sender
==
&&
bnz main_l46
err
main_l46:
int 1
return        
`;
      let data2 = data.replace("appid",Number(parseInt(item.applicationid)));
      let data3 = data2.replaceAll("usdcid",Number(parseInt(item.usdcids)));
      let data4 = data3.replaceAll("nftid",Number(parseInt(item.title)));

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
      let results = await algodclient.compile(data4).do();
      console.log("Resultconsole = " + results);
      console.log("Hash = " + results.hash);
      console.log("Result = " + results.result);
      // await sleep(20000)
      let program = new Uint8Array(Buffer.from(results.result, "base64"));
      let args = [];
      args.push(algosdk.encodeUint64(Number(parseInt(item.applicationid))));//40791643 app id
      args.push(algosdk.encodeUint64(Number(parseInt(item.usdcids))));//40788570 usdc id
      args.push(algosdk.encodeUint64(Number(parseInt(item.title))));//40789121 nft id
      //args.push(algosdk.encodeUint64(5));
      let lsig = algosdk.makeLogicSig(program);
      console.log("LSIG",lsig.address())
//escrow end
//changes
  let txn_b64_1 = tx1.toByte();
  let txn_b64_2 = tx2.toByte();
  let txn_b64_3 = tx3.toByte();
  // let base64Txs1 =  AlgoSigner.encoding.msgpackToBase64(txn_b64_1);
  // let base64Txs2 =  AlgoSigner.encoding.msgpackToBase64(txn_b64_2);
  console.log("signing")
  
  let base64Txs1 = AlgoSigner.encoding.msgpackToBase64(txn_b64_1);
  let base64Txs2 = AlgoSigner.encoding.msgpackToBase64(txn_b64_2);
  let base64Txs3 = AlgoSigner.encoding.msgpackToBase64(txn_b64_3);
  console.log("encoded")
  let signedTxs51 = await AlgoSigner.signTxn([
    {
      txn: base64Txs1,
    }
  ]);
  let signedTxs52 = await AlgoSigner.signTxn([
    {
      txn: base64Txs2,
    },
  ]);
  let signedTxs53 = await AlgoSigner.signTxn([
    {
      txn: base64Txs3,
    }
  ]);
  //console.log("logic",signedTxs5)

  let binarySignedTxs1 =  AlgoSigner.encoding.base64ToMsgpack(signedTxs51[0].blob);
  let binarySignedTxs2 =  AlgoSigner.encoding.base64ToMsgpack(signedTxs52[0].blob);
  let binarySignedTxs3 =  AlgoSigner.encoding.base64ToMsgpack(signedTxs53[0].blob);
  let rawSignedTxn4 = algosdk.signLogicSigTransactionObject(tx4, lsig);
  let rawSignedTxn5 = algosdk.signLogicSigTransactionObject(tx5, lsig);
  //let binarySignedTxs = signedTxs.map((txn) => AlgoSigner.encoding.base64ToMsgpack(txn[0].blob));
  let signArr43 = [binarySignedTxs1, binarySignedTxs2, binarySignedTxs3, rawSignedTxn4.blob, rawSignedTxn5.blob];
  //console.log("signed",rawSignedTxn2.blob)
  let trans = await algodclient.sendRawTransaction(signArr43).do();
   console.log("Send complete");
//   console.log("txID", trans);
   console.log("id", trans.txId);
 await waitForConfirmation(algodclient, trans.txId);

 console.log("signed transfered")
//db store here
fireDb.database().ref(`imagerefexploreoneAlgos/${item.bid}`).child(item.highestBid).remove().then(()=>{
  fireDb.database().ref(`imagerefbuy/${localStorage.getItem("wallet")}`).child(item.highestBid).set({
  id:item.title,imageUrl:item.image,priceSet:item.price,cAddress:item.categoryText,keyId:item.highestBid,
  userName:"",userSymbol:"Algos",ipfsUrl:item.ipfsurl,
  ownerAddress:localStorage.getItem("wallet"),soldd:item.soldd,extra1:item.extra,
  previousoaddress:item.bid,datesets:item.date,
  description:item.description,whois:'buyers',history:item.url,
  applicationid:item.applicationid,usdcids:item.usdcids,escrowaddress:item.escrowaddress
  //paramsdb:item.image2x,privatekey:item.category  
        }).then(()=>{
          setIsOpenss(false)
          setIsOpens(true)
          
        }) 
})
.catch((e) => {
console.error(e);
});
//end db store
  
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
})
.catch((e) => {
console.error(e);
});

  //end option buynow

}
  }
  //after optin buynow 
}

async function optInApp(client, account, index) {
  // define sender
  let sender = account;

// get node suggested parameters
  let params = await client.getTransactionParams().do();
  // comment out the next two lines to use suggested fee
  params.fee = 1000;
  params.flatFee = true;
  // create unsigned transaction
  let txn = algosdk.makeApplicationOptInTxn(sender, params, index);
  let txId = txn.txID().toString();
  // Sign the transaction
  // let signedTxn = txn.signTxn(account.sk);
  let txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
  let signedTxs = await AlgoSigner.signTxn([{txn:txn_b64}]);
  console.log("txn signing")
  let signedT = AlgoSigner.encoding.base64ToMsgpack(signedTxs[0].blob);
  let transcat = await client.sendRawTransaction(signedT).do();
  console.log("txn working")
  await waitForConfirmation(client, transcat.txId);
  console.log("Signed transaction with txID: %s", txId);
  // Submit the transaction
  // await client.sendRawTransaction(signedTxn).do();
  // Wait for confirmation
  // await waitForConfirmation(client, txId);
  // display results
  let transactionResponse = await client.pendingTransactionInformation(transcat.txId).do();
  console.log("Opted-in to app-id:",transactionResponse['txn']['txn']['apid']) 

  //optdb added here
                  fireDb.database().ref(`Algoopt/${localStorage.getItem("wallet")}`).child(item.applicationid).set({opt:true})
                  .then(()=>{
                    console.log("db stored")
                    setoptted(true)
                    setIsOpenss(false)                    
                    window.location.reload(false)   
                  })             
}



const buynftapp = async()=>{

  console.log("inside buy function")
    if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === ''){
    }
    else{

      if(item.bid === localStorage.getItem("wallet"))
  {
    alert("you are owner so you does not purchase this token")
  }
  else{
    setIsOpenss(true)
    AlgoSigner.connect()
  .then((d) => {
    AlgoSigner.accounts({
      ledger: 'TestNet'
    })
    .then(async(d) => {
      let accounts = localStorage.getItem("wallet");
      let index = item.applicationid ;//40791643;//app id
      await optInApp(algodclient, accounts, index);
    })
    .catch((e) => {
      console.error(e);
    });
  })
  .catch((e) => {
    console.error(e);
  });
  }  
}
}

const buynft=async()=>{

    console.log("inside buy function")
    if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === ''){
    }
    else{
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
  if(item.bid === getalgo)
  {
    alert("you are owner so you does not purchase this token")
  }
  else{
setIsOpenss(true)
const algosdk = require('algosdk');
if(localStorage.getItem("net") === "mainnet"){
const algodServer = 'https://mainnet-algorand.api.purestake.io/ps2'
//const indexerServer = 'https://mainnet-algorand.api.purestake.io/idx2'
const token = { 'X-API-Key': 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin' }
const port = '';

let algodClient = new algosdk.Algodv2(token, algodServer, port);
//let indexerClient = new algosdk.Indexer(token, indexerServer, port);
let accounts;
let txParamsJS;
let signedTxs;
let tx;
  AlgoSigner.connect()
  .then((d) => {    
    algodClient.healthCheck().do()
  .then(d => { 
    AlgoSigner.accounts({
      ledger: 'MainNet'
    })
    .then((d) => {
      accounts = d;  
      algodClient.getTransactionParams().do()
  .then((d) => {
    txParamsJS = d;
    //let amountp=(item.price).replace(/^"(.+(?="$))"$/, '$1');
    //console.log("amountp",amountp)
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: localStorage.getItem("wallet"),
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
        ledger: 'MainNet',
        tx: signedTxs[0].blob
      })
      .then((d) => {
        tx = d;
        algodClient.pendingTransactionInformation(tx.txId).do()
  .then(async(d) => {
    console.log(d);
    console.log("last success")  
    //opt start   
    AlgoSigner.accounts({
      ledger: 'MainNet'
    })
    .then(async(d) => {
      //let accounts = d;  
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
  
  const algodServer = 'https://mainnet-algorand.api.purestake.io/ps2'
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
    args.push([...Buffer.from(localStorage.getItem("wallet"))]);//buyer address
    args.push([...Buffer.from('')]);
  
    let lsig = algosdk.makeLogicSig(program,args);
  
  
  // let ctxn = algosdk.makeAssetConfigTxnWithSuggestedParams(lsig.address(), note, 
  // parseInt(item.title), lsig.address(), localStorage.getItem("wallet"), localStorage.getItem("wallet"), localStorage.getItem("wallet"), params);        
  // let rawSignedTxn = algosdk.signLogicSigTransaction(ctxn,lsig).blob;
  // let ctx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
  // console.log("success optin")
  // let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(lsig.address(),localStorage.getItem("wallet"),undefined,undefined,1,undefined,parseInt(item.title),params);
  // let signedTxn = algosdk.signLogicSigTransaction(txn,lsig).blob;
  // let ctxs = (await algodClient.sendRawTransaction(signedTxn).do());
  // await waitForConfirmation(algodClient,ctxs.txId)
  
  
  
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
}
else{

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
    algodClient = new algosdk.Algodv2(token, algodServer, port);
    indexerClient = new algosdk.Indexer(token, indexerServer, port);
    
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
  
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: localStorage.getItem("wallet"),
      to: item.bid,
      amount: Number(parseInt(item.price)),
      note: undefined,
      suggestedParams:txParamsJS
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
        console.log("algos sent")
        //own opt in
        AlgoSigner.connect()
      .then(() => AlgoSigner.algod({ 
          ledger: 'TestNet', 
          path: '/v2/transactions/params'
      }))
      // sign new opt-in transaction
      .then((txParams) => AlgoSigner.sign({
          assetIndex: Number(parseInt(item.title)),
          from: localStorage.getItem("wallet"),
          to: localStorage.getItem("wallet"),
          amount: 0,
          note: undefined,
          type: 'axfer',
          fee: txParams['min-fee'],
          firstRound: txParams['last-round'],
          lastRound: txParams['last-round'] + 1000,
          genesisID: txParams['genesis-id'],
          genesisHash: txParams['genesis-hash'],
          flatFee: true
      })) 
      .then((signedTx) => AlgoSigner.send({ 
          ledger: 'TestNet', 
          tx: signedTx.blob 
      }))
      // wait for confirmation from the blockchain
      .then((tx) => waitForAlgosignerConfirmationtest(tx)) // see algosignerutils.js
      .then(async(tx) => {
          // our transaction was successful, we can now view it on the blockchain 
  
          //transfer
          let account3_mnemonic = "ability awesome abandon photo acoustic ensure awful banana amount marine nurse candy cattle avoid pool code glance embrace cactus abandon foster luxury harbor abandon pony"
          let recoveredAccount3 = algosdk.mnemonicToSecretKey(account3_mnemonic);
      let sender = recoveredAccount3.addr;
      let recipient = localStorage.getItem("wallet");
      let revocationTarget = undefined;
      let closeRemainderTo = undefined;
      //Amount of the asset to transfer
      let amount = 1;
      let params = await algodClient.getTransactionParams().do();
      //comment out the next two lines to use suggested fee
      params.fee = 1000;
      params.flatFee = true;
  
      // signing and sending "txn" will send "amount" assets from "sender" to "recipient"
      let xtxn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, recipient, closeRemainderTo, revocationTarget,
           amount,  undefined, Number(parseInt(item.title)),params);
           // Must be signed by the account sending the asset  
      let rawSignedTxn = xtxn.signTxn(recoveredAccount3.sk)
      let xtx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
      console.log("Transaction : " + xtx.txId);
      // wait for transaction to be confirmed
      await waitForConfirmation(algodClient, xtx.txId);
          // You should now see the 10 assets listed in the account information
          console.log("Account 3 = " + recoveredAccount3.addr);
          await printAssetHolding(algodClient, recoveredAccount3.addr,Number(parseInt(item.title)));
  
          //end transfer
          //db send
          fireDb.database().ref(`imagerefexploreoneAlgos/${item.bid}`).child(item.highestBid).remove().then(()=>{
            fireDb.database().ref(`imagerefbuy/${getalgo}`).child(item.highestBid).set({
            id:item.title,imageUrl:item.image,priceSet:item.price,cAddress:item.categoryText,keyId:item.highestBid,
            userName:"",userSymbol:"Algos",ipfsUrl:item.ipfsurl,
            ownerAddress:getalgo,soldd:item.soldd,extra1:item.extra,
            previousoaddress:item.bid,datesets:item.date,
            description:item.description,whois:'buyers',history:item.url,
            applicationid:item.applicationid,usdcids:item.usdcids,escrowaddress:item.escrowaddress
            //paramsdb:item.image2x,privatekey:item.category  
                  }).then(()=>{
                    setIsOpenss(false)
                    setIsOpens(true)                    
                  }) 
        })
        .catch((e) => {
          console.error(e);
        });
        
  
          //db sent
          
      })
      .catch((e) => 
      { 
          // handle errors and perform error cleanup here
          console.error(e); 
      });
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
  });
      })
      .catch((e) => {
        console.error(e);
      });
    })
    .catch(e => { 
      console.error(e); 
    });
  })
  .catch((e) => {
    console.error(e);
  });
  
  

}


//cut paste

// const algodServer = 'https://testnet-algorand.api.purestake.io/ps2'
// const indexerServer = 'https://testnet-algorand.api.purestake.io/idx2'
// const token = { 'X-API-Key': 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin' }
// const port = '';

// let algodClient = new algosdk.Algodv2(token, algodServer, port);
// let indexerClient = new algosdk.Indexer(token, indexerServer, port);
// let accounts;
// let txParamsJS;
// let signedTxs;
// let tx;
// AlgoSigner.connect()
// .then((d) => {
//   algodClient = new algosdk.Algodv2(token, algodServer, port);
//   indexerClient = new algosdk.Indexer(token, indexerServer, port);
  
//   algodClient.healthCheck().do()
//   .then(d => { 
//     AlgoSigner.accounts({
//       ledger: 'TestNet'
//     })
//     .then((d) => {
//       accounts = d;

//       algodClient.getTransactionParams().do()
// .then((d) => {
//   txParamsJS = d;

//   const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
//     from: localStorage.getItem("wallet"),
//     to: item.bid,
//     amount: Number(parseInt(item.price)),
//     note: undefined,
//     suggestedParams:txParamsJS
//   });
  
//   // Use the AlgoSigner encoding library to make the transactions base64
//   let txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
  
//   AlgoSigner.signTxn([{txn: txn_b64}])
//   .then((d) => {
//     signedTxs = d;
//     AlgoSigner.send({
//       ledger: 'TestNet',
//       tx: signedTxs[0].blob
//     })
//     .then((d) => {
//       tx = d;
//       console.log("algos sent")
//       //own opt in
//       AlgoSigner.connect()
//     .then(() => AlgoSigner.algod({ 
//         ledger: 'TestNet', 
//         path: '/v2/transactions/params'
//     }))
//     // sign new opt-in transaction
//     .then((txParams) => AlgoSigner.sign({
//         assetIndex: Number(parseInt(item.title)),
//         from: localStorage.getItem("wallet"),
//         to: localStorage.getItem("wallet"),
//         amount: 0,
//         note: undefined,
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
//     .then(async(tx) => {
//         // our transaction was successful, we can now view it on the blockchain 

//         //transfer
//         let account3_mnemonic = "ability awesome abandon photo acoustic ensure awful banana amount marine nurse candy cattle avoid pool code glance embrace cactus abandon foster luxury harbor abandon pony"
//         let recoveredAccount3 = algosdk.mnemonicToSecretKey(account3_mnemonic);
//     let sender = recoveredAccount3.addr;
//     let recipient = localStorage.getItem("wallet");
//     let revocationTarget = undefined;
//     let closeRemainderTo = undefined;
//     //Amount of the asset to transfer
//     let amount = 1;
//     let params = await algodClient.getTransactionParams().do();
//     //comment out the next two lines to use suggested fee
//     params.fee = 1000;
//     params.flatFee = true;

//     // signing and sending "txn" will send "amount" assets from "sender" to "recipient"
//     let xtxn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, recipient, closeRemainderTo, revocationTarget,
//          amount,  undefined, Number(parseInt(item.title)),params);
//          // Must be signed by the account sending the asset  
//     let rawSignedTxn = xtxn.signTxn(recoveredAccount3.sk)
//     let xtx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
//     console.log("Transaction : " + xtx.txId);
//     // wait for transaction to be confirmed
//     await waitForConfirmation(algodClient, xtx.txId);
//         // You should now see the 10 assets listed in the account information
//         console.log("Account 3 = " + recoveredAccount3.addr);
//         await printAssetHolding(algodClient, recoveredAccount3.addr,Number(parseInt(item.title)));

//         //end transfer
//         //db send
//         fireDb.database().ref(`imagerefexploreoneAlgos/${item.bid}`).child(item.highestBid).remove().then(()=>{
//           fireDb.database().ref(`imagerefbuy/${getalgo}`).child(item.highestBid).set({
//           id:item.title,imageUrl:item.image,priceSet:item.price,cAddress:item.categoryText,keyId:item.highestBid,
//           userName:"",userSymbol:"Algos",ipfsUrl:item.ipfsurl,
//           ownerAddress:getalgo,soldd:item.soldd,extra1:item.extra,
//           previousoaddress:item.bid,datesets:item.date,
//           description:item.description,whois:'buyers',history:item.url
//           //paramsdb:item.image2x,privatekey:item.category  
//                 }).then(()=>{
//                   setIsOpenss(false)
//                   setIsOpens(true)
                  
//                 }) 
//       })
//       .catch((e) => {
//         console.error(e);
//       });
      

//         //db sent
        
//     })
//     .catch((e) => 
//     { 
//         // handle errors and perform error cleanup here
//         console.error(e); 
//     });



//       //end transfer
//     })
//     .catch((e) => {
//       console.error(e);
//     });

//   })
//   .catch((e) => {
//       console.error(e);
//   });


// })
// .catch((e) => {
//   console.error(e);
// });
//     })
//     .catch((e) => {
//       console.error(e);
//     });
//   })
//   .catch(e => { 
//     console.error(e); 
//   });
// })
// .catch((e) => {
//   console.error(e);
// });


//end cut paste
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
    get.push({
      address:item.url,
      asset:item.title
    })
    sethistorydb(get)  
    console.log("gettt",get)  
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
          >
            <Icon name="heart" size="20" />
          </button>          
        </div>
        
      </div>
      <br></br>
      {item.price && (
<>   
{item.resdata1 === null || item.resdata1 === undefined || item.resdata1 === "" ? (
<button className={cn("button-small")} onClick={buynftapp}>
      <span>OPT</span>      
    </button>
) :(  
  <button className={cn("button-small")} onClick={buyapplicationid}>
      <span>Buy</span>      
    </button>
)}
</>)}
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
          </div>
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
