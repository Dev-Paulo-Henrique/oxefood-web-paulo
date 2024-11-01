import React from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

export default function FormEntregador() {
    const [valorUnitario, setValorUnitario] = React.useState()
    const [isActive, setIsActive] = React.useState()

    const handleValueChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        const formattedValue = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(value / 100);
        setValorUnitario(formattedValue);
    };

    const handleChange = (e, {value}) => {
        setIsActive(value)
    }

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
    

    return (

        <div>

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                />

                                <Form.Input
                                    required
                                    fluid
                                    width={6}
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
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
                                    />
                                </Form.Input>

                            </Form.Group>
                            <Form.Group widths='equal'>

                                <Form.Input
                                    fluid
                                    label='DT Nascimento'
                                    maxLength="100"
                                    placeholder="Ex: 20/03/1985"
                                    width={4}
                                />

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
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    width={4}
                                    label='QTD Entregas Realizadas'
                                    type="number"
                                >
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    width={4}
                                    onChange={handleValueChange}
                                    value={valorUnitario}
                                    label='Valor Por Frete'>
                                </Form.Input>

                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    fluid
                                    label='Rua'
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={4}
                                    type="number">
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    maxLength="100"
                                />

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    maxLength="100"
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
                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Select
                                    label='UF'
                                    placeholder="Selecione"
                                    options={estados}
                                >
                                </Form.Select>
                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    label='Complemento'
                                >
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <strong>Ativo:</strong>
                            <Form.Radio
                            label='Sim'
                            name='radioGroup'
                            value='yes'
                            checked={isActive === 'yes'}
                            onChange={handleChange}
                            />
                            <Form.Radio
                            label='Não'
                            name='radioGroup'
                            value='no'
                            checked={isActive === 'no'}
                            onChange={handleChange}
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
                                Voltar
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
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
