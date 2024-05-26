import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
//, NavLink
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Image from "../Image";
import Notification from "./Notification";
import User from "./User";
import Imagecopy from "../Imagecopy";


const nav = [
  {
    url: "/search01",
    title: "Discover",
    onclick:()=>{
      console.log("profile")
    }
  },
  {
    url: "/faq",
    title: "How it work",
  },
  {
    url: "/item",
    title: "Create item",
  },
  {
    url: "/profile",
    title: "Profile",
    onclick:()=>{
      console.log("profile")
    }
  },
];

const Headers = () => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [search, setSearch] = useState("");
  const [connected, setConnected] = useState(false);

  const handleSearch = (e) => {
    console.log("inside search bar function")
  };

  useEffect(() => {
    async function isconnected() {

      if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === ''){
      //  console.log("MATICMUMalgo",getalgo)    
      setConnected(false)
      }
      else{
    
        let get=localStorage.getItem("wallet");
        //let getalgo=localStorage.getItem("walletalgo");
        console.log("walletcheck",get)
        //console.log("walletcheckalgo",getalgo)
        setConnected(true)        
      }
    }
    isconnected();
  }, []);


  // const isconnected=()=>{

  //   //check    
  //   if(localStorage.getItem("wallet") === null )
  //   {
  //     setConnected(false)

  //   }
  //   else if(localStorage.getItem("wallet") === "0x")
  //   {
  //     setConnected(false)

  //   }
  //   if(localStorage.getItem("wallet") === undefined )
  //   {
  //     setConnected(false)

  //   }
  //   else{

  //   let get=localStorage.getItem("wallet");
  //   //let getalgo=localStorage.getItem("walletalgo");
  //   console.log("walletcheck",get)
  //   //console.log("walletcheckalgo",getalgo)
  //   setConnected(true)

  //   }
  //   // else if(getalgo)
  //   // setConnected(true)
    
  //   //setConnected(false)
    
  
  // }

  // useEffect(() => {isconnected()}, [])

  const onProfile=()=>{
    console.log("hello profile")
    //setIsOpen(false);
    //history.push("/")
  }

  return (
    
    <header className={styles.header}>      
      <div className={cn("container", styles.container)}>      
        {/* <button type="submit" onClick={()=>{setConnected(!connected)}}>Toggle</button> */}
        <Link className={styles.logo} to="/">
          <Imagecopy
            className={styles.pic}
            //src="/images/logocifisnew.png"
            //srcDark="/images/logocifis.png"
            src="https://cifi-mvp-nest.vercel.app/static/media/cifi.540fecbe.png"
            srcDark="https://cifi-mvp-nest.vercel.app/static/media/cifi.540fecbe.png"
            alt="Fitness Pro"
          />
        </Link>
        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
          
          <nav className={styles.nav}>
            {nav.map((x, index) => (
              <Link
                className={styles.link}
                // activeClassName={styles.active}
                to={x.url}
                key={index}
              >
                {x.title}
              </Link>
            ))}
          </nav>

          {/* searchbar here */}
          <form
            className={styles.search}
            action=""            
            // onSubmit={() => handleSubmit()}
          >
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search"
              required
            />
            
            <button className={styles.result} onClick={() => handleSearch}>
              <Icon name="search" size="20" />
            </button>
          </form>
          {/* <Link
            className={cn("button-small", styles.button)}
            to="/upload-variants"
          >
            Upload
          </Link> */}
        </div>

        {/* Notification button below */}          
        <Notification className={styles.notification} />
        <Link
          className={cn("button-small", styles.button)}
          to="/upload-variants"
        >
          Upload
        </Link>      
{
  connected ? 
  <Link
  className={cn("button-small", styles.button)}
  to="/connect-wallet"
>
Connected
</Link>
:
       <Link
          className={cn("button-stroke button-small", styles.button)}
          to="/connect-wallet"
        >
          Connect Wallet          
        </Link>

}        

        <User className={styles.user} onProfile={()=>onProfile}/>
        
        <button
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}
        ></button>
      </div>
    </header>
  );
};

export default Headers;
