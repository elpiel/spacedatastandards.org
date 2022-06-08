<script lang="ts">
    import { standards, getStandards } from "@/stores/data";
    import type { PackageFile } from "@/classes/package_file";
    import Standard from "./Standard.svelte";
    import { onMount } from "svelte";
    let currentStandard: PackageFile = null;
    onMount(() => {
        getStandards();
    });
</script>

<div class="w-full h-full">
    {#if currentStandard}
        <Standard {currentStandard} />
    {:else}
        <div>
            <input type="search" />
            {#each $standards as standard, s}
                <div
                    class="cursor-pointer"
                    on:click={(e) => {
                        currentStandard = standard;
                    }}
                >
                    {standard.name}
                </div>
            {/each}
        </div>
    {/if}
</div>
