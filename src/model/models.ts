
export interface Player {
  id?: string;
  name: string;
}

export interface Game {
  id?: string;
  name: string;
}

export interface Event {
  id?: string;
  date: string;
  gameId: string;
}

export interface EventPlayer {
  id?: string;
  eventId: string;
  playerId: string;
  isWinner:boolean;
}
