import { memo, useEffect } from 'react';

import './EventsList.css';
import { ListGroup } from 'react-bootstrap';
import { useApiContext, useAuthentifiedContext, useEventsContext, useGamesContext } from '../context/OhanaGamesContext';
import { removeEvent } from '../../service/OhanaGamesService';
import { AddEventPlayer } from '../EventPlayer/AddEventPlayer';
import { EventPlayersList } from '../EventPlayer/EventPlayersList';
import * as Icon from 'react-bootstrap-icons';

const EventsList: React.FC = memo(() => {
  const events = useEventsContext();
  const games = useGamesContext();
  const isAuthentified = useAuthentifiedContext();
  const { setEvents } = useApiContext();

  const eventsListGroups = events?.map((event: any) => {
    const dateString = new Date(event.date).toDateString();
    const eventGame = games.find((g) => g.id === event.gameId);

    console.log(event.id);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ccc', padding: '20px', borderRadius: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <ListGroup.Item style={{ width: '100%' }} key={event.id}>
            {dateString} - {eventGame?.name}
          </ListGroup.Item>
          {isAuthentified && <button onClick={() => deleteEvent(event)}><Icon.Trash/></button>}
        </div>
        {isAuthentified && <AddEventPlayer eventId={event.id} />}
        <div style={{ paddingTop: '5px', display: 'flex',flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center' }}>
          <EventPlayersList eventId={event.id} />
        </div>
      </div>
    );
  });
  useEffect(() => {
    console.log('Rendering EventsList');
  }, [events]);

  const deleteEvent = (event: any) => {
    removeEvent(event).then(() => {
      let eventsArray: any[] = JSON.parse(JSON.stringify(events));
      eventsArray = eventsArray.filter((item) => item.id !== event.id);
      setEvents(eventsArray);
    });
  };

  return (
    <>
      {events && events.length > 0 && <ListGroup> {eventsListGroups} </ListGroup>}

      {(!events || events.length === 0) && <span>Please add Events</span>}
    </>
  );
});

export { EventsList };
