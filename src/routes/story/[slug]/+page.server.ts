/** @type {import('./$types').PageLoad} */

import { getStory } from "$lib/server/pb";


export async function load({ params }):Promise<{ [key: string]: string}> {
  const story = await getStory(params.slug);
  return story;
}