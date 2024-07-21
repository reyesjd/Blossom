"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";

import { ICharacter, ICharacterFilterInput } from "@/lib";
import { fetchCharacters } from "@/lib/axios/fetch-characters";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { setFavoriteState } from "@/lib/axios/change-favorite";
import { CharacterDetail } from "@/components/CharacterDetail";
import { useSelectedCharacter } from "@/context";

import { CharacterList } from "../components";

export default function Home() {
  const [starredCharacters, setStarredCharacters] = useState<ICharacter[]>([]);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [filters, setFilters] = useState<ICharacterFilterInput>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [updateFavoriteId, setUpdatingFavoriteId] = useState(-1);
  const { selectedCharacter, setSelectedCharacter } =
    useSelectedCharacter() as {
      selectedCharacter: ICharacter | null;
      setSelectedCharacter: React.Dispatch<
        React.SetStateAction<ICharacter | null>
      >;
    };
  const isDesktop = useMediaQuery({ minWidth: 720 });
  const router = useRouter();

  useEffect(() => {
    fetchCharacters(filters)
      .then((data) => {
        const starred = data.filter(
          (character: ICharacter) => character.isFavorite
        );
        const notStarred = data.filter(
          (character: ICharacter) => !character.isFavorite
        );
        setStarredCharacters(starred);
        setCharacters(notStarred);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [filters]);

  useEffect(() => {
    if (updateFavoriteId !== -1) {
      setFavoriteState(updateFavoriteId).then((data) => {
        setUpdatingFavoriteId(-1);
      });
    }
  }, [updateFavoriteId]);

  useEffect(() => {
    if (
      starredCharacters.some(
        (starredCharacter) => starredCharacter.id === selectedCharacter?.id
      )
    ) {
      setStarredCharacters(
        starredCharacters.map((starredCharacter) =>
          starredCharacter.id === selectedCharacter?.id
            ? { ...selectedCharacter }
            : starredCharacter
        )
      );
    } else {
      setCharacters(
        characters.map((character) =>
          character.id === selectedCharacter?.id
            ? { ...selectedCharacter }
            : character
        )
      );
    }
  }, [selectedCharacter]);

  useEffect(() => {
    if (!isDesktop && selectedCharacter) {
      router.push(`/details`);
    }
  }, [isDesktop, selectedCharacter, router]);

  const handleFavorite = (character: ICharacter, event: React.MouseEvent) => {
    event.stopPropagation(); // Previene que el clic se propague al componente padre
    // remove from starred if the character is already starred or add to starred if not

    if (character.isFavorite) {
      setStarredCharacters(
        starredCharacters.filter(
          (starredCharacter) => starredCharacter.id !== character.id
        )
      );
      setCharacters([...characters, { ...character, isFavorite: false }]);
    } else {
      setStarredCharacters([
        ...starredCharacters,
        { ...character, isFavorite: true },
      ]);
      setCharacters(
        characters.filter(
          (notStarredCharacter) => notStarredCharacter.id !== character.id
        )
      );
    }
    setUpdatingFavoriteId(character.id);
  };

  const handleSelectCharacter = (character: ICharacter) => {
    if (selectedCharacter?.id === character.id) {
      console.log("deselect");

      setSelectedCharacter(null);
    } else {
      console.log("select");
      setSelectedCharacter(character);
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingSpinner isLoading={loading} hasError={null} />
      ) : (
        <div className="flex flex-row h-[96vh]">
          <CharacterList
            isDesktop={isDesktop}
            selectedCharacter={selectedCharacter}
            starredCharacters={starredCharacters}
            characters={characters}
            filters={filters}
            handleFavorite={handleFavorite}
            handleSelectCharacter={handleSelectCharacter}
          />
          {isDesktop && selectedCharacter && (
            <CharacterDetail character={selectedCharacter} />
          )}
        </div>
      )}
    </div>
  );
}
