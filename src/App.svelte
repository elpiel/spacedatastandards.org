<script lang="ts">
  import flatc from "./external/flatc.mjs";
  import "./index.css";
  import OMM from "@/assets/omm.fbs?raw";
  import { onMount } from "svelte";
  let results = "";
  import SideBar from "@/lib/SideBar.svelte";
  import Router from "svelte-spa-router";
  import { routes } from "@/stores/routes";
  flatc({
    noInitialRun: true,
  }).then((m) => {
    let e = { encoding: "utf8" };
    m.FS.writeFile("/OMM.module.fbs", OMM);
    m.main(["--jsonschema", "/OMM.module.fbs"]);
    //console.log(m.FS.readdir("/"));
    results = m.FS.readFile("/OMM.module.schema.json", e);
  });
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
