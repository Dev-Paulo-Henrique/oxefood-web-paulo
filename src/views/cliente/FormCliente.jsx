import React, { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import axios from "axios";
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function FormCliente() {

    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const { state } = useLocation();
    const [idCliente, setIdCliente] = useState();
    const [enderecos, setEnderecos] = useState([]);
    const [listaEndereco, setListaEndereco] = useState([]);
    const [novoEndereco, setNovoEndereco] = useState({
        rua: '',
        numero: '',
        bairro: '',
        cep: '',
        cidade: '',
        estado: '',
        complemento: ''
    });
    // const [idCategoria, setIdCategoria] = useState();


    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/cliente/" + state.id)
                .then((response) => {
                    const data = response.data.dataNascimento.split('-');
                    const formattedNascimento = [data[2], data[1], data[0]].join("/")
                    setDataNascimento(formattedNascimento)
                    setIdCliente(response.data.id)
                    setNome(response.data.nome)
                    setCpf(response.data.cpf)
                    setFoneCelular(response.data.foneCelular)
                    setFoneFixo(response.data.foneFixo)
                    setEnderecos(response.data.enderecos || [])
                    setListaEndereco(response.data.enderecos)
                })
        }
    }, [state])

    function deletarEndereco(id) {
        axios.delete("http://localhost:8080/api/cliente/endereco/" + id)
            .then((response) => { notifySuccess('Endereço deletado com sucesso.') })
            .catch((error) => {
                if (error.response.data.errors != undefined) {
                    for (let i = 0; i < error.response.data.errors.length; i++) {
                        notifyError(error.response.data.errors[i].defaultMessage)
                    }
                } else {
                    notifyError(error.response.data.message)
                }
            })
            window.location.reload()
        setListaEndereco([...enderecos]);
    }

    function adicionarEndereco() {
        axios.post("http://localhost:8080/api/cliente/endereco/" + state.id, novoEndereco)
            .then((response) => { notifySuccess('Endereço adicionado com sucesso.') })
            .catch((error) => {
                if (error.response.data.errors != undefined) {
                    for (let i = 0; i < error.response.data.errors.length; i++) {
                        notifyError(error.response.data.errors[i].defaultMessage)
                    }
                } else {
                    notifyError(error.response.data.message)
                }
            })
            window.location.reload()
        setListaEndereco([...enderecos, novoEndereco]);
    }


    function salvar() {
        console.log([...enderecos, novoEndereco])

        let clienteRequest = {
            enderecos: [...enderecos, novoEndereco],
            nome: nome,
            cpf: cpf,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo
        }

        // console.log(clienteRequest)

        if (idCliente != null) { //Alteração:
            axios.put("http://localhost:8080/api/cliente/" + idCliente, clienteRequest)
                .then((response) => { console.log('Cliente alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um cliente.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/cliente", clienteRequest)
                .then((response) => { notifySuccess('Cliente cadastrado com sucesso.') })
                .catch((error) => {
                    if (error.response.data.errors != undefined) {
                        for (let i = 0; i < error.response.data.errors.length; i++) {
                            notifyError(error.response.data.errors[i].defaultMessage)
                        }
                    } else {
                        notifyError(error.response.data.message)
                    }
                })
        }

    }


    return (

        <div>
            <MenuSistema tela={'cliente'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {idCliente === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idCliente != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>

                            {idCliente != undefined && (
                                <>
                                    <Form.Group widths='equal'>
                                        {/* Campos para novo endereço */}
                                        <Form.Input
                                            fluid
                                            label='Rua'
                                            value={novoEndereco.rua}
                                            onChange={e => setNovoEndereco({ ...novoEndereco, rua: e.target.value })}
                                        />
                                        <Form.Input
                                            fluid
                                            label='Número'
                                            value={novoEndereco.numero}
                                            onChange={e => setNovoEndereco({ ...novoEndereco, numero: e.target.value })}
                                        />
                                    </Form.Group>

                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            fluid
                                            label='Bairro'
                                            value={novoEndereco.bairro}
                                            onChange={e => setNovoEndereco({ ...novoEndereco, bairro: e.target.value })}
                                        />
                                        <Form.Input
                                            fluid
                                            label='CEP'
                                            value={novoEndereco.cep}
                                            onChange={e => setNovoEndereco({ ...novoEndereco, cep: e.target.value })}
                                        />
                                    </Form.Group>

                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            fluid
                                            label='Cidade'
                                            value={novoEndereco.cidade}
                                            onChange={e => setNovoEndereco({ ...novoEndereco, cidade: e.target.value })}
                                        />
                                        <Form.Input
                                            fluid
                                            label='Estado'
                                            value={novoEndereco.estado}
                                            onChange={e => setNovoEndereco({ ...novoEndereco, estado: e.target.value })}
                                        />
                                    </Form.Group>

                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            fluid
                                            label='Complemento'
                                            value={novoEndereco.complemento}
                                            onChange={e => setNovoEndereco({ ...novoEndereco, complemento: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Button onClick={adicionarEndereco} primary>Adicionar Endereço</Button>
                                    <Divider />
                                </>
                            )}



                            {listaEndereco.map((endereco, i) => {
                                return (
                                    <div key={i} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                                        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Endereço {i + 1}</h3>
                                        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                                            <li><strong>ID:</strong> {endereco.id}</li>
                                            <li><strong>Rua:</strong> {endereco.rua}</li>
                                            <li><strong>Número:</strong> {endereco.numero}</li>
                                            <li><strong>Bairro:</strong> {endereco.bairro}</li>
                                            <li><strong>CEP:</strong> {endereco.cep}</li>
                                            <li><strong>Cidade:</strong> {endereco.cidade}</li>
                                            <li><strong>Estado:</strong> {endereco.estado}</li>
                                            <li><strong>Complemento:</strong> {endereco.complemento}</li>
                                        </ul>
                                        <button onClick={() => deletarEndereco(endereco.id)}>Deletar</button>
                                    </div>
                                );
                            })}


                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Data Nascimento'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                <Link to={'/list-cliente'}>Voltar</Link>
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );

}
