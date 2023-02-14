<script lang="ts">
  import type { Record } from 'pocketbase';
  import { pb } from '$lib/pocketbase';
  import { onMount } from 'svelte';

  let stories: Record[] = [];
  let current_story_id = 0;
  export let current_story: Record | null = null;

  onMount(async () => {
    const resultList = await pb
      .collection('stories')
      .getList(1, 10, { sort: 'created', filter: `public=true`, expand: 'owner' });
    stories = resultList.items;
    stories = stories.sort((a, b) => 0.5 - Math.random()); // shuffle
    if (stories.length) {
      current_story = stories[0];
    }
  });

  let clickHandler = (story: Record) => {
    current_story_id = (current_story_id + 1) % stories.length;
    if (stories.length) {
      current_story = stories[current_story_id];
    }
  };
</script>

<div class="main">
  {#if current_story}
    <div class="one-line-title-cover">
      <div class="thumbnail">
        <img
          src={pb.getFileUrl(current_story, current_story.cover)}
          alt="cover: {current_story.title}"
        />
      </div>
      <div class="title">{current_story.title}</div>
    </div>

    <div class="text">{current_story.text}</div>
  {:else}
    <img src="processing.gif" alt="processing..." />
  {/if}
  <button class="next" on:click={clickHandler}>Do Tell!</button>
</div>

<style>
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: 100%;
    width: 100%;
    padding: 100px 50px 100px 50px;
    row-gap: 20px;
  }

  .one-line-title-cover {
    display: flex;
    flex-direction: row;
    width: 90%;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }

  .title {
    width: 60%;
    text-align: left;
    text-transform: capitalize;
    font-size: 1.5em;
    font-weight: 700;
    margin-top: 1em;
    margin-bottom: 1em;
    width: 100%;
  }

  .thumbnail {
    width: 30%;
  }

  .thumbnail > img {
    max-width: 100%;
    max-height: 100%;
    object-fit: scale-down;
    border-radius: 5px;
  }

  .text {
    max-width: 80%;
    text-align: left;
    white-space: pre-line;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(180deg, #000 80%, transparent);
  }

  button {
    border: solid 1px var(--col2);
    color: var(--col6);
    background-color: var(--col8);
    border-radius: 10px;
    width: 25%;
  }
</style>
