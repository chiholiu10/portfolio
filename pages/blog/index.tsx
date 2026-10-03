import Head from "next/head";
import Link from "next/link";
import { ThemeProvider } from "styled-components";
import {
  BackLink,
  BlogCard,
  BlogContainer,
  BlogEyebrow,
  BlogGrid,
  BlogIntro,
  BlogNav,
  BlogShell,
  BlogTitle,
  Brand,
  CardBody,
  CardImage,
  EmptyState,
  Meta,
  ReadMore,
} from "../../components/Blog/Blog.styles";
import { BLOG_POSTS_QUERY, BlogPost, formatBlogDate } from "../../lib/contentful-blog";
import { CSSreset } from "../../styles/CssReset";
import theme from "../../styles/Theme";

type BlogPageProps = { posts: BlogPost[] };

export default function BlogPage({ posts }: BlogPageProps) {
  return (
    <ThemeProvider theme={theme}>
      <CSSreset />
      <Head>
        <title>Blog | Chiho Liu</title>
        <meta name="description" content="Notes about front-end engineering, UX, accessibility and building better digital products." />
        <link rel="canonical" href="https://www.chiholiu.com/blog" />
      </Head>
      <BlogShell>
        <BlogContainer>
          <BlogNav aria-label="Blog navigation">
            <Link href="/" legacyBehavior><Brand>Chiho Liu</Brand></Link>
            <Link href="/" legacyBehavior><BackLink>Back to portfolio</BackLink></Link>
          </BlogNav>
          <BlogEyebrow>Ideas · Craft · Product</BlogEyebrow>
          <BlogTitle>Notes from the space between design and code.</BlogTitle>
          <BlogIntro>
            Practical lessons about front-end engineering, user experience,
            accessibility and building products that feel considered.
          </BlogIntro>

          {posts.length > 0 ? (
            <BlogGrid>
              {posts.map((post) => (
                <Link key={post.sys.id} href={`/blog/${post.slug}`} legacyBehavior>
                  <BlogCard>
                    {post.coverImage && <CardImage src={post.coverImage.url} alt={post.coverImage.description || post.coverImage.title || ""} />}
                    <CardBody>
                      <Meta><span>{post.category || "Article"}</span><time>{formatBlogDate(post.publishedDate)}</time></Meta>
                      <h2>{post.title}</h2>
                      <p>{post.excerpt}</p>
                      <ReadMore>Read article →</ReadMore>
                    </CardBody>
                  </BlogCard>
                </Link>
              ))}
            </BlogGrid>
          ) : (
            <EmptyState>
              <h2>First article in progress.</h2>
              <p>New writing about front-end engineering, UX and product thinking will appear here after publication in Contentful.</p>
            </EmptyState>
          )}
        </BlogContainer>
      </BlogShell>
    </ThemeProvider>
  );
}

export async function getStaticProps() {
  const { createApolloClient } = await import("../../apollo-client");
  const { data } = await createApolloClient().query<{
    blogPostCollection?: { items: BlogPost[] };
  }>({ query: BLOG_POSTS_QUERY });
  return {
    props: { posts: data?.blogPostCollection?.items || [] },
    revalidate: 3600,
  };
}
