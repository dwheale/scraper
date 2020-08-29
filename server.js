const express = require('express')
const path = require('path')
const cors = require('cors')
const axios = require('axios')
const cheerio = require('cheerio')

const server = express()
const port = process.env.PORT || 5000

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use(cors())

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, 'client/build')))

  server.get('/images', function (req, res) {
    res.sendFile(path.join(__dirname, 'viewer_client/build', 'index.html'))
  })
}

server.listen(port, error => {
  if (error) throw error
  console.log('Server running on port ' + port)
})

/*
  This begins a section to scrape image sites. It's created essentially as a
  proxy to get around any CORS issues.
 */
const serviceTypes = {
  PRNT_SC: 'prnt.sc',
}

server.post('/images', async function (req, res) {
  const address = req.body.address
  const service = req.body.service
  res.set('Content-Type', 'text/json')

  if(typeof address === 'string') {
    let images = []
    try {
      const axiosResponse = await axios.get(address)
      const $ = cheerio.load(axiosResponse.data)
      // check which service is in use and extract the appropriate images
      switch (service) {
        case serviceTypes.PRNT_SC: // Service: prnt.sc
          $('img').each((i, element) => {
            //img located at element.attribs.src
            //The second ensures that the image hasn't been removed
            if (element.attribs.class === 'no-click screenshot-image' &&
                element.attribs.src.substring(0, 2) !== '//') {
              images.push(element.attribs.src)
            }
          })
          break // End of prnt.sc service
        default:
          res.status(400).send({ error: 'No known service has been specified' })
          return // response has been sent to the client. Terminate
      }
      res.status(200).json(
          images
      )
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Internal Server Error' })
    }
  } else {
    res.status(400).send({
      error: 'The server could not understand the request. It is possible that ' +
          'you didn\'t send a proper address or service in your request'
    })
  }

})
/*
  End of Image Scraper
 */