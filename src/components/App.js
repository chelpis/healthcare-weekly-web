import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { MuiThemeProvider } from 'material-ui/styles'
import 'moment/locale/zh-tw'
import theme from 'app/constants/theme'

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
          <Router history={browserHistory} children={this.props.routes} />
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
