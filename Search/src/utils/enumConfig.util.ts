export const genreConfig = function(genreIdx: number | null): string {
  if (genreIdx === 1) return 'pop';
  if (genreIdx === 2) return 'hiphop';
  if (genreIdx === 3) return 'rnb';
  if (genreIdx === 4) return 'indie';
  if (genreIdx === 5) return 'rock';
  if (genreIdx === 6) return 'edm';
  if (genreIdx === 7) return 'house';
  if (genreIdx === 8) return 'country';
  if (genreIdx === 9) return 'classical';
  if (genreIdx === 10) return 'jazz';
  return '';
};

export const typeConfig = function(typeIdx: number | null): string {
  if (typeIdx === 1) return 'MR';
  if (typeIdx === 2) return 'song';
  return '';
};
