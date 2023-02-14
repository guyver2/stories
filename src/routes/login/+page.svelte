<script lang="ts">
  import { goto } from '$app/navigation';
  import { login as pblogin, signUp as pbsignUp } from '$lib/pocketbase';
  import RandomStory from '../../components/RandomStory.svelte';
  import NavBar from '../../components/NavBar.svelte';
  let username: string;
  let password: string;

  async function login() {
    await pblogin(username, password);
    goto('/');
  }

//   async function signUp() {
//     await pbsignUp(username, password);
//     goto('/');
//   }
</script>

<NavBar showLogin={false} showLogout={false} />
<div class="main bg">

  <!-- 
  <div class="illustration">
    <RandomStory/>
  </div>
   -->
        <form class="login-form" on:submit|preventDefault>
            <p>Welcome</p>
            <input placeholder="Username" type="text" bind:value={username} />
            <input placeholder="Password" type="password" bind:value={password} />
            <!-- <button on:click={signUp}>Sign Up</button> -->
            <button on:click={login}>Enter</button>
        </form>
</div>

<style>

.main {
    display: flex;
    margin: auto;
    justify-content: center;
    align-items: center;
    width: 60vw;
    max-width: 1024px;
    height: 90vh;
    max-height: 1024px;
}

.illustration {
    width: 50%;
    height: 100%;
    border-radius: 8px 0px 0px 8px;
    background-color: var(--col2);
    display: flex;
    justify-content: center;
    align-items: center;
}

.bg {
    background-image: url("login.png");
    background-repeat: no-repeat;
    background-attachment: local;
    background-position: center center; 
    background-size: auto auto;
}

.login-form {
    position: relative;
    left: 80px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    row-gap: 35px;
    align-items: center;
    
}

input {
    border: 0px;
    background-color: rgba(0, 0, 0, 0);
    color: var(--col6);
}

::placeholder {
    color: var(--col6);
    opacity: 80%;
}

button {
    position: relative;
    left: 15px;
    border: none;
    color: var(--col6);
    background-color: rgba(0, 0, 0, 0);
    border-radius: 10px;
    width: 30%;
    margin-top: 10px;
    margin-bottom: 50px;
    /* font-size: larger; */
}

@font-face {
    font-family: "windlass";
    src: url("Windlass.ttf");
}

p {
    font-size: 3em;
    font-weight: 800;
    font-family: windlass;
    margin-bottom: 50px;
    position: relative;
    left: 30px;
    color: #f09e22;
}

</style>