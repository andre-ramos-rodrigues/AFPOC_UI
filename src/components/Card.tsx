import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { screen, mobile, micro } from '../responsive'


const Container = styled.div`
  height: 430px;
  width: 380px;
  border-radius: 15px;
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  min-width: 260px;
`
const Wrapper = styled.div`
  
`
const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`
const Photo = styled.img`
  width: 100%;
  height: 240px;
  border: none;
  margin-bottom: 15px;
  background-color: whitesmoke;
  border-radius: 12px;
  background-size: cover;
`
const Title = styled.span`
  font-size: 22px;
  font-weight: 500;
`
const Text = styled.p`
  text-align: justify;
  height: 70px;
`
const Info = styled.p`
  display: flex;
  justify-content: space-around;
  margin-top: 6px;
  ${mobile({ marginTop: '3px' })};
`
const Autor = styled.p`
  font-size: 16px;
  font-weight: 400;
  background-color: teal;
  color: white;
  padding: 5px;
  border-radius: 15px;
  ${mobile({ fontSize: '12px' })};
`
const Data = styled.p`
  font-size: 16px;
  font-weight: 400;
  background-color: tomato;
  color: white;
  padding: 5px;
  border-radius: 15px;
  ${mobile({ fontSize: '12px' })};
`

interface ICard {
  titulo?: string, 
  texto?: string, 
  resumo?: string,
  img?: string, 
  url?: string,
  autor?: string,
  data?: string,
  id?: string,
}

const Card = ({ titulo, resumo, img, autor, data, id, url } : ICard) => {
  const cloudName = process.env.REACT_APP_CLOUDNAME
  //const site = process.env.REACT_APP_API_URL

  return (
    <Container>
      <Link to={`/${url}/${id}`} style={{ textDecoration: "none", color: 'inherit' }}>
        {
          img && <Photo src={`https://res.cloudinary.com/${cloudName}/image/upload/v1662744035/${img}.jpg`} alt=" "/>
        }
        <TextArea>
          <Title>{titulo}</Title>
          <Text>{resumo}</Text>
          <Info>
            <Autor>{autor}</Autor>
            <Data>{data}</Data>
          </Info>
        </TextArea>
      </Link>
    </Container>
  )
}

export default Card