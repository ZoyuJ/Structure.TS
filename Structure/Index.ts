/// <reference path="NadeList1.ts"/>
/// <reference path="NadeList2.ts"/>
/// <reference path="NadeList4.ts"/>
/// <reference path="NadeListN.ts"/>

namespace Collection {
  export type Match<T> = (Nade: T) => boolean;
  export type Compare<T> = (L: T, R: T) => boolean;

}