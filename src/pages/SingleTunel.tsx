import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useLocation, useNavigate } from "react-router";
import { useSelector } from 'react-redux';
import { screen, mobile, micro } from '../responsive'

const Container = styled.div`
  display: flex;
  background-color: whitesmoke;
  min-height: 70vh;
  width: 100%;
  min-width: 200px;
  display: flex;
  justify-content: center;
`
const Wrapper = styled.div`
  margin: 10px 150px;
  ${screen({ margin: '10px 80px', padding: '15px 50px' })};
  ${mobile({ margin: '10px 30px', padding: '8px 15px'})};
  ${micro({ margin: '10px 20px', padding: '5px 10px'})};
  background-color: white;
  width: 100%;
  padding: 25px 100px;
  display: flex;
  flex-direction: column;
`
const Titulo = styled.span`
  padding-bottom: 10px;
  font-size: 32px;
  font-weight: 600;
  color: gray;
  margin: 30px 0px;
  text-align: justify;
  border-bottom: 3px solid whitesmoke;
  ${micro({ fontSize: '20px' })};
  ${mobile({ fontSize: '26px' })};
`
const Resumo = styled.span`
  font-size: 26px;
  font-weight: 500;
  margin: 25px 0px;
  text-align: justify;
  ${micro({ fontSize: '16px' })};
  ${mobile({ fontSize: '22px' })};
`
const Texto = styled.span`
  font-size: 20px;
  font-weight: 400;
  margin: 12px 0px;
  text-align: justify;
`
const ImgContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const Img = styled.img`
  width: 700px;
  max-height: 600px;
  object-fit: cover;
  border-radius: 3%;
  ${screen({ width: '500px' })};
  ${micro({ width: '200px' })};
  ${mobile({ width: '330px' })};
`
const Quote = styled.span`
  align-self: flex-end;
`
const Autor = styled.span`
  background-color: whitesmoke;
  padding: 7px;
  border-radius: 15px;
  font-weight: 600;
`
const Opcoes = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`
const Button = styled.button`
  padding: 7px;
  font-weight: 600;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`
const InputTitulo = styled.input`
  padding-bottom: 10px;
  font-size: 32px;
  font-weight: 600;
  margin: 30px 0px;
  text-align: justify;
  border: none;
  background-color: whitesmoke;
  ${micro({ fontSize: '20px' })};
  ${mobile({ fontSize: '26px' })};
`
const InputResumo = styled.input`
  font-size: 26px;
  font-weight: 500;
  margin: 25px 0px;
  text-align: justify;
  border: none;
  background-color: whitesmoke;
  ${micro({ fontSize: '16px' })};
  ${mobile({ fontSize: '22px' })};
`
const InputTexto = styled.input`
  font-size: 20px;
  font-weight: 400;
  margin: 12px 0px;
  text-align: justify;
  border: none;
  background-color: whitesmoke;
`

const SinglePost = ( ) => {
  const [post, setPost] = React.useState<any>({})
  const [titular, setTitular] = React.useState<boolean>(false)
  const { currentUser } = useSelector((state: any) => state.user)
  const [edit, setEdit] = React.useState<boolean>(false)
  const navigate = useNavigate()

  const [novoTitulo, setNovoTitulo] = React.useState<any>('')
  const [novoResumo, setNovoResumo] = React.useState<any>('')
  const [novoTexto, setNovoTexto] = React.useState<any>('')

  const location = useLocation()
  console.log(location)
  const path = location.pathname.split('/')[2]
  console.log(path)

  const handleDelete = async() => {
    try {
      await axios.delete(`http://localhost:5000/tunel/${path}`, {
        withCredentials: true
      })
      navigate('/tunel')
    } catch(err) {
      console.log(err)
    }
  }

  const Save = async() => {
    try {
      const res = await axios.put(`http://localhost:5000/tunel/${path}`, {
        titulo: novoTitulo, resumo: novoResumo, texto: novoTexto
      }, {withCredentials: true})

      navigate('/tunel')
    } catch (err) {
      console.log(err)
    }
    setEdit((prev) => !prev)
  }

  React.useEffect(() => {
    const getPosts = async() => {
      const res = await axios.get(`http://localhost:5000/tunel/${path}`)
      setPost(res.data)

      setNovoTitulo(res.data.titulo)
      setNovoResumo(res.data.resumo)
      setNovoTexto(res.data.texto)
    }
    getPosts()
  }, [path])

  React.useEffect(() => {
    if ( currentUser.username === post.autor) {
      setTitular(true)
    } else {
      setTitular(false)
    }
  }, [currentUser, post.autor])

  return (
    <Container>
      <Wrapper>
        {
          titular && (
            <Opcoes>
              {
                edit ? <Button style={{backgroundColor: 'lightBlue'}} onClick={Save}>Salvar</Button> :
                <Button style={{backgroundColor: 'teal'}} onClick={() => setEdit(true)}>Editar</Button>
              }
              <Button style={{backgroundColor: 'tomato'}} onClick={handleDelete}>Excluir</Button>
            </Opcoes>
          )
        }
        <ImgContainer><Img src={`http://localhost:5000/images/${post.img}`} alt=''/></ImgContainer>
        {
          edit ? (
            <InputTitulo type='text' name='titulo' placeholder={post.titulo} value={novoTitulo} onChange={(e) => setNovoTitulo(e.target.value)}/>
          ) : (
            <Titulo>{post.titulo}</Titulo>
          )
        }
        
        <Quote>por: <Autor>{post.autor}</Autor> </Quote>
        {
          edit ? (
        <InputResumo type='text' name='resumo' placeholder={post.resumo} value={novoResumo} onChange={(e) => setNovoResumo(e.target.value)}/>
          ) : (
        <Resumo>{post.resumo}</Resumo>
          )
        }
       
        {
          edit ? (
            <InputTexto type='text' name='texto' placeholder={post.texto} value={novoTexto} onChange={(e) => setNovoTexto(e.target.value)}/>
          ) : (
            <Texto>{post.texto}</Texto>
          )
        }
      </Wrapper>
    </Container>
  )
}

export default SinglePost