class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialCards(token) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                ...this._headers,
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(this._checkStatus)
    }

    getUserInfo(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                ...this._headers,
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(this._checkStatus)
    }

    changeUserInfo(data, token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                ...this._headers,
                'Authorization': `Bearer ${token}`,
                body: JSON.stringify({ name: data.name, about: data.about })
            }
        })
            .then(this._checkStatus)
    }

    changeUserAvatar(data, token) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                ...this._headers,
                'Authorization': `Bearer ${token}`,
                body: JSON.stringify({ avatar: data.avatar })
            }
        })
            .then(this._checkStatus)
    }

    addCard(data, token) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                ...this._headers,
                'Authorization': `Bearer ${token}`,
                body: JSON.stringify({ name: data.title, link: data.link })
            }
        })
            .then(this._checkStatus)
    }

    deleteCard(data, token) {
        return fetch(`${this._baseUrl}/cards/${data._id}`, {
            method: 'DELETE',
            headers: {
                ...this._headers,
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(this._checkStatus)
    }

    addLike(cardId, isLiked, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: `${isLiked ? 'DELETE' : 'PUT'}`,
            headers: {
                ...this._headers,
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(this._checkStatus)
    }

    deleteLike(data, token) {
        return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
            method: 'DELETE',
            headers: {
                ...this._headers,
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(this._checkStatus)
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
}

const api = new Api({
    // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-32',
    baseUrl: 'https://api.leogladkikh.nomoredomains.work',
    headers: {
        // authorization: '834693d9-1821-4fba-aca9-8dc02ca9ce04',
        'Content-Type': 'application/json',
    }
});

export default api;
