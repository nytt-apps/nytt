import React from 'react';
import logo from './logo.svg';
import Counter from './components/Counter'
import './App.css';

import { invoke } from '@tauri-apps/api/tauri'

import { emit, listen } from '@tauri-apps/api/event'

function App() {
  fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=d2460721257142e6ab02f85d003e882d')
    .then(response => response.json())
    .then(json => console.log(json))

  const handleClick = async () => {
    let bar = await invoke('say_hi', {
      valor1: 'React frontend'
    })

    let foo = await invoke('fetch_api')

    console.log(foo)
    console.log(bar)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx!!</code> and save to reload.
        </p>
        <Counter />
        <button onClick={handleClick} >Clique!</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
      </header>
      
    </div>
  );
}

export default App;
