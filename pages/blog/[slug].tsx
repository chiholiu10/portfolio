import { GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { ThemeProvider } from "styled-components";
import {
  ArticleBody,
  ArticleCover,
  ArticleHeader,
  ArticleTitle,
  BackLink,
  BlogContainer,
  BlogEyebrow,
  BlogIntro,
  BlogNav,
  BlogShell,
  Brand,
  Meta,
  TagList,
} from "../../components/Blog/Blog.styles";
import { RichText } from "../../components/Blog/RichText";
import { ShareButtons } from "../../components/Blog/ShareButtons";
import {
  BLOG_POST_QUERY,
  BLOG_SLUGS_QUERY,
  BlogPost,
  formatBlogDate,
} from "../../lib/contentful-blog";
import { CSSreset } from "../../styles/CssReset";
import theme from "../../styles/Theme";

type ArticlePageProps = { post: BlogPost };

export default function ArticlePage({ post }: ArticlePageProps) {
  const title = post.seoTitle || `${post.title} | Chiho Liu`;
  const description = post.seoDescription || post.excerpt;

  return (
    <ThemeProvider theme={theme}>
      <CSSreset />
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://www.chiholiu.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {post.coverImage && <meta property="og:image" content={post.coverImage.url} />}
      </Head>
      <BlogShell>
        <BlogContainer>
          <BlogNav aria-label="Blog navigation">
            <Link href="/" legacyBehavior><Brand>Chiho Liu</Brand></Link>
            <Link href="/blog" legacyBehavior><BackLink>All articles</BackLink></Link>
          </BlogNav>
          <ArticleHeader>
            <BlogEyebrow>{post.category || "Article"}</BlogEyebrow>
            <ArticleTitle>{post.title}</ArticleTitle>
            <BlogIntro>{post.excerpt}</BlogIntro>
            <Meta style={{ marginTop: 24 }}>
              <span>By {post.author}</span>
              <time dateTime={post.publishedDate}>{formatBlogDate(post.publishedDate)}</time>
            </Meta>
          </ArticleHeader>
          {post.coverImage && (
            <ArticleCover
              src={post.coverImage.url}
              alt={post.coverImage.description || post.coverImage.title || ""}
              width={post.coverImage.width}
              height={post.coverImage.height}
            />
          )}
          {post.body && (
            <ArticleBody>
              <RichText document={post.body.json} assets={post.body.links?.assets?.block} />
              {post.tags && post.tags.length > 0 && (
                <TagList>{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</TagList>
              )}
              <ShareButtons
                title={post.title}
                url={`https://www.chiholiu.com/blog/${post.slug}`}
              />
            </ArticleBody>
          )}
        </BlogContainer>
      </BlogShell>
    </ThemeProvider>
  );
}

export async function getStaticPaths() {
  const { createApolloClient } = await import("../../apollo-client");
  const { data } = await createApolloClient().query<{
    blogPostCollection?: { items: Array<{ slug: string }> };
  }>({ query: BLOG_SLUGS_QUERY });
  const paths = (data?.blogPostCollection?.items || []).map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = String(params?.slug || "");
  const { createApolloClient } = await import("../../apollo-client");
  const { data } = await createApolloClient().query<{
    blogPostCollection?: { items: BlogPost[] };
  }>({ query: BLOG_POST_QUERY, variables: { slug } });
  const post = data?.blogPostCollection?.items?.[0];
  if (!post) return { notFound: true, revalidate: 60 };
  return { props: { post }, revalidate: 3600 };
}
