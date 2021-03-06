import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { MuiThemeProvider } from 'material-ui/styles'
import 'moment/locale/zh-tw'
import axios from 'axios'

import { SERVER_URL } from 'app/constants/config'
import theme from 'app/constants/theme'
import { logPageView } from 'app/utils/googleAnalytics'
axios.defaults.baseURL = SERVER_URL
axios.defaults.withCredentials = true

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider theme={theme}>
          <Router
            history={browserHistory}
            children={this.props.routes}
            onUpdate={logPageView}
          />
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
