import './App.css';
import Login from './component/Login/Login';
import Registration from './component/Registration/Registration'
import { createBrowserRouter, json, RouterProvider } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase';
import { useState } from 'react';
import UserDashboard from './component/userDashboard/UserDashboard';
import Profile from './component/Profile/Profile';
import Chat from './component/Chat/Chat';
import PostManagement from './component/PostManagement/PostManagement';
import Home from './component/Home/Home';
function App() {
  initializeApp(firebaseConfig);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const router = createBrowserRouter([
    { path: '/', element: <Login setUser={setUser}></Login> },
    {
      path: '/userDashboard', element: user?.emailVerified && <UserDashboard user={user}></UserDashboard>, children: [
        { path: 'userDashboard/home', element: user?.emailVerified && <Home></Home> },
        { path: 'userDashboard/profile', element: user?.emailVerified && <Profile user={user}></Profile> },
        { path: 'userDashboard/chat', element: user?.emailVerified && <Chat></Chat> },
        { path: 'userDashboard/postManagement', element: user?.emailVerified && <PostManagement user={user}></PostManagement> },
      ]
    },

    { path: '/registration', element: <Registration></Registration> },
    { path: '*', element: <div>not found</div> }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
