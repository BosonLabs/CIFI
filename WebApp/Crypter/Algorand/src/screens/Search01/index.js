import React, { useState,useEffect } from "react";
import cn from "classnames";
import styles from "./Search01.module.sass";
import { Range, getTrackBackground } from "react-range";
import Icon from "../../components/Icon";
//import Card from "../../components/CardBuy";
import Dropdown from "../../components/Dropdown";
import firebase from "../UploadDetails/firebase";
//UploadDetails/firebase
// data
//import { bids } from "../../mocks/bids";
import CardBuy from "../../components/CardBuy";
import algosdk from 'algosdk';

const navLinks = [
  "All items", "Art", "Game", "Photography", "Music", "Video"
];

const dateOptions = ["Newest", "Oldest"];
const likesOptions = ["Most liked", "Least liked"];
const colorOptions = ["All colors", "Black", "Green", "Pink", "Purple"];
const creatorOptions = ["Verified only", "All", "Most liked"];

const Search = () => {
  const [searchTerm,setSearchTerm]=useState('');
  console.log('returnsearch',searchTerm)

  const [activeIndex, setActiveIndex] = useState(0);
  const [date, setDate] = useState(dateOptions[0]);
  const [likes, setLikes] = useState(likesOptions[0]);
  const [color, setColor] = useState(colorOptions[0]);
  const [creator, setCreator] = useState(creatorOptions[0]);

  //const [search, setSearch] = useState("");
  const [values, setValues] = useState([1]);
  // const[getImgreffalgosale,setgetImgreffalgosale]=useState([]);
  // console.log("getImgalgo",getImgreffalgosale)

  const[getI,setgetI]=useState([]);
  console.log("getImgal",getI)

  const[getIm,setgetIm]=useState([]);
  console.log("getImgalgosss",getIm)


  const token = {
    'X-API-Key': 'U5ivl9nv603lYUBRN3sHH5g0AzCwsetC7OAtYj9D'
   };
  const server = "https://testnet-algorand.api.purestake.io/ps2";
  const port = "";
  let algodclient = new algosdk.Algodv2(token, server, port);

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const dbcallsaleal=async(index)=>{
    console.log("hello ramachandran")
    setActiveIndex(index)
    console.log("inside dbcallsalealgo function")
    if(localStorage.getItem("wallet")  === null || localStorage.getItem("wallet")  === "" || localStorage.getItem("wallet")  === " " || localStorage.getItem("wallet") === 'undefined' || localStorage.getItem("wallet") === '' || localStorage.getItem("wallet") === "0x"){
    }
    else{    
    //let getalgo=localStorage.getItem("wallet");
    //let req = [];  
    // if(getalgo === ""){  
    // }else{
      let req = [];
      console.log("req",req)
   // let req2 = [];//imagerefexplore//
    firebase.database().ref("imagerefexploreoneAlgos").on("value", (data) => {
      if (data) {
        data.forEach((d) => {
          //req2.push(a.val())          
          const a=d.val();
          Object.keys(a).map(async(b)=>{                            
            //console.log(a[b].id);          
            const nftdata = await fetch(`https://demonft-2e778-default-rtdb.firebaseio.com/Algoopt/${localStorage.getItem("wallet")}/${a[b].applicationid}/opt.json`);      
            const resdata1 = await nftdata.json();        
            console.log("restdata1",resdata1)        
              req.push({
                title: a[b].id,
                price: a[b].priceSet,
                highestBid: a[b].keyId,
                counter:a[b].userName ,
                //bid: 'New bid <span role="img" aria-label="fire">🔥</span>',
                bid:a[b].ownerAddress,
                image: a[b].imageUrl,
                image2x: a[b].paramsdb,
                category: a[b].privatekey,
                categoryText: a[b].cAddress,
                //purchasing !
                url: a[b].history,
                date:a[b].datesets,
                description:a[b].description,
                extra:a[b].extra1,
                ipfsurl:a[b].ipfsUrl,
                previousaddress:a[b].previousoaddress,
                soldd:a[b].soldd,
                whois:a[b].whois,
                Mnemonic:a[b].Mnemonic,
                usdcids:a[b].usdcids,
              applicationid:a[b].applicationid,
              escrowaddress:a[b].escrowaddress,
              resdata1:resdata1,
                users: [                
                  {
                    //avatar: "/images/content/avatar-4.jpg",
                    avatar: a[b].imageUrl,
                  },
                ],
              })                                                                                                    
          })                                                                     
        });                        
        setgetI(req)
      }       
    });               
  } 
}
useEffect(()=>{dbcallsaleal()},[])

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

  // const dbcallsalealgo=async()=>{
  //   console.log("inside dbcallsalealgo function")    
  //   let req = [];  
  //   if(localStorage.getItem("walletalgo") === null || localStorage.getItem("walletalgo") === "0x"){  
  //   }else{      
  //     let getalgo=localStorage.getItem("walletalgo");
      
  //     //let kreq =[];
  //     firebase.database().ref("imagerefexploreoneAlgos").child(getalgo).on("value", (data) => {
  //       if (data) {
  //         data.forEach((d) => {
  //           //console.log("keycheck",d.key)
  //           let value=d.val();
  //           req.push(
              
  //             {
  //             title: value.id,
  //             price: value.priceSet,
  //             highestBid: value.keyId,
  //             counter:value.userName ,
  //             //bid: 'New bid <span role="img" aria-label="fire">🔥</span>',
  //             bid:value.ownerAddress,
  //             image: value.imageUrl,
  //             image2x: value.paramsdb,
  //             category: value.privatekey,
  //             categoryText: value.cAddress,
  //             //purchasing !
  //             url: value.history,
  //             date:value.datesets,
  //             description:value.description,
  //             extra:value.extra1,
  //             ipfsurl:value.ipfsUrl,
  //             previousaddress:value.previousoaddress,
  //             soldd:value.soldd,
  //             whois:value.whois,
  //             users: [                
  //               {
  //                 avatar: "/images/content/avatar-4.jpg",
  //               },
  //             ],
  //             },
            
  //           )
  //         });        
  //       }
  //     });
  //     setgetImgreffalgosale(req);
    
  //   }
  //   console.log("acc",getImgreffalgosale)
  
  // }
  
  // useEffect(()=>{dbcallsalealgo()},[])
  

  // const handleSubmit = (e) => {

  //   if(searchTerm === '') return getI
  //   let data= getI.filter((val)=>{
  //     return val.counter.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
      
  //   })
  //   //console.log('returndata',data)
  //   return data;    
  // };

  const STEP = 0.1;
  const MIN = 0.01;
  const MAX = 10;

  return (
    <div className={cn("section-pt80", styles.section)}>
      
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <div className={styles.title}>Type your keywords</div>
          <form
            className={styles.search}
            action=""            
          >

{/* onSubmit={() => handleSubmit()} */}
            
            <input            
              className={styles.input}
              type="text"
              value={searchTerm}
              onChange={event => {setSearchTerm(event.target.value)}}
              // onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search ..."
              required
            />
            {/* <button className={styles.result}>
              <Icon name="search" size="16" />
            </button> */}
          </form>

          {/* {
        searchTerm !== '' &&
      <>
      {handleSubmit().map((val,key)=>{
        
        return (
        <div className='user' key={key}>
          <h5 onClick={()=>setSearchTerm(val.counter)} style={{cursor:'pointer'}}>{val.counter}</h5>
        </div>
        )
      })}
      </>
} */}

          
        </div>
        <div className={styles.sorting}>
          <div className={styles.dropdown}>
            <Dropdown
              className={styles.dropdown}
              value={date}
              setValue={setDate}
              options={dateOptions}
            />
          </div>
          <div className={styles.nav}>
            {navLinks.map((x, index) => (                                       
              <button
                className={cn(styles.link, {
                  [styles.active]: index === activeIndex,
                })}                                
                //onClick={() =>                  
                  //console.log("index",index)
                  //dbcallsaleal(index)
                //}
                key={index}
              >
                {x}
              </button>                          
            ))}
          </div>
          
        </div>
        <div className={styles.row}>
          <div className={styles.filters}>
            <div className={styles.range}>
              <div className={styles.label}>Price range</div>              
              <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => setValues(values)}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: "36px",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "8px",
                        width: "100%",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values,
                          colors: ["#3772FF", "#E6E8EC"],
                          min: MIN,
                          max: MAX,
                        }),
                        alignSelf: "center",
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "24px",
                      width: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#3772FF",
                      border: "4px solid #FCFCFD",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-33px",
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "14px",
                        lineHeight: "18px",
                        fontFamily: "Poppins",
                        padding: "4px 8px",
                        borderRadius: "8px",
                        backgroundColor: "#141416",
                      }}
                    >
                      {values[0].toFixed(1)}                      
                    </div>
                  </div>
                )}
              />
              <div className={styles.scale}>
                <div className={styles.number}>0.01 Algos</div>
                <div className={styles.number}>10 Algos</div>
              </div>
            </div>
            <div className={styles.group}>
              <div className={styles.item}>
                <div className={styles.label}>Price</div>
                <Dropdown
                  className={styles.dropdown}
                  value={likes}
                  setValue={setLikes}
                  options={likesOptions}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Color</div>
                <Dropdown
                  className={styles.dropdown}
                  value={color}
                  setValue={setColor}
                  options={colorOptions}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Creator</div>
                <Dropdown
                  className={styles.dropdown}
                  value={creator}
                  setValue={setCreator}
                  options={creatorOptions}
                />
              </div>
            </div>
            <div className={styles.reset}>
              <Icon name="close-circle-fill" size="24" />
              <span>Reset filter</span>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.list}>              
              {getI.map((x, index) => {
                console.log("logo",x)
                return(                                                                                            
                <CardBuy className={styles.card} item={x} key={index} />                                                
              )})}              
            </div>
            <div className={styles.btns}>
              <button className={cn("button-stroke", styles.button)}>
                <span>Load more</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
