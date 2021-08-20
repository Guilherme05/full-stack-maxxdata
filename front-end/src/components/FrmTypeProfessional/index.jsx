import React, { useEffect, useState } from 'react'
import { Link, Redirect} from 'react-router-dom'
import 'materialize-css'
import { Row, Col, Table, Button, Icon, TextInput, Select } from 'react-materialize'
import Bartop from '../Bartop'
import API from '../../services/api'

function FrmTypeProfessional(props) {

    const [redirect, setRedirect] = useState(false)
    const [id, setId] = useState('')
    const [descricao, setDescricao] = useState('')
    const [situacao, setSituacao] = useState(true)
    const [operation, setOperation] = useState('insert')

    useEffect(() => {

        if(props.match.params.id){
            API.get(`/type/professional/${props.match.params.id}`)
                .then((res) => {
                const pro = res['data']
                setId(pro.id)
                setDescricao(pro.descricao)
                setSituacao(pro.situacao)
            })
            setOperation('update')
        }

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            descricao,
            situacao
        }

        if(operation == 'insert') {
            try {
                if(descricao == '' || descricao == null){
                    alert('Por favor informe a descrição para o profissional.')
                    return null
                }

                const res = await API.post('/type/professional', data)
                
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
                if(descricao == '' || descricao == null){
                    alert('Por favor informe descrição para o profissional.')
                    return null
                }

                const res = await API.put(`/type/professional/${id}`, data)
                
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
            {redirect ? <Redirect to="/type/professional"/> : null}
            <Bartop/>
            <Row>
                <Col l={12}>
                    <h4 style={{display: 'flex', justifyContent: 'space-between'}}>
                        Tipo Profissional {` - ${descricao}`}
                        <Link to="/type/professional">
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
                             id="descricao"
                             label="Descrição"
                             name="descricao"
                             onChange={e => setDescricao(e.target.value)}
                             value={descricao}
                             l={12}/>
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
                            <Link to="/type/professional">
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

export default FrmTypeProfessional
