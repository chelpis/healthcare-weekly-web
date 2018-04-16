import { createMuiTheme } from 'material-ui/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00a0e9',
      contrastText: 'white'
    }
  },
  myVariable: {
    globalBackground: 'whitesmoke',
    sideNavWidth: 250
  }
})

export default theme
