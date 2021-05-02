/// <reference path="Index.ts" />
namespace Collection {
  export type MatchNode2<T> = Match<Node2<T>>;
  export interface Node2<T> extends Node1<T> {
    Next?: Node2<T>;
    Pervious?: Node2<T>;
  }
  export class NodeList2<T>{

    public static Head<T>(Start: Node2<T>): Node2<T> {
      if (Start.Pervious === null) return Start;
      return this.FindBefore(Start, E => E.Pervious === null);
    }
    public static Tail<T>(Start: Node2<T>): Node2<T> {
      if (Start.Next === null) return Start;
      return this.FindAfter(Start, E => E.Next === null);
    }
    public static FindAfter<T>(Start: Node2<T>, Match: MatchNode2<T>): Node2<T> {
      let P = Start;
      while (P !== null) {
        if (Match(P)) {
          return P;
        }
        P = P.Next;
      }
      return null;
    }
    public static FindAll<T>(Start: Node2<T>, Match: MatchNode2<T>): Node2<T>[] {
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
    public static FindBefore<T>(Start: Node2<T>, Match: MatchNode2<T>): Node2<T> {
      let P = Start;
      while (P !== null) {
        if (Match(P)) {
          return P;
        }
        P = P.Pervious;
      }
      return null;
    }
    public static FindAllBefore<T>(Start: Node2<T>, Match: MatchNode2<T>): Node2<T>[] {
      let P = Start;
      const Res = [];
      while (P !== null) {
        if (Match(P)) {
          Res.push(P);
        }
        P = P.Pervious;
      }
      return Res;
    }

    public static Count<T>(Start: Node2<T>): number {
      let P = Start.Pervious;
      let N = Start.Next;
      let C = 1;
      while (N !== null || P !== null) {
        if (P !== null) C++;
        if (N !== null) C++;
        P = P.Pervious;
        N = N.Next;
      }
      return C;
    }
    public static Replace<T>(Node: Node2<T>, NewNode: Node2<T>) {
      NewNode.Pervious = Node.Pervious;
      NewNode.Next = Node.Next;
    }
    public static Remove<T>(Node: Node2<T>) {
      if (Node !== null) {
        if (Node.Pervious !== null) Node.Pervious.Next = Node.Next;
        if (Node.Next !== null) Node.Next.Pervious = Node.Pervious;
      }
    }
    public static RemoveAll<T>(Start: Node2<T>, Match: MatchNode2<T>) {
      let P = Start.Pervious;
      let N = Start.Next;
      if (Match(Start)) this.Remove(Start);
      while (N !== null || P !== null) {
        if (Match(P)) this.Remove(P);
        if (Match(N)) this.Remove(N);
        N = N.Next;
        P = P.Pervious;
      }
    }
    public static RemoveBeforeLast<T>(Start: Node2<T>, Match: MatchNode2<T>): Node2<T> {
      let P = Start;
      let F: Node2<T> = null;
      while (P !== null) {
        if (Match(P)) F = P;
        P = P.Pervious;
      }
      if (F !== null) this.Remove(F);
      return F;
    }
    public static RemoveAfterLast<T>(Start: Node2<T>, Match: MatchNode2<T>): Node2<T> {
      let P = Start;
      let F: Node2<T> = null;
      while (P !== null) {
        if (Match(P)) F = P;
        P = P.Next;
      }
      if (F !== null) this.Remove(F);
      return F;
    }
    public static RemoveBefore<T>(Start: Node2<T>, Match: MatchNode2<T>): Node2<T> {
      const Node = this.FindBefore(Start, Match);
      this.Remove(Node);
      return Node;
    }
    public static RemoveAfter<T>(Start: Node2<T>, Match: MatchNode2<T>): Node2<T> {
      const Node = this.FindAfter(Start, Match);
      this.Remove(Node);
      return Node;
    }

    public static AddBefore<T>(Start: Node2<T>, Value: T, Match: MatchNode2<T>): boolean;
    public static AddBefore<T>(Start: Node2<T>, Value: T, Nade: Node2<T>): boolean;
    public static AddBefore<T>(Start: Node2<T>, Value: T, x: any): boolean {
      return this.AddNodeBefore(Start, { Value: Value }, x);
    }
    public static AddNodeBefore<T>(Start: Node2<T>, Value: Node2<T>, Match: MatchNode2<T>): boolean;
    public static AddNodeBefore<T>(Start: Node2<T>, Value: Node2<T>, Nade: Node2<T>): boolean;
    public static AddNodeBefore<T>(Start: Node2<T>, Value: Node2<T>, x: any): boolean {
      if (typeof x === "function") {
        const Node = this.FindAfter(Start, x as MatchNode2<T>);
        if (Node === null) return false;
        return this.AddNodeBefore(Start, Value, Node);
      }
      else {
        Value.Next = x;
        Value.Pervious = x.Pervious;
        x.Pervious = Value;
        return true;
      }
    }
    public static AddAfter<T>(Start: Node2<T>, Value: T, Match: MatchNode2<T>): boolean;
    public static AddAfter<T>(Start: Node2<T>, Value: T, Nade: Node2<T>): boolean;
    public static AddAfter<T>(Start: Node2<T>, Value: T, x: any): boolean {
      return this.AddNodeAfter(Start, { Value: Value }, x);
    }
    public static AddNodeAfter<T>(Start: Node2<T>, Value: Node2<T>, Match: MatchNode2<T>): boolean;
    public static AddNodeAfter<T>(Start: Node2<T>, Value: Node2<T>, Nade: Node2<T>): boolean;
    public static AddNodeAfter<T>(Start: Node2<T>, Value: Node2<T>, x: any): boolean {
      if (typeof x === "function") {
        const Node = this.FindAfter(Start, x as MatchNode2<T>);
        if (Node === null) return false;
        return this.AddNodeBefore(Start, Value, Node);
      }
      else {
        Value.Pervious = x;
        Value.Next = x.Next;
        x.Next = Value;
        return true;
      }
    }

    public static ForEach<T>(Start: Node2<T>, Do: (Node: Node2<T>) => void) {
      const H = this.Head(Start);
      this.ForEachAfter(H, Do);
    }
    public static ForEachAfter<T>(Start: Node2<T>, Do: (Node: Node2<T>) => void) {
      let P = Start;
      while (P !== null) {
        Do(P);
        P = P.Next;
      }
    }
    public static ForEachBefore<T>(Start: Node2<T>, Do: (Node: Node2<T>) => void) {
      let P = Start;
      while (P !== null) {
        Do(P);
        P = P.Pervious;
      }
    }

    *[Symbol.iterator]() {
      let P = this.Head;
      while (P !== null) { yield P; P = P.Next; }
    }

    public Head: Node2<T>;
    constructor(...Nodes: T[]) {
      if (Nodes.length === 0) this.Head = null;
      else if (Nodes.length === 1) this.Head = { Value: Nodes[0] };
      else {
        let P = this.Head;
        for (const N of Nodes) {
          if (P === null) P = { Value: N };
          else {
            P.Next = { Value: N };
            P = P.Next;
          }
        }
      }
    }



  }
}