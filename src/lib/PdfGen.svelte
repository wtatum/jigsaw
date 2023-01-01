<script lang="ts">
    import { create, docToIframe, qrcodeSheet } from "$lib/util/pdf";
	import type { LoadEvent } from "@sveltejs/kit";

    let iframeEl: HTMLIFrameElement;

    const generate = () => {
        const doc = create();
        docToIframe(doc, iframeEl);
        qrcodeSheet(doc, 3);
    };
    const onLoad = () => iframeEl.contentWindow?.print();
</script>

<iframe bind:this={iframeEl} on:load={onLoad} style="display: none"/>
<button on:click={generate} >Press</button>