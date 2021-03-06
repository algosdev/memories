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
      .then((res) => {
        console.log(res)
        localStorage.setItem('user_id', res.data.id)
        localStorage.setItem('user_token', res.data.token)
      })
      .then(() => history.push('/'))
      .catch((err) => alert(err?.response?.data?.message))
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
