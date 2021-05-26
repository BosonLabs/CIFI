import React, { useState,useEffect } from "react";
import web3 from './web3';
import { Link } from "react-router-dom";
import firebase from "./firebase";
import fireDb from "./firebase";
import {abi} from './data'
import Popup from './Popup';
import { Offline, Online } from "react-detect-offline";
import Footer from './footer'

function Salepagecopy() {

  const [tprice,setTprice] = useState("");
  const [isOpenset, setIsOpenset] = useState(false);
  const [isOpensetFirst, setIsOpensetFirst] = useState(false);
  const [a, setSelectImage] = useState({});
  const [tsAddress,settsAddress] = useState("");
  
  console.log(`agets`, a);
 
  const togglePopupset = () => {
    setIsOpenset(false);    
  }

  const [isOpensetsend, setIsOpensetsend] = useState(false);
 
  const togglePopupsetsend = () => {
    setIsOpensetsend(false);

    //window.location.reload(false)
    
  }

  const [isLoading, setLoading] = useState(false)

  const [isOpen, setIsOpen] = useState(false);//update prize
 
  const togglePopup = () => {
    setIsOpen(false);

    //window.location.reload(false)
    
  }
  const [isOpen2, setIsOpen2] = useState(false);
 
  const togglePopup2 = () => {
    setIsOpen2(false);
    window.location.reload(false)
    
  }
const[getImgreff,setgetImgreff]=useState([]);
const[getIm,setgetIm]=useState([]);

let btn;
var accounts;

  const connectmm = async () => {

      accounts = await web3.eth.getAccounts();//.send({from:accounts[0]})

      if(accounts[0] !== ""){

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



  //new function start

  const getImgpa = async() =>{

    setLoading(true);
    const accounts = await web3.eth.getAccounts();
    let req = [];
    let req2 = [];
    //let kreq =[];
    firebase.database().ref("imageref").child(accounts[0]).on("value", (data) => {
      if (data) {
        data.forEach((d) => {
          console.log("keycheck",d.key)
          req.push(d.val())
          //req.push(d.key)
          
        });
        
      }

    });

    setgetImgreff(req);

    //change here

    getImgreff.map((a)=>{
      
    req2.push({

          addAddress:a.ownerAddress,
          addPrices:a.priceSet,
          addcAdd:a.cAddress,
          addIds:a.id,
          addImgs:a.imageUrl,
          addKeyI:a.keyId,
        addName:a.userName,
      addSymbol:a.userSymbol,
    addIpfs:a.ipfsUrl,
    addsold:a.soldd,
    addextra1:a.extra1,
    addPoAddress:a.previousoaddress,
    adddatesets:a.dateset,
    addwhois:a.whois    
  })
    })

    setgetIm(req2)
    setLoading(false);
  }


  useEffect(()=>{getImgpa()},[getIm])
  //end here



//  const newget = async()=>{
//   const accounts = await web3.eth.getAccounts();
//   let n =[]
//   getAddressDb.forEach(async(add)=>{
//     let poda = add
//         let getaaaa=new web3.eth.Contract(abi,poda);
        
        
//         let printgeta=await getaaaa.methods.tokensOfOwner(accounts[0]).call();

//         printgeta.forEach((p=>{
//         n.push(p)
// }))
//       setnames(n);    
      
//     })
//  }

//   const s =  async ()=>{
//   const accounts = await web3.eth.getAccounts();

//   let after = []
//    getAddressDb.forEach(async(a)=>{
//        let poda = a
//         let getaaaa=new web3.eth.Contract(abi,poda);
//         names.forEach(async (n)=>{
//           console.log(`n`, n)
//           // console.log(`object`,n, await getaaaa.methods.tokenURI(n).call())     }) 
//           after.push({
//             add:poda,
//             addId:n,
//             addImgSrc:await getaaaa.methods.tokenURI(n).call()})
//    })
//   })

//    console.log(`after`, after)
// setAfternames(after)
//  }


   
const setprice =async ()=>{

  setIsOpensetFirst(false)

             var isd = a.addIds;//a
             console.log("targetid",isd)

            console.log(`a`, a)
            let getaaaa=new web3.eth.Contract(abi,a.addcAdd);
            alert("con address"+a.addcAdd);
            alert("token id"+isd);
            const accounts = await  web3.eth.getAccounts();
            console.log("checking")
            

            let price=tprice;

            if(accounts[0] === a.addAddress)
            {

              //change mactimum
              await getaaaa.methods.setTokenState([isd],"true").send({
                from:accounts[0],
                gas: 51753,
                gasPrice:'10000000000'
              });
           // salepage.settokenstate();
            await getaaaa.methods.setTokenPrice([isd],price).send({from:accounts[0]})
            const priceamount = await getaaaa.methods.items(isd).call();
            console.log(priceamount.price)
            // await getaaaa.methods.setApprovalForAll(a.addcAdd,"true").send({from:accounts[0]})
            await getaaaa.methods.approve(a.addcAdd,a.addIds).send({from:accounts[0]})

            let refsellers=fireDb.database().ref(`sellerssavedb/${accounts[0]}`);//.child(a.addKeyI);//ref1
            const keysellers = refsellers.push().key;
          
          
            refsellers.child(keysellers).set({
              id:a.addIds,imageUrl:a.addImgs,priceSet:price,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addName,userSymbol:a.addSymbol,ipfsUrl:a.addIpfs,ownerAddress:accounts[0],
              soldd:"",extra1:"readytosold",datesets:new Date().toDateString(),whois:'Sellers'
            })
          
          
            
fireDb.database().ref(`imageref/${accounts[0]}`).child(a.addKeyI).update({
              id:a.addIds,imageUrl:a.addImgs,priceSet:price,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addName,userSymbol:a.addSymbol,ipfsUrl:a.addIpfs,ownerAddress:accounts[0],
              soldd:"",extra1:"readytosold",datesets:new Date().toDateString(),whois:'Sellers'
});
fireDb.database().ref(`imagerefexplore/${accounts[0]}`).child(a.addKeyI).set({
              id:a.addIds,imageUrl:a.addImgs,priceSet:price,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addName,userSymbol:a.addSymbol,ipfsUrl:a.addIpfs,ownerAddress:accounts[0],
              soldd:"",extra1:"readytosold",datesets:new Date().toDateString(),whois:'Sellers'
}).then(()=> {
  setTprice("");
  //setIsOpensetFirst(false);
  setIsOpen(true);
 });  


}
else{
alert("Your are not owner so you does not update or set prizes......")
}
}

const send=async()=>{

  setIsOpensetsend(false)

  let getaaaa=new web3.eth.Contract(abi,a.addcAdd);

  const accounts = await  web3.eth.getAccounts();

  let toaddressget=tsAddress;
  

  if(toaddressget === null){

    alert("please enter address")

  }
  else if(toaddressget === accounts[0])
  {
    alert("you are entered owner address so you does not send this address")

  }else{
//eth
    // await getaaaa.methods.safeTransferFrom(accounts[0],toaddressget,a.addIds).send({
    //   from:accounts[0]

    // });

    //mactimum
    // await getaaaa.methods.safeTransferFrom(accounts[0],toaddressget,a.addIds).send({
    //   from:accounts[0],
    //      gas: 117218,
    //      gasPrice:'5000000000'
    // });
//also mactimum

  

await getaaaa.methods.transferFrom(accounts[0],toaddressget,a.addIds).send({
  from:accounts[0]
});  
    console.log("checkinga",a.addOwnerAddress)

    let refsellers=fireDb.database().ref(`buyerssavedb/${accounts[0]}`);//.child(a.addKeyI);//ref1
    const keysellers = refsellers.push().key;
  
    //alert("get"+a.addPrices);
  
    refsellers.child(keysellers).set({
      id:a.addIds,imageUrl:a.addImgs,priceSet:a.addPrices,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addName,userSymbol:a.addSymbol,ipfsUrl:a.addIpfs,ownerAddress:accounts[0],
      soldd:"",extra1:"readytosold",datesets:new Date().toDateString(),whois:'Buyers'
    })

    

      fireDb.database().ref(`imageref/${toaddressget}`).child(a.addKeyI).update({
        id:a.addIds,imageUrl:a.addImgs,priceSet:a.addPrices,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addName,
        userSymbol:a.addSymbol,ipfsUrl:a.addIpfs,ownerAddress:toaddressget,soldd:"sended",extra1:"buyed",addPoAddress:accounts[0],
        datesets:new Date().toDateString(),whois:'Buyers'
      })


      fireDb.database().ref('imageref').child(accounts[0]).child(a.addKeyI).remove().then(()=> {
        settsAddress("")
        setIsOpen2(true);
        
       });


      
  }

}

//update prize

const setprices =async ()=>{


var isd = a.addIds;//a
console.log("targetid",isd)
console.log(`a`, a)
const accounts = await  web3.eth.getAccounts();
console.log("checking")
let price=tprice;
if(price !== '')
 {

  let refsellers=fireDb.database().ref(`sellerssavedb/${accounts[0]}`);//.child(a.addKeyI);//ref1
  const keysellers = refsellers.push().key;


  refsellers.child(keysellers).set({
    id:a.addIds,imageUrl:a.addImgs,priceSet:price,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addName,userSymbol:a.addSymbol,ipfsUrl:a.addIpfs,ownerAddress:accounts[0],
    soldd:"",extra1:"readytosold",datesets:new Date().toDateString(),whois:'Sellers'
  })


  
    

    // refsellers.child(a.addKeyI).set({
    //         id:a.addIds,imageUrl:a.addImgs,priceSet:a.addPrices,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addUname,userSymbol:a.addUsymbol,
    //         ipfsUrl:a.addIpfs,ownerAddress:accounts[0],soldd:"solded",extra1:"buyed",datesets:new Date().toDateString(),whois:'Sellers'});


   fireDb.database().ref(`imageref/${accounts[0]}`).child(a.addKeyI).update({
     id:a.addIds,imageUrl:a.addImgs,priceSet:price,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addName,userSymbol:a.addSymbol,ipfsUrl:a.addIpfs,ownerAddress:accounts[0],
     soldd:"",extra1:"readytosold",datesets:new Date().toDateString(),whois:'Sellers'
});

  fireDb.database().ref(`imagerefexplore/${accounts[0]}`).child(a.addKeyI).set({
     id:a.addIds,imageUrl:a.addImgs,priceSet:price,cAddress:a.addcAdd,keyId:a.addKeyI,userName:a.addName,userSymbol:a.addSymbol,ipfsUrl:a.addIpfs,ownerAddress:accounts[0],
     soldd:"",extra1:"readytosold",datesets:new Date().toDateString(),whois:'Sellers'
   
   });

   //previousoaddress:a.addOwnerAddress

   fireDb.database().ref(`imagerefexplore/${a.addPoAddress}`).child(a.addKeyI).remove().then(()=> {
     setTprice("");
     setIsOpenset(false);
     setIsOpen(true);
    });  
  }
}

return (    
    
  <>

    <div>

<div style={{backgroundColor:'white',height:'70px',width:'1500px',marginBlock:'5px',display:'flex'}}>

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
</Link>

              {" "}


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

              {" "}

<br></br>
<br></br>
</div>

</div>

<br></br>
<br></br><br></br>
<br></br>

{/* {isLoading ? <div><h4>Fetching........</h4>
              <img style={{width:"200px",height:"200px"}} src="/4V0b.gif" alt=""/></div>:' '} */}

{getIm.length === 0 ? null : 
<div style={{backgroundColor:'black',display:'flex',flexWrap:'wrap'}}>
{getIm.map((a)=>{
  console.log("getas", a.extra1)

  // if(a.addPrices === ''){
  return (
    <div style={{backgroundColor:'black',height:'500px',width:'300px'}}>

      {/* onClick={() => alert(a.addImgs)} */}



      
      <div style={{border: '2px solid white',borderRadius:'5px'}}>

        <center>

  <img   src={a.addImgs}  style={{height:250,width:250,marginTop:'10px'}}    alt={""} />

  {/* </Link> */}


  {' '}
  <br></br>
  
  <h5 style={{color:'white'}}>Name : {a.addName}</h5>
    
    <h5 style={{color:'white'}}>Symbol : {a.addSymbol}</h5>
    
    <h5 style={{color:'white'}}>price : {a.addPrices}</h5>

    <h5 style={{color:'white'}}>address: {a.addAddress}</h5>
    

    {/* <button onClick={()=>setprice(a)} style={{width:'80px',height:'43px'}} >SetPrice</button>   */}
  {/* <h4>Added to sale </h4> */}
  {a.addPrices ===''?
  <button onClick={()=>{
    setSelectImage(a)
    setIsOpensetFirst(true)
  }} style={{width:'80px',height:'43px'}} >SetPrice</button>  

  
  :
<>
  <button onClick={()=>{
      setSelectImage(a)
      setIsOpenset(true)
    }}  >UpdatePrice and sell</button>  

  {' '}
  
  {/* <button onClick={()=>send(a)} style={{width:'80px',height:'43px'}}>Send</button> */}

  <button onClick={()=>
    {setSelectImage(a)
    setIsOpensetsend(true)
    }} style={{width:'80px',height:'43px'}}>Send</button>

</>
  }
  </center>

  </div>

  {isOpen && <Popup content={<>
        <b>Notification</b>
        <p>Your token prize has been updated successfully......</p>
        <center>
        <button type="button" onClick={togglePopup}>close</button>
        </center>
      </>}
       handleClose={togglePopup}
    />}
  
  </div>
  )
})}
</div>
}
<br></br>
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

    <div>
    
    {isOpensetFirst && <Popup content={<>
        <b>Notification</b>
        <p>Enter prize </p>
        <center>
      <input
        type="text"
        value={tprice}
        placeholder="Enter Prize"
        onChange={e => {
          setTprice(e.target.value);
        }}
      />
      <br></br>
      <br></br>

        <button type="button" onClick={()=>{setprice()}}>submit</button>
        </center>
      </>}
       handleClose={togglePopupset}
    />}

    {isOpenset && <Popup content={<>
        <b>Notification</b>
        <p>Enter prize </p>
        <center>
      <input
        type="text"
        value={tprice}
        placeholder="Enter Prize"
        onChange={e => {
          setTprice(e.target.value);
        }}
      />
      <br></br>
      <br></br>

        <button type="button" onClick={()=>{setprices()}}>submit</button>
        </center>
      </>}
       handleClose={togglePopupset}
    />}
</div>



<div>

{isOpensetsend && <Popup content={<>
    <b>Notification</b>
    <p>Send Address </p>
    <center>
    <input
        type="text"
        value={tsAddress}
        placeholder="Enter Address"
        onChange={e => {
          settsAddress(e.target.value);
        }}
      />
      <br></br>
      <br></br>

        <button type="button" onClick={()=>{send()}}>submit</button>
    </center>
  </>}
   handleClose={togglePopupsetsend}
/>}
</div>

{isOpen2 && <Popup content={<>
        <b>Notification</b>
        <p>Your token has been sent successfully......</p>
        <center>
        <button type="button" onClick={togglePopup2}>close</button>
        </center>
      </>}
       handleClose={togglePopup2}
    />}




</div>

<div style={{backgroundColor:'white',height:'150px',width:'1500px',marginBlock:'5px',display:'flex',marginLeft:'2px'}} >

  <Footer/>
  
  </div>

</>

);
}

export default Salepagecopy;