import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

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
  const source = fs.readFileSync(filePath, 'utf-8');
  const { content, data: metadata } = matter(source);
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
