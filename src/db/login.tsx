import React from 'react'
import axios from 'axios'

interface IUser {
  username: string;
  password: string 
}

const url = process.env.REACT_APP_API_URL

export const login = async ({ username, password } : IUser) => {
  try {
    const res = await axios.post(url + "/auth/login", {
        username, password
      }, {
        withCredentials: true
      })

      return res.data
  } catch(err) {
    return console.log(err)
  }
}

export const logoff = async() => {
  try {
    await axios.get(url + "/auth/logout")
  } catch(err) {
  }
}

