import abi from './contract/Lottery.json'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import './App.css';
import Manager from './component/Manager';
import Players from './component/Players';
import { NavLink, Route, Routes } from 'react-router-dom';
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
      <nav className='navbar navbar-expand-lg navbar'>
        <div className="container-fluid">
          <div className="collapse navbar-collpase" id='navbarNav'>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to='/' className="nav-lik navtext" aria-current='page'>
                  Lottery System
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/manager' className='nav-link navtext' aria-current='page'
                > Manager
                </NavLink>
              </li> 
              <li className="nav-item">
                <NavLink to='/players' className='nav-link navtext' aria-current='page'
                > Player
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
