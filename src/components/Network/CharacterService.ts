import { ATTRIBUTE_LIST, SKILL_LIST } from '../../consts';

const API_URL = 'https://recruiting.verylongdomaintotestwith.ca/api/{vansh0007}/character';

export interface Character {
  id: number;
  attributes: Record<string, number>;
  skills: Record<string, number>;
}

export const characterService = {
  async loadCharacters(): Promise<Character[]> {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        if (!Array.isArray(data.body) || data.body.length === 0) {
          console.log("No characters found, setting default character");
          return [this.createDefaultCharacter()];
        }
        console.log("Characters found, setting characters");
        return data.body;
      }
      throw new Error('Failed to load characters');
    } catch (error) {
      console.error('Load Failed:', error);
      return [];
    }
  },

  async saveCharacters(characters: Character[]): Promise<boolean> {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(characters)
      });
      return response.ok;
    } catch (error) {
      console.error('Save Failed:', error);
      return false;
    }
  },


createDefaultCharacter(): Character {
    return {
      id: 1,
      attributes: ATTRIBUTE_LIST.reduce((acc, attr) => ({...acc, [attr]: 10}), {}),
      skills: SKILL_LIST.reduce((acc, skill) => ({...acc, [skill.name]: 0}), {})
    };
  }
};