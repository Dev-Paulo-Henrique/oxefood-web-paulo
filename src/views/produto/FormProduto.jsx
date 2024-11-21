import React, { useState } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { Link } from "react-router-dom";
import axios from "axios";

export default function FormProduto() {

	const [codigo, setCodigo] = useState();
	const [titulo, setTitulo] = useState();
	const [descricao, setDescricao] = useState();
	const [valorUnitario, setValorUnitario] = useState();
	const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
	const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();

    const handleValueChange = (e) => {
        const value = e?.target?.value.replace(/\D/g, '');
        const formattedValue = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(value / 100);
        setValorUnitario(formattedValue);
    };

    function salvar() {

        let produtoRequest = {
            codigo: codigo,
            titulo: titulo,
            descricao: descricao,
            valorUnitario: valorUnitario,
            tempoEntregaMinimo: tempoEntregaMinimo,
            tempoEntregaMaximo: tempoEntregaMaximo
        }

        // console.log(produtoRequest)

        axios.post("http://localhost:8080/api/produto", produtoRequest)
            .then((response) => {
                console.log('Produto cadastrado com sucesso.')
            })
            .catch((error) => {
                console.log('Erro ao incluir o um produto.')
            })
    }

    return (

        <div>
            <MenuSistema tela={'produto'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    maxLength="100"
                                    placeholder="Informe o título do produto"
                                    onChange={e => setTitulo(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    placeholder="Informe o código do produto"
                                    label='Código do Produto'
                                    onChange={e => setCodigo(e.target.value)}
                                    />

                            </Form.Group>

                            <Form.Group>
                                <Form.TextArea
                                    label='Descrição'
                                    placeholder="Informe a descrição do produto"
                                    width={16}
                                    onChange={e => setDescricao(e.target.value)}
                                    />
                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Valor Unitário'
                                    required
                                    onChange={handleValueChange}
                                    value={valorUnitario}
                                    width={6}
                                    />

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Mínimo em Minutos'
                                    placeholder="30"
                                    type="number"
                                    width={6}
                                    onChange={e => setTempoEntregaMinimo(e.target.value)}
                                    />

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máximo em Minutos'
                                    placeholder="40"
                                    type="number"
                                    width={6}
                                    onChange={e => setTempoEntregaMaximo(e.target.value)}
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
                                <Link to={'/list-produto'}>Voltar</Link>
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
