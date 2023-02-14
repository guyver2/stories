<script lang="ts">
  import { Button } from 'sveltestrap';
  import { currentUser, pb } from '$lib/pocketbase';
  import type { Record } from 'pocketbase';
  import { onMount } from 'svelte';

  let stories: Record[] = [];
  export let current_story: Record | null = null;
  export let show_public_only = false;

  onMount(async () => {
    if ($currentUser.isValid && !show_public_only) {
      const resultList = await pb.collection('stories').getList(1, 50, {
        sort: 'created',
        filter: `owner.id="${$currentUser?.model?.id}"`,
        expand: 'owner'
      });
      stories = resultList.items;
    } else {
      const resultList = await pb
        .collection('stories')
        .getList(1, 50, { sort: 'created', filter: `public=true`, expand: 'owner' });
      stories = resultList.items;
    }
    // select first story
    if (stories.length) {
      current_story = stories[0];
    }
  });

  let clickHandler = (story: Record) => {
    current_story = story;
  };
</script>

<div class="stories">
  <h1 class="mainTitle">Stories</h1>

  {#each stories as story (story.id)}
    <div class="story" on:click={() => clickHandler(story)} on:keypress={() => clickHandler(story)}>
      <img
        class="thumbnail"
        src={pb.getFileUrl(story, story.cover, { thumb: '100x100' })}
        alt="cover"
      />
      <div class="storyTitle">{story.title}</div>
    </div>
  {/each}
  {#if $currentUser.isValid && !show_public_only}
    <center>
      <a href="/create"><Button color="warning">Create!</Button></a>
    </center>
  {/if}
</div>

<style>
  .mainTitle {
    text-align: center;
    padding-top: 1em;
  }

  .stories {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    align-items: left;
  }

  .story {
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    transition: box-shadow 0.3s;
    border-radius: 10px;
  }

  .story:hover {
    box-shadow: 0 0 11px var(--col4);
    background-color: var(--col2);
    color: white;
  }

  .thumbnail {
    width: 20%;
    max-width: 100px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 10px;
  }

  .storyTitle {
    width: 70%;
    text-align: left;
  }
</style>
