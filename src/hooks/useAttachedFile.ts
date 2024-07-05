import { useEffect, useState } from "react";

type attachedFileType = {
  attributes: {
    data: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    file_name: string;
  };
};

const fetchAttachedFile = async (insertId: string) => {
  const strapiApiURL = process.env.STRAPI_API_URL;
  try {
    const response = await fetch(
      `${strapiApiURL}api/attached-files?fields[0]=file_name&populate[data][fields][0]=url&filters[insert_id][$eq]=${insertId}`
    );
    const data = (await response.json()) as { data: attachedFileType[] };
    return data.data.map((item) => {
      return {
        url: item.attributes.data.data.attributes.url,
        fileName: item.attributes.file_name,
      };
    });
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const useAttachedFile = (insertId: string) => {
  const [attachedFileData, setAttachedFileData] = useState<
    {
      url: string;
      fileName: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!insertId) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchAttachedFile(insertId);
        setAttachedFileData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, [insertId]);

  return { attachedFileData, isLoading, error };
};
