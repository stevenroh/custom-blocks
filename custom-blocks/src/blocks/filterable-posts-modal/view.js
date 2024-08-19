/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-meta_data/#view-script
 */

import { createRoot } from "react-dom/client";
import { Carousel } from "./Carousel";

window.addEventListener(
  "load",
  function () {
    document
      .querySelectorAll(".wp-block-rohs-filterable-posts-modal")
      .forEach((blockDomElement) => {
        const attributes = JSON.parse(blockDomElement.dataset.block_attrs);
        const root = createRoot(blockDomElement);
        root.render(<Carousel attributes={attributes} />);
      });
  },
  false
);
