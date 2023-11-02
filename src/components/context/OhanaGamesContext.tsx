import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { EventPlayer, Game, Player } from '../../model/models';
import { findAll } from '../../service/OhanaGamesService';

const playersContext = createContext<State['players']>([]);
export const usePlayersContext = () => {
  return useContext(playersContext);
};

const gamesContext = createContext<State['games']>([]);
export const useGamesContext = () => {
  return useContext(gamesContext);
};

const eventsContext = createContext<State['events']>([]);
export const useEventsContext = () => {
  return useContext(eventsContext);
};

const eventPlayersContext = createContext<State['eventPlayers']>([]);
export const useEventPlayersContext = () => {
  return useContext(eventPlayersContext);
};

const loadingContext = createContext<State['isLoading']>(false);
export const useLoadingContext = () => {
  return useContext(loadingContext);
};

const authentifiedContext = createContext<State['isAuthentified']>(false);
export const useAuthentifiedContext = () => {
  return useContext(authentifiedContext);
};

const continuedAsGuestContext = createContext<State['hasContinuedAsGuest']>(false);
export const useContinuedAsGuestContext = () => {
  return useContext(continuedAsGuestContext);
};

const apiContext = createContext<{ [key: string]: (...args: any[]) => unknown }>({});
export const useApiContext = () => {
  return useContext(apiContext);
};

type Actions =
  | { type: 'updatePlayers'; players: any }
  | { type: 'updateGames'; games: any }
  | { type: 'updateEvents'; events: any }
  | { type: 'updateEventPlayers'; eventPlayers: any }
  | { type: 'updateIsLoading'; isLoading: boolean }
  | { type: 'updateIsAuthentified'; isAuthentified: boolean }
  | { type: 'updateHasContinuedAsGuest'; hasContinuedAsGuest: boolean };

type State = {
  isLoading: boolean;
  isAuthentified: boolean;
  hasContinuedAsGuest: boolean;
  players: Player[];
  games: Game[];
  events: Event[];
  eventPlayers: EventPlayer[];
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'updateIsLoading':
      return { ...state, isLoading: action.isLoading };
    case 'updateIsAuthentified':
      return { ...state, isAuthentified: action.isAuthentified };
    case 'updateHasContinuedAsGuest':
      return { ...state, hasContinuedAsGuest: action.hasContinuedAsGuest };
    case 'updatePlayers':
      return { ...state, players: action.players };
    case 'updateGames':
      return { ...state, games: action.games };
    case 'updateEvents':
      return { ...state, events: action.events };
    case 'updateEventPlayers':
      return { ...state, eventPlayers: action.eventPlayers };
  }
};

const playersBaseValue: Player[] = [];
const gamesBaseValue: Game[] = [];
const eventsBaseValue: Event[] = [];
const eventPlayersBaseValue: EventPlayer[] = [];

const initialState: State = {
  isLoading: true,
  isAuthentified: false,
  hasContinuedAsGuest: false,
  players: playersBaseValue,
  games: gamesBaseValue,
  events: eventsBaseValue,
  eventPlayers: eventPlayersBaseValue,
};

export const OhanaGamesProvider = ({ children }: { children: React.ReactNode }) => {
  //   const { service, baseUrl, preferences } = useServiceContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadPlayers();
    loadGames();
    loadEvents();
    loadEventPlayers();
  }, []);

  const loadPlayers = async () => {
    dispatch({ type: 'updateIsLoading', isLoading: true });
    //load the players
    const l_players: any[] = await findAll('players', 'name');
    dispatch({ type: 'updatePlayers', players: l_players });
    dispatch({ type: 'updateIsLoading', isLoading: false });
  };

  const loadGames = async () => {
    dispatch({ type: 'updateIsLoading', isLoading: true });
    //load the players
    const l_games: any[] = await findAll('games', 'name');
    dispatch({ type: 'updateGames', games: l_games });
    dispatch({ type: 'updateIsLoading', isLoading: false });
  };

  const loadEvents = async () => {
    dispatch({ type: 'updateIsLoading', isLoading: true });
    //load the players
    const l_events: any[] = await findAll('events', 'date', 'desc');
    dispatch({ type: 'updateEvents', events: l_events });
    dispatch({ type: 'updateIsLoading', isLoading: false });
  };

  const loadEventPlayers = async () => {
    dispatch({ type: 'updateIsLoading', isLoading: true });
    //load the players
    const l_eventPlayers: any[] = await findAll('eventPlayers', 'eventId');
    dispatch({ type: 'updateEventPlayers', eventPlayers: l_eventPlayers });
    dispatch({ type: 'updateIsLoading', isLoading: false });
  };

  const api = useMemo(() => {
    const setPlayers = (c_players: Player[]) => {
      dispatch({ type: 'updatePlayers', players: c_players });
    };

    const setGames = (c_games: Game[]) => {
      dispatch({ type: 'updateGames', games: c_games });
    };

    const setEvents = (c_events: Game[]) => {
      dispatch({ type: 'updateEvents', events: c_events });
    };

    const setEventPlayers = (c_eventPlayers: Game[]) => {
      dispatch({ type: 'updateEventPlayers', eventPlayers: c_eventPlayers });
    };

    const setIsAuthentified = (isAuthentified: boolean) => {
      dispatch({ type: 'updateIsAuthentified', isAuthentified: isAuthentified });
    };

    const setHasContinuedAsGuest = (hasContinuedAsGuest: boolean) => {
      dispatch({ type: 'updateHasContinuedAsGuest', hasContinuedAsGuest: hasContinuedAsGuest });
    };

    return { setPlayers, setGames, setEvents, setEventPlayers, setIsAuthentified, setHasContinuedAsGuest };
  }, []);

  return (
    <apiContext.Provider value={api}>
      <loadingContext.Provider value={state.isLoading}>
        <authentifiedContext.Provider value={state.isAuthentified}>
          <continuedAsGuestContext.Provider value={state.hasContinuedAsGuest}>
            <playersContext.Provider value={state.players}>
              <gamesContext.Provider value={state.games}>
                <eventsContext.Provider value={state.events}>
                  <eventPlayersContext.Provider value={state.eventPlayers}>{children}</eventPlayersContext.Provider>
                </eventsContext.Provider>
              </gamesContext.Provider>
            </playersContext.Provider>
          </continuedAsGuestContext.Provider>
        </authentifiedContext.Provider>
      </loadingContext.Provider>
    </apiContext.Provider>
  );
};
