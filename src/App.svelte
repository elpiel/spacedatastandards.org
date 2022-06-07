<script lang="ts">
  import flatc from "./external/flatc.mjs";
  import "./index.css";
  import OMM from "@/assets/omm.fbs?raw";
  import { onMount } from "svelte";
  import CodeMirror from "./lib/CodeMirror.svelte";
  let results = "";
  import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";
  import SideBar from "@/lib/SideBar.svelte";
  import TopBar from "@/lib/TopBar.svelte";
  import SubBar from "@/lib/SubTopBar.svelte";
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
  onMount(async () => {
    let octokit = new Octokit();
    let { data } = await octokit.rest.repos.getContent({
      owner: "digitalarsenal",
      repo: "spacedatastandards.org",
      path: "standards",
    });

    console.log(data);
  });
</script>

<main class="flex h-screen">
  <div class="w-64">
    <SideBar />
  </div>
  <div class="w-full flex flex-col">
    <div class="flex flex-col h-full">
      <div class="h-16 border bg-gray-100 text-gray-500 text-xl">
        <TopBar />
      </div>
      <div><SubBar /></div>
      <div class="bg-gray-200 h-full">
        <Router {routes} />
      </div>
    </div>
  </div>
</main>

<style>
</style>
