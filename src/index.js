import _ from 'lodash'
import './style.css'
import picture from './assets/picture.jpg'
import {printMe} from './print'

function component(){
    let element = document.createElement('div')
    element.innerHTML = _.join(['Hello','Webpack'],' ')
    return element

};

function addImage(){
    let image = document.createElement('img')
    image.src= picture
    image.style.width = '150px'
    return image
}
let addPrint = undefined

if (module.hot) {
    module.hot.accept('./print.js',function () {
        console.log('Accepting the updated printMe module!');
        printMe()
    })
}
if (process.env.NODE_ENV === 'production') {
    addPrint =  function(){
        let btn = document.createElement('button')
        btn.innerHTML = '生产环境点击这里，然后查看 console！';
        btn.onclick = printMe
        return btn
    }
} else {
    addPrint =  function(){
        let btn = document.createElement('button')
        btn.innerHTML = '开发环境点击这里，然后查看 console！';
        btn.onclick = printMe
        return btn
    }
}
document.body.appendChild(component())
document.body.appendChild(addImage())
document.body.appendChild(addPrint())
