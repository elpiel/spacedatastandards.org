<script lang="ts">
    import { standards, getStandards } from "@/stores/data";
    import type { PackageFile } from "@/classes/package_file";
    import Standard from "./Standard.svelte";
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import TopBar from "../TopBar.svelte";

    onMount(async () => {
        await getStandards();
    });
</script>

<div class="flex flex-col h-full bg-gray-300">
    <div class="h-16 border bg-gray-100 text-gray-500 text-xl">
        <TopBar title={"Space Data Standards"} />
    </div>
    <div class="text-sm">
        <input class="p-2 border m-2 w-1/3" placeholder="Search" />
    </div>
    <div class="overflow-y-auto relative">
        {#each $standards as standard, s}
            <div
                class="text-xl cursor-pointer p-3 2 bg-slate-400"
                on:click={(e) => {
                    push("/Standard/" + standard.name);
                }}
            >
                {standard.name}
            </div>
        {/each}
    </div>
</div>
