import axios from 'axios';

const BASE_URI = 'https://127.0.0.1:5000/';

const client = axios.create({
 baseURL: BASE_URI,
 json: true
});

class APIClient {
 storeEmail(email) {
   return this.perform('post', '/email', {'email':email});
 }

 async perform (method, resource, data) {
   return client({
     method,
     url: resource,
     data
   }).then(resp => {
     return resp.data ? resp.data : [];
   })
 }
}

export default APIClient;