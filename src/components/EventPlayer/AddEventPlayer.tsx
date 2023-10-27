import { memo, useEffect } from 'react';

import './AddEventPlayer.css';
import {  useApiContext, useEventPlayersContext, usePlayersContext } from '../context/OhanaGamesContext';
import { Form } from 'react-bootstrap';
import { EventPlayer } from '../../model/models';
import { addEventPlayer } from '../../service/OhanaGamesService';

interface AddEventPlayerProps {
  eventId: string;
}

const AddEventPlayer: React.FC<AddEventPlayerProps> = memo( ( {eventId}: AddEventPlayerProps)  => {
  const players = usePlayersContext();
  const eventPlayers = useEventPlayersContext();
  const { setEventPlayers } = useApiContext();

  let selectedPlayerId:string|null|undefined = null;

  useEffect(() => {
    console.log('Rendering AddEventPlayer');
  }, [players]);

  const createPlayerOptions = () => {
    let items: any[] = [];
    items.push(
      <option selected key={Math.random()} value={''}>
        
      </option>
    );
    if (players && players.length > 0) {
      players.forEach((player) => {
        items.push(
          <option key={player.id} value={player.id}>
            {player.name}
          </option>
        );
      });
    }
    return items;
  };

  const addEventPlayerClickHandler = () => {
    if (selectedPlayerId) {
      console.log('eventId',eventId);
      console.log('selectedPlayerId',selectedPlayerId);
      let eventPlayerToAdd: EventPlayer = { eventId: eventId, playerId: selectedPlayerId, isWinner:false };
      console.log('eventPlayerToAdd',eventPlayerToAdd);
      addEventPlayer(eventPlayerToAdd).then((addedEventPlayer: any) => {
        //refresh the collection
        let eventPlayersArray: any[] = JSON.parse(JSON.stringify(eventPlayers));
        eventPlayersArray.push(addedEventPlayer);
        setEventPlayers(eventPlayersArray);
      });
    }
  };

  const onPlayerChangeHandler = (e: any) => {
    selectedPlayerId = e.target.value;
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ paddingLeft: '10px', paddingRight: '5px' }}>Player</span>
        <Form.Select aria-label="Default select example" style={{ width: '300px' }} onChange={onPlayerChangeHandler}>
          {createPlayerOptions()}
        </Form.Select>
        <button style={{ marginLeft: '5px' }} onClick={addEventPlayerClickHandler}>
          Add
        </button>
      </div>
    </>
  );
});

export { AddEventPlayer };
