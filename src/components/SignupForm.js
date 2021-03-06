import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../api/index'
import { useHistory } from 'react-router-dom'
function SignupForm() {
  const history = useHistory()
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)
    if (values.password === values.confirmPassword) {
      signup(values)
        .then((res) => {
          localStorage.setItem('user_id', res.data.id)
          localStorage.setItem('user_token', res.data.token)
        })
        .then(() => history.push('/'))
        .catch((err) => console.log(err))
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='name'
        value={values.name}
        onChange={handleChange}
        placeholder='Name'
      />
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
      <input
        type='password'
        name='confirmPassword'
        value={values.confirmPassword}
        placeholder='Confirm password'
        onChange={handleChange}
      />
      <button>Submit</button>
      <Link to='/login'>Already have account?</Link>
    </form>
  )
}

export default SignupForm
