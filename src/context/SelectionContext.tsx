import { createContext, useCallback, useState } from "react";
import { AppFile, Folder } from "../types";

interface SelectionContextData {
  selectedFile: AppFile | undefined;
  selectedFolder: Folder | undefined;
  setFile: (file: AppFile) => void;
  setFolder: (folder: Folder) => void;
  updateFolder: (folder: Folder | null) => void;
  updateFile: (file: AppFile) => void;
}

export const SelectionContext = createContext<SelectionContextData>({
  selectedFile: undefined,
  selectedFolder: undefined,
  setFile: (file) => {},
  setFolder: (folder) => {},
  updateFolder: (folder) => {},
  updateFile: (file) => {}
});

const SelectionContextProvider = ({ children }: { children: any }) => {
  const [selectedFile, setSelectedFile] = useState<AppFile | null>();
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>();

  const fileSelectionHandler = useCallback(
    (file: AppFile) => {
      setSelectedFolder(undefined);
      if (selectedFile?.id == file.id) {
        setSelectedFile(undefined);
      } else {
        setSelectedFile(file);
      }
    },
    [selectedFile]
  );

  const folderSelectionHandler = useCallback(
    (folder: Folder) => {
      setSelectedFile(undefined);
      if (selectedFolder?.id == folder.id) {
        setSelectedFolder(undefined);
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
        selectedFile: selectedFile!,
        selectedFolder: selectedFolder!,
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
