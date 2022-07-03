import { createContext, useCallback, useState } from "react";
import { AppFile, Folder } from "../types";

interface SelectionContextData {
  selectedFile: AppFile | null;
  selectedFolder: Folder | null;
  setFile: (file: AppFile) => void;
  setFolder: (folder: Folder) => void;
  updateFolder: (folder: Folder | null) => void;
  updateFile: (file: AppFile |null) => void;
}

export const SelectionContext = createContext<SelectionContextData>({
  selectedFile: null,
  selectedFolder: null,
  setFile: (file) => {},
  setFolder: (folder) => {},
  updateFolder: (folder) => {},
  updateFile: (file) => {}
});

const SelectionContextProvider = ({ children }: { children: any }) => {
  const [selectedFile, setSelectedFile] = useState<AppFile | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);

  const fileSelectionHandler = useCallback(
    (file: AppFile) => {
      setSelectedFolder(null);
      if (selectedFile?.id == file.id) {
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
      }
    },
    [selectedFile]
  );

  const folderSelectionHandler = useCallback(
    (folder: Folder) => {
      setSelectedFile(null);
      if (selectedFolder?.id == folder.id) {
        setSelectedFolder(null);
      } else {
        setSelectedFolder(folder);
      }
    },
    [selectedFolder]
  );

  // console.log("[SelectionContext] Selected File", selectedFile);
  // console.log("[SelectionContext] Selected Folder", selectedFolder);

  return (
    <SelectionContext.Provider
      value={{
        selectedFile: selectedFile,
        selectedFolder: selectedFolder,
        setFile: fileSelectionHandler,
        setFolder: folderSelectionHandler,
        updateFolder: setSelectedFolder,
        updateFile: setSelectedFile
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export default SelectionContextProvider;
