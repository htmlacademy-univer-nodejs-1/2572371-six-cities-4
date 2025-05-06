export interface DatabaseOperationsInterface<T> {
  find(query: Partial<T>): Promise<T[]>;
  create(document: T): Promise<T>;
}
