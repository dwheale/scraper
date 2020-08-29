import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  image: {
    marginTop: '0px',
  },
}))

const ImagesComponent = () => {
  const classes = useStyles()
  let images = useSelector(state => state.images.images)
  if(!images) {
    images = []
  }
  console.log('%cThese images made it to the component: ', 'color: red', images)

  return (
      <div className={ classes.image }>
        {
          images.length > 0 ?
          images.map((image, index) => (
            <p key={index}><img alt='Requested resource could not be loaded' src={image} /></p>
        )) :
              <p>There were no images to load</p>
        }

      </div>
  )

}

export default ImagesComponent