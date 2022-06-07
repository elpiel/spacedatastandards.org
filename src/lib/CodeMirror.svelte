<script lang="ts">
  import "codemirror/lib/codemirror.css";
  import CodeMirror from "codemirror";
  import { editorContent } from "../stores/editor";
  //import "codemirror/mode/javascript/javascript";
  import "@/external/google-modes/flatbuffers.js";
  import { onDestroy, onMount } from "svelte";
  let codeMirrorInstance;
  let id = "cm-editor-21394595934509";

  $: {
    if ($editorContent && codeMirrorInstance) {
      console.log($editorContent)
      codeMirrorInstance.setValue($editorContent);
    }
  }

  onMount(() => {
    codeMirrorInstance = CodeMirror(document.getElementById(id), {
      value: "",
      mode: "flatbuffers",
      lineNumbers: true,
    });
    console.log(codeMirrorInstance);
  });
  onDestroy(() => {
    codeMirrorInstance.de;
  });
</script>

<div {id} />
