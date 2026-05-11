import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'name' } }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
  ],
});