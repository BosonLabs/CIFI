///* global AlgoSigner */
import React, { useState,useEffect } from "react";
import { Link,useHistory } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import Theme from "../../Theme";
//import fireDB from "./firebase";
//import fireDB from "./firebases"
//import web3 from './web3';
import fire from '../../../screens/UploadDetails/firebase'
//import Report from "../../../components/Report";
//import web3 from './web3';
import axios from 'axios';
//import DarkModeToggle from "react-dark-mode-toggle";

const items = [
  {
    title: "My profile",
    icon: "user",
    url: "/profile",
  },
  // {
  //   title: "My items",
  //   icon: "image",
  //   url: "/item",
  // },
  {
    title: "Light theme",
    icon: "bulb",
  },
  {
    title: "Disconnect",
    icon: "exit",
    url: "hello",
    //https://ui8.net/ui8/products/crypter-nft-marketplace-ui-kit
    onclick:()=>{
      console.log("localhost calling")
    }
    
  },
];

const User = ({ className,onProfile}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  //localStorage.setItem("wallet","");

  const[getprodata,setgetprodata]=useState([]);
  console.log("getprodata",getprodata)
  //const[getusername,setgetusername]=useState("");

  let history=useHistory();
  const [visible, setVisible] = useState(false);
  const [algobalance, setalgobalance] = useState("");
  let getac="";
  let getalgo="";
  //let getname="undefined";
  if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === ''){

  }
  else{

  getac=localStorage.getItem("wallet");
  console.log("getmetamask",getac)
  getalgo=localStorage.getItem("wallet");
  //getname=localStorage.getItem("walletname");
  //const[getImgHeader,setgetImgHeader]=useState([]);
  //console.log("getImHeader",getImgHeader)
  }
  

  const dbcallprodata=()=>{

    console.log("inside setgetdbcall function")
    //let getalgo=;
    let req = [];
      
    if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === ''){
      //console.log("notalgoget",getalgo)
      req.push(              
        {              
          Bio: "",
          Twitter: "",
          address: "",
          displayname:"...",
          profileurl:"aaa",
          username: "..."
        })
        setgetprodata(req);   
    }
    else{  
      let getalgo=localStorage.getItem("wallet");
      let kreq =[];
      fire.database().ref("profiledata").child(getalgo).on("value", (data) => {
        if (data) {
          console.log("startcon",data.val())          
          //   console.log("datacover",data)
          //   data.forEach((d) => {
          //     req.push(d.val().profileurl)      
          //     //console.log("list",d.val().bgurl)
          //   });        
          // }      
          let value=data.val();
          setgetprodata(data.val());       
          //console.log("valuess",value)
          // kreq.push(              
          //   {              
          //     Bio: value.Bio,
          //     Twitter: value.Twitter,
          //     address: value.address,
          //     displayname:value.displayname,
          //     profileurl:value.profileurl,
          //     username: value.username
          //   })                  
        }     
        else{

          kreq.push(              
            {              
              Bio: "",
              Twitter: "",
              address: "",
              displayname:"...",
              profileurl:"aaa",
              username: "..."
            })            

            setgetprodata(kreq);   
        }
        
        
        
     });
      
    }    
    console.log("accpro",getprodata)    
  }
  useEffect(()=>{dbcallprodata()},[])



  const disconn=()=>{
    console.log("disconnect function call")    
    if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === ''){
    }
    else{
  

    let getal=localStorage.getItem("wallet");
    //let getalname=localStorage.getItem("walletname");
    console.log("get",getal)
    //console.log("getname",getalname)
    localStorage.setItem("wallet","0x")
    //localStorage.setItem("`walletname`","demo")
    let getalafter=localStorage.getItem("wallet");
    //let getalnameafter=localStorage.getItem("walletname");
    console.log("getafter",getalafter)
    //console.log("getnameafter",getalnameafter)

    window.location.reload();
    history.push("/")
    //window.location.reload();
    }

  }

  useEffect(() => {
    async function listenMMAccount() {

      if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === ''){

        console.log("algobalance",getalgo)
      
      }
      else{
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
    getalgo=localStorage.getItem("wallet");
    console.log("inside balance function")
    const algosdk = require('algosdk');
    if(localStorage.getItem("net") === "mainnet"){

      const baseServer = "https://mainnet-algorand.api.purestake.io/ps2";
      const port = "";
      //B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab
      const token = {
      
          'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
      }
      let client = new algosdk.Algodv2(token, baseServer, port);  

      console.log("log1",client);

( async() => {
let account1_info = (await client.accountInformation(getalgo).do());
console.log("accinfo",account1_info)
console.log("accinfoamount",account1_info.amount)
let calc=JSON.stringify(account1_info.amount)/1000000;
console.log("calc",calc)
setalgobalance(JSON.stringify(account1_info.amount)/1000000);
console.log("Balance of account 1: " + JSON.stringify(account1_info.amount));
localStorage.setItem("balget",account1_info);
// let account2_info = (await client.accountInformation().do());
// console.log("Balance of account 2: " + JSON.stringify(account2_info.amount));
})().catch(e => {
console.log(e);
})


    }
    else{

      const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
          const port = "";
          //B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab
          const token = {
          
              'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
          }
          let client = new algosdk.Algodv2(token, baseServer, port);  

          console.log("log1",client);

  ( async() => {
    let account1_info = (await client.accountInformation(getalgo).do());
    console.log("accinfo",account1_info)
    console.log("accinfoamount",account1_info.amount)
    let calc=JSON.stringify(account1_info.amount)/1000000;
    console.log("calc",calc)
    setalgobalance(JSON.stringify(account1_info.amount)/1000000);
    console.log("Balance of account 1: " + JSON.stringify(account1_info.amount));
    localStorage.setItem("balget",account1_info);
    // let account2_info = (await client.accountInformation().do());
    // console.log("Balance of account 2: " + JSON.stringify(account2_info.amount));
})().catch(e => {
	console.log(e);
})

    }
    
      
              }
      

    }
    listenMMAccount();
  }, []);


  const balancecall=async()=>{
    console.log("inside balance function")
//     const algosdk = require('algosdk');
//     const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
//           const port = "";
//           //B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab
//           const token = {
          
//               'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
//           }
//           let client = new algosdk.Algodv2(token, baseServer, port);  

//           console.log("log1",client);

//   ( async() => {
//     let account1_info = (await client.accountInformation(getalgo).do());
//     console.log("accinfo",account1_info)
//     console.log("accinfoamount",account1_info.amount)
//     let calc=JSON.stringify(account1_info.amount)/1000000;
//     console.log("calc",calc)
//     setalgobalance(JSON.stringify(account1_info.amount)/1000000);
//     console.log("Balance of account 1: " + JSON.stringify(account1_info.amount));
//     localStorage.setItem("balget",account1_info);
//     // let account2_info = (await client.accountInformation().do());
//     // console.log("Balance of account 2: " + JSON.stringify(account2_info.amount));
// })().catch(e => {
// 	console.log(e);
// })

// var accounts = await web3.eth.getAccounts();
// web3.eth.getBalance(getalgo)
// .then(console.log);


// if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x"){

//   console.log("MATICMUMalgo",getalgo)

// }
// else{

//   getalgo=localStorage.getItem("wallet");
// //let url="https://api-testnet.bscscan.com/api?module=account&action=balance&address="+getalgo+"&tag=latest&apikey=YourApiKeyToken";

// let url="https://api-testnet.polygonscan.com/api?module=account&action=balance&address="+getalgo+"&tag=latest&apikey=YourApiKeyToken";


// //+"&tag=latest&apikey=26NPBCN1ZIZ33YJKKJ24MSY9GB6I6I4NVQ";

// axios.get(`${url}`)
//          .then((url)=>{
//            const allnote=url.data.result/1000000000000000000;
           
//            setalgobalance(allnote);
//            console.log("matbal",allnote)
//          }).catch(error => console.error(`Error: ${error}`));       
//         }

  }

  useEffect(()=>{balancecall()},[])

  // const dbcall=async()=>{
    
  //   console.log("inside dbcall function")
  //   //db call start

  //   //const accounts = await web3.eth.getAccounts();
  //   let req = [];
    
  //   //let kreq =[];
  //   if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x"){

      
  //     req.push(              
  //       {              
  //         Bio: "",
  //         Twitter: "",
  //         address: "",
  //         displayname:"...",
  //         profileurl:"aaa",
  //         username: "..."
  //       })

  //     setgetusername(req)
  //     console.log("dbcallalgo",getalgo)
  //   }else{

  //     let getalgo=localStorage.getItem("wallet");

      
      
  //    fire.database().ref("profiledata").child(getalgo).on("value", (data) => {
  //     if (data) {
  //        let value=data.val();
  //        //setgetusername(value.username)
  //        //localStorage.getItem("walletname",value.username);
  //         //console.log("valueuser",value.username);          
  //     }
  //     else{

  //       setgetusername("....")
  //     }
  //   });
  // }
  //  console.log("acc",getalgo)  
  
  // }
  // useEffect(()=>{dbcall()},[])



  return (
    
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className)}>

        <div className={styles.head} onClick={() => setVisible(!visible)}>

        {(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === '') ? 
        (
        <>

<div className={styles.avatar}>
            
            {/* <img src="/images/content/avatar-user.jpg" alt="Avatar" />  */}
            {/* <img src={"/images/logocifis.png"} alt="hello" />           */}
<img src={"https://cifi-mvp-nest.vercel.app/static/media/cifi.540fecbe.png"} alt="hello" />          
            
            {/* srcDark="https://cifi-mvp-nest.vercel.app/static/media/cifi.540fecbe.png" */}
     </div>
        
        </>
        )
        
        :(

          <>
          
        <>
        {getprodata === null ? (

<div className={styles.avatar}>            
          
{/* <img src="/images/content/avatar-user.jpg" alt="Avatar" />  */}
<img src={"https://cifi-mvp-nest.vercel.app/static/media/cifi.540fecbe.png"} alt="helloworld" />                       

</div>

        ):(

<>
          {getprodata.profileurl === null || getprodata.profileurl === "" || getprodata.profileurl === "aaa" ? (
          
            <div className={styles.avatar}>            
            
            {/* <img src="/images/content/avatar-user.jpg" alt="Avatar" />  */}
            {/* <img src={"/images/logocifis.png"} alt="helloworld" />                        */}
            <img src={"https://cifi-mvp-nest.vercel.app/static/media/cifi.540fecbe.png"} alt="helloworld" />                       
            
     </div>
          ):(
            <div className={styles.avatar}>            
                   {/* <img src="/images/content/avatar-user.jpg" alt="Avatar" />  */}
                   <img src={getprodata.profileurl} alt="world" />                       
                   {/* <h1>{getprodata.profileurl}</h1> */}
            </div>
          )}

</>
        )}
        </>
        
        
        </>
        )
        }
          
            {algobalance === "" ? (
              <div className={styles.wallet}>
{""}<span className={styles.currency}>ALGO</span>
</div>
            ):(
              <div className={styles.wallet}>
{algobalance.toFixed(4)}<span className={styles.currency}>ALGO</span>
              </div>

            )}
            
          
        </div>
        {visible && (
          <div className={styles.body}>          
          {getprodata === "" || getprodata === null? (

<div className={styles.name}>              

{"..."}
  </div>

          ):(

            
            <div className={styles.name}>              

              {getprodata.displayname}
              </div>

          )}
          
            
              {(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") ===  '' || localStorage.getItem("wallet") === undefined ) ?(

<div className={styles.code}>
<div className={styles.number} >{"0Xsdjsjipps"}....</div>
{/* <button className={styles.copy}>
  <Icon name="copy" size="16" />
</button> */}
</div>

              ):(

                <div className={styles.code}>
              <div className={styles.number} >{getalgo.slice(0,10)}....</div>
              {/* <button className={styles.copy}>
                <Icon name="copy" size="16" />
              </button> */}
            </div>

              )}
            
            <div className={styles.wrap}>
              <div className={styles.line}>
                <div className={styles.preview}>
                  <img
                    src="/images/Algo.png"
                    alt="ALGO"
                  />
                </div>
                {algobalance === "" ? (

<div className={styles.details}>
<div className={styles.info}>Balance</div>

<div className={styles.price}>{"demo"} ALGO</div>
</div>
              
            ):(

              <div className={styles.details}>
              <div className={styles.info}>Balance</div>
              
              <div className={styles.price}>{algobalance.toFixed(4)} ALGO</div>
            </div>
              
            )}
              
              </div>
              {/* <button
                className={cn("button-stroke button-small", styles.button)}
              >
                Manage fun on Coinbase
              </button> */}
            </div>
            <div className={styles.menu}>              
              {items.map((x, index) =>                        
                x.url ? (                                
                  x.url.startsWith("hello") ? 
                  (                                      
                    // <a
                    //   className={styles.item}
                    //   href={x.url}
                    //   rel="noopener noreferrer"
                    //   key={index}
                    //   onClick={console.log("inside angle tag")}
                    // >
                    <Link className={styles.item}
                    onClick={()=>disconn()}>
                      <div className={styles.icon}>                                              
                        <Icon name={x.icon} size="20" />                                            
                      </div>
                      <div className={styles.text}>{x.title}</div>
                                      
                      </Link>
                    // </a>
                  ) : (
                    <Link
                      className={styles.item}
                      to={x.url}
                      onClick={() => setVisible(!visible)}
                      key={index}
                    >
                      <div className={styles.icon}>                        
                        <Icon name={x.icon} size="20" />
                      </div>
                      {/* {console.log("con")} */}                      
                      <div className={styles.text}>{x.title}</div>
                      
                    </Link>
                  )
                  
                ) : (
                  <div className={styles.item} key={index} >
                    <div className={styles.icon} >                    
                      <Icon name={x.icon} size="20"/>    
                    </div>                    
                    <div className={styles.text} >{x.title}</  div>
                    <Theme className={styles.theme} boo="true"/>
                    
      {/* checked={isDarkMode} */}
      
                    
                  </div>
                )
                
              )
              }
            </div>
          </div>
        )}
        {/* {isDarkMode ? <><Theme className={styles.theme} /></>:<><Theme className={styles.theme} /></>} */}
      </div>      
    </OutsideClickHandler>    
  );
};
export default User;
