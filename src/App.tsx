import VisualizerWrapper from './components/VisualizerWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/next"

function App() {
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
      <Analytics />
    </>
  );
}

export default App;
