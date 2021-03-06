import React, { useState } from 'react'
import FileBase from 'react-file-base64'
import { createPost } from '../api/index'
function Form() {
  const [values, setValues] = useState({
    title: '',
    user_id: localStorage.getItem('user_id') || '',
    tags: '',
    creator_id: '',
    selectedFile: '',
    description: '',
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)
    createPost({ post: values, user_id: values.user_id })
      .then((res) => window.location.reload())
      .catch((err) => console.log(err))
  }
  const clearForm = () => {
    setValues({
      ...values,
      title: '',
      creator: '',
      tags: '',
      selectedFile: '',
      description: '',
    })
  }
  return (
    <>
      {values.user_id ? (
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={values.title}
            placeholder='Title'
            name='title'
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
          <input
            type='text'
            value={values.description}
            placeholder='Description'
            name='description'
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
          />
          {/* <input
        type='text'
        value={values.creator}
        placeholder='Creator'
        name='creator'
        onChange={(e) => setValues({ ...values, creator: e.target.value })}
      /> */}
          <input
            type='text'
            value={values.tags}
            placeholder='Tags'
            name='tags'
            onChange={(e) => setValues({ ...values, tags: e.target.value })}
          />
          <FileBase
            type='file'
            multiple={false}
            onDone={(data) => {
              console.log(data)
              setValues({ ...values, selectedFile: data.base64 })
            }}
          />
          <button type='button' onClick={clearForm}>
            Clear
          </button>
          <button>Save</button>
        </form>
      ) : (
        <p>You need to login to post</p>
      )}
    </>
  )
}

export default Form
