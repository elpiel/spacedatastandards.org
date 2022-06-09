<script lang="ts">
  import "./index.css";
  import { onMount } from "svelte";
 
  import SideBar from "@/lib/SideBar.svelte";
  import Router from "svelte-spa-router";
  import { routes } from "@/stores/routes";
  
  onMount(async () => {});
</script>

<main class="relative w-screen flex h-screen">
  <div class="w-48">
    <SideBar />
  </div>
  <div class="relative flex w-full h-full overflow-hidden">
    <Router {routes} />
  </div>
</main>

<style>
</style>
