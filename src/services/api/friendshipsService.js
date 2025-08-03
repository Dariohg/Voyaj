import { makeRequest } from './config.js'

export const friendshipsService = {
  getFriends: () => 
    makeRequest('/friendships/'),

  getFriendRequests: () => 
    makeRequest('/friendships/requests'),

  sendFriendRequest: (data) => 
    makeRequest('/friendships/requests', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  respondToRequest: (requestId, data) => 
    makeRequest(`/friendships/requests/${requestId}/respond`, {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  removeFriend: (friendId) => 
    makeRequest(`/friendships/${friendId}`, {
      method: 'DELETE'
    })
}