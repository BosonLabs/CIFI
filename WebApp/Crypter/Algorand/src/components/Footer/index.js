import React, { useState } from "react";
import { Link,useHistory } from "react-router-dom";
import cn from "classnames";
import styles from "./Footer.module.sass";
import Group from "./Group";
import Image from "../Image";
import Imagecopy from "../Imagecopy";

import Form from "../Form";
import Theme from "../Theme";
import fireDb from "../../screens/UploadDetails/firebase";
import FolowSteps from "./FolowStepsFooter";
import Modald from "../../components/ModalD";


const items = [
  {
    title: "Cifi",
    menu: [
      {
        title: "Discover",
        url: "/search01",
      },
      {
        title: "Connect wallet",
        url: "/connect-wallet",
      },
    ],
  },
  {
    title: "Info",
    menu: [
      {
        title: "FAQ",
        url: "/faq",
      },
      {
        title: "Create item",
        url: "/upload-variants",
      },
    ],
  },
];

const Footers = () => {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  let history=useHistory();

  const handleSubmit = (e) => {
    console.log("inside email function");
  //let getac="undefined";
  let getalgo="";
  let getname="";
  //getac=localStorage.getItem("wallet");
  //console.log("getmetamask",getac)
  
  if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === "0x" || localStorage.getItem("wallet") === 'undefined' || localStorage.getItem("wallet") === ''){

  }
  else{

  getalgo=localStorage.getItem("wallet");
  console.log("getalgo",getalgo)
  //getname=localStorage.getItem("walletname");
  //console.log("namewallet",getname)
          let ref2=fireDb.database().ref(`emailregister/${getalgo}`);
          let dateset=new Date().toDateString();
          console.log("dateget",dateset)
          const db = ref2.push().key;                         
          console.log("dbcheck",db)  
          ref2.set({dbkey:db,ownerAddress:getalgo,username:getname,datedb:dateset,mailid:email}).then(()=>{
            setIsOpen(true)        
          })


  }
  
  
  };

  

  const onClo=()=>{

    setIsOpen(true)

    window.setTimeout(50000000000)    
 
    console.log("hello onClose")
    
    history.push("/")      

  }


  return (
    <footer className={styles.footer}>
      <div className={cn("container", styles.container)}>
        
        <div className={styles.row}>
          <div className={styles.col}>
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
            <div className={styles.info}>The New Creative Economy.</div>
            <div className={styles.version}>
              <div className={styles.details}>Light theme</div>
              <Theme className="theme-big"  boo="true"/>
            </div>
          </div>
          <div className={styles.col}>
            {items.map((x, index) => (
              <Group className={styles.group} item={x} key={index} />
            ))}
          </div>
          <div className={styles.col}>
            <div className={styles.category}>Join Newsletter</div>
            <div className={styles.text}>
              Subscribe our newsletter to get more free design course and
              resource
            </div>
            <Form
              className={styles.form}
              value={email}
              setValue={setEmail}
              onSubmit={() => handleSubmit()}
              placeholder="Enter your email"
              type="email"
              name="email"
              onClo={()=>onClo}
            />
            <Modald visible={isOpen} onClose={() => setIsOpen(false)}>
        <FolowSteps className={styles.steps} />
      </Modald>
          </div>
        </div>
        <div className={styles.foot}>
          <div className={styles.copyright}>
            Copyright © 2021 BOSON LABS. All rights reserved
          </div>
          <div className={styles.note}>
            We use cookies for better service. <a href="/#">Accept</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
