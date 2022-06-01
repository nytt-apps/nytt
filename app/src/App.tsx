import React from 'react';
import logo from './logo.svg';
import Counter from './components/Counter'
import './App.css';

import { invoke } from '@tauri-apps/api/tauri'

import { emit, listen } from '@tauri-apps/api/event'

function App() {
  // https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=d2460721257142e6ab02f85d003e882d

  const handleClick = async () => {
    let bar:string = await invoke('say_hi', {
      valor1: 'React frontend'
    })

    console.log(bar)
    
    let foo:string = await invoke('fetch_api', { url: "https://jsonplaceholder.typicode.com/todos/1" })
    console.log(JSON.parse(foo))
  
    // CORS Error demonstration
      // fetch('https://www.w3schools.com/js/js_json_parse.asp')
      //   .then(response => response.json())
      //   .then(json => console.log(json))
      // let foo:string = await invoke('fetch_api', { url: "https://www.w3schools.com/js/js_json_parse.asp" })
      // console.log(foo)
  }

  return (
    <div className="App">
      <Counter />
      <button onClick={handleClick} >Fetch API</button>   
    </div>
  );
}

export default App;
