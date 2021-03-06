import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
function Header() {
  const history = useHistory()
  const [userId, setUser] = useState('')
  useEffect(() => {
    setUser(localStorage.getItem('user_id'))
  }, [history.location.key])
  const logout = () => {
    localStorage.removeItem('user_id')
    localStorage.removeItem('user_token')
    history.push('/')
    setUser('')
  }
  console.log(userId)
  return (
    <div className='header'>
      <Link to='/'>Memories</Link>
      <div className='auth_section'>
        {!userId ? (
          <button onClick={() => history.push('/login')}>Login</button>
        ) : (
          <>
            <Link to='/profile'>Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
