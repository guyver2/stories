import PocketBase from 'pocketbase';
import { PB_USER, PB_PASSWORD, PB_URL } from '$env/static/private';


async function login(pb: PocketBase) {
  await pb.admins.authWithPassword(PB_USER, PB_PASSWORD);
}

function logout(pb: PocketBase) {
  pb.authStore.clear();
}

export async function getUserCredit(userId:string): Promise<number> {
  try {
    const pb = new PocketBase(PB_URL);
    await login(pb);
    const user = await pb.collection("users").getOne(userId);
    logout(pb);
    console.log("user credits:", user.used_token)
    return user.used_token;
  } catch (err) {
    console.log(`Error while getting user's credit (userId: ${userId}).`, err);
    return Infinity;
  }
}


export async function setUserCredit(userId:string, amount:number): Promise<number> {
  try {
    const pb = new PocketBase(PB_URL);
    await login(pb);
    const data = {
      used_token: amount,
    };
    console.log(data)
    await pb.collection('users').update(userId, data);
    logout(pb);
    return amount
  } catch (err) {
    console.log(`Error while setting user's credit (userId: ${userId}).`, err);
    return 0;
  }
}


export async function createRequest(userId:string, prompt:string, type:string, token = 0) {
  try {
    if (token == 0) {
      token = -1;
    }
    const pb = new PocketBase(PB_URL);
    await login(pb);
    const data = {
      user: userId,
      token: token,
      prompt: prompt,
      type: type,
    }
    console.log(data);
    await pb.collection('requests').create(data);
    logout(pb);
    return true;
  } catch (err) {
    console.log('error while creating request.\n', err);
    return false;
  }
}