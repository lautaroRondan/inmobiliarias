import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Header.css"

export const Header = () => {

  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/home")
  }

  return (
    <div className='header' data-testid='header'>
      <div className='logo' >
        {/* El span actúa como un enlace al inicio */}
        <a onClick={() => navigateHome()}>LR</a>
        <h3>Inmobiliarias</h3>
      </div>
    </div>
  )
}