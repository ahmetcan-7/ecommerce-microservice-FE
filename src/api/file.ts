import { api } from "./axios";

const saveFile = async (file: FormData) => {
  const { data } = await api.post<string>(
    `/file/saveImage`,

    file
  );

  return data;
};

const removeFile = async (imagePath: string) => {
  const { data } = await api.delete<string>(`/file/removeImage`, {
    params: { imagePath: imagePath },
  });

  return data;
};

export const FileApi = {
  saveFile,
  removeFile,
};
