import React from "react";
import { ethers } from "ethers";

export function isMetaMaskAvailable() {
    return window.ethereum != undefined && window.ethereum.isMetaMask;
}

export function useMetaMask() { 
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const [countOfAccounts, setCountOfAccounts] = React.useState(0);
    const [chainId, setChainId] = React.useState(0);

    const connectMetaMask = async () => await provider.send('eth_requestAccounts', []);

    const switchChain = async (chainIdNumberAsString) => 
        await provider.send(
            'wallet_switchEthereumChain', 
            [
                {
                    chainId: ethers.utils.hexValue(Number(chainIdNumberAsString))
                }
            ]
        );

    provider
        .send('eth_accounts', [])
        .then((accounts) => { 
           setCountOfAccounts(accounts.length); 
        });

    signer
        .getChainId()
        .then((id) => {
            setChainId(id);
        });

    return {
        provider,
        signer,
        countOfAccounts,
        chainId,
        connectMetaMask,
        switchChain
    };
}