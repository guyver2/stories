<script lang="ts">
  import { goto } from '$app/navigation';
  import { currentUser, saveStory, logout as pblogout } from '$lib/pocketbase';
  import { Buffer } from 'buffer';
  import NavBar from '../../components/NavBar.svelte';
  import { FormGroup, Button, Input, Label, Spinner } from 'sveltestrap';

  let text = '';
  let cover = '';
  let title = '';
  let prompt_text = '';
  let prompt_cover = '';
  let processing = false;

  async function generate_story() {
    processing = true;
    console.log('generate a story based on:', prompt_text);
    fetch(
      `/api/story?prompt=${encodeURIComponent(prompt_text)}&userId=${encodeURIComponent(
        $currentUser?.model?.id ?? ''
      )}`,
      {
        headers: {
          Authorization: 'Bearer ' + $currentUser?.token
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        text = data.text;
        processing = false;
      })
      .catch((error) => {
        processing = false;
        console.log(error);
      });
  }

  async function generate_cover() {
    processing = true;
    console.log('generate a cover showing:', prompt_cover);
    fetch(`/api/cover?prompt=${encodeURIComponent(prompt_cover)}`, {
      headers: {
        Authorization: 'Bearer ' + $currentUser?.token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        cover = data.cover;
        processing = false;
      })
      .catch((error) => {
        processing = false;
        console.log(error);
      });
  }

  function base64StringToBlob(dataURI: string): Blob {
    const splitDataURI: string[] = dataURI.split(','); // splits prefix "data:image/png;base64,"
    const buf: Buffer = Buffer.from(splitDataURI[1], 'base64');
    return new Blob([buf]);
  }

  async function save() {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('prompt_text', prompt_text);
    formData.append('prompt_cover', prompt_cover);
    formData.append('status', 'PUBLISHED');
    formData.append('owner', $currentUser?.model?.id ?? '');
    formData.append('title', title);

    let blob = base64StringToBlob(cover);
    formData.append('cover', blob, 'cover.png');
    saveStory(formData);
  }

  let inner_story: HTMLTextAreaElement;
  let inner_cover: HTMLTextAreaElement;
  const resize = (inner: HTMLTextAreaElement) => {
    inner.style.height = 'auto';
    inner.style.height = 4 + inner.scrollHeight + 'px';
  };

  const logout = async () => {
    pblogout();
    goto('/login');
  };
</script>

<NavBar showLogin={false} {logout} />

<div class="main">
  <div class="form {processing ? 'disabled' : ''}">
    <div class="processing {processing ? '' : 'hidden'}">
      <Spinner color="danger" size="lg" type="grow" />
    </div>
    <form on:submit|preventDefault>
      <FormGroup>
        <Label for="story">Your Story</Label>
        <Input
          type="textarea"
          rows={1}
          name="story"
          id="story"
          placeholder="A story about..."
          bind:inner={inner_story}
          on:input={() => resize(inner_story)}
          bind:value={prompt_text}
        />
        <div class="button">
          <Button color="warning" on:click={generate_story}>Tell a story</Button>
        </div>
      </FormGroup>
      <FormGroup>
        <Label for="cover">It's Cover</Label>
        <Input
          type="textarea"
          rows={1}
          name="cover"
          id="cover"
          placeholder="The cover shows..."
          bind:inner={inner_cover}
          on:input={() => resize(inner_cover)}
          bind:value={prompt_cover}
        />
        <div class="button">
          <Button color="warning" on:click={generate_cover}>Draw a cover</Button>
        </div>
      </FormGroup>
      <FormGroup>
        <Label>It's Title</Label>
        <Input type="text" bind:value={title} placeholder="This story is called..." />
      </FormGroup>
      <Button color="primary" on:click={save}>Add to library</Button>
    </form>
  </div>

  <div class="story">
    <div class="title">{title}</div>
    <div class="cover">
      <img class="thumbnail" src={cover} alt="" />
    </div>
    <div class="text">{text}</div>
  </div>
</div>

<style>
  .button {
    padding-top: 0.5em;
  }

  .disabled {
    pointer-events: none;
    opacity: 0.4;
  }

  .hidden {
    display: none;
  }

  .processing {
    opacity: 1;
    position: absolute;
    transform: scale(2) translate(-25%, -25%);
    top: 50%;
    left: 50%;
  }

  /* Desktop */
  @media only screen and (min-width: 801px) {
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
    .form {
      width: 60%;
      max-width: 800px;
    }
  }

  /* Mobile */
  @media only screen and (max-width: 800px) {
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
    .form {
      width: 80%;
      position: relative;
    }
  }

  .main {
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: flex-start;
    align-items: center;
  }

  .story {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
