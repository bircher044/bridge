import React from "react";
import { isMetaMaskAvailable, useMetaMask } from "../hooks/MetaMask";

export default function MetaMask(props) {
    const {
        chainId,
        countOfAccounts,
        connectMetaMask,
        switchChain,
    } = useMetaMask();

    if (!isMetaMaskAvailable()) 
        return (
            <div>
                Metamask is unavailable!
            </div>
        );

    if (countOfAccounts == 0) {
        return (
            <div>
                <button onClick={connectMetaMask}>
                    Connect MetaMask
                </button>
            </div>
        )
    }

    return (
        <div>
            <button 
                    disabled={chainId == Number(process.env.REACT_APP_GOERLI_CHAIN_ID)} 
                    onClick={async () => await switchChain(process.env.REACT_APP_GOERLI_CHAIN_ID)}>
                Change your chain to Goerli ({process.env.REACT_APP_GOERLI_CHAIN_ID})  
            </button>
            <button 
                    disabled={chainId == Number(process.env.REACT_APP_MUMBAI_CHAIN_ID)} 
                    onClick={async () => await switchChain(process.env.REACT_APP_MUMBAI_CHAIN_ID)}>
                Change your chain to Mumbai ({process.env.REACT_APP_MUMBAI_CHAIN_ID}) 
            </button>
            {
                chainId == Number(process.env.REACT_APP_GOERLI_CHAIN_ID) ||
                chainId == Number(process.env.REACT_APP_MUMBAI_CHAIN_ID)
                    ? props.children
                    : <div>Need to switch chain</div>
            }
        </div>
    );
}