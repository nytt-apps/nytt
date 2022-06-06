import React from 'react';

import Nav from './components/Nav';
import Card from './components/Card';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { invoke } from '@tauri-apps/api/tauri'

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

function Main() {
  const fetchNews = async () => {
    let foo:string = await invoke('fetch_api', { url: `https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=${process.env.REACT_APP_NEWS_API_KEY}` })
    return JSON.parse(foo)
  }

  const { isLoading, error, data } = useQuery('news', fetchNews)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <div className="p-5 h-screen flex flex-col">
      <Nav />
      <div className="h-full">
        <Swiper
          className="h-full"
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          // pagination={{ clickable: true, }}
        >
          { 
            data.articles.map((article, index) => ( 
              <SwiperSlide className="">
                <Card key={index} article={article} />
              </SwiperSlide>
            )) 
          }
        </Swiper>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}

