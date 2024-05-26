///* global AlgoSigner */
import React, { useState,useEffect} from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Profile.module.sass";
import Icon from "../../components/Icon";
import User from "./User";
import Items from "./Items";
import Itemss from "./Itemss";
//import Itemsss from "./Itemsss";
import Followers from "./Followers";
import firebase from "../UploadDetails/firebase";
//import web3 from '../UploadDetails/web3';
import Compress from "react-image-file-resizer";
//import Itemssss from "../ProfileCopy/Itemssss";
//import Popup from "../ConnectWallet/Popup"
//import axios from 'axios';
//import mnemonic from 'algosdk';

import Modald from "../../components/ModalD";
import FolowStepsd from "../ConnectWallet/FolowStepsd";


// data
//import { bids } from "../../mocks/bids";
//import { isStepDivisible } from "react-range/lib/utils";

const navLinks = [
  "On Sale",
  "Collectibles",
  "Created",
  "Likes",
  "Collection",
];

// "Following",
//   "Followers",

const socials = [
  {
    title: "twitter",
    url: "https://twitter.com/ui8",
  },
  {
    title: "instagram",
    url: "https://www.instagram.com/ui8net/",
  },
  {
    title: "facebook",
    url: "https://www.facebook.com/ui8.net/",
  },
];

const following = [
  {
    name: "Sally Fadel",
    counter: "161 followers",
    avatar: "/images/content/avatar-5.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
  {
    name: "Aniya Harber",
    counter: "161 followers",
    avatar: "/images/content/avatar-6.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
    ],
  },
  {
    name: "Edwardo Bea",
    counter: "161 followers",
    avatar: "/images/content/avatar-7.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-4.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-6.jpg",
    ],
  },
  {
    name: "Reymundo",
    counter: "161 followers",
    avatar: "/images/content/avatar-8.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
    ],
  },
  {
    name: "Jeanette",
    counter: "161 followers",
    avatar: "/images/content/avatar-9.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
];

const followers = [
  {
    name: "Sally Fadel",
    counter: "161 followers",
    avatar: "/images/content/avatar-5.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
  {
    name: "Aniya Harber",
    counter: "161 followers",
    avatar: "/images/content/avatar-6.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
    ],
  },
  {
    name: "Edwardo Bea",
    counter: "161 followers",
    avatar: "/images/content/avatar-7.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-4.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-6.jpg",
    ],
  },
  {
    name: "Reymundo",
    counter: "161 followers",
    avatar: "/images/content/avatar-8.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
    ],
  },
  {
    name: "Jeanette",
    counter: "161 followers",
    avatar: "/images/content/avatar-9.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
];

const Profile = () => {

  

const [isOpen, setIsOpen] = useState(false);
  const [Img,setImg] = useState("")
  const [buffer,setBuffer] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const [getcover,setgetcover] = useState("");
  
  console.log("getcoverss",getcover)
  console.log("Buffers",buffer)

  
  //const[getImgreff,setgetImgreff]=useState([]);
//const[getIm,setgetIm]=useState([]);

//console.log("getImg",getImgreff)
//console.log("getIm",getIm)

const[getImgreffalgo,setgetImgreffalgo]=useState([]);
console.log("getImgalgo",getImgreffalgo)

const[getImgreffalgosale,setgetImgreffalgosale]=useState([]);
console.log("getImgalgosale",getImgreffalgosale)

const[getImgreffalgolikes,setgetImgreffalgolikes]=useState([]);
console.log("getImgalgolikes",getImgreffalgolikes)

const[getImgreffalgobuy,setgetImgreffalgobuy]=useState([]);
console.log("getImgalgobuy",getImgreffalgobuy)

const[getCollection,setgetCollection]=useState([]);
console.log("getCollection",getCollection)
const[getCollection2,setgetCollection2]=useState([]);
console.log("getCollection2",getCollection2)

const[getCollection3,setgetCollection3]=useState([]);
console.log("getCollection3",getCollection3)
const[getCollection4,setgetCollection4]=useState([]);
console.log("getCollection4",getCollection4)


const dbcollection=async()=>{
  console.log("inside dbcallalgo function")
  
  let req = [];

  if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet")  === "" || localStorage.getItem("wallet")  === " " || localStorage.getItem("wallet") === 'undefined' || localStorage.getItem("wallet") === ''){
  }
  else{

    //let getalgo=localStorage.getItem("wallet");    
    //let getalgo=localStorage.getItem("wallet") ;
    //let kreq =[];
    firebase.database().ref("imagerefPoly").child(localStorage.getItem("wallet") ).on("value", (data) => {
      if (data) {
        data.forEach((d) => {
          let value=d.val();
          console.log("keycheckCollection",value.type)

          if(value.type === "Player")
          {
            req.push(
            
              {
                title: value.id,
                price: value.priceSet,
                highestBid: value.keyId,
                counter:value.userName ,
                //bid: 'New bid <span role="img" aria-label="fire">🔥</span>',
                bid:value.ownerAddress,
                image: value.imageUrl,
                image2x:value.paramsdb,
                category: value.privatekey,
                categoryText: value.cAddress,
                //purchasing !
                url: value.history,
                league:value.league,
                team:value.team,
                type:value.type,
                teamlogo:value.teamlogo,
                dimen:value.dimen,
                Mnemonic:value.Mnemonic,
                users: [                
                  {
                    avatar: "/images/content/avatar-4.jpg",
                  },
                ],
              },
            
            )  
            
          }                    
        });        
      }
    });
    setgetCollection(req);
  }
  //console.log("acc",getalgo)
  //image:images/content/card-pic-1.jpg
          //image2x: "/images/content/card-pic-1@2x.jpg",

          //req.push(d.key)          

}

useEffect(()=>{dbcollection()},[])

//

const dbcollection2=async()=>{
  console.log("inside dbcallalgo function")
  
  let req = [];

  if(localStorage.getItem("wallet")  === null || localStorage.getItem("wallet")  === "" || localStorage.getItem("wallet")  === " " || localStorage.getItem("wallet") === 'undefined' || localStorage.getItem("wallet") === ''){
  }
  else{

    //let getalgo=localStorage.getItem("wallet");    
    //let getalgo=localStorage.getItem("wallet") ;
    //let kreq =[];
    firebase.database().ref("imagerefPoly").child(localStorage.getItem("wallet") ).on("value", (data) => {
      if (data) {
        data.forEach((d) => {
          let value=d.val();
          console.log("keycheckCollection",value.type)

          if (value.type === "Award")
          {
            req.push(
            
              {
                title: value.id,
                price: value.priceSet,
                highestBid: value.keyId,
                counter:value.userName ,
                //bid: 'New bid <span role="img" aria-label="fire">🔥</span>',
                bid:value.ownerAddress,
                image: value.imageUrl,
                image2x:value.paramsdb,
                category: value.privatekey,
                categoryText: value.cAddress,
                //purchasing !
                url: value.history,
                league:value.league,
                team:value.team,
                type:value.type,
                teamlogo:value.teamlogo,
                dimen:value.dimen,
                Mnemonic:value.Mnemonic,
                users: [                
                  {
                    avatar: "/images/content/avatar-4.jpg",
                  },
                ],
              },
            
            )  
            
          }                    
        });        
      }
    });
    setgetCollection2(req);
  }
  //console.log("acc",getalgo)
  //image:images/content/card-pic-1.jpg
          //image2x: "/images/content/card-pic-1@2x.jpg",

          //req.push(d.key)          

}

useEffect(()=>{dbcollection2()},[])


//


//
const dbcollection3=async()=>{
  console.log("inside dbcallalgo function")
  
  //let req = [];

  if(localStorage.getItem("wallet")  === null || localStorage.getItem("wallet")  === "" || localStorage.getItem("wallet")  === " " || localStorage.getItem("wallet") === 'undefined' || localStorage.getItem("wallet") === ''){
  }
  else{

    //let getalgo=localStorage.getItem("wallet");    
    //let getalgo=localStorage.getItem("wallet") ;
    let kreq3 =[];
    firebase.database().ref("imagerefPoly").child(localStorage.getItem("wallet") ).on("value", (data) => {
      if (data) {
        data.forEach((d) => {
          let value=d.val();
          console.log("keycheckCollection",value.type)

          if (value.type === "Trophy")
          {
            kreq3.push(
            
              {
                title: value.id,
                price: value.priceSet,
                highestBid: value.keyId,
                counter:value.userName ,
                //bid: 'New bid <span role="img" aria-label="fire">🔥</span>',
                bid:value.ownerAddress,
                image: value.imageUrl,
                image2x:value.paramsdb,
                category: value.privatekey,
                categoryText: value.cAddress,
                //purchasing !
                url: value.history,
                league:value.league,
                team:value.team,
                type:value.type,
                teamlogo:value.teamlogo,
                dimen:value.dimen,
                Mnemonic:value.Mnemonic,
                users: [                
                  {
                    avatar: "/images/content/avatar-4.jpg",
                  },
                ],
              },
            
            )  
            
          }                    
        });        
      }
    });
    setgetCollection3(kreq3);
  }
  //console.log("acc",getalgo)
  //image:images/content/card-pic-1.jpg
          //image2x: "/images/content/card-pic-1@2x.jpg",

          //req.push(d.key)          

}

useEffect(()=>{dbcollection3()},[])



//

const dbcollection4=async()=>{
  console.log("inside dbcallalgo function")
  
  //let req = [];

  if(localStorage.getItem("wallet")  === null || localStorage.getItem("wallet")  === "" || localStorage.getItem("wallet")  === " " || localStorage.getItem("wallet") === 'undefined' || localStorage.getItem("wallet") === ''){
  }
  else{

    //let getalgo=localStorage.getItem("wallet");    
    //let getalgo=localStorage.getItem("wallet") ;
    let kreq4 =[];
    firebase.database().ref("imagerefPoly").child(localStorage.getItem("wallet") ).on("value", (data) => {
      if (data) {
        data.forEach((d) => {
          let value=d.val();
          console.log("keycheckCollection",value.type)

          if (value.type === "Others")
          {
            kreq4.push(
            
              {
                title: value.id,
                price: value.priceSet,
                highestBid: value.keyId,
                counter:value.userName ,
                //bid: 'New bid <span role="img" aria-label="fire">🔥</span>',
                bid:value.ownerAddress,
                image: value.imageUrl,
                image2x:value.paramsdb,
                category: value.privatekey,
                categoryText: value.cAddress,
                //purchasing !
                url: value.history,
                league:value.league,
                team:value.team,
                type:value.type,
                teamlogo:value.teamlogo,
                dimen:value.dimen,
                soldd:"",
                Mnemonic:value.Mnemonic,
                users: [                
                  {
                    avatar: "/images/content/avatar-4.jpg",
                  },
                ],
              },
            
            )  
            
          }                    
        });        
      }
    });
    setgetCollection4(kreq4);
  }
  //console.log("acc",getalgo)
  //image:images/content/card-pic-1.jpg
          //image2x: "/images/content/card-pic-1@2x.jpg",

          //req.push(d.key)          

}

useEffect(()=>{dbcollection4()},[])



const dbcallalgolikes=async()=>{
  console.log("inside dbcallsalealgo function")
  
  let req = [];
    
  if(localStorage.getItem("wallet")  === null || localStorage.getItem("wallet")  === "" || localStorage.getItem("wallet")  === " " || localStorage.getItem("wallet") === 'undefined' || localStorage.getItem("wallet") === ''){

  }
  else{

    let getalgo=localStorage.getItem("wallet");
  
    //let kreq =[];
    firebase.database().ref("imagereflikes").child(getalgo).on("value", (data) => {
      if (data) {
        data.forEach((d) => {
          //console.log("keycheck",d.key)
          let value=d.val();
          req.push(
            
            {
              title: value.id,
              price: value.priceSet,
              highestBid: value.keyId,
              counter:value.userName ,
              //bid: 'New bid <span role="img" aria-label="fire">🔥</span>',
              bid:value.ownerAddress,
              image: value.imageUrl,
              image2x: value.imageUrl,
              category: "green",
              categoryText: value.cAddress,
              //purchasing !
              url: value.history,
              league:value.league,
              team:value.team,
              type:value.type,
              dimen:value.dimen,
              teamlogo:value.teamlogo,      
              ipfsurl:value.ipfsUrl,
              extra:value.extra1,
              previousaddress:value.previousoaddress,
              date:value.datesets,
              description:value.description,
              soldd:"",
              Mnemonic:value.Mnemonic,
              users: [                
                {
                  avatar: "/images/content/avatar-4.jpg",
                },
              ],
            },
          
          )
        });        
      }
    });
    setgetImgreffalgolikes(req);
  }
  
  console.log("acc",getImgreffalgolikes)

}

useEffect(()=>{dbcallalgolikes()},[])


// useEffect(() => {
//   const fetchPosts = async () => {

//     let getalgo=localStorage.getItem("wallet");
  
//     let req =[];
//     firebase.database().ref("imagereflikes").child(getalgo).on("value", (data) => {
//       if (data) {
//         data.forEach((d) => {
//           //console.log("keycheck",d.key)
//           let value=d.val();
//           req.push(
            
//             {
//               title: value.id,
//               price: value.priceSet,
//               highestBid: value.keyId,
//               counter:value.userName ,
//               //bid: 'New bid <span role="img" aria-label="fire">🔥</span>',
//               bid:value.ownerAddress,
//               image: value.imageUrl,
//               image2x: value.imageUrl,
//               category: "green",
//               categoryText: value.cAddress,
//               //purchasing !
//               url: value.history,
//               league:value.league,
//               team:value.team,
//               users: [                
//                 {
//                   avatar: "/images/content/avatar-4.jpg",
//                 },
//               ],
//             },
          
//           )
//         });        
//       }
      
//     });
    
//   };

//   fetchPosts();
// }, []);



const dbcallsalealgo=async()=>{
  console.log("inside dbcallsalealgo function")
  
  let req = [];

  if(localStorage.getItem("wallet")  === null || localStorage.getItem("wallet")  === "" || localStorage.getItem("wallet")  === " " || localStorage.getItem("wallet") === 'undefined' || localStorage.getItem("wallet") === '' || localStorage.getItem("wallet") === "0x"){

  }else{

    let getalgo=localStorage.getItem("wallet");
    
    //let kreq =[];
    firebase.database().ref("imagerefexploreoneAlgos").child(getalgo).on("value", (data) => {
      if (data) {
        data.forEach((d) => {
          //console.log("keycheck",d.key)
          let value=d.val();
          req.push(            
            {
              title: value.id,
              price: value.priceSet,
              highestBid: value.keyId,
              counter:value.userName ,
              //bid: 'New bid <span role="img" aria-label="fire">🔥</span>',
              bid:value.ownerAddress,
              image: value.imageUrl,
              image2x: value.paramsdb,
              category: value.privatekey,
              categoryText: value.cAddress,
              //purchasing !
              url: value.history,
              league:value.league,
              team:value.team,
              type:value.type,
              dimen:value.dimen,
              teamlogo:value.teamlogo,      
              ipfsurl:value.ipfsUrl,
              extra:value.extra1,
              previousaddress:value.previousoaddress,
              date:value.datesets,
              description:value.description,
              soldd:"",
              Mnemonic:value.Mnemonic,
              users: [                
                {
                  avatar: "/images/content/avatar-4.jpg",
                },
              ],
            },
          
          )
        });        
      }
    });
    setgetImgreffalgosale(req);  
  }
  console.log("acc",getImgreffalgosale)

}

useEffect(()=>{dbcallsalealgo()},[])


const dbcallalgo=async()=>{
  console.log("inside dbcallalgo function")
  
  let req = [];

  if(localStorage.getItem("wallet")  === null || localStorage.getItem("wallet")  === "" || localStorage.getItem("wallet")  === " " || localStorage.getItem("wallet") === 'undefined' || localStorage.getItem("wallet") === ''){

  }
  else{

    let getalgo=localStorage.getItem("wallet");    
    //let kreq =[];
    firebase.database().ref("imagerefAlgo").child(getalgo).on("value", (data) => {
      if (data) {
        data.forEach((d) => {
          //console.log("keycheck",d.key)
          let value=d.val();
          req.push(
            
            {
              title: value.id,
              price: value.priceSet,
              highestBid: value.keyId,
              counter:value.userName ,
              //bid: 'New bid <span role="img" aria-label="fire">🔥</span>',
              bid:value.ownerAddress,
              image: value.imageUrl,
              image2x:value.paramsdb,
              category: value.privatekey,
              categoryText: value.cAddress,
              //purchasing !
              url: value.history,
              league:value.league,
              team:value.team,
              type:value.type,
              dimen:value.dimen,
              teamlogo:value.teamlogo,      
              ipfsurl:value.ipfsUrl,
              extra:value.extra1,
              previousaddress:value.previousoaddress,
              date:value.datesets,
              description:value.description,
              soldd:"",
              history:"",
              Mnemonic:value.Mnemonic,
              users: [                
                {
                  avatar: "/images/content/avatar-4.jpg",
                },
              ],
            },
          
          )

          //image:images/content/card-pic-1.jpg
          //image2x: "/images/content/card-pic-1@2x.jpg",

          //req.push(d.key)          
        });        
      }
    });
    setgetImgreffalgo(req);
  
  }
  //console.log("acc",getalgo)

}

useEffect(()=>{dbcallalgo()},[])


const dbcallalgobuy=async()=>{
  console.log("inside dbcallalgobuy function")
  
  let req = [];

  if(localStorage.getItem("wallet")  === null || localStorage.getItem("wallet")  === "" || localStorage.getItem("wallet")  === " " || localStorage.getItem("wallet") === 'undefined' || localStorage.getItem("wallet") === ''){

  }
  else{

  
    let getalgo=localStorage.getItem("wallet");
    
    //let kreq =[];
    firebase.database().ref("imagerefbuy").child(getalgo).on("value", (data) => {

      
      if (data) {
        data.forEach((d) => {
          //console.log("keycheck",d.key)
          let value=d.val();
          req.push(
            
            {
              title: value.id,
              price: value.priceSet,
              highestBid: value.keyId,
              counter:value.userName ,
              //bid: 'New bid <span role="img" aria-label="fire">🔥</span>',
              bid:value.ownerAddress,
              image: value.imageUrl,
              image2x:value.paramsdb,
              category: value.privatekey,
              categoryText: value.cAddress,
              //purchasing !
              url: value.history,
              league:value.league,
              team:value.team,
              type:value.type,
              dimen:value.dimen,
              teamlogo:value.teamlogo,      
              ipfsurl:value.ipfsUrl,
              extra:value.extra1,
              previousaddress:value.previousoaddress,
              date:value.datesets,
              description:value.description,
              Mnemonic:value.Mnemonic,
              users: [                
                {
                  avatar: "/images/content/avatar-4.jpg",
                },
              ],
            },
          
          )

          //image:images/content/card-pic-1.jpg
          //image2x: "/images/content/card-pic-1@2x.jpg",

          //req.push(d.key)          
        });        
      }
    });
    setgetImgreffalgobuy(req);
  
  }
  //console.log("acc",getalgo)

}

useEffect(()=>{dbcallalgobuy()},[])





const captureFile=(event)=>{

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

}

const getbg=()=>{

  
    
    if(localStorage.getItem("wallet") === null && Img === "" ){
  
    }else{

      let getalgo=localStorage.getItem("wallet");

      let req=[];
  // firebase.database().ref("bgphoto").child(getalgo).on("value", (data) => {
  //   if (data) {
  //     console.log("datacover",data)
  //     data.forEach((d) => {
  //       req.push(d.val().bgurl)      
  //       //console.log("list",d.val().bgurl)
  //     });        
  //   }
  //   setgetcover(req)
  // });
  
    }
}
  
useEffect(()=>{getbg()},[])


const setprofilephoto=()=>{

  console.log("inside setprofilephoto function")
  
    
  if(localStorage.getItem("wallet")  === null || localStorage.getItem("wallet")  === "" || localStorage.getItem("wallet")  === " " || localStorage.getItem("wallet") === 'undefined' || localStorage.getItem("wallet") === '' || Img === ""){
  
    }else{

      let getalgo=localStorage.getItem("wallet");
  let ref=firebase.database().ref(`bgphoto/${getalgo}`);
  let dateset=new Date().toDateString();
  console.log("dateget",dateset)
  const db = ref.push().key;                       
  console.log("dbcheck",db)
  ref.child("bg").set({bgurl:Img,datesets:dateset,dbkey:db,ownaddress:getalgo}).then(()=>{
    setVisible(true)
    window.location.reload(false)

  })
  }
  
}

const convertToBuffer = async(reader) => {
  //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
  //set this buffer -using es6 syntax
    setBuffer(buffer);

    //onSubmitImage();
};

// const checkasset=async()=>{

//   const server = "https://testnet-algorand.api.purestake.io/ps2";
//   const port = "";

// const token = {
//     'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
// }


// const algosdk = require('algosdk');

//   AlgoSigner.connect()
//   .then((d) => {
//     //const algodServer = 'https://testnet-algorand.api.purestake.io/ps2'
//     const indexerServer = 'https://testnet-algorand.api.purestake.io/idx2'
//     //const token = { 'X-API-Key': 'YOUR API KEY HERE' }
//     //const port = '';
    
//     let algodClient = new algosdk.Algodv2(token, server, port);
//     let indexerClient = new algosdk.Indexer(token, indexerServer, port);
    
//     algodClient.healthCheck().do()
//     .then(d => { 
//       AlgoSigner.accounts({
//         ledger: 'TestNet'
//       })
//       .then((d) => {
//         let accounts = d;
//         console.log("addressalgo",accounts[0].address)
//         algodClient.getTransactionParams().do()
// .then((d) => {
//   let txParamsJS = d;

//   const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
//     from: accounts[0].address,
//     to: accounts[1].address,
//     amount: 1,
//     note: undefined,
//     suggestedParams: {...txParamsJS}
//   });
  
//   // Use the AlgoSigner encoding library to make the transactions base64
//   let txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
  
//   AlgoSigner.signTxn([{txn: txn_b64}])
//   .then((d) => {
//     let signedTxs = d;
//   })
//   .catch((e) => {
//       console.error(e);
//   });
// })
// .catch((e) => {
//   console.error(e);
// });
//       })
//       .catch((e) => {
//         console.error(e);
//       });
//     })
//     .catch(e => { 
//       console.error(e); 
//     });
//   })
//   .catch((e) => {
//     console.error(e);
//   });
  
//    }


const checkasset=()=>{
//setIsOpen(true)
//firebase.database().ref("algorandData").remove();

alert("check ")

let program = new Uint8Array(Buffer.from("+FItTCe6NXWiIccpPYbgJAHkfDr1+AdNIx8B+YOvlGgIM3fchnlh9NXZ+HNMK34l1xBYX2ANt2pPHZlRYGyKxA==", "base64"));
console.log("programop",program)

//let mnem = mnemonic.from_private_key('+FItTCe6NXWiIccpPYbgJAHkfDr1+AdNIx8B+YOvlGgIM3fchnlh9NXZ+HNMK34l1xBYX2ANt2pPHZlRYGyKxA==')
// print("Mneumonic : ",mnem)

//alert(mnem)
}

 const togglePopup = () => {
        setIsOpen(false);
      }

  return (
    <div className={styles.profile}>

     
      <div
        className={cn(styles.head, { [styles.active]: visible })}                        
        style={{
  backgroundImage: "url(/images/content/bg-profile.jpg)",
  //url:getcover
}}
      >

        {/* <img src="/images/content/avatar-1.jpg" alt="Avatar" /> */}
        {/* <img src={getcover} alt="Avatar" /> */}
        {/* /images/content/bg-profile.jpg */}
        <div className={cn("container", styles.container)}>
          <div className={styles.btns}>
            <button
              className={cn("button-stroke button-small", styles.button)}
              onClick={() => setVisible(true)}
            >
              {/*  */}
              <span>Edit cover photo</span>
              <Icon name="edit" size="16" />
            </button>
            <Link
              className={cn("button-stroke button-small", styles.button)}
              to="profile-edit"
            >
              <span>Edit profile</span>
              <Icon name="image" size="16" />
            </Link>
          </div>

          <div className={styles.file}>
            {/* <input type="file" /> */}
            <input 
             name="tfile" id="fileid" type = "file" onChange = {captureFile} required />

            <div className={styles.wrap}>
              <Icon name="upload-file" size="48" />
              <div className={styles.info}>Drag and drop your photo here</div>
              <div className={styles.text}>or click to browse</div>
            </div>
            <button
              className={cn("button-small", styles.button)}
              onClick={() => setprofilephoto()}
            >
              Save photo
            </button>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        
        <div className={cn("container", styles.container)}>


          
          
          <User className={styles.user} item={socials} />
          
          <div className={styles.wrapper}>
            <div className={styles.nav}>                          

            {/* <button
              className={cn("button-small", styles.button)}
              onClick={() => checkasset()}
            >
              check
            </button> */}
{/* <h5 style={{cursor:"pointer"}} onClick={e => window.open("https://www.youtube.com/")}>Contract Addres</h5> */}

{/* <h1 onClick={}>Click Me</h1> */}
              
              {navLinks.map((x, index) => (
                <button
                  className={cn(styles.link, {
                    [styles.active]: index === activeIndex,
                  })}
                  key={index}
                  onClick={() => setActiveIndex(index)}
                >
                  {x}
                </button>
              ))}
            </div>
            <div className={styles.group}>
              <div className={styles.item}>
                {activeIndex === 0 && (
                  <Itemss class={styles.items} items={getImgreffalgosale} />

                  // bids.slice(0, 3)
                  
                )}
                {activeIndex === 1 && (
                  <Items class={styles.items} items={getImgreffalgobuy} />
                  // bids.slice(0, 6)
                )}

                {activeIndex === 2 && (                                     
                  <Items class={styles.items} items={getImgreffalgo} />              
                 )} 
                {activeIndex === 3 && (
                  <Itemss class={styles.items} items={getImgreffalgolikes} />
                )}
                {/* {activeIndex === 4 && (                  
                  <Itemssss class={styles.items} items={getCollection} items2={getCollection2} items3={getCollection3} items4={getCollection4}/>
                )} */}
                {activeIndex === 5 && (
                  <Followers className={styles.followers} items={followers} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Profile;
