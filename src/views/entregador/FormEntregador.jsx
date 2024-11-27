import React, { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import axios from "axios";
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";

export default function FormEntregador() {
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [enderecoRua, setEnderecoRua] = useState();
    const [enderecoNumero, setEnderecoNumero] = useState();
    const [enderecoBairro, setEnderecoBairro] = useState();
    const [enderecoCep, setEnderecoCep] = useState();
    const [enderecoCidade, setEnderecoCidade] = useState();
    const [enderecoEstado, setEnderecoEstado] = useState();
    const [enderecoComplemento, setEnderecoComplemento] = useState();
    const [ativo, setAtivo] = useState(true);

    const { state } = useLocation();
    const [idEntregador, setIdEntregador] = useState();


    const estados = [
        { key: 'ac', value: 'ac', text: 'Acre' },
        { key: 'al', value: 'al', text: 'Alagoas' },
        { key: 'ap', value: 'ap', text: 'Amapá' },
        { key: 'am', value: 'am', text: 'Amazonas' },
        { key: 'ba', value: 'ba', text: 'Bahia' },
        { key: 'ce', value: 'ce', text: 'Ceará' },
        { key: 'df', value: 'df', text: 'Distrito Federal' },
        { key: 'es', value: 'es', text: 'Espírito Santo' },
        { key: 'go', value: 'go', text: 'Goiás' },
        { key: 'ma', value: 'ma', text: 'Maranhão' },
        { key: 'mt', value: 'mt', text: 'Mato Grosso' },
        { key: 'ms', value: 'ms', text: 'Mato Grosso do Sul' },
        { key: 'mg', value: 'mg', text: 'Minas Gerais' },
        { key: 'pa', value: 'pa', text: 'Pará' },
        { key: 'pb', value: 'pb', text: 'Paraíba' },
        { key: 'pr', value: 'pr', text: 'Paraná' },
        { key: 'pe', value: 'pe', text: 'Pernambuco' },
        { key: 'pi', value: 'pi', text: 'Piauí' },
        { key: 'rj', value: 'rj', text: 'Rio de Janeiro' },
        { key: 'rn', value: 'rn', text: 'Rio Grande do Norte' },
        { key: 'rs', value: 'rs', text: 'Rio Grande do Sul' },
        { key: 'ro', value: 'ro', text: 'Rondônia' },
        { key: 'rr', value: 'rr', text: 'Roraima' },
        { key: 'sc', value: 'sc', text: 'Santa Catarina' },
        { key: 'sp', value: 'sp', text: 'São Paulo' },
        { key: 'se', value: 'se', text: 'Sergipe' },
        { key: 'to', value: 'to', text: 'Tocantins' },
    ];

    function salvar() {

        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qtdEntregasRealizadas: qtdEntregasRealizadas,
            valorFrete: valorFrete,
            enderecoRua: enderecoRua,
            enderecoNumero: enderecoNumero,
            enderecoBairro: enderecoBairro,
            enderecoCep: enderecoCep,
            enderecoCidade: enderecoCidade,
            enderecoEstado: enderecoEstado,
            enderecoComplemento: enderecoComplemento,
            ativo: ativo,
        }

        // console.log(entregadorRequest)

        if (idEntregador != null) { //Alteração:
            axios.put("http://localhost:8080/api/entregador/" + idEntregador, entregadorRequest)
                .then((response) => { console.log('entregador alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um entregador.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/entregador", entregadorRequest)
                .then((response) => { console.log('entregador cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o entregador.') })
        }

    }

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/entregador/" + state.id)
                .then((response) => {
                    const data = response.data.dataNascimento.split('-');
                    const formattedNascimento = [data[2], data[1], data[0]].join("/")
                    setDataNascimento(formattedNascimento)
                    setIdEntregador(response.data.id)
                    setNome(response.data.nome)
                    setCpf(response.data.cpf)
                    setFoneCelular(response.data.foneCelular)
                    setFoneFixo(response.data.foneFixo)
                    setRg(response.data.rg)
                    setQtdEntregasRealizadas(response.data.qtdEntregasRealizadas)
                    setValorFrete(response.data.valorFrete)
                    setEnderecoRua(response.data.enderecoRua)
                    setEnderecoNumero(response.data.enderecoNumero)
                    setEnderecoCep(response.data.enderecoCep)
                    setEnderecoCidade(response.data.enderecoCidade)
                    setEnderecoBairro(response.data.enderecoBairro)
                    // setEnderecoEstado(response.data.enderecoEstado)
                    setEnderecoComplemento(response.data.enderecoComplemento)
                    setAtivo(response.data.ativo)
                    const estado = response.data.enderecoEstado;
                    setEnderecoEstado(estado)

                    const estadoSelecionado = estados.find(estadoItem => estadoItem.text === estado);
                    if (estadoSelecionado) {
                        setEnderecoEstado(estadoSelecionado.key);
                    }
                })
        }
    }, [state])



    return (

        <div>
            <MenuSistema tela={'entregador'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {idEntregador === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idEntregador != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
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
                                    width={6}
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}

                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    width={6}
                                    label='RG'>
                                    <InputMask
                                        required
                                        mask="99.999.999"
                                        value={rg}
                                        onChange={e => setRg(e.target.value)}

                                    />
                                </Form.Input>

                            </Form.Group>
                            <Form.Group widths='equal'>

                                <Form.Input
                                    fluid
                                    label='DT Nascimento'
                                    maxLength="100"
                                    placeholder="Ex: 20/03/1985"
                                    width={6}>
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'
                                    maxLength="100"
                                    width={6}
                                >
                                    <InputMask
                                        required
                                        mask="(99) 99999-9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}

                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    maxLength="100"
                                    width={6}
                                >
                                    <InputMask
                                        required
                                        mask="(99) 99999-9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}

                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    width={4}
                                    label='QTD Entregas Realizadas'
                                    type="number"
                                    value={qtdEntregasRealizadas}
                                    onChange={e => setQtdEntregasRealizadas(e.target.value)}

                                >
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    width={4}
                                    // onChange={handleValueChange}
                                    // value={valorUnitario}
                                    label='Valor Por Frete'
                                    value={valorFrete}
                                    onChange={e => setValorFrete(e.target.value)}
                                >
                                </Form.Input>

                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    fluid
                                    label='Rua'
                                    value={enderecoRua}
                                    onChange={e => setEnderecoRua(e.target.value)}

                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={4}
                                    type="number"
                                    value={enderecoNumero}
                                    onChange={e => setEnderecoNumero(e.target.value)}
                                >
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    maxLength="100"
                                    value={enderecoBairro}
                                    onChange={e => setEnderecoBairro(e.target.value)}

                                />

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    maxLength="100"
                                    value={enderecoCidade}
                                    onChange={e => setEnderecoCidade(e.target.value)}

                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='CEP'
                                    maxLength="100"
                                    width={6}
                                >
                                    <InputMask
                                        required
                                        mask="99999-999"
                                        value={enderecoCep}
                                        onChange={e => setEnderecoCep(e.target.value)}

                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Select
                                    label='UF'
                                    placeholder="Selecione"
                                    options={estados}
                                    value={enderecoEstado}
                                    onChange={e => setEnderecoEstado(e.currentTarget.textContent)}
                                >
                                </Form.Select>
                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    label='Complemento'
                                    value={enderecoComplemento}
                                    onChange={e => setEnderecoComplemento(e.target.value)}

                                >
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <strong>Ativo:</strong>
                                <Form.Radio
                                    label='Sim'
                                    name='radioGroup'
                                    // value='yes'
                                    checked={ativo === true}
                                    // onChange={handleChange}
                                    value={true}
                                    onChange={() => setAtivo(true)}

                                />
                                <Form.Radio
                                    label='Não'
                                    name='radioGroup'
                                    // value='no'
                                    checked={ativo === false}
                                    // onChange={handleChange}
                                    value={false}
                                    onChange={() => setAtivo(false)}

                                />
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
                                <Link to={'/list-entregador'}>Voltar</Link>
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
