<!-- <script lang="ts">
    
    
</script> -->
<script lang="ts">
  import MediaQuery from './MediaQuery.svelte';
  import { logout as pblogout } from '$lib/pocketbase';
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'sveltestrap/src';

  let isOpen = false;

  export let showLogin = true;
  export let showLogout = true;
  export let showPublic = true;

  export let logout = () => {
    pblogout();
  };

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<Navbar color="light" light expand="md">
  <NavbarBrand href="/">Home</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ms-auto" navbar>
      {#if showLogin}
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
      {/if}
      {#if showPublic}
        <NavItem>
          <NavLink href="/public">Public</NavLink>
        </NavItem>
      {/if}
      {#if showLogout}
        <NavItem>
          <NavLink on:click={logout}>Logout</NavLink>
        </NavItem>
      {/if}
    </Nav>
  </Collapse>
</Navbar>
