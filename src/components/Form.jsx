import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`

const Label = styled.label``

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`

const Form = ({ getProductos, onEdit, setOnEdit }) => {
  const ref = useRef()

  useEffect(() => {
    if (onEdit) {
      const user = ref.current

      user.nombre.value = onEdit.nombre
      user.descripcion.value = onEdit.descripcion
      user.precio.value = onEdit.precio
    }
  }, [onEdit])

  const handleSubmit = async e => {
    e.preventDefault()

    const producto = ref.current

    if (
      !producto.nombre.value ||
      !producto.descripcion.value ||
      !producto.precio.value
    ) {
      return toast.warn('Ingresa todos los campos')
    }

    if (onEdit) {
      await axios
        .put(
          'http://localhost:8080/Restapi2/webresources/producto' + onEdit.id,
          {
            nombre: producto.nombre.value,
            descripcion: producto.descripcion.value,
            precio: producto.precio.value,
          }
        )
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data))
    } else {
      await axios
        .post('http://localhost:8080/Restapi2/webresources/producto', {
          nombre: producto.nombre.value,
          descripcion: producto.descripcion.value,
          precio: producto.precio.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data))
    }

    producto.nombre.value = ''
    producto.descripcion.value = ''
    producto.precio.value = ''

    setOnEdit(null)
    getProductos()
  }

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nombre</Label>
        <Input name='nombre' />
      </InputArea>
      <InputArea>
        <Label>Descripción</Label>
        <Input name='descripcion' />
      </InputArea>
      <InputArea>
        <Label>Precio</Label>
        <Input name='precio' />
      </InputArea>

      <Button type='submit'>Crear</Button>
    </FormContainer>
  )
}

export default Form
