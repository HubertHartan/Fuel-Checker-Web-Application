const noteReducer = (state = [], action) => {
    switch(action.type) {
      case 'NEW_STATION':
        return [...state, action.data]
      case 'DELETE_STATION':
        const id = action.data.id
        return state.filter(station =>
            station.id !== id
        )
      default:
        return state
    }
}
  
const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))
  
  export const createNote = (content) => {
    return {
      type: 'NEW_STATION',
      data: {
        content,
        id: generateId()
      }
    }
}
  
export default noteReducer