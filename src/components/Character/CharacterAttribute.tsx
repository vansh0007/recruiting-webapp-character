import React from 'react';
import './CharacterAttribute.css';  
import { ATTRIBUTE_LIST } from "../../consts";

const CharacterAttribute = ({ character, onUpdate }) => {
  const calculateModifier = (attributeValue) => {
    return Math.floor((attributeValue - 10) / 2);
  };

  const handleAttributeChange = (attribute, change) => {
    const countAttributes = ATTRIBUTE_LIST.reduce((sum, attr) => sum + character.attributes[attr], 0);
    if (countAttributes + change > 70) {
      alert("Total attribute points cannot exceed 70");
      return;
    }

    const newAttributes = {...character.attributes, [attribute]: character.attributes[attribute] + change}
    if (attribute === "Intelligence"){
        const resetSkills = Object.keys(character.skills).reduce((acc, skill) => ({
            ...acc,
            [skill] : 0
        }), {})
        onUpdate({...character,
            attributes: newAttributes,
            skills: resetSkills
        })
        alert("Intelligence modifier has been changed, skills have been reset")
        return;
    }
    onUpdate({...character, attributes: newAttributes})
  };

  return (
    <div className="characterAttributeContainer">
      {ATTRIBUTE_LIST.map((attribute) => (
        <div key={attribute} className="attributeRow">
          <span>{attribute}: {character.attributes[attribute]} ({calculateModifier(character.attributes[attribute])})</span>
          <button onClick={() => handleAttributeChange(attribute, -1)}>-</button>
          <button onClick={() => handleAttributeChange(attribute, 1)}>+</button>
        </div>
      ))}
    </div>
  );
};

export default CharacterAttribute;