import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: r => r.required(),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      title: 'Author',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
      ],
    }),
    defineField({
  name: 'featuredImage',
  type: 'image',
  title: 'Featured Image (Article Hero)',
  options: { hotspot: true },
  fields: [
    { name: 'alt', type: 'string', title: 'Alt Text' },
  ],
}),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      rows: 3,
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [
        { type: 'block' },
        { type: 'image' },
      ],
    }),
    defineField({
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: ['draft', 'published', 'scheduled'],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
    }),
    defineField({
      name: 'updatedAt',
      type: 'datetime',
      title: 'Last Updated At',
    }),
    defineField({
      name: 'featuredPost',
      type: 'boolean',
      title: 'Featured Post',
      initialValue: false,
    }),
    defineField({
      name: 'readingTime',
      type: 'number',
      title: 'Reading Time (minutes)',
      description: 'Estimated reading time in minutes',
    }),
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO & Metadata',
      fields: [
        // Basic
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          description: 'Recommended: 50-60 characters',
          validation: (r: any) => r.max(60).warning('Should be under 60 characters'),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          rows: 3,
          description: 'Recommended: 140-160 characters',
          validation: (r: any) => r.max(160).warning('Should be under 160 characters'),
        },
        {
          name: 'metaKeywords',
          type: 'string',
          title: 'Meta Keywords',
          description: 'Comma separated e.g. xbox gamertag, gamertag generator',
        },

        // Indexing
        {
          name: 'isIndexable',
          type: 'boolean',
          title: 'Allow Search Engines to Index',
          initialValue: true,
        },
        {
          name: 'canonicalUrl',
          type: 'url',
          title: 'Canonical URL',
          description: 'Leave empty to use the current page URL',
        },

        // Open Graph
        {
          name: 'ogTitle',
          type: 'string',
          title: 'OG Title (Facebook/LinkedIn)',
          description: 'Defaults to Meta Title if empty',
        },
        {
          name: 'ogDescription',
          type: 'text',
          title: 'OG Description',
          rows: 2,
          description: 'Defaults to Meta Description if empty',
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'OG Image (1200x630px recommended)',
          description: 'Defaults to Cover Image if empty',
        },

        // Twitter
        {
          name: 'twitterTitle',
          type: 'string',
          title: 'Twitter Title',
          description: 'Defaults to Meta Title if empty',
        },
        {
          name: 'twitterDescription',
          type: 'text',
          title: 'Twitter Description',
          rows: 2,
          description: 'Defaults to Meta Description if empty',
        },
        {
          name: 'twitterImage',
          type: 'image',
          title: 'Twitter Image (1200x600px recommended)',
          description: 'Defaults to OG Image if empty',
        },
        {
          name: 'twitterCardType',
          type: 'string',
          title: 'Twitter Card Type',
          options: {
            list: ['summary', 'summary_large_image'],
            layout: 'radio',
          },
          initialValue: 'summary_large_image',
        },

        // Advanced
        {
          name: 'focusKeyword',
          type: 'string',
          title: 'Focus Keyword',
          description: 'The main keyword this post targets e.g. xbox gamertag generator',
        },
        {
          name: 'breadcrumbTitle',
          type: 'string',
          title: 'Breadcrumb Title',
          description: 'Short title used in breadcrumbs, defaults to post title',
        },
        {
          name: 'articleType',
          type: 'string',
          title: 'Article Type (JSON-LD)',
          options: {
            list: ['BlogPosting', 'Article', 'HowTo', 'FAQPage', 'NewsArticle'],
            layout: 'radio',
          },
          initialValue: 'BlogPosting',
        },
      ],
    }),
  ],
});