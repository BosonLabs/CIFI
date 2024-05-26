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
//web3



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
  const [isOpen, setIsOpen] = useState(false);


  
  const addlikedb=async()=>{
    //let getalgo=localStorage.getItem("wallet");
    //const accounts = await  web3.eth.getAccounts();

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
  const saledbset=async()=>{

  // const algosdk = require('algosdk');
  // const baseServer = "https://testnet-algorand.api.purestake.io/idx2";
  // const port = "";
  // const token = {
  
  //     'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
  // }
  // let indexerClient  = new algosdk.Indexer(token, baseServer, port);

  
    console.log("iitem",item)
    console.log("ititem",item.price)
      
      //let accounts;
      //let txParams;
      //let signedTx;
      //let tx;
      //let tokenname;
      //let getAssetid;

      if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === ''){

      }
    else{
      //const accounts = await  web3.eth.getAccounts();
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
    const baseServer = "https://testnet-algorand.api.purestake.io/idx2";
    const token = {
      'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
    }
    let indexerClient = new algosdk.Indexer(token, baseServer, port);
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
    //   let res="https://testnet.algoexplorerapi.io/v2/transactions/pending/"+item.categoryText+"?format=json";
    //       console.log("ress",res);
    //       axios.get(`${res}`)
    //      .then((res)=>{
    //        const allnote=res;
    //        getAssetid=res.data["asset-index"];
    //        let getAssetName=res.data.txn.txn.apar.an;
    //       console.log("all",allnote)
    //       console.log("allname",getAssetName)
    //        console.log("assetid",getAssetid)
    //       //  localStorage.setItem("assid",allNotes);


    //       //db

    //   console.log("1",item.bid)
    //   console.log("2",item.highestBid)
    //   console.log("3",item.category)
    //   console.log("4",item.image2x)
    //   console.log("5",getAssetid)
    //   console.log("6",item.categoryText)
    //   console.log("7",item.counter)
    //   console.log("8",item.image2x)
      
    //   let getting=[];
    //   // getting=item.url;
    //   // console.log("gett",getting)
    //   // getting.push(item.bid)
    // fireDb.database().ref(`imagerefexploreone/${item.bid}`).child(item.highestBid).set({
    //   id:getAssetid,imageUrl:item.image,priceSet:item.price,cAddress:item.categoryText,keyId:item.highestBid,
    //   userName:item.counter,userSymbol:"Algos",ipfsUrl:"",
    //   ownerAddress:item.bid,soldd:"",extra1:"",privatekey:item.category,paramsdb:item.image2x,history:item.url,
    //   previousoaddress:"",datesets:new Date().toDateString(),
    //   description:"",whois:'Sellers'      
    //   }).then(()=>{
        
    //     fireDb.database().ref(`imageref/${item.bid}`).child(item.highestBid).remove().then(()=>{


    //       fireDb.database().ref(`imagerefexplore/${item.bid}`).child(item.highestBid).remove().then(()=>{


    //         console.log("remove db");
    //       window.location.reload(false)   
    //       })                                  
    //     })                              
    //    })    

    //       //db           
    //      }).catch(error => console.error(`Error: ${error}`));       

    //      console.log("items",item)
    
  }
}

  const setpricedb=async()=>{

    if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === ''){

      alert("nothing")
    }
    else{  
    let getalgo=localStorage.getItem("wallet");

    //let getprize = prompt("Please enter Price");
    if( urlprize === ""){
      //getprize = prompt("Please enter Price");
      alert("please enter Algos ?")
    }
else{
console.log("checkowner",item.bid)
console.log("checkowners",getalgo)
  if(getalgo === item.bid)
  {
    const algosdk = require('algosdk');
    let idget="";
    const port = "";  
    const baseServer = "https://testnet-algorand.api.purestake.io/idx2";
    const token = {
      'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
    }
    let indexerClient = new algosdk.Indexer(token, baseServer, port);
    
    (async()=> {
      //const txnInfo2 =  await indexerClient.searchForTransactions().txid('H6QGCDZGS64ZD6SXYUHQKFEG5CTF4VB3JCCT4WAGWRH2LTY7UV3A').do()
      //console.log(txnInfo2)
      let txnInfo =  await indexerClient.searchForTransactions().txid(item.categoryText).do();      
      console.log(txnInfo)
      idget=txnInfo.transactions[0]["created-asset-index"];
      console.log("assetidget",txnInfo.transactions[0]["created-asset-index"])  
      console.log("end")  
      console.log("setitem",item)
      console.log("settitem",item.price)


      //shyam send code


AlgoSigner.connect()
.then(async(d) => {
  AlgoSigner.accounts({
    ledger: 'TestNet'
  })
  .then(async(d) => {
let accounts =d;
    console.log("238")
  const algosdk = require('algosdk');
  //const baseServer = "https://testnet-algorand.api.purestake.io/idx2";
  const algodServer = 'https://testnet-algorand.api.purestake.io/ps2'
  const port = "";
  const token = {
  
      'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
  }
  //let algodClient = new algosdk.Algodv2(token, baseServer, port);
  let algodClient = new algosdk.Algodv2(token, algodServer, port);
  console.log("247")

//let params=algodClient.getTransactionParams().do()
//.then(async(d) => {
let  params = await algodClient.getTransactionParams().do();
  //comment out the next two lines to use suggested fee
  params.fee = 1000;
  params.flatFee = true;

  let note =undefined;
  console.log("254")
  let program = new Uint8Array(Buffer.from("ASAEADoKAS0VIhJAACIvFSISQAAVLRUjEkAAAC4VIg1AAAAvFSQNQAAGLS4TQAAAJQ==", "base64"));
  const args=[];
  //args.push([...Buffer.from(idget.toString())]);
  //const args=[];
  args.push([...Buffer.from(accounts[0].address)]);//creator address
  args.push([...Buffer.from('RWYPYF5XX40P2L6BCMZAA4ETP3S3HSF32QSWSGMXAU05NBJPKPHR6YCCAE')]);//lsig address
  args.push([...Buffer.from('')]);

  let lsig = algosdk.makeLogicSig(program,args);

//let ctxn = algosdk.makeAssetConfigTxnWithSuggestedParams(accounts[0].address, note, 
//parseInt(idget), lsig.address(), lsig.address(), lsig.address(), lsig.address(), params);        
console.log("275")
//let rawSignedTxn = algosdk.signLogicSigTransaction(ctxn,lsig).blob;
console.log("277")
//let ctx = (await algodClient.sendRawTransaction(rawSignedTxn).do());
console.log("279")
//let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(accounts[0].address,lsig.address(),undefined,undefined,1,undefined,parseInt(idget),params);     
//let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(item.bid,accounts[0].address,undefined,undefined,1,undefined,parseInt(item.title),params);
//console.log("282",txn)


// const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
// AlgoSigner.signTxn([{txn: txn_b64}]) 
// .then((d) => {
//   let signedTxs = d;
//   console.log("289",signedTxs)
//   //signCodeElem.innerHTML = JSON.stringify(d, null, 2);
//   AlgoSigner.send({
//     ledger: 'TestNet',
//     tx: signedTxs[0].blob
//   })
//   .then((d) => {
//     let tx = d;
//     console.log("282")
  
    
  
//   })
//   .catch((e) => {
//     console.error(e);
//   });
  

// })
// .catch((e) => {
//   console.error(e);
// });


algodClient.getTransactionParams().do()
.then((d) => {
  let txParamsJS = d;
  
  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: accounts[0].address,
    to: lsig.address(),
    assetIndex: +parseInt(idget),
    note: undefined,
    amount: 0,
    manager:lsig.address(),
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

      
      





      fireDb.database().ref(`imagerefAlgo/${getalgo}`).child(item.highestBid).update({
        id:idget,imageUrl:item.image,priceSet:urlprize,cAddress:item.categoryText,keyId:item.highestBid,
          userName:item.counter,userSymbol:"Algos",ipfsUrl:item.ipfsurl,
          ownerAddress:item.bid,soldd:item.soldd,extra1:item.extra,
          previousoaddress:item.previousaddress,datesets:item.date,
          description:item.description,whois:'readytosale',history:item.url,Mnemonic:item.Mnemonic
        
        }).then(()=>{  
        setIsOpens(false);
        setIsOpenss(true)    
        })

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

  

  //let params = d;
  //let accounts = d;
  



//let signedTxn = algosdk.signLogicSigTransaction(txn,lsig).blob;
//let ctxs = (await algodClient.sendRawTransaction(signedTxn).do());
//await waitForConfirmation(algodClient,ctxs.txId)




// })
// .catch((e) => {
//   console.error(e);
// });

  //let  params = await algodClient.getTransactionParams().do();
  //comment out the next two lines to use suggested fee
  //params.fee = 1000;
  //params.flatFee = true;

  //console.log("251")
  
  })
  .catch((e) => {
    console.error(e);
  });
})
.catch((e) => {
  console.error(e);
});
      
    



      //end

      //let program = new Uint8Array(Buffer.from("AyAEAwHFxKUO6AcyBCISRDMBECMSRDMCEiMSRDMCESQSRDMCASUORDMCFTIDEkQzAiAyAxJEI0M=", "base64"));
    //let program = new Uint8Array(Buffer.from("AiAHewYBBAAFAyYFAVMBQgJCTgJTTgFDMwAYIhIzABAjEhAxCTIDEhAxIDIDEhBAAAEANwAaACgSQAFrNwAaACkSQAEtNwAaACoSQACNNwAaACsSQAANNwAaACcEEkAAAQAkQzIEJRIzAhAlEhAzAhEiEhAzAhQzAAASEEAAAQAzAxAlEjMDESISEDMDEiQSEEAAAQAzARAkEjMBADMAABIQQAABADMDADMAABJBAA0zAQgzAgEPQAABACRDMwMAMwAAE0EAETMBCDMCATMDAQgPQAABACRDIQRDMwIQJRIzAhEiEhAzAhQzAAASMwIAMwAAEhEQMgQhBRIQQAABADMDECUSMwMRIhIQMwMSJBIQQAABADMEECUSMwQRIhIQQAABADMBECQSMwEAMwAAEhBAAAEAMwIAMwAAEkEAETMBCDMDATMEAQgPQAABACRDMwIUMwAAEkEAFTMBCDMCATMDAQgzBAEID0AAAQAkQyEEQzIEIQYSMwIQJRIQMwIRIhIQMwIUMwAAEhAzARAkEhAzAQAzAAASEDMBCDMCAQ8QQAABACRDMgQhBhIzARAkEhAzAQAzAAASEDMBCDMCAQ8QMwIQJRIQMwIRIhIQMwISJBIQMwIUMwAAEhBAAAEAJEM=", "base64"));
    //const args=[];
    //args.push([...Buffer.from(idget.toString())]);
    //args.push([...Buffer.from(addr2)]);
    //args.push([...Buffer.from('')]);
    
    //let lsig = algosdk.makeLogicSig(program,args);

  //     AlgoSigner.accounts({
  //       ledger: 'TestNet'
  //     })
  //     .then((d) => {
  //       let accounts = d;
      
  //   const algosdk = require('algosdk');
  //   const algodServer = 'https://testnet-algorand.api.purestake.io/ps2'
  //   const indexerServer = 'https://testnet-algorand.api.purestake.io/idx2'
  //   const token = { 'X-API-Key': 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin' }
  //   const port = '';
  //   let note = undefined;

  //  let algodClient = new algosdk.Algodv2(token, algodServer, port);

   
  //   algodClient.getTransactionParams().do()
  //   .then((d) => {
  //     let txParamsJS = d;
  //     //document.getElementById('paramsprint').innerHTML = JSON.stringify(d);
      
  //     const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
  //       from: accounts[0].address,
  //       to: lsig.address(),
  //       assetIndex: parseInt(idget),
  //       note: AlgoSigner.encoding.stringToByteArray("hello"),
  //       amount: 0,
  //       suggestedParams: {...txParamsJS}
  //     });
      
  //     // Use the AlgoSigner encoding library to make the transactions base64
  //     const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
      
  //     AlgoSigner.signTxn([{txn: txn_b64}]) 
  //     .then((d) => {
  //       let signedTxs = d;
  //       //signCodeElem.innerHTML = JSON.stringify(d, null, 2);
  //       AlgoSigner.send({
  //           ledger: 'TestNet',
  //           tx: signedTxs[0].blob
  //         })
  //         .then((d) => {
  //           let tx = d;
  
  

//           })
//           .catch((e) => {
//             console.error(e);
//           });

//       })
//       .catch((e) => {
//         console.error(e);
//       });
//     })
//     .catch((e) => {
//       console.error(e);
//     })    
// })
// .catch((e) => {
//   console.error(e);
// });


      
// AlgoSigner.connect()
// .then((d) => {

//   const algosdk = require('algosdk');
//      const algodServer = 'https://testnet-algorand.api.purestake.io/ps2'
//      const indexerServer = 'https://testnet-algorand.api.purestake.io/idx2'
//      const token = { 'X-API-Key': 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin' }
//      const port = '';

//     let algodClient = new algosdk.Algodv2(token, algodServer, port);
//     algodClient.healthCheck().do()
// .then(d => { 
  
//   AlgoSigner.accounts({
//     ledger: 'TestNet'
//   })
//   .then((d) => {
//     let accounts = d;
//     algodClient.getTransactionParams().do()
// .then((d) => {
//   var recoveredAccount1 = algosdk.mnemonicToSecretKey(item.Mnemonic);
//   let txParamsJS = d;
//   const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
//     from: accounts[0].address,
//     to: recoveredAccount1.addr,
//     assetIndex: +parseInt(idget),
//     note: AlgoSigner.encoding.stringToByteArray("nothing"),
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
//       ledger: 'TestNet',
//       tx: signedTxs[0].blob
//     })
//     .then((d) => {
//       let tx = d;


//       //transfer thiru     
//       //end thiru

//       //db here

//       let checkdb=fireDb.database().ref(`imagerefAlgo/${item.bid}`).child(item.highestBid);
//     console.log("cdb",checkdb)
//     console.log("odb",item.bid)
//     console.log("hdb",item.highestBid)


    

//     })
//     .catch((e) => {
//       console.error(e);
//     });
//   })
//   .catch((e) => {
//     console.error(e);
//   });
// })
// .catch((e) => {
//   console.error(e);
// });
//   })
//   .catch((e) => {
//     console.error(e);
//   });
// })
// .catch(e => { 
//   console.error(e); 
// });
  
// })
// .catch((e) => {
//   console.error(e);
// });    
    })().catch(e => {
        console.log(e);
    });
  }

  else{
    alert("Your are not owner so you does not update or set prizes......")
    }
  }
}


    

    // let getting=[];
    //   getting=item.url;
    //   console.log("gett",getting)
    //   getting.push(item.bid)    
//     fireDb.database().ref(`imageref/${item.bid}`).child(item.highestBid).update({
//       id:"",imageUrl:item.image,priceSet:getprize,cAddress:item.categoryText,keyId:item.highestBid,userName:item.counter,
//       userSymbol:"BNB",ipfsUrl:"",
//       ownerAddress:item.bid,soldd:"",extra1:"",
//       //history:item.url,
//       previousoaddress:"",datesets:new Date().toDateString(),whois:'',
//       description:""
//  }).then(()=>{
//   window.location.reload(false)   
//  })


          //   var isd = item.title;//a
          //   console.log("targetid",isd)
          //   console.log(`a`,item)
          //   let getaaaa=new web3.eth.Contract(abi,item.categoryText);
          //   //alert("con address"+a.addcAdd);
          //   //alert("token id"+isd);
          //   const accounts = await  web3.eth.getAccounts();
          //   console.log("checking")          
          //   let price=getprize;
          //   if(accounts[0] === item.bid)
          //   {
          //     //change mactimum



          //     setIsOpens(true);
          //     await getaaaa.methods.setTokenState([isd],"true").send({
          //       from:accounts[0],
          //       //gas: 51753,
          //       //gasPrice:'10000000000'
          //     });
              
          //  // salepage.settokenstate();
          //   await getaaaa.methods.setTokenPrice([isd],price).send({
          //     from:accounts[0],
          //     //gas: 51753,
          //     //gasPrice:'10000000000'
          //   })
          //   //const priceamount = await getaaaa.methods.items(isd).call();
          //   //console.log(priceamount.price)
          //   // await getaaaa.methods.setApprovalForAll(a.addcAdd,"true").send({from:accounts[0]})
          //   await getaaaa.methods.approve(item.categoryText,item.title).send({
          //     from:accounts[0],
          //     //gas: 51753,
          //     //gasPrice:'10000000000'
          //   })

            
          //   // let refsellers=fireDb.database().ref(`sellerssavedb/${accounts[0]}`);//.child(a.addKeyI);//ref1
          //   // const keysellers = refsellers.push().key;          
          //   // refsellers.child(keysellers).set({
          //   //   id:a.addIds,imageUrl:a.addImgs,priceSet:price,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addName,userSymbol:a.addSymbol,ipfsUrl:a.addIpfs,ownerAddress:accounts[0],
          //   //   soldd:"",extra1:"readytosold",datesets:new Date().toDateString(),whois:'Sellers'
          //   // })            

//               id:item.title,imageUrl:item.image,priceSet:price,cAddress:item.categoryText,keyId:item.highestBid,userName:item.counter,userSymbol:"BNB",ipfsUrl:item.image,ownerAddress:accounts[0],
//               soldd:"",extra1:"readytosold",datesets:new Date().toDateString(),whois:'Sellers'
// }).then(()=>{

  //setTprice("");
  //setIsOpensetFirst(false);
  //setIsOpen(true);


  
    //window.location.reload(false)   

//})
// fireDb.database().ref(`imagerefexplore/${accounts[0]}`).child(a.addKeyI).set({
//               id:a.addIds,imageUrl:a.addImgs,priceSet:price,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addName,userSymbol:a.addSymbol,ipfsUrl:a.addIpfs,ownerAddress:accounts[0],
//               soldd:"",extra1:"readytosold",datesets:new Date().toDateString(),whois:'Sellers'
// }).then(()=> {
//   setTprice("");
//   //setIsOpensetFirst(false);
//   setIsOpen(true);
//  });  
}

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
    history.push("/")
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
