namespace Collection {
  export interface NadeN<T> extends Nade2<T> {
    Children?: NadeList2<T, NadeN<T>>;
    Property: T;
  }
  export class NadeListN<T, TNade extends NadeN<T>>{
    public Root: NadeN<T>;


  }
}