import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from './Header'
import HotelList from './HotelList/HotelList'
import '../styles/app.scss'

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className='app'>
      <Header />
      <div className='app__body'>
        <HotelList />
      </div>
    </div>
  </QueryClientProvider>

)

export default App
