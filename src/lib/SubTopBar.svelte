<script lang="ts">
    import { subMenu } from "@/stores/routes";

    const subMenus = [
        { name: "Description" },
        { name: "IDL (Schema)" },
        { name: "Code" },
    ];
</script>

<div
    style="border-top:.5px solid #999; border-bottom:.5px solid #ccc"
    class="flex p-2 gap-4 bg-gray-100 text-gray-700"
>
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

<style>
  
</style>
