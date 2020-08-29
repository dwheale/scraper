import axios from 'axios'
import cheerio from 'cheerio'
import * as firebase from 'firebase'

export const serviceTypes = {
  PRNT_SC: 'prnt.sc',
}

export const reqImages = async (address, service = 'prnt.sc') => {
  const reqImages = firebase.functions().onRequest('getImages')
  const response = await reqImages(address, service)
  console.log(response)
  return response.body
}

// This function receives the address and the service and obtains the
// relevant images' addresses and returns them as an array
export const getImages = async (address, service = 'prnt.sc') => {
  let images = []
  try {
    const response = await axios.get(address)
    const $ = cheerio.load(response.data)
    $('img').each((i, element) => {
      // check which service is in use and extract the appropriate images
      switch(service) {
        case serviceTypes.PRNT_SC: // Service: prnt.sc
          //img located at element.attribs.src
          if(element.attribs.class === 'no-click screenshot-image' &&
              element.attribs.src.substring(0, 2) !== '//') { //The second ensures that the image hasn't been removed
            images.push(element.attribs.src)
          }
          break // End of prnt.sc service
        default:
          console.log('no service has been specified')
      }
    })
    return images
  } catch (err) {
    console.log('There was an error obtaining the images: ', err)
  }

}

export const validateImage = async (image) => {
  axios.get(image)
      .then(result => {
        return result.status !== 404;
      })
      .catch(() => {
        return false
      })
}

export const getNextAddress = (address, service = 'prnt.sc') => {
  let arr = address.split('')
  let changeNextDigit = true
  let newArr = []
  arr.slice().reverse() // Get the reverse of the array
      .forEach(i => { // And loop through it
        if(changeNextDigit) {
          changeNextDigit = false
          let newChar = String.fromCharCode(nextCharCode(i.charCodeAt(0), service))
          newArr.push(newChar)
          if(newChar === '0') {
            changeNextDigit = true
          }
        } else {
          newArr.push(i)
        }
      })
  return newArr.slice().reverse().join('')
}

export const nextCharCode = (currentCode, service = 'prnt.sc') => { // receives an int and a service
  switch(service) {
    case 'prnt.sc':
      let regexPattern = RegExp('[a-z]|\\d', 'g')
      while(currentCode <= 122) {
        currentCode++
        if(currentCode === 123) {
          return 48
        }
        if(regexPattern.test(String.fromCharCode(currentCode))) {
          return currentCode
        }
      }
      break
    default:
      return currentCode
  }

}

export async function asyncForEach(array, callback) {
  for(let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}