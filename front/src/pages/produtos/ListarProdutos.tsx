import { useEffect, useState } from 'react';

import axios from 'axios';

import './listar-produto-modulo.css';
import { Produto } from '../../models/Produto';


function ListarProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        carregarProdutos();
    }, []);

    function carregarProdutos() {
        axios.get("http://localhost:5291/api/produtos")
        .then( response =>{
            setProdutos(response.data);
            console.table(response.data);
        })
        .catch( error => {
            console.log(error);
        });
    }

    function remover(id: string) {
        axios.delete(`http://localhost:5291/api/produtos/${id}`)
        .then( () => {
            alert("Produto encontrado com sucesso");
            carregarProdutos();
        })
        .catch( () =>
            alert("Não foi possível encontrar o produto")
        )
    }

    return (
        <div>
            <h1>Lista de Produtos</h1>

            <table>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Nome</td>
                        <td>Categoria</td>
                        <td>Criado Em</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.categoria.nome}</td>
                            <td>{new Date(produto.criadoEm).toLocaleDateString('pt-BR')}</td>
                            <td>
                                <button className="remover" onClick={() => remover(produto.id)}>Remover</button>

                                <button className="alterar">Alterar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

};

export default ListarProdutos;