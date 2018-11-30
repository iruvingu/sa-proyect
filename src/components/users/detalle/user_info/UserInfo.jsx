import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux'

const Button = styled.button`
color: black;
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid blue;
border-radius: 3px;
`

class UserInfo extends Component {

  render() {
    const { worker } = this.props
    return (
      <div style={{
        maxHeight: 500,
        overflow: 'auto',
        padding: 10
      }}>
        <Flex
        style={{height: 'auto',boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
        background: '#DCDCDC',
        borderRadius: '5px'}}
        column
        justify='space-between'
        m={1}
        >
          <Box
          flex
          justify='center'
          align='center'>
            <Flex
            justify='space-around'
            style={{
            minWidth: '100%'
            }}
            >
              <Box style={{
              minWidth: 'auto'
              }}>
                <div>
                  <Avatar alt="Nombre Usuario" src={worker.photoUri} style={{width: 120,height: 120,}} />
                </div>
              </Box>
              <Box 
              m={1}
              column
              style={{
              minWidth: 'auto'
              }}>
                <Box>
                  <div>Name: {worker.name}</div>
                </Box>
                <Box>
                  <div>IMEI: {worker.device.IMEI}</div>
                </Box>
                <Box>
                  <div>Batery: {worker.device.batery}</div>
                </Box>
                <Box>
                  <div>Product: {worker.device.brand}</div>
                </Box>
                <Box>
                  <div>Signal: {worker.device.signal}</div>
                </Box>
              </Box>
            </Flex>
          </Box>
          <Box
          flex
          style={{
          height: 'auto'
          }}
          justify='flex-end'
          >
            <Button>
              Editar
            </Button>
          </Box>
        </Flex>
      </div>
    )
  }
}

const mapStateToProps = ({ worker }) => ({ worker: worker.worker })

export default connect(mapStateToProps, null)(UserInfo)
