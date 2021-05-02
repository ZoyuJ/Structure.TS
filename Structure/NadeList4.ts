namespace Collection {
  
  export interface Nade4<T> extends Node2<T> {
    Left?: Nade4<T>;
    Right?: Nade4<T>;
  }
  export class NadeList4<T>{

    public Corner: Nade4<T>;
  }
}