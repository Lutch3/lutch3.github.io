import { Ranking } from '../components/Ranking/Ranking';
import { AddEvent } from '../components/events/AddEvent';
import { EventsList } from '../components/events/EventsList';
import { AddGame } from '../components/games/AddGame';
import { GamesList } from '../components/games/GamesList';
import { AddPlayer } from '../components/players/AddPlayer';
import { PlayersList } from '../components/players/PlayersList';
import * as Icon from 'react-bootstrap-icons';

export const OhanaGames: React.FC = () => {
  return (
    <>
      <h1>Ohana Games</h1>
      <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
          <div style={{ margin: '5px', height:'525px'}} className="card">
            <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
              <h2>Players</h2>
              <Icon.Person size={40} style={{ paddingLeft: '5px' }} />
            </div>

            <AddPlayer />
            <div style={{ paddingTop: '5px', height:'auto', overflowY:'scroll'}}>
              <PlayersList />
            </div>
          </div>
          <div style={{ margin: '5px', height:'525px' }} className="card">
            <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
              <h2>Games</h2>
              <Icon.Puzzle size={40} style={{ paddingLeft: '5px' }} />
            </div>
            <AddGame />
            <div style={{ paddingTop: '5px', height:'auto', overflowY:'scroll'}}>
              <GamesList />
            </div>
          </div>
          <div style={{ margin: '5px' }} className="card">
            <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
              <h2>Ranking</h2>
              <Icon.Award size={40} style={{ paddingLeft: '5px' }} />
            </div>
            <Ranking/>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
          <div style={{ margin: '5px', width: '100%' }} className="card">
            <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
              <h2>Events</h2>
              <Icon.Dice3 size={40} style={{ paddingLeft: '5px' }} />
            </div>
            <AddEvent />
            <div style={{ paddingTop: '5px' }}>
              <EventsList />
            </div>
          </div>
        </div>
      </div>
      <p className="read-the-docs">Created by Lutch ^^</p>
    </>
  );
};
