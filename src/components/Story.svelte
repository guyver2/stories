<script lang="ts">
    import MediaQuery from './MediaQuery.svelte';
  import { pb, setStoryPublicStatus } from '$lib/pocketbase';
  import * as moment from 'moment';
  import type { Record } from 'pocketbase';
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
            border: solid 1px #785D52;
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


  .about {
    border: 1px solid #533b31;
    background-color: rgba(var(--col8rgb), 0.5);
    border-radius: 10px;
    padding: 10px;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .about-title {
    text-align: left;
    font-size: 1.5em;
    font-weight: 700;
  }

  

  .title {
    text-align: center;
    text-transform: capitalize;
    font-size: 2em;
    font-weight: 700;
    margin-top: 1em;
    margin-bottom: 1em;
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
