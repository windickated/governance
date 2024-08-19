import { writable } from "svelte/store"
import DischordianSaga from "../data/DischordianSaga.js"


export let season = writable(1);
export let node = writable(undefined);

export const lastNodeNumber = [
  DischordianSaga[0].length,
  DischordianSaga[1].length
];