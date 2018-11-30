import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'
import posed from 'react-pose'
import styled from 'styled-components'

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

const CircleStyled = styled(Circle)`
  background-image: url(${({ img }) => img});
  background-size: cover;
  width: 40px;
  height: 40px;
  border-radius: 9999px
`

const CircleImagePose = ({image}) => {
  return(
    <CircleStyled pose={'init'} img={image}/>
  )
}


export default CircleImagePose
