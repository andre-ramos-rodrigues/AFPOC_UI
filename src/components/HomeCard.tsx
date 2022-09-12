import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { screen, mobile, micro } from '../responsive'

const Container = styled.div`
  height: 260px;
  width: 300px;
  border-radius: 15px;
  background-color: whitesmoke;
  padding: 15px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  ${micro({ padding: "0px" })};
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
  min-Width: 280px;
  height: 150px;
  border: none;
  margin-bottom: 5px;
  background-color: whitesmoke;
  border-radius: 12px
`
const Title = styled.span`
  font-size: 18px;
  font-weight: 500;
`
const Text = styled.p`
  text-align: justify;
`

interface ICard {
  titulo?: string, 
  texto?: string, 
  resumo?: string,
  img?: string, 
  autor?: string,
  id?: string,
  url?:string,
  data?: {
    ano: string,
    mes: string,
    dia: string
  }
}

const HomeCard = ({ titulo, resumo, img, autor, data, id, url } : ICard) => {
  const site = process.env.REACT_APP_API_URL
  const cloudName = process.env.REACT_APP_CLOUDNAME
  return (
    <Container>
      <Link to={`/${url}/${id}`} style={{ textDecoration: "none", color: 'inherit' }}>
        {
          img && <Photo src={`https://res.cloudinary.com/${cloudName}/image/upload/v1662744035/${img}.jpg`} alt=" "/>
        }
        <TextArea>
          <Title>{titulo}</Title>
          <Text>{resumo}</Text>
        </TextArea>
      </Link>
    </Container>
  )
}

export default HomeCard