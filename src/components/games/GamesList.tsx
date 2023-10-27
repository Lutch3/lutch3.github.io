import { memo, useEffect } from 'react';

import './GamesList.css';
import { Game } from '../../model/models';
import { ListGroup } from 'react-bootstrap';
import { useApiContext, useGamesContext } from '../context/OhanaGamesContext';
import { removeGame } from '../../service/OhanaGamesService';
import * as Icon from 'react-bootstrap-icons';

const GamesList: React.FC = memo(() => {
    const games = useGamesContext();
    const { setGames } = useApiContext();
    const gamesListGroups = games?.map((game:Game) => 
        <div style={{display:'flex', flexDirection:'row', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <ListGroup.Item style={{width:'100%'}} key={game.id}>{game.name}</ListGroup.Item>
            <button onClick={() => deleteGame(game)}><Icon.Trash/></button>
        </div>
    );
    useEffect(() => {
        console.log('Rendering GamesList');
    }, [games]);

    const deleteGame = (game:any) => {
        removeGame(game).then( () => {
            let gamesArray: any[] = JSON.parse(JSON.stringify(games));
            gamesArray = gamesArray.filter( (item) => item.id !== game.id );
            setGames(gamesArray);
        });
    }

    return (
        <>  { games && games.length > 0 &&
            <ListGroup > {gamesListGroups} </ListGroup >
            }

            {(!games || games.length === 0) && <span>Please add games</span>}
        </>
    );

    
});



export { GamesList };
