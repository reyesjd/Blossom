"use client";
import { ICharacter } from "@/lib";
import { createContext, useContext, useState, ReactNode } from "react";

const SelectedCharacterContext = createContext<{
  selectedCharacter: null | ICharacter;
  setSelectedCharacter: React.Dispatch<React.SetStateAction<ICharacter | null>>;
} | null>(null);

export const SelectedCharacterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(
    null
  );

  return (
    <SelectedCharacterContext.Provider
      value={{ selectedCharacter, setSelectedCharacter }}
    >
      {children}
    </SelectedCharacterContext.Provider>
  );
};
export const useSelectedCharacter = () => {
  return useContext(SelectedCharacterContext);
};
