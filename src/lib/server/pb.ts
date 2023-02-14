import PocketBase from 'pocketbase';
import { PB_USER, PB_PASSWORD, PB_URL } from '$env/static/private';
import { Buffer, Blob } from 'buffer';


async function login(pb: PocketBase) {
  await pb.admins.authWithPassword(PB_USER, PB_PASSWORD);
}

function logout(pb: PocketBase) {
  pb.authStore.clear();
}


export async function getStory(slug: string):Promise<{ [key: string]: string}> {
  try {
    const pb = new PocketBase(PB_URL);
    await login(pb);
    const story = await pb.collection("stories").getOne(slug);
    logout(pb);
    return {
      title: story.title,
      text: story.text,
      cover: pb.getFileUrl(story, story.cover)
    };
  } catch(error){
    return {
      title: "",
      text: "",
      cover: ""
    };
  }
}



export async function getUserCredit(userId:string): Promise<number> {
  try {
    const pb = new PocketBase(PB_URL);
    await login(pb);
    const user = await pb.collection("users").getOne(userId);
    logout(pb);
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
    await pb.collection('users').update(userId, data);
    logout(pb);
    return amount
  } catch (err) {
    console.log(`Error while setting user's credit (userId: ${userId}).`, err);
    return 0;
  }
}


export async function createRequest(userId:string, prompt:string, token = 0, result=""): Promise<boolean> {
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
      type: "TEXT",
      result: result,
    }
    await pb.collection('requests').create(data);
    logout(pb);
    return true;
  } catch (err) {
    console.log('error while creating request.\n', err);
    return false;
  }
}


function base64StringToBlob(dataURI: string): Blob {
  const splitDataURI: string[] = dataURI.split(','); // splits prefix "data:image/png;base64,"
  const buf: Buffer = Buffer.from(splitDataURI[1], 'base64');
  return new Blob([buf]);
}


export async function createImageRequest(userId:string, prompt:string, token = 0, image=""): Promise<boolean> {
  try {
    if (token == 0) {
      token = -1;
    }
    const pb = new PocketBase(PB_URL);
    await login(pb);
    const formData = new FormData();
    formData.append('user', userId);
    formData.append('token', token.toString());
    formData.append('prompt', prompt);
    formData.append('type', "IMAGE");

    let blob = base64StringToBlob(image);
    formData.append('image', blob, 'cover.png');
    try {
      await pb.collection('requests').create(formData);
    } catch (err) {
      console.log('error while creating image request.\n', err);
      return false;
    }
    logout(pb);
    return true;
  } catch (err) {
    console.log('error while creating request.\n', err);
    return false;
  }
}
