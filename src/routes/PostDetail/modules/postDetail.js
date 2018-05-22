import axios from 'axios'
import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  FETCH_EVENT_REQUEST,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAILURE,
} from './constants'
export * from './constants'

// ------------------------------------
// Actions
// ------------------------------------

const parseAcf = (dataAcf = {}) => {
  const {
    date,
    end_date,
    location,
    ...restAcf
  } = dataAcf
  return {
    ...date && { startDate: parseInt(date) * 1000 },
    // eslint-disable-next-line
    ...end_date && { endDate: parseInt(end_date) * 1000 },
    ...location && {
      location: {
        address: location.address,
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng)
      },
    },
    ...restAcf
  }
}

export const fetchPost = (id) => async (dispatch, getState) => {
  dispatch({
    type: FETCH_POST_REQUEST,
  })
  try {
    const { data } = await axios.get(`/posts/${id}`)

    dispatch({
      type: FETCH_POST_SUCCESS,
      payload: {
        id,
        acf: parseAcf(data.acf),
        image: data.extensions['chelpis-cms'].image[0].value,
        author: {
          name: data.author.name,
          avatarUrl: data.extensions['chelpis-cms'].avatar[0].value,
        },
        categories: data.categories,
        content: data.extensions['chelpis-cms'].content[0].value,
        date: data.date,
        title: data.title.rendered,
        isCollected: data.isCollected,
      }
    })
    // if (data.categories.includes('event')) {
    //   await fetchEvent(id)(dispatch)
    // }
  } catch (error) {
    console.log(error)
    dispatch({
      type: FETCH_POST_FAILURE,
      payload: error.message
    })
  }
}

export const fetchEvent = (eventId) => async (dispatch) => {
  dispatch({ type: FETCH_EVENT_REQUEST })
  try {
    const {
      data: {
        isRegistered,
        checkPoints,
        attendees
      }
    } = await axios.get(`/events/${eventId}`)
    dispatch({
      type: FETCH_EVENT_SUCCESS,
      payload: {
        eventId,
        isRegistered,
        attendees,
        checkPoints: (checkPoints || []).map(item => ({ ...item, value: item.id })),
      }
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: FETCH_EVENT_FAILURE,
      payload: error.message
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_POST_REQUEST]: (state, action) => {
    return {
      ...state,
      ...initialState,
      isLoading: true,
      errorMessage: '',
    }
  },
  [FETCH_POST_SUCCESS]: (state, action) => {
    const {
      id,
      title,
      content,
      image,
      acf,
      date,
      author,
      categories,
      isCollected,
    } = action.payload
    return {
      ...state,
      isLoading: false,
      id,
      title,
      content,
      image,
      acf,
      date,
      author,
      categories,
      isCollected,
      errorMessage: ''
    }
  },
  [FETCH_POST_FAILURE]: (state, action) => ({
    ...state,
    ...initialState,
    isLoading: false,
    errorMessage: action.payload
  }),
  [FETCH_EVENT_REQUEST]: (state, action) => ({
    ...state,
    isEventLoading: true,
    isRegistered: true,
    checkPoints: [],
    attendees: []
  }),
  [FETCH_EVENT_SUCCESS]: (state, action) => ({
    ...state,
    isEventLoading: false,
    isRegistered: action.payload.isRegistered,
    checkPoints: action.payload.checkPoints,
    attendees: action.payload.attendees
  }),
  [FETCH_EVENT_FAILURE]: (state, action) => ({
    ...state,
    isEventLoading: false,
    errorMessage: action.payload
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  id: '',
  title: '',
  content: '',
  date: null,
  author: {
    name: '',
    avatarUrl: null,
  },
  image: null,
  acf: {
  },
  categories: [],
  isLoading: true,
  isEventLoading: true,
  errorMessage: '',
  checkPoints: [],
  attendees: []
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
