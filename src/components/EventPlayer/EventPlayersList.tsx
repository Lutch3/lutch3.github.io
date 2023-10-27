import { memo, useEffect } from 'react';

import './EventPlayersList.css';
import { ListGroup } from 'react-bootstrap';
import { useApiContext, useEventPlayersContext, usePlayersContext } from '../context/OhanaGamesContext';
import { removeEventPlayer, updateEventPlayer } from '../../service/OhanaGamesService';
import * as Icon from 'react-bootstrap-icons';

interface AddEventPlayerProps {
  eventId: string;
}

const EventPlayersList: React.FC<AddEventPlayerProps> = memo(({ eventId }: AddEventPlayerProps) => {
  const eventPlayers = useEventPlayersContext();
  const players = usePlayersContext();
  const { setEventPlayers } = useApiContext();

  const eventPlayersListGroups = eventPlayers?.filter((ep) => ep.eventId === eventId).map((eventPlayer: any) => {
      const player = players.find((p) => p.id === eventPlayer.playerId);
      return (
        <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <ListGroup.Item style={{ width: '50%' }} key={eventPlayer.id}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <span style={{width:'125px'}}> {player?.name} </span>
              <div  style={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Icon.Trophy style={{marginRight:'5px'}}/>
                <input type="checkbox" checked={eventPlayer.isWinner} onChange={(event) => updateEventPlayerWinner(eventPlayer, event.target.checked)}></input>
              </div>
            </div>
          </ListGroup.Item>
          <button onClick={() => deleteEventPlayer(eventPlayer)}><Icon.Trash/></button>
        </div>
      );
    });

  useEffect(() => {
    console.log('Rendering EventPlayersList');
  }, [eventPlayers]);

  const updateEventPlayerWinner = (eventPlayer: any, winner: boolean) => {
    eventPlayer.isWinner = winner;
    updateEventPlayer(eventPlayer).then((updatedEventPlayer) => {
      let eventPlayersArray: any[] = JSON.parse(JSON.stringify(eventPlayers));
      eventPlayersArray.forEach((ep) => {
        if (ep.id === updatedEventPlayer?.id) 
          ep.isWinner = updatedEventPlayer?.isWinner;
      });
      setEventPlayers(eventPlayersArray);
    });
  };

  const deleteEventPlayer = (eventPlayer: any) => {
    removeEventPlayer(eventPlayer).then(() => {
      let eventPlayersArray: any[] = JSON.parse(JSON.stringify(eventPlayers));
      eventPlayersArray = eventPlayersArray.filter((item) => item.id !== eventPlayer.id);
      setEventPlayers(eventPlayersArray);
    });
  };

  return (
    <>
      {eventPlayers && eventPlayers.length > 0 && (
        <div style={{ width: '425px' }}>
          <ListGroup> {eventPlayersListGroups} </ListGroup>
        </div>
      )}

      {(!eventPlayers || eventPlayers.length === 0) && <span>Please add Event Players</span>}
    </>
  );
});

export { EventPlayersList };
