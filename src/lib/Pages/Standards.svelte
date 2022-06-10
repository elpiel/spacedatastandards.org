<script lang="ts">
    import { standards, getStandards, last } from "@/stores/data";
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import TopBar from "../TopBar.svelte";
    import { Icon } from "svelte-awesome";
    import { file } from "svelte-awesome/icons";

    let searchTerm: string = "";

    onMount(async () => {
        await getStandards();
    });
</script>

<div class="flex flex-col h-full bg-gray-300 w-full">
    <div class="h-16 border bg-gray-100 text-gray-500 text-xl">
        <TopBar
            title={`<div class="w-full flex items-center justify-between">
            <div>Space Data Standard Directory</div> 
            <div class="text-sm h-full "> Last Refresh: ${new Date(
                $last
            ).toISOString()}</div></div>`}
        />
    </div>
    <div>
        <input type="search"
            class="rounded p-2 border m-2 w-1/3"
            placeholder="Search"
            bind:value={searchTerm}
        />
    </div>
    <div class="p-2 overflow-y-auto relative">
        {#each $standards.filter((s) => !searchTerm || ~s.name
                    .toLowerCase()
                    .indexOf(searchTerm.toLowerCase())) as standard, s}
            <div
                class="flex gap-2 items-center justify-start text-xl cursor-pointer p-3 2 bg-slate-600 hover:bg-slate-500 text-gray-300"
                on:click={(e) => {
                    push("/Standard/" + standard.name);
                }}
            >
                <Icon data={file} />{standard.name}
            </div>
        {/each}
    </div>
</div>
