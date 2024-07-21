"use client";
import Image from "next/image";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICharacter } from "@/lib";
import { useEffect, useState } from "react";
import { setCommentMutation } from "@/lib/axios/change-comment";
import { useSelectedCharacter } from "@/context";

function CharacterSubDetail({
  title,
  value,
  isLast,
}: {
  title: string;
  value: string;
  isLast?: boolean;
}) {
  const className = isLast ? "py-2" : "py-2 border-b border-gray-200 ";
  return (
    <div className={className}>
      <p className="text-lg text-left text-gray-500 font-semibold">{title}</p>
      <p className="text-lg text-left text-gray-500">{value}</p>
    </div>
  );
}

export function CharacterDetail({
  character,
  isFull,
}: {
  character: ICharacter;
  isFull?: boolean;
}) {
  const [id, setId] = useState(character.id);
  const [comment, setComment] = useState(character.comments || "");
  const [updateComment, setUpdateComment] = useState(false);
  const { selectedCharacter, setSelectedCharacter } =
    useSelectedCharacter() as {
      selectedCharacter: ICharacter | null;
      setSelectedCharacter: React.Dispatch<
        React.SetStateAction<ICharacter | null>
      >;
    };

  useEffect(() => {
    if (updateComment) {
      setCommentMutation(character.id, comment).then((res) => {
        if (res) {
          setUpdateComment(false);
          setSelectedCharacter({ ...character, comments: comment });
        }
      });
    }
    if (character.id !== id) {
      setId(character.id);
      setComment(character.comments || "");
    }
  }, [updateComment, character.id]);

  return (
    <div
      className={`${
        isFull ? "w-full" : "w-3/4"
      } p-4 bg-white border-t border-gray-200 py-12 px-16`}
    >
      <div className="relative inline-block">
        <Image
          className="rounded-full"
          src={character.image || ""}
          alt={character.name}
          width={60}
          height={50}
        />
        <FontAwesomeIcon
          icon={faHeartSolid}
          className="absolute bottom-0 right-0 text-green-500 text-sm p-1 bg-white rounded-full"
        />
      </div>
      <p className="text-2xl font-bold text-left text-gray-700">
        {character.name}
      </p>
      <div className="flex flex-col mt-4">
        <CharacterSubDetail title="Species" value={character.species} />
        <CharacterSubDetail title="Status" value={character.status} />
        {character?.location?.name && (
          <CharacterSubDetail
            title="Location"
            value={character.location.name}
          />
        )}
        {character?.origin?.name && (
          <CharacterSubDetail
            title="Origin"
            value={character.origin.name}
            isLast={true}
          />
        )}
      </div>
      {/*add a comment area and a save button */}
      <div className="flex flex-col mt-4">
        <textarea
          className="w-full p-2 border border-gray-200 rounded-md"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="bg-violet-500 text-white p-2 rounded-md mt-2"
          onClick={() => setUpdateComment(true)}
        >
          Save
        </button>
      </div>
    </div>
  );
}
