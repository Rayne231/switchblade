const { APIWrapper } = require('../')
const snekfetch = require('snekfetch')

const API_URL = 'https://api.deezer.com'

module.exports = class DeezerAPI extends APIWrapper {
  constructor () {
    super()
    this.name = 'deezer'
  }

  // Get
  getTrack (id) {
    return this.request(`/track/${id}`)
  }

  getAlbum (id) {
    return this.request(`/album/${id}`)
  }

  getArtist (id) {
    return this.request(`/artist/${id}`)
  }

  getPlaylist (id) {
    return this.request(`/playlist/${id}`)
  }

  getUserFollowers (id) {
    return this.request(`/user/${id}/followers`)
  }

  getUserFollowings (id) {
    return this.request(`/user/${id}/followings`)
  }

  getUserChart (id, chart = 'artists') {
    return this.request(`/user/${id}/charts/${chart}`)
  }

  // Search
  findTracks (q) {
    return this.request('/search', { q })
  }

  findAlbums (q) {
    return this.request('/search/album', { q })
  }

  findArtists (q) {
    return this.request('/search/artist', { q })
  }

  findPlaylists (q) {
    return this.request('/search/playlist', { q })
  }

  findUser (q) {
    return this.request('/search/user', { q })
  }

  // Default
  request (endpoint, queryParams = {}) {
    return snekfetch.get(`${API_URL}${endpoint}`).query(queryParams).then(r => r.body)
  }
}
