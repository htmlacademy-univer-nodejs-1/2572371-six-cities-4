export type Either<A, B> = {
  kind: 'left';
  value: A;
} | {
  kind: 'right';
  value: B;
};
