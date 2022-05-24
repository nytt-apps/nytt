import logo from './logo.svg';
import './App.css';
import Card from './Card.jsx';

function App() {
  fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=d2460721257142e6ab02f85d003e882d')
    .then(response => response.json())
    .then(json => console.log(json))

  return (
    <div className="App">
      <p>Hello World</p>
      <Card />
    </div>
  );
}

export default App;
