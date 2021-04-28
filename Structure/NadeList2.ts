namespace Collection {
  export interface Nade2<T> {
    Next: Nade2<T>;
    Pervious: Nade2<T>;
    Property: T;
  }
  export class NadeList2<T, TNade extends Nade2<T>>{
    public Head: TNade;
    public Tail: TNade;

  }
}