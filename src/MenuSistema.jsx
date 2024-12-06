import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function MenuSistema(props) {

    return (
        <>
            <Menu inverted>

                <Menu.Item
                    content='Home'
                    active={props.tela === 'home'}
                    as={Link}
                    to='/'
                />

                <Menu.Item
                    content='Cliente'
                    active={props.tela === 'cliente'}
                    as={Link}
                    //    to='/form-cliente'
                    to='/list-cliente'
                />
                <Menu.Item
                    content='Produto'
                    active={props.tela === 'produto'}
                    as={Link}
                    // to='/form-produto'
                    to='/list-produto'
                />

                <Menu.Item
                    content='Entregador'
                    active={props.tela === 'entregador'}
                    as={Link}
                    // to='/form-entregador'
                    to='/list-entregador'
                />

                <Menu.Item
                    content='Venda'
                    active={props.tela === 'venda'}
                    as={Link}
                    // to='/form-venda'
                    to='/list-venda'
                />

                <Menu.Item
                    content='Categoria'
                    active={props.tela === 'categoriaproduto'}
                    as={Link}
                    // to='/form-venda'
                    to='/list-categoriaproduto'
                />

            </Menu>
        </>
    )
}
