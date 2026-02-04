import React, { useState, useEffect } from 'react';

//Paste your 5000 port url here and remove last /
const API="https://fantastic-rotary-phone-wr76vv4qp9jxcg9vq-5000.app.github.dev"

const API_URL = `${API}/api/posts`;

function App() {
  const [msg, setMsg] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }); 

  const handleSubmit = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "Anonymous", msg: msg }) 
      });

      if (response.ok) {
        alert("✨ Message Ghosted Successfully!");
        setMsg("");

        fetchPosts();
      }
    } catch (error) {
      console.error("Post failed:", error);
    }
  };

  return (
  <div className="App">
    <h1>👻 Ghost Book</h1>
    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
      <input
        placeholder="Whisper a message..."
        value={msg}
      />
      <button onClick={handleSubmit}>Post</button>
    </div>

    <div className="posts-container">
      {posts.map((p, index) => (
        <div key={index} className="ghost-post">
          <small style={{ color: '#8b949e' }}>A spirit says:</small>
          <p style={{ margin: '5px 0 0 0', fontSize: '1.2rem' }}>"{p.message}"</p>
        </div>
      ))}
    </div>
  </div>
);
}

export default App;
