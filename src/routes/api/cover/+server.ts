import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import { img } from '$lib/img';

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
});

export async function createCover(prompt: string): Promise<string> {
  // const openai = new OpenAIApi(configuration);
  // const response = await openai.createImage({
  //     prompt: prompt,
  //     n:1,
  //     size:"512x512"
  // });
  // return response?.data?.data[0]?.url;

  return 'data:image/png;base64,' + img;
}

export const GET = async ({ request, url }) => {
  const authHeader: string = request.headers.get('Authorization');
  if (authHeader.length < 20) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
  }

  const prompt: string = url.searchParams.get('prompt');
  return new Response(JSON.stringify({ cover: await createCover(prompt) }), { status: 200 });
};
