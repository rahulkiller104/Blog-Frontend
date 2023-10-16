import './App.css';
import AddPost from './component/AddPost';
import Layout from './component/Layout';
import LoginSignupPage from './component/Login';
import PostDetail from './component/PostDetails';
import Posts from './component/Posts';

import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path:"",
        element:<Posts/>
      },
      {
        path: "create",
        element:<AddPost />
      },
      {
        path: "posts/:postId",
        element: <PostDetail/>
      },{
        path: "auth",
        element: <LoginSignupPage/>
      }
    ],
  },
]);

// const router = createBrowserRouter(routeDefinitions);

function App() {
  return  <RouterProvider router={router} />
}

export default App;
