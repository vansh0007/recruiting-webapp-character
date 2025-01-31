import React from 'react'
import { characterService } from './CharacterService'
const SaveCharacter = ({characters}) => {
    const handleSave = async() => {
        console.log("Saving characters"); 
        const success = await characterService.saveCharacters(characters);
        if (success){
            console.log("characters saved successfully");
        } else {
            console.error("Failed to save characters");
        }
    }

    return (
        <div>
            <button 
                onClick={handleSave}
            >
                Save All Characters
            </button>
        </div>
    )
}

export default SaveCharacter