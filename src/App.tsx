import { useEffect } from 'react';
import { inject } from '@vercel/analytics';
import VisualizerWrapper from './components/VisualizerWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    inject(); // ✅ Start analytics tracking
  }, []);

  return (
    <>
      <VisualizerWrapper />
      <ToastContainer 
        position="bottom-center" 
        autoClose={2000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover
      />
    </>
  );
}

export default App;

