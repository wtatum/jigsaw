<script lang="ts">
    import { dev as isDev } from "$app/environment";
    import { onMount } from "svelte";
    import type { LayoutData } from "./$types";

    export let data: LayoutData;
    let isSec: boolean;
    onMount(() => {
        isSec = window.location.protocol.startsWith("https");
    });
</script>

{#if isDev}
    <span>In Development Mode</span>
{/if}
<slot/>