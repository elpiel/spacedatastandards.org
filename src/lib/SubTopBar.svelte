<script lang="ts">
    import { subMenu } from "@/stores/routes";
    import { Icon } from "svelte-awesome";
    import { download, language } from "svelte-awesome/icons";
    import { mFS, en } from "@/stores/data";
    import JSZip from "jszip";
    import { saveAs } from "file-saver";

    export let currentStandard: PackageFile;

    import {
        languages,
        currentEditorLanguage,
        currentEditorFile,
        totalFiles,
    } from "@/stores/editor";
    import type { PackageFile } from "@/classes/package_file";

    const subMenus = [
        { name: "Description" },
        { name: "IDL (Schema)" },
        { name: "Code" },
    ];
</script>

<div
    style="border-top:.5px solid #999; border-bottom:.5px solid #ccc"
    class="flex p-2 bg-gray-100 text-gray-700 justify-between"
>
    <div class="flex gap-4">
        {#each subMenus as sMenu, s}
            <div
                class:border-b-2={$subMenu === s}
                on:click={(e) => {
                    $subMenu = s;
                }}
                class="cursor-pointer border-gray-600"
            >
                {sMenu.name}
            </div>
        {/each}
    </div>
    {#if true || $subMenu === 2}
        <div>
            <div class="flex gap-2 text-xs">
                <div>
                    <select
                        class="p-1 border cursor-pointer"
                        bind:value={$currentEditorFile}
                    >
                        {#each $totalFiles as file, f}
                            <option value={file}>{file}</option>
                        {/each}
                    </select>
                </div>
                <div>
                    <select
                        class="p-1 border cursor-pointer"
                        bind:value={$currentEditorLanguage}
                    >
                        {#each languages as language, l}
                            <option value={l}>{language[1]}</option>
                        {/each}
                    </select>
                </div>
                <div
                    on:click={(e) => {
                        if (mFS) {
                            let zip = new JSZip();
                            $totalFiles.forEach((file) => {
                                zip.file(file, mFS.readFile("/" + file, en));
                            });
                            zip.generateAsync({ type: "blob" }).then(function (
                                content
                            ) {
                                saveAs(
                                    content,
                                    `${currentStandard?.name}-${languages[$currentEditorLanguage][1]}.zip`
                                );
                            });
                        }
                    }}
                    class="cursor-pointer flex border items-center gap-1 text-xs p-1 bg-blue-600 text-white"
                >
                    <Icon data={download} />Download
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
</style>
