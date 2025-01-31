import React from "react";
import CharacterAttribute from "./CharacterAttribute";
import Role from "../Career/Role";
import SkillEditor from "../Skills/SkillEditor";

const CharacterEditor = ({ characters, onUpdate }) => {


  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'row',
        gap: '1rem',  
        width: '100%'
      }}
    >
      <CharacterAttribute 
        character={characters} 
        onUpdate={onUpdate} 
      />
      <div style={{
        display: 'flex',
        flex: 1,
        border: '1px solid white',
        borderRadius: '5px',
        padding: '1rem'
      }}> 
        <Role 
            characters={characters} 
            onUpdate={onUpdate} 
        />
        <SkillEditor 
            character={characters} 
            onUpdate={onUpdate} 
        />
      </div>
    </div>
  );
};

export default CharacterEditor;