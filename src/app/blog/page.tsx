import Image from "next/image";
import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";
import { Header } from "@/components/Header";

export interface DataCard {
  _id: string;
  title: string;
  author: {
    name: string;
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
  currentSlug: string;
  excerpt: string;
  _createdAt: string;
}

async function getData() {
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

export default async function BlogPage() {
  const data: DataCard[] = await getData();

  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="px-2">
          <div className="px-4 mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Dive in and explore our diverse range of topics, meticulously
              crafted by our UNISTED team.
            </h2>
          </div>
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 px-2 pt-8 sm:mt-10 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {data.map((post) => (
              <article
                key={post._id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post._createdAt}>
                    {new Date(post._createdAt).toDateString()}
                  </time>
                  {post.categories.map((items) => (
                    <Link
                      key={items._id}
                      href={`/blog/category/${items.slug.current}`}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {items.title}
                    </Link>
                  ))}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 group-hover">
                    <Link href={`/blog/post/${post.currentSlug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6">
                    {post.excerpt}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <Image
                    src={urlForImage(post.author.image.asset._ref)}
                    alt={post.author.name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold">
                      <a href={`/blog/author/${post.author.slug.current}`}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
