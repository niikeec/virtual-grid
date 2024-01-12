export const fetchServerPage = async (limit: number, offset: number = 0) => {
  const data = new Array(limit).fill(0);

  await new Promise((r) => setTimeout(r, 500));

  return { data, nextOffset: offset + 1 };
};
