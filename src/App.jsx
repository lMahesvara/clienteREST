import GlobalStyle from './styles/global'
import styled from 'styled-components'
import Form from './components/Form.jsx'
import Grid from './components/Grid.jsx'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const Title = styled.h2``

function App() {
  const [productos, setProductos] = useState([])
  const [onEdit, setOnEdit] = useState(null)

  const getProductos = async () => {
    try {
      const res = await axios.get('http://localhost:8080')
      setProductos(res.data.sort((a, b) => (a.nombre > b.nombre ? 1 : -1)))
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    getProductos()
  }, [setProductos])

  return (
    <>
      <Container>
        <Title>Productos</Title>
        <Form
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          getProductos={getProductos}
        />
        <Grid
          setOnEdit={setOnEdit}
          productos={productos}
          setProductos={setProductos}
        />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
      <GlobalStyle />
    </>
  )
}

export default App
