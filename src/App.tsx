import React from 'react';
import logo from './logo.svg';
import Counter from './components/Counter'
import './App.css';

import { invoke } from '@tauri-apps/api/tauri'

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

function Main() {
  const handleClick = async () => {
    let bar:string = await invoke('say_hi', {
      valor1: 'React frontend'
    })
    console.log(bar)

    let foo:string = await invoke('fetch_api', { url: "https://jsonplaceholder.typicode.com/todos/1" })
    console.log(JSON.parse(foo))
  }

  const fetchApi = async () => {
    let foo:string = await invoke('fetch_api', { url: "https://jsonplaceholder.typicode.com/todos/1" })
    return JSON.parse(foo)

    // CORS Error demonstration
      // fetch('https://www.w3schools.com/js/js_json_parse.asp')
      //   .then(response => response.json())
      //   .then(json => console.log(json))
      // let foo:string = await invoke('fetch_api', { url: "https://www.w3schools.com/js/js_json_parse.asp" })
      // console.log(foo)
  }

  // const { isLoading, error, data } = useQuery('repoData', () => invoke('fetch_api', { url: "https://jsonplaceholder.typicode.com/todos/1" }))
  const { isLoading, error, data } = useQuery('repoData', fetchApi)

  console.log(data)

  return (
    <div className="App">
      <Counter />
      <button onClick={handleClick}>Fetch API</button>
      <pre id="json">{JSON.stringify(data, undefined, 2)}</pre>
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

