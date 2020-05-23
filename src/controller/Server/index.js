// const axios = require("axios");
// const serverUri = require("../controller/keys").serverURI;
const serverUri = require("../keys.js").serverURIDev;
const serverKey = require("../keys").serverKey;

import { Words } from './Words'
import { Articles } from './Articles'
import { Login } from './Login'
import { Register } from './Register'
import { Users } from './Users'


const words = new Words(serverUri, serverKey)
const articles = new Articles(serverUri, serverKey)
const login = new Login(serverUri, serverKey)
const register = new Register(serverUri, serverKey)
const users = new Users(serverUri, serverKey)

/*class serverRequest {
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
          message: err.response.data
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

  //No se la verdad para que funciona esta funcion pero mejor la comento, por si las moscas

  // static getUserInfo(email, token) {
  //   const uri = `${serverUri}/user/info`;
  //   return axios({
  //     method: "get",
  //     url: uri,
  //     params: {
  //       email: email
  //     },
  //     headers: {
  //       authorization: "Bearer " + token,
  //       "x-authorization-server": "Basic " + serverKey
  //     }
  //   })
  //     .then(result => {
  //       console.log(result.data);
  //     })
  //     .catch(err => {
  //       console.log(err.response.msg);
  //     });
  // }

  static getWord(word, token) {
    const uri = `${serverUri}/words/some/${word}`;

    return axios({
      method: "get",
      url: uri,
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + serverKey
      }
    })
      .then(result => {
        return result.data.message.response;
      })
      .catch(err => {
        return err.response;
      });
  }

  static getWordInfo(word, token) {
    const uri = `${serverUri}/words/info/${word}`;

    return axios({
      method: "get",
      url: uri,
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + serverKey
      }
    })
      .then(result => {
        return result.data.message[0];
      })
      .catch(err => {
        return err.response;
      });
  }

  static createWord(word, definitions, examples, language, token) {
    const uri = `${serverUri}/words`;

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

  static deleteWord(id, token) {
    const uri = `${serverUri}/words/${id}`;

    return axios({
      method: "delete",
      url: uri,
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

  static updateWord(id, word, definitions, examples, token) {
    const uri = `${serverUri}/words/${id}`;

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
      method: "post",
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
    const uri = `${serverUri}/users/description`;

    return axios({
      method: "put",
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

  static updateUserProfileImage(email, image, currentImage, token) {
    const form = new FormData();
    const uri = `${serverUri}/users/image`;

    form.append("photo", image);
    form.append("currentImage", currentImage);
    form.append("email", email);

    return axios
      .put(uri, form, {
        headers: {
          authorization: "Bearer " + token,
          "x-authorization-server": "Basic " + serverKey,
          "Content-Type": "multipart/form-data; boundary=::"
        }
      })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        throw err;
      });
  }

  static changeUserPassword(email, oldPassword, newPassword, token) {
    const uri = `${serverUri}/users/password`;

    return axios({
      url: uri,
      method: 'put',
      params: {
        email,
        oldPassword,
        newPassword
      },
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + serverKey,
      }
    })
      .then(result => {
        return result.data
      })
      .catch(err => {
        throw err.response.data
      })
  }

  static getTopWords(token) {
    const uri = `${serverUri}/words/top/5`;

    return axios({
      method: "get",
      url: uri,
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

  static createArticle(author, link, title, photo, description, token) {
    const form = new FormData();
    const uri = `${serverUri}/articles`;

    form.append("author", author);
    form.append("link", link);
    form.append("title", title);
    form.append("photo", photo);
    form.append("description", description);

    return axios
      .post(uri, form, {
        headers: {
          authorization: "Bearer " + token,
          "x-authorization-server": "Basic " + serverKey,
          "Content-Type": "multipart/form-data; boundary=::"
        }
      })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        throw err;
      });
  }

  static deleteArticle(id, token) {
    const uri = `${serverUri}/articles/${id}`;

    return axios({
      method: "delete",
      url: uri,
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + serverKey
      }
    })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        console.log(err);
        return err.response.data;
      });
  }

  static updateArticle(id, currentImage, image, title, link, author, description, token) {
    const form = new FormData()
    const uri = `${serverUri}/articles/${id}`;

    form.append('photo', image)
    form.append('currentImage', (typeof image) == "object" ? currentImage : '')
    form.append('title', title)
    form.append('link', link)
    form.append('author', author)
    form.append('description', description)

    return axios.put(uri, form, {
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + serverKey,
        "Content-Type": "multipart/form-data; boundary=::"
      }
    })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        return err.response.data;
      });
  }

  static getArticles(articleTitle, token) {
    const uri = `${serverUri}/articles/${articleTitle}`;

    return axios({
      method: "get",
      url: uri,
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
}
*/

export {
  words,
  articles,
  login,
  register,
  users
}

// export default serverRequest;
