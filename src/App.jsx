import React ,{useState}from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import UserRoutes from './Routes/UserRouter/userRoutes'
import AgentRoutes from './Routes/AgentRouter/AgentRoutes'

function App() {
    const [userType, setUserType] = useState('');
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
