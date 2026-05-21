import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'name' } }),
    defineField({ name: 'photo', type: 'image', title: 'Photo' }),
    defineField({ name: 'bio', type: 'text', title: 'Bio', rows: 4 }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role / Title',
      description: 'e.g. Gaming Writer, Xbox Enthusiast, Content Strategist',
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      title: 'Social Links',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              options: {
                list: ['Twitter', 'LinkedIn', 'YouTube', 'Twitch', 'Instagram', 'TikTok', 'Discord', 'Website'],
                layout: 'dropdown',
              },
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
            },
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
  ],
});