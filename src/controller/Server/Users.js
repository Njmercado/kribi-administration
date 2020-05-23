import axios from 'axios'

export class Users {

  constructor(uri, key) {
    this.serverUri = uri
    this.serverKey = key
  }

  createHash(email, password, token) {
    const uri = `${this.serverUri}/user/hash`;

    return axios({
      method: "post",
      url: uri,
      params: {
        email: email,
        password: password
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

  updateUserDescription(email, description, token) {
    const uri = `${this.serverUri}/users/description`;

    return axios({
      method: "put",
      url: uri,
      params: {
        email: email,
        description: description
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

  updateUserProfileImage(email, image, currentImage, token) {
    const form = new FormData();
    const uri = `${this.serverUri}/users/image`;

    form.append("photo", image);
    form.append("currentImage", currentImage);
    form.append("email", email);

    return axios
      .put(uri, form, {
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

  changeUserPassword(email, oldPassword, newPassword, token) {
    const uri = `${this.serverUri}/users/password`;

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
        "x-authorization-server": "Basic " + this.serverKey,
      }
    })
      .then(result => {
        return result.data
      })
      .catch(err => {
        throw err.response.data
      })
  }
}
