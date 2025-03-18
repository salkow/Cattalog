import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Spinner from './components/Spinner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={
      <Spinner className='size-[40px] text-white fixed left-[50%] top-[50%] -translate-1/2'/>
    }>
      <App />
    </Suspense>
  </StrictMode>,
);
