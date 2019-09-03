import axios from 'axios';

const BASE_URI = 'https://infinite-everglades-29230.herokuapp.com/';

const client = axios.create({
 baseURL: BASE_URI,
 json: true
});

class APIClient {
 storeEmail(email) {
   return this.perform('post', '/email', email);
 }

 async perform (method, resource, data) {
   return client({
     method,
     url: resource,
     data,
     headers: {
       'Content-Type': 'application/json'
     }
   }).then(resp => {
     return resp.data ? resp.data : [];
   })
 }
}

export default APIClient;