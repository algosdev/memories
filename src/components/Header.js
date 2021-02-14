import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
function Header() {
  const history = useHistory()
  const [user, setUser] = useState()
  useEffect(() => {
    setUser(localStorage.getItem('user'))
  }, [history.location.key])
  const logout = () => {
    localStorage.removeItem('user')
    history.push('/')
    setUser(false)
  }
  console.log(user)
  return (
    <div className='header'>
      <Link to='/'>Memories</Link>
      <div className='auth_section'>
        {!user ? (
          <button onClick={() => history.push('/login')}>Login</button>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </div>
  )
}

export default Header
