//import React from 'react';
import React, { Component } from 'react';
//import secondpage from './secondpage';
import './App.css';
import fireDB from './firebase.js';
import card from './card1';
import web3 from './web3';
import tokencontract from './tokencontract';
import TESTToken from './TESTToken';
import { Card } from 'react-bootstrap';
import Background from '../src/images/aa.gif'
//import TEST from './TEST';
//import {BrowserRouter as Router , Route , Link , Switch , NavLink} from "react-router-dom";
import Background2 from '../src/images/logo1.png'
import { data } from 'jquery';

function fb(n1){
  var v=String(n1);
  var v2=v+"name";
  var v3=v+"ts";
  var v4=v+"symbol"
  var v5=v+"balance"

  
  var firebase= fireDB.database().ref(v);
  firebase.child("At").once("value",function(snapshot){
    if(n){n=Object.values(n);

    var n=snapshot.val();
   } });
  firebase.child("Name").once("value",function(snapshot){
    var n=snapshot.val();
    if(n){n=Object.values(n);
  
    document.getElementById(v2).innerHTML=n;
    }
  });
  firebase.child("ggg").once("value",function(snapshot){
    var n=snapshot.val();
    if(n){n=Object.values(n);   
    document.getElementById(v3).innerHTML=n;}
  });
  firebase.child("Symbol").once("value",function(snapshot){
    var n=snapshot.val();
    if(n){n=Object.values(n);
  //  document.getElementById(v4).innerHTML=n;
}
  });
  firebase.child("Balance").once("value",  function(snapshot){
    snapshot.forEach(function(element){
    var  balance1=element.val();
    balance1=Object.values(balance1);
  //  document.getElementById(v5).innerHTML=balance1;
      //alert(balance1);
  
  })
  });
} 
function fb1(n1){
  var v=String(n1);
  var v2=v+"name";
  var v3=v+"ts";
  var v4=v+"symbol"
  var v5=v+"at"

  
  var firebase= fireDB.database().ref(v);
  firebase.child("At").once("value",function(snapshot){
    var n=snapshot.val();
    if(n){n=Object.values(n);

   
    document.getElementById(v5).innerHTML=n;
   } });
  firebase.child("Name").once("value",function(snapshot){
    var n=snapshot.val();
    if(n){n=Object.values(n);
  
    document.getElementById(v2).innerHTML=n;
    }
  });
  firebase.child("ggg").once("value",function(snapshot){
    var n=snapshot.val();
    if(n){n=Object.values(n);   
    document.getElementById(v3).innerHTML=n;}
  });
  firebase.child("Symbol").once("value",function(snapshot){
    var n=snapshot.val();
    if(n){n=Object.values(n);
  //  document.getElementById(v4).innerHTML=n;
}
  });
  firebase.child("Balance").once("value",  function(snapshot){
    snapshot.forEach(function(element){
    var  balance1=element.val();
    balance1=Object.values(balance1);
  //  document.getElementById(v5).innerHTML=balance1;
      //alert(balance1);
  
  })
  });
  
} 



class home extends Component {
  state = {
    balance: '',
    totalSupply:'',
    circulatingsupply:'',
    name:'',
    symbol:'',
    decimal:'' ,
    name1:''


  };
  
   


  async componentDidMount() {
 
    const balance = await web3.eth.getBalance(tokencontract.options.address);
    const totalsupply = await tokencontract.methods.totalSupply().call();
    const decimal = await TESTToken.methods.decimals().call();
    var accounts = await  web3.eth.getAccounts();
    const At = await TESTToken.methods.balanceOf("0x664F6Bf102eF9510F4114dd5321117599eFb2336").call();

  var name1;
    const name = await TESTToken.methods.name().call();
    const symbol = await TESTToken.methods.symbol().call();
    var ss="3"
   fireDB.database().ref(ss).child("Balance").set({"Balance":balance});
fireDB.database().ref(ss).child("Name").set({"Name":name});
fireDB.database().ref(ss).child("ggg").set({"Total Supply":totalsupply});
fireDB.database().ref(ss).child("Decimal").set({"Decimal":decimal});
fireDB.database().ref(ss).child("Symbol").set({"Symbol":symbol});
fireDB.database().ref(ss).child("Symbol").set({"Symbol":symbol});
fireDB.database().ref(ss).child("At").set({"At":0});
fireDB.database().ref(ss).child("No").set({"No":3});


if(At==0){
  var availtk=At/1000000000;
     

  var a=5-availtk;
  
  var a1=a/1000000000;
  var p=a/5;
  
}



//var i;
for(var i=1;i<5;i++){
  var count=0
  var v=String(i);
  var firebase= fireDB.database().ref(v);
  firebase.child("No").once("value",function(snapshot) { 
    var n=snapshot.val(); 
    if(n){
      
      n=Object.values(n);
  
count=count+1
      var n1=String(n);
switch(n1) {
        case "1":
         
fb(n1);
         
          break;
        case "2":
fb1(n1);

          break;
          case "3":
          fb1(n1);
          break;
        default:
          // code block
      }
    }
  
 } );




    //const price=await testtoken.methods.getDollarPrice().call();

    this.setState({totalsupply,balance,name,symbol,decimal,accounts,name1, });

    var database = fireDB.database();
var a= 1;
  
//fireDB.database().ref().child(accounts).push(name);

  }
}
    
  
  
  
  render()
   {
    console.log(web3.version);
    web3.givenProvider.enable().then(console.log);
   
    return (
     <div class="" style={{backgroundColor:"white"}}>
       <div class="container"><br/>
       <h3 style={{color:"black"}}>Upcoming Pools</h3>
<br></br>
     <div class="row">
         <div class="col-4" id="1">
         <Card class="mt-2  shadow" style={{ width: '25rem' , padding: "30px",backgroundColor:" #f2f2f2",color:"black"}}  >
         <p id="demo1" style={{textAlign:"right" ,color:"orange"}}>Starts in</p>
      <p id="demo" style={{textAlign:"right" ,color:"orange"}}></p>
  <h4 id ="1name">

  </h4>
  <p>
    Total Supply:
  </p>
  <h4 id ="1ts"></h4>
  <div class="row">
    <div class="col">
      <h6>Min.Allocation<br/>1</h6>
    </div>
    <div class="col">
      <h6>Max.Allocation<br/>5</h6>
    </div>
    <div class="col">
      <h6>Access<br/><h4>Slate</h4></h6>
    </div>
  </div>

</Card>
   </div>
  
   <div class="col" id="2">
         
   </div>
  </div><br/><br/>
  <h3 style={{color:"black"}}>Featured Pools</h3>
<br/>
  <div class="row">
   <div class="col-4" id="3">
         <Card class="mt-2  shadow" style={{ width: '22rem' , padding: "30px",backgroundColor:"#f2f2f2",color:"black"}}  >
<p  style={{textAlign:"right", color:"red"}}>Filled</p>

  <h4>
    Name:
  </h4>
  <p id ="3name">

  </p>
  

  <h4>
    Total Supply:
  </h4>
  <p id ="3ts">

  </p>
  <h4>
    Available Tokens
  </h4>
  <p id ="3at">

  </p>
  <progress id="main7" value="5" max="5" class="progress11"></progress>
  <div class="row">
  <div class="col-4">
    100%
  </div>
  <div class="col-8">
    No.of Participants:<br/>5
  </div>
</div>

</Card>
   </div>
   <div class="col-4" id="3">
         <Card class="mt-2  shadow" style={{ width: '22rem' , padding: "30px",backgroundColor:"#f2f2f2",color:"black"}}  >

<p  style={{textAlign:"right", color:"red"}}>Filled</p>

  <h4>
    Name:
  </h4>
  <p id ="2name">

  </p>
  
  <h4>
    Total Supply:
  </h4>
  <p id ="2ts">

  </p>
  <h4>
    Available Tokens
  </h4>
  <p id ="2at">

  </p>

  <progress id="main7" value="5" max="5" class="progress11"></progress>
<div class="row">
  <div class="col-4">
    100%
  </div>
  <div class="col-8">
    No.of Participants:<br/>5
  </div>
</div>
</Card>
   </div>
   <div class="col-2" id="3">
         
   </div>
  
         
  

   </div>

</div>

<p id="dem" class="tiny">

</p>
<p class="tiny"id="ap"></p>
<p class="tiny"id="ap1"></p>

</div>
    );
  }
}




export default home;