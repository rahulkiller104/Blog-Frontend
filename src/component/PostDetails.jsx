import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BASE_URL from '../config';
import { useParams } from 'react-router-dom';
import { FaRegThumbsUp, FaUnlock,FaComment, FaLock } from 'react-icons/fa';
import { FiMinusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


function Comment({ author, text }) {
  return (
    <div className="comment comment-div">
      <div className="comment-author">{author}:</div>
      <div className="comment-text">{text}</div>
    </div>
  );
}

export default function PostDetail(props) {

  const [post , setPost] = useState();
  const [newComment, setNewComment] = useState('');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  let { postId } = useParams();
  const token = localStorage.getItem('token');


  console.log(post &&post.author.username, username , token)


  const headers = {
    'Authorization': `Bearer ${token}`
  };

  useEffect(()=>{
    axios.get(BASE_URL+'/api/posts/' + postId ,{headers})
    .then(response => setPost(response.data.post))
  },[postId])

 
  const deleteHandler = (postId) => {
    console.log(postId)
    axios.delete(BASE_URL+'/api/posts/' + postId ,{headers})
    .then(response => {
     console.log("deleted successfully...");
     navigate('/');
     
    })
  }

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    // /posts/:postId/comments
    const config = {
     headers: headers,
        data: {
          text: newComment, // Comment text
        },
      };
      
      // Make the POST request with Axios
      axios.post(`${BASE_URL}/api/posts/${postId}/comments`, {text:newComment}, config)
        .then(response => {
          // Handle the API response here
          setPost(response.data);
        })
        .catch(error => {
          // Handle any errors here
          console.error("Something went wrong:", error);
        });

      setNewComment('');
    
  };

  return (
    <div className="post-detail">
      <div className="card">
        <div className="rounded overflow-hidden shadow-lg post-card">
          <div className="px-6 py-4">
           <div className="font-bold text-xl mb-2 flex flex-row justify-between">
            <div className="flex flex-row">
             <div className="mx-2">{post && post.title}</div>
             <div className="text-slate-400">{post && post.isPremium? <FaLock /> : <FaUnlock/>}</div>
            </div>
                  
            <button onClick={()=>deleteHandler(post._id)} className="px-2.5 py-1.5 rounded-md text-white text-sm bg-white hover:bg-white">
               {post && post.author.username === username && <FiMinusCircle color='red' size={28} />}
            </button>

          </div>
            <p className="text-gray-700 text-base">{post && post.content}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
          </div>
          <div className="comments-section">
            <h3 className="mx-5 font-bold">Comments:</h3>
            <ul className="comment-list ml-5">
              {post && post.comments.map((comment, index) => (
                <li key={index}>
                  <Comment author={comment.author.username} text={comment.text} />
                </li>
              ))}
            </ul>
            <div className="add-comment-section comment px-3">
              <div className="px-3 mb-2 mt-2">
                <textarea
                  placeholder="Comment"
                  className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  value={newComment}
                  onChange={handleCommentChange}
                />
              </div>
              <div className="flex justify-end px-4">
                <button
                  className="px-2.5 py-1.5 rounded-md text-white text-sm bg-gray-500"
                  onClick={handleAddComment}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
