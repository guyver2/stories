<script lang="ts">
  /** @type {import('./$types').PageData} */
  import { currentUser } from '$lib/pocketbase';
  import NavBar from '../../../components/NavBar.svelte';

  export let data: { [key: string]: string };
</script>

<NavBar showLogin={!$currentUser.isValid} showLogout={$currentUser.isValid} showPublic={true} />
<div class="story-info">
  <div class="story">
    <div class="title">{data.title}</div>
    <img class="thumbnail" src={data.cover} alt="cover: {data.title}" />
    <div class="text">{data.text}</div>
  </div>
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
