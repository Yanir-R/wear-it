export const appendQueryParams = (url: URL, params: Record<string, string | number | boolean>) => {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        url.searchParams.append(key, value.toString());
      }
    });
  };