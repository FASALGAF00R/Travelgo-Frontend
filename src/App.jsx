import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import UserRoutes from '../src/Routes/UserRouter/UserRoutes';
import AgentRoutes from '../src/Routes/AgentRouter/AgentRoutes';
import AdminRoutes from '../src/Routes/AdminRouter/AdminRoutes'


function App() {
    return (
        <div className='App'>        
            <Router>
                <Routes>
                    <Route path='/*' element={<UserRoutes/>}/>
                    <Route path='/agent*' element={<AgentRoutes/>}/>
                    <Route path='/admin*' element={<AdminRoutes />}/>               
                </Routes>
                </Router>     
        </div >
    )
}

export default App
