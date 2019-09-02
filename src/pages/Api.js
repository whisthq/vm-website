import { api } from './config'

export function apiGet(endpoint, token, api_url) {
  return callApi(endpoint, 'GET', null, token, api_url)
}

export function apiPost(endpoint, body, token, api_url) {
  return callApi(endpoint, 'POST', body, token, api_url)
}

export function apiDelete(endpoint, body, token, api_url) {
  return callApi(endpoint, 'DELETE', body, token, api_url)
}

export function apiPut(endpoint, body, token, api_url) {
  return callApi(endpoint, 'PUT', body, token, api_url)
}

export function apiUpload(endpoint, image, token) {
  let form = new FormData()
  form.append('image', image)
  if (token) {
    form.append('token', token)
  }

  let requestOptions = {
    method: 'POST',
    body: form,
  }

  let url = api(endpoint)

  return fetch(url, requestOptions).then(response => {
    if (response.status === 500) {
      throw new Error()
    }

    return response.json().then(json => ({ json, response }))
  })
}

export function callApi(endpoint, method, body, token, api_url) {
  let requestOptions = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  if ((method === 'POST' || method === 'DELETE' || method === 'PUT') && token) {
    body = {
      ...body,
    }
    // body.token = token;
  }
  if (body) {
    if (typeof body === 'object') {
      requestOptions.body = JSON.stringify(body)
    } else {
      requestOptions.body = body
    }
  }
  let url = api(endpoint, api_url)

  if (token) {
    url = `${url}?token=${token}`
  }
  return fetch(url, requestOptions).then(response => {
    if (response.status !== 200) {
      throw new Error()
    }

    // if (response.status === 200) {
    return response.json().then(json => ({ json, response }))
    // }
  })
}
