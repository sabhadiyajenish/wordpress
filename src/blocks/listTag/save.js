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
export default function ListSave({ attributes, setAttributes }) {
	const {
		ParagrapText,
		ParagrapTextSize,
		ParagrapTextAlign,
		ParagrapTextColor,
		ParagrapBgColor,
		Radius,
		paddings,
		margins,
		listStyle,
	} = attributes;
	return (
		<div
			{...useBlockProps.save({
				className: "block_info_custom_classes",
			})}
		>
			<RichText.Content
				tagName="ul"
				multiline="li"
				value={ParagrapText}
				style={{
					fontSize: `${ParagrapTextSize}px`,
					textAlign: ParagrapTextAlign,
					color: ParagrapTextColor,
					backgroundColor: ParagrapBgColor,
					borderRadius: `${Radius}px`,
					padding: `${paddings.top} ${paddings.left} ${paddings.right} ${paddings.bottom}`,
					margin: `${margins.top} ${margins.left} ${margins.right} ${margins.bottom}`,
					listStyleType: listStyle,
				}}
			/>
		</div>
	);
}
