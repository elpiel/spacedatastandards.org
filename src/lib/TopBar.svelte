<script lang="ts">
    import type { PackageFile } from "@/classes/package_file";
    export let currentStandard: PackageFile;
</script>

<div class="p-2 bg-gray-200 h-full flex items-center text-3xl font-light">
    {currentStandard.name}
</div>
