import axios from 'axios'
const url = 'http://localhost:5000/'
// https://memories-algo.herokuapp.com/

const API = axios.create({ baseURL: url })
API.interceptors.request.use((req) => {
  if (localStorage.getItem('user_id')) {
    req.headers.Authorization = `${localStorage.getItem('user_token')}`
  }
  return req
})
export const getUser = (user_id) => API.get(`/auth/user/${user_id}`)
export const updateUser = (user_id, data) =>
  API.put(`/auth/user/${user_id}/update`, data)
export const fetchPosts = () => API.get('/posts')
export const createPost = (data) => API.post('/posts', data)
export const updatePost = (id, newPost) => API.patch(`/posts/${id}`, newPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/like`)
export const commentPost = (id, data) => API.patch(`/posts/${id}/comment`, data)
export const login = (data) => API.post(`/auth/login`, data)
export const signup = (data) => API.post(`/auth/signup`, data)
