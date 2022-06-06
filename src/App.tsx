import React from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Temperature from './components/Temperature';
import { Swiper, SwiperSlide } from 'swiper/react';
import './App.css';
import 'swiper/css';

import { invoke } from '@tauri-apps/api/tauri'

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

function Main() {
  const fetchApi = async () => {
    let foo:string = await invoke('fetch_api', { url: "https://newsapi.org/v2/top-headlines?country=br&category=business&apiKey=d2460721257142e6ab02f85d003e882d" })
    return JSON.parse(foo)
  }

  const { isLoading, error, data } = useQuery('repoData', fetchApi)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  // console.log(data)

  return (
    <div className="App">
      <Temperature />
      <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      >
        { data.articles.map((article, index) => ( 
          <SwiperSlide><Card key={index} article={article} /></SwiperSlide>
        )) }
      </Swiper>
      
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Main />
    </QueryClientProvider>
  )
}

