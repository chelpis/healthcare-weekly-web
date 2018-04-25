// import axios from 'axios'
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

export const fetchPosts = ({ page = 0 } = {}) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_POSTS_REQUEST,
    })
    // const response = await axios.get(url || '/posts?page[number]=0')
    const response = {
      data: require('./mockPosts.json')
    }
    const {
      links: {
        next,
      }
    } = response.data
    const data = (response.data.data || [])
      .map(parsePost)
    dispatch({
      type: FETCH_POSTS_SUCCESS,
      payload: {
        next,
        data,
        page,
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
    isLoading: true,
    errorMessage: '',
  }),
  [FETCH_POSTS_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    next: action.payload.next,
    page: action.payload.page,
    posts: action.payload.data,
    errorMessage: '',
  }),
  [FETCH_POSTS_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    isEnd: false,
    errorMessage: action.payload
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  page: 0,
  isLoading: false,
  posts: [],
  errorMessage: '',
  next: '',
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
