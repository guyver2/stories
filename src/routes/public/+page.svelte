<script lang="ts">
    import Story from '../../components/Story.svelte';
    import NavBar from '../../components/NavBar.svelte';
    import StoryList from '../../components/StoryList.svelte';
    import MediaQuery from '../../components/MediaQuery.svelte';
    import { currentUser } from '$lib/pocketbase';
    import type { Record } from 'pocketbase';

    let current_story: Record | null = null;
    const show_public_only = true;


    import { Button, Offcanvas } from 'sveltestrap';
    let open = true;
    const toggle = () => (open = !open);
    
    const top = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0; 
    }

    $: current_story, (open = false);

</script>

<NavBar showLogin={!$currentUser.isValid} showLogout={$currentUser.isValid} showPublic={false} />



<MediaQuery query="(max-width: 800px)" let:matches>
	{#if matches}    
        <Offcanvas isOpen={open} {toggle} header="" placement="start">
            <div class="story-list">
                <StoryList bind:current_story {show_public_only} />
            </div>
        </Offcanvas>
        <div class="stories">
            <div class="button button-top">
                <Button color="warning" on:click={toggle}>Stories</Button>
            </div> 
            <Story bind:story={current_story} {show_public_only} />
            <div class="button button-bottom">
                <Button color="warning" on:click={top}>Top</Button>
            </div>
        </div>
        {:else}
        <div class="stories">
            <StoryList bind:current_story {show_public_only} />
            <Story bind:story={current_story} {show_public_only} />
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
        }

        .story-list {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .button {
            padding-right: 1em;
            display: flex;
            width: 100%;
            flex-direction: row;
            justify-content: flex-end;
        }

        .button-top {
            padding-top: 1em;
        }

        .button-bottom {
            padding-bottom: 1em;
        }

    }

</style>
