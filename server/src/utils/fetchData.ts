export const fetchData = async (url: string): Promise<any> => {
    const res = await fetch(url);
    return res.json();
  };
  