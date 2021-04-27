declare type Match<T> = (Nade: Nade1<T>) => boolean;
class NadeList1<T>  {
  constructor(Property: any) {
    this.SetHead(Property);
  }
  protected _Head: Nade1<T>;
  public Head(): Nade1<T> { return this._Head; }
  public SetHead(Property: T);
  public SetHead(Property: Nade1<T>)
  public SetHead(Property: any) {
    const Node = Property.Property !== undefined ? (Property as Nade1<T>) : ({ Property: Property, Next: this._Head } as Nade1<T>);
    Node.Next = this._Head;
    this._Head = Node;
  }
  public Find(Match: Match<T>): Nade1<T> {
    let P = this._Head;
    while (P !== null && !Match(P)) {
      P = P.Next;
    }
    return P;
  }
  public InsertBehind(Property: T, Nade: Nade1<T>): boolean;
  public InsertBehind(Property: T, Nade: Match<T>): boolean;
  public InsertBehind(Property: T, Nade: any): boolean {
    const Node = Nade.Property !== undefined ? (Nade as Nade1<T>) : this.Find(Nade as Match<T>);
    if (Node !== null) {
      Node.Next = { Next: Node.Next, Property: Property };
      return true;
    }
    return false;
  }
  public RemoveFirst(Match: Nade1<T>): Nade1<T>;
  public RemoveFirst(Match: T): Nade1<T>;
  public RemoveFirst(Match: Match<T>): Nade1<T>;
  public RemoveFirst(x: any): Nade1<T> {
    if (typeof x === "function") {
      let P = this._Head;
      let L:Nade1<T> = null;
      const Match = x as Match<T>;
      while (P !== null && !Match(P)) {
        L = P;
        P = P.Next;
      }
      L.Next = P.Next;
      return P;
    }
    else if (x.Property !== undefined && x.Next !== undefined) {
      const N = x as Nade1<T>;
      return this.RemoveFirst(E => E === N);
    }
    else {
      const P = x as T;
      return this.RemoveFirst(E => E.Property === P);
    }
  }
  public RemoveLast() {}
  public RemoveAny() {}
  public Clear() {
    this._Head = null;
  }
  public Count():number {
    let I = 0;
    let P = this._Head;
    while (P !== null) {
      P = P.Next;
      I++;
    }
    return I;
  }
}
class NadeList2<T, TNade extends Nade2<T>>{
  public Head: TNade;
  public Tail: TNade;

}
class NadeList4<T, TNade extends Nade4<T>>{
  public Corner: Nade4<T>;
}
class NadeListN<T, TNade extends NadeN<T>>{
  public Root: NadeN<T>;


}
interface Nade1<T> {
  Next: Nade1<T>;
  Property: T;
}
interface Nade2<T> {
  Next: Nade2<T>;
  Pervious: Nade2<T>;
  Property: T;
}
interface Nade4<T> {
  Above?: Nade4<T>;
  Under?: Nade4<T>;
  Left?: Nade4<T>;
  Right?: Nade4<T>;

  Property: T;
}
interface NadeN<T> extends Nade2<T> {
  Children?: NadeList2<T, NadeN<T>>;
  Property: T;
}