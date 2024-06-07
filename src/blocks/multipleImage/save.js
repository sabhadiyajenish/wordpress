/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from "@wordpress/block-editor";
// import "../../tailwind.css";
import "./editor.scss";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function MultipleImageSave({ attributes, setAttributes }) {
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
		ImageBgColor,
		gallary,
	} = attributes;
	return (
		gallary && (
			<div
				className="mt-10 flex flex-wrap w-full md:w-auto  gap-5 bg-black p-5"
				// style={{
				// 	width: "100%",
				// 	display: "flex",
				// 	gap: "20px",
				// 	flexWrap: "wrap",
				// 	justifyContent: `${
				// 		ImageAlign === "center"
				// 			? "center"
				// 			: ImageAlign === "left"
				// 			? "flex-start"
				// 			: "flex-end"
				// 	}`,
				// 	backgroundColor: ImageBgColor,
				// 	margin: `${margins.top} ${margins.left} ${margins.right} ${margins.bottom}`,
				// }}
			>
				{gallary?.map((image, index) => {
					return (
						<img
							src={image.url}
							alt={image.alt}
							key={index}
							className="md:w-auto w-full"
							style={{
								height: `${ImageHeight}px`,
								width: `${ImageWidth}px`,
								boxSizing: "border-box",
								borderRadius: `${ImageRadiusValue}px`,
								padding: `${paddings.top} ${paddings.left} ${paddings.right} ${paddings.bottom}`,
								// float:
								// 	ImageAlign === "left"
								// 		? "left"
								// 		: ImageAlign === "right"
								// 		? "right"
								// 		: "none",
							}}
						/>
					);
				})}
			</div>
		)
	);
}
