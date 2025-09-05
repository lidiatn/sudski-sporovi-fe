import { StrictMode } from 'react'
import './index.css';
import App from './App.tsx'
import {createRoot} from "react-dom/client";
import {PdfFileProvider} from "./context/PdfFileProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PdfFileProvider>
        <App />
    </PdfFileProvider>
  </StrictMode>
)
