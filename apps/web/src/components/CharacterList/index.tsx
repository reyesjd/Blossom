"use client";
import { CharacterCard } from "../CharacterCard";
import { ICharacterFilterInput, ICharacter } from "@/lib/interfaces";
import { CharacterFilter } from "../CharacterFilter";

export function CharacterList({
  isDesktop,
  starredCharacters,
  characters,
  filters,
  selectedCharacter,
  handleFavorite,
  handleSelectCharacter,
}: {
  isDesktop: boolean;
  starredCharacters: ICharacter[];
  characters: ICharacter[];
  filters: ICharacterFilterInput;
  selectedCharacter: ICharacter | null;
  handleFavorite: (character: ICharacter, event: React.MouseEvent) => void;
  handleSelectCharacter: (character: ICharacter) => void;
}) {
  return (
    <div className={`${isDesktop ? "w-1/4" : "w-full"} p-4`}>
      <p className="text-2xl font-bold text-left text-gray-700 mb-4">
        Rick and Morty List
      </p>
      {/*<div>
        <CharacterFilter />
      </div>*/}

      <div
        className={`p-2 overflow-y-auto ${isDesktop ? "scrollbar-thin max-h-full" : ""}`}
      >
        <div className="flex flex-col bg-white mb-14 w-full">
          <p className="text-lg font-bold text-left text-gray-700 mb-2">
            STARRED CHARACTERS ({starredCharacters.length})
          </p>
          <div className="flex flex-col space-y-2">
            {starredCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                handleFavorite={handleFavorite}
                handleSelectCharacter={handleSelectCharacter}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col bg-white border-b border-gray-200 w-full">
          <p className="text-lg font-bold text-left text-gray-700 mb-2">
            CHARACTERS ({characters.length})
          </p>
          <div className="flex flex-col space-y-2">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                selectedCharacter={selectedCharacter}
                handleFavorite={handleFavorite}
                handleSelectCharacter={handleSelectCharacter}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
