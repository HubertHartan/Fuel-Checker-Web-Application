import React , { useState ,} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { createBookmark ,deleteBookmark} from '../reducers/userReducer'
import {Icon} from 'semantic-ui-react'

export default function Bookmark({ station }) {
  const { user, isAuthenticated } = useAuth0()
  const dispatch = useDispatch()
  const bookmarks = useSelector(state => state.fuelStations)
  
  const [bookmarked, setbookmarked] = useState((bookmarks && bookmarks.filter(bookmark => bookmark.code === station.code).length > 0) ? true : false)

  return (
    (bookmarked) ? (
      <Icon name='remove bookmark' color='purple' size='large' link onClick={() => {
        if (isAuthenticated) {
          dispatch(deleteBookmark({ email: user.email, id: station.code }))
          setbookmarked(false)
        }
      }} />) : (
      <Icon name='bookmark outline' size='large' link onClick={() => {
        if (isAuthenticated) {
          const newPlace = {
            email: user.email,
            name: user.name,
            fuelStation: station
          }
          dispatch(createBookmark(newPlace))
          setbookmarked(true)
        }
      }}/> )
  )
}
