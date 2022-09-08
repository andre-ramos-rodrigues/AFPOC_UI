import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  min-height: 70vh;
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
  margin-bottom: 5px;
  font-size: 21px;
  padding: 8px;
`
const TxtArea = styled.textarea`
  border: none;
  width: 95%;
  min-width: 100px;
  font-size: 16px;
  padding: 8px;
  margin-bottom: 5px;
`
const Button = styled.button`
  border: none;
  padding: 12px;
  border-radius: 5px;
  background-color: #51e2f5;
  cursor: pointer;
  width: 120px;
  font-weight: 600;
`
const Preview = styled.img`
  width: 380px;
  height: 300px;
  border-radius: 12px;
  margin: 15px 0;
`

interface IPost {
  titulo: string;
  resumo: string;
  texto: string
}

const Postar = () => {
  const [inputs, setInputs] = React.useState<IPost | any>({});
  const [img, setImg] = React.useState<any>(undefined)
  const [file,  setFile] = React.useState("")
  const navigate = useNavigate()

  const handleChange = (e: any) => {
    setInputs((prev : any) => {
      return { ...prev, [e.target.name]: e.target.value}
    })
  }

  const handleImg = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("Select a file");
      return;
    } else {
      setImg(e.target.files[0])
      setFile(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleSubmit = async() => {
    const newPost = { 
      ...inputs
    }
    const data =new FormData();
    // creating the img url
    const filename = Date.now() + img.name;
    data.append("name", filename);
    data.append("file", img);
    // saving the img url in the newPost that will be sent to mongodb 
    newPost.img = filename;
    try {
      await axios.post('http://localhost:5000/api/upload', data)
      const res = await axios.post('http://localhost:5000/post', newPost, {withCredentials: true})

        res.status===200 && console.log("postado com sucesso")
        res.status===200 && navigate('/postagens')
    } catch(err) {
        console.log(err)
    }
  }


  return (
    <Container>
      {
        img && <Preview alt='a'src={file}/>
      }
      <Wrapper>
        <MainTitle>Escreva seu post</MainTitle>
        <Title >Título</Title>
        <Input type='text' name='titulo' onChange={handleChange}/>
        <Title>Um breve resumo</Title>
        <TxtArea name='resumo' style={{height: '50px'}} onChange={handleChange}/>
        <Title>O texto</Title>
        <TxtArea name='texto' style={{height: '100px'}} onChange={handleChange}/>
        <Input name='file' style={{fontSize: '12px'}} type='file' accept='image/*' 
        onChange={handleImg}/>
        <Button onClick={handleSubmit}>Postar</Button>
      </Wrapper>
    </Container>
  )
}

export default Postar