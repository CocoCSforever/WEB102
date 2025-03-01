import React from 'react';
import "./Post.css"

const Post = (props) => {
  const name = props.name;
  const isExcitedAbout = props.isExcitedAbout;
  const numLikes = props.numLikes;
  return (
    <div className="card">
      <p>{name}</p>
      <p>{isExcitedAbout}</p>
      <p>&#128155;{numLikes}</p>
    </div>
  );

  // return (
  //   <>
  //     <p>Christina Hughes</p>
  //     <p>I'm excited to learn about props!!</p>
  //     <p>&#128155;100</p>
  //   </>
  // );
}

export default Post;