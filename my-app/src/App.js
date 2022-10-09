import {ethers} from 'ethers';
import React, { useState } from 'react';

function App() {
  const[flag, setFlag] = useState(true);
  const [signer, setSigner] = useState(0);
  const [chainId, setChainId] = useState(0);

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
      signer.getChainId().then((id) => setChainId(id)).catch(( ) =>{});
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
      <button disabled={chainId==Number(process.env.REACT_APP_GOERLI_CHAIN_ID)} onClick={async () => await provider.send('wallet_switchEthereumChain', [{chainId: ethers.utils.hexValue(Number(process.env.REACT_APP_GOERLI_CHAIN_ID))}])}>
          Change your chain to Goerli ({process.env.REACT_APP_GOERLI_CHAIN_ID})  
      </button>
      <button disabled={chainId==Number(process.env.REACT_APP_MUMBAI_CHAIN_ID)} onClick={async () => await provider.send('wallet_switchEthereumChain', [{chainId: ethers.utils.hexValue(Number(process.env.REACT_APP_MUMBAI_CHAIN_ID))}])}>
          Change your chain to Mumbai ({process.env.REACT_APP_MUMBAI_CHAIN_ID}) 
      </button>
    </div>
  );
}

export default App;
