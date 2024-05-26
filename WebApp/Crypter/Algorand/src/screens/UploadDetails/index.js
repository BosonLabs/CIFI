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
import ipfs from "./ipfs";
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
  const [Buttonopen, setButtonopen] = useState(false);
  const [lsigget, setlsig] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpens, setIsOpens] = useState(false);
  const [ipfsHash,setIpfsHash] = useState(null);
  //const [ipf,setIpf] = useState(null);
  const [buffer,setBuffer] = useState("");
  const [Img,setImg] = useState("")
  console.log("Imgpinata",Img)
  console.log("ImgpinataBuffer",buffer)
  const [tname,setName] = useState("");
  const [tdescription,setDescription] = useState("");
  //const [tmnemonic,setMnemonic] = useState("");
  //const [isLoading, setLoading] = useState(false)
  //const [currentid, setCurrentid] = useState("");
  let ge;
  const [assetidget,setassetid] = useState("");
  console.log("getassetid",assetidget)

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
    //await onSubmitImage();
//    await sleep(10)
    await ipfs.add(buffer, (err, ipfsHash) => {
    //console.log(err,ipfsHash);
    console.log("buff",buffer);
    setIpfsHash(ipfsHash[0].hash);
    console.log(ipfsHash[0].hash)
    const CID = require('cids')
    var cid = new CID(ipfsHash[0].hash)
    //let ccp=cid.toV1().toBaseEncodedString('base32');
    console.log("cid",cid.toV1().toBaseEncodedString('base32'));
    setButtonopen(true)
    //setIpf(cid.toV1().toBaseEncodedString('base32'));      
        })
        //.then(()=>{
      //setVisiblePreview(true)
    //});
};
// const onSubmitImage = async (event) => {

//     console.log("onsubmitimage called")
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

//       console.log("ipfs added")
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


// const addfire=()=>{

//   let ref23=fireDb.database().ref(`tokenkey`);      
//       let getfire="";
//       let setfire="";
//       fireDb.database().ref(`tokenkey`).on("value", (data) => {
//         if (data) {
//            data.forEach((d) => {
//             getfire=parseInt(d.val());
//             setfire= parseInt(getfire)+1;
//             console.log("getfire",getfire)
//             console.log("setfire",setfire)
            
//           });         
//         }
//       })
//       //ref23.update({id:setfire});

      
      
//       // console.log("setfire",setfire)
//       // //alert("your token"+setfire+"getfire"+getfire);      
//       te= getfire;
//       let ts= setfire;
//             if(ts === "")
//             {
//               console.log("empty",ts)
//               te=1000
//               ref23.update({id:te.toString()});
//             }
//             else{
//               console.log("notempty")
//               //setfire= parseInt(getfire)+1;
//               //te=parseInt(getfire)
//               ref23.update({id:setfire});
//             }
//       console.log("te",te)    
// }

// useEffect(()=>{addfire()},[])

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

const onSubmitNFT = async (event) => {
  event.preventDefault();  
    //new write below

    if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === ''){

      console.log("Empty",localStorage.getItem("wallet"))

    }
    else{

    ta=tname;
    tb='ALGO';
    te=1000;
    let idget="";

    console.log("uploadonecheck",ta);
    console.log("uploadtwocheck",tb);
    console.log("uploadtwocheck",te);

    setVisibleModal(false)                        
        const algosdk = require('algosdk');  
        if(localStorage.getItem("net") === "mainnet")
        {
          let accounts;
let txasset;
const server = "https://mainnet-algorand.api.purestake.io/ps2";
const port = "";  
const token = {
      'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
}

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
    ledger: 'MainNet'
  })
  .then((d) => {
    console.log("tested2",d)
    accounts = d;
    console.log("algoacc",localStorage.getItem("wallet"))
    algodClient.getTransactionParams().do()
.then((d) => {
  let txParamsJS = d;
  console.log("txparamsJS",txParamsJS)
  let program = new Uint8Array(Buffer.from("ASAEADoKAS0VIhJAACIvFSISQAAVLRUjEkAAAC4VIg1AAAAvFSQNQAAGLS4TQAAAJQ==", "base64"));
  const args=[];
  //args.push([...Buffer.from(idget.toString())]);
  //const args=[];
  args.push([...Buffer.from(localStorage.getItem("wallet"))]);//creator address
  args.push([...Buffer.from('RWYPYF5XX40P2L6BCMZAA4ETP3S3HSF32QSWSGMXAU05NBJPKPHR6YCCAE')]);//lsig address
  args.push([...Buffer.from('')]);

  let lsig = algosdk.makeLogicSig(program,args);
  //let thirumnemonic= 'empower twist carpet lawsuit across tape add leopard prevent abandon squeeze egg clown river funny sea labor level scheme race crime mystery party absent exist'
  //var recoveredAccount1 = algosdk.mnemonicToSecretKey(thirumnemonic);
  const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({    
    from: localStorage.getItem("wallet"),
    assetName: tname,
    unitName: tb,
    total: 1,
    decimals: 0,
    note: AlgoSigner.encoding.stringToByteArray("nothing"),
    //manager:lsig.address(),
    manager:localStorage.getItem("wallet"),
    reserve:localStorage.getItem("wallet"),
    freeze: localStorage.getItem("wallet"),
    clawback:localStorage.getItem("wallet"),
    //AlgoSigner.encoding.stringToByteArray(document.getElementById('note').value),
    suggestedParams: txParamsJS
  });
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
      ledger: 'MainNet',
      tx: signedTxs[0].blob
    })
    .then((d) => {
      txasset = d.txId;
      setassetid(d.txId)
      console.log("txidprint",txasset)
      AlgoSigner.algod({
        ledger: 'MainNet',
        path: '/v2/transactions/pending/' + txasset
      })
      .then((d) => {


        //new code addedd
        


        //end new code added
        console.log(d);        
        //console.log("before",tx.txId)        
      setIsOpens(true)
        
        let ref2=fireDb.database().ref(`imagerefAlgo/${localStorage.getItem("wallet")}`);
        let ref22=fireDb.database().ref(`imagerefAlgolt`);
    //.child(selected).child(selected2).child(accounts[0]);    

    
                      let dateset=new Date().toDateString();
                      console.log("dateget",dateset)
                      const db = ref2.push().key;                         
                      const db2 = ref22.push().key;                         
                      console.log("dbcheck",db)
                      ref2.child(db).set({id:idget,imageUrl:Img,priceSet:"",cAddress:txasset,keyId:db,userName:ta,userSymbol:tb,
                      ipfsUrl:Img,ownerAddress:localStorage.getItem("wallet"),soldd:"",extra1:"",previousoaddress:"",datesets:dateset,
                      whois:'',
                      league:selected,team:selected2,type:selected3,
                      teamlogo:selectedImg,dimen:selected4,description:tdescription,history:"",Mnemonic:""})
                      .then(()=>{

                      ref22.child(db).set({id:idget,imageUrl:Img,priceSet:"",cAddress:txasset,keyId:db,
                      userName:ta,userSymbol:tb,
                      ipfsUrl:Img,ownerAddress:localStorage.getItem("wallet"),soldd:"",extra1:"",
                      previousoaddress:"",datesets:dateset,whois:'',
                      league:selected,team:selected2,type:selected3,teamlogo:selectedImg,dimen:selected4,
                      description:tdescription,history:"",Mnemonic:""})
                      .then(()=>{
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


        }
        else{
let accounts;
let txasset;
let txx;
const server = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";  
const token = {
      'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
}
const baseServer = "https://testnet-algorand.api.purestake.io/idx2";    
let indexerClient = new algosdk.Indexer(token, baseServer, port);

let algodClient = new algosdk.Algodv2(token, server, port);
AlgoSigner.connect()
.then((d) => {
console.log("tested1")
algodClient.healthCheck().do()
.then(d => { 
  
  AlgoSigner.accounts({
    ledger: 'TestNet'
  })
  .then((d) => {
    setIsOpens(true)
    console.log("tested2",d)
    accounts = d;
    console.log("algoacc",localStorage.getItem("wallet"))
    algodClient.getTransactionParams().do()
.then((d) => {
  let txParamsJS = d;
  console.log("txparamsJS",txParamsJS)
  const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({    
    from: localStorage.getItem("wallet"),
    assetName: tname,
    unitName: tb,
    total: 1,
    decimals: 0,
    note: AlgoSigner.encoding.stringToByteArray("nothing"),
    //manager:lsig.address(),
    manager:localStorage.getItem("wallet"),
    reserve:localStorage.getItem("wallet"),
    freeze: localStorage.getItem("wallet"),
    clawback:localStorage.getItem("wallet"),
    suggestedParams: txParamsJS
  });
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
    .then(async(d) => {
      txasset = d.txId;
      setassetid(d.txId)
      txx=d;
      console.log("txidprint",txasset)
      console.log("alldata",d)
      await waitForConfirmation(algodClient, d.txId);
      AlgoSigner.algod({
        ledger: 'TestNet',
        path: '/v2/transactions/pending/' + txasset
      })
      .then(async(d) => {
        //new code addedd
        let ptx = await algodClient.pendingTransactionInformation(txx.txId).do();
        let assetID = ptx["asset-index"];
        console.log("pendingass",assetID);        
        console.log("pending",d);        
        await sleep(1000)
        //checkurl(assetID);
         creatapplication(assetID,txx.txId);
        //console.log("before",tx.txId)        
        
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


        }
    }
}

const onSub=()=>{
  console.log("hello close")
  //setIsOpen(false);
  history.push("/")
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
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

// const checkurl=async()=>{
//   setIsOpens(true)
//   const algosdk = require('algosdk');
//   const port = "";  
//   const token = {
//         'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
//   }
//   const baseServer = "https://testnet-algorand.api.purestake.io/idx2";    
//   let indexerClient = new algosdk.Indexer(token, baseServer, port);
//   let txnInfo;
//   let idget;
//   do{
//     txnInfo=  await indexerClient.searchForTransactions().txid(assetidget).do();      
//     await sleep(2000)
//     console.log("idp",txnInfo)
//     if(txnInfo.transactions.length === 1)
//     idget=txnInfo.transactions[0]["created-asset-index"];
//     await sleep(2000)
//     console.log("idgetting",idget)
//   }while(txnInfo.transactions.length !== 1 )
  
//   creatapplication(idget,assetidget);                    
// }

const creatapplication=async(idget,txxid)=>{
  
  setIsOpens(true)
  console.log("createapplication",idget)
  const algosdk = require('algosdk');  
  let algodPort = "";
  // declare application state storage (immutable)
  let localInts = 1;
  let localBytes = 0;
  let globalInts = 4;
  let globalBytes = 3;
  
  // user declared approval program (initial)
let approvalProgramSourceInitial = `#pragma version 4
  txn ApplicationID
  int 0
  ==
  bnz main_l74
  txn CloseRemainderTo
  global ZeroAddress
  ==
  txn RekeyTo
  global ZeroAddress
  ==
  &&
  bnz main_l3
  err
  main_l3:
  txn OnCompletion
  int OptIn
  ==
  bnz main_l71
  txn OnCompletion
  int UpdateApplication
  int DeleteApplication
  ||
  ==
  bnz main_l70
  txn OnCompletion
  int CloseOut
  ==
  bnz main_l67
  txna ApplicationArgs 0
  byte "B"
  ==
  bnz main_l52
  txna ApplicationArgs 0
  byte "S"
  ==
  bnz main_l39
  txna ApplicationArgs 0
  byte "BN"
  ==
  bnz main_l28
  txna ApplicationArgs 0
  byte "SN"
  ==
  bnz main_l15
  txna ApplicationArgs 0
  byte "C"
  ==
  bnz main_l12
  err
  main_l12:
  txn Sender
  byte "C"
  app_global_get
  ==
  byte "E"
  app_global_get
  global ZeroAddress
  ==
  &&
  bnz main_l14
  err
  main_l14:
  byte "E"
  txna Accounts 1
  app_global_put
  int 1
  return
  main_l15:
  int 1
  byte "B"
  app_local_get
  int 0
  !=
  gtxn 2 AssetAmount
  int 1
  byte "B"
  app_local_get
  ==
  &&
  gtxn 2 Sender
  byte "E"
  app_global_get
  ==
  &&
  gtxn 1 Receiver
  byte "E"
  app_global_get
  ==
  &&
  bnz main_l17
  err
  main_l17:
  int 1
  byte "B"
  int 0
  app_local_put
  byte "B"
  byte "B"
  app_global_get
  int 1
  -
  app_global_put
  gtxn 3 AssetReceiver
  txna Accounts 1
  ==
  bnz main_l19
  err
  main_l19:
  byte "O"
  app_global_get
  global ZeroAddress
  ==
  bnz main_l25
  byte "O"
  app_global_get
  txn Sender
  ==
  bnz main_l22
  int 0
  return
  main_l22:
  gtxn 3 Sender
  byte "E"
  app_global_get
  ==
  bnz main_l24
  err
  main_l24:
  byte "A"
  int 0
  app_global_put
  byte "O"
  global ZeroAddress
  app_global_put
  int 1
  return
  main_l25:
  gtxn 3 Sender
  txn Sender
  ==
  bnz main_l27
  err
  main_l27:
  int 1
  return
  main_l28:
  byte "A"
  app_global_get
  int 0
  !=
  byte "O"
  app_global_get
  global ZeroAddress
  !=
  &&
  bnz main_l30
  err
  main_l30:
  int 0
  byte "B"
  app_local_get
  int 0
  !=
  bnz main_l38
  main_l31:
  gtxn 2 AssetReceiver
  byte "E"
  app_global_get
  ==
  bnz main_l37
  main_l32:
  gtxn 2 Sender
  byte "E"
  app_global_get
  ==
  bnz main_l36
  main_l33:
  int 0
  byte "B"
  app_local_get
  byte "A"
  app_global_get
  ==
  gtxn 1 Receiver
  byte "E"
  app_global_get
  ==
  &&
  gtxn 3 Sender
  byte "E"
  app_global_get
  ==
  &&
  gtxn 4 AssetReceiver
  byte "O"
  app_global_get
  ==
  &&
  gtxn 4 Sender
  byte "E"
  app_global_get
  ==
  &&
  gtxn 4 AssetAmount
  byte "A"
  app_global_get
  ==
  &&
  bnz main_l35
  err
  main_l35:
  byte "A"
  int 0
  app_global_put
  byte "O"
  global ZeroAddress
  app_global_put
  int 0
  byte "B"
  int 0
  app_local_put
  int 1
  return
  main_l36:
  int 0
  byte "B"
  int 0
  byte "B"
  app_local_get
  gtxn 2 AssetAmount
  -
  app_local_put
  b main_l33
  main_l37:
  int 0
  byte "B"
  int 0
  byte "B"
  app_local_get
  gtxn 2 AssetAmount
  +
  app_local_put
  b main_l32
  main_l38:
  byte "B"
  byte "B"
  app_global_get
  int 1
  -
  app_global_put
  b main_l31
  main_l39:
  global GroupSize
  int 2
  ==
  bnz main_l49
  main_l40:
  txna ApplicationArgs 1
  btoi
  byte "A"
  app_global_get
  !=
  byte "O"
  app_global_get
  txn Sender
  ==
  &&
  bnz main_l42
  err
  main_l42:
  byte "A"
  txna ApplicationArgs 1
  btoi
  app_global_put
  global GroupSize
  int 3
  ==
  bnz main_l46
  byte "A"
  app_global_get
  int 0
  !=
  bnz main_l45
  err
  main_l45:
  int 1
  return
  main_l46:
  gtxn 2 Sender
  byte "E"
  app_global_get
  ==
  bnz main_l48
  err
  main_l48:
  byte "O"
  global ZeroAddress
  app_global_put
  int 1
  return
  main_l49:
  byte "O"
  app_global_get
  global ZeroAddress
  ==
  byte "A"
  app_global_get
  int 0
  ==
  &&
  gtxn 1 AssetReceiver
  byte "E"
  app_global_get
  ==
  &&
  gtxn 1 TypeEnum
  int axfer
  ==
  &&
  gtxn 1 XferAsset
  byte "N"
  app_global_get
  ==
  &&
  gtxn 1 AssetAmount
  int 1
  ==
  &&
  gtxn 1 Sender
  gtxn 0 Sender
  ==
  &&
  bnz main_l51
  err
  main_l51:
  byte "O"
  txn Sender
  app_global_put
  b main_l40
  main_l52:
  int 0
  store 0
  int 0
  byte "B"
  app_local_get
  store 1
  global GroupSize
  int 2
  ==
  bnz main_l64
  main_l53:
  global GroupSize
  int 3
  ==
  bnz main_l61
  main_l54:
  load 0
  int 1
  ==
  bnz main_l56
  err
  main_l56:
  int 0
  byte "B"
  app_local_get
  int 0
  !=
  load 1
  int 0
  ==
  &&
  bnz main_l60
  main_l57:
  int 0
  byte "B"
  app_local_get
  int 0
  ==
  load 1
  int 0
  !=
  &&
  bnz main_l59
  main_l58:
  int 1
  return
  main_l59:
  byte "B"
  byte "B"
  app_global_get
  int 1
  -
  app_global_put
  b main_l58
  main_l60:
  byte "B"
  byte "B"
  app_global_get
  int 1
  +
  app_global_put
  b main_l57
  main_l61:
  gtxn 2 Sender
  byte "E"
  app_global_get
  ==
  gtxn 1 Receiver
  byte "E"
  app_global_get
  ==
  &&
  gtxn 2 AssetAmount
  int 0
  !=
  &&
  bnz main_l63
  err
  main_l63:
  int 0
  byte "B"
  int 0
  byte "B"
  app_local_get
  gtxn 2 AssetAmount
  -
  app_local_put
  int 1
  store 0
  b main_l54
  main_l64:
  gtxn 1 AssetReceiver
  byte "E"
  app_global_get
  ==
  gtxn 1 Sender
  gtxn 0 Sender
  ==
  &&
  gtxn 1 TypeEnum
  int axfer
  ==
  &&
  gtxn 1 XferAsset
  byte "U"
  app_global_get
  ==
  &&
  bnz main_l66
  err
  main_l66:
  int 0
  byte "B"
  int 0
  byte "B"
  app_local_get
  gtxn 1 AssetAmount
  +
  app_local_put
  int 1
  store 0
  b main_l53
  main_l67:
  int 0
  byte "B"
  app_local_get
  int 0
  ==
  bnz main_l69
  err
  main_l69:
  int 1
  return
  main_l70:
  int 0
  return
  main_l71:
  global GroupSize
  int 1
  ==
  bnz main_l73
  err
  main_l73:
  int 0
  byte "B"
  int 0
  app_local_put
  int 1
  return
  main_l74:
  byte "U"
  txna ApplicationArgs 0
  btoi
  app_global_put
  byte "N"
  txna ApplicationArgs 1
  btoi
  app_global_put
  byte "O"
  global ZeroAddress
  app_global_put
  byte "C"
  txna Accounts 1
  app_global_put
  byte "E"
  global ZeroAddress
  app_global_put
  byte "A"
  int 0
  app_global_put
  byte "B"
  int 0
  app_global_put
  int 1
  return
  `;
  
  // declare clear state program source
  let clearProgramSource = `#pragma version 4
  int 1
  `;
  
  // helper function to compile program source  
  async function compileProgram(client, programSource) {
      let encoder = new TextEncoder();
      let programBytes = encoder.encode(programSource);
      let compileResponse = await client.compile(programBytes).do();
      let compiledBytes = new Uint8Array(Buffer.from(compileResponse.result, "base64"));
      return compiledBytes;
  }
  
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
  
  // create new application
  async function createApp(client, creatorAccount, approvalProgram, clearProgram, localInts, localBytes, globalInts, globalBytes, appArgs, accounts,idgetapp,assetidgets,usdcid) {
//console.log("idgetting",idget)

    //console.log(Is)
      // define sender as creator
      let sender = creatorAccount;      
      // declare onComplete as NoOp
      let onComplete = algosdk.OnApplicationComplete.NoOpOC;        
    // get node suggested parameters
      let params = await client.getTransactionParams().do();
      // comment out the next two lines to use suggested fee
      params.fee = 1000;
      params.flatFee = true;
  
      // create unsigned transaction
      let txn = algosdk.makeApplicationCreateTxn(sender, params, onComplete, 
                                              approvalProgram, clearProgram, 
                                              localInts, localBytes, globalInts, globalBytes, appArgs, accounts);
      let txId = txn.txID().toString();

      //new 

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
console.log("trans",tx)
await waitForConfirmation(client, txId);
  
      // display results
      let transactionResponse = await client.pendingTransactionInformation(txId).do();
      let appId = transactionResponse['application-index'];
      console.log("Created new app-id: ",appId);

      //escrow steps 

      
                    //escrow update application 
                    (async () => {
                      const tokenin = {
                          'X-API-Key': '9oXsQDRlZ97z9mTNNd7JFaVMwhCaBlID2SXUOJWl'
                         };
                      const serverin = "https://testnet-algorand.api.purestake.io/ps2";
                      const portin = "";
                        let algodclient = new algosdk.Algodv2(tokenin, serverin, portin);
                        //var fs = require('fs'),
                        //path = require('path'),
                        //filePath = path.join(__dirname, 'tealfile.teal');
                        // filePath = path.join(__dirname, <'fileName'>);
                        //let data = fs.readFileSync(filePath);
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
                    let data2 = data.replace("appid",appId);
                    let data3 = data2.replaceAll("usdcid",usdcid);
                    let data4 = data3.replaceAll("nftid",idget);
                    //let results = await algodclient.compile(data4).do();
                    const sleep = (milliseconds) => {
                      return new Promise(resolve => setTimeout(resolve, milliseconds))
                    }
                        let results = await algodclient.compile(data4).do();
                        console.log("Resultconsole = " + results);
                        console.log("Hash = " + results.hash);
                        console.log("Result = " + results.result);
                        await sleep(20000)
                        let program = new Uint8Array(Buffer.from(results.result, "base64"));
                        let args = [];
                        args.push(algosdk.encodeUint64(appId));//appid
                        args.push(algosdk.encodeUint64(usdcid)); //usdc
                        args.push(algosdk.encodeUint64(idget));//assetid
                        //args.push(algosdk.encodeUint64(5));
                        let lsig = algosdk.makeLogicSig(program, args);
                        //let tealSignPrint = tealSign(sk, data, lsig.address());
                        console.log("LSIG",lsig.address())
const algosdkup = require('algosdk');  
const algodServerup = 'https://testnet-algorand.api.purestake.io/ps2'
const tokenup = { 'X-API-Key': '9oXsQDRlZ97z9mTNNd7JFaVMwhCaBlID2SXUOJWl' }
const portup = '';
let algodClientup = new algosdkup.Algodv2(tokenup, algodServerup, portup);

AlgoSigner.connect()
.then((d) => {

algodClientup.healthCheck().do()
.then(d => { 

  AlgoSigner.accounts({
    ledger: 'TestNet'
  })
  .then((d) => {
    let accountsup = d;

    algodClientup.getTransactionParams().do()
    .then((d) => {
      let txParamsJSup = d;
      const txnup = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: localStorage.getItem("wallet"),
        to: lsig.address(),
        amount: Number(parseInt(400000)),
        note: undefined,
        suggestedParams: txParamsJSup
      });
    let txn_b64 = AlgoSigner.encoding.msgpackToBase64(txnup.toByte());
    AlgoSigner.signTxn([{txn: txn_b64}])
    .then((d) => {
      let signedTxsup = d;
      AlgoSigner.send({
        ledger: 'TestNet',
        tx: signedTxsup[0].blob
      })
      .then((d) => {
         let txfund = d;
        //console.log("funded",txfund)
    
        //add escrow address in our application and optin escrow usdc and nft
    
        (async () => {
          const tokenesc = {
              'X-API-Key': '9oXsQDRlZ97z9mTNNd7JFaVMwhCaBlID2SXUOJWl'
             };
          const serveresc = "https://testnet-algorand.api.purestake.io/ps2";
          const portesc = "";
            let algodclientesc = new algosdk.Algodv2(tokenesc, serveresc, portesc);
      
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
              let data2 = data.replace("appid",appId);
                    let data3 = data2.replaceAll("usdcid",usdcid);
                    let data4 = data3.replaceAll("nftid",idget);
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
            args.push(algosdk.encodeUint64(appId));//appid
            args.push(algosdk.encodeUint64(usdcid)); //usdc
            args.push(algosdk.encodeUint64(idget));//assetid
            //args.push(algosdk.encodeUint64(5));
            let lsig = algosdk.makeLogicSig(program,args);            
            console.log("LSIG",lsig.address())            
            console.log("lsig sign", lsig.sign)
            setlsig(lsig.address())
            let params = await algodclient.getTransactionParams().do();
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
          let index = appId;
          console.log("creator account", senderCallapp)
          console.log(lsig.address())
          let appArgs = [];
          appArgs.push(new Uint8Array (Buffer.from("C"))); //configuration
          let accArgs = [];
          accArgs.push(lsig.address());
          let tx1 = algosdk.makeApplicationNoOpTxn(senderCallapp, params, index, appArgs, accArgs);
      
          let senderTx2 = lsig.address();
          let receiverTx2 = senderTx2;
          let nft_id = idget;//assetid
          let tx2Amount = 0;
          let closeRemainderTo = undefined;
          let  revocationTarget = undefined;
          let note = undefined;
          //let tx2 = algosdk.makeAssetTransferTxnWithSuggestedParams(senderTx2, receiverTx2, tx2Amount, nft_id, params);
          let tx2 = algosdk.makeAssetTransferTxnWithSuggestedParams(senderTx2, receiverTx2, closeRemainderTo, revocationTarget, tx2Amount, note, nft_id, params);
          console.log("after tx2");
          let senderTx3 = lsig.address();
          let receiverTx3 = senderTx3;
          let usdc_id = usdcid;
          let tx3Amount = 0;
          let tx3 = algosdk.makeAssetTransferTxnWithSuggestedParams(senderTx3, receiverTx3, closeRemainderTo, revocationTarget, tx2Amount, note, usdc_id, params);
          console.log("after tx3");
          console.log("lsig full", lsig.logic);
          console.log("lsig tag", lsig.tag);
          //console.log("creator sk", creatorAccount.sk)
          let txns = [tx1, tx2, tx3];
            // Group both transactions
            let txgroup = algosdk.assignGroupID(txns);
            console.log(txgroup)
      //changes
            let txn_b64_1 = tx1.toByte();
            let txn_b64_2 = tx2.toByte();
            let txn_b64_3 = tx3.toByte();       
            let base64Txs1 = AlgoSigner.encoding.msgpackToBase64(txn_b64_1);        
            let signedTxs = await AlgoSigner.signTxn([
              {
                txn: base64Txs1,
              }
            ]);
            console.log("logic",signedTxs)
            let rawSignedTxn2 = algosdk.signLogicSigTransactionObject(tx2, lsig);
            let rawSignedTxn3 = algosdk.signLogicSigTransactionObject(tx3, lsig);
            let binarySignedTxs =  AlgoSigner.encoding.base64ToMsgpack(signedTxs[0].blob);
            //let binarySignedTxs = signedTxs.map((txn) => AlgoSigner.encoding.base64ToMsgpack(txn[0].blob));
            let signArr = [binarySignedTxs,rawSignedTxn2.blob, rawSignedTxn3.blob];
            console.log("signed",rawSignedTxn2.blob)
            let trans = await algodclient.sendRawTransaction(signArr).do();
             console.log("Send complete");
          //   console.log("txID", trans);
             console.log("id", trans.txId);
           await waitForConfirmation(algodclient, trans.txId);
            console.log("signed")

            //db added here
 
    let ref2=fireDb.database().ref(`imagerefAlgo/${localStorage.getItem("wallet")}`);
    let ref22=fireDb.database().ref(`imagerefAlgolt`);   
                  let dateset=new Date().toDateString();
                  console.log("dateget",dateset)
                  const db = ref2.push().key;                         
                  const db2 = ref22.push().key;                         
                  console.log("dbcheck",db)
                  ref2.child(db).set({id:idgetapp,imageUrl:Img,priceSet:"",cAddress:assetidgets,keyId:db,userName:tname,userSymbol:"ALGOS",
                  ipfsUrl:Img,ownerAddress:localStorage.getItem("wallet"),soldd:"",extra1:"",previousoaddress:"",datesets:dateset,
                  whois:'',
                  league:selected,team:selected2,type:selected3,
                  teamlogo:selectedImg,dimen:selected4,description:tdescription,history:"",Mnemonic:"",applicationid:appId,usdcids:usdcid,escrowaddress:lsig.address()})
                  .then(()=>{
                  ref22.child(db).set({id:idgetapp,imageUrl:Img,priceSet:"",cAddress:assetidgets,keyId:db,
                  userName:tname,userSymbol:"ALGOS",
                  ipfsUrl:Img,ownerAddress:localStorage.getItem("wallet"),soldd:"",extra1:"",
                  previousoaddress:"",datesets:dateset,whois:'',
                  league:selected,team:selected2,type:selected3,teamlogo:selectedImg,dimen:selected4,
                  description:tdescription,history:"",Mnemonic:"",applicationid:appId,usdcids:usdcid,escrowaddress:lsig.address()})
                  .then(()=>{     
            //add pinata here

            //pinata

//const axios = require('axios');
let pinataApiKey='88348e7ce84879e143e1';
let pinataSecretApiKey='e4e8071ff66386726f9fe1aebf2d3235a9f88ceb4468d4be069591eb78d4bf6f';
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey);
            pinata.testAuthentication().then((result) => {
            //handle successful authentication here
            console.log(result);  
            let ge=ipfsHash;
            console.log("ipfsHash",ipfsHash);
                    const body = {
                        message: ge
                    };
                    const options = {
                        pinataMetadata: {
                            name: tname,
                            keyvalues: {
                                customKey: 'customValue',
                                customKey2: 'customValue2'
                            }
                        },
                        pinataOptions: {
                            cidVersion: 0
                        }
                    };
                    pinata.pinJSONToIPFS(body, options).then((result) => {
                        //handle results here
                        console.log(result);
                        console.log("jsonresult")
                        //setVisibleModal(false)
                        //setIsOpen(true);
                        //setIsOpens(false)
                        //setIsOpen(true);

            setIsOpens(false)
            setIsOpen(true);
            return appId;
  
                      
                      }).catch((err) => {
                          //handle error here
                          console.log(err);
                      });
  
  
                    }).catch((err) => {
                        //handle error here
                        console.log(err);
                    });
        
                    //end pinata

            //end pinata here
            
                    
                  })              
                  })            


            //end db here
            
        })
        .catch((e) => {
          console.error(e);
        });
      })
      .catch((e) => {
        console.error(e);
      });    
          })().catch(e => {
            console.error(e);
        });
        //end add escrow address in our application and optin escrow usdc and nft
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


                    
                    
                      })().catch(e => {
                        console.error(e);
                    });


                    //end escrow update application 
                    
                    //pinata

//const axios = require('axios');
// let pinataApiKey='88348e7ce84879e143e1';
// let pinataSecretApiKey='e4e8071ff66386726f9fe1aebf2d3235a9f88ceb4468d4be069591eb78d4bf6f';
// const pinataSDK = require('@pinata/sdk');
// const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey);


//             pinata.testAuthentication().then((result) => {
//             //handle successful authentication here
//             console.log(result);
  
//             let ge=ipfsHash;
//             console.log("ipfsHash",ipfsHash);
//                     const body = {
//                         message: ge
//                     };
//                     const options = {
//                         pinataMetadata: {
//                             name: tname,
//                             keyvalues: {
//                                 customKey: 'customValue',
//                                 customKey2: 'customValue2'
//                             }
//                         },
//                         pinataOptions: {
//                             cidVersion: 0
//                         }
//                     };
//                     pinata.pinJSONToIPFS(body, options).then((result) => {
//                         //handle results here
//                         console.log(result);
//                         console.log("jsonresult")
//                         //setVisibleModal(false)
//                         //setIsOpen(true);
//                         setIsOpens(false)
//                         setIsOpen(true);
  
                      
//                       }).catch((err) => {
//                           //handle error here
//                           console.log(err);
//                       });
  
  
//                     }).catch((err) => {
//                         //handle error here
//                         console.log(err);
//                     });
        
                    //end pinata

    
      
//end here escrow steps

      
})
.catch((e) => {
console.error(e);
});

})
.catch((e) => {
console.error(e);
});
//end new
  }
  
  async function main() {
    try {
    //asset get
 const algosdkapp = require('algosdk');
 const portapp = "";  
const tokenapp = {
   'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
 }
// const baseServerapp = "https://testnet-algorand.api.purestake.io/idx2";    
 const server = "https://testnet-algorand.api.purestake.io/ps2";
// let indexerClientapp = new algosdk.Indexer(tokenapp, baseServerapp, portapp);
// let txnInfo =  await indexerClientapp.searchForTransactions().txid(assetidget).do();    
// await sleep(10000)  
// console.log("idp",txnInfo)
// await sleep(1000)  
// let idgetapp=txnInfo.transactions[0]["created-asset-index"];
// await sleep(2000)  
// console.log("printassetid",idgetapp)
    // initialize an algodClient
    let algodClient = new algosdk.Algodv2(tokenapp, server, algodPort);
    // get accounts from mnemonic
    //let creatorAccount = algosdk.mnemonicToSecretKey("output rocket fashion claw define win sudden all purpose wall group idea half chalk caught sound inquiry sheriff conduct burst miracle stand wink about grape");
    //let userAccount = algosdk.mnemonicToSecretKey("leisure pigeon pottery save camera nephew drift unhappy fine town leave nasty mixed soup frog warrior flush save flame bottom senior muffin ship above excite");
    // compile programs 
    let approvalProgram = await compileProgram(algodClient, approvalProgramSourceInitial);
    let clearProgram = await compileProgram(algodClient, clearProgramSource);
    let accountsarray = [];
    //let decAddr = algosdk.decodeAddress('ZAAHQ7DV7745I5WXAQPXL4GI4ASAV3KWSWM2IJF3UBWJLEDBDISXY2MCT4');        
    //let args = ["ZAAHQ7DV7745I5WXAQPXL4GI4ASAV3KWSWM2IJF3UBWJLEDBDISXY2MCT4"];
    //let program = new Uint8Array(Buffer.from("ZAAHQ7DV7745I5WXAQPXL4GI4ASAV3KWSWM2IJF3UBWJLEDBDISXY2MCT4","base64"));
    //accountsarray.push(program)        
    //let appArgs = [];
    let appArgs = [];
    let accounts = [];
    let usdcid = 41069913;
    console.log("(line:516) appArgs = ",appArgs)
    appArgs.push(algosdk.encodeUint64(usdcid)); //usdc//10458941
    appArgs.push(algosdk.encodeUint64(Number(parseInt(idget)))); //nft40789121
    accounts.push((localStorage.getItem("wallet"))); // account        
    // create new application
    let appId = await createApp(algodClient, localStorage.getItem("wallet"), approvalProgram, clearProgram, localInts, localBytes, globalInts, globalBytes, appArgs, accounts,idget,txxid,usdcid);
    console.log("appid",appId)      
    //let ts = new Date(new Date().toUTCString());
    //console.log(ts)               
    }
    catch (err){
        console.log("err", err);  
    }
  }
  
  //setIsOpens(true)
  main();

  //end new code added

}

const nocallof=()=>{

  alert("please wait .....")
}

  return (
    <>
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
            <br></br>
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
<br></br>
                  </div>
                </div>
              </div>
              <div className={styles.foot}>              
                {/* <button
                  className={cn("button-stroke tablet-show", styles.button)}
                  onClick={() => onSubmitImage()}
                  type="button"
                >
                  Preview
                </button>
                 */}

                 {Buttonopen ? (
                   
                   <button
                  className={cn("button", styles.button)}
                  onClick={() => callof()}
                  // type="button" hide after form customization
                  type="button"                              
                >                  
                  <span>Create item</span>
                  <Icon name="arrow-next" size="10" />
                </button>                                              

                 ):(

                  <button
                  className={cn("button", styles.button)}
                  onClick={() => nocallof()}
                  // type="button" hide after form customization
                  type="button"                              
                >                  
                  <span>Create item</span>
                  <Icon name="arrow-next" size="10" />
                </button>                                              

                 )}
                
                <div className={styles.saving}>
                  <span>Auto saving</span>
                  <Loader className={styles.loader} />
                </div>
              </div>
            </form>
          </div>          
        </div>
      </div>
<Modald visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <FolowStepsd className={styles.steps} onSubmitNFT={()=>onSubmitNFT}/>
      </Modald>

      <Modald visible={isOpen} onClose={() => setIsOpen(false)}>
        <FolowStepsdr className={styles.steps} onSub={()=>onSub}/>
      </Modald>

      <Modald visible={isOpens} >
        <FolowStep className={styles.steps} />
      </Modald>
      {/* <button
                  className={cn("button", styles.button)}
                  onClick={() => checkurl()}
                  // type="button" hide after form customization
                  type="button"                              
                >

                  <span>CHECK</span>
                  <Icon name="arrow-next" size="10" />
                </button> */}
    </>
  );
};

export default Upload;
