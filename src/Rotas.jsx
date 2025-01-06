import React from 'react';
import { Route, Routes } from "react-router-dom";

import FormCliente from './views/cliente/FormCliente';
import FormEntregador from './views/entregador/FormEntregador';
import Home from './views/home/Home';
import FormLogin from './views/login/FormLogin';
import ListCliente from './views/cliente/ListCliente';
import ListEntregador from './views/entregador/ListEntregador';
import ListProduto from './views/produto/ListProduto';
import ListVenda from './views/venda/ListVenda';
import FormProduto from './views/produto/FormProduto';
import FormVenda from './views/venda/FormVenda';
import FormCategoriaProduto from './views/categoriaproduto/FormCategoriaProduto';
import ListCategoriaProduto from './views/categoriaproduto/ListCategoriaProduto';

import { ProtectedRoute } from './views/util/ProtectedRoute';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={<FormLogin />} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="list-cliente" element={<ProtectedRoute><ListCliente /></ProtectedRoute>} />
                <Route path="list-entregador" element={<ProtectedRoute><ListEntregador /></ProtectedRoute>} />
                <Route path="list-produto" element={<ProtectedRoute><ListProduto /></ProtectedRoute>} />
                <Route path="list-venda" element={<ProtectedRoute><ListVenda /></ProtectedRoute>} />
                <Route path="list-categoriaproduto" element={<ProtectedRoute><ListCategoriaProduto /></ProtectedRoute>} />
                <Route path="form-cliente" element={<ProtectedRoute><FormCliente /></ProtectedRoute>} />
                <Route path="form-produto" element={<ProtectedRoute><FormProduto /></ProtectedRoute>} />
                <Route path="form-entregador" element={<ProtectedRoute><FormEntregador /></ProtectedRoute>} />
                <Route path="form-venda" element={<ProtectedRoute><FormVenda /></ProtectedRoute>} />
                <Route path="form-categoriaproduto" element={<ProtectedRoute><FormCategoriaProduto /></ProtectedRoute>} />
            </Routes>
        </>
    )
}

export default Rotas
