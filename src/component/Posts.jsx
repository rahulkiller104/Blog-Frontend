import PostCard from './Post';
import BASE_URL from '../config.js';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

const Posts = () => {
   
    const [posts , setPosts] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const headers = {
      'Authorization': `Bearer ${token}`
    };
  
    
    
    useEffect(()=>{
      axios.get(BASE_URL+'/api/posts/' ,{headers})
      .then(response => setPosts(response.data.posts))
      .catch(error => navigate('/auth'));
    },[])
   console.log(posts)

    return (
        <div className="posts-container">
          {posts.map((post, index) => (
            <PostCard
              id = {post._id}
              key={index}
              title={post.title}
              content={post.content}
              likesProp = {post.likes}
              author={post.author.username}
              isPremium={post.isPremium}
              comments ={post.comments}
              likes = {post.likes}
            />
          ))}
        </div>
      );
    };
    
    export default Posts;
   
    
    
    
