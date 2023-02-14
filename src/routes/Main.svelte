<script lang="ts">
  import { currentUser, logout as pblogout } from "$lib/pocketbase";
  import StoryList from "../components/StoryList.svelte";
  import Story from "../components/Story.svelte";
  import NavBar from "../components/NavBar.svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { bind } from "svelte/internal";


  let current_story: any = null;

  onMount(async () => {
    if (!$currentUser.isValid) {
        goto("/login");
    }
  });


  const logout = async () => {
    console.log("custom logout");
    pblogout();
    goto("/login");
  }

</script>

{#if $currentUser.isValid}
    <NavBar showLogin={false} logout={logout}/>
    <div class="stories">
      <StoryList bind:current_story/>
      <Story bind:story={current_story} />
    </div>
{/if}

<style>
  .stories {
    display: grid;
    grid-template-columns: 1fr 4fr;
    justify-content: center;
  }
</style>
