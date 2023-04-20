import { Button, TextField } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'
import { Tema } from '../../../src/models/Tema'
import { post } from '../../../src/service/Service'

function CadastroTema() {

  const history = useNavigate()
  const [token, setToken] = useLocalStorage('token')

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: ''
  })

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [event.target.name]: event.target.value
    })
  }

  useEffect(() => {
    if(token === '') {
      alert('Não autorizado!')
      history('/login')
    }
  }, [])

  async function onSubmit(event: ChangeEvent<HTMLFormElement>){
    event.preventDefault()

      try {
        await post('/temas', tema, setTema, {
          headers: {
            Authorization: token
          }
        })
        alert('Tema cadastrado!')
      } catch (error) {
        alert('Deu ruim')
      }
  }

  useEffect(() => {
    if(tema.id !== 0) {
      history('/temas')
    }
  }, [tema.id])


  return (
    <>
      <h2>Cadastrar tema</h2>
      <form onSubmit={onSubmit}>
        <TextField
          label='Descrição do tema'
          name='descricao'
          value={tema.descricao}
          onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
        />
        <Button type='submit' variant='contained'>Cadastrar</Button>
      </form>
    </>
  )
}

export default CadastroTema
