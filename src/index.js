/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";
import { pin, list, grid, paragraph, heading, image } from "@wordpress/icons";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";
// import "./tailwind.css";

import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import metadataParagraph from "./blocks/paragraph/block.json";
import metadataHeadTag from "./blocks/headtag/block.json";
import metadataImageTag from "./blocks/Image/block.json";
import metadataMultipleImageTag from "./blocks/multipleImage/block.json";

import ParagraphEdit from "./blocks/paragraph/edit";
import ParagraphSave from "./blocks/paragraph/save";

import HeadEdit from "./blocks/headtag/edit";
import HeadSave from "./blocks/headtag/save";

import ImageEdit from "./blocks/Image/edit";
import ImageSave from "./blocks/Image/save";

import MultipleImageEdit from "./blocks//multipleImage/edit";
import MultipleImageSave from "./blocks/multipleImage/save";
/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

registerBlockType(metadata.name, {
	icon: {
		src: "admin-generic",
		foreground: "#fff",
		background: "#4c967d",
	},
	title: "Jenish",
	edit: Edit,
	save,
});

registerBlockType(metadataParagraph.name, {
	icon: {
		src: paragraph,
		foreground: "#fff",
		background: "#4c967d",
	},
	title: "Paragraph",
	edit: ParagraphEdit,
	save: ParagraphSave,
	attributes: metadataParagraph.attributes,
	supports: metadataParagraph.supports,
});

registerBlockType(metadataHeadTag.name, {
	icon: {
		src: heading,
		foreground: "#fff",
		background: "#4c967d",
	},
	title: "Head tag",
	edit: HeadEdit,
	save: HeadSave,
	attributes: metadataHeadTag.attributes,
	supports: metadataHeadTag.supports,
});

registerBlockType(metadataImageTag.name, {
	icon: {
		src: image,
		foreground: "#fff",
		background: "#4c967d",
	},
	title: "Image tag",
	edit: ImageEdit,
	save: ImageSave,
	attributes: metadataImageTag.attributes,
	supports: metadataImageTag.supports,
});

registerBlockType(metadataMultipleImageTag.name, {
	icon: {
		src: "images-alt",
		foreground: "#fff",
		background: "#4c967d",
	},
	title: "Gallary",
	edit: MultipleImageEdit,
	save: MultipleImageSave,
	attributes: metadataMultipleImageTag.attributes,
	supports: metadataMultipleImageTag.supports,
});
