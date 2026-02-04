import axios from 'axios';

const API = axios.create({
  
  baseURL: "https://stunning-disco-5gq6vv97jpjrh7w55-5000.app.github.dev", 
  
  withCredentials: true,
});

export default API;
