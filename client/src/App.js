import abi from './contract/Lottery.json'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers';

import './App.css';
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  const [account, setAccount] = useState("None")
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xDe53980E01fc6156e472de1cdE0a2b5a2c47f891";
      const contractAbi = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({ method: "eth_requestAccounts", })

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          })
          window.ethereum.on("accountChanged", () => {
            window.location.reload();
          })

          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          setAccount(account)
          setState({ provider, signer, contract });
        } else {
          alert("Please Install Metamask");
        }
      } catch (error) {
        console.log(error);
      }
    }
    connectWallet();
  }, [])
  return (
    <div >
      <div >
        <p
          class="text-muted lead "
          style={{ marginTop: "10px", marginLeft: "5px" }}
        >
          <small>Connected Account - {account}</small>
        </p>

      </div>
      <div className='container'>
      </div>
    </div>
  );
}

export default App;
