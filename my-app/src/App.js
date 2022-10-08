import {ethers} from 'ethers';
import React, { useState } from 'react';

function App() {
  const[flag, setFlag] = useState(true);
  const [signer, setSigner] = useState(0);

  if(!window.ethereum){
    return(
      <div>
        Metamask is unavailable!
      </div>
    );
  }
  const provider=new ethers.providers.Web3Provider(window.ethereum);
  provider.send('eth_accounts', []).then(handleAccountsChanged).catch(console.error);

  function handleAccountsChanged(accounts) {
    if(accounts.length === 0){
      setFlag(false);
    }
    else{
      setFlag(true);
      setSigner(provider.getSigner());
    }
  }
  
  function connectWallet(){
      provider.send('eth_requestAccounts', [])
  }
  if(!flag){
    return (
      <div>
        <button onClick={connectWallet}>
          Connect Metamask
        </button>
      </div>
    );
  }
  return (
    <div>
      Nasik
    </div>
  );
}

export default App;
