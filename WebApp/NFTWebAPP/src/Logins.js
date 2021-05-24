import React from 'react';
import {GoogleLogin} from 'react-google-login';

const Logins=(props)=>{

    const {email,setEmail,password,setPassword,handleLogin,handleSignup,
        hasAccount,setHasAccount,emailError,passwordError}=props;


        const responseGoogle=(response)=>{
            
            console.log("getlogin",response);
        }

    return(


        <center>


        <section className="login">
<div className="loginContainer" style={{backgroundColor:'white',height:'600px',width:'500px'}}>



    <br></br>
    <br></br>
    <br></br><br></br><br></br>
    <br></br><br></br><br></br>

    <h4 style={{color:'black'}}>User Login/Signup</h4>
    

<label>Email-Id        </label>
<input type="text" placeholder="enter email-id" autoFocus required value={email} onChange={(e)=>
setEmail(e.target.value)}/>
<p className="errorMsg">{emailError}</p>
<label>Password  </label>
<input type="password" placeholder="enter password" autoFocus required value={password} onChange={(e)=>
setPassword(e.target.value)}/>
<p className="errorMsg">{passwordError}</p>

<div className="btnContainer">

    {
        hasAccount ? (

            <>
            <button onClick={handleLogin}>Sign in</button>
            <p>Don't have an account ? <span onClick={()=> setHasAccount(!hasAccount)}> Sign Up</span></p>
            </>


        ) : (

            <>
            <button onClick={handleSignup}>Sign Up</button>
            <p>Have an account ? <span onClick={()=> setHasAccount(!hasAccount)}> Sign in</span></p>
            </>

        )

    }

</div>
<GoogleLogin 
clientId="842516165307-tgselej93rqplidfcdu6rttl1drdt8eu.apps.googleusercontent.com"
onSuccess={responseGoogle}
onFailure={responseGoogle}

 ></GoogleLogin>
    </div>
            </section>
            </center>

    );

}

export default Logins;