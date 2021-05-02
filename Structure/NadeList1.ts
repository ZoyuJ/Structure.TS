/// <reference path="Index.ts" />
namespace Collection {
  export type MatchNode1<T> = Match<Node1<T>>;//(Nade: Nade1<T>) => boolean;
  export interface Node1<T> {
    Next?: Node1<T>;
    Value: T;
  }
  export class NadeList1<T>  {
    public static Tail<T>(Start: Node1<T>): Node1<T> {
      if (Start.Next === null) return Start;
      return this.Find(Start, E => E.Next === null);
    }
    public static Find<T>(Start: Node1<T>, Match: MatchNode1<T>): Node1<T> {
      let P = Start;
      while (P !== null) {
        if (Match(P)) {
          return P;
        }
        P = P.Next;
      }
      return null;
    }
    public static FindAll<T>(Start: Node1<T>, Match: MatchNode1<T>): Node1<T>[] {
      let P = Start;
      const Res = [];
      while (P !== null) {
        if (Match(P)) {
          Res.push(P);
        }
        P = P.Next;
      }
      return Res;
    }
    public static Replace<T>(Node: Node1<T>, NewNode: Node1<T>) {
      NewNode.Next = Node.Next;
      Node.Next = NewNode;
    }
    public static Add<T>(Node: Node1<T>, NewNode: Node1<T>) {
      if (Node.Next === null) Node.Next = NewNode;
      this.Add(this.Tail(Node), NewNode);
    }
    public static InsertAfter<T>(Start: Node1<T>, Value: T, Match: MatchNode1<T>): Node1<T> {
      const F = this.Find(Start, Match);
      if (F === null) return null;
      const N: Node1<T> = { Value: Value };
      N.Next = F.Next;
      F.Next = N;
      return N;
    }
    public static RemoveNext<T>(Start: Node1<T>): Node1<T> {
      const N = Start.Next.Next;
      Start.Next = N;
      return N;
    }
    public static RemoveFirst<T>(Start: Node1<T>, Match: MatchNode1<T>): Node1<T> {
      let P = Start;
      let L: Node1<T> = null;
      while (P !== null && !Match(P)) {
        L = P;
        P = P.Next;
      }
      if (P === Start) {
        Start = P.Next;
      }
      else L.Next = P.Next;
      return P;
    }
    public static RemoveLast<T>(Start: Node1<T>, Match: MatchNode1<T>): Node1<T> {
      let P = Start;
      let LP: Node1<T> = null;
      let LPL: Node1<T> = null;
      while (P !== null) {
        if (Match(P)) {
          LPL = P;
        }
        P = P.Next;
      }
      if (LPL === Start) { Start = LPL.Next; }
      else { LP.Next = LPL.Next; }
      return LPL;
    }
    public static RemoveAll<T>(Start: Node1<T>, Match: MatchNode1<T>): Node1<T>[] {
      let Res = [];
      let P = Start.Next;
      let LP: Node1<T> = null;
      while (P !== null) {
        if (Match(P)) {
          Res.push(this.RemoveNext(LP));
        }
        LP = P;
        P = P.Next;
      }
      return Res;
    }
    public static Count<T>(Start: Node1<T>): number {
      let I = 0;
      let P = Start;
      while (P !== null) {
        P = P.Next;
        I++;
      }
      return I;
    }

    constructor(...Values: T[]) {
      if (Values === null || Values.length === 0) this.Head = null;
      else if (Values.length === 1) this.Head = { Value: Values[0] };
      else {
        let P = this.Head;
        for (const N of Values) {
          if (this.Head === null) { this.Head = { Value: N }; P = this.Head; }
          else {
            P.Next = { Value: N };
          }
          P = P.Next;
        }
      }
    }
    public Head: Node1<T>;
  }
}