import React, { useEffect, useState } from 'react'
import PostItem from './PostItem'
import { fetchPosts } from '../api/index'
const data = [
  {
    title: 'asdasd',
    message: 'wqqwfdsdf',
    tags: 'qsad,asdasd,asdwad,asdw',
    creator: 'LKJsa',
    photo: '/post.jpg',
  },
  {
    title: 'asdasd',
    message: 'wqqwfdsdf',
    tags: 'qsad,asdasd,asdwad,asdw',
    creator: 'LKJsa',
    photo: '/post.jpg',
  },
  {
    title: 'asdasd',
    message: 'wqqwfdsdf',
    tags: 'qsad,asdasd,asdwad,asdw',
    creator: 'LKJsa',
    photo: '/post.jpg',
  },
]
function PostContainer() {
  const [posts, setPosts] = useState()
  useEffect(() => {
    fetchPosts()
      .then((res) => {
        console.log(res)
        setPosts(res?.data)
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <div className='item_container'>
      {posts?.map((item, index) => (
        <PostItem data={item} key={index} />
      ))}
    </div>
  )
}

export default PostContainer
