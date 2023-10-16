import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegThumbsUp, FaUnlock,FaComment, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import BASE_URL from '../config';

export default function PostCard({id, title, content, createdAt, author,
  isPremium,likesProp , comments
   }) {
  const [liked, setLiked] = useState(false);
  const [likes , setLikes] = useState(likesProp);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  console.log(likes , likesProp);




  const handleLikeClick = () => {
    const config = {
      headers: headers
       };
    console.log(BASE_URL + "/api/posts/" + id+ "/toggleLike")
    axios.patch(BASE_URL + "/api/posts/" + id+ "/toggleLike" , null , config)
    .then(response => {
      setLiked(prev => !prev);
      setLikes(response.data.likes)

    })
  };

  

  return (
    <div className="card min-w-full">
      <div className="rounded overflow-hidden shadow-lg post-card">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 flex flex-row justify-between">
            <div>{title}</div>
            <div>{isPremium? <FaLock /> : <FaUnlock/>}</div>
          </div>
          <p className="text-gray-700 text-base">
             {content.slice(0, 200)}...
              <Link
                className="text-blue-500 hover:underline hover:bg-white"
                to={"/posts/" + id}
              >
                Read More
              </Link>
           
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {/* Add tags here */}
          <span className="inline-block bg-cyan-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
          <span className="inline-block bg-cyan-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
          <span className="inline-block bg-cyan-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
        </div>
        <div className="flex flex-row px-5">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{likes&&likes.length} Likes</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{comments && comments.length} comments</span>
        </div>

        <div className="px-6 py-2 flex justify-between">
          <div className="flex flex-row">
            <button className={`like-button text-black`} onClick={handleLikeClick}>
              {<FaRegThumbsUp color={liked ? 'blue' : 'black'} />}
              Like
            </button>
            <Link to={"posts/" + id}className="comment-button">
              <FaComment /> Comment
            </Link>
          </div>
          <div>
            {/* Display the createdAt and author information here */}
            <p className="text-gray-500 text-sm">{createdAt}</p>
            <p className="text-gray-500 text-sm">Author: {author}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
