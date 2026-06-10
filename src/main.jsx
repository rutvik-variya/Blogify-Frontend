import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux'
import { store, persistor } from './app/store.js'

import { PersistGate } from 'redux-persist/integration/react'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: "#fff",
              color: "#333",
            },
            success: {
              iconTheme: {
                primary: "#8B5CF6", // violet
                secondary: "#fff",
              },
            },
          }}
        />
      </BrowserRouter>
    </PersistGate>
  </Provider>
) 
