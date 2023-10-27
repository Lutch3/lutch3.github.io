import { memo, useEffect, useState } from 'react';

import './AddEvent.css';
import { useApiContext, useEventsContext, useGamesContext } from '../context/OhanaGamesContext';
import { Event } from '../../model/models';
import { addEvent } from '../../service/OhanaGamesService';
import { Form } from 'react-bootstrap';

const AddEvent: React.FC = memo(() => {
  const [dateString, setDateString] = useState('');
  const events = useEventsContext();
  const games = useGamesContext();
  const { setEvents } = useApiContext();
  let selectedGameId:string|null|undefined = null;

  useEffect(() => {
    console.log('Rendering AddEvents');
  }, [games]);

  const createGameOptions = () => {
    let items: any[] = [];
    items.push(
      <option selected key={Math.random()} value={''}>
        
      </option>
    );
    if (games && games.length > 0) {
      games.forEach((game) => {
        items.push(
          <option key={game.id} value={game.id}>
            {game.name}
          </option>
        );
      });
    }
    return items;
  };

  const addEventClickHandler = () => {
    if (dateString && selectedGameId) {
      let eventToAdd: Event = { date: dateString, gameId: selectedGameId };
      addEvent(eventToAdd).then((addedEvent: any) => {
        //refresh the collection
        let eventsArray: any[] = JSON.parse(JSON.stringify(events));
        eventsArray.push(addedEvent);
        setEvents(eventsArray);
      });
    }
  };

  const onGameChangeHandler = (e: any) => {
    selectedGameId = e.target.value;
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ paddingRight: '5px' }}>Date</span>
        <input
          type="date"
          value={dateString}
          onChange={(e) => {
            setDateString(e.target.value);
          }}
        ></input>

        <span style={{ paddingLeft: '10px', paddingRight: '5px' }}>Game</span>
        <Form.Select aria-label="Default select example" style={{ width: '300px' }} onChange={onGameChangeHandler}>
          {createGameOptions()}
        </Form.Select>
        <button style={{ marginLeft: '5px' }} onClick={addEventClickHandler}>
          Add
        </button>
      </div>
    </>
  );
});

export { AddEvent };
