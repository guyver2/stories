<script lang="ts">
  import MediaQuery from './MediaQuery.svelte';
  import { setStoryPublicStatus } from '$lib/pocketbase';
  import moment from 'moment';
  import type { Record } from 'pocketbase';
  export let story: Record | null = null;
  export let show_public_only = false;
</script>

<div>
  {#if story}
    <div class="about">
      <h1 class="about-title">About</h1>
      <div>A story by <strong>{story.expand.owner.username}</strong></div>
      <div>Created on: {moment(story.created).format('YYYY.MM.DD HH:mm')}</div>
      {#if !show_public_only}
        <div>
          Public:
          <label class="switch">
            <input
              type="checkbox"
              bind:checked={story.public}
              on:change={() => {
                setStoryPublicStatus(story);
              }}
            />
            <span class="slider round" />
          </label>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  /* Desktop */
  @media only screen and (min-width: 801px) {
    .about {
      border: 1px solid #533b31;
      background-color: rgba(var(--col8rgb), 0.5);
      border-radius: 10px;
      padding: 10px;
      margin-top: 1em;
      margin-bottom: 1em;
    }
  }

  /* Mobile */
  @media only screen and (max-width: 800px) {
    .about {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }
  }

  .about-title {
    text-align: left;
    text-align: center;
  }

  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 35px; /* 60px;*/
    height: 20px; /*34px;*/
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 16px; /*26px;*/
    width: 16px; /*26px;*/
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(15px);
    -ms-transform: translateX(15px);
    transform: translateX(15px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 16px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
