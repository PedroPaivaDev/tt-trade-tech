'use client'
import React from 'react';
import Button from './Forms/Button';

interface PropsSignIn {
  isAuthenticated: string | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<string | null>>;
  keyStorage: string | null;
  setKeyStorage: React.Dispatch<React.SetStateAction<string | null>>
}

const SignIn = ({isAuthenticated, setIsAuthenticated, keyStorage, setKeyStorage}:PropsSignIn) => {
  const [keyAPI, setKeyAPI] = React.useState<string>('');
  const [statusSubmit, setStatusSubmit] = React.useState<StatusSubmit>({
    status: null,
    msg: null
  });
  
  const apiBaseUrl = 'https://api-football-v1.p.rapidapi.com/v3/timezone';

  const requestOptions:RequestInit = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': keyAPI as string,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  async function getStatus(url:string) {
    const data = await fetch(url, requestOptions);
    const json = await data.json();
    return json;
  }

  function handleSignin() {
    getStatus(apiBaseUrl).then(resolve => {
      if(resolve.response) {
        setKeyStorage(keyAPI);
        setStatusSubmit({
          status: 'sucess',
          msg: "Verificado!"
        });
      } else {
        setStatusSubmit({
          status: 'error',
          msg: "Chave Inválida"
        });
      }
    })
  }

  function handleLogout() {
    setKeyStorage(null);
    setStatusSubmit({
      status: 'sucess',
      msg: "Você saiu"
    });
  }

  React.useEffect(() => {
    if(keyStorage) {
      setIsAuthenticated(keyStorage);
    } else {
      setIsAuthenticated(null)
    }
    // eslint-disable-next-line
  }, [keyStorage])

  return (
    <div>
      {isAuthenticated ?
        <div className='login'>
          <p>Você já está logado</p>
          <Button
            onClick={handleLogout}
            statusSubmit={statusSubmit} setStatusSubmit={setStatusSubmit}
          >
            Sair
          </Button>
        </div> :
        <div className='signIn'>
          <label htmlFor="keyAPI">
            Insira aqui a sua Chave de acesso:
            <input
              id='keyAPI'
              name='keyAPI'
              type="text"
              value={keyAPI}
              onChange={({target}) => setKeyAPI(target.value)}
            />
          </label>      
          <Button
            onClick={handleSignin}
            statusSubmit={statusSubmit} setStatusSubmit={setStatusSubmit}
          >
            Entrar
          </Button>
        </div>
      }
    </div>
  )
}

export default SignIn;