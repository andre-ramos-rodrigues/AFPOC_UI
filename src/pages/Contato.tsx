import React from 'react'
import styled from 'styled-components'
import { screen, mobile, micro } from '../responsive'
import QuemSomos from '../components/QuemSomos'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  min-height: 74vh;
  min-width: 100%;
`
const Wrapper = styled.div`
  margin: 0px 120px;
  ${mobile({ margin: '10px' })};
  ${screen({ margin: '20px' })};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-top: 20px;
`
const Title = styled.span`
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
  ${mobile({ fontSize: "30px", fontWeight: "500" })};
`
const Card = styled.div`
  background-color: white;
  height: 540px;
  ${mobile({ minHeight: '280px' })};
  width: 100%;
  border-radius: 12px;
  margin-bottom: 40px;
  position: relative;
`

const Contato = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Quem somos</Title>
        <Card>
          
        </Card>
      </Wrapper>
    </Container>
  )
}

export default Contato