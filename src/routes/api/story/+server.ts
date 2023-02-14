import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
});

export async function createStory(prompt: string): Promise<string> {
  const openai = new OpenAIApi(configuration);
  // const response = await openai.createCompletion({
  //     model: "text-davinci-003",
  //     prompt: prompt,
  //     temperature: 0,
  //     max_tokens: 1000,
  // });
  //console.log(response);
  //return response?.data?.choices[0]?.text;
  return `Jeanne and Zoe were two young girls with a love for adventure. They lived in a small village nestled in the heart of the jungle, and spent their days exploring the vast wilderness that surrounded them.

One day, as they were out for a walk, they heard the faint sound of a baby tiger crying for help. The girls followed the sound, and soon found themselves at the edge of a clearing, where they saw a group of hunters surrounding a tiny tiger cub.

The hunters were planning to capture the cub and sell it to a wealthy collector, but Jeanne and Zoe knew they couldn't let that happen. They knew that the baby tiger belonged in the jungle, where it could grow and thrive in its natural habitat.

Without a second thought, the two girls sprang into action. They snuck up behind the hunters and startled them, causing them to drop the cage they had prepared for the cub. The baby tiger was freed, and it ran off into the jungle, safe and sound.

The hunters were furious, but Jeanne and Zoe were quick and agile, and they managed to outmaneuver them and escape. They ran back to their village, triumphant and proud of what they had accomplished.

The villagers were amazed by the girls' bravery, and they celebrated their victory with a feast. And as for the baby tiger, it grew up to be a strong and mighty predator, thanks to the bravery and kindness of Jeanne and Zoe.`;
}

export const GET = async ({ request, url }) => {
  const authHeader: string = request.headers.get('Authorization');
  if (authHeader.length < 20) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
  }

  const prompt: string = url.searchParams.get('prompt');
  return new Response(JSON.stringify({ text: await createStory(prompt) }), { status: 200 });
};
