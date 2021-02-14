import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../api/index'
import { useHistory } from 'react-router-dom'
function LoginForm() {
  const history = useHistory()
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    login(values)
      .then((res) => localStorage.setItem('user', JSON.stringify(res)))
      .then(() => history.push('/'))
      .catch((err) => console.log(err))
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        name='email'
        value={values.email}
        placeholder='Email'
        onChange={handleChange}
      />
      <input
        type='password'
        name='password'
        value={values.password}
        placeholder='Password'
        onChange={handleChange}
      />
      <button>Submit</button>
      <Link to='/signup'>Do not have account? </Link>
    </form>
  )
}

export default LoginForm
