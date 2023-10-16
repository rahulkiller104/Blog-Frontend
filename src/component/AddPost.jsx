import React, { useState } from 'react';
import BASE_URL from '../config';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleIsPremiumChange = (e) => {
    setIsPremium(e.target.checked);
  };

  const handleSubmit = () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('Title and content cannot be empty');
      return;
    }

    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
  

    const newPost = {
      title: title,
      content: content,
      isPremium: isPremium,
    };

    const config = {
      headers: headers,
         data: newPost
       };
       
       // Make the POST request with Axios
       axios.post(`${BASE_URL}/api/posts/`, {post:newPost}, config)
         .then(response => {
          console.log(response);
          navigate("/");
         })
         .catch(error => {
           // Handle any errors here
           console.error("Something went wrong:", error);
         });

    setTitle('');
    setContent('');
    setIsPremium(false);
  };

  return (
    <div className="add-post">
      <h2>Add a New Post</h2>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            rows={5}
            onChange={handleContentChange}
          />
        </div>
        <div className="form-group flex flex-row">
           <div className="mx-2">Premium Post:</div>
            <input
              type="checkbox"
              checked={isPremium}
              onChange={handleIsPremiumChange}
            />
        
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 hover:text-white"
          onClick={handleSubmit}
        >
          Add Post
        </button>
      </form>
    </div>
  );
}
