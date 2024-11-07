import React, { useEffect, useState } from 'react'
import fetch from 'isomorphic-fetch'

import './header.scss'

import StaycationLogo from './StaycationLogo'

const Header = () => {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    fetch('http://localhost:9000/users/1')
      .then(async res => {
        const result = await res.json()
        setUser(result)
      })
      .catch(e => console.warn('Error: ', e))
  }, [])

  return (
    <div className='header'>
      <div className='header__wrapper'>
        <StaycationLogo />
        {user && (
          <div className='header__user'>
            Welcome, {user.firstName}!
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
