/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from "@wordpress/block-editor";
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes, setAttributes }) {
	const {
		text,
		content,
		multiContent,
		multiParagraph,
		tag,
		colorPelete,
		gradiuntColor,
		imageOne,
		imageMulti,
	} = attributes;
	console.log("save jenish", attributes);
	return (
		<div {...useBlockProps.save()} className="w-full m-0 p-0">
			<h3
				style={{ background: gradiuntColor }}
				className="p-10 mt-5 text-neutral-700"
			>
				{text}
			</h3>
			{/* <div>
				<RichText.Content
					style={{ color: colorPelete }}
					tagName={tag}
					value={content}
				/>
			</div>
			<RichText.Content tagName="ul" value={multiContent} multiline="li" />
			<RichText.Content
				tagName="div"
				className="our-content"
				value={multiParagraph}
				multiline="p"
			/> */}
		</div>
	);
}
