import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const cachePost: Map<string, any> = new Map();

type Metadata = {
  title: string;
  date: string;
  summary: string;
  image?: string;
};

function getAllFiles(dir: string): string[] {
  return fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, [] as string[]);
}

function getMDXFiles(dir: string) {
  return getAllFiles(dir).filter((file) => path.extname(file) === '.mdx');
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      theme: {
        light: 'min-light',
        dark: 'min-dark',
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

export async function getPost(slug: string) {
  if (cachePost.size === 0) {
    await getBlogPosts();
  }

  if (cachePost.has(slug)) {
    return cachePost.get(slug);
  }

  return null;
}

export async function getPostDetail(filePath: string) {
  let source = fs.readFileSync(filePath, 'utf-8');
  const { content: rawContent, data: metadata } = matter(source);
  const content = await markdownToHTML(rawContent);
  return {
    source: content,
    metadata,
    slug: path.basename(filePath, path.extname(filePath)),
  };
}

async function getAllPosts(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  // console.log(mdxFiles)
  return Promise.all(
    mdxFiles.map(async (file) => {
      const postDetail = await getPostDetail(file);
      cachePost.set(postDetail.slug, postDetail);

      const { metadata, source, slug } = postDetail;
      return {
        metadata,
        slug,
        source,
      };
    })
  );
}

export async function getBlogPosts() {
  return getAllPosts(path.join(process.cwd(), 'content'));
}
