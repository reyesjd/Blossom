"use client";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CharacterDetail } from "@/components/CharacterDetail";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelectedCharacter } from "@/context";
import { ICharacter } from "@/lib";

function DetailsPage() {
  const router = useRouter();
  const { selectedCharacter, setSelectedCharacter } =
    useSelectedCharacter() as {
      selectedCharacter: ICharacter | null;
      setSelectedCharacter: React.Dispatch<
        React.SetStateAction<ICharacter | null>
      >;
    };

  const handleGoBack = () => {
    setSelectedCharacter(null);
    router.push("/");
  };

  return selectedCharacter ? (
    <>
      <div>
        <button onClick={handleGoBack} className="px-5 py-5 rounded-full">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="
          text-indigo-400
        "
          />
        </button>
      </div>
      <CharacterDetail character={selectedCharacter} isFull={true} />
    </>
  ) : (
    <>
      <div>
        <button onClick={handleGoBack} className="px-5 py-5 rounded-full">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="
          text-indigo-400
        "
          />
        </button>
      </div>
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-gray-500">No character selected</p>
      </div>
    </>
  );
}

export default DetailsPage;
