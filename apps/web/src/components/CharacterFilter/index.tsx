import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function CharacterFilter() {
  return (
    <div className="flex flex-row justify-between items-center bg-slate-200 rounded-md mb-2 w-full px-1">
      <div className="flex justify-center items-center pl-2 pr-1">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-slate-400 " />
      </div>
      <input
        type="text"
        placeholder="Search or Filter results"
        className="w-full col-span-8 bg-transparent text-slate-400 py-2 px-1 border-none focus:outline-none"
      />
      <button className="hover:bg-violet-200 flex justify-center items-center px-2 py-1 rounded-lg h-fit">
        <FontAwesomeIcon icon={faFilter} className="text-violet-400" />
      </button>
    </div>
  );
}
