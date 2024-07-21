"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { ICharacter } from "@/lib";

export function CharacterCard({
  character,
  selectedCharacter,
  handleFavorite,
  handleSelectCharacter,
}: {
  character: ICharacter;
  selectedCharacter?: ICharacter | null;
  handleFavorite?: (character: ICharacter, event: React.MouseEvent) => void;
  handleSelectCharacter: (character: ICharacter) => void;
}) {
  const backgroundColor =
    selectedCharacter?.id === character.id ? "bg-[#d9d3e3]" : "bg-white";

  return (
    <div
      className={`w-full p-4 ${backgroundColor} hover:bg-[#ede3fe] border-t border-gray-200 flex items-center gap-4 px-1 rounded-md`}
      onClick={
        handleSelectCharacter
          ? () => handleSelectCharacter(character)
          : undefined
      }
    >
      <div className="flex-shrink-0">
        <Image
          className="rounded-full"
          src={character.image || ""}
          alt={character.name}
          width={60}
          height={50}
        />
      </div>
      <div className="flex flex-col flex-grow">
        <p className="text-lg font-bold text-left">{character.name}</p>
        <p className="text-sm text-gray-500 text-left">{character.species}</p>
      </div>
      <div className="flex-shrink-0">
        <button
          onClick={
            handleFavorite ? (e) => handleFavorite(character, e) : undefined
          }
          className="flex justify-center items-center p-3 bg-white rounded-full  hover: bg-white"
        >
          <FontAwesomeIcon
            icon={character.isFavorite ? faHeartSolid : faHeartRegular}
            className="text-green-500"
          />
        </button>
      </div>
    </div>
  );
}
