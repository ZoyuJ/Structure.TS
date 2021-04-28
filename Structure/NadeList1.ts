/// <reference path="Index.ts" />
namespace Collection {
  export type MatchNade1<T> = Match<Nade1<T>>;//(Nade: Nade1<T>) => boolean;
  export interface Nade1<T> {
    Next: Nade1<T>;
    Property: T;
  }
  export class NadeList1<T>  {
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
    public Find(Match: MatchNade1<T>): Nade1<T> {
      let P = this._Head;
      while (P !== null && !Match(P)) {
        P = P.Next;
      }
      return P;
    }
    public InsertBehind(Property: T, Nade: Nade1<T>): boolean;
    public InsertBehind(Property: T, Nade: MatchNade1<T>): boolean;
    public InsertBehind(Property: T, Nade: any): boolean {
      const Node = Nade.Property !== undefined ? (Nade as Nade1<T>) : this.Find(Nade as MatchNade1<T>);
      if (Node !== null) {
        Node.Next = { Next: Node.Next, Property: Property };
        return true;
      }
      return false;
    }
    public RemoveFirst(Nade: Nade1<T>): Nade1<T>;
    public RemoveFirst(Property: T): Nade1<T>;
    public RemoveFirst(Match: MatchNade1<T>): Nade1<T>;
    public RemoveFirst(x: any): Nade1<T> {
      if (typeof x === "function") {
        let P = this._Head;
        let L: Nade1<T> = null;
        const Match = x as MatchNade1<T>;
        while (P !== null && !Match(P)) {
          L = P;
          P = P.Next;
        }
        if (P === this._Head) {
          this._Head = P.Next;
        }
        else L.Next = P.Next;
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
    public RemoveLast(Nade: Nade1<T>): Nade1<T>;
    public RemoveLast(Property: T): Nade1<T>;
    public RemoveLast(Match: MatchNade1<T>): Nade1<T>;
    public RemoveLast(x: any): Nade1<T> {
      if (typeof x === "function") {
        let P = this._Head;
        let L: Nade1<T> = null;
        let LP: Nade1<T> = null;
        let LPL: Nade1<T> = null;
        const Match = x as MatchNade1<T>;
        while (P !== null) {
          if (Match(P)) {
            LP = L;
            LPL = P;
          }
          L = P;
          P = P.Next;
        }
        if (LPL === this._Head) { this._Head = LPL.Next; }
        else { LP.Next = LPL.Next; }
        return LPL;
      }
      else if (x.Property !== undefined && x.Next !== undefined) {
        const N = x as Nade1<T>;
        return this.RemoveLast(E => E === N);
      }
      else {
        const P = x as T;
        return this.RemoveLast(E => E.Property === P);
      }
    }
    public RemoveAny(Nade: Nade1<T>): Nade1<T>[];
    public RemoveAny(Property: T): Nade1<T>[];
    public RemoveAny(Match: MatchNade1<T>): Nade1<T>[];
    public RemoveAny(x: any): Nade1<T>[] {
      if (typeof x === "function") {
        const Match = x as MatchNade1<T>;
        let P = this._Head;
        let L: Nade1<T> = null;
        const Removed = [];
        while (P != null) {
          L = P;
          if (Match(P)) {
            Removed.push(P);
            if (P === this._Head) {
              this._Head = P.Next;
            }
            else {
              L.Next = P.Next;
            }
          }
          P = P.Next;
        }
        return Removed;
      }
      else if (x.Property !== undefined && x.Next !== undefined) {
        const N = x as Nade1<T>;
        return this.RemoveAny(E => E === N);
      }
      else {
        const P = x as T;
        return this.RemoveAny(E => E.Property === P);
      }
    }
    public RemoveFrom(Nade: Nade1<T>): Nade1<T>;
    public RemoveFrom(Property: T): Nade1<T>;
    public RemoveFrom(Match: MatchNade1<T>): Nade1<T>;
    public RemoveFrom(x: any): Nade1<T> {
      return null;
    }
    public Clear() {
      this._Head = null;
    }
    public Count(): number {
      let I = 0;
      let P = this._Head;
      while (P !== null) {
        P = P.Next;
        I++;
      }
      return I;
    }
  }
}