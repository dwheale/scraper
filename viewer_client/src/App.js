import React, { useEffect } from "react"
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import "./App.css"
import ImagesComponent from './components/images.component'
import Container from '@material-ui/core/Container'
import ToolbarComponent from './components/toolbar.component'
import { useSelector, useDispatch } from 'react-redux'
import { CurrentAddressActionTypes } from './redux/address.reducer'
import { ImageActionTypes } from './redux/images.reducer'
import { reqImages } from './utils'

const App = () => {
  const registeredAddress = useSelector(state => state.address.currentAddress)
  const service = useSelector(state => state.service)
  const location = useLocation()
  const dispatch = useDispatch()
  //const history = useHistory()

  useEffect(() => {
    const currentLocation = location.pathname.substring(1) //remove the '/' at the beginning
    // This allows the user to manually input an address into the address bar
    if(currentLocation !== registeredAddress) {
      // need to update state.location.currentAddress with the currentLocation
      dispatch({
        type: CurrentAddressActionTypes.UPDATE_CURRENT_ADDRESS,
        payload: currentLocation
      })
    }

    async function getAndValidateImages() {
      const allImages = await reqImages(service.address + location.pathname, service.name)
      dispatch({
        type: ImageActionTypes.UPDATE_CURRENT_IMAGES,
        payload: allImages
      })
    }

    getAndValidateImages().then()

    // try {
    //   getImages(service.address + location.pathname, service.name) // Fetch the images
    //       .then((images) => {
    //         validateImages(images)
    //             .then(validImages => {
    //               console.log('%cvalidated images: ', 'color: red', validImages)
    //               dispatch({ // Send the images to state
    //                 type: ImageActionTypes.UPDATE_CURRENT_IMAGES,
    //                 payload: validImages
    //               })
    //             })
    //
    //         //history.push(getNextAddress(registeredAddress, service.name))
    //
    //       })
    // } catch (err) {
    //   console.log(err)
    // }

  }, [location])

  return (
      <main className='main-content'>
        <ToolbarComponent />
        <Container maxWidth='lg' className='container'>
          <Switch>
            <Route exact path='/' render={() => <Redirect to={`/${registeredAddress}`} />} />
            <Route path='/:address' component={ ImagesComponent } />
          </Switch>
        </Container>
      </main>
  )
}

export default App