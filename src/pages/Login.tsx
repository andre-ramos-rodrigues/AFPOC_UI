import React, { useState } from 'react'
import styled from 'styled-components'
import {login, logoff} from '../db/login'
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess, logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";


const Container = styled.div`
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  height: 74vh;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-width: 350px;
`
const Wrapper = styled.div`
  border: 4px solid #9df9ef;
  border-radius: 15px;
  height: 500px;
  width: 400px;
  padding: 15px;
`
const MainTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 40px;
`
const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 5px;
`
const Input = styled.input`
  border: none;
  width: 95%;
  min-width: 100px;
  height: 35px;
  margin-bottom: 30px;
  font-size: 21px;
  padding: 8px;
`
const Show = styled.div`
 display: flex;
align-items: center;
`
const Radio = styled.input`
margin-left: 15px;
`
const Button = styled.button`
  margin-top: 50px;
  border: none;
  padding: 12px;
  border-radius: 5px;
  background-color: #51e2f5;
  cursor: pointer;
  width: 120px;
  font-weight: 600;
`

const Login = () => {
  const [showPW, setShowPW] = React.useState(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch()


  const handleSubmit = async() => {
    dispatch(loginStart())
    const loggedUser = {
      username, password
    }
    try{
      login(loggedUser)
      dispatch(loginSuccess(loggedUser))
    } catch(err){
      dispatch(loginFailure())
    }
  }

  const handleLogout = (event: React.MouseEvent): void => {
    event.preventDefault()
    dispatch(logout())
    logoff()
  }

  return (
    <>
    <Container>
      <Wrapper>
        <MainTitle>{currentUser ? 'Logout' : 'Login'}</MainTitle>
        {
          currentUser ? (
            <>
            <div>Usuário já logado. Para deslogar clique no botão abaixo.</div>
            <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
            <Title>Usuário</Title>
            <Input type='text' onChange={e => setUsername(e.target.value)}/>
            <Title>Senha</Title>
            <Input type={showPW ? 'text' : 'password'} onChange={e => setPassword(e.target.value)}/>
            <Show>exibir senha <Radio type='checkbox' onClick={() => setShowPW(!showPW)} /></Show>
            <Button onClick={handleSubmit}>Enviar</Button>
            </>
          )
        }
      </Wrapper>
    </Container>
    </>
    
  )
}


export default Login