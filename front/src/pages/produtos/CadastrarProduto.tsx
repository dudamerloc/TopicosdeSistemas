import axios from 'axios';
import {useEffect, useState} from 'react';
import { Categoria } from '../../models/Categoria';
import { Produto } from '../../models/Produto';
import './cadastrar-produto-modulo.css';


function CadastrarProduto(){

    const[nome, setNome] = useState("");
    const[preco, setPreco] = useState<number>(0);
    const[descricao, setDescricao] = useState("");
    const[quantidade, setQuantidade]= useState<number>(0);
    const[categoriaId, setCategoriaId] = useState<any>(null);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        const id = "8083a90e-02a4-42f2-a501-9fcbef3cae73";
        carregarCategorias();
        buscarProdutoPorId(id);
    }, []);

    function buscarProdutoPorId(id: string) {

        axios.get(`http://localhost:5291/api/produtos/${id}`)
        .then( response =>{
            var produto = response.data;
            setNome(produto.nome);
            setPreco(produto.preco);
            setDescricao(produto.descricao);
            setQuantidade(produto.quantidade);
            setCategoriaId(produto.categoriaId);
        })
        .catch(() => {
            alert("Erro ao carregar o Produto");
        });
    }

    function carregarCategorias() {
        axios.get("http://localhost:5291/api/categorias")
        .then( response =>{
            setCategorias(response.data);
            setCategoriaId(response.data?.id)
            console.table(response.data);
            
            
        })
        .catch( () => {
            alert("Erro ao carregar as categorias");
        });
    }

    function salvar(e: any) {
        e.preventDefault();
        const p = {
            nome: nome,
            preco: Number(preco),
            descricao: descricao,
            quantidade: Number (quantidade),
            categoriaId: categoriaId
        }
        console.log(p);
        cadastrar(p);
    }

    function cadastrar(produto: any){
        axios.post("http://localhost:5291/api/categorias", produto).then(response =>{
            console.log(response);
            alert("Produto cadastrado com sucesso");
        })
        .catch(error => {
            alert("Ocorreu um erro ao cadastrar o produto");
        })
    }

    return (
        <div>

            <h1>Cadastrar Produto</h1>

            <form onSubmit={salvar}>
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input
                    onChange = {(e: any) => setNome(e.target.value)}
                    value={nome}
                    type="text"
                    id="nome"
                    placeholder="Digite o nome do produto" 
                    required/>
                </div>

                <div>
                    <label htmlFor="descricao">Descrição</label>
                    <textarea
                    onChange = {(e: any) => setDescricao(e.target.value)}
                    value={descricao}
                    id="descricao"
                    placeholder="Digite a descrição do produto" 
                    required/>
                </div>

                <div>
                    <label htmlFor="quantidade">Quantidade</label>
                    <input
                    onChange = {(e: any) => setQuantidade(e.target.value)}
                    value={quantidade}
                    type="number"
                    id="quantidade"
                    step="1"
                    placeholder="Digite a quantidade de produtos" 
                    required/>
                </div>

                <div>
                    <label htmlFor="preco">Preço</label>
                    <input
                    onChange = {(e: any) => setPreco(e.target.value)}
                    value={preco}
                    type="number"
                    id="preco"
                    step="0,01"
                    placeholder="Digite o preço do(s) produto(s)" 
                    required/>
                </div>

                <div>
                    <label htmlFor="categoria">Categoria</label>
                    <select id="categoria"
                    onChange = {(e: any) => setCategoriaId(e.target.value)}
                    value={categoriaId}>

                        {categorias.map((item) =>(
                            <option key={item.id}>
                                {item.nome}
                            </option>
                        ))}
                    </select>
                    </div>
       
                    <button type="submit">Salvar</button>

            </form>
        
        </div>
    )

}
export default CadastrarProduto;