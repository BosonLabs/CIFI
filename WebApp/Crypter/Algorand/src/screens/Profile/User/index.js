import React, { useState,useEffect } from "react";
import cn from "classnames";
import styles from "./User.module.sass";
import Icon from "../../../components/Icon";
import Report from "../../../components/Report";
import Modal from "../../../components/Modal";
import { FacebookShareButton, TwitterShareButton } from "react-share";
// import { isStepDivisible } from "react-range/lib/utils";
import fireDb from "../../screens/../UploadDetails/firebase";

const shareUrlFacebook = "https://ui8.net";
const shareUrlTwitter = "https://ui8.net";

const User = ({ className, item }) => {
  const[getprodata,setgetprodata]=useState([]);
  console.log("getprodata",getprodata)
  // const[getusername,setgetusername]=useState("");
  //const [visible, setVisible] = useState(false);
  const [visibleShare, setVisibleShare] = useState(false);
  const [visibleModalReport, setVisibleModalReport] = useState(false);
  //let getac="";
  let getalgo="";
  //let getname="";
  if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === "")
  {

  getalgo=localStorage.getItem("wallet");
  console.log("getmetamask",getalgo)
  //getalgo=localStorage.getItem("walletalgo");
  //getname=localStorage.getItem("walletname");
  //const[getImgreff,setgetImgreff]=useState([]);
  //console.log("getImHeader",getImgreff)
  //console.log("checking",getprodata[0].profileurl)
  }
  
  const dbcallprodata=()=>{


    console.log("inside setgetdbcall function")
    
    let req = [];
      
    if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === "" ){
      req.push(              
        {              
          Bio: "",
          Twitter: "",
          address: "",
          displayname:"aaa",
          profileurl:"aaa",
          username: "bbb"
        })
        setgetprodata(req);   
  
    }
    else{  
      let getalgo=localStorage.getItem("wallet");
      let kreq =[];
      fireDb.database().ref("profiledata").child(getalgo).on("value", (data) => {
        if (data) {

          console.log("start",data.val())

          let value=data.val();
          //console.log("valuess",value)
          //setgetusername(value)
         //localStorage.getItem("walletname",value.username);
        //console.log("valueuser",value.username);
          // req.push(              
          //   {              
          //     Bio: value.Bio,
          //     Twitter: value.Twitter,
          //     address: value.address,
          //     displayname:value.displayname,
          //     profileurl:value.profileurl,
          //     username: value.username
          //   })
            setgetprodata(value);   
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

            setgetprodata(kreq)

        }


        
      });
      
    }    
    //console.log("accpro",getprodata)    
  }
  useEffect(()=>{dbcallprodata()},[])

  const followcall=(event)=>{

    // console.log("followcall",event.target.innerText)
    // let getalgo=localStorage.getItem("walletalgo");    
    // if(event.target.innerText === 'Follow'){    
    // console.log("addlikedb function follow call");
    // let ref2=fireDb.database().ref(`followdb/${getalgo}`).child(getalgo);
    // //const db = ref2.push().key;                         
    // ref2.set({
    //   username:"",
    //   datesets:new Date().toDateString(),
    //   description:"",whois:'follow',
    //   status:"",      
      

    //   }).then(()=>{
    //     setVisible(!visible)
    //   });    
    // }
    // else if(event.target.innerText === 'Unfollow'){
      
    // console.log("addlikedb function unfollow call");
    // fireDb.database().ref(`followdb/${getalgo}`).child(getalgo).remove().then(()=>{
    //   setVisible(!visible)
    // });    
    
    // }
  }



  const[getaddresslink,setgetaddresslink]=useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === "0x")
      {
        setgetaddresslink("https://testnet.algoexplorer.io/address/"+null)


        
      }
      else{
    
        setgetaddresslink("https://testnet.algoexplorer.io/address/"+localStorage.getItem("wallet"))
        console.log("ls3",getaddresslink)
      }
    };

    fetchPosts();
  }, []);


  return (
    <>

      <div className={cn(styles.user, className)}>

      {(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === "" ) ? 
        (
        <>
        <div className={styles.avatar}>            
<img src="https://cifi-mvp-nest.vercel.app/static/media/cifi.540fecbe.png" alt="Avatar" />
</div>
        </>):(
          <>
                    { getprodata === "" || getprodata === null ? (

<div className={styles.avatar}>            
<img src="https://cifi-mvp-nest.vercel.app/static/media/cifi.540fecbe.png" alt="Avatar" />
</div>
          ):(

            <>
            {getprodata.profileurl === "" || getprodata.profileurl ==="" || getprodata.profileurl ==="aaa" ? (
              <div className={styles.avatar}>            
<img src="https://cifi-mvp-nest.vercel.app/static/media/cifi.540fecbe.png" alt="Avatar" />
</div>

            ) :(

              <div className={styles.avatar}>            
              <img src={getprodata.profileurl} alt="Avatar" />
              </div>

            )}


</>
   
          )}


          </>
        )
}
                            
        {getprodata === null || getprodata === "" ? (
          <div className={styles.name}>{"abcdedd"}</div>

        ):(

          <div className={styles.name}>{getprodata.displayname}</div>
        )}
        
        {(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x") ? (

<div className={styles.code}>
<div className={styles.number}>{"0Xasdhaudhu"}....</div>
{/* <button className={styles.copy}>
  <Icon name="copy" size="16" />
</button> */}
</div>

        ):(

          <div className={styles.code}>
          <div className={styles.number}>{localStorage.getItem("wallet").slice(0,10)}....</div>
          {/* <button className={styles.copy}>
            <Icon name="copy" size="16" />
          </button> */}
        </div>

        )}
        
        <div className={styles.info}>
          A wholesome farm owner in Montana. Upcoming gallery solo show in
          Germany
        </div>
        {localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === " "? (
          <a
          className={styles.site}
          href={getaddresslink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="globe" size="16" />
          <span>https://algoexplorer...</span>
        </a>

        ):(
          <>
          
          <a
          className={styles.site}
          href={getaddresslink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="globe" size="16" />
          <span>https://algoexplorer...</span>
        </a>
</>
        )}
        {/* <a
          className={styles.site}
          href="https://ui8.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="globe" size="16" />
          <span>https://ui8.net</span>
        </a> */}
        <br></br>
        <div className={styles.control}>
          <div className={styles.btns}>
            {/* <button
              className={cn(
                "button button-small",
                { [styles.active]: visible },
                styles.button
              )}
              onClick={followcall} */}

              {/* // () => setVisible(!visible) */}
            {/* > */}
              {/* <span>Follow</span>
              <span>Unfollow</span> */}
            {/* </button> */}
            <button
              className={cn(
                "button-circle-stroke button-small",
                { [styles.active]: visibleShare },
                styles.button
              )}
              onClick={() => setVisibleShare(!visibleShare)}
            >
              <Icon name="share" size="20" />
            </button>
            <button
              className={cn("button-circle-stroke button-small", styles.button)}
              onClick={() => setVisibleModalReport(true)}
            >
              <Icon name="report" size="20" />
            </button>
          </div>
          <div className={cn(styles.box, { [styles.active]: visibleShare })}>
            <div className={styles.stage}>Share link to this page</div>
            <div className={styles.share}>
              <TwitterShareButton
                className={styles.direction}
                url={shareUrlTwitter}
              >
                <span>
                  <Icon name="twitter" size="20" />
                </span>
              </TwitterShareButton>
              <FacebookShareButton
                className={styles.direction}
                url={shareUrlFacebook}
              >
                <span>
                  <Icon name="facebook" size="20" />
                </span>
              </FacebookShareButton>
            </div>
          </div>
        </div>
        <div className={styles.socials}>
          {item.map((x, index) => (
            <a
              className={styles.social}
              href={x.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <Icon name={x.title} size="20" />
            </a>
          ))}
        </div>
        <div className={styles.note}>Member since Mar 15, 2021</div>
      </div>
      <Modal
        visible={visibleModalReport}
        onClose={() => setVisibleModalReport(false)}
      >
        <Report />
      </Modal>
    </>
  );
};

export default User;
