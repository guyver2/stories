<script lang="ts">
  import { currentUser, logout as pblogout } from '$lib/pocketbase';
  import MediaQuery from '../components/MediaQuery.svelte';

  import StoryList from '../components/StoryList.svelte';
  import StoryInfo from '../components/StoryInfo.svelte';
  import Story from '../components/Story.svelte';
  import NavBar from '../components/NavBar.svelte';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import type { Record } from 'pocketbase';

  let current_story: Record | null = null;

  onMount(async () => {
    if (!$currentUser.isValid) {
      goto('/login');
    }
  });

  const logout = async () => {
    pblogout();
    goto('/login');
  };

  import { Button, Offcanvas } from 'sveltestrap';
  let open_stories = false;
  const toggle_stories = () => {
    open_stories = !open_stories;
  };
  let open_params = false;
  const toggle_params = () => (open_params = !open_params);

  const top = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  $: current_story, (open_stories = false);
</script>

<NavBar showLogin={false} {logout} />
<MediaQuery query="(max-width: 800px)" let:matches>
  {#if matches}
    <Offcanvas
      isOpen={open_stories}
      scroll={true}
      toggle={toggle_stories}
      header=""
      placement="end"
    >
      <div class="story-list">
        <StoryList bind:current_story />
      </div>
    </Offcanvas>
    <Offcanvas
      isOpen={open_params}
      scroll={true}
      toggle={toggle_params}
      header=""
      placement="start"
    >
      <div class="story-list">
        <StoryInfo bind:story={current_story} show_public_only={false} />
      </div>
    </Offcanvas>
    <div class="stories">
      <div class="button button-top-right">
        <Button color="warning" on:click={toggle_stories}>Stories</Button>
      </div>
      <div class="button button-top-left">
        <Button color="warning" on:click={toggle_params}>Infos</Button>
      </div>
      <div class="content">
        <Story bind:story={current_story} />
      </div>
      <div class="button button-bottom-right">
        <Button color="warning" on:click={top}>Top</Button>
      </div>
    </div>
  {:else}
    <div class="stories">
      <StoryList bind:current_story />
      <Story bind:story={current_story} />
    </div>
  {/if}
</MediaQuery>

<style>
  /* Desktop */
  @media only screen and (min-width: 801px) {
    .stories {
      display: grid;
      grid-template-columns: 1fr 4fr;
      width: 100%;
    }
  }

  /* Mobile */
  @media only screen and (max-width: 800px) {
    .stories {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100vw;
      position: relative;
    }

    .story-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .button {
      padding: 1em;
      position: absolute;
    }

    .button-top-right {
      top: 0;
      right: 0;
    }

    .button-top-left {
      top: 0;
      left: 0;
    }

    .button-bottom-right {
      bottom: 0;
      right: 0;
    }

    .content {
      margin-top: 2em;
      margin-bottom: 2em;
    }
  }
</style>
