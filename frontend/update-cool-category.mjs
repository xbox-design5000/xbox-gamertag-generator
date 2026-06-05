import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ezhha3lz',
  dataset: 'production',
  token: 'sk19S8KfCbAayiB9qC0qxbUuhqkgMrMCTQVHwy5JVEtyBSHzysB1Cw8XIt0O8aOEb2oYu6lro9O9NoD7CUgxON3zzX8Uct8Fs5JWevYR3bObYLJpArZjNEJseFRIwmybLHAtNwUUSAPQ2jFGkcA5nxMQOqVU0QubI90iqqyPmx19aqAe2wuh',
  apiVersion: '2025-05-11',
  useCdn: false,
})

const coolPostSlugs = [
  'best-cool-xbox-gamer-tags',
  'cool-xbox-gamer-tags-for-new-players',
  'one-word-cool-xbox-tags',
  'mythology-cool-xbox-gamer-tags',
  'cool-3-letter-xbox-gamer-tags',
  'fps-cool-xbox-gamer-tags',
  'nature-inspired-xbox-gamer-tags',
  'edgy-xbox-gamer-tags',
  'cyberpunk-xbox-gamer-tags',
  'superhero-style-xbox-tags',
  'animal-themed-cool-xbox-tags',
  'modern-font-style-xbox-tags',
  'tactical-style-xbox-gamer-tags',
  'futuristic-cool-xbox-gamer-tags',
  'all-caps-cool-xbox-tags',
  'sci-fi-alien-cool-xbox-tags',
  'greek-latin-cool-gamer-tags',
  'dark-theme-cool-xbox-gamer-tags',
  'cool-4-letter-xbox-gamer-tags',
  'fire-ice-xbox-gamer-tags',
  'sweaty-cool-xbox-gamer-tags',
  'competitive-cool-xbox-tags',
  'roman-numerals-xbox-tags',
  'symbol-style-cool-xbox-tags',
  'anime-cool-xbox-gamer-tags',
  'minimalist-xbox-gamer-tags',
  'universal-cool-xbox-gamer-tags',
  'rpg-cool-xbox-gamer-tags',
  'number-style-cool-gamer-tags',
  'casual-player-xbox-tags',
  'space-themed-cool-gamer-tags',
  'cool-xbox-gamer-tags-for-guys',
  'alliteration-cool-gamer-tags',
  'samurai-ninja-xbox-gamer-tags',
  'cool-duo-xbox-gamer-tags',
  'assassin-inspired-xbox-tags',
  'hacker-style-xbox-gamer-tags',
  'horror-themed-cool-xbox-tags',
  'streetwear-cool-xbox-tags',
  'speed-agility-xbox-gamer-tags',
  'chill-zen-xbox-gamer-tags',
  'sniper-cool-xbox-gamer-tags',
  'viking-cool-xbox-gamer-tags',
  'night-owl-cool-xbox-gamer-tags',
  'strategy-chess-xbox-gamer-tags',
  'xyz-letter-cool-gamer-tags',
  'mythical-creature-xbox-tags',
  'builder-cool-xbox-gamer-tags',
  'emoji-style-cool-xbox-tags',
  'racing-cool-xbox-gamer-tags',
  'color-themed-cool-gamer-tags',
  'dj-style-cool-xbox-gamer-tags',
  'rhyming-cool-xbox-gamer-tags',
  'cool-og-xbox-gamer-tags',
  'royalty-themed-xbox-gamer-tags',
  'solo-player-cool-xbox-tags',
  'clan-compatible-cool-xbox-tags',
  'steampunk-xbox-gamer-tags',
  'cool-title-xbox-gamer-tags',
  'vz-style-cool-xbox-tags',
  'cool-xbox-gamer-tags',
]

const COOL_CATEGORY_ID = 'ae453b09-3a91-4d3a-81c7-09e569b6bdd7'

const posts = await client.fetch(
  `*[_type == "post" && slug.current in $slugs]{_id, "slug": slug.current}`,
  { slugs: coolPostSlugs }
)

console.log(`Found ${posts.length} posts`)

const transaction = client.transaction()

posts.forEach(post => {
  transaction.patch(post._id, {
    set: {
      categories: [{
        _type: 'reference',
        _ref: COOL_CATEGORY_ID,
        _key: Math.random().toString(36).substring(2, 10)
      }]
    }
  })
})

await transaction.commit()
console.log(`Updated ${posts.length} posts to Cool Xbox Gamer Tags category`)