'use client'
import React from 'react';
import styles from './page.module.css';
import useLocalStorage from '../hooks/useLocalStorage'
import SignIn from '@/components/SignIn';

export default function Home() {
  const [keyStorage, setKeyStorage] = useLocalStorage<string|null>('keyAPI', null);
  const [isAuthenticated, setIsAuthenticated] = React.useState<string|null>(null);
  
  const [countries, setCountries] = React.useState<Country[]|null>(null);
  const [selectedCountry, setSelectedCountry] = React.useState<string>('');
  const [leagues, setLeagues] = React.useState<LeagueByCountry[]|null>(null);
  const [selectedLeague, setSelectedLeague] = React.useState<string>('');
  const [selectedSeason, setSelectedSeason] = React.useState<string>('');
  const [players, setPlayers] = React.useState<Player[]|null>(null);
  const [selectedPlayers, setSelectedPlayers] = React.useState<string>('');

  function getYears(leagues:LeagueByCountry[]) {
    let years:number[] = [];
    leagues.forEach(league => {
      league.seasons.forEach(season => {
        if(!years.includes(season.year)) {
          years.push(season.year);
        }
      });
    });
    return years;
  }

  function getPlayers(players:Player[]) {
    let playersArray:PlayerData[] = [];
    players.forEach(({player}) => {
      playersArray.push(player);
    });
    return playersArray;
  }
  
  async function getData(endpoint:string) {
    const apiBaseUrl = 'https://api-football-v1.p.rapidapi.com/v3';
    const requestOptions:RequestInit = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': isAuthenticated as string,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };
    const data = await fetch(`${apiBaseUrl}/${endpoint}`, requestOptions);
    const json = await data.json();
    return json;
  }

  React.useEffect(() => {
    isAuthenticated &&
    getData('countries')
    .then(resolve => setCountries(resolve.response))
    .catch(err => console.log(err));
    // eslint-disable-next-line
  },[isAuthenticated])

  React.useEffect(() => {
    setLeagues(null);
    setPlayers(null);
    setSelectedLeague('');
    setSelectedSeason('');
    setSelectedPlayers('');
  },[selectedCountry])

  React.useEffect(() => {
    if(selectedCountry.length>0) {
      getData(`leagues?country=${selectedCountry}`)
      .then(resolve => setLeagues(resolve.response))
      .catch(err => console.log(err));
      setSelectedSeason('');
      setSelectedPlayers('');
    } else {
      setLeagues(null);
      setPlayers(null);
    }
    // eslint-disable-next-line
  },[countries, selectedCountry])

  React.useEffect(() => {
    if(selectedSeason.length>0) {
      getData(`players?league=${selectedLeague}&season=${selectedSeason}`)
      .then(resolve => setPlayers(resolve.response))
      .catch(err => console.log(err));
      setSelectedPlayers('');
    } else {      
      setPlayers(null);
    }
    // eslint-disable-next-line
  },[countries, selectedCountry, leagues, selectedLeague, selectedSeason])

  React.useEffect(() => {
    console.log('selectedCountry',selectedCountry)
    console.log('selectedLeague',selectedLeague)
    console.log('selectedSeason',selectedSeason)
    console.log('selectedPlayers',selectedPlayers)
  })

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
        <form className={styles.form}>
          {countries &&
            <div className={styles.country}>
              <h2>Escolha um país:</h2>
              <label htmlFor='countries'>Países: </label>
              <select
                id='countries'
                value={selectedCountry}
                onChange={({target}) => setSelectedCountry(target.value)}
                className={styles.select}
              >
                <option value='' disabled>Selecione</option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>{country.name}</option>
                ))}
              </select>
            </div>
          }
          {leagues &&
            <div className={styles.league}>
              <h2>Escolha uma liga:</h2>
              <label htmlFor='leagues'>Ligas: </label>
              <select
                id='leagues'
                value={selectedLeague}
                onChange={({target}) => setSelectedLeague(target.value)}
                className={styles.select}
              >
                <option value='' disabled>Selecione</option>
                {leagues.map(({league}) => (
                  <option key={league.id} value={league.id}>
                  {league.name}
                </option>
                ))}
              </select>
            </div>
          }
          {selectedLeague.length>0 &&
            <div className={styles.seasons}>
            <h2>Escolha uma Temporada:</h2>
            <label htmlFor='seasons'>Temporada: </label>
            <select
              id='seasons'
              value={selectedSeason}
              onChange={({target}) => setSelectedSeason(target.value)}
              className={styles.select}
            >
              <option value='' disabled>Selecione</option>
              {leagues && getYears(leagues).map(season => 
                <option key={season} value={season}>
                  {season}
                </option>
                )
              }
            </select>
          </div>
          }
          {players &&
            <div className={styles.players}>
            <h2>Escolha um Jogador:</h2>
            <label htmlFor='players'>Jogador: </label>
            <select
              id='players'
              value={selectedPlayers}
              onChange={({target}) => setSelectedPlayers(target.value)}
              className={styles.select}
            >
              <option value='' disabled>Selecione</option>
              {players && getPlayers(players).map(player => 
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
                )
              }
            </select>
          </div>
          }
        </form>
      }
    </main>
  )
}