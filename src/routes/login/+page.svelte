<script lang="ts">
  import { goto } from '$app/navigation';
  import { login as pblogin } from '$lib/pocketbase';
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
  <form class="login-form" on:submit|preventDefault>
    <p class="title">Welcome</p>
    <input class="input" placeholder="Username" type="text" bind:value={username} />
    <input class="input" placeholder="Password" type="password" bind:value={password} />
    <button class="button" on:click={login}>Enter</button>
  </form>
</div>

<style>
  @font-face {
    font-family: 'windlass';
    src: url('Windlass.ttf');
  }

  ::placeholder {
    color: var(--col6);
    opacity: 80%;
  }

  /* desktop */
  @media only screen and (min-width: 801px) {
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

    .bg {
      background-image: url('login.jpg');
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

    .input {
      border: 0px;
      background-color: rgba(0, 0, 0, 0);
      color: var(--col6);
    }

    .button {
      position: relative;
      left: 15px;
      border: none;
      color: var(--col6);
      background-color: rgba(0, 0, 0, 0);
      border-radius: 10px;
      width: 30%;
      margin-top: 10px;
      margin-bottom: 50px;
    }

    .title {
      font-size: 3em;
      font-weight: 800;
      font-family: windlass;
      margin-bottom: 50px;
      position: relative;
      left: 30px;
      color: #f09e22;
    }
  }

  /* Mobile */
  @media only screen and (max-width: 800px) {
    .main {
      position: fixed;
      z-index: -1;
      top: 0px;
      left: 0px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      width: 100vw;
      height: 100vh;
    }

    .bg {
      background-image: url('login_mobile.jpg');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: auto 100%;
    }

    .login-form {
      padding: 30px;
      display: flex;
      flex-direction: column;
      row-gap: 35px;
      align-items: center;
    }

    .input {
      border: 0px;
      border-radius: 100px;
      background-color: white;
      color: var(--col6);
      padding: 8px;
    }

    .button {
      border: none;
      color: var(--col6);
      background-color: #f3a735;
      border-radius: 100px;
      padding: 10px 30px;
    }

    .title {
      font-size: 3em;
      font-weight: 800;
      font-family: windlass;
      color: #f09e22;
    }
  }
</style>
