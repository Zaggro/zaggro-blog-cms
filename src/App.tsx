import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from 'views/Login/Login'
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.root}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/articles/:id/edit" element={<Edit />} />
        <Route path="/articles/:id/preview" element={<Preview />} />
        <Route path="/articles" element={<List />} /> 
  <Route path="/login" element={<Login />} /> */}
          <Route path="/" element={<Navigate replace to="login" />} />
          <Route path="*" element={<Navigate replace to="login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
