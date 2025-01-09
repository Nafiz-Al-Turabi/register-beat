import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Route.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import toast, { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                background: '#2c3e50', 
                color: '#ecf0f1',
                borderRadius: '8px',
                padding: '16px',
              },
            },
            error: {
              style: {
                background: '#ff0000', 
                color: '#fff',
                borderRadius: '8px',
                padding: '16px',
              },
            },
          }}
        />
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </div>
    </QueryClientProvider>
  </StrictMode>,
)
