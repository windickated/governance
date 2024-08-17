import { writable } from "svelte/store";
import seasonOne from "../data/DischordianSaga-1";

let node = writable(seasonOne.length);

export default node;