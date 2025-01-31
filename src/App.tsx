import React,{ useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, SKILL_LIST } from './consts';
import CharacterEditor from "./components/Character/CharacterEditor";
import SkillCheck from "./components/Skills/SkillCheck";
import SaveCharacter from "./components/Network/SaveCharacter";
import { characterService } from "./components/Network/CharacterService";

function App() {
  const [checkResult, setCheckResult] = useState({
    characterId: null,
    skillName: "",
    isSuccess: false,
    rollValue: 0,
    skillPoints: 0,
    dc: 0
  });

  const handleCheckResult = (characterId, skillName, isSuccess, rollValue, skillPoints, dc) => {
    setCheckResult({
      characterId,
      skillName,
      isSuccess,
      rollValue,
      skillPoints,
      dc
    });
  };
  const [characters, setCharacters] = useState<any[]>([]);
  const updateCharacter = (index, updatedCharacter) => {
    const newCharacters = [...characters];
    newCharacters[index] = updatedCharacter;
    setCharacters(newCharacters);
  };
  const addNewCharacter = () => {
    const newCharacter = {
      id: characters.length + 1,
      attributes: ATTRIBUTE_LIST.reduce((acc, attr) => ({...acc, [attr]: 10}), {}),
      skills: SKILL_LIST.reduce((acc, skill) => ({...acc, [skill.name]: 0}), {})
    }
    setCharacters([...characters, newCharacter])
  }
  React.useEffect(() => {
      const loadCharacters = async () => {
        const characters = await characterService.loadCharacters();
        setCharacters(characters);
      }
      loadCharacters();
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <button className="add-new-character-button" onClick={addNewCharacter}>Add New Character</button>
        <SaveCharacter characters={characters}/>
\        {checkResult.characterId && (
          <div className="check-result">
            <h3>Latest Skill Check Result:</h3>
            <p>Character {checkResult.characterId} attempted {checkResult.skillName}</p>
            <p>Roll: {checkResult.rollValue} Skill Points: {checkResult.skillPoints} vs DC: {checkResult.dc}</p>
            <p>Result: {checkResult.isSuccess ? "Success! 🎉" : "Failed! 😢"}</p>
          </div>
        )}
        
        
        <div>
          {
            Array.isArray(characters) && (characters.map((character, index) => (
              <div key={index}className="single-character-container">
                <h1> Character {character.id}</h1>
                <SkillCheck character={character} onCheckResult={handleCheckResult}/>
                <CharacterEditor 
                  characters={character} 
                  onUpdate={(updatedCharacter) => updateCharacter(index, updatedCharacter)} 
                />
              </div>
            )))
          }
        </div>
      </section>
    </div>
  );
}

export default App;