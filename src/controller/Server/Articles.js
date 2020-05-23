import axios from 'axios'
import FormData from 'form-data'

export class Articles {

  constructor(uri, key) {
    this.serverUri = uri
    this.serverKey = key
  }

  createArticle(author, link, title, photo, description, token) {
    const form = new FormData();
    const uri = `${this.serverUri}/articles`;

    form.append("author", author);
    form.append("link", link);
    form.append("title", title);
    form.append("photo", photo);
    form.append("description", description);

    return axios
      .post(uri, form, {
        headers: {
          authorization: "Bearer " + token,
          "x-authorization-server": "Basic " + this.serverKey,
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

  deleteArticle(id, token) {
    const uri = `${this.serverUri}/articles/${id}`;

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
        console.log(err);
        return err.response.data;
      });
  }

  updateArticle(id, currentImage, image, title, link, author, description, token) {
    const form = new FormData()
    const uri = `${this.serverUri}/articles/${id}`;

    form.append('photo', image)
    form.append('currentImage', (typeof image) == "object" ? currentImage : '')
    form.append('title', title)
    form.append('link', link)
    form.append('author', author)
    form.append('description', description)

    return axios.put(uri, form, {
      headers: {
        authorization: "Bearer " + token,
        "x-authorization-server": "Basic " + this.serverKey,
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

  getArticles(articleTitle, token) {
    const uri = `${this.serverUri}/articles/${articleTitle}`;

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
