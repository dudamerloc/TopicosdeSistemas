import Header from "./components/Header";
import CadastrarProduto from "./pages/produtos/CadastrarProduto";
import ListarProdutos from "./pages/produtos/ListarProdutos";
//1 - Um componente SEMPRE deve começar com a primeira letra maiúscula
//2 - Todo componente DEVE ser uma função do JS
//3 - Todo deve retornar apenas UM elemento HTML
function App() {

  return (
    <div>
      <Header />

      {<ListarProdutos />}
      <CadastrarProduto/>
      
    </div>
  );
}
//4 - OBRIGATORIAMENTE o componente DEVE ser exportado
export default App;