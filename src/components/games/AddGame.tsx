import { memo, useEffect, useState } from 'react';

import './AddGame.css';
import { useApiContext, useGamesContext } from '../context/OhanaGamesContext';
import { Player } from '../../model/models';
import { addGame } from '../../service/OhanaGamesService';

const AddGame: React.FC = memo(() => {
  const [name, setName] = useState('');
  const games = useGamesContext();
  const { setGames } = useApiContext();

  useEffect(() => {
    console.log('Rendering AddGame');
  });

  const addGameClickHandler = () => {
    if (name) {
      let gameToAdd: Player = { name: name };
      //write the player to the DB
      addGame(gameToAdd).then((addedGame) => {
        console.log(addedGame);
        //refresh the collection
        let gamesArray: any[] = JSON.parse(JSON.stringify(games));
        gamesArray.push(addedGame);
        setGames(gamesArray);
        setName('');
      });
    }
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <span style={{ paddingRight: '5px' }} className="">
          Name
        </span>
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        <button style={{ marginLeft: '5px' }} onClick={addGameClickHandler}>
          Add
        </button>
      </div>
    </>
  );
});

export { AddGame };
