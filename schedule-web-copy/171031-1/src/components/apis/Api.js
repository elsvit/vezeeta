class Api {
  /**
   * Saves status code
   * @param {object} response
   */
  setStatusCode(response) {
    this.statusCode = response.status;
    return Promise.resolve(response);
  }

  /**
   * Convert server response to json
   * @param {object} response
   */
  convertToJson(response) {
    return response.json();
  }

  /**
   * Gets servers response
   * @param {object} data
   */
  setData(data) {
    return Promise.resolve(data.Data);
  }

  /**
   * Returns object contains status and data
   * @param {object} data
   */
  setResponseObj(data) {
    return Promise.resolve({
      status: this.statusCode,
      data: data
    });
  }

  /**
   * Sends a post request to the server
   * @param {string} url
   * @param {object} body
   * @param {array} reqHeaders
   */
  post(url, body, reqHeaders) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (reqHeaders) {
      reqHeaders.map(header => headers.append(header.key, header.value));
    }

    return fetch(url, {
      method: 'post',
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(response => this.setStatusCode(response))
      .then(response => this.convertToJson(response))
      .then(data => this.setData(data))
      .then(data => this.setResponseObj(data))
      .then(data => data)
      .catch(error => error);
  }

  /**
   * Gets data from the server
   * @param {string} url
   */
  get(url, reqHeaders) {
    let headers = new Headers();

    if (reqHeaders) {
      reqHeaders.map(header => headers.append(header.key, header.value));
    }

    return fetch(url, {
      method: 'get',
      headers: headers
    })
      .then(response => this.setStatusCode(response))
      .then(response => this.convertToJson(response))
      .then(data => this.setData(data))
      .then(data => this.setResponseObj(data))
      .then(data => data)
      .catch(error => error);
  }
}

export default Api;
