/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from "@wordpress/block-editor";
import "../../editor.scss";
import "./editor.scss";
import "../../tailwind.css";
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function ImageSave({ attributes, setAttributes }) {
	const {
		tag,
		ImagePath,
		ImageAlt,
		ImageId,
		ImageHeight,
		ImageWidth,
		ImageAlign,
		ImageRadiusValue,
		paddings,
		margins,
	} = attributes;
	return (
		ImagePath && (
			<div
				style={{
					width: "100%",
					display: "flex",
					justifyContent: `${
						ImageAlign === "center"
							? "center"
							: ImageAlign === "left"
							? "flex-start"
							: "flex-end"
					}`,
					margin: `${margins.top} ${margins.left} ${margins.right} ${margins.bottom}`,
					padding: 0,
				}}
			>
				<img
					src={ImagePath}
					alt={ImageAlt}
					key={ImageId}
					style={{
						height: `${ImageHeight}px`,
						width: `${ImageWidth}px`,
						borderRadius: `${ImageRadiusValue}px`,
						padding: `${paddings.top} ${paddings.left} ${paddings.right} ${paddings.bottom}`,
						margin: `${margins.top} ${margins.left} ${margins.right} ${margins.bottom}`,
					}}
				/>
			</div>
		)
	);
}
