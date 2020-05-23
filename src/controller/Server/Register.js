import axios from 'axios'

export class Register {

  constructor(uri, key) {
    this.serverUri = uri
    this.serverKey = key
  }

  register(name, email, password, registeredEmail, code) {
    const uri = `${this.serverUri}/register/user`;

    return axios({
      method: "post",
      url: uri,
      params: {
        email: email,
        name: name,
        password: password,
        registeredEmail: registeredEmail,
        code: code
      },
      headers: {
        "x-authorization-server": "Basic " + this.serverKey
      }
    })
      .then(result => {
        return {
          status: result.status,
          msg: result.data
        };
      })
      .catch(err => {
        return {
          status: err.response.status,
          msg: err.response.data.msg
        };
      });
  }
}
