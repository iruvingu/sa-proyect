import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'
import posed from 'react-pose'
import styled, { keyframes } from 'styled-components'
import { Tooltip } from '@material-ui/core'

const Circle = posed.div({
  hoverable: true,
  pressable: true,
  init: {
    width: '40px',
    height: '40px',
    boxShadow: '0px 0px 0px rgba(0,0,0,0)',
  },
  hover: {
    width: '50px',
    height: '50px',
    boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
  },
  press: {
    width: '55px',
    height: '55px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
  }
})

const Circle2 = posed.div({
  hoverable: true,
  pressable: true,
  init: {
    width: '50px',
    height: '50px',
    boxShadow: '0px 0px 0px rgba(0,0,0,0)',
  },
  hover: {
    width: '60px',
    height: '60px',
    boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
  },
  press: {
    width: '65px',
    height: '65px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
  }
})

const Circle3 = posed.div({
  init: {
    width: '3px',
    height: '3px',
    boxShadow: '0px 0px 0px rgba(0,0,0,0)'
  }
})

const CircleStyled = styled(Circle)`
  background-image: url(${({ img }) => img});
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 9999px
`
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const SecondCircleStyled = styled(Circle2)`
  background-image: url(${({ img }) => img});
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 9999px;
  border: 2px solid #121534
  display: inline-block;
  font-size: 1.2rem;
  clip-path: polygon(49% 100%, 100% 24%, 100% 0%, 1% 0%, 0% 25%);
`

const ThirdCircleStyled = styled(Circle3)`
  background-color: #121534;
  width: 3px;
  height: 3px;
  border-radius: 9999px; 
`

export const CircleImagePose = ({image, title}) => {
  return(
    <Tooltip disableFocusListener disableTouchListener title={title} placement="top">
      <CircleStyled pose={'init'} img={image}/>
    </Tooltip>
  )
}

export const SecondCircleImagePose = ({image, title}) => {
  return(
    <Tooltip disableFocusListener disableTouchListener title={title} placement="top">
      <SecondCircleStyled pose={'init'} img={image}/>
    </Tooltip>
  )
}

export const ThirdCirclePose = ({ title }) => {
  return(
   <Tooltip disableFocusListener disableTouchListener title={title} placement="top">
      <ThirdCircleStyled />
   </Tooltip> 
  )
}