<script lang="ts">
    import { onMount } from "svelte";
    import QrScanner from "qr-scanner";

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