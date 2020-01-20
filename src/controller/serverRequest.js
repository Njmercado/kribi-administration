const axios = require('axios')
const serverUri = require('../controller/keys').serverURI
const serverKey = require('../controller/keys').serverKey

class serverRequest {
  static login(email, password){
    const uri = `${serverUri}/login`
    const params = {
      email:email,
      password:password
    }
    return axios({
      method: 'get',
      url: uri,
      params: params,
      headers: {
        'x-authorization-server': 'Basic ' + serverKey
      }
    }).then(result => {
      return result
    }).catch(err => {
      return {
        status: err.response.status,
        msg: err.response.data
      } 
    })
  }

  static register(name, email, password, registeredEmail, code) {

    const uri = `${serverUri}/register/user`
    const params = {
      email: email,
      name: name,
      password: password,
      registeredEmail: registeredEmail,
      code: code
    }
    
    return axios({
      method: 'post',
      url: uri,
      params: params,
      headers: {
        'x-authorization-server': 'Basic ' + serverKey
      }
    }).then(result => {
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

  static getInfo(email, token) {

    const uri =  `${serverUri}/user/info`
    return axios({
      method: 'get',
      url: uri,
      params: {
        email: email,
      },
      headers: {
        'authorization': 'Bearer ' + token,
        'x-authorization-server' : 'Basic ' + serverKey
      }
    }).then(result => {
      console.log(result.data)
    }).catch(err => {
      console.log(err.response.msg)
    })
  }

  static getWord(word, token) {

    const uri =  `${serverUri}/word`

    return axios({
      method: 'get',
      url: uri,
      params: {
        word: word
      },
      headers: {
        'authorization': 'Bearer ' + token,
        'x-authorization-server' : 'Basic ' + serverKey
      }
    }).then(result => {
      return result.data.response
    }).catch(err => {
      return err.response
    })
  }

  static getWordInfo(word, token) {

    const uri =  `${serverUri}/word/info`

    return axios({
      method: 'get',
      url: uri,
      params: {
        word: word
      },
      headers: {
        'authorization': 'Bearer ' + token,
        'x-authorization-server' : 'Basic ' + serverKey
      }
    }).then(result => {
      return result.data
    }).catch(err => {
      return err.response
    })
  }

  static createWord(word, definitions, examples, language, token) {
    const uri = `${serverUri}/word`

    return axios({
      method: 'post',
      url: uri,
      params:{
        word: word,
        definitions: definitions,
        examples: examples,
        language: language 
      },
      headers:{
        'authorization': 'Bearer ' + token,
        'x-authorization-server': 'Basic ' + serverKey
      }
    }).then(result => {
      return result.data
    }).catch(err => {
      return err.response.data
    })
  }

  static deleteWord(word, language, token) {
    const uri = `${serverUri}/word`

    return axios({
      method: 'delete',
      url: uri,
      params:{
        word: word,
        language: language 
      },
      headers:{
        'authorization': 'Bearer ' + token,
        'x-authorization-server': 'Basic ' + serverKey
      }
    }).then(result => {
      return result.data
    }).catch(err => {
      return err.response.data
    })
  }
}

export default serverRequest
