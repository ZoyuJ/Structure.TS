namespace Collection {
  
  export interface Nade4<T> {
    Above?: Nade4<T>;
    Under?: Nade4<T>;
    Left?: Nade4<T>;
    Right?: Nade4<T>;

    Property: T;
  }
  export class NadeList4<T, TNade extends Nade4<T>>{
    public Corner: Nade4<T>;
  }
}