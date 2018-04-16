import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Card, { CardContent } from 'material-ui/Card'
import moment from 'moment'

export default class PostDetail extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  render () {
    const data = [
      {
        type: '外人入侵',
        studentId: '10103',
        name: '張小雅',
        description: '於綜合教育大樓 105 教室前',
        time: (new Date()).getTime()
      }
    ]
    return (
      <div>
        <h1>緊急通知</h1>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>類別</TableCell>
                <TableCell>學號</TableCell>
                <TableCell>姓名</TableCell>
                <TableCell>狀態</TableCell>
                <TableCell>時間</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => {
                return (
                  <TableRow key={index} >
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.studentId}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{moment(item.time).format('MMMM Do, H:mm:ss')}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
        <div style={{ marginTop: 20, marginBottom: 20, display: 'flex' }}>
          <FormControl style={{ width: 200, marginRight: 20 }}>
            <InputLabel htmlFor='name-readonly'>年級</InputLabel>
            <Select value={''}>
              <MenuItem value=''>
                <em>請選擇</em>
              </MenuItem>
              <MenuItem value={10}>大班</MenuItem>
              <MenuItem value={20}>中班</MenuItem>
              <MenuItem value={30}>小班</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ width: 200, marginRight: 20 }}>
            <InputLabel htmlFor='name-readonly'>班級</InputLabel>
            <Select value={''}>
              <MenuItem value=''>
                <em>請選擇</em>
              </MenuItem>
              <MenuItem value={10}>紅</MenuItem>
              <MenuItem value={20}>黃</MenuItem>
              <MenuItem value={30}>藍</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant='raised'
            color='primary'
          >
            搜尋
          </Button>
        </div>
        <h1>學生清單</h1>
        <Grid container>
          {
            [...Array(10).keys()].map((item, index) => (
              <Grid
                key={index}
                item
                xs={3}
                sm={4}
              >
                <Card>
                  <CardContent>
                    學生
                  </CardContent>
                </Card>
              </Grid>
            ))
          }

        </Grid>
      </div>
    )
  }
}
