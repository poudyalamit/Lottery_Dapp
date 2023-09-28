import React, { useEffect, useState } from 'react'
import "./Manager.css"
const Manager = ({ state }) => {
    const [account, setAccount] = useState("");
    const [Cbalance, setCbalance] = useState("");
    const [lwinner, setLwinner] = useState("No winner Yet")

    useEffect(() => {
        const getAccount = async () => {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts", })
            setAccount(accounts[0]);
        }
        state && getAccount();
    }, [state])

    const contractBalance = async () => {
        const { contract } = state;
        try {
            const balance = await contract.balance();
            setCbalance(balance);
            console.log(Cbalance);
        } catch (err) {
            setCbalance("You are not the manager");
            console.error(err);
        }
    }
    const winner = async () => {
        const { contract } = state;
        try {
            await contract.SelectWinner();
            const lotteryWinner = await contract.winner();
            console.log(lotteryWinner);
            setLwinner(winner);
        } catch (err) {
            if (err.message.includes("You are not the manager")) {
                setLwinner("You are not the manager");
            } else if (err.message.includes("Players must be 3")) {
                setLwinner("There are less than 3 players.");
            } else {
                setLwinner("No winner yet");
            }
        }
    }

    return (
        <div>
            <ul className='list-group' id="list">
                <div className="center">
                    <li className="list-group-item" >
                        <b>Connected Account:{account}</b>
                    </li>
                    <li className="list-group-item">
                        <b>Winner:</b>
                        {lwinner}
                        <button className='button1' onClick={winner}>Click for Winner</button>
                    </li>
                    <li className="list-group-item">
                        <b>Balance: </b> {Cbalance}ETH
                        <button onClick={contractBalance}>Click for Balance
                        </button>
                    </li>
                </div>
            </ul>
        </div>
    )
}

export default Manager
