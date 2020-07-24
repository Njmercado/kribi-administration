const axios = require("axios");

export class Words {

  constructor(uri, key) {
    this.serverKey = key
    this.serverUri = uri
  }

  getWord(word, token) {
    const uri = `${this.serverUri}/words/some/${word}`;

    return axios({
      method: "get",
      url: uri,
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + this.serverKey
      }
    })
      .then(result => {
        return result.data.message.response;
      })
      .catch(err => {
        return err.response;
      });
  }

  getWordInfo(word, token) {
    const uri = `${this.serverUri}/words/info/${word}`;

    return axios({
      method: "get",
      url: uri,
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + this.serverKey
      }
    })
      .then(result => {
        return result.data.message[0];
      })
      .catch(err => {
        return err.response;
      });
  }

  createWord(word, definitions, examples, language, token) {
    const uri = `${this.serverUri}/words`;

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
        "x-authorization-server": "Basic " + this.serverKey
      }
    })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        return err.response.data;
      });
  }

  deleteWord(id, token) {
    const uri = `${this.serverUri}/words/${id}`;

    return axios({
      method: "delete",
      url: uri,
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + this.serverKey
      }
    })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        return err.response.data;
      });
  }

  updateWord(id, word, definitions, examples, token) {
    const uri = `${this.serverUri}/words/${id}`;

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
        "x-authorization-server": "Basic " + this.serverKey
      }
    })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        throw err.response.data;
      });
  }

  getTopWords(token) {
    const uri = `${this.serverUri}/words/top/5`;

    return axios({
      method: "get",
      url: uri,
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + this.serverKey
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
