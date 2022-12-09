import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from 'firestore/firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import logo from 'assets/images/zaggro.png'
import styles from './Login.module.scss'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate('/articles')
    }
  })

  const onSubmit = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence)
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      toast.error('Wrong login credentials')
    }
  }

  return (
    <div className={styles.root}>
      <ToastContainer />
      <img src={logo} alt="ZAGGRO logo" />
      <h1 className={styles.title}>CMS</h1>
      <div className={styles.inputs}>
        <label htmlFor="email" className={styles.label}>
          Email
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password" className={styles.label}>
          Password
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button type="submit" onClick={onSubmit} className={styles.signInBtn}>
        Sign In
      </button>
    </div>
  )
}

export default Login
