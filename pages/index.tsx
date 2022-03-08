import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import styles from '../styles/Home.module.css'
import toast, { Toaster } from 'react-hot-toast';

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      emailSuccess()
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className={styles.title}>Epic repositories</h1>
        <div>
          <input
            className={styles.inputField}
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Try it out →'}</span>
          </button>
        </div>
      </div>

      <div className={styles.eclipse}></div>
      <Toaster position="top-right"/>
    </div>
  </div>
  )
}

function emailSuccess() {
  toast.success('Check your email for the sign in link!')
}