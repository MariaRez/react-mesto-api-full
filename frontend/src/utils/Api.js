class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _сheckServerResponseStatus(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getUserInfo() {
      //Загрузка информации о пользователе с сервера (имя, описание и аватар)
      return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: this._headers,
      }).then(this._сheckServerResponseStatus);
    }
  
    getInitialCards() {
      //Загрузка карточек с сервера
      return fetch(`${this._baseUrl}/cards`, {
        method: "GET",
        headers: this._headers,
      }).then(this._сheckServerResponseStatus);
    }
  
    editProfile(data) {
      //Редактирование профиля - имя и описание
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      }).then(this._сheckServerResponseStatus);
    }
  
    addNewCard(data) {
      //Добавление новой карточки
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      }).then(this._сheckServerResponseStatus);
    }
  
    deleteCard(_id) {
      // Удаление карточки
      return fetch(`${this._baseUrl}/cards/${_id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._сheckServerResponseStatus);
    }
  
    toggleLike(_id, isLiked) {
      let method = isLiked ? "DELETE" : "PUT";
      return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
        method: method,
        headers: this._headers,
      }).then((res) => this._сheckServerResponseStatus(res));
    }
  
    editAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(avatar),
      }).then(this._сheckServerResponseStatus);
    }
  }
  
  export const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-49",
    headers: {
      authorization: "5a8f95ef-4485-42ab-852e-86340ac2e69c",
      "Content-Type": "application/json",
    },
  });  