import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import UserRoutes from './Routes/UserRouter/userRoutes'

function App() {
    return (
        <div className='App'>
         
            <Router>
                <Routes>

                    <Route path='/*' element={<UserRoutes />}/>

                    

                </Routes>

                </Router>



          

        </div >
    )
}

export default App
