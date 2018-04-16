import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class ErrorMessage extends PureComponent {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    return (
      <div style={styles.container}>
        {this.props.children}
      </div>
    )
  }
}

const styles = {
  container: {
    marginTop: 20,
    color: '#a94442',
    backgroundColor: '#f2dede',
    padding: '15px',
    marginBottom: '20px',
    border: '1px solid #ebccd1',
    borderRadius: '4px',
    maxHeight: 200,
    overflowY: 'auto',
    overflowX: 'auto',
  }
}
