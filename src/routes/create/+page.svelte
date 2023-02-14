<script lang="ts">
	import { goto } from "$app/navigation";
  import { currentUser, saveStory, logout as pblogout} from "$lib/pocketbase";
  import { Buffer } from 'buffer';
	import NavBar from "../../components/NavBar.svelte";

  let text: string = "";
  let cover: string = "";
  let title: string = "";
  let prompt_text: string = "";
  let prompt_cover: string = "";

  async function generate_story() {
    console.log("generate a story based on:", prompt_text);
    fetch(`/api/story?prompt=${encodeURIComponent(prompt_text)}`, {
        headers: {
            'Authorization': 'Bearer ' + $currentUser?.token,
        }
    })
    .then(response=>response.json())
    .then(data=>{ text = data.text; })
  }

  async function generate_cover() {
    console.log("generate a cover showing:", prompt_cover);
    fetch(`/api/cover?prompt=${encodeURIComponent(prompt_cover)}`, {
        headers: {
            'Authorization': 'Bearer ' + $currentUser?.token,
        }
    })
    .then(response=>response.json())
    .then(data=>{ console.log(data.cover); cover = data.cover; })
  }

  function base64StringToBlob(dataURI: string): Blob {
        const splitDataURI: string[] = dataURI.split(','); // splits prefix "data:image/png;base64,"
        const buf: Buffer = Buffer.from(splitDataURI[1], 'base64');
        return new Blob([buf]);
      }      

  async function save() {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("prompt_text", prompt_text);
    formData.append("prompt_cover", prompt_cover);
    formData.append("status", "PUBLISHED");
    formData.append("owner", $currentUser?.model?.id ?? '');
    formData.append("title", title);

    let blob = base64StringToBlob(cover);
    formData.append("cover", blob, 'cover.png');
    saveStory(formData);
  }


  const logout = async () => {
    console.log("custom logout");
    pblogout();
    goto("/login");
  }

</script>



<NavBar showLogin={false} {logout}/>
<div class="main">
  <div class="form">
    <form on:submit|preventDefault>
      <textarea placeholder="A story about..." bind:value={prompt_text} />
      <textarea placeholder="The cover shows..." bind:value={prompt_cover} />
      <input
        placeholder="This story is called..."
        type="text"
        bind:value={title}
      />
      <button on:click={generate_story}>Tell a story</button>
      <button on:click={generate_cover}>Draw a cover</button>
      <button on:click={save}>Add to library</button>
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
  .main {
    display: grid;
    grid-template-columns: 1fr 4fr;
    width: 100%;
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
</style>
