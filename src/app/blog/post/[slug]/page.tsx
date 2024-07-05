import React from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { client } from "../../../../../sanity/lib/client";
import { urlForImage } from "../../../../../sanity/lib/image";
import Link from "next/link";
import { RichText } from "@/components/RichText";
import { Header } from "@/components/Header";

export interface Post {
  _id: string;
  title: string;
  author: {
    name: string;
    bio: any;
    instagramUsername: string;
    slug: {
      current: string;
    };
    image: {
      asset: {
        _ref: any;
      };
    };
  };
  categories: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  }[];
  body: any;
  _createdAt: string;
  currentSlug: string;
  mainImage: any;
}

const getPost = async (slug: string) => {
  const query = `*[_type == 'post' && slug.current == $slug] {
    _id,
    title,
    author->{
    name, slug, image, bio, instagramUsername
  },
  categories[]->{
    _id, title, slug
  },
    body,
    _createdAt,
    "currentSlug": slug.current,
    mainImage
  }`;
  const data = client.fetch(query, { slug });
  return data;
};

async function getRecent() {
  const query = `
  *[_type == "post"] | order(_createdAt desc) {
  _id,
  title,
  author->{
    name, slug, image
  },
  categories[]->{
    _id, title, slug
  },
    "currentSlug": slug.current,
    excerpt,
    _createdAt
}
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [post]: Post[] = await getPost(slug);
  const recent: Post[] = await getRecent();

  return (
    <>
      <Header />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row px-2">
          <main className="flex-1">
            <div className="my-2 px-4 md:hidden">
              <div className="flex">
                <Link
                  href="/blog"
                  className="group flex font-semibold text-sm leading-6 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    className="overflow-visible text-slate-400 w-auto h-6 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Go back
                </Link>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <p className="text-gray-600 mb-4">
                by{" "}
                <Link href={`/blog/author/${post.author.slug.current}`}>
                  {post.author.name}
                </Link>{" "}
                &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
                <time dateTime={post._createdAt}>
                  {new Date(post._createdAt).toDateString()}
                </time>
              </p>
              <div className="mb-4">
                {post.mainImage && (
                  <Image
                    src={urlForImage(post.mainImage)}
                    alt={post.mainImage.alt}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="w-full object-cover lg:rounded"
                    style={{ height: "28em" }}
                  />
                )}
              </div>
              <div className="text-justify text-gray-700 prose prose-xl mb-4">
                <PortableText value={post.body} components={RichText} />
              </div>

              <p className="text-gray-700 mb-4 text-sm">
                Posted in:{" "}
                {post.categories.map((items) => (
                  <Link
                    key={items._id}
                    href={`/blog/category/${items.slug.current}`}
                    className="relative z-10 rounded-full pl-1 py-1.5 font-medium"
                  >
                    {items.title},
                  </Link>
                ))}
              </p>
            </div>
          </main>
          <aside className="w-full md:w-1/4 md:sticky p-4">
            <div className="md:py-6 md:pl-10">
              <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
              <ul>
                {recent.map((items) => (
                  <li key={items._id} className="mb-2">
                    <Link
                      href={`/blog/post/${items.currentSlug}`}
                      className="text-gray-700"
                    >
                      {items.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
