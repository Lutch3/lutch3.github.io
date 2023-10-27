import { memo, useEffect } from 'react';

import './PlayersList.css';
import { Player } from '../../model/models';
import { ListGroup } from 'react-bootstrap';
import { useApiContext, useAuthentifiedContext, usePlayersContext } from '../context/OhanaGamesContext';
import { removePlayer } from '../../service/OhanaGamesService';
import * as Icon from 'react-bootstrap-icons';

const PlayersList: React.FC = memo(() => {
    const players = usePlayersContext();
    const isAuthentified = useAuthentifiedContext();
    const { setPlayers } = useApiContext();
    const playersListGroups = players?.map((player:Player) => 
        <div style={{display:'flex', flexDirection:'row', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <ListGroup.Item style={{width:'100%'}} key={player.id}>{player.name}</ListGroup.Item>
            {isAuthentified && <button onClick={() => deletePlayer(player)}><Icon.Trash/></button>}
        </div>
    );
    useEffect(() => {
        console.log('Rendering PlayersList');
    }, [players]);

    const deletePlayer = (player:any) => {
        removePlayer(player).then( () => {
            let playersArray: any[] = JSON.parse(JSON.stringify(players));
            playersArray = playersArray.filter( (item) => item.id !== player.id );
            setPlayers(playersArray);
        });
    }

    return (
        <>  { players && players.length > 0 &&
            <ListGroup > {playersListGroups} </ListGroup >
            }

            {(!players || players.length === 0) && <span>Please add players</span>}
        </>
    );

    
});



export { PlayersList };
