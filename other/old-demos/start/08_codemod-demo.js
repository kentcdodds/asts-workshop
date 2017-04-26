export default twitterFetchToRequest

function twitterFetchToRequest(babel) {
  const {types: t} = babel

  return {
    name: 'twitter-fetch-to-request',
    visitor: {},
  }
}
