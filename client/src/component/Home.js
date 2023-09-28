import React from 'react'
import { NavLink } from 'react-router-dom'
import './Home.css'
const Home = () => {
  return (
    <>
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
      <ul className="list-group" id="list">
        <div className="center">
          <li className="list-group-item" >
            <h1>You are</h1>
          </li>
          <li className="list-group-item">
            <NavLink to="/manager" className="text-decoration-none text">
              <button className="button1">Manager</button>
            </NavLink>

            <NavLink to="/players" className="text-decoration-none text">
              <button className="button1 player">Player</button>
            </NavLink>
          </li>
        </div>
      </ul>
    </>
  )
}

export default Home
