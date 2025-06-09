// utils/fetchAllProfiles.js
import { plugins } from './index.js';

export async function fetchAllProfiles(userProfiles) {
  const results = [];

  for (const platform in userProfiles) {
    const username = userProfiles[platform];
    const plugin = plugins[platform];
    if (plugin) {
      const profile = await plugin(username);
      results.push(profile);
    }
  }
  return results;
}
