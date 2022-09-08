import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: #a28089;
  border-top: 4px solid #ffa8B6;
  height: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  min-width: 350px;
`
const Wrapper = styled.div`
  margin-right: 50px;
  font-size: 13px;
`

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        Programa do idoso (2022)
      </Wrapper>
    </Container>
  )
}

export default Footer