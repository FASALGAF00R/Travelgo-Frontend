import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import UserRoutes from './Routes/UserRouter/userRoutes'
import AgentRoutes from './Routes/AgentRouter/AgentRoutes'
import AdminRoutes from './Routes/AdminRouter/AdminRoutes';

function App() {
    return (
        <div className='App'>        
            <Router>
                <Routes>
                    <Route path='/*' element={<UserRoutes />}/>
                    <Route path='/agent*' element={<AgentRoutes />}/>
                    <Route path='/admin*' element={<AdminRoutes />}/>               
                </Routes>
                </Router>     
        </div >
    )
}

export default App
