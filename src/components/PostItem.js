import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FileBase from 'react-file-base64'
import { updatePost, deletePost, commentPost, likePost } from '../api/index'
function PostItem({ data }) {
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState()
  const [values, setValues] = useState({
    title: data.title,
    creator: data.creator,
    tags: data.tags,
    selectedFile: data.selectedFile,
    description: data.description,
    comment: '',
  })
  const filterPostValues = () => {
    if (values.selectedFile === data.selectedFile) {
      console.log(true)
      return {
        title: values.title,
        tags: values.tags,
        description: values.description,
        comment: values.value,
      }
    } else {
      return values
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    updatePost(data._id, filterPostValues())
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
  const postComment = (e) => {
    e.preventDefault()
    console.log(values.comment, userId)
    if (userId) {
      commentPost(data._id, { user_id: userId, comment: values.comment })
        .then((res) => window?.location.reload())
        .catch((err) => console.log(err))
    }
  }
  const deletePostHandler = () => {
    if (userId) {
      deletePost(data._id)
        .then((res) => window?.location.reload())
        .catch((err) => console.log(err))
    }
  }
  const likePostHandler = () => {
    if (userId) {
      likePost(data._id)
        .then((res) => window?.location.reload())
        .catch((err) => console.log(err))
    }
  }
  console.log(userId)
  useEffect(() => {
    if (localStorage.getItem('user_id')) {
      setUserId(localStorage.getItem('user_id'))
    }
  }, [data])
  console.log(data)
  return (
    <>
      <div className='item'>
        <div className='img_cont'>
          {userId && data.creator.id === userId && (
            <button onClick={handleClickOpen}>Edit</button>
          )}
          <img src={data.selectedFile} alt={data.title} />
        </div>
        <div className='details'>
          <div className='title'>{data.title}</div>
          <div className='message'>{data.description}</div>
          <div className='tags'>{data.tags}</div>
        </div>
        <div className='comments'>
          <i>Comments</i>
          {data.comments.map((comment, index) => (
            <p key={index}>
              <strong>{comment?.owner}:</strong>
              {comment.comment}
            </p>
          ))}
        </div>
        {userId && (
          <div className='comments'>
            <i>Leave a comment</i>
            <form onSubmit={postComment}>
              <input
                type='text'
                onChange={(e) =>
                  setValues({ ...values, comment: e.target.value })
                }
              />
              <button>Comment</button>
            </form>
          </div>
        )}
        <div className='actions'>
          <button onClick={likePostHandler}>
            {userId ? (data.likes.includes(userId) ? 'Liked' : 'Like') : ''}{' '}
            {data.likes.length} {!userId ? ' ' + 'likes' : ''}
          </button>
          {userId && data.creator.id === userId && (
            <button onClick={deletePostHandler}>Delete</button>
          )}
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
              value={values.description}
              placeholder='Description'
              name='description'
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
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
