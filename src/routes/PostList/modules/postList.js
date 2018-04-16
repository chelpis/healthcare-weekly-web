import axios from 'axios'
import parsePost from './parsePost'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchPosts = (url = '') => async (dispatch, getState) => {
  try {
    const isRefreshing = url === ''
    dispatch({
      type: FETCH_POSTS_REQUEST,
      payload: {
        isRefreshing
      }
    })
    // const response = await axios.get(url || '/posts?page[number]=0')
    const response = {
      data: require('./mockPosts.json')
    }
    const {
      links: {
        self,
        next,
      }
    } = response.data
    const data = (response.data.data || [])
      .map(parsePost)
    dispatch({
      type: FETCH_POSTS_SUCCESS,
      payload: {
        isRefreshing,
        isEnd: self === next || data.length === 0,
        next,
        data,
        fetchedTimestamp: (new Date()).getTime()
      }
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: FETCH_POSTS_FAILURE,
      payload: error.message
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_POSTS_REQUEST]: (state, action) => ({
    ...state,
    isRefreshing: action.payload.isRefreshing,
    isLoading: true,
    errorMessage: '',
    posts: action.payload.isRefreshing ? [] : [...state.posts]
  }),
  [FETCH_POSTS_SUCCESS]: (state, action) => ({
    ...state,
    isRefreshing: false,
    isLoading: false,
    posts: action.payload.isRefreshing ? action.payload.data : [...state.posts, ...action.payload.data],
    isEnd: action.payload.isEnd,
    next: action.payload.next,
    fetchedTimestamp: action.payload.fetchedTimestamp,
    errorMessage: '',
  }),
  [FETCH_POSTS_FAILURE]: (state, action) => ({
    ...state,
    isRefreshing: false,
    isLoading: false,
    isEnd: false,
    errorMessage: action.payload
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isRefreshing: false,
  isLoading: false,
  posts: [],
  isEnd: false,
  errorMessage: '',
  next: '',
  fetchedTimestamp: 0,
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
