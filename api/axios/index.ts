import axios from 'axios'

const $axios = axios.create({
    baseURL: 'https://moviesdatabase.p.rapidapi.com',
    headers: {
        'X-RapidAPI-Key': 'df710762fbmsha31fddac9b42dd9p12ca95jsn143ce6d65002',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
})

export { $axios }
