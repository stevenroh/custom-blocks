/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { SelectControl, PanelBody } from "@wordpress/components";
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

import { Carousel } from "./Carousel";

import { useSelect } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
  const { categories } = useSelect((select) => {
    return {
      categories: select(coreDataStore).getEntityRecords(
        "taxonomy",
        "category"
      ),
    };
  }, []);

  const categoriesOptions =
    categories?.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })) || [];

  return (
    <div {...useBlockProps()}>
      <InspectorControls key="setting">
        <PanelBody title={__("Settings")}>
          <SelectControl
            value={attributes.category}
            onChange={(value) => setAttributes({ category: value })}
            label={__("Select a category:")}
            options={[{ value: -1, label: "All" }, ...categoriesOptions]}
          />
        </PanelBody>
      </InspectorControls>
      <Carousel attributes={attributes} />
    </div>
  );
}
