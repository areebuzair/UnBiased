import React from 'react'
import { addDoc, collection } from "firebase/firestore";
import { useEffect } from 'react';
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from '../firebase-config';
import "../CreatePost.css"

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const postsCollectionRef = collection(db, "Forum-Posts");
  let navigate = useNavigate();

  const createPost = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/forum");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);


  return (
    <div className="createPostPage">
      <form className="cpContainer"  onSubmit={(e)=>{createPost(e)}}>
        <h1>Create Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(e) => { setTitle(e.target.value) }}
            required
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(e) => { setPostText(e.target.value) }}
            required
          />
        </div>
        {!isUploading && <button> Submit Post</button>}
      </form>
    </div>
  );

}

export default CreatePost