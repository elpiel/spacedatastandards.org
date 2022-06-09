<script lang="ts">
    import TopBar from "@/lib/TopBar.svelte";
    import SubBar from "@/lib/SubTopBar.svelte";
    import type { PackageFile } from "@/classes/package_file";
    import { subMenu } from "@/stores/routes";
    import { octokit, ownerObject, standards, sTimeout } from "@/stores/data";
    import { onMount } from "svelte";
    import localForage from "localforage";
    import { push } from "svelte-spa-router";

    export let currentStandard: PackageFile;
    export let params: any = {};
    if (params.name) {
        currentStandard = $standards.find((s) => {
            return s.name === params.name;
        });
    } else {
        push("/Standards");
    }
    let timeStampKey = `${currentStandard}:timestamp`;
    let repoData: any = {
        readMe: "",
        IDL: "",
    };
    onMount(async () => {
        let _repoData: any = await localForage.getItem(currentStandard.name);
        let last: any = await localForage.getItem(timeStampKey);

        if (
            !_repoData?.readMe?.length ||
            !last ||
            Date.now() > sTimeout + last
        ) {
            repoData.readMe = atob(
                (
                    await octokit.rest.repos.getContent({
                        ...ownerObject,
                        path: `/standards/${currentStandard.name}/README.md`,
                        mediaType: {
                            format: "string",
                        },
                    })
                ).data.content
            );
            localForage.setItem(currentStandard.name, repoData);
        } else {
            repoData = _repoData;
        }
    });
</script>

<div class="w-full flex flex-col h-full">
    <div class="flex flex-col h-full">
        <div class="h-16 border bg-gray-100 text-gray-500 text-xl">
            <TopBar title={currentStandard?.name} />
        </div>
        <div><SubBar /></div>
        <div class="bg-gray-200 h-full p-6 text-gray-700 overflow-y-auto">
            {#if $subMenu === 0}
                <div class="readMeWrapper">{@html repoData.readMe}</div>
            {:else if $subMenu === 1}
                <div>b</div>
            {:else if $subMenu === 2}
                {currentStandard.name}
            {/if}
        </div>
    </div>
</div>

<style lang="postcss">
    .readMeWrapper {
        @apply text-sm;
    }

    .readMeWrapper > :global(h1) {
        @apply text-2xl whitespace-nowrap mt-4 mb-4 border-b-2 border-gray-300;
    }

    .readMeWrapper > :global(h2) {
        @apply text-xl whitespace-nowrap mt-4 mb-4 border-b-2 border-gray-300;
    }
    .readMeWrapper > :global(h3) {
        @apply text-xl whitespace-nowrap mt-4 mb-4 border-b-2 border-gray-300;
    }
    .readMeWrapper > :global(h4) {
        @apply text-xl whitespace-nowrap mt-4 mb-4 border-b-2 border-gray-300;
    }
    .readMeWrapper > :global(h5) {
        @apply text-xl whitespace-nowrap mt-4 mb-4 border-b-2 border-gray-300;
    }
    .readMeWrapper > :global(h6) {
        @apply text-xl whitespace-nowrap mt-4 mb-4 border-b-2 border-gray-300;
    }
    .readMeWrapper > :global(h7) {
        @apply text-xl whitespace-nowrap mt-4 mb-4 border-b-2 border-gray-300;
    }
    .readMeWrapper > :global(table) {
        @apply text-left mt-6;
    }
    .readMeWrapper > :global(table > thead > tr > th) {
        @apply p-2 bg-gray-100 border border-gray-300 bg-gray-600 text-gray-200;
    }
    .readMeWrapper > :global(table > thead > tr > th:nth-child(1)) {
        @apply rounded-tl-md;
    }
    .readMeWrapper > :global(table > thead > tr > th:last-child) {
        @apply rounded-tr-md;
    }
    .readMeWrapper > :global(table > tbody > tr) {
        @apply border border-gray-300;
    }
    .readMeWrapper > :global(table > tbody > tr > td) {
        @apply pb-2 pt-3 pl-2 border border-gray-300;
    }
    .readMeWrapper > :global(table > tbody > tr:nth-child(odd)) {
        @apply pb-2 pt-3 pl-2 border bg-gray-100;
    }
</style>
