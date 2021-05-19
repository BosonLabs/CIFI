/* global AlgoSigner */
import './App.css';
import {Button, Container, Header, Message, Table} from "semantic-ui-react";
import {useState, useCallback} from "react";



const appId = 13793863;

const Extracheck=()=>{


      const [result, setResult] = useState("");


      console.log("result",result);

    //   const onClick = useCallback(async () => {
    //     const r = await buttonAction();
    //     setResult(r);
    //   }, [buttonAction]);


    // const action = useCallback(async () => {    
    //     await AlgoSigner.connect({
    //       ledger: 'TestNet'
    //     });
    //     const accts = await AlgoSigner.accounts({
    //       ledger: 'TestNet'
    //     });
    //     //const accts = await AlgoSigner.accounts({})
    //     alert("acc"+accts);
    //     return JSON.stringify(accts[0], null, 2);
    //   }, []);
    

    const conb= async () =>{

        let sendCodeElem = document.getElementById('send-code');



        console.log("send",sendCodeElem)

        // AlgoSigner.sign({
        //     from: document.getElementById('from').value,
        //     assetName: document.getElementById('name').value,
        //     assetUnitName: document.getElementById('unit-name').value,
        //     assetTotal: +document.getElementById('total').value,
        //     assetDecimals: +document.getElementById('decimals').value,
        //     note: document.getElementById('note').value,
        //     type: 'acfg',
        //     fee: txParams['min-fee'],
        //     firstRound: txParams['last-round'],
        //     lastRound: txParams['last-round'] + 1000,
        //     genesisID: txParams['genesis-id'],
        //     genesisHash: txParams['genesis-hash'],
        //     flatFee: true
        //   })
        //   .then((d) => {
        //     signedTx = d;
        //   })
        //   .catch((e) => {
        //     console.error(e);
        //   });

        
      }



    

    
    


    return(
        <div>
        <h1>hello Extracheck</h1>

        <button type="button" onClick={conb}>connect</button>
    
        </div>

    );


    

}



const GetAppLocalState = ({who}) => {
    const action = useCallback(async () => {
      try {
        const accts = await AlgoSigner.accounts({
          ledger: 'TestNet'
        });
        const r = await AlgoSigner.indexer({
          ledger: 'TestNet',
          path: `/v2/accounts/${accts[who]['address']}`
        });
        return JSON.stringify(r['account']['apps-local-state'][0]['key-value'][0]['value']['uint'], null, 2);
      } catch (e) {
        console.error(e);
        return JSON.stringify(e, null, 2);
      }
    }, [who]);
  
    return <Extracheck title="Get Local State" buttonText="Get Local State" buttonAction={action}/>
  };

  


export default Extracheck;