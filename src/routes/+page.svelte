
<script lang="ts">
    import { onMount } from "svelte";
    import QrScanner from "qr-scanner";

    let videoEl: HTMLVideoElement;
    let scanner: QrScanner;

    let tag: string | undefined; 

    onMount( () => {
        scanner = new QrScanner(
            videoEl,
            (obj) => {
                const [_, scanned] = /\/p\/(.+)/.exec(obj.data) || [];
                tag = scanned; 
            },
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

This is the home page

<video bind:this={videoEl} id="preview" />
{tag || ""}