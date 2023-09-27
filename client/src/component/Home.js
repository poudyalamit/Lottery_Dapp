import React from 'react'
import { NavLink } from 'react-router-dom'
import './Home.css'
const Home = () => {
  return (
    <>
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
