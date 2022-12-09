import { onAuthStateChanged } from 'firebase/auth'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { auth } from 'firestore/firebase'
import List from 'views/List/List'
import Login from 'views/Login/Login'
import styles from './App.module.scss'

function App() {
  const navigate = useNavigate()

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate('/login')
    }
  })

  return (
    <div className={styles.root}>
      <Routes>
        {/* <Route path="/articles/:id/edit" element={<Edit />} />
        <Route path="/articles/:id/preview" element={<Preview />} />
        */}
        <Route path="/articles" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate replace to="login" />} />
        <Route path="*" element={<Navigate replace to="login" />} />
      </Routes>
    </div>
  )
}

export default App
