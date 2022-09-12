import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Container = styled.div`
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  min-height: 74vh;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-width: 350px;
`
const Wrapper = styled.div`
  border: 4px solid #9df9ef;
  border-radius: 15px;
  height: 600px;
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
const Data = styled.div`
display: flex;
`
const InputData = styled.input`
  border: none;
  width: 120px;
  margin-right: 5px;
  min-width: 100px;
  height: 35px;
  margin-bottom: 8px;
  font-size: 16px;
  padding: 8px;
`

interface IPost {
  titulo: string;
  resumo: string;
  texto: string;
  data: string
}

const PostarTunel = () => {
  const [inputs, setInputs] = React.useState<IPost | any>({});
  const [img, setImg] = React.useState<any>(undefined)
  const [file,  setFile] = React.useState("")
  const [ ano, setAno ] = React.useState("")
  const [ mes, setMes ] = React.useState("")
  const [ dia, setDia ] = React.useState("")
  const { currentUser} = useSelector((state : any) => state.user)

  const navigate = useNavigate()
  const url = process.env.REACT_APP_API_URL

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
      ...inputs, data: {
        ano, mes, dia
      }
    }

    // saving the img locally with multer and sending the url to mongodb
    // const data =new FormData();
    // creating the img url
    // const filename = Date.now() + img.name;
    // data.append("name", filename);
    // data.append("file", img);
    // saving the img url in the newPost that will be sent to mongodb 
    // newPost.img = filename;


    // saving the img on Cloudinary
    const formData = new FormData()
    formData.append("file", img)
    formData.append("api_key", "989846142342293")
    formData.append("upload_preset", "afpoc123")

    try {
      const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/dmqnk9v0d/auto/upload`, formData, {
     headers: { "Content-Type": "multipart/form-data"}
  })
      const storedImg = cloudinaryResponse.data
      console.log(storedImg)
      newPost.img = storedImg.public_id;
      newPost.username = currentUser.username

      //await axios.post(`${url}/api/upload`, formData)
      const res = await axios.post(`${url}/tunel`, newPost, {withCredentials: true})

        res.status===200 && console.log("postado com sucesso")
        res.status===200 && navigate('/tunel')
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
        <MainTitle>Publique no túnel do tempo</MainTitle>
        <Title >Título</Title>
        <Input type='text' name='titulo' onChange={handleChange}/>
        <Title>Um breve resumo</Title>
        <TxtArea name='resumo' style={{height: '50px'}} onChange={handleChange}/>
        <Title>O texto</Title>
        <TxtArea name='texto' style={{height: '100px'}} onChange={handleChange}/>
        <Input name='file' style={{fontSize: '12px'}} type='file' accept='image/*' 
        onChange={handleImg}/>
        <Title>Data original deste evento</Title>
        <Data>
        <InputData name='ano' placeholder='ex: 2015' onChange={(e) => setAno(e.target.value)}/>
        <InputData name='mes' placeholder='ex: fevereiro' onChange={(e) => setMes(e.target.value)}/>
        <InputData name='dia' placeholder='ex: 20' onChange={(e) => setDia(e.target.value)}/>
        </Data>
        <Button onClick={handleSubmit}>Postar</Button>
      </Wrapper>
    </Container>
  )
}

export default PostarTunel