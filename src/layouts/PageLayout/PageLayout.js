import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import withWidth from 'material-ui/utils/withWidth'
import compose from 'recompose/compose'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  content: {
    position: 'absolute',
    flexGrow: 1,
    paddingTop: 64,
    paddingLeft: 20,
    paddingRight: 20,
  },
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
          <Toolbar>
            <Typography variant='title' color='inherit'>
              Healthcare Weekly
            </Typography>
          </Toolbar>
        </AppBar>
        {children}
      </div>
    )
  }
}

export default compose(withStyles(styles), withWidth())(PageLayout)
