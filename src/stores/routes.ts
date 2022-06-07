import Home from "@/lib/Pages/Home.svelte";
import Standard from "@/lib/Pages/Standard.svelte";
import Playground from "@/lib/Pages/Playground.svelte";
import Links from "@/lib/Pages/Links.svelte";
import { Writable, writable } from "svelte/store";


export const routes = {
    // Exact path
    "/": Home,
    "/Standard": Standard
};

export const subMenu: Writable<number> = writable(0)