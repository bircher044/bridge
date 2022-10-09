import React from "react";
import { ethers } from "ethers";
import { useContracts } from "../hooks/Contracts";
import { useMetaMask } from "../hooks/MetaMask";

export default function Bridge(props) { 
    const [amount, setAmount] = React.useState(ethers.constants.Zero);
    const [balance, setBalance] = React.useState(ethers.constants.Zero);
    const signer = useMetaMask().signer;

    const {
        yarikium,
        bridge
    } = useContracts();

    signer.getAddress().then(
        (address) => {
            yarikium.balanceOf(address).then(
                (curbalance) => {
                    setBalance(curbalance)});
        }
    );

    const onAmountChange = (event) => {
        setAmount(
            event.target.value == ""
                ? ethers.BigNumber.from(0)
                : ethers.BigNumber.from(event.target.value)
        );
    };

    const onSendButtonClick = async () => {
        await yarikium.approve(bridge.address, amount);
        await bridge.send(amount);
    };

    return (
        <div>
            <input
                value={amount.toString()}
                onChange={onAmountChange}/>
            <button
                disabled={amount.isZero() || amount > balance}
                onClick={async () => await onSendButtonClick()}>
                Send
            </button>
                Your current balance is: ({balance.toString()})
        </div>
    );
}