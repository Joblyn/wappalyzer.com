// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAvYbcZGTbvFluEzhWNVY_MffCX-rbd4jU',
  authDomain: 'wappalyzer-6a18c.firebaseapp.com',
  projectId: 'wappalyzer-6a18c',
  storageBucket: 'wappalyzer-6a18c.appspot.com',
  messagingSenderId: '13550326505',
  appId: '1:13550326505:web:0a9e544de781c1a597d678',
  measurementId: 'G-Y4RB7Y0DL2',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
let analytics
if (app.name && typeof window !== 'undefined') {
  analytics = getAnalytics(app)
}
export { analytics }
