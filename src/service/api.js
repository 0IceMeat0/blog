import axios from 'axios';


const api = {
  baseUrl: "https://blog.kata.academy/api",
  token: "",

  async createNewUserAccount(newUser) {
    try {
      const response = await axios.post(`${this.baseUrl}/users`, { user: newUser });
      const data = response.data;
  
      if (response.status !== 200) {
        throw data.errors;
      }
  
      this.token = data.user.token;
      window.localStorage.setItem("token", this.token);
  
      return data;
    } catch (error) {
      throw error;
    }
  },

  logOut() {
    this.token = "";
    window.localStorage.removeItem("token");
  },

async login(loginData) {
  try {
    const response = await axios.post(`${this.baseUrl}/users/login`, { user: loginData });

    if (response.status !== 200) {
      throw response.data.errors;
    }

    const data = response.data;

    this.token = data.user.token;
    window.localStorage.setItem("token", this.token);

    return data;
  } catch (error) {
    throw error;
  }
},


  async getCurrentUser() {
    const token = window.localStorage.getItem("token");
  
    if (!token) {
      throw new Error("Not found token");
    }
  
    try {
      const response = await axios.get(`${this.baseUrl}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status !== 200) {
        throw response.data.errors;
      }
  
      const data = response.data;
  
      this.token = data.user.token;
      window.localStorage.setItem("token", this.token);
  
      return data;
    } catch (error) {
      throw error;
    }
  },
  

  async createArticle(articleData) {
    try {
      const response = await axios.post(`${this.baseUrl}/articles`, { article: articleData }, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${this.token}`,
        },
      });
  
      if (response.status !== 200) {
        throw new Error('Server Error!');
      }
  
      const data = response.data;
      return data;
    } catch (error) {
      throw error;
    }
  },
  
  async deleteArticle(slug) {
    try {
      const response = await axios.delete(`${this.baseUrl}/articles/${slug}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
  
      if (response.status !== 200) {
        throw new Error("Server Error!");
      }
    } catch (error) {
      throw error;
    }
  },

  async updateArticle(articleData, slug) {
    try {
      const response = await axios.put(`${this.baseUrl}/articles/${slug}`, { article: articleData }, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${this.token}`,
        },
      });
  
      if (response.status !== 200) {
        throw new Error('Server Error!');
      }
  
      const data = response.data;
      return data;
    } catch (error) {
      throw error;
    }
  },
  

async favoriteArticle(slug) {
  try {
    const response = await axios.post(`${this.baseUrl}/articles/${slug}/favorite`, null, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Server Error!');
    }

    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
},


async unfavoriteArticle(slug) {
  try {
    const response = await axios.delete(`${this.baseUrl}/articles/${slug}/favorite`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Server Error!');
    }

    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
},


};
export default api;
