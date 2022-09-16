import React from 'react'
import styled from 'styled-components'
import { screen, mobile, micro } from '../responsive'

const Container = styled.div`
  display: flex;
  width: 100%;
`
const Main = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  text-align: justify;
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
      <Main>
        <Title>Associação Felicidade do PAM Oswaldo Cruz</Title>
        <Bio>Somos uma associação criada por idosos usuários do centro municipal de saúde no Rio de Janeiro, RJ.
          Nosso objetivo é a promoção de saúde através da socialização, de atividades físicas e psicomotoras, palestras informativas e passeios.
      </Bio>
      </Main>
      
      
    </Container>
  )
}

export default QuemSomos