import React from 'react'
import Card from '../components/Card'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { screen, mobile, micro } from '../responsive'
//import { format } from 'timeago.js';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  min-height: 74vh;
  width: 100vw;
  min-width: 350px;
  justify-content: center;
`
const Title = styled.span`
  font-size: 36px;
`
const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px;
  ${mobile({ justifyContent: 'center' })};
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 20px;
`
const Wrapper = styled.div`
  margin: 0px 120px;
  ${mobile({ margin: '5px' })};
`

const Tunel = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [ posts, setPosts] = React.useState<any>([])
  const url = process.env.REACT_APP_API_URL

  React.useEffect(() => {
    const getPosts = async() => {
      const res = await axios.get(`${url}/tunel`)
      setPosts(res.data)
    }
    getPosts()
  }, [url])
  return (
    <Container>
      <Header>
        <Title>Tunel do Tempo</Title>
        {
          currentUser && <Title style={{color: 'white', padding: '1px',backgroundColor: 'teal'}}>
            <Link to='/postar-tunel'
            style={{color: 'inherit', textDecoration: 'none'}}>
            +
            </Link>
          </Title>
        }
      </Header>
      <Wrapper>
      <CardContainer>
        {
          posts?.map((post: any) => (
            <Card key={post._id} url='tunel' id={post._id} titulo={post.titulo} resumo={post.resumo} img={post.img} autor={post.autor} data={post.data?.ano}/>
          ))
        }
      </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Tunel