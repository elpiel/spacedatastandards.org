<script lang="ts">
    import { location } from "svelte-spa-router";
    $: {
        console.log($location);
    }
</script>

<div class="flex flex-col gap-2 font-light w-full text-xl">
    <a class:underline={$location === "/"} href="#/">HOME</a>
    <a class:underline={$location === "/Standards"} href="#/Standards"
        >STANDARDS</a
    >
</div>

<style lang="postcss">
    a {
        @apply p-2  w-full underline-offset-4;
    }
    a:hover {
        @apply bg-gray-500;
    }
</style>
