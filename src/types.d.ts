interface StatusSubmit {
  status: string | null;
  msg: string | null;
}

interface Country {
  name: string;
  code: string;
  flag: string;
}

interface League {
  id: number;
  logo: string;
  name: string;
  type: string
}

interface Season {
  coverage: object;
  current: boolean;
  end: Date;
  start: Date;
  year: number;
}

interface LeagueByCountry {
  country: Country;
  league: League;
  seasons: Season[];
}

interface Player {
  player: PlayerData;
  statistics: PlayerStatistics;
}

interface PlayerData {
  age: number;
  birth: {
    country: string;
    date: Date;
    place: string;
  }
  firstname: string;
  height : string;
  id: number;
  injured: boolean;
  lastname: string;
  name: string;
  nationality: string;
  photo: string;
  weight: string;
}

interface PlayerStatistics {
  cards: ObjectOfKeys;
  dribbles: ObjectOfKeys;
  duels: ObjectOfKeys;
  fouls: ObjectOfKeys;
  games: ObjectOfKeys;
  goals: ObjectOfKeys;
  league: ObjectOfKeys;
  passes: ObjectOfKeys;
  penalty: ObjectOfKeys;
  shots: ObjectOfKeys;
  substitutes: ObjectOfKeys;
  tacles: ObjectOfKeys;
  team: ObjectOfKeys;
}

interface ObjectOfKeys {
  [key: string]: string;
}