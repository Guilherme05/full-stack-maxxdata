import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import 'materialize-css'
import { Row, Col, Table, Button, Icon } from 'react-materialize'
import Bartop from '../Bartop'
import FooterBar from '../FooterBar'
import API from '../../services/api'

function Professional(props) {

    const [listProfessional, setListProfessional] = useState([])

    useEffect(() => {
        API.get('/professional')
            .then((res) => {
            let list = listProfessional
            list = res['data']
            setListProfessional(list)
        })
    })

    const handleDelete = async (id) => {
        const res = await API.delete(`/professional/${id}`)
        if(res.status >= 200 || res.status <= 400){
           alert('Registro removido com sucesso.') 
           API.get('/professional')
            .then((res) => {
            let list = listProfessional
            list = res['data']
            setListProfessional(list)
            })
        } else {
            alert('Erro ao remover registro.')
        }
    }

    return (
        <>
            <Bartop/>
            <Row>
                <Col l={12}>
                    <h4 style={{display: 'flex', justifyContent: 'space-between'}}>
                        Lista de Profissionais
                        <Link to="/professional">
                            <Button
                                node="button"
                                style={{
                                    marginRight: '10px'
                                }}
                                waves="light">
                                    <Icon left>add_circle</Icon>
                                    Adicionar
                            </Button>
                        </Link>
                    </h4>
                    <Table>
                        <thead>
                            <tr>
                            <th data-field="name">
                                Nome
                            </th>
                            <th data-field="type">
                                Tipo
                            </th>
                            <th data-field="type">
                                Situação
                            </th>
                            <th data-field="action">
                                Ações
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listProfessional.map((data) => (
                            <tr>
                                <td>{data.nome}</td>
                                <td>{data.tipoProfissional.descricao}</td>
                                <td>{data.situacao ? 'Ativado' : 'Desativado'}</td>
                                <td>
                                    <Link to={`/professional/${data.id}`}>
                                        <Button
                                            style={{marginRight: '10px'}}
                                        >
                                            <Icon center>edit</Icon>
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => handleDelete(data.id)}
                                        style={{marginRight: '10px'}}
                                    >
                                        <Icon center>delete</Icon>
                                    </Button>
                                </td>
                            </tr>
                            ))
                            }
                        </tbody>
                     </Table>
                </Col>
            </Row>
            <FooterBar/>
        </>
    )
}

export default Professional
