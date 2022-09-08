import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { screen, mobile, micro } from '../responsive'
import {GiHamburgerMenu} from 'react-icons/gi'

const Container = styled.div`
  background: #51e2f5;
  height: 140px;
  border-bottom: 4px solid #9df9ef;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 350px;
  ${mobile({ justifyContent: 'center' })};
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 8;
  ${mobile({ display: 'none' })};
`
const Mobile = styled.div`
  border: 2px solid black;
  padding: 2px;
  border-radius: 15%;
  display: flex;
  align-items: center;
  cursor: pointer;
  display: none;
  ${mobile({ display: 'block' })};
  height: 15px;
  &:hover {
    color: whitesmoke;
    border: 2px solid whitesmoke;
  }
`
const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #9df9ef;
  background-color: #51e2f5;
  position: absolute;
  top: 90px;
  width: 350px;
  text-align: center;
`
const Item = styled.a`
  margin-right: 16px;
  cursor: pointer;
  border-radius: 15px;
  padding: 7px;
  align-self: center;
  color: inherit;
  text-decoration: none;
  color: whitesmoke;
  font-size: 18px;

  &:hover{
    background-color: #9df9ef;
    color: black;
  }
`
const User = styled.div`
flex: 1;
${mobile({ display: 'none' })};
`
const Something = styled.div`
flex: 1;
${mobile({ display: 'none' })};
`

const Navbar = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [ open, setOpen ] = React.useState(false)
  return (
    <Container>
      {
        currentUser && <Something></Something>
      }
      
      <Wrapper>
        <Link to='/' style={{textDecoration: 'none'}}><Item>Home</Item></Link>
        <Link to='/postagens' style={{textDecoration: 'none'}}><Item>Postagens</Item></Link>
        <Link to='/tunel' style={{textDecoration: 'none'}}><Item>Túnel do tempo</Item></Link>
        <Link to='/contato' style={{textDecoration: 'none'}}><Item>a AFPOC</Item></Link>
        <Link to='/login' style={{textDecoration: 'none'}}><Item>Login</Item></Link>
      </Wrapper>
      <Mobile onClick={(e) => setOpen(!open)}>
        <GiHamburgerMenu/>
      </Mobile>
      {
        open && (
          <MobileMenu onClick={(e) => setOpen(!open)}>
        <Link to='/' style={{textDecoration: 'none'}}><Item>Home</Item></Link>
        <Link to='/postagens' style={{textDecoration: 'none'}}><Item>Postagens</Item></Link>
        <Link to='/tunel' style={{textDecoration: 'none'}}><Item>Túnel do tempo</Item></Link>
        <Link to='/login' style={{textDecoration: 'none'}}><Item>Contato</Item></Link>
        <Link to='/login' style={{textDecoration: 'none'}}><Item>Login</Item></Link>
          </MobileMenu>
        )
      }
      {
        currentUser && (
          <User>
        <span style={{background: 'teal', color: 'white', padding: '5px', borderRadius: '12px'}}>
          { currentUser?.username }
        </span>
      </User>
        )
      }
    </Container>
  )
}

export default Navbar