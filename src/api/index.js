import axios from 'axios'
// const url = 'http://localhost:5000/posts'
const API = axios.create({ baseURL: 'https://memories-algo.herokuapp.com/' })
export const fetchPosts = () => API.get('/posts')
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, newPost) => API.patch(`/posts/${id}`, newPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/like`)
export const login = (data) => API.post(`/auth/login`, data)
export const signup = (data) => API.post(`/auth/signup`, data)
