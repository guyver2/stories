<script lang="ts">
  import { goto } from "$app/navigation";
  import { currentUser, login as pblogin, signUp as pbsignUp } from "$lib/pocketbase";
	import NavBar from "../../components/NavBar.svelte";
  let username: string;
  let password: string;

  async function login() {
    await pblogin(username, password);
    goto("/");
  }

  async function signUp() {
    await pbsignUp(username, password);
    goto("/");
  }

</script>

<NavBar showLogin={false} showLogout={false}/>
<form on:submit|preventDefault>
  <input placeholder="Username" type="text" bind:value={username} />
  <input placeholder="Password" type="password" bind:value={password} />
  <button on:click={signUp}>Sign Up</button>
  <button on:click={login}>Login</button>
</form>
