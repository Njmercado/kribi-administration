const axios = require("axios");
const serverUri = require("../controller/keys").serverURI;
// const serverUri = require("../controller/keys").serverURIDev;
const serverKey = require("../controller/keys").serverKey;
const FormData = require("form-data");

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
    const uri = `${serverUri}/user/description`;

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
    const uri = `${serverUri}/user/image`;

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
    const uri = `${serverUri}/user/password`;

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

  static createArticle(author, link, title, photo, description, token) {
    const form = new FormData();
    const uri = `${serverUri}/article`;

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

  static deleteArticle(id, imageId, token) {
    const uri = `${serverUri}/article`;

    return axios({
      method: "delete",
      url: uri,
      params: {
        id,
        imageId
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
        console.log(err);
        return err.response.data;
      });
  }

  static updateArticle(id, currentImage, image, title, link, author, description, token) {
    const form = new FormData()
    const uri = `${serverUri}/article`;

    form.append('photo', image)
    form.append('id', id)
    form.append('currentImage', (typeof image) == "object"? currentImage: '')
    form.append('title', title)
    form.append('link', link)
    form.append('author', author)
    form.append('description', description)

    return axios.put( uri, form, {
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
    const uri = `${serverUri}/article/autocompletion`;

    return axios({
      method: "get",
      url: uri,
      params: {
        title: articleTitle
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
}

export default serverRequest;
