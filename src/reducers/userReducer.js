import userService from '../services/user'

const userReducer = (state = {}, action) => {
  switch(action.type) {
  case 'NEW_BOOKMARK':
    state.fuelStations = state.fuelStations.concat(action.data)
    return state
  case 'INIT_USER':
    return action.data
  case 'DELETE_BOOKMARK':
    console.log(action.data)
    state.fuelStations = state.fuelStations.filter(station => station.code != action.data)
    return state
  default:
    return state
  }
}

export const createBookmark = (content)=> {
  return async dispatch => {
    await userService.addNew(content)
    // console.log(content)
    dispatch({
      type: 'NEW_BOOKMARK',
      data: content.fuelStation,
    })
  }
}

export const deleteBookmark = (info) => {
  return async dispatch => {
    try {
      await userService.deletePlace(info)
      dispatch({
        type: 'DELETE_BOOKMARK',
        data: info.id,
      })
    } catch (error) {
      console.error(error)
    }
    
  }
}


export const initializeBookmarks = (id) => {
  return async dispatch => {
    const user = await userService.getUser(id)
    console.log(user)
    dispatch({
      type: 'INIT_USER',
      data: user,
    })
  }
}

export default userReducer