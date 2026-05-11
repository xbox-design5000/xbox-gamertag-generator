import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'name' } }),
  ],
});