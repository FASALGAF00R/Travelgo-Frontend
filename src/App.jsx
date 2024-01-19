import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import UserRoutes from './Routes/UserRouter/userRoutes'
import AgentRoutes from './Routes/AgentRouter/AgentRoutes'

function App() {
    return (
        <div className='App'>
         
            <Router>
                <Routes>

                    <Route path='/*' element={<UserRoutes />}/>
                    <Route path='/agent*' element={<AgentRoutes />}/>

                    

                </Routes>

                </Router>



          

        </div >
    )
}

export default App
