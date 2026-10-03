import { gql } from "@apollo/client";

export type BlogAsset = {
  sys: { id: string };
  url: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
};

export type RichTextNode = {
  nodeType: string;
  value?: string;
  marks?: Array<{ type: string }>;
  data?: {
    target?: { sys?: { id?: string } };
    uri?: string;
  };
  content?: RichTextNode[];
};

export type BlogPost = {
  sys: { id: string };
  title: string;
  slug: string;
  excerpt: string;
  publishedDate: string;
  category?: string;
  tags?: string[];
  author: string;
  seoTitle?: string;
  seoDescription?: string;
  coverImage?: BlogAsset;
  body?: {
    json: RichTextNode;
    links?: { assets?: { block?: BlogAsset[] } };
  };
};

export const BLOG_POSTS_QUERY = gql`
  query BlogPosts {
    blogPostCollection(order: publishedDate_DESC) {
      items {
        sys { id }
        title
        slug
        excerpt
        publishedDate
        category
        tags
        author
        coverImage {
          sys { id }
          url
          title
          description
          width
          height
        }
      }
    }
  }
`;

export const LATEST_BLOG_POSTS_QUERY = gql`
  query LatestBlogPosts {
    blogPostCollection(limit: 3, order: publishedDate_DESC) {
      items {
        sys { id }
        title
        slug
        excerpt
        publishedDate
        category
        author
        coverImage {
          sys { id }
          url
          title
          description
          width
          height
        }
      }
    }
  }
`;

export const BLOG_SLUGS_QUERY = gql`
  query BlogSlugs {
    blogPostCollection(limit: 100) {
      items { slug }
    }
  }
`;

export const BLOG_POST_QUERY = gql`
  query BlogPost($slug: String!) {
    blogPostCollection(limit: 1, where: { slug: $slug }) {
      items {
        sys { id }
        title
        slug
        excerpt
        publishedDate
        category
        tags
        author
        seoTitle
        seoDescription
        coverImage {
          sys { id }
          url
          title
          description
          width
          height
        }
        body {
          json
          links {
            assets {
              block {
                sys { id }
                url
                title
                description
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

export const formatBlogDate = (value: string) =>
  new Intl.DateTimeFormat("en-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
