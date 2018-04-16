import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  container: {
    minHeight: '100vh',
    background: theme.myVariable.globalBackground
  }
})

export const CoreLayout = ({ children, classes }) => (
  <div className={classes.container}>
    {children}
  </div>
)
CoreLayout.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
}

export default withStyles(styles)(CoreLayout)
