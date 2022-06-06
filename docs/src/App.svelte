<script lang="ts">
  import logo from "./assets/svelte.png";
  import Counter from "./lib/Counter.svelte";
  import flatc from "./external/flatc.mjs";
  import "./index.css";
  import "codemirror/lib/codemirror.css";
  import { Octokit, App } from "octokit/dist-web/index";
  import OMM from "@/assets/omm.fbs?raw";
  import CodeMirror from "codemirror";
  //import "codemirror/mode/javascript/javascript";
  import "@/external/google-modes/flatbuffers.js";
  import { onMount } from "svelte";
  let codeMirrorInstance;
  let results = "";

  flatc({
    noInitialRun: true,
  }).then((m) => {
    let e = { encoding: "utf8" };
    m.FS.writeFile("/OMM.module.fbs", OMM);
    m.main(["--jsonschema", "/OMM.module.fbs"]);
    console.log(m.FS.readdir("/"));
    results = m.FS.readFile("/OMM.module.schema.json", e);
  });
  onMount(() => {
    codeMirrorInstance = CodeMirror(document.getElementById("editor"), {
      value: OMM,
      mode: "flatbuffers",
      lineNumbers: true,
    });
    console.log(codeMirrorInstance);
  });
</script>

<main class="flex flex-col gap-2 ">
  <div id="editor" />
  <textarea class="border p-2 rounded h-64 w-full" bind:value={results} />
</main>

<style>
</style>
