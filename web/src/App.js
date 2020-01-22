import React, {useState, useEffect} from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';


function App() {
  const [devs, setDevs] = useState([]);

  

  

  useEffect(() => {
    async function loadDevs(){ // carrega os devs da api
      const response = await api.get('/devs');
      
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    
    
    const response = await api.post('/devs', data)
    

    setDevs([...devs, response.data]); //como se usa o conceito de imutabilidade
  }                                    // nao se pode usar push, para add no fim de uma lista
                                       // entao se faz dessa forma
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
        
      </aside>
      <main>
        <ul>
          {devs.map(dev => ( //map, percorre array
           <DevItem key={dev._id} dev={dev} />
          ))}
          
        </ul>
      </main>

    </div>
  );
}





export default App;







