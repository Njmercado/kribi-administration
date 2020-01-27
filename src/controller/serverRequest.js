const axios = require("axios");
const serverUri = require("../controller/keys").serverURI;
const serverKey = require("../controller/keys").serverKey;

class serverRequest {
  static login(email, password) {
    const uri = `${serverUri}/login`;
    const params = {
      email: email,
      password: password
    };
    return axios({
      method: "get",
      url: uri,
      params: params,
      headers: {
        "x-authorization-server": "Basic " + serverKey
      }
    })
      .then(result => {
        return result;
      })
      .catch(err => {
        return {
          status: err.response.status,
          msg: err.response.data
        };
      });
  }

  static register(name, email, password, registeredEmail, code) {
    const uri = `${serverUri}/register/user`;

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
        "x-authorization-server": "Basic " + serverKey
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

  static getUserInfo(email, token) {
    const uri = `${serverUri}/user/info`;
    return axios({
      method: "get",
      url: uri,
      params: {
        email: email
      },
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + serverKey
      }
    })
      .then(result => {
        console.log(result.data);
      })
      .catch(err => {
        console.log(err.response.msg);
      });
  }

  static getWord(word, token) {
    const uri = `${serverUri}/word`;

    return axios({
      method: "get",
      url: uri,
      params: {
        word: word
      },
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + serverKey
      }
    })
      .then(result => {
        return result.data.response;
      })
      .catch(err => {
        return err.response;
      });
  }

  static getWordInfo(word, token) {
    const uri = `${serverUri}/word/info`;

    return axios({
      method: "get",
      url: uri,
      params: {
        word: word
      },
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + serverKey
      }
    })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        return err.response;
      });
  }

  static createWord(word, definitions, examples, language, token) {
    const uri = `${serverUri}/word`;

    return axios({
      method: "post",
      url: uri,
      params: {
        word: word,
        definitions: definitions,
        examples: examples,
        language: language
      },
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + serverKey
      }
    })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        return err.response.data;
      });
  }

  static deleteWord(word, language, token) {
    const uri = `${serverUri}/word`;

    return axios({
      method: "delete",
      url: uri,
      params: {
        word: word,
        language: language
      },
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + serverKey
      }
    })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        return err.response.data;
      });
  }

  static updateWord(word, definitions, examples, token) {
    const uri = `${serverUri}/word`;

    return axios({
      method: "put",
      url: uri,
      params: {
        word: word,
        definitions: definitions,
        examples: examples
      },
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + serverKey
      }
    })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        throw err.response.data;
      });
  }

  static createHash(email, password, token) {
    const uri = `${serverUri}/user/hash`;

    return axios({
      method: "get",
      url: uri,
      params: {
        email: email,
        password: password
      },
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + serverKey
      }
    })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        throw err.response.data;
      });
  }

  static updateUserDescription(email, description, token) {
    const uri = `${serverUri}/user/description`;

    return axios({
      method: "post",
      url: uri,
      params: {
        email: email,
        description: description
      },
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + serverKey
      }
    })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        throw err.response.data;
      });
  }

  static getTopWords(token) {
    const uri = `${serverUri}/word/top`;
    const top = 5;

    return axios({
      method: "get",
      url: uri,
      params: {
        top: top
      },
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + serverKey
      }
    })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        throw err.response.data;
      });
  }

  static createArticle(author, link, title, photo, token) {
    const uri = `${serverUri}/article`;

    return axios({
      method: "post",
      url: uri,
      params: {
        author: author,
        link: link,
        title: title,
        photo: photo 
      },
      headers: {
        "authorization": "Bearer " + token,
        "x-authorization-server": "Basic " + serverKey
      }
    })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        throw err;
      });
  }

  static getArticles(articleTitle, token) {
    const uri = `${serverUri}/article/autocompletion`;

    return axios({
      method: "get",
      url: uri,
      params: {
        title: articleTitle
      },
      headers: {
        "authorization": "Bearer " + token,
        "x-authorization-server": "Basic " + serverKey
      }
    })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        throw err.response.data;
      });
  }
}

export default serverRequest;
