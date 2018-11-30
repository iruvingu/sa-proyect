import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox'
import { connect } from 'react-redux'
import { signIn } from '../../actions'
import PropTypes from 'prop-types'

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 100%;
  variant: contained;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
`;

class LoginContainer extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.auth) {
      this.context.router.history.push('/')
    }
  }

  render = () => {
    return (
      <div
      style={{height: '100vh'}}>
        <Flex
        w={1}
        align='center'
        justify='center'
        style={{height: '100vh'}}
        >
          <Box
          align='center'
          justify='center'>
            <StyledButton onClick={this.props.signIn}>
              Iniciar sesion
            </StyledButton>
          </Box>
        </Flex>
      </div>
      )
  }
}

const mapStatetoProps = ({auth}) => {
  return { auth }
}

export default connect(mapStatetoProps, { signIn })(LoginContainer)

