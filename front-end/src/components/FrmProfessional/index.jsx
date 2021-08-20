import React, { useEffect, useState } from 'react'
import { Link, Redirect} from 'react-router-dom'
import 'materialize-css'
import { Row, Col, Table, Button, Icon, TextInput, Select } from 'react-materialize'
import Bartop from '../Bartop'
import API from '../../services/api'

function FrmProfessional(props) {

    const [redirect, setRedirect] = useState(false)
    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [tipoProfissional, setTipoProfissional] = useState(1)
    const [situacao, setSituacao] = useState(true)
    const [listTypeProfessional, setListTypeProfessional] = useState([])
    const [operation, setOperation] = useState('insert')

    useEffect(() => {

        if(props.match.params.id){
            API.get(`/professional/${props.match.params.id}`)
                .then((res) => {
                const pro = res['data'][0]
                setId(pro.id)
                setNome(pro.nome)
                setTelefone(pro.telefone)
                setEmail(pro.email)
                setTipoProfissional(pro.tipoProfissional.id)
                setSituacao(pro.situacao)
            })
            setOperation('update')
        }

        API.get('/type/professional')
            .then((res) => {
            let listType = listTypeProfessional
            listType = res['data']
            setListTypeProfessional(listType)
        })

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            nome,
            telefone,
            email,
            tipo_de_professional: tipoProfissional,
            situacao
        }

        if(operation == 'insert') {
            try {
                if(nome == '' || nome == null){
                    alert('Por favor informe um nome para o profissional.')
                    return null
                } else if (email == '' || email == null) {
                    alert('Por favor informe um e-mail para o profissional.')
                    return null
                }

                const res = await API.post('/professional', data)
                
                if(res.status >= 200 && res.status <= 400){
                    alert('Registro adicionado com sucesso.')
                    setRedirect(true)
                } else {
                    alert('Ocorreu um erro ao realizar o registro.') 
                }

            } catch (error) {
                alert('Ocorreu um erro ao realizar o registro.')
            }
        } else {
            try {
                if(nome == '' || nome == null){
                    alert('Por favor informe um nome para o profissional.')
                    return null
                } else if (email == '' || email == null) {
                    alert('Por favor informe um e-mail para o profissional.')
                    return null
                }

                const res = await API.put(`/professional/${id}`, data)
                
                if(res.status >= 200 && res.status <= 400){
                    alert('Registro atualizado com sucesso.')
                    setRedirect(true)
                } else {
                    alert('Ocorreu um erro ao realizar o registro.') 
                }

            } catch (error) {
                alert('Ocorreu um erro ao realizar o registro.')
            }
        }
    }

    return (
        <>
            {redirect ? <Redirect to="/"/> : null}
            <Bartop/>
            <Row>
                <Col l={12}>
                    <h4 style={{display: 'flex', justifyContent: 'space-between'}}>
                        Professional {` - ${nome}`}
                        <Link to="/">
                            <Button
                                node="button"
                                style={{
                                    marginRight: '10px'
                                }}
                                waves="light">
                                    <Icon left>arrow_left</Icon>
                                    Voltar
                            </Button>
                        </Link>
                    </h4>
                    <Row>
                        <Col l={12} m={12}>
                            <TextInput
                             type="text"
                             id="nome"
                             label="Nome"
                             name="nome"
                             onChange={e => setNome(e.target.value)}
                             value={nome}
                             l={12}/>
                        </Col>
                        <Col l={12} m={12}>
                            <TextInput
                             id="telefone"
                             label="Telefone"
                             name="telefone"
                             onChange={e => setTelefone(e.target.value)}
                             value={telefone}
                             l={12}/>
                        </Col>
                        <Col l={12}>
                            <TextInput
                             id="email"
                             email
                             label="E-mail"
                             name="email"
                             onChange={e => setEmail(e.target.value)}
                             value={email}
                             validate
                             l={12}/>
                        </Col>
                        <Col l={12} m={12}>
                        <Select
                            id="tipo"
                            label="Tipo Profissional"
                            multiple={false}
                            l={12}
                            options={{
                                classes: '',
                                dropdownOptions: {
                                alignment: 'left',
                                autoTrigger: true,
                                closeOnClick: true,
                                constrainWidth: true,
                                coverTrigger: true,
                                hover: false,
                                inDuration: 150,
                                onCloseEnd: null,
                                onCloseStart: null,
                                onOpenEnd: null,
                                onOpenStart: null,
                                outDuration: 250
                                }
                            }}
                            onChange={e => setTipoProfissional(e.target.value)}
                            value={tipoProfissional}
                            >
                            {listTypeProfessional?.map((data, i) => (
                                <option key={i} value={data.id}>
                                    {data.descricao}
                                </option>
                            ))}
                            </Select>
                        </Col>

                        <Col l={12} m={12}>
                        <Select
                            id="situacao"
                            label="Situação"
                            multiple={false}
                            l={12}
                            options={{
                                classes: '',
                                dropdownOptions: {
                                alignment: 'left',
                                autoTrigger: true,
                                closeOnClick: true,
                                constrainWidth: true,
                                coverTrigger: true,
                                hover: false,
                                inDuration: 150,
                                onCloseEnd: null,
                                onCloseStart: null,
                                onOpenEnd: null,
                                onOpenStart: null,
                                outDuration: 250
                                }
                            }}
                            onChange={e => setSituacao(e.target.value)}
                            value={situacao}
                            >
                            <option value={true}>
                                Ativo
                            </option>
                            <option value={false}>
                                Desativado
                            </option>
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                node="button"
                                large
                                onClick={e => handleSubmit(e)}>
                                Salvar
                            </Button>
                        </Col>
                        <Col>
                            <Link to="/">
                            <Button
                                node="button"
                                large>
                                Cancelar
                            </Button>
                            </Link>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default FrmProfessional
