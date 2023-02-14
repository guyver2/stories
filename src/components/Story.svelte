<script lang="ts">
  import { pb, setStoryPublicStatus } from '$lib/pocketbase';
  import * as moment from 'moment';
  import type { Record } from 'pocketbase';
  export let story: Record | null = null;
  export let show_public_only = false;
</script>

<div class="story-info">
  <div class="story">
    {#if story}
      <div class="title">{story.title}</div>
      <div class="cover">
        <img class="thumbnail" src={pb.getFileUrl(story, story.cover)} alt="cover: {story.title}" />
      </div>
      <div class="text">{story.text}</div>
    {:else}
      <div class="empty">Choose a Story.</div>
    {/if}
  </div>
  <div>
    {#if story}
      <div class="about">
        <div class="about-title">About</div>
        <div>A story by <strong>{story.expand.owner.username}</strong></div>
        <div>Created on: {(moment(story.created)).format('YYYY.MM.DD HH:mm')}</div>
        {#if !show_public_only}
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
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .about {
    border: 2px solid var(--col2);
    background-color: var(--col7);
    border-radius: 5px;
    padding: 10px;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .about-title {
    text-align: left;
    font-size: 1.5em;
    font-weight: 700;
  }

  .story-info {
    display: grid;
    grid-template-columns: 4fr 1fr;
    gap: 10px;
    justify-items: center;
  }

  .title {
    text-align: center;
    text-transform: capitalize;
    font-size: 2em;
    font-weight: 700;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .story {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    border: solid 1px var(--col2);
    border-radius: 30px;
    margin-bottom: 50px;
    padding-bottom: 30px;
    background-color: var(--col8);
  }

  .thumbnail {
    min-width: 500px;
    max-width: 500px;
    border-radius: 10px;
    margin-bottom: 1em;
  }

  .text {
    max-width: 600px;
    text-align: left;
    white-space: pre-line;
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
