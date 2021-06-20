import React from 'react';
import './App.css';
//Calling Bootstrap 4.5 css
import 'bootstrap/dist/css/bootstrap.min.css';
import fireDB from'./firebase';
class fourthpage extends React.Component {
  constructor(props) {
      
      super(props);
     
      this.state = {Con : []}
      }
      componentDidMount() {
   
   
     
        fireDB.database().ref("Con").on("value", snapshot => {
          let Con = [];
          snapshot.forEach(snap => {
              // snap.val() is the dictionary with all your keys/values from the 'students-list' path
              Con.push(snap.val());
          });
          this.setState({ Con: Con });
        });
      
      
   }
    
    render(){
    return (
      <div className="MainDiv"> 
       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
      integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous"/>
   
        <div class="jumbotron text-center ">
            <h3>Printing data from Firebase</h3>
        </div>
        <div className="container">   
        
        <div className='row'> 
        <div className='col-xl-12'>
        { this.state.Con.map(data => 
            <div className="card float-left bg-sky text-dark" style={{width: '18rem', marginRight: '1rem', marginBlockStart: '1rem' }}>
              <div className="card-body">
                <h5 className="card-title">At : { data.At }</h5>
                <h5 className="card-text">Balance : { data.Balance }</h5>
                <h5 className="card-text">Decimal : { data.Decimal }</h5>
                <h5 className="card-text">Name : { data.Name }</h5>
                <h5 className="card-text">No : { data.No }</h5>
                <h5 className="card-text">Symbol : { data.Symbol }</h5>
                <h5 className="card-text">Total Supply : { data.ggg }</h5>
                </div> 
            </div> 
            )
        } 
        </div>
      </div> 
       </div>
      </div>
    );
  }
  }
  export default fourthpage;


