import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import post from './sanity/schemas/post';
import author from './sanity/schemas/author';
import category from './sanity/schemas/category';
import tag from './sanity/schemas/tag';

export default defineConfig({
  projectId: 'ezhha3lz',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [post, author, category, tag],
  },
});