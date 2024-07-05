import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "../../sanity/lib/image";
import Refractor from "react-refractor";
import js from "refractor/lang/javascript";
import ts from "refractor/lang/typescript";
import py from "refractor/lang/python";
import sh from "refractor/lang/bash";

Refractor.registerLanguage(js);
Refractor.registerLanguage(ts);
Refractor.registerLanguage(py);
Refractor.registerLanguage(sh);

type codeTypes = {
  value: {
    code: string;
    language: string;
    filename?: string;
  };
};

const CodeBlock = ({ value }: codeTypes) => {
  return (
    <div className="my-3">
      <p>{value.filename}</p>
      <Refractor language={value.language} value={value.code} />
    </div>
  );
};

export const RichText = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full h-96 m-10 mx-auto">
          <Image
            src={urlForImage(value)}
            alt={value}
            height={0}
            width={0}
            sizes="100vw"
          />
        </div>
      );
    },
    code: CodeBlock,
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="ml-10 py-5 list-disc space-y-5">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mt-lg list-decimal">{children}</ol>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-5xl py-10 font-bold">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h1 className="text-4xl py-10 font-bold">{children}</h1>
    ),
    h3: ({ children }: any) => (
      <h1 className="text-3xl py-10 font-bold">{children}</h1>
    ),
    h4: ({ children }: any) => (
      <h1 className="text-2xl py-10 font-bold">{children}</h1>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-slate-500 border-l-4 pl-5 py-5 my-5">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ value, children }: any) => {
      const rel = (value?.href || "").startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link href={value?.href} rel={rel}>
          {children}
        </Link>
      );
    },
  },
};
