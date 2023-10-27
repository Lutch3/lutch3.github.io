import { memo, useEffect } from 'react';

import { useEventPlayersContext, usePlayersContext } from '../context/OhanaGamesContext';

const Ranking: React.FC = memo(() => {
  const eventPlayers = useEventPlayersContext();
  const players = usePlayersContext();

  useEffect(() => {
    console.log('Rendering Ranking', eventPlayers);
  }, [eventPlayers]);

  const calculateRankingRows = () => {
    const rankingMap = new Map();

    eventPlayers.forEach((eventPlayer:any) => {
      const { playerId, isWinner } = eventPlayer;

      if (!rankingMap.has(playerId)) {
        rankingMap.set(playerId, {
          playerId: playerId,
          games: 0,
          wins: 0,
        });
      }

      const playerData = rankingMap.get(playerId);
      playerData.games++;

      if (isWinner) {
        playerData.wins++;
      }

      playerData.points = playerData.wins * 3;
      playerData.ratio = parseFloat(((playerData.wins / playerData.games)*100).toFixed(1));

      rankingMap.set(playerId, playerData);
    });

    const rankingArray = Array.from(rankingMap.values());
    return rankingArray
      .sort((a: any, b: any) => {
        if (a.ratio > b.ratio) return -1;
        else if (a.ratio < b.ratio) return 1;
        return 0;
      })
      .map((ranking, index) => {
        const eventPlayer = players.find((p) => p.id === ranking.playerId);
        let position = 0;
        position++;
        return (
          <tr key={ranking.playerId}>
            <td>{index+1}</td>
            <td>{eventPlayer?.name}</td>
            <td>{ranking.games}</td>
            <td>{ranking.wins}</td>
            <td>{ranking.points}</td>
            <td>{ranking.ratio} %</td>
          </tr>
        );
      });
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Games#</th>
            <th scope="col">Wins#</th>
            <th scope="col">Total Points</th>
            <th scope="col">Ratio Games/Points</th>
          </tr>
        </thead>
        <tbody>{calculateRankingRows()}</tbody>
      </table>
    </>
  );
});

export { Ranking };
