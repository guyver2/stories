<!-- 
	Ross Robino
	
	View on mobile or desktop to see differences
  between the .share and .clipboard.writeText methods.
 	On mac, viewing on chrome vs safari demonstrates

  blog post: https://blog.robino.dev/posts/navigator-share-svelte

	most recent version: https://components.robino.dev#ShareButton

	Reference:
	https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
-->
<script>
  import { Button } from 'sveltestrap';

  let className = '';
  let idName = '';
  export { className as class, idName as id };
  export let text = '';
  export let url = '';
  export let title = url.split('/').splice(-1)[0]; // default end of url

  let complete = false;

  async function handleClick() {
    try {
      // @ts-ignore - this is not defined in certain browsers
      if (navigator.canShare) {
        await navigator.share({ text, url, title });
      } else {
        await navigator.clipboard.writeText(url);
        complete = true;
      }
    } catch (error) {
      console.log(error);
    }
  }
</script>

<Button color="warning" on:click={handleClick} class={className} id={idName}>
  {#if complete}
    <slot name="complete">Copied</slot>
  {:else}
    <slot>Share</slot>
  {/if}
</Button>

<noscript>{url}</noscript>
