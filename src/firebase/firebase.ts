import { initializeApp, getApp, FirebaseOptions } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

export const FIREBASE_CONFIG: FirebaseOptions = {
  apiKey: 'AIzaSyCHz5kKR1AvthWQ-8sbbFKp0yPuS4P03AA',
  authDomain: 'zaggro.firebaseapp.com',
  projectId: 'zaggro',
  storageBucket: 'zaggro.appspot.com',
  messagingSenderId: '796536712045',
  appId: '1:796536712045:web:ec7ff018af0e1676688864',
  measurementId: 'G-GGFB6K96RP',
}

function createFirebaseApp(config: FirebaseOptions) {
  try {
    return getApp()
  } catch {
    return initializeApp(config)
  }
}

const firebaseApp = createFirebaseApp(FIREBASE_CONFIG)
export const auth = getAuth(firebaseApp)
export const firestore = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
