import React from 'react'
import PropTypes from 'prop-types'

import SideNav from '../../components/SideNav/'
import imgLogo from '../../assets/logo.png'
import { withStyles } from 'material-ui/styles'
import withWidth from 'material-ui/utils/withWidth'
import compose from 'recompose/compose'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Fontawesome from 'react-fontawesome'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  content: {
    position: 'absolute',
    flexGrow: 1,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
})

class PageLayout extends React.Component {
    static propTypes = {
      children: PropTypes.node,
      classes: PropTypes.any,
    }


    render() {
      const {
        children,
        classes,
      } = this.props
      return (
        <div className={classes.content}>
          <AppBar>
            <Toolbar>
              <Typography variant="title" color="inherit">
                Title
            </Typography>
            </Toolbar>
          </AppBar>
          {children}
        </div>
      )
    }
}

export default compose(withStyles(styles), withWidth())(PageLayout)
