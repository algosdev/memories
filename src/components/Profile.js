import React, { useState, useEffect } from 'react'
import { getUser } from '../api/index'
import FileBase from 'react-file-base64'
import { updateUser } from '../api/index'
function Profile() {
  const [userData, setUserData] = useState(null)
  const updateUserData = () => {
    if (localStorage.getItem('user_id')) {
      updateUser(localStorage.getItem('user_id'), userData)
        .then((res) => {
          console.log(res)
          setUserData(res.data)
          window?.location.reload()
        })
        .catch((err) => console.log(err))
    }
  }
  useEffect(() => {
    if (localStorage.getItem('user_id')) {
      console.log(localStorage.getItem('user_id'))
      getUser(localStorage.getItem('user_id'))
        .then((res) => {
          setUserData(res.data)
          console.log(res)
        })
        .catch((err) => console.log(err))
    }
  }, [])
  return (
    <div>
      <h2>My profile</h2>
      <div>
        <div>
          <img
            style={{ height: '50px', width: '50px' }}
            src={userData?.avatar}
            alt='Avatar'
          />
        </div>
        Change Avatar
        <FileBase
          type='file'
          multiple={false}
          onDone={(data) => {
            console.log(data)
            setUserData({ ...userData, avatar: data.base64 })
          }}
        />
      </div>
      <div>
        <label htmlFor='name'>Name:</label>
        <input
          id='name'
          value={userData?.name}
          onChange={(e) => {
            setUserData({ ...userData, name: e.target.value })
          }}
        />
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          value={userData?.email}
          onChange={(e) => {
            setUserData({ ...userData, email: e.target.value })
          }}
        />
      </div>

      <div>
        <label>Created at:</label>
        <span>{userData?.created_at}</span>
      </div>
      <button onClick={updateUserData}>Update</button>
    </div>
  )
}

export default Profile
