import React from "react";
import { ethers } from "ethers";
import { useContracts } from "../hooks/Contracts";

export default function Bridge(props) { 
    const [amount, setAmount] = React.useState(ethers.constants.Zero);

    const {
        yarikium,
        bridge
    } = useContracts();

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
                disabled={amount.isZero()}
                onClick={async () => await onSendButtonClick()}>
                Send
            </button>
        </div>
    );
}