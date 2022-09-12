import React from 'react'
import styled from 'styled-components'
import { screen, mobile, micro } from '../responsive'

const Container = styled.div`
  display: flex;
  width: 100%;
`
const Left = styled.div`
  flex: 3;
  text-align: center;
  display: flex;
  flex-direction: column;
`
const Line = styled.div`
  border-left: 3px solid lightblue;
  height: 270px;
  ${mobile({ display: 'none' })};
`
const Right = styled.div`
  flex: 3;
  text-align: center;
  ${mobile({ display: 'none' })};
`
const Title = styled.span`
  margin-bottom: 30px;
  font-size: 26px;
  font-weight: 600;
`
const Bio = styled.span`
  font-size: 18px;
  font-weight: 400;
`

const QuemSomos = () => {
  return (
    <Container>
      <Left>
        <Title>Associação Felicidade</Title>
        <Bio>A associação é responsável por cuidar da atenção aos idosos e ...
      </Bio>
      </Left>
      <Line/>
      <Right>
        A associação é responsável por cuidar da atenção aos idosos e ...
      </Right>
      
      
    </Container>
  )
}

export default QuemSomos