import axios from 'axios'

export class Login {

  constructor(uri, key) {
    this.serverUri = uri
    this.serverKey = key
  }

  login(email, password) {
    const uri = `${this.serverUri}/login`;
    const params = {
      email: email,
      password: password
    };
    return axios({
      method: "get",
      url: uri,
      params: params,
      headers: {
        "x-authorization-server": "Basic " + this.serverKey
      }
    })
      .then(result => {
        return result;
      })
      .catch(err => {
        return {
          status: err.response.status,
          message: err.response.data
        };
      });
  }
}
