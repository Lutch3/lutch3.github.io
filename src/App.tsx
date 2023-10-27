import './App.css'
import { OhanaGames } from './app/OhanaGames';
import { OhanaGamesProvider} from './components/context/OhanaGamesContext';

function App() {
  return (
    
    <>
      <OhanaGamesProvider>
        <OhanaGames/>
      </OhanaGamesProvider>
    </>
  )
}

export default App
