import { type DefaultDocumentNodeResolver } from "sanity/structure";
import { Iframe } from "sanity-plugin-iframe-pane";
import { type SanityDocument } from "sanity";

type DocumentWithSlug = SanityDocument & {
  slug?: {
    current?: string;
  };
};

function getPreviewUrl(doc: DocumentWithSlug) {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
  return doc?.slug?.current
    ? `${baseUrl}/blog/post/${doc.slug.current}`
    : `${baseUrl}`;
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  switch (schemaType) {
    case `post`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: SanityDocument) => getPreviewUrl(doc),
            // Optional: Display the Url in the pane
            showDisplayUrl: true, // boolean. default `true`.

            // Optional: Add a reload button
            reload: {
              button: true, // default `undefined`
            },
          })
          .title("Preview"),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};
