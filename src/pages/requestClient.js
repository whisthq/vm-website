export default {
  getJSONRepos(query) {
   return fetch('https://infinite-everglades-29230.herokuapp.com/' + query).then(response => response.json());
  }
}
