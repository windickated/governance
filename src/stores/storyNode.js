import { writable } from "svelte/store"
import DischordianSaga from "../data/DischordianSaga.js"


export let _season = writable(1);
export let _episode = writable(undefined);
export let _option = writable(undefined);

export const lastNodeNumber = [
  DischordianSaga[0].length,
  DischordianSaga[1].length
] // for each season