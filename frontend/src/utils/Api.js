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
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }).then(this._сheckServerResponseStatus);
    }

    getInitialCards() {
      //Загрузка карточек с сервера
      return fetch(`${this._baseUrl}/cards`, {
        method: "GET",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
      }).then(this._сheckServerResponseStatus);
    }


    editProfile(data) {
      //Редактирование профиля - имя и описание
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${data.name}`,
          about: `${data.about}`
        }),
      }).then(this._сheckServerResponseStatus);
    }
  
    addNewCard(data) {
      //Добавление новой карточки
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${data.name}`,
          link: `${data.link}`
        }),
      }).then(this._сheckServerResponseStatus);
    }
  
    deleteCard(_id) {
      // Удаление карточки
      return fetch(`${this._baseUrl}/cards/${_id}`, {
        method: "DELETE",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
      }).then(this._сheckServerResponseStatus);
    }
  
    toggleLike(_id, isLiked) {
      // console.log(_id);
      let method = isLiked ? "DELETE" : "PUT";
      return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
        method: method,
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
      }).then((res) => this._сheckServerResponseStatus(res));
    }

    editAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: `${data.avatar}`
        }), 
      }).then(this._сheckServerResponseStatus);
    }
  }
  
  export const api = new Api({
   baseUrl: "https://api.mariarez.nomoredomains.club",
  });  