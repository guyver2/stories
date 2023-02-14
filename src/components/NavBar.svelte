<script lang="ts">
  import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'sveltestrap/src';
  import { logout as pblogout } from '$lib/pocketbase';

  export let showLogin = true;
  export let showLogout = true;
  export let showPublic = true;

  export let logout = () => {
    pblogout();
  };
</script>

<Navbar color="light" light expand="md">
  <Nav class="mr-auto" navbar>
    <NavItem>
      <NavbarBrand href="/">Home</NavbarBrand>
    </NavItem>
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
</Navbar>
