'use client'
import React from 'react';
import styles from './page.module.css';
import useLocalStorage from '../hooks/useLocalStorage'
import SignIn from '@/components/SignIn';

export default function Home() {
  const [keyStorage, setKeyStorage] = useLocalStorage<string|null>('keyAPI', null);
  const [isAuthenticated, setIsAuthenticated] = React.useState<string|null>(null);
  
  const [countries, setCountries] = React.useState<string[]|null>();
  const [selectedCountry, setSelectedCountry] = React.useState<string>('');
  
  const apiBaseUrl = 'https://api-football-v1.p.rapidapi.com/v3/timezone';

  const requestOptions:RequestInit = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': isAuthenticated as string,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  async function getStatus(url:string) {
    const data = await fetch(url, requestOptions);
    const json = await data.json();
    return json;
  }

  React.useEffect(() => {
    isAuthenticated && getStatus(apiBaseUrl)
    .then(resolve => setCountries(resolve.response))
    .catch(err => console.log(err))
    // eslint-disable-next-line
  },[isAuthenticated])

  return (
    <main className={styles.main}>
      <div className={styles.userLogin}>
        <SignIn
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          keyStorage={keyStorage}
          setKeyStorage={setKeyStorage}
        />
      </div>
      <h1>MEU TIME</h1>
      {!isAuthenticated && <a href="https://dashboard.api-football.com/register">Quero me registrar no banco de dados</a>}
      {isAuthenticated &&
        <div>
          {countries && 
            <div>
              <h2>Escolha um país:</h2>
              <label htmlFor='countries'>Países</label>
              <select
                id='countries'
                value={selectedCountry}
                onChange={({target}) => setSelectedCountry(target.value)}
                className={styles.select}
              >
                <option value="" disabled>Selecione</option>
                {countries?.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          }
        </div>
      }
    </main>
  )
}