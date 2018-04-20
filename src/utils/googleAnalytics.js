import ReactGA from 'react-ga'

import { GOOGLE_TRACKING_ID } from 'app/constants/config'

ReactGA.initialize(GOOGLE_TRACKING_ID)

export function logPageView () {
  ReactGA.set({ page: window.location.pathname + window.location.search })
  ReactGA.pageview(window.location.pathname + window.location.search)
}

export const eventTrackerMiddleware = store => next => action => {
  ReactGA.event({
    category: 'User',
    action: action.type,
    ...action && action.meta && action.meta.label && { label: action.meta.label }
  })
  return next(action)
}
