const axios = require('axios')
const serverUri = require('../controller/keys').serverURI
const serverKey = require('../controller/keys').serverKey

class serverRequest {
  static login(email, password){
    const uri = `${serverUri}/login?email=${email}&password=${password}`
    return axios.get(uri).then(result => {
      return result
    }).catch(err => {
      return {
        status: err.response.status,
        msg: err.response.data
      } 
    })
  }

  static register(name, email, password, registeredEmail, code) {

    email = `email=${email}`
    name = `name=${name}`
    password = `password=${password}`
    registeredEmail = `registeredEmail=${registeredEmail}`
    code = `code=${code}`
    const key = `key=${serverKey}`
    const params = `${email}&${password}&${name}&${registeredEmail}&${code}&${key}` 

    const uri = `${serverUri}/register/user?${params}`
    return axios.post(uri).then(result => {
      return {
        status: result.status,
        msg: result.data
      } 
    }).catch(err => {
      return {
        status: err.response.status, 
        msg: err.response.data.msg
      } 
    })
  }
}

export default serverRequest
