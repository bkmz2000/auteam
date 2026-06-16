import Markdoc from "@markdoc/markdoc";
import type { Node } from "@markdoc/markdoc";
import React from "react";

export function MarkdocContent({ node }: { node: Node }) {
  const tree = Markdoc.transform(node);
  return (
    <div className="prose prose-gray max-w-none">
      {Markdoc.renderers.react(tree, React)}
    </div>
  );
}
