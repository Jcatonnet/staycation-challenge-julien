import React from 'react'

import Header from './Header'
import HotelList from './HotelList/HotelList'
import '../styles/app.scss'
const App = () => (
  <div className='app'>
    <Header />
    <div className='app__body'>
      <HotelList />
    </div>
  </div>
)

export default App
