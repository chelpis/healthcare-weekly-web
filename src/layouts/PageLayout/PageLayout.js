import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import withWidth from 'material-ui/utils/withWidth'
import compose from 'recompose/compose'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  Toolbar: {
    maxWidth: 840,
    width: '100%',
    margin: '0 auto',
  },
  content: {
    position: 'absolute',
    flexGrow: 1,
    paddingTop: 64,
    width: '100%'
  },
  main: {
    maxWidth: 740,
    margin: '0 auto',
  }
})

class PageLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.any,
  }

  render () {
    const {
        children,
        classes,
      } = this.props
    return (
      <div className={classes.content}>
        <AppBar>
          <Toolbar classes={{
            root: classes.Toolbar
          }}
          >
            <Typography variant='title' color='inherit'>
              Healthcare Weekly
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.main}>
          {children}
        </div>
      </div>
    )
  }
}

export default compose(withStyles(styles), withWidth())(PageLayout)
