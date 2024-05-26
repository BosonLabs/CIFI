/* global AlgoSigner */
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
//Link,
import cn from "classnames";
import styles from "./UploadDetails.module.sass";
//import Dropdown from "../../components/Dropdown";
import Icon from "../../components/Icon";
import TextInput from "../../components/TextInput";
//import Switch from "../../components/Switch";
import Loader from "../../components/Loader";
//import Modal from "../../components/Modal";
//import Preview from "./Preview";
//import Cards from "./Cards";
//import FolowSteps from "./FolowSteps";
import Compress from "react-image-file-resizer";
//import ipfs from "./ipfs";
//import lottery from './nftcontract';//this line import lottery folder
//import web3 from './web3';
import fireDb from './firebase';
import FolowStepsd from "./FolowStepsD";
import Modald from "../../components/ModalD";
import FolowStepsdr from "./FolowStepsdr";
//import { DropDownList } from "progress/kendo-react-dropdowns";
//import Modald from "../../components/ModalD";

//import Modald from "../../components/ModalD";
import FolowStep from "../../screens/Profile/FolowStep";
//import Select from 'react-select';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import DropdownEmpty from "../../components/DropdownEmpty";
//../../../components/DropdownEmpty

//const royaltiesOptions = ["10%", "20%", "30%"];

// const items = [
//   {
//     title: "Create collection",
//     color: "#4BC9F0",
//     onclick:()=>{
//       console.log("Create collection")
//     }
//   },
//   {
//     title: "Crypto Legend - Professor",
//     color: "#45B26B",
//     onclick:()=>{
//       console.log("crypto 2")
//     }
//   },
//   {
//     title: "Crypto Legend - Professor",
//     color: "#EF466F",
//     onclick:()=>{
//       console.log("crypto Legend")
//     }
//   },
//   {
//     title: "Legend Photography",
//     color: "#9757D7",
//     onclick:()=>{
//       console.log("Legend")
//     }
//   },
// ];
import axios from 'axios';

const Upload = () => {

  //const directionOptions = ["Sellers", "Buyers"];

  const [selected, setSelected] = React.useState("Minor League");
  const [selectedImg, setSelectedImg] = React.useState("");

  console.log("Selec",selectedImg)

  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
  };

  console.log("Sel1",selected)

  const [selected2, setSelected2] = React.useState("Atlanta Fire");

  const changeSelectOptionHandler2 = (event) => {
    if(event.target.value === "Atlanta Fire")
    {
      setSelected2("Atlanta Fire");
      setSelectedImg("/images/AtlantaFire.png");
    }else if(event.target.value === "Atlanta Param Veers"){
      setSelected2("Atlanta Param Veers");
      setSelectedImg("/images/AtlantaParamVeers.png");
    }else if(event.target.value === "Florida Beamers"){
      setSelected2("Florida Beamers");
      setSelectedImg("/images/FloridaBeamers.png");
    }else if(event.target.value === "Ft. Lauderdale Lions"){
      setSelected2("Ft. Lauderdale Lions");
      setSelectedImg("/images/FT.LauderdaleLions.png");
    }else if(event.target.value === "Morrisville Cardinals"){
      setSelected2("Morrisville Cardinals");
      setSelectedImg("/images/MorrisviCardinals.png");
    }else if(event.target.value === "Orlando Galaxy"){
      setSelected2("Orlando Galaxy");
      setSelectedImg("/images/OrlandoGalaxy.png");
    }else if(event.target.value === "DC Hawks"){
      setSelected2("DC Hawks");
      setSelectedImg("/images/DcHawks.png");
    }else if(event.target.value === "Empire State Titans"){
      setSelected2("Empire State Titans");
      setSelectedImg("/images/EmpireStateTitans.png");
    }else if(event.target.value === "Manhattan Yorkers"){
      setSelected2("Manhattan Yorkers");
      setSelectedImg("/images/ManhattanYorkers.png");
    }else if(event.target.value === "New England Eagles"){
      setSelected2("New England Eagles");
      setSelectedImg("/images/NewEnglandEagles.png");
    }else if(event.target.value === "New Jersey Somerset Cavaliers"){
      setSelected2("New Jersey Somerset Cavaliers");
      setSelectedImg("/images/NewJerseySomersetCavaliers.png");
    }else if(event.target.value === "New Jersey Stallions"){
      setSelected2("New Jersey Stallions");
      setSelectedImg("/images/NewJerseyStallions.png");
    }else if(event.target.value === "The Philadelphians"){
      setSelected2("The Philadelphians");
      setSelectedImg("/images/ThePhiladelphians.png");
    }else if(event.target.value === "Austin Athletics"){
      setSelected2("Austin Athletics");
      setSelectedImg("/images/AustinAthletics.png");
    }else if(event.target.value === "Chicago Blasters"){
      setSelected2("Chicago Blasters");
      setSelectedImg("/images/ChicagoBlasters.png");
    }else if(event.target.value === "Chicago Catchers"){
      setSelected2("Chicago Catchers");
      setSelectedImg("/images/ChicagoCatchers.png");
    }else if(event.target.value === "Houston Hurricanes"){
      setSelected2("Houston Hurricanes");
      setSelectedImg("/images/HoustonHurricanes.png");
    }else if(event.target.value === "Irving Mustangs"){
      setSelected2("Irving Mustangs");
      setSelectedImg("/images/IrvingMustangs.png");
    }else if(event.target.value === "Michigan Cricket Stars"){
      setSelected2("Michigan Cricket Stars");
      setSelectedImg("/images/MichiganCricketStars.png");
    }else if(event.target.value === "St. Louis Americans"){
      setSelected2("St. Louis Americans");
      setSelectedImg("/images/ST.LouisAmericans.png");
    }else if(event.target.value === "East Bay Blazers"){
      setSelected2("East Bay Blazers");
      setSelectedImg("/images/EastBayBlazers.png");
    }else if(event.target.value === "Golden State Grizzlies"){
      setSelected2("Golden State Grizzlies");
      setSelectedImg("/images/GoldenStateGrizzlies.png");
    }else if(event.target.value === "Hollywood Master Blasters"){
      setSelected2("Hollywood Master Blasters");
      setSelectedImg("/images/HollywoodMasterBlasters.png");
    }else if(event.target.value === "San Diego Surf Riders"){
      setSelected2("San Diego Surf Riders");
      setSelectedImg("/images/SanDiegoSurfRiders.png");
    }else if(event.target.value === "Seattle Thunderbolts"){
      setSelected2("Seattle Thunderbolts");
      setSelectedImg("/images/SeattleThunderBolts.png");
    }else if(event.target.value === "Silicon Valley Strikers"){
      setSelected2("Silicon Valley Strikers");
      setSelectedImg("/images/SiliconValleyStrikers.png");
    }else if(event.target.value === "Socal Lashings"){
      setSelected2("Socal Lashings");
      setSelectedImg("/images/SocalLashings.png");
    }
    else{
      setSelected2("Others");
      setSelectedImg("");
    }
    
  };

  console.log("Sel2",selected2)


  const [selected3, setSelected3] = React.useState("Award");

  const changeSelectOptionHandler3 = (event) => {
    setSelected3(event.target.value);
  };

  console.log("Sel2",selected2)

  const [selected4, setSelected4] = React.useState("2D");

  const changeSelectOptionHandler4 = (event) => {
    setSelected4(event.target.value);
  };

  console.log("Sel4",selected4)

  


  // const actionsextra = [
  //   {label:"Abhiram Bolisetty",value:1},
  //   { label: "Aditya Gupta", value: 2 },
  //   { label: "Aditya Padala", value: 3 },
  //   { label: "Aryan Shah", value: 4 },
  //   {label:"Conrad Lotz",value:5},
  //   { label: "Gautham Ravindran", value: 6 },
  //   { label: "Jaskaran Malhotra", value: 7 },
  //   { label: "Karthikeya Jagadish", value: 8 },
  //   {label:"Kiran Saravanakumar",value:9},
  //   { label: "Kirk Thompson", value: 10 },
  //   { label: "Kunal Sehgal", value: 11 },
  //   { label: "Muhammad Abdullah Shah", value: 12 },
  //   {label:"Murali Krishna Ankaraju",value:13},
  //   { label: "Rohan Phadke", value: 14 },
  //   { label: "Ruvindu Gunasekera", value: 15 },
  //   { label: "Ryan Wiggins", value: 16 },
  //   {label:"Sanjay Stanley",value:17},
  //   { label: "Siva Kumar Duvvarapu", value: 18 }    
  // ];
  

  // const [Lname,setLname]= useState(leaguename[0].value);
  // console.log("Lname",Lname)
  // const [Tname,setTname]= useState(teamname[0].value);
  // console.log("Tname",Tname)
  let ta;
  let tb;
  let te;
  //
  let history=useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpens, setIsOpens] = useState(false);
  const [ipfsHash,setIpfsHash] = useState(null);
  //const [ipf,setIpf] = useState(null);
  const [buffer,setBuffer] = useState("");
  const [Img,setImg] = useState("")
  const [tname,setName] = useState("");
  const [tdescription,setDescription] = useState("");
  const [tmnemonic,setMnemonic] = useState("");
  //const [isLoading, setLoading] = useState(false)
  //const [currentid, setCurrentid] = useState("");
  let ge;

  console.log("description",tdescription)
  //
  //create nft in this page
  //const [royalties, setRoyalties] = useState(royaltiesOptions[0]);
  //const [sale, setSale] = useState(true);
  //const [price, setPrice] = useState(false);
  //const [locking, setLocking] = useState(false);

  const [visibleModal, setVisibleModal] = useState(false);//open

  //const [visiblePreview, setVisiblePreview] = useState(false);

  // const filess=()=>{

  //   console.log(royaltiesOptions[0]);
  //   console.log(sale)
  //   console.log(price)
  //   console.log(locking)
  //   console.log(royalties)

  // }

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
    console.log(reader)
    
  };
  
const convertToBuffer = async(reader) => {
  //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
  //set this buffer -using es6 syntax
    setBuffer(buffer);
};
// const onSubmitImage = async (event) => {

//   console.log("onsubmitimage called")
//     await ipfs.add(buffer, (err, ipfsHash) => {
//       console.log(err,ipfsHash);
//       console.log("buff",buffer);
//       setIpfsHash(ipfsHash[0].hash);
//       console.log(ipfsHash[0].hash)
//       const CID = require('cids')
//       var cid = new CID(ipfsHash[0].hash)
//       //let ccp=cid.toV1().toBaseEncodedString('base32');
//       console.log( cid.toV1().toBaseEncodedString('base32'));
//       //setIpf(cid.toV1().toBaseEncodedString('base32'));      
      
//     }).then(()=>{

//       //setVisiblePreview(true)
//     });
// }; 
//end

// const onSubmitAlgo = async()=>{

//   let params;
//   //event.preventDefault();

//   //const axios = require('axios');
//   let pinataApiKey='88348e7ce84879e143e1';
//     let pinataSecretApiKey='e4e8071ff66386726f9fe1aebf2d3235a9f88ceb4468d4be069591eb78d4bf6f';

//   const pinataSDK = require('@pinata/sdk');
//   const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey);


//   setVisibleModal(false)
//   var ta=tname;
//     var tb='Algos';
//     //var tb=tdescription;
//     //var tc='https://ipfs.io/ipfs/'+ipfsHash;
//     //var td=toaddress;
//     //var te=tid;
//     tf='https://ipfs.io/ipfs/'+ipfsHash;
//     //let tdescription=tdes;

//     // let ref23=fireDb.database().ref(`tokenkey`);      
//     //   let getfire="";
//     //   let setfire="";
//     //   fireDb.database().ref(`tokenkey`).on("value", (data) => {
//     //     if (data) {
//     //        data.forEach((d) => {
//     //         getfire=d.val();
//     //       });        
//     //     }
//     //   });

//     //   setfire= (parseInt(getfire)+parseInt(1));
//     //   console.log("setfire",setfire)
//     //   //alert("your token"+setfire+"getfire"+getfire);
//     //   ref23.update({id:setfire.toString()});
//     //   var te= parseInt(getfire);
//     //   //var te=5;
//     //   console.log("te",te)

//       //algo start

//       let accounts;
//       let txParams;
//       let signedTx;
//       let tx;
    
//     //let assname=prompt("Please enter your asset name");
//     //let asssymbol=prompt("Please enter your asset symbol");

//     let assname=tname;
//     let asssymbol="BNB";
    
//     if(assname === '' && asssymbol === '' ){

//       alert("please enter name or symbol")
//     }
//     else{

//       console.log("name",assname)
//       console.log("symbol",asssymbol)
//       //console.log("symbol",tmnemonic)

//       AlgoSigner.connect()
// .then((d) => {

//   AlgoSigner.accounts({
//     ledger: 'TestNet'
//   })
//   .then((d) => {
//     accounts = d;
//     console.log("acc",accounts[0].address)

//     AlgoSigner.algod({
//       ledger: 'TestNet',
//       path: '/v2/transactions/params'
//     })
//     .then((d) => {
//       txParams = d;
//       console.log("txp",txParams)

//       AlgoSigner.sign({
//         from: accounts[0].address,
//         assetName: assname,
//         assetUnitName: asssymbol,
//         assetTotal: +1,
//         assetDecimals: +0,
//         note: undefined,
//         type: 'acfg',
//         fee: txParams['min-fee'],
//         firstRound: txParams['last-round'],
//         lastRound: txParams['last-round'] + 1000,
//         genesisID: txParams['genesis-id'],
//         genesisHash: txParams['genesis-hash'],
//         flatFee: true
//       })
//       .then((d) => {
//         signedTx = d;
//         console.log("singTx",signedTx)

//         AlgoSigner.send({
//           ledger: 'TestNet',
//           tx: signedTx.blob
//         })
//         .then((d) => {
//           tx = d;

//           console.log("last",tx)
//           localStorage.setItem("txdid",tx.txId);

//           const server = "https://testnet-algorand.api.purestake.io/ps2";
//   const port = "";

// const token = {
//     'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
// }


// const algosdk = require('algosdk');


// // Function used to wait for a tx confirmation
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


// // Function used to print created asset for account and assetid
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
// // Function used to print asset holding for account and assetid
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
// }
// var account1_mnemonic = tmnemonic;
// var account2_mnemonic = tmnemonic;


// var recoveredAccount1 = algosdk.mnemonicToSecretKey(account1_mnemonic);
// var recoveredAccount2 = algosdk.mnemonicToSecretKey(account2_mnemonic);
// //var recoveredAccount3 = algosdk.mnemonicToSecretKey(account3_mnemonic);
// console.log(recoveredAccount1.addr);
// console.log(recoveredAccount2.addr);
// //console.log(recoveredAccount3.addr);

// // Instantiate the algod wrapper

//   let algodclient = new algosdk.Algodv2(token, server, port);

// // Debug Console should look similar to this

// // ATTR6RUEHHBHXKUHT4GUOYWNBVDV2GJ5FHUWCSFZLHD55EVKZWOWSM7ABQ
// // AK6Q33PDO4RJZQPHEMODC6PUE5AR2UD4FBU6TNEJOU4UR4KC6XL5PWW5K4
// // IWR4CLLCN2TIVX2QPVVKVR5ER5OZGMWAV5QB2UIPYMPKBPLJZX4C37C4AA

// (async () => {
//   // Asset Creation:
//   // The first transaciton is to create a new asset
//   // Get last round and suggested tx fee
//   // We use these to get the latest round and tx fees
//   // These parameters will be required before every 
//   // Transaction
//   // We will account for changing transaction parameters
//   // before every transaction in this example
//   params = await algodclient.getTransactionParams().do();
//   //comment out the next two lines to use suggested fee
//   params.fee = 1000;
//   params.flatFee = true;
//   console.log(params);
//   let note = undefined; // arbitrary data to be stored in the transaction; here, none is stored
//   // Asset creation specific parameters
//   // The following parameters are asset specific
//   // Throughout the example these will be re-used. 
//   // We will also change the manager later in the example
//   let addr = recoveredAccount1.addr;
//   // Whether user accounts will need to be unfrozen before transacting    
//   let defaultFrozen = false;
//   // integer number of decimals for asset unit calculation
//   let decimals = 0;
//   // total number of this asset available for circulation   
//   let totalIssuance = 1000;
//   // Used to display asset units to user    
//   let unitName = "Algos";
//   // Friendly name of the asset    
//   let assetName = assname;
//   // Optional string pointing to a URL relating to the asset
//   let assetURL = "http://someurl";
//   // Optional hash commitment of some sort relating to the asset. 32 character length.
//   let assetMetadataHash = "16efaa3924a6fd9d3a4824799a4ac65d";
//   // The following parameters are the only ones
//   // that can be changed, and they have to be changed
//   // by the current manager
//   // Specified address can change reserve, freeze, clawback, and manager
//   let manager = recoveredAccount2.addr;
//   // Specified address is considered the asset reserve
//   // (it has no special privileges, this is only informational)
//   let reserve = recoveredAccount2.addr;
//   // Specified address can freeze or unfreeze user asset holdings 
//   let freeze = recoveredAccount2.addr;
//   // Specified address can revoke user asset holdings and send 
//   // them to other addresses    
//   let clawback = recoveredAccount2.addr;

//   // signing and sending "txn" allows "addr" to create an asset
//   let txn = algosdk.makeAssetCreateTxnWithSuggestedParams(addr, note,
//        totalIssuance, decimals, defaultFrozen, manager, reserve, freeze,
//       clawback, unitName, assetName, assetURL, assetMetadataHash, params);

//   let rawSignedTxn = txn.signTxn(recoveredAccount1.sk)
//   let tx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
//   console.log("Transaction : " + tx.txId);
//   let assetID = null;
//   // wait for transaction to be confirmed
//   await waitForConfirmation(algodclient, tx.txId);
//   // Get the new asset's information from the creator account
//   let ptx = await algodclient.pendingTransactionInformation(tx.txId).do();
//   assetID = ptx["asset-index"];
//  // console.log("AssetID = " + assetID);
  
//   await printCreatedAsset(algodclient, recoveredAccount1.addr, assetID);
//   await printAssetHolding(algodclient, recoveredAccount1.addr, assetID);
  
//   params = await algodclient.getTransactionParams().do();
//   //comment out the next two lines to use suggested fee
//   params.fee = 1000;
//   params.flatFee = true;
//   // Asset configuration specific parameters
//   // all other values are the same so we leave 
//   // Them set.
//   // specified address can change reserve, freeze, clawback, and manager
//   manager = recoveredAccount1.addr;

//   // Note that the change has to come from the existing manager
//   let ctxn = algosdk.makeAssetConfigTxnWithSuggestedParams(recoveredAccount2.addr, note, 
//       assetID, manager, reserve, freeze, clawback, params);

//   // This transaction must be signed by the current manager
//   rawSignedTxn = ctxn.signTxn(recoveredAccount2.sk)
//   let ctx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
//   console.log("Transaction : " + ctx.txId);
//   // wait for transaction to be confirmed
//   await waitForConfirmation(algodclient, ctx.txId);

//   // Get the asset information for the newly changed asset
//   // use indexer or utiltiy function for Account info

//   // The manager should now be the same as the creator
//   await printCreatedAsset(algodclient, recoveredAccount1.addr, assetID);

//   let nftname=fireDb.database().ref(`nftname`);
//           const nftdb = nftname.push().key;
//           nftname.child(nftdb).set({name:tname});                  
//           let ref2=fireDb.database().ref(`imageref/${accounts[0].address}`);
//           let dateset=new Date().toDateString();
//           console.log("dateget",dateset)
//           const db = ref2.push().key;                         
//           console.log("dbcheck",db)
//           let his=[accounts[0].address]
//           ref2.child(db).set({id:"",imageUrl:Img,priceSet:"",cAddress:tx.txId,keyId:db,userName:ta,userSymbol:"Algos",ipfsUrl:tf,ownerAddress:accounts[0].address,soldd:"",extra1:"",previousoaddress:"",datesets:dateset,whois:'',description:tdescription,privatekey:tmnemonic,paramsdb:params,history:his}).then(()=>{
//           // let ref23=fireDb.database().ref(`imagepurcre/${accounts[4].address}`);                
//           // ref23.child(db).set({id:"",imageUrl:Img,priceSet:"",cAddress:tx.txId,keyId:db,userName:ta,userSymbol:tb,ipfsUrl:"",ownerAddress:accounts[0].address,soldd:"",extra1:"",datesets:dateset,whois:'',description:tdescription,privatekey:tmnemonic}).then(()=>{

//             pinata.testAuthentication().then((result) => {
//               //handle successful authentication here
//               console.log(result);
      
//               let ge=ipfsHash;
//               console.log("ipfsHash",ipfsHash);
//                       const body = {
//                           message: ge
//                       };
//                       const options = {
//                           pinataMetadata: {
//                               name: tname,
//                               keyvalues: {
//                                   customKey: 'customValue',
//                                   customKey2: 'customValue2'
//                               }
//                           },
//                           pinataOptions: {
//                               cidVersion: 0
//                           }
//                       };
//                       pinata.pinJSONToIPFS(body, options).then((result) => {
//                           //handle results here
//                           console.log(result);
//                           console.log("jsonresult")
//                           //setVisibleModal(false)
//                           setIsOpen(true);
      
                          
//                         }).catch((err) => {
//                             //handle error here
//                             console.log(err);
//                         });
      
      
//                       }).catch((err) => {
//                           //handle error here
//                           console.log(err);
//                       });
            

            

//           })    


// })().catch(e => {
//   console.log(e);
//   console.trace();
// });


//           // fireDb.database().ref("contractaddress").child(accounts[4].address).push(tx.txId, (err) => {
//           //   //   console.log(obj, "obj");
//           //   if (err)
//           //       console.log(err);
//           //   //else 
//           // //setCurrentid("");
//           // });
                        
          

//           //callingss();

//           //opt();

//           // AlgoSigner.algod({
//           //   ledger: 'TestNet',
//           //   path: '/v2/transactions/pending/' + tx.txId
//           // })
//           // .then((d) => {
//           //   console.log(d);
//           //   console.log("lastlast",d)
//           // })
//           // .catch((e) => {
//           //   console.error(e);
//           // });

//         })
//         .catch((e) => {
//           console.error(e);
//         });
//       })
//       .catch((e) => {
//         console.error(e);
//       });
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
    
// }   

//       //algo end

// }


const addfire=()=>{

  let ref23=fireDb.database().ref(`tokenkey`);      
      let getfire="";
      let setfire="";
      fireDb.database().ref(`tokenkey`).on("value", (data) => {
        if (data) {
           data.forEach((d) => {
            getfire=parseInt(d.val());
            setfire= parseInt(getfire)+1;
            console.log("getfire",getfire)
            console.log("setfire",setfire)
            
          });         
        }
      })
      //ref23.update({id:setfire});

      
      
      // console.log("setfire",setfire)
      // //alert("your token"+setfire+"getfire"+getfire);      
      te= getfire;
      let ts= setfire;
            if(ts === "")
            {
              console.log("empty",ts)
              te=1000
              ref23.update({id:te.toString()});
            }
            else{
              console.log("notempty")
              //setfire= parseInt(getfire)+1;
              //te=parseInt(getfire)
              ref23.update({id:setfire});
            }
      console.log("te",te)    
}

useEffect(()=>{addfire()},[])


const onSubmitNFT = async (event) => {
  event.preventDefault();  
    //new write below

    if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === 'undefined' || localStorage.getItem("wallet") === ''){


      console.log("Empty",localStorage.getItem("wallet"))

    }
    else{


     if(tmnemonic === null || tmnemonic === "" || tmnemonic === " "){

       alert("please Enter your Mnemonic")

     }

      else{

    //   await ipfs.add(buffer, (err, ipfsHash) => {
    //   console.log(err,ipfsHash);
    //   console.log("buff",buffer);
    //   setIpfsHash(ipfsHash[0].hash);
    //   console.log(ipfsHash[0].hash)
    //   const CID = require('cids')
    //   var cid = new CID(ipfsHash[0].hash)
    //   //let ccp=cid.toV1().toBaseEncodedString('base32');
    //   console.log( cid.toV1().toBaseEncodedString('base32'));
    //   //setIpf(cid.toV1().toBaseEncodedString('base32'));      
      
    // }).then(()=>{

    //   //setVisiblePreview(true)
    // }); 


    //const accounts = await web3.eth.getAccounts();
    //console.log("acc",accounts[0]);
    ta=tname;
    tb='ALGO';
    te=1000;
    let idget="";
    let txnInfo;


    console.log("uploadonecheck",ta);
    console.log("uploadtwocheck",tb);
    console.log("uploadtwocheck",te);

    //var tb=tdescription;
    //var tc='https://ipfs.io/ipfs/'+ipfsHash;
    //var td=toaddress;
    //var te=tid;
    //tf='https://ipfs.io/ipfs/'+ipfsHash;
    //let tdescription=tdes;

    setVisibleModal(false)                        
      
      // if(Img === '')
      // {

      //   alert("Please upload images...")

      // }
      //else{
    
      
const algosdk = require('algosdk');  

let accounts;
let tx;
const server = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";  
const token = {
      'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
}
//const indexerserver = 'https://testnet-algorand.api.purestake.io/idx2';
//const indexport='';
//let algoindexer = new algosdk.Indexer(token,indexerserver,indexport);

let algodClient = new algosdk.Algodv2(token, server, port);
//const algosdk = require('algosdk');  

//const port = "";
//const token = {
  //'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
//}
//const baseServer = "https://testnet-algorand.api.purestake.io/idx2";
//let indexerClient = new algosdk.Indexer(token, baseServer, port);
AlgoSigner.connect()
.then((d) => {
console.log("tested1")
algodClient.healthCheck().do()
.then(d => { 
  
  AlgoSigner.accounts({
    ledger: 'TestNet'
  })
  .then((d) => {
    console.log("tested2",d)
    accounts = d;
    console.log("algoacc",accounts[0].address)
    algodClient.getTransactionParams().do()
.then((d) => {
  let txParamsJS = d;
  console.log("txparamsJS",txParamsJS)
  let program = new Uint8Array(Buffer.from("ASAEADoKAS0VIhJAACIvFSISQAAVLRUjEkAAAC4VIg1AAAAvFSQNQAAGLS4TQAAAJQ==", "base64"));
  const args=[];
  //args.push([...Buffer.from(idget.toString())]);
  //const args=[];
  args.push([...Buffer.from(accounts[0].address)]);//creator address
  args.push([...Buffer.from('RWYPYF5XX40P2L6BCMZAA4ETP3S3HSF32QSWSGMXAU05NBJPKPHR6YCCAE')]);//lsig address
  args.push([...Buffer.from('')]);

  let lsig = algosdk.makeLogicSig(program,args);
  //let thirumnemonic= 'empower twist carpet lawsuit across tape add leopard prevent abandon squeeze egg clown river funny sea labor level scheme race crime mystery party absent exist'
  //var recoveredAccount1 = algosdk.mnemonicToSecretKey(thirumnemonic);
  const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({    
    from: accounts[0].address,
    assetName: tname,
    unitName: tb,
    total: 1,
    decimals: 0,
    note: AlgoSigner.encoding.stringToByteArray("nothing"),
    //manager:lsig.address(),
    manager:accounts[0].address,
    reserve:accounts[0].address,
    freeze: accounts[0].address,
    clawback:accounts[0].address,
    //AlgoSigner.encoding.stringToByteArray(document.getElementById('note').value),
    suggestedParams: txParamsJS
  });
  // let assetURLs = "http://someurl";
  // let assetMetadataHash = "16efaa3924a6fd9d3a4824799a4ac65d";
  // const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({    
  //     from: accounts[0].address,
  //     note: AlgoSigner.encoding.stringToByteArray("nothing"),
  //     total: +1000,
  //     decimals: +2,
  //     defaultFrozen : false,
  //     manager:accounts[0].address,
  //     reserve:accounts[0].address,
  //     freeze: accounts[0].address,
  //     clawback:accounts[0].address,
  //     unitName: tb,
  //     assetName: tname,
  //     assetURL:assetURLs,
  //     assetMetadataHash:undefined,
  //     //AlgoSigner.encoding.stringToByteArray(document.getElementById('note').value),
  //     params: txParamsJS
  //   });
  console.log("txnprint",txn)
  // Use the AlgoSigner encoding library to make the transactions base64
  const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
  
  AlgoSigner.signTxn([{txn: txn_b64}])
  .then((d) => {
    console.log("signTx",d)
    let signedTxs = d;
    let signCodeElem = JSON.stringify(d, null, 2);
    console.log("signcoderElem",signCodeElem)

    AlgoSigner.send({
      ledger: 'TestNet',
      tx: signedTxs[0].blob
    })
    .then((d) => {
      tx = d;
      console.log("txidprint",tx.txId)
      AlgoSigner.algod({
        ledger: 'TestNet',
        path: '/v2/transactions/pending/' + tx.txId
      })
      .then((d) => {


        //new code addedd
        


        //end new code added
        console.log(d);        
        //console.log("before",tx.txId)        
      setIsOpens(true)
        
        let ref2=fireDb.database().ref(`imagerefAlgo/${accounts[0].address}`);
        let ref22=fireDb.database().ref(`imagerefAlgolt`);
    //.child(selected).child(selected2).child(accounts[0]);    

    
                      let dateset=new Date().toDateString();
                      console.log("dateget",dateset)
                      const db = ref2.push().key;                         
                      const db2 = ref22.push().key;                         
                      console.log("dbcheck",db)
                      ref2.child(db).set({id:idget,imageUrl:Img,priceSet:"",cAddress:tx.txId,keyId:db,userName:ta,userSymbol:tb,
                      ipfsUrl:Img,ownerAddress:accounts[0].address,soldd:"",extra1:"",previousoaddress:"",datesets:dateset,
                      whois:'',
                      league:selected,team:selected2,type:selected3,
                      teamlogo:selectedImg,dimen:selected4,description:tdescription,history:"",Mnemonic:""})
                      .then(()=>{

                      ref22.child(db).set({id:idget,imageUrl:Img,priceSet:"",cAddress:tx.txId,keyId:db,
                      userName:ta,userSymbol:tb,
                      ipfsUrl:Img,ownerAddress:accounts[0].address,soldd:"",extra1:"",
                      previousoaddress:"",datesets:dateset,whois:'',
                      league:selected,team:selected2,type:selected3,teamlogo:selectedImg,dimen:selected4,
                      description:tdescription,history:"",Mnemonic:""})
                      .then(()=>{

//               //             const axios = require('axios');
//               //             let pinataApiKey='88348e7ce84879e143e1';
//               //             let pinataSecretApiKey='e4e8071ff66386726f9fe1aebf2d3235a9f88ceb4468d4be069591eb78d4bf6f';

//               //             const pinataSDK = require('@pinata/sdk');
//               //             const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey);
//               //                         pinata.testAuthentication().then((result) => {
//               // //handle successful authentication here
//               // console.log(result);
      
//               // //let ge=ipfsHash;
//               // // /console.log("ipfsHash",ipfsHash);
//               //         const body = {
//               //             message: ge
//               //         };
//               //         const options = {
//               //             pinataMetadata: {
//               //                 name: tname,
//               //                 keyvalues: {
//               //                     customKey: 'customValue',
//               //                     customKey2: 'customValue2'
//               //                 }
//               //             },
//               //             pinataOptions: {
//               //                 cidVersion: 0
//               //             }
//               //         };
//               //         pinata.pinJSONToIPFS(body, options).then((result) => {
//               //             //handle results here
//               //             console.log(result);
//               //             console.log("jsonresult")
//               //             //setVisibleModal(false)
//               //             //setIsOpen(true);
      
                          
//               //           }).catch((err) => {
//               //               //handle error here
//               //               console.log(err);
//               //           });
            
                      
// })().catch(e => {
//   console.log(e);
//   console.trace();
// });



                        setIsOpens(false)
                      setIsOpen(true);
                      })              
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
  
  //let getData=localStorage.getItem('myData')                    
    
    //  }
  

    
  //}
}
    }
}



  


// const dbstore=async()=>{

//   if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet")==="0x" || localStorage.getItem("wallet") === 'undefined' || localStorage.getItem("wallet") === ''){

//   }
//   else{


  
//         //end               
// }
// }



const onSub=()=>{

  console.log("hello close")
  //setIsOpen(false);
  history.push("/")

}


const callof=()=>{

  
  if(Img === "" && tname === "" && tdescription === ""){
    alert("please fill all details")
  }
  else if(Img === ""){

    alert("please upload Image details")

  }
  else if(tname === ""){
    alert("please fill name details")

  }
  else if(tdescription === ""){
    alert("please fill description details")

  }
  else{

    //alert("call")
    setVisibleModal(true)
  }
}

const checkurl=async()=>{  
  //const indexerserver = 'https://testnet-algorand.api.purestake.io/idx2';
  //const indexport='';
  //let algoindexer = new algosdk.Indexer(token,indexerserver,indexport);
  //let algodClient = new algosdk.Algodv2(token, server, port);
  //const algosdk = require('algosdk');
  //const token = {
    //  'X-API-key' : 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab',
  //}
  //AiAHewYBBAAFAyYFAVMBQgJCTgJTTgFDMwAYIhIzABAjEhAxCTIDEhAxIDIDEhBAAAEANwAaACgSQAFrNwAaACkSQAEtNwAaACoSQACNNwAaACsSQAANNwAaACcEEkAAAQAkQzIEJRIzAhAlEhAzAhEiEhAzAhQzAAASEEAAAQAzAxAlEjMDESISEDMDEiQSEEAAAQAzARAkEjMBADMAABIQQAABADMDADMAABJBAA0zAQgzAgEPQAABACRDMwMAMwAAE0EAETMBCDMCATMDAQgPQAABACRDIQRDMwIQJRIzAhEiEhAzAhQzAAASMwIAMwAAEhEQMgQhBRIQQAABADMDECUSMwMRIhIQMwMSJBIQQAABADMEECUSMwQRIhIQQAABADMBECQSMwEAMwAAEhBAAAEAMwIAMwAAEkEAETMBCDMDATMEAQgPQAABACRDMwIUMwAAEkEAFTMBCDMCATMDAQgzBAEID0AAAQAkQyEEQzIEIQYSMwIQJRIQMwIRIhIQMwIUMwAAEhAzARAkEhAzAQAzAAASEDMBCDMCAQ8QQAABACRDMgQhBhIzARAkEhAzAQAzAAASEDMBCDMCAQ8QMwIQJRIQMwIRIhIQMwISJBIQMwIUMwAAEhBAAAEAJEM=  
  const algosdk = require('algosdk');
  let program = new Uint8Array(Buffer.from("AiAHewYBBAAFAyYFAVMBQgJCTgJTTgFDMwAYIhIzABAjEhAxCTIDEhAxIDIDEhBAAAEANwAaACgSQAFrNwAaACkSQAEtNwAaACoSQACNNwAaACsSQAANNwAaACcEEkAAAQAkQzIEJRIzAhAlEhAzAhEiEhAzAhQzAAASEEAAAQAzAxAlEjMDESISEDMDEiQSEEAAAQAzARAkEjMBADMAABIQQAABADMDADMAABJBAA0zAQgzAgEPQAABACRDMwMAMwAAE0EAETMBCDMCATMDAQgPQAABACRDIQRDMwIQJRIzAhEiEhAzAhQzAAASMwIAMwAAEhEQMgQhBRIQQAABADMDECUSMwMRIhIQMwMSJBIQQAABADMEECUSMwQRIhIQQAABADMBECQSMwEAMwAAEhBAAAEAMwIAMwAAEkEAETMBCDMDATMEAQgPQAABACRDMwIUMwAAEkEAFTMBCDMCATMDAQgzBAEID0AAAQAkQyEEQzIEIQYSMwIQJRIQMwIRIhIQMwIUMwAAEhAzARAkEhAzAQAzAAASEDMBCDMCAQ8QQAABACRDMgQhBhIzARAkEhAzAQAzAAASEDMBCDMCAQ8QMwIQJRIQMwIRIhIQMwISJBIQMwIUMwAAEhBAAAEAJEM=", "base64"));
    const args=[];
    args.push([...Buffer.from("31840066")]);

    args.push([...Buffer.from("BAZXPXEGPFQ7JVOZ7BZUYK36EXLRAWC7MAG3O2SPDWMVCYDMRLCHC6JC2U")]);
    args.push([...Buffer.from("BAZXPXEGPFQ7JVOZ7BZUYK36EXLRAWC7MAG3O2SPDWMVCYDMRLCHC6JC2U")]);
    args.push([...Buffer.from("RSWT2ZWIDPYTL4WX2NMIVWQOFCTBKEMQCXBNMHNT4NXOMDSNET66YBZT5Y")]);
    args.push([...Buffer.from("10000")]);
    //args.push([...Buffer.from('')]);    
    let lsig = algosdk.makeLogicSig(program,args);
    console.log("lsigaddress",lsig.address())
  }
  
  const atomic=()=>{
    // Transaction A to C 
    const algosdk = require('algosdk');
//let transaction1 = algosdk.makePaymentTxnWithSuggestedParams("BAZXPXEGPFQ7JVOZ7BZUYK36EXLRAWC7MAG3O2SPDWMVCYDMRLCHC6JC2U", "RSWT2ZWIDPYTL4WX2NMIVWQOFCTBKEMQCXBNMHNT4NXOMDSNET66YBZT5Y", 1000000, undefined, undefined, params);  
// Create transaction B to A
//let transaction2 = algosdk.makePaymentTxnWithSuggestedParams(myAccountB.addr, myAccountA.addr, 2000000, undefined, undefined, params);  
  }


  return (
    <>
    {/* <h1>create nft in this page</h1> */}
    {/* <button onClick={()=>filess()} >BuyNow</button>      */}
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <div className={cn("h2", styles.title)}>
                Create single collectible
              </div>
              <button
                className={cn("button-stroke button-small", styles.button)}
              >
                Switch to Multiple
              </button>
            </div>
            {/* <button type="submit" onClick={onSubmitNFT}>create Nft</button> */}
            <br></br>
            {/* <button type="submit" onClick={onSubmitImage}> IPFS UPLOAD </button>  */}
            <form className={styles.form} action="">
            
            {/* upload start */}
              <div className={styles.list}>
                <div className={styles.item}>
                  <div className={styles.category}>Upload file</div>
                  <div className={styles.note} >
                  {/* onClick={()=>Getfile()} */}
                    Drag or choose your file to upload 
                  </div>
                  <div className={styles.file}>
                    <input className={styles.load} type="file" name="tfile" id="fileid" onChange = {captureFile} />
                    <div className={styles.icon}>                      
                      <Icon name="upload-file" size="24" />
                    </div>
                    <div className={styles.format}>
                      PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.                  
                    </div>
                  </div>
                </div>

                
                {/* upload stop */}
                <div className={styles.item}>
                  <div className={styles.category}>Item Details</div>
                  <div className={styles.fieldset}>
                    <TextInput
                      className={styles.field}
                      label="Item name"
                      name="Item"
                      type="text"
                      placeholder='e. g. Redeemable Bitcoin Card with logo"'
                      required
                      onChange={event => setName(event.target.value)}
                    />
                    <TextInput
                      className={styles.field}
                      lebel="Description"
                      name="Description"
                      type="text"
                      placeholder="e. g. “After purchasing you will able to recived the logo...”"
                      required
                      onChange={event => setDescription( event.target.value)}
                    />

<TextInput
                      className={styles.field}
                      lebel="Mnemonic"
                      name="Mnemonic"
                      type="text"
                      placeholder="e. g. “Enter Your Mnemonic here...”"
                      required
                      onChange={event => setMnemonic( event.target.value)}
                    />

{/* <div className="col-md-4"> */}
        {/* <Select onChange={e => setLname(e.target.value)} value={setLname} */}
              
              {/* /> */}

<div className={styles.fieldset} >
<select onChange={changeSelectOptionHandler} style={{width:"100%"}}>
            <option value='Minor League'>Minor League</option>
            <option value='Major League'>Major League</option>
            <option value='Triangle League'>Triangle League</option>
            <option value='Aryan Shah'>Aryan Shah</option>
            <option value='Others'>Others</option>
          </select>
</div>

<div className={styles.fieldset} >
<select onChange={changeSelectOptionHandler2} style={{width:"100%"}}>
            <option value='Atlanta Fire'>Atlanta Fire</option>
            <option value='Atlanta Param Veers'>Atlanta Param Veers</option>
            <option value='Florida Beamers'>Florida Beamers</option>
            <option value='Ft. Lauderdale Lions'>Ft. Lauderdale Lions</option>
            <option value='Morrisville Cardinals'>Morrisville Cardinals</option>
            <option value='Orlando Galaxy'>Orlando Galaxy</option>
            <option value='DC Hawks'>DC Hawks</option>
            <option value='Empire State Titans'>Empire State Titans</option>
            <option value='Manhattan Yorkers'>Manhattan Yorkers</option>
            <option value='New England Eagles'>New England Eagles</option>
            <option value='New Jersey Somerset Cavaliers'>New Jersey Somerset Cavaliers</option>
            <option value='New Jersey Stallions'>New Jersey Stallions</option>
            <option value='The Philadelphians'>The Philadelphians</option>
            <option value='Austin Athletics'>Austin Athletics</option>
            <option value='Chicago Blasters'>Chicago Blasters</option>
            <option value='Chicago Catchers'>Chicago Catchers</option>
            <option value='Houston Hurricanes'>Houston Hurricanes</option>
            <option value='Irving Mustangs'>Irving Mustangs</option>
            <option value='Michigan Cricket Stars'>Michigan Cricket Stars</option>
            <option value='St. Louis Americans'>St. Louis Americans</option>
            <option value='East Bay Blazers'>East Bay Blazers</option>
            <option value='Golden State Grizzlies'>Golden State Grizzlies</option>
            <option value='Hollywood Master Blasters'>Hollywood Master Blasters</option>
            <option value='San Diego Surf Riders'>San Diego Surf Riders</option>
            <option value='Seattle Thunderbolts'>Seattle Thunderbolts</option>
            <option value='Silicon Valley Strikers'>Silicon Valley Strikers</option>
            <option value='Socal Lashings'>Socal Lashings</option>            
            <option value='Others'>Others</option>
          </select>
</div>

<div className={styles.fieldset} >
<select onChange={changeSelectOptionHandler3} style={{width:"100%"}}>
            <option value='Award'>Award</option>
            <option value='Trophy'>Trophy</option>
            <option value='Player'>Player</option>
            <option value='Others'>Others</option>
          </select>
</div>

<div className={styles.fieldset} >
<select onChange={changeSelectOptionHandler4} style={{width:"100%"}}>
            <option value='2D'>2D</option>
            <option value='3D'>3D</option>
          </select>
</div>

        {/* <div className={styles.stage}>Popular</div>
        <DropdownEmpty
              className={styles.dropdown}
              value={Tname}
              setValue={setTname}
              options={leaguename}
              //onChange={changeSelectOptionHandler}
            /> */}
      {/* </div> */}

<br></br>

      {/* <div className="col-md-4"> */}
        {/* <Select options={ teamname } onChange={setTname}/> */}
      {/* </div> */}


{/* <DropDownList data={sizes} /> */}

                    {/* <TextInput
                      className={styles.field}
                      label="Your mnemonic key"
                      name="mnemonic"
                      type="text"
                      placeholder='e. g. Alpha Beta Ghama Xerox Black ..."'
                      required
                      onChange={event => setMnemonic(event.target.value)}
                    /> */}
                    {/* <div className={styles.row}>
                      <div className={styles.col}>
                        <div className={styles.field}>
                          <div className={styles.label}>Royalties</div>
                          <Dropdown
                            className={styles.dropdown}
                            value={royalties}
                            setValue={setRoyalties}
                            options={royaltiesOptions}
                          />
                        </div>
                      </div>
                      <div className={styles.col}>
                        <TextInput
                          className={styles.field}
                          label="Size"
                          name="Size"
                          type="text"
                          placeholder="e. g. Size"
                          required
                        />
                      </div>
                      <div className={styles.col}>
                        <TextInput
                          className={styles.field}
                          label="Propertie"
                          name="Propertie"
                          type="text"
                          placeholder="e. g. Propertie"
                          required
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <div className={styles.options}>
                <div className={styles.option}>
                  <div className={styles.box}>
                    <div className={styles.category}>Put on sale</div>
                    <div className={styles.text}>
                      You’ll receive bids on this item
                    </div>
                  </div>
                  <Switch value={sale} setValue={setSale} />
                </div>
                <div className={styles.option}>
                  <div className={styles.box}>
                    <div className={styles.category}>Instant sale price</div>
                    <div className={styles.text}>
                      Enter the price for which the item will be instantly sold
                    </div>
                  </div>
                  <Switch value={price} setValue={setPrice} />
                </div>
                <div className={styles.option}>
                  <div className={styles.box}>
                    <div className={styles.category}>Unlock once purchased</div>
                    <div className={styles.text}>
                      Content will be unlocked after successful transaction
                    </div>
                  </div>
                  <Switch value={locking} setValue={setLocking} />
                </div>
                <div className={styles.category}>Choose collection</div>
                <div className={styles.text}>
                  Choose an exiting collection or create a new one
                </div>
                <Cards className={styles.cards} items={items} />
              </div> */}
              <div className={styles.foot}>              
                {/* <button
                  className={cn("button-stroke tablet-show", styles.button)}
                  onClick={() => onSubmitImage()}
                  type="button"
                >
                  Preview
                </button>
                 */}
                <button
                  className={cn("button", styles.button)}
                  onClick={() => callof()}
                  // type="button" hide after form customization
                  type="button"                              
                >
                  
                  <span>Create item</span>
                  <Icon name="arrow-next" size="10" />
                </button>
                
                    
                
                <div className={styles.saving}>
                  <span>Auto saving</span>
                  <Loader className={styles.loader} />
                </div>
              </div>
            </form>
          </div>
          {/* <Preview
            className={cn(styles.preview, { [styles.active]: visiblePreview })}
            onClose={() => setVisiblePreview(false)}
          /> */}
        </div>
      </div>
      
      {/* <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <FolowSteps className={styles.steps} onSubmitNFT={()=>onSubmitNFT}/>
      </Modal> */}

<Modald visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <FolowStepsd className={styles.steps} onSubmitNFT={()=>onSubmitNFT}/>
      </Modald>

      <Modald visible={isOpen} onClose={() => setIsOpen(false)}>
        <FolowStepsdr className={styles.steps} onSub={()=>onSub}/>
      </Modald>

      <Modald visible={isOpens} >
        <FolowStep className={styles.steps} />
      </Modald>

      {/* onClose={() => setIsOpens(false)} */}

      <button
                  className={cn("button", styles.button)}
                  onClick={() => checkurl()}
                  // type="button" hide after form customization
                  type="button"                              
                >
                  
                  <span>CHECK</span>
                  <Icon name="arrow-next" size="10" />
                </button>
    </>
  );
};

export default Upload;
