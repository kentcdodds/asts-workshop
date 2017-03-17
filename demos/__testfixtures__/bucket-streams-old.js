import BucketStreamsAPI from 'buckets-streams-api'

export {getFollowers, getPosts}

function getFollowers(user) {
  return BucketStreamsAPI.request({
    url: '/followers',
    method: 'GET',
    userId: user.id,
    limit,
  })
}

function getPosts(user) {
  return BucketStreamsAPI.request({
    url: '/posts',
    method: 'GET',
    userId: user.id,
    limit,
  })
}
