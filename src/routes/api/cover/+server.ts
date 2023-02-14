import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import { img } from '$lib/img';
import { getUserCredit, setUserCredit, createImageRequest } from '$lib/server/pb';



const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
});

async function createCover(prompt: string, userId: string): Promise<string> {
  if (OPENAI_API_KEY == "TEST"){
    return 'data:image/png;base64,' + img;
  } else {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt: prompt,
      n:1,
      size:"512x512",
      response_format:"b64_json",
    });
    const image = 'data:image/png;base64,' + response?.data?.data[0]?.b64_json ?? img; 
    
    return image;
  }
}

export const GET = async ({ request, url }) => {
  const authHeader: string = request.headers.get('Authorization');
  const userId: string = url.searchParams.get('userId');
  const prompt: string = url.searchParams.get('prompt');
  if (authHeader.length < 20) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
  }
  const credits = await getUserCredit(userId);
  if( credits > 50000) {
    console.log("used too many credits")
    return new Response(JSON.stringify({ text: "please buy more credits" }), { status: 200 });
}

  const image = await createCover(prompt, userId);
  await createImageRequest(userId, prompt, 500, image);
  await setUserCredit(userId, credits + 500);

  return new Response(JSON.stringify({ cover: image }), { status: 200 });
};
