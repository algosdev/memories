import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FileBase from 'react-file-base64'
import { updatePost, deletePost, likePost } from '../api/index'
function PostItem({ data }) {
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState({
    title: data.title,
    creator: data.creator,
    tags: data.tags,
    selectedFile: data.selectedFile,
    message: data.message,
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)
    updatePost(data._id, values)
      .then((res) => {
        handleClose()
        window?.location.reload()
      })
      .catch((err) => console.log(err))
  }
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const deletePostHandler = () => {
    deletePost(data._id)
      .then((res) => window?.location.reload())
      .catch((err) => console.log(err))
  }
  const likePostHandler = () => {
    likePost(data._id)
      .then((res) => window?.location.reload())
      .catch((err) => console.log(err))
  }
  return (
    <>
      <div className='item'>
        <div className='img_cont'>
          <button onClick={handleClickOpen}>Edit</button>
          <img src={data.selectedFile} alt={data.title} />
        </div>
        <div className='details'>
          <div className='title'>{data.title}</div>
          <div className='tags'>{data.tags}</div>
          <div className='message'>{data.message}</div>
        </div>
        <div className='actions'>
          <button onClick={likePostHandler}>Like {data.likeCount}</button>
          <button onClick={deletePostHandler}>Delete</button>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Edit post</DialogTitle>
        <DialogContent>
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
              value={values.message}
              placeholder='Message'
              name='message'
              onChange={(e) =>
                setValues({ ...values, message: e.target.value })
              }
            />
            <input
              type='text'
              value={values.creator}
              placeholder='Creator'
              name='creator'
              onChange={(e) =>
                setValues({ ...values, creator: e.target.value })
              }
            />
            <input
              type='text'
              value={values.tags}
              placeholder='Tags'
              name='tags'
              onChange={(e) => setValues({ ...values, tags: e.target.value })}
            />
            <div className='preview'>
              <img src={values.selectedFile} alt='' />
            </div>

            <FileBase
              type='file'
              multiple={false}
              onDone={(data) => {
                console.log(data)
                setValues({ ...values, selectedFile: data.base64 })
              }}
            />
            <button type='button' onClick={handleClose}>
              Cancel
            </button>
            <button type='submit'>Save</button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PostItem
