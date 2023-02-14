<script lang="ts">
  import Story from '../../components/Story.svelte';
  import NavBar from '../../components/NavBar.svelte';
  import StoryList from '../../components/StoryList.svelte';
  import { currentUser } from '$lib/pocketbase';
  import type { Record } from 'pocketbase';

  let current_story: Record | null = null;
  const show_public_only = true;
</script>

<NavBar showLogin={!$currentUser.isValid} showLogout={$currentUser.isValid} />
<div class="stories">
  <StoryList bind:current_story {show_public_only} />
  <Story bind:story={current_story} {show_public_only} />
</div>

<style>
  .stories {
    display: grid;
    grid-template-columns: 1fr 4fr;
    width: 100%;
  }
</style>
