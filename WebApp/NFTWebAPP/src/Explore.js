import moment from 'moment';
import React, { useState,useEffect } from "react";
//import history from "./utils/history";
import web3 from './web3';
// Router, Route, Switch,
import { Link } from "react-router-dom";
//import Myitem from "./Myitem";
//import Nft from "./Nft";
//import firebase from "./firebase";
import fireDb from "./firebase";
//import Followingpage from "./Followingpage";
//import Activitypage from "./Activitypage";
//import Howitworkpage from "./Howitworkpage";
//import Communitypage from "./Communitypage";
import firebase from "firebase";
import {abi} from './datas'
//import Mypurchasepage from './Mypurchasepage'
import {tra} from './trans'
//import Createandpurchasepage from './Createandpurchasepage'
//import Receivedpage from './Receivedpage';
import Popup from './Popup';
import { Offline, Online } from "react-detect-offline";
import Footer from './footer'
import Logo from './logo.svg';
//import JSONDATA from './MOCK_DATA.json';
// import SearchBar from './SearchBar';
//import CountryList from './CountryList';

import "./App.css"
//import DarkMode from "./DarkMode"

const Explore=({handleLogout})=> {

  // const [initialData,setinitialDate]=useState('Sellers');

  //
  const [searchTerm,setSearchTerm]=useState('');
  console.log('returnsearch',searchTerm)
  // const [input, setInput] = useState('');
  // const [countryListDefault, setCountryListDefault] = useState();
  // const [countryList, setCountryList] = useState();
  // const fetchData = async () => {
  //   return await fetch('https://restcountries.eu/rest/v2/all')
  //     .then(response => response.json())
  //     .then(data => {
  //        setCountryList(data) 
  //        setCountryListDefault(data)
  //      });}
  // const updateInput = async (input) => {
  //    const filtered = countryListDefault.filter(country => {
  //     return country.name.toLowerCase().includes(input.toLowerCase())
  //    })
  //    setInput(input);
  //    setCountryList(filtered);
  // }
  // useEffect( () => {fetchData()},[]);
//
  const [selected, setSelected] = React.useState("Sellers");

  const [selecteds, setSelecteds] = React.useState("1");

  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
  };

  const changeSelectOptionHandlers = (event) => {
    setSelecteds(event.target.value);
  };

  // const [currentSymbol, setCurrentSymbol] = useState('Sellers')
  // const changeFruit = (newFruit) => {
  //   setCurrentSymbol(newFruit)
  // }
  // const [currentSymbols, setCurrentSymbols] = useState('1 day')
  // const changeFruits = (newFruit) => {
  //   setCurrentSymbols(newFruit)
  // }

  const [isOpenFeed, setIsOpenFeed] = useState(false); 
  const togglePopupFeed = () => {
    setIsOpenFeed(false);
    //window.location.reload(false)    
  }
  const [Feedbackc,setFeedbackc]=useState('');
  const [isLoading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(false);
  // window.location.reload(false)    
  }
    //fb   
  //const [currentid, setCurrentid] = useState("");
 //const [afternames,setAfternames] = useState([]);
 //const [name,setnames] = useState([]);
 //const [tid,setId] = useState(""); 
//const [getAddressDb,setGetAddressDb]=useState([]);
//const [getAddressDbs,setGetAddressDbs]=useState([]);
//console.log("initialgetaddresss",getAddressDbs)
 //console.log("initialgetaddress",getAddressDb)
 //console.log("ipname",name)

const[getImgbuyers,setgetImgbuyers]=useState([]);
const[getImbuyers,setgetImbuyers]=useState([]);//
console.log("firb1",getImgbuyers)
console.log("firb2",getImbuyers)



const[getImgsellers,setgetImgsellers]=useState([]);
const[getImsellers,setgetImsellers]=useState([]);//
console.log("firs1",getImgsellers)
console.log("firs2",getImsellers)

const[getImgreff,setgetImgreff]=useState([]);
const[getIm,setgetIm]=useState([]);
console.log("fir1",getImgreff)
console.log("fir2",getIm)
//temp start
const[Loader,setLoader]=useState(false);
let btn;
var accounts;

//buyers start

const getbuyers = async() =>{
  setLoader(true)
  setLoading(true)
  //window.location.reload(false)
  let req = [];
  let req2 = [];//imagerefexplore
  firebase.database().ref("buyerssavedb").on("value", (data) => {
    if (data) {
      data.forEach((d) => {
        req.push(d.val())          
      });        
    }
  });
  setgetImgbuyers(req)

  getImgbuyers.map((a)=>{
    console.log(`abb`, a)
  
    Object.keys(a).map((b)=>{
    //  console.log(`bb`, b)
      req2.push({
        //addAcc:
        addKeyI:a[b].keyId,
        addPrices:a[b].priceSet,
        addcAdd:a[b].cAddress,
        addIds:a[b].id,
        addImgs:a[b].imageUrl,
      addUname:a[b].userName,
    addUsymbol:a[b].userSymbol,
  addIpfs:a[b].ipfsUrl,
  addOwnerAddress:a[b].ownerAddress,
  addsold:a[b].soldd,
  addextra1:a[b].extra1,
  adddate:a[b].datesets
})              
    })
  })    
  setgetImbuyers(req2)    
  console.log("cfbb",req) 
  setLoader(false)
  setLoading(false)
}
useEffect(()=>{getbuyers()},[getImbuyers])





//end buyers

//sellers start

const getSellers = async() =>{
  setLoader(true)
  setLoading(true)
  //window.location.reload(false)
  let req = [];
  let req2 = [];//imagerefexplore
  firebase.database().ref("sellerssavedb").on("value", (data) => {
    if (data) {
      data.forEach((d) => {
        req.push(d.val())          
      });        
    }
  });
  setgetImgsellers(req)

  getImgsellers.map((a)=>{
    console.log(`abs`, a)
  
    Object.keys(a).map((b)=>{
    //  console.log(`bb`, b)
      req2.push({
        //addAcc:
        addKeyI:a[b].keyId,
        addPrices:a[b].priceSet,
        addcAdd:a[b].cAddress,
        addIds:a[b].id,
        addImgs:a[b].imageUrl,
      addUname:a[b].userName,
    addUsymbol:a[b].userSymbol,
  addIpfs:a[b].ipfsUrl,
  addOwnerAddress:a[b].ownerAddress,
  addsold:a[b].soldd,
  addextra1:a[b].extra1,
  adddate:a[b].datesets
})              
    })
  })    
  setgetImsellers(req2)    
  console.log("cfbs",req) 
  setLoader(false)
  setLoading(false)
}
useEffect(()=>{getSellers()},[getImsellers])



//sellers stop

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

  const getImgpa = async() =>{
    setLoader(true)
    setLoading(true)
    //window.location.reload(false)
    let req = [];
    let req2 = [];//imagerefexplore
    firebase.database().ref("imagerefexplore").on("value", (data) => {
      if (data) {
        data.forEach((d) => {
          req.push(d.val())          
        });        
      }
    });
    setgetImgreff(req)

    getImgreff.map((a)=>{
      console.log(`a`, a)
    
      Object.keys(a).map((b)=>{
      //  console.log(`bb`, b)
      //   console.log(`bbnext`, a[b].imageUrl)
      //   console.log(`bbaddess`,a[b].cAddress)
      //   console.log(`bbprice`,a[b].priceSet)
      //   console.log(`bbname`,a[b].userName)
      //   console.log(`bbsymbol`,a[b].userSymbol)
      //   console.log(`bbipfs`,a[b].ipfsUrl)
      //   console.log(`bboaddress`,a[b].ownerAddress)      
//change here
        req2.push({
          //addAcc:
          addKeyI:a[b].keyId,
          addPrices:a[b].priceSet,
          addcAdd:a[b].cAddress,
          addIds:a[b].id,
          addImgs:a[b].imageUrl,
        addUname:a[b].userName,
      addUsymbol:a[b].userSymbol,
    addIpfs:a[b].ipfsUrl,
    addOwnerAddress:a[b].ownerAddress,
    addsold:a[b].soldd,
    addextra1:a[b].extra1
  })              
      })
    })    
    setgetIm(req2)    
    console.log("cfb",req) 
    setLoader(false)
    setLoading(false)
  }
  useEffect(()=>{getImgpa()},[getIm])

  
const buynow= async(a) =>{

//eth 0xED3c6A02F152CaeA0f6F86EFADF55e638543DED3
  //bnb 0x2cA1655cceB43D27027e6676E880D1Ce4e7d7d18
    let gettrans=new web3.eth.Contract(tra,'0x2cA1655cceB43D27027e6676E880D1Ce4e7d7d18');

    //let gettrans=new web3.eth.Contract(tra,a.addOwnerAddress);

    let getaaa=new web3.eth.Contract(abi,a.addcAdd);

    console.log("insidebutton",a.addcAdd)
    console.log("insidebuttonid",a.addPrices)
    console.log("insidebuttonids",a.addOwnerAddress)

    const accounts = await web3.eth.getAccounts();

//tra start

  //  await gettrans.methods.sendss(a.addOwnerAddress).send({
  //    from:accounts[0], 
  //    value: web3.utils.toWei(a.addPrices, 'ether')
  //  });

  if(a.addOwnerAddress === accounts[0])
  {

    alert("you are owner so you does not purchase this token")

  }
  else{


    await gettrans.methods.sendss(a.addOwnerAddress).send({
      from: accounts[0],
      //value:web3.utils.toWei(a.addPrices,'BNB')
      value: web3.utils.toWei(a.addPrices, 'ether')//ether
     }); 
     //alert("amount has been sent")
 //end trans
 
     //let thing = a.addIds;
 
     console.log("thingget",a.addIds)
 
     console.log("ownerget",a.addOwnerAddress)
 
     console.log("keyget",a.addKeyI)
 
     //let s = await getaaa.methods.items(thing).call();
 
     //console.log("sget",s)
 
     //let state = a.addPrices;
 
     console.log("stateget",a.addPrices)
  
     await getaaa.methods.transferFrom(a.addOwnerAddress,accounts[0],a.addIds).send({
       from:accounts[0]
     });

    //  let refbuyers=fireDb.database().ref(`buyersdb/${accounts[0]}`).child(a.addKeyI);//ref1
     //const keybuyers = refbuyers.push().key;

   
    let ref1=fireDb.database().ref(`imageref/${accounts[0]}`).child(a.addKeyI);//ref1
    let ref12=fireDb.database().ref(`imagerefexplore/${a.addOwnerAddress}`).child(a.addKeyI);//ref12
    //let ref12new=fireDb.database().ref(`imagerefexplore/${accounts[0]}`).child(a.addKeyI);//ref12new
    let ref2=fireDb.database().ref(`imagerefbuy/${accounts[0]}`).child(a.addKeyI); 
     let ref23=fireDb.database().ref(`imagepurcre/${accounts[0]}`).child(a.addKeyI);
     let ref233=fireDb.database().ref(`imagepurcre/${a.addOwnerAddress}`).child(a.addKeyI);
     //const dbc = ref23.push().key;
 
     console.log("ref2get",ref2)
     ref1.set({
      id:a.addIds,imageUrl:a.addImgs,priceSet:a.addPrices,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addUname,userSymbol:a.addUsymbol,
      ipfsUrl:a.addIpfs,ownerAddress:accounts[0],soldd:"solded",extra1:"buyed",previousoaddress:a.addOwnerAddress,datesets:new Date().toDateString(),whois:'Buyers'}) 
       ref2.set({
       id:a.addIds,imageUrl:a.addImgs,priceSet:a.addPrices,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addUname,userSymbol:a.addUsymbol,
       ipfsUrl:a.addIpfs,ownerAddress:accounts[0],soldd:"solded",extra1:"buyed",datesets:new Date().toDateString(),whois:'Buyers'})
       ref23.set({
         id:a.addIds,imageUrl:a.addImgs,priceSet:a.addPrices,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addUname,userSymbol:a.addUsymbol,
         ipfsUrl:a.addIpfs,ownerAddress:accounts[0],soldd:"solded",extra1:"buyed",datesets:new Date().toDateString(),whois:'Buyers'})
         ref233.update({
           id:a.addIds,imageUrl:a.addImgs,priceSet:a.addPrices,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addUname,userSymbol:a.addUsymbol,
           ipfsUrl:a.addIpfs,ownerAddress:accounts[0],soldd:"solded",extra1:"buyed",datesets:new Date().toDateString(),whois:'Buyers'})
           ref12.update({
            id:a.addIds,imageUrl:a.addImgs,priceSet:a.addPrices,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addUname,userSymbol:a.addUsymbol,
            ipfsUrl:a.addIpfs,ownerAddress:accounts[0],soldd:"solded",extra1:"buyed",datesets:new Date().toDateString(),whois:'Buyers'})
       fireDb.database().ref(`imageref/${a.addOwnerAddress}`).child(a.addKeyI).remove();
       fireDb.database().ref(`imagerefbuy/${a.addOwnerAddress}`).child(a.addKeyI).remove();

       let refsellers=fireDb.database().ref(`buyerssavedb/${accounts[0]}`);//.child(a.addKeyI);//ref1
      const keysellers = refsellers.push().key;
  
  
    refsellers.child(keysellers).set({
      id:a.addIds,imageUrl:a.addImgs,priceSet:a.addPrices,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addUname,userSymbol:a.addUsymbol,
      ipfsUrl:a.addIpfs,ownerAddress:accounts[0],soldd:"solded",extra1:"buyed",datesets:new Date().toDateString(),whois:'Buyers'
    })
       //fireDb.database().ref(`imagerefexplore/${a.addOwnerAddress}`).child(a.addKeyI).remove();
       //fireDb.database().ref(`imagepurcre/${a.addOwnerAddress}`).child(a.addKeyI).remove();
       // let ref3=fireDb.database().ref(`imageref/${accounts[0]}`).child(a.addKeyI);
       // ref3.set({
       //   id:a.addIds,imageUrl:a.addImgs,priceSet:a.addPrices,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addUname,userSymbol:a.addUsymbol,
       //   ipfsUrl:a.addIpfs,ownerAddress:accounts[0]}) 
     // fireDb.database().ref(`imagerefbuy/${a.addOwnerAddress}`).child(a.addKeyI).set({
     //   id:a.addIds,imageUrl:a.addImgs,priceSet:a.addPrices,cAddress:a.addcAdd,keyId:a.addKeyI     
     // });
 //    fireDb.database().ref(`imageref/${a.addOwnerAddress}`).child(a.addKeyI).remove();  
 //alert(" Received successfully......")
 setIsOpen(true);
  } 
//window.location.reload(false)   
}  
  // const imgcall = (a) => {
  //   alert(`Hello, ${a.keyId}`);
  // };
  //temp end
  const feedbackset=()=>{
    //alert("im here"+Feedbackc)
    //setFeedbackc
  const mail = localStorage.getItem("mymailid");
  let reffeedback=fireDb.database().ref(`feedbacksave/`);
  const db = reffeedback.push().key;
  console.log("dbcheckappjs",db)
  reffeedback.child(db).set({id:db,profileimageUrl:"",name:"",emailid:mail,feedbacks:Feedbackc});
  setFeedbackc('');
  setIsOpenFeed(true);
  }
  
  
  const filterSet=()=>{
    alert("select   "+selected+"  "+selecteds)

  }



  const filterdata=()=>{
    
    if(selected === 'Sellers') {

      if(selecteds === '1')
      {
        let data = getImsellers.filter((val)=>{
          let date=moment()
          let createddate=moment(val.adddate)
          return date===createddate 
        })
        return data;
      }    
        let data = getImsellers.filter((val)=>{

          let date=moment().subtract(1,"days")
          let weekdate=moment().subtract(parseInt(selecteds),"days")
          let createddate=moment(val.adddate)

          return moment(createddate).isBetween(weekdate,date)
        })

        return data;    
    }


    if(selecteds === '1')
    {
      let data = getImbuyers.filter((val)=>{
        let date=moment()
        let createddate=moment(val.adddate)
        return date===createddate 
      })
      return data;
    }    
      let data = getImbuyers.filter((val)=>{

        let date=moment().subtract(1,"days")
        let weekdate=moment().subtract(parseInt(selecteds),"days")
        let createddate=moment(val.adddate)

        return moment(createddate).isBetween(weekdate,date)
      })

      return data;    

    //return getImbuyers;

  }

  const filterdatas=()=>{

    if(searchTerm === '') return getIm
    let data= getIm.filter((val)=>{
      return val.addUname.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
      
    })
    console.log('returndata',data)
    return data;
  }

  return (
    <>

      <div class="display-4 mb-1"></div>
      <div style={{backgroundColor:'white',height:'100px',width:'1500px',marginBlock:'5px',display:'flex'}}>
<div style={{marginLeft:'0px',height:'40px',width:'100px',color:'white'}}>

      <img src={Logo} alt="Logo" />

      <div style={{marginLeft:'10px',marginTop:'',height:'100px',width:'100px'}}>
    
      {/* onClick={event=>{setSearchTerm(event.target.value)}} */}
      {/* onChange={event => {setSearchTerm(event.target.value)}} */}
      {/* value={searchTerm} */}
      <input type="text"  placeholder="Search..."  onChange={event => {setSearchTerm(event.target.value)}}/>
      {
        searchTerm !== '' &&
      <>
      {filterdata().map((val,key)=>{
        
        return (
        <div className='user' key={key}>
          <h5 onClick={()=>setSearchTerm(val.title)} style={{cursor:'pointer'}}>{val.title}</h5>
        </div>
        )
      })}
      </>
}
</div>
</div>

      {/* <img style={{width:"100px",height:"100px"}} src="/logo.svg" alt=""/> */}

      <div style={{backgroundColor:'white',height:'43px',width:'1154px',marginLeft:'150px',marginBlock:'15px'}}>

      <Link
              to="/">              
              <button
              style={{outline: 'none'}}
                class="btn btn-info btn-block"
                type="button"                
              >
                Home
              </button>
</Link>
              {' '}
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
                // 
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
              {" "}
{/* <h2>Welcome</h2> */}
<button onClick={handleLogout}>Logout</button>
{/* </nav> */}




</div>
</div>
              <br></br>     
<br></br>
<br></br>
<br></br>
<div>
<div>
    <Online>
    

</Online>

    </div>

    <div>

    <Offline>


    {/* {<Popup content={<>
        <b>Notification</b>
        <p>Your are offline please check your internet connection......</p>
        <center> */}
        {/* <button type="button" onClick={togglePopup}>close</button> */}
        {/* </center> */}
      {/* </>} */}
    {/* //  handleClose={togglePopup} */}
    {/* />} */}


    </Offline>

    </div>

</div>
<center>

{/* {isLoading ? <div>
              <img style={{width:"300px",height:"300px"}} src="/4V0b.gif" alt=""/></div>:' '} */}

</center>
<div  style={{backgroundColor:'white',marginBlock:'5px',display:'flex'}}>
<h6 style={{color:'skyblue'}}>Top &nbsp;

      <select onChange={changeSelectOptionHandler}>
            <option value='Sellers'>Sellers</option>
            <option value='Buyers'>Buyers</option>
          </select>

      &nbsp;in&nbsp;
      
{/* style={{color:'white'}} */}

      <select onChange={changeSelectOptionHandlers}>
            <option value='1'>1 day</option>
            <option value='8'>7 days</option>
            <option value='32'>30 days</option>
          </select>

&nbsp;

      {/* onClick={()=>{feedbackset()}} */}

      {/* <button type="button" onClick={()=>{filterSet()}}  style={{height:'5px',backgroundColor:'white',border:'none',color:'skyblue',fontSize:'15px'}}>Filter</button> */}


      </h6>

{getImsellers.length === 0 ? null :( 
  <div style={{backgroundColor:'black',display:'flex',flexWrap:'wrap'}}>
{filterdata().map((a)=>{  
    return (
      <div style={{backgroundColor:'black',height:'300px',width:'300px'}}>

<div style={{border: '2px solid white',borderRadius:'5px'}}>

<center>
    <Link                  
                  to={{   
                    pathname: `/explore/${a.addKeyI}/${a.addOwnerAddress}`,
                    //pathname: `/explore/${combine}`,
                  }}
                >
    <img   src={a.addImgs}  style={{height:120,width:120,marginTop:'10px'}} alt=""    />
    </Link>
    {/* <h5>hello{a[b].imageUrl}</h5> */}
  
    <h6 style={{color:'white'}}>Name : {a.addUname}</h6>
    
    <h6 style={{color:'white'}}>Symbol : {a.addUsymbol}</h6>
    
    <h6 style={{color:'white'}}>price : {a.addPrices}</h6>

    {a.addsold === '' ? (
<>
{/* onClick={()=>buynow(a)} */}
{ <button  >BuyNow</button> }
  
    {' '}
</>
    ):(

      <h4 style={{color:'white'}}>Already solded</h4>
    )}
</center>
</div>

</div>
)})}
  </div>
)}
  </div>

<div>

{/* {Loader?
<h1>Loading.....</h1>
: */}
<>
{getIm.length === 0 ? null :( 
<div style={{backgroundColor:'black',display:'flex',flexWrap:'wrap'}}>
{filterdatas().map((a)=>{
  console.log(`a`, a)
  // Object.keys(a).map((b)=>{
  //   console.log(`b`, b)
  //   console.log(`bnext`, a[b].imageUrl)        
  // })
  //if((a.addId !== ' ') && (a.addsrc !== ' '))
//  if(a.addsold === '')
//  {
    return (
      <div style={{backgroundColor:'black',height:'500px',width:'300px'}}>

<div style={{border: '2px solid white',borderRadius:'5px'}}>

<center>
    <Link                  
                  to={{   
                    pathname: `/explore/${a.addKeyI}/${a.addOwnerAddress}`,
                    //pathname: `/explore/${combine}`,
                  }}
                >
    <img   src={a.addImgs}  style={{height:120,width:120,marginTop:'10px'}} alt=""    />
    </Link>
    {/* <h5>hello{a[b].imageUrl}</h5> */}
  
    <h6 style={{color:'white'}}>Name : {a.addUname}</h6>
    
    <h6 style={{color:'white'}}>Symbol : {a.addUsymbol}</h6>
    
    <h6 style={{color:'white'}}>price : {a.addPrices}</h6>

    {a.addsold === '' ? (
<>
{ <button onClick={()=>buynow(a)} >BuyNow</button> }
  
    {' '}
</>
    ):(

      <h6 style={{color:'white'}}>Already solded</h6>
    )}
    
    </center>

</div>

    {isOpen && <Popup content={<>
        <b>Notification</b>
        <p>Your token has been buyed successfully......</p>
        <center>
        <button type="button" onClick={togglePopup}>close</button>
        </center>
      </>}
       handleClose={togglePopup}
    />}

    {/* </div> */}

    </div>
    )
  })}
</div>
)}
</>
</div>                    
  
  <div style={{backgroundColor:'white',height:'200px',width:'1500px',marginBlock:'5px',display:'flex',marginLeft:'2px'}} >
  <Footer/>
  <div>
  <h6>Get the latest Rarible updates</h6>
&nbsp;
  <input
  placeholder='Your e-mail'
  type='text'
  name="Feedbackc"
  required
  onChange={event => setFeedbackc( event.target.value)}
  
/>

{' '}
    <button type="button" onClick={()=>{feedbackset()}} style={{height:'40px'}}>Submit</button>

</div>

<div style={{marginLeft:'100px'}}>  

<h4 style={{color:'black'}}>Rarible</h4>
<h4 style={{color:'black'}}>Explore</h4>
<h4 style={{color:'black'}}>How it works</h4>
<h4 style={{color:'black'}}>Create</h4>
<h4 style={{color:'black'}}>Support</h4>

</div>

<div style={{marginLeft:'200px'}}>  

<h4 style={{color:'black'}}>Community</h4>
<h4 style={{color:'black'}}>RARI Token</h4>
<h4 style={{color:'black'}}>Discussion</h4>
<h4 style={{color:'black'}}>Voting</h4>
<h4 style={{color:'black'}}>Suggest feature</h4>

</div>

<div style={{marginLeft:'250px'}}>  


{/* <DarkMode /> */}

{/* <h4 style={{color:'black'}}>Language</h4> */}
</div>
    &nbsp;
  </div>

  {isOpenFeed && <Popup content={<>
        <b>Notification</b>
        <p>Your Email has been sent successfully......</p>
        <button type="button" onClick={togglePopupFeed}>close</button>
      </>}
      // handleClose={togglePopup}
    />}


    </>

  );
}
export default Explore;