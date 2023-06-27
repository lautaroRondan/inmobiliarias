import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Header = () => {

  const navigate = useNavigate();

  const viewProperty = () => {
    navigate("/")
  }

  return (
    <div className='header'>
      <div className='logo' >
        {/* El span actúa como un enlace al inicio */}
        <span onClick={() => viewProperty()}>LR</span>
        <h3>Inmobiliarias</h3>
      </div>
    </div>
  )
}