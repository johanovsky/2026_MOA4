import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register';
 
const updateSW = registerSW({
  onNeedRefresh() {
    if(confirm("Nová verze, načíst?")) {
      updateSW(true);
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
