const { h, Array: MutantArray, map } = require('mutant')
const { get } = require('xhr')
require('setimmediate')

const avatars = MutantArray ([])

const app = h('Avatars', [
  map(avatars, avatar => h('img', { src: avatar }))
])

document.body.appendChild(app)

get('https://api.github.com/orgs/ssbc/members', (err, res) => {
  const data = JSON.parse(res.body)
  const urls = data.map(user => {
    if (!user.avatar_url) console.log(user) // some people might be using gravatars
    return user.avatar_url
  })
  avatars.set(urls)
})


const styles = `
  div.Avatars {
    max-width: 880px;
    margin: 0 auto;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  div.Avatars img {
    width: 150px;
    height: 150;
    margin: 15px;
  }

`

require('insert-css')(styles)
// for some reason I can't assign insert-css to a variable ??
