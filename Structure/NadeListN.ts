namespace Collection {
  export interface NodeN<T> {
    Parent?: NodeN<T>;
    Children?: NodeList2<T>;
    Value: T;
  }
  export class NodeListN<T>{


  }
}