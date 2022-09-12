import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import HomeCard from '../components/HomeCard'
import QuemSomos from '../components/QuemSomos'
import { screen, mobile, micro } from '../responsive'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  min-height: 74vh;
  min-width: 350px;
  width: 100%;
`
const Wrapper = styled.div`
  margin: 0px 120px;
  ${mobile({ margin: '0px 0px' })};
  ${screen({ margin: '20px 0px' })};
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 20px;
  margin-top: 20px;
`
const Title = styled.span`
  font-size: 36px;
  font-weight: 600;
  ${mobile({ fontSize: "30px", fontWeight: "500" })};
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding:  5px 15px;
`
const Card = styled.div`
  background-color: white;
  height: 350px;
  ${mobile({ minHeight: '280px' })};
  width: 100%;
  border-radius: 12px;
  margin-bottom: 40px;
  position: relative;
`
const SubTitle = styled.span`
  font-size: 22px;
  ${mobile({ fontSize: "18px", fontWeight: "500", left: '22.5%' })};
  ${micro({ left: '10.5%', fontSize: "14px" })};
  font-weight: 500;
  margin: 40px;
  position: absolute;
  top: -50px;
  background-color: #ffa8B6;
  border-radius: 12px;
  padding: 5px;
`
const ContentContainer = styled.div`
  display: flex;
  padding: 15px;
  justify-content: space-between;
  ${screen({ justifyContent: 'center'})};
  margin-top: 30px;
  overflow-x: hidden;
`

const Home = () => {
  const [posts, setPosts] = React.useState<any>([])
  const [tunel, setTunel] = React.useState<any>([])
  const { innerWidth: width } = window
  const [ num, setNum ] = React.useState<any>(4)

  const url = process.env.REACT_APP_API_URL
  
  React.useEffect(() => {
    const getPosts = async() => {
      const res = await axios.get(`${url}/post`)
      setPosts(res.data)
      setPosts((prev : any) => [...prev].sort((a,b) => a.createdAt - b.createdAt))
    }

    const getTunel = async() => {
      const res = await axios.get(`${url}/tunel`)
      setTunel(res.data)
      setTunel((prev : any) => [...prev].sort((a,b) => a.createdAt - b.createdAt))
    }

    getPosts()
    getTunel()
  }, [url])
  
  React.useEffect(() => {
    const handleResize = () => {
      width < 989 && setNum(1)
      width > 990 && setNum(2)
      width > 1322 && setNum(3)
      width > 1650 && setNum(4)
    }

    window.addEventListener('resize', handleResize)
  }, [width])

  return (
    <Container>
      <Header>
        <Title>Home</Title>
      </Header>
      <Wrapper>
      <Content>
      <Card>
        <SubTitle>
          <Link style={{color: 'inherit', textDecoration:'none'}} to='/contato'>Quem somos</Link>
        </SubTitle>
        <ContentContainer>
          <QuemSomos />
        </ContentContainer>
      </Card>
      <Card>
        <SubTitle><Link style={{color: 'inherit', textDecoration:'none'}} to='/postagens'>Postagens recentes</Link></SubTitle>
        <ContentContainer>
          {
            posts && posts.slice(0, num).map((post: any) => (
              <HomeCard url='posts' id={post._id} key={post._id} titulo={post.titulo} resumo={post.resumo} img={post.img} autor={post.autor} />
            ))
          }
        </ContentContainer>
      </Card>
      <Card>
      <SubTitle><Link to='/tunel' style={{color: 'inherit', textDecoration:'none'}}>Túnel do tempo</Link></SubTitle>
        <ContentContainer>
          {
            tunel && tunel.slice(0, num).map((post: any) => (
              <HomeCard url='tunel' id={post._id} key={post._id} titulo={post.titulo} resumo={post.resumo} img={post.img} autor={post.autor} data={post.data} />
            ))
          }
        </ContentContainer>
      </Card>
      </Content>
      </Wrapper>
    </Container>
  )
}

export default Home