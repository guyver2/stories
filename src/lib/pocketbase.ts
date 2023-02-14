import PocketBase from 'pocketbase';
import type { Record } from 'pocketbase';
import { writable } from 'svelte/store';

// export const pb = new PocketBase('http://127.0.0.1:8090');
export const pb = new PocketBase('http://192.168.0.59:8090');
export const currentUser = writable(pb.authStore);

pb.authStore.onChange(() => {
  currentUser.set(pb.authStore);
});

export async function saveStory(data: FormData): Promise<boolean> {
  console.log('saving story', data);
  try {
    await pb.collection('stories').create(data);
    return true;
  } catch (err) {
    console.log('error while creating story.\n', err);
    return false;
  }
}

export async function setStoryPublicStatus(story: Record) {
  try {
    const data = {
      public: story.public
    };
    await pb.collection('stories').update(story.id, data);
  } catch (err) {
    console.log('error while updating story.\n', err);
  }
}

export function logout() {
  pb.authStore.clear();
}

export async function login(username: string, password: string) {
  await pb.collection('users').authWithPassword(username, password);
}

export async function signUp(username: string, password: string) {
  try {
    const data = {
      username,
      password,
      passwordConfirm: password
    };
    await pb.collection('users').create(data);
    await login(username, password);
  } catch (err) {
    console.log('Error while signing up new user.\n', err);
  }
}
