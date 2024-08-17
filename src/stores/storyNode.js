import { writable } from "svelte/store";
import seasonOne from "../data/DischordianSaga-1";

export const lastNodeNumber = seasonOne.length;
export let node = writable(lastNodeNumber);