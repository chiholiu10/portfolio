import { BlogPost, formatBlogDate } from "../../../lib/contentful-blog";
import {
  AllPostsLink,
  LatestBlogCard,
  LatestBlogCardBody,
  LatestBlogEyebrow,
  LatestBlogGrid,
  LatestBlogHeader,
  LatestBlogImage,
  LatestBlogMeta,
  LatestBlogReadMore,
  LatestBlogSection,
  LatestBlogTitle,
} from "./LatestBlog.styles";

type LatestBlogProps = { posts: BlogPost[] };

export const LatestBlog = ({ posts }: LatestBlogProps) => {
  if (!posts.length) return null;

  return (
    <LatestBlogSection aria-labelledby="latest-blog-title">
      <LatestBlogHeader>
        <div>
          <LatestBlogEyebrow>Latest writing</LatestBlogEyebrow>
          <LatestBlogTitle id="latest-blog-title">
            Thoughts beyond the interface.
          </LatestBlogTitle>
        </div>
        <AllPostsLink href="/blog">View all articles</AllPostsLink>
      </LatestBlogHeader>
      <LatestBlogGrid>
        {posts.slice(0, 3).map((post) => (
          <LatestBlogCard key={post.sys.id} href={`/blog/${post.slug}`}>
              {post.coverImage && (
                <LatestBlogImage
                  src={post.coverImage.url}
                  alt={post.coverImage.description || post.coverImage.title || ""}
                  width={post.coverImage.width || 800}
                  height={post.coverImage.height || 450}
                  sizes="(max-width: 900px) calc(100vw - 32px), 380px"
                />
              )}
              <LatestBlogCardBody>
                <LatestBlogMeta>
                  <span>{post.category || "Article"}</span>
                  <time dateTime={post.publishedDate}>
                    {formatBlogDate(post.publishedDate)}
                  </time>
                </LatestBlogMeta>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <LatestBlogReadMore>Read article →</LatestBlogReadMore>
              </LatestBlogCardBody>
          </LatestBlogCard>
        ))}
      </LatestBlogGrid>
    </LatestBlogSection>
  );
};
