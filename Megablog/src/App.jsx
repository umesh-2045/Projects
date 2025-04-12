import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from '../src/components';
import { Outlet } from 'react-router-dom'; // Import Outlet from react-router-dom
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        dispatch(logout());
      }) // Added error handling with catch block
      .finally(() => setLoading(false));
  }, [dispatch]); // Added dispatch to dependency array of useEffect

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          hello
          <Outlet /> {/* Ensure a router is set up in the parent to render child routes */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;