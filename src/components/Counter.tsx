import { useState, useEffect } from "react";

export default function Card() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Card</h1>
      <h2>Contador: {count}</h2>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Clique aqui
      </button>
    </div>
  );
}
