import React from 'react';

import Nav from './components/Nav';
import Card from './components/Card';
import Temperature from './components/Temperature';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
      <Nav />
      <Swiper
        className="h-5/6"
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
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
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}

