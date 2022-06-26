import { createContext, FC, ReactElement, useCallback, useState } from "react";
import { AppFile, Folder } from "../types";

interface UserDataContextVariables {
  files: Array<AppFile>;
  folders: Array<Folder>;
  addFile: (file: AppFile) => void;
  addFolder: (folder: Folder) => void;
  removeFile: (file: AppFile) => void;
  removeFolder: (folder: Folder) => void;
  setFiles: (files: AppFile[]) => void;
  setFolders: (folders: Folder[]) => void;
}

export const UserDataContext = createContext<UserDataContextVariables>({
  folders: [],
  files: [],
  addFile: (file) => {},
  addFolder: (folder) => {},
  removeFolder: (folder) => {},
  removeFile: (file) => {},
  setFiles: (files) => {},
  setFolders: (folders) => {}
});

const UserDataContextProvider: FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [files, setFiles] = useState<Array<AppFile>>([]);
  const [folders, setFolders] = useState<Array<Folder>>([]);

  const addFolder = useCallback(
    (newFolder: Folder) => {
      setFolders([...folders, newFolder]);
    },
    [folders]
  );

  const removeFolder = useCallback(
    (targetFolder: Folder) => {
      setFolders(folders.filter((folder) => folder.id !== targetFolder.id));
    },
    [folders]
  );

  const addFile = useCallback(
    (newFile: AppFile) => {
      setFiles([...files, newFile]);
    },
    [files]
  );

  const removeFile = useCallback(
    (targetFile: AppFile) => {
      setFiles(files.filter((file) => file.id !== targetFile.id));
    },
    [files]
  );

  return (
    <UserDataContext.Provider
      value={{
        files,
        folders,
        addFile,
        addFolder,
        removeFile,
        removeFolder,
        setFiles,
        setFolders
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextProvider;
