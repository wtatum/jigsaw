<script lang="ts">
    import type { PageData } from "./$types";
    import { dev } from "$app/environment"
    import { onMount } from "svelte";
    import QRCode  from "qrcode";
    import QrScanner from "qr-scanner";
    
    export let data: PageData;

    let videoEl: HTMLVideoElement;
    let scanner: QrScanner;
    onMount( () => {
        scanner = new QrScanner(
            videoEl,
            console.log,
            {
                returnDetailedScanResult: true,
                highlightCodeOutline: true,
                highlightScanRegion: true,
                preferredCamera: "environment"
            }
        );
        scanner.start();
    })
</script>

<video bind:this={videoEl} id="preview" />