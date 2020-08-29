export const ImageActionTypes = {
  UPDATE_CURRENT_IMAGES: 'UPDATE_CURRENT_IMAGES'
}

export const updateCurrentImages = (imageArray) => ({
  type: ImageActionTypes.UPDATE_CURRENT_IMAGES,
  payload: imageArray
})

const INITIAL_STATE = {
  images: []
}

const imagesReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ImageActionTypes.UPDATE_CURRENT_IMAGES:
      return{
        ...state,
        images: action.payload
      }
    default:
      return state
  }
}

export default imagesReducer