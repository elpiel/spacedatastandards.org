<script lang="ts">
  import logo from "./assets/svelte.png";
  import Counter from "./lib/Counter.svelte";
  import flatc from "./external/flatc.mjs";
  import "./index.css";
  import { Octokit, App } from "octokit/dist-web/index";
  import OMM from "@/assets/omm.fbs?raw";
  import { onMount } from "svelte";
  import CodeMirror from "./lib/CodeMirror.svelte";
  let results = "";
  import SideBar from "./lib/SideBar.svelte";
  flatc({
    noInitialRun: true,
  }).then((m) => {
    let e = { encoding: "utf8" };
    m.FS.writeFile("/OMM.module.fbs", OMM);
    m.main(["--jsonschema", "/OMM.module.fbs"]);
    console.log(m.FS.readdir("/"));
    results = m.FS.readFile("/OMM.module.schema.json", e);
  });
  onMount(() => {});
</script>

<main class="flex h-screen">
  <div class="w-64">
    <SideBar />
  </div>
  <div class="w-full">
    <CodeMirror />
    
  </div>
</main>

<style>
</style>
