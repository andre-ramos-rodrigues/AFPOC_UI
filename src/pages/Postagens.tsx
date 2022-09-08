import React from 'react'
import Card from '../components/Card'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { format } from 'timeago.js';
import { screen, mobile, micro } from '../responsive'

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
  ${mobile({ justifyContent: 'center' })};
  padding: 15px;
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

const Postagens = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [ posts, setPosts] = React.useState<any>([])

  React.useEffect(() => {
    const getPosts = async() => {
      const res = await axios.get('http://localhost:5000/post')
      setPosts(res.data)
    }
    getPosts()
  }, [posts])
  return (
    <Container>
      <Header>
        <Title>Postagens</Title>
        {
          currentUser && <Title style={{color: 'white', padding: '1px',backgroundColor: 'tomato'}}>
            <Link to='/postar'
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
            <Card key={post._id} url='posts' id={post._id} titulo={post.titulo} resumo={post.resumo} img={post.img} autor={post.autor} data={format(post.createdAt)}/>
          ))
        }
      </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Postagens