import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserProvider } from './context/UserContext.tsx'
import TaskProvider from './context/TaskContext.tsx'
import StatusProvider from './context/StatusContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from './components/ui/sonner.tsx'
import RuleProvider from './context/RulesContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <TaskProvider>
        <StatusProvider>
          <RuleProvider>
          <App />
          </RuleProvider>
          <Toaster richColors/>
        </StatusProvider>
      </TaskProvider>
    </UserProvider>
    
    </BrowserRouter>
     
          
  </React.StrictMode>,
)
