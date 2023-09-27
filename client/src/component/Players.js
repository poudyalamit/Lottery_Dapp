import React, { useEffect, useState } from 'react'

const Players = ({ state, address }) => {
    const [account, setAccount] = useState("No account connected");
    const [registeredPlayers, setRegisteredPlayers] = useState([]);
    useEffect(() => {
        const getAccount = async () => {
            const { ethereum } = window;
            const accounts = await ethereum.request({ method: "eth_requestAccounts", })
            setAccount(accounts[0]);
        }
        state && getAccount();
    }, [state])

    useEffect(() => {
        const getPlayers = async () => {
            const { contract } = state;
            const players = await contract.allPlayers();
            console.log(players);
            const registeredPlayers = await Promise.all(
                players.map((player) => {
                    return player;
                })
            )
            console.log(registeredPlayers);
            setRegisteredPlayers(registeredPlayers);
        }
        state.contract && getPlayers();
    }, [state, state.contract])
    return (
        <div className='container'>
            <ul className="list-group" id="list">
                <div className="center">
                    <li className="list-group-item">
                        <b>Connected account :</b> {account}
                    </li>
                    <li className="list-group-item">
                        <b>Please pay 1 ether on this contract address : </b> {address}
                    </li>
                    <li className="list-group-item">
                        <b>Registerd Players </b>:
                        <br />
                        <br />
                        {registeredPlayers.length !== 0 &&
                            registeredPlayers.map((name) => <p key={name}>{name}</p>)}
                    </li>
                </div>
            </ul>
        </div>
    )
}

export default Players
