class Api {
    constructor({ baseUrl }) {
      this._baseUrl = baseUrl;
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
        headers: { 
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }).then(this._сheckServerResponseStatus);
    }

    getInitialCards() {
      //Загрузка карточек с сервера
      return fetch(`${this._baseUrl}/cards`, {
        method: "GET",
        headers: { 
          authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
      }).then(this._сheckServerResponseStatus);
    }


    editProfile({name, about}) {
      //Редактирование профиля - имя и описание
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: { 
          authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          about,
        }),
      }).then(this._сheckServerResponseStatus);
    }
  
    addNewCard({name,link}) {
      //Добавление новой карточки
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: { 
          authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          link,
        }),
      }).then(this._сheckServerResponseStatus);
    }
  
    deleteCard(_id) {
      // Удаление карточки
      return fetch(`${this._baseUrl}/cards/${_id}`, {
        method: "DELETE",
        headers: { 
          authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
      }).then(this._сheckServerResponseStatus);
    }
  
    toggleLike(_id, isLiked) {
      let method = isLiked ? "DELETE" : "PUT";
      return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
        method: method,
        headers: { 
          authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
      }).then((res) => this._сheckServerResponseStatus(res));
    }
  
    editAvatar({avatar}) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: { 
          authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({avatar}), 
      }).then(this._сheckServerResponseStatus);
    }
  }
  
  export const api = new Api({
    baseUrl: "http://localhost:3001",
  });  