// frontend/src/App.jsx
import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/add-name', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    const result = await response.json();
    setMessage(result.message);
    setName('');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Enter Your Name</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Your name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" style={{ marginLeft: '1rem' }}>Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;
