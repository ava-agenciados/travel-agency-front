import Router from "./routes/routes" // gerencia as rotas da aplicação
import { useEffect } from 'react'; // hook useEffect do React, utilizado para efeitos colaterais
import { useAppDispatch } from './store/hooks'; // hook useAppDispatch para despachar ações para o Redux
import { restoreAuth } from './store/authActions'; // restaura o estado de autenticação

// Componente principal
function App() {
  const dispatch = useAppDispatch(); // dispatch do Redux para enviar ações
  useEffect(() => { // Executa o efeito colateral após o componente ser montado
    dispatch(restoreAuth()); // Despacha a ação restoreAuth para restaurar o estado de autenticação
  }, [dispatch]); // A dependência é o dispatch, mas como ele não muda, o efeito é executado apenas uma vez

  return <Router />; // Renderiza o componente Router, que gerencia as rotas da aplicação
}

export default App; 
