import React, { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import axios from "axios";
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";

export default function FormVenda() {
    const [cliente, setCliente] = useState();
    const [produto, setProduto] = useState();
    const [dataVenda, setDataVenda] = useState();
    const { state } = useLocation();
    const [idVenda, setIdVenda] = useState();
    const [retiradaEmLoja, setRetiradaEmLoja] = useState(true);
    const [statusVenda, setStatusVenda] = useState();
    const [observacao, setObservacao] = useState();
    const [valorTotal, setValorTotal] = useState();

    const status = [
        { text: 'Pedido Cancelado' },
        { text: 'Aguardando Pagamento' },
        { text: 'Pago' },
        { text: 'Entregue' }
    ];


    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/venda/" + state.id)
                .then((response) => {
                    const data = response.data.dataVenda.split('-');
                    const formattedVenda = [data[2], data[1], data[0]].join("/")
                    setDataVenda(formattedVenda)
                    setIdVenda(response.data.id)
                    setRetiradaEmLoja(response.data.retiradaEmLoja)
                    setStatusVenda(response.data.statusVenda)
                    setProduto(response.data.produto)
                    setValorTotal(response.data.valorTotal)
                    setObservacao(response.data.observacao)
                    setCliente(response.data.cliente)
                })
        }
    }, [state])

    function salvar() {
        // const statusSelecionado = status.find(statusItem => statusItem.text === status);
        // if (statusSelecionado) {
        //     setStatusVenda(statusSelecionado.key);
        // }

        let vendaRequest = {
            cliente: cliente,
            produto: produto,
            statusVenda: statusVenda,
            dataVenda: dataVenda,
            valorTotal: valorTotal,
            observacao: observacao,
            retiradaEmLoja: retiradaEmLoja,
        }

        // console.log(vendaRequest)

        if (idVenda != null) { //Alteração:
            axios.put("http://localhost:8080/api/venda/" + idVenda, vendaRequest)
                .then((response) => { console.log('Venda alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um venda.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/venda", vendaRequest)
                .then((response) => { console.log('Venda cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o venda.') })
        }

        // console.log(vendaRequest)

    }


    return (

        <div>
            <MenuSistema tela={'venda'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {idVenda === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Venda &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idVenda != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Venda &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Cliente'
                                    maxLength="100"
                                    value={cliente}
                                    onChange={e => setCliente(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Produto'
                                    maxLength="100"
                                    value={produto}
                                    onChange={e => setProduto(e.target.value)}
                                />

                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Select
                                    label='Status'
                                    required
                                    placeholder="Selecione uma opção"
                                    options={status}
                                    value={statusVenda}
                                    onChange={e => setStatusVenda(e.currentTarget.textContent)}
                                >
                                </Form.Select>
                                
                                <Form.Input
                                    fluid
                                    required
                                    label='Data Venda'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataVenda}
                                        onChange={e => setDataVenda(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Valor Total'
                                    required
                                    type="number"
                                    onChange={e => setValorTotal(parseFloat(e.target.value))}
                                    value={valorTotal}
                                    width={6}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.TextArea
                                    label='Observação'
                                    placeholder="Informe a observação da venda"
                                    width={16}
                                    value={observacao}
                                    onChange={e => setObservacao(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <strong>Retirada em Loja:</strong>
                                <Form.Radio
                                    label='Sim'
                                    name='radioGroup'
                                    checked={retiradaEmLoja === true}
                                    value={true}
                                    onChange={() => setRetiradaEmLoja(true)}

                                />
                                <Form.Radio
                                    label='Não'
                                    name='radioGroup'
                                    checked={retiradaEmLoja === false}
                                    value={false}
                                    onChange={() => setRetiradaEmLoja(false)}

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
                                <Link to={'/list-venda'}>Voltar</Link>
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
