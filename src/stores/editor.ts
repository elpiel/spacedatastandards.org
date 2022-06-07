import { Writable, writable } from "svelte/store";
import OMM from "@/assets/omm.fbs?raw";
export const editorContent:Writable<string> = writable(OMM);