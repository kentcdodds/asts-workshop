import Handlebars from 'handlebars'
import source from './book-list.handlebars'

const template = Handlebars.compile(source)

const context = {title: 'My New Post', body: 'This is my first post!'}
const html = template(context)

document.getElementById('app').innerHTML = html
