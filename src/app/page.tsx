'use client'
import React from 'react';
import styles from './page.module.css';
import useLocalStorage from '../hooks/useLocalStorage'

export default function Home() {
  const [keyAPI, setKeyAPI] = React.useState<string>('');
  const apiBaseUrl = 'https://api-football-v1.p.rapidapi.com/v3/timezone';
  const [keyStorage, setKeyStorage] = useLocalStorage<string|null>('keyAPI', null);

  const requestOptions:RequestInit = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': keyStorage as string,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  async function getStatus(url:string) {
    const data = await fetch(url, requestOptions);
    const json = await data.json();
    return json;
  }

  function handleLogin() {
    setKeyStorage(keyAPI)
  }

  React.useEffect(() => {
    keyStorage && getStatus(apiBaseUrl)
    .then(resolve => console.log(resolve.response))
    .catch(err => console.log(err))
    // eslint-disable-next-line
  },[])

  return (
    <main className={styles.main}>
      <div className={styles.userLogin}>
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
        <button onClick={handleLogin}>Entrar</button>
      </div>
      <h1>MEU TIME</h1>
      <a href="https://dashboard.api-football.com/register">Quero me registrar no banco de dados</a>
    </main>
  )
}