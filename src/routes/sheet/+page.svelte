<script lang="ts">
    let frameEl: HTMLIFrameElement;
</script>

<iframe bind:this={frameEl} on:load={ () => frameEl.contentWindow?.print() } style="display:none" />
<button on:click={ () => { 
    frameEl.src = "./sheet/raw";
}}>Print</button>