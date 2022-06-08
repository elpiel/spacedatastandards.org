import Home from "@/lib/Pages/Home.svelte";
import Standards from "@/lib/Pages/Standards.svelte";
import Playground from "@/lib/Pages/Playground.svelte";
import Links from "@/lib/Pages/Links.svelte";
import { Writable, writable } from "svelte/store";

export const routes = {
    // Exact path
    "/": Home,
    "/Standards": Standards
};

export const subMenu: Writable<number> = writable(0)