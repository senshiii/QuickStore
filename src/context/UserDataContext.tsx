import { createContext, FC, ReactElement, useCallback, useState } from "react";
import { File, Folder } from "../types";

interface UserDataContextVariables {
  files: Array<File>;
  folders: Array<Folder>;
  addFile: (file: File) => void;
  addFolder: (folder: Folder) => void;
  removeFile: (file: File) => void;
  removeFolder: (folder: Folder) => void;
  setFiles: (files: File[]) => void;
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
  const [files, setFiles] = useState<Array<File>>([]);
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
    (newFile: File) => {
      setFiles([...files, newFile]);
    },
    [files]
  );

  const removeFile = useCallback(
    (targetFile: File) => {
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
