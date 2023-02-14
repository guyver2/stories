<script lang="ts">
  import MediaQuery from './MediaQuery.svelte';
  import { pb } from '$lib/pocketbase';
  import type { Record } from 'pocketbase';
  import StoryInfo from './StoryInfo.svelte';
  export let story: Record | null = null;
  export let show_public_only = false;
  export let show_info = true;
</script>

<div class="story-info">
  <div class="story">
    {#if story}
      <div class="title">{story.title}</div>
      <img class="thumbnail" src={pb.getFileUrl(story, story.cover)} alt="cover: {story.title}" />
      <div class="text">{story.text}</div>
    {:else}
      <div class="empty">Choose a Story.</div>
    {/if}
  </div>

  <!-- Desktop only -->
  <MediaQuery query="(min-width: 801px)" let:matches>
    {#if matches && show_info}
      <StoryInfo {show_public_only} {story} />
    {/if}
  </MediaQuery>
</div>

<style>
  /* Desktop */
  @media only screen and (min-width: 801px) {
    .story-info {
      display: grid;
      grid-template-columns: 4fr 1fr;
      gap: 10px;
      justify-items: center;
    }

    .story {
      width: 60%;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: auto;
      border: solid 1px #785d52;
      border-radius: 30px;
      margin-bottom: 50px;
      padding-bottom: 30px;
      background-color: rgba(var(--col8rgb), 0.5);
    }

    .text {
      max-width: 600px;
      text-align: left;
      white-space: pre-line;
    }

    .thumbnail {
      min-width: 500px;
      max-width: 500px;
      border-radius: 10px;
      margin-bottom: 1em;
    }
  }

  /* Mobile */
  @media only screen and (max-width: 800px) {
    .story-info {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .story {
      width: 100vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: auto;
      padding-bottom: 30px;
    }
    .text {
      padding: 1em;
      text-align: left;
      white-space: pre-line;
      font-size: large;
    }

    .thumbnail {
      min-width: 90vw;
      max-width: 90vw;
      border-radius: 10px;
      margin-bottom: 1em;
    }

    .title {
      padding-left: 1em;
      padding-right: 1em;
    }
  }

  .title {
    text-align: center;
    text-transform: capitalize;
    font-size: 2em;
    font-weight: 700;
    margin-top: 1em;
    margin-bottom: 1em;
  }
</style>
