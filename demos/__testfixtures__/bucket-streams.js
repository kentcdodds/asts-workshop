import BucketStreamsAPI from 'buckets-streams-api'

export {getFollowers, getPosts}

function getFollowers(user, limit) {
  return BucketStreamsAPI.get('/followers', {userId: user.id, limit})
}

function getPosts(user, limit) {
  return BucketStreamsAPI.get('/posts', {userId: user.id, limit})
}
