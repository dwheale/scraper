const ImageServiceActionTypes = {
  UPDATE_CURRENT_IMAGE_SERVICE: 'UPDATE_CURRENT_IMAGE_SERVICE'
}

export const updateImageService = (newService) => ({
  type: ImageServiceActionTypes.UPDATE_CURRENT_IMAGE_SERVICE,
  payload: newService
})

const INITIAL_STATE = {
  name: 'prnt.sc',
  address: 'https://prnt.sc'
}

const imageServiceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ImageServiceActionTypes.UPDATE_CURRENT_IMAGE_SERVICE:
      return {
        ...state,
        service: action.payload.service,
        rootAddress: action.payload.rootAddress
      }
    default:
      return state
  }
}

export default imageServiceReducer