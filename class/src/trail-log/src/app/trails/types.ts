export type Trail = {
  id: string;
  name: string;
  miles: number;
  difficulty: 'easy' | 'moderate' | 'hard' | 'extreme';
  favorite: boolean;
};

// export type ApiTrail = {
//   id: string;
//   name: string;
//   miles: number;
//   difficulty: 'easy' | 'moderate' | 'hard' | 'extreme';
// };

export type ApiTrail = Omit<Trail, 'favorite'>;
