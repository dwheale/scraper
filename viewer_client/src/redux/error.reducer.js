const ErrorActionTypes = {
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
}

export const setError = (error) => ({
  type: ErrorActionTypes.SET_ERROR,
  payload: error
})

export const clearError = () => ({
  type: ErrorActionTypes.CLEAR_ERROR,
})

const INITIAL_STATE = {
  error: ''
}

const errorReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ErrorActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case ErrorActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: ''
      }
    default:
      return state
  }
}

export default errorReducer