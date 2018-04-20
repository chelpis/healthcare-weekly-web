import { createMuiTheme } from 'material-ui/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00a0e9',
      contrastText: 'white'
    }
  },
  typography: {
    fontSize: 16,
    title: {
      lineHeight: '1.3em'
    }
  },
  myVariable: {
    globalBackground: 'white',
    sideNavWidth: 250
  }
})

export default theme
