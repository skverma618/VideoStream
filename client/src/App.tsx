import React from 'react';
import logo from './logo.svg';
import './App.css';
import VideoPlayer from './VideoPlayer';

function App() {
  return (
    <div className="App">
      <VideoPlayer videoUrl="http://localhost:4000/video" />
    </div>
  );
}

export default App;
