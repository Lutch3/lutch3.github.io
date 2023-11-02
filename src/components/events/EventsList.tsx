import { memo, useEffect } from 'react';

import './EventsList.css';
import { ListGroup } from 'react-bootstrap';
import { useApiContext, useAuthentifiedContext, useEventPlayersContext, useEventsContext, useGamesContext, usePlayersContext } from '../context/OhanaGamesContext';
import { removeEvent } from '../../service/OhanaGamesService';
import { AddEventPlayer } from '../EventPlayer/AddEventPlayer';
import { EventPlayersList } from '../EventPlayer/EventPlayersList';
import * as Icon from 'react-bootstrap-icons';
import { Event } from '../../model/models';

interface EventsListProps {
  readOnly: boolean;
}

const EventsList: React.FC<EventsListProps> = memo(({ readOnly }: EventsListProps) => {
  const events = useEventsContext();
  const eventPlayers = useEventPlayersContext();
  const games = useGamesContext();
  const players = usePlayersContext();
  const isAuthentified = useAuthentifiedContext();
  const { setEvents } = useApiContext();

  const eventsListGroups = readOnly
    ? []
    : events?.map((event: any) => {
        const dateString = new Date(event.date).toDateString();
        const eventGame = games.find((g) => g.id === event.gameId);

        return (
          <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ccc', padding: '20px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <ListGroup.Item style={{ width: '100%' }} key={event.id}>
                {dateString} - {eventGame?.name}
              </ListGroup.Item>
              {isAuthentified && (
                <button onClick={() => deleteEvent(event)}>
                  <Icon.Trash />
                </button>
              )}
            </div>
            {isAuthentified && <AddEventPlayer eventId={event.id} />}
            <div style={{ paddingTop: '5px', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center' }}>
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


  const constructPlayerDivs = (players:any) => {
    return players.sort((a:any,b:any)=> (a.name).localeCompare(b.name) ).map( (p:any) => 
      <div>
        <span style={{width:'125px', paddingRight:'5px'}}> {p?.name} </span>
      </div>
      )
    }

  const calculateEventRows = () => {
    const listOfEvents:any[] = [];

    events.forEach( (value:any) => {
      const row:any = { id: value.id
                  , date: new Date(value.date).toDateString()
                  , game: games.find((g) => g.id === value.gameId)?.name
                  }

      row['players'] = eventPlayers.filter( (ep) => ep.eventId === value.id ).map( (p) => 
      {
        const player:any = {};
        player['name'] = players.find((aPlayer) => aPlayer.id === p.playerId)?.name;
        player['isWinner'] = p.isWinner;
        return player;
      }
                                                                                  );
      listOfEvents.push(row);
    });

    return listOfEvents.map((event, index) => {
      return (
        <tr key={event.id}>
          <td>{index+1}</td>
          <td>{event.date}</td>
          <td>{event.game}</td>
          <td>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
                { constructPlayerDivs(event.players.filter((p:any) => p.isWinner)) }
              </div>
          </td>
          <td>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
                { constructPlayerDivs(event.players.filter((p:any) => !p.isWinner)) }
              </div>
          </td>
        </tr>
      );
    });
  };

  if (!readOnly) {
    return (
      <>
        {events && events.length > 0 && <ListGroup> {eventsListGroups} </ListGroup>}

        {(!events || events.length === 0) && <span>Please add Events</span>}
      </>
    );
  } else {
    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Game</th>
              {/* <th scope="col">Players</th> */}
              <th scope="col">Winner(s) <Icon.Trophy style={{marginRight:'5px'}}/> </th>
              <th scope="col">Loser(s)</th>
            </tr>
          </thead>
          <tbody>{calculateEventRows()}</tbody>
        </table>
      </>
    );
  }
});

export { EventsList };
