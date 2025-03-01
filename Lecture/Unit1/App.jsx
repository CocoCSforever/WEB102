import React from 'react';
import Post from './Post';

const App = () => {
  return (
    <>
      <h1>Welcome to Web 102!</h1>
      <h2>Write a Post about what you're excited to learn about!</h2>
      <Post name={"Yijia"} isExcitedAbout={"I'm excited to learn about props!!"} numLikes={100}/>
      <Post name={"Test"} isExcitedAbout={"Test message!!"} numLikes={10000}/>
    </>
  );
}

export default App;