import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import { static_story } from '$lib/text';
import { getUserCredit, setUserCredit, createRequest } from '$lib/server/pb';

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
});




export async function createStory(prompt: string, userId:string): Promise<any> {
  if (OPENAI_API_KEY == "TEST"){
    createRequest(userId, prompt, "TEXT");
    return {story: static_story, cost:0};
  } else {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 1000,
    });
    const used_token = response?.data?.usage?.total_tokens ?? 0;
    await createRequest(userId, prompt, "TEXT", used_token);

    return {story:response?.data?.choices[0]?.text ?? "error", cost:used_token} ;
  }
}

export const GET = async ({ request, url }) => {
  const authHeader: string = request.headers.get('Authorization');
  const userId: string = url.searchParams.get('userId');
  if (authHeader.length < 20) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
  }

  const credits = await getUserCredit(userId);
  if( credits > 500) {
    console.log("used too many credits")
    return new Response(JSON.stringify({ text: "please buy more credits" }), { status: 200 });
  }

  const prompt: string = url.searchParams.get('prompt');
  const {story, cost} = await createStory(prompt, userId);
  await setUserCredit(userId, credits + cost);

  return new Response(JSON.stringify({ text: story }), { status: 200 });
};
