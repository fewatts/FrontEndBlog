import axios from "axios";

export const api = axios.create({
    baseURL: 'https://blogpessoalu.onrender.com'
})

// ok
export const login = async (url: string, dados: object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

// ok
export const cadastrarUsuario = async (url: string, dados: object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

// ok
export const getAll = async (url: string, setDados: Function, headers: object) => {
    const resposta = await api.get(url, headers)
    setDados(resposta.data)
}

export const getId = async (url: string, setDados: Function, headers: object) => {
    const resposta = await api.get(url, headers)
    setDados(resposta.data)
}

// ok
export const post = async (url: string, dados: object, setDados: Function, headers: object) => {
    const resposta = await api.post(url, dados, headers)
    setDados(resposta.data)
}

export const put = async (url: string, dados: object, setDados: Function, headers: object) => {
    const resposta = await api.put(url, dados, headers)
    setDados(resposta.data)
}

export const deleteId = async(url: any, headers: any) => {
    await api.delete(url, headers)
  }
  