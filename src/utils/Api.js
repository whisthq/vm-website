export function apiPost(endpoint, body) {
	// var base_url = 'https://cube-vm-server.herokuapp.com/form/store'
	// var full_url = `${base_url}${endpoint}`
	(async () => {
      const rawResponse = await fetch(endpoint, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body)
      });
      return rawResponse;
    })();
}