export const CurrentAddressActionTypes = {
  UPDATE_CURRENT_ADDRESS: 'UPDATE_CURRENT_ADDRESS'
}

export const updateCurrentAddress = (newAddress) => ({
  type: CurrentAddressActionTypes.UPDATE_CURRENT_ADDRESS,
  payload: newAddress
})

const INITIAL_STATE = {
  currentAddress: '100000',
}

const addressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CurrentAddressActionTypes.UPDATE_CURRENT_ADDRESS:
      return {
        ...state,
        currentAddress: action.payload
      }
    default:
      return state
  }
}

export default addressReducer