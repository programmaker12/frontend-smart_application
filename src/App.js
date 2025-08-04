import { useState } from 'react';
import ImageGenerator from './components/ImageGenerator';

import Chat from './components/Chat';
import RecipeGenerator from './components/RecipeGenerator';



import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('image-generator'); 

  const handleTabChange = (tab) => {
    alert(tab)
    setActiveTab(tab);
  }
  return (
    <>
    <div className="App">
    <button className={activeTab === 'image-generator'?'active':''} onClick={() => handleTabChange('image-generator')}>Image Generator </button>
    <button className={activeTab === 'chat'?'active':''} onClick={() => handleTabChange('chat')}>Chat</button>
    <button className={activeTab === 'recipe-generator'?'active':''} onClick={() => handleTabChange('recipe-generator')}>Recipe Generator</button>
    </div>
    <div>
      {activeTab === 'image-generator' && <h2><ImageGenerator/></h2>}
      {activeTab === 'chat' && <h2><Chat/></h2>}
      {activeTab === 'recipe-generator' && <h2><RecipeGenerator/></h2>}
    </div>
      </>
  );
}

export default App;
