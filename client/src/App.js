import abi from './contract/Lottery.json'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import './App.css';
import Manager from './component/Manager';
import Players from './component/Players';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home';
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  const contractAddress = "0xc0F852fAba08a3Ce10129b004ba0d80A8DfeA40F";
  useEffect(() => {
    const connectWallet = async () => {
      const contractAbi = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          //eslint-disable-next-line
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
      <div className='container'>
        <Routes>
        <Route  path='/' element={<Home/>}></Route>
        <Route exact path='/manager' element={<Manager state={state}/>}></Route>
        <Route exact path='/players' element={ <Players state={state} address={contractAddress}/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
