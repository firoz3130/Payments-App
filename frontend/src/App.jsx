import { BrowserRouter, Route } from 'react-router-dom'
import { Signup } from './pages/signup'

function App() {

  return (
    <>
    <BrowserRouter>
      <Route path="/signup" element={<Signup/>}  />
    </BrowserRouter>
    </>
  )
}

export default App
