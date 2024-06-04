/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __, _x } from "@wordpress/i18n";
import { useState } from "react";
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";
import {
	InspectorControls,
	RichText,
	BlockControls,
	AlignmentToolbar,
	PanelColorSettings,
	MediaPlaceholder,
	MediaUploadChecker,
	MediaUpload,
} from "@wordpress/block-editor";
import {
	PanelBody,
	TextControl,
	SelectControl,
	ColorPalette,
	ToggleControl,
	ToolbarGroup,
	BaseControl,
	ColorPicker,
	AnglePickerControl,
	Animate,
	Notice,
	GradientPicker,
	__experimentalBoxControl as BoxControl,
	RadioControl,
	Button,
	ButtonGroup,
	RangeControl,
	ToolbarButton,
} from "@wordpress/components";
import { pin, list, grid, filter, Icon, trash, edit } from "@wordpress/icons";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import "../../tailwind.css";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function ImageEdit({ attributes, setAttributes }) {
	const {
		tag,
		ImagePath,
		ImageId,
		ImageAlt,
		ImageHeight,
		ImageWidth,
		ImageAlign,
		ImageRadiusValue,
		paddings,
		margins,
	} = attributes;
	const HandleChangeFontAlign = (align) => {
		setAttributes({ ImageAlign: align || "left" });
	};
	return (
		<>
			<BlockControls>
				<AlignmentToolbar value={ImageAlign} onChange={HandleChangeFontAlign} />
				<ToolbarGroup>
					{ImagePath && (
						<ToolbarButton
							icon={trash}
							label={__("delete image", "firstblog")}
							onClick={() =>
								setAttributes({ ImageId: "", ImagePath: "", ImageAlt: "" })
							}
						></ToolbarButton>
					)}
					{ImagePath && (
						<MediaUpload
							onSelect={(media) => {
								setAttributes({
									ImageId: media?.id,
									ImagePath: media?.url,
									ImageAlt: media?.alt || "this image",
								});
							}}
							allowedTypes={["image"]}
							value={ImageId || "35"}
							render={({ open }) => (
								<ToolbarButton onClick={open} icon="edit"></ToolbarButton>
							)}
						/>
					)}
				</ToolbarGroup>
			</BlockControls>
			<div
				className={`w-full flex ${
					ImageAlign === "center"
						? "justify-center"
						: ImageAlign === "left"
						? "justify-start"
						: "justify-end"
				}`}
				style={{
					margin: `${margins.top} ${margins.left} ${margins.right} ${margins.bottom}`,
				}}
			>
				{ImagePath ? (
					ImagePath && (
						<img
							src={ImagePath}
							alt={ImageAlt}
							key={ImageId}
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
					)
				) : (
					<MediaPlaceholder
						onSelect={(media) => {
							setAttributes({
								ImageId: media.id,
								ImagePath: media.url,
								ImageAlt: media.alt || "this image",
							});
						}}
						allowedTypes={["image"]}
						multiple={false}
						labels={{
							title: "Insert Image",
							instructions:
								"Drag & drop an image here or select an image from your library.",
						}}
					/>
				)}
			</div>

			<InspectorControls>
				<PanelBody title={__("Basic Info", "secondblock")} initialOpen={true}>
					<RangeControl
						label="Width"
						value={ImageWidth}
						onChange={(value) => setAttributes({ ImageWidth: value })}
						min={0}
						max={700}
					/>
					<RangeControl
						label="Height"
						value={ImageHeight}
						onChange={(value) => setAttributes({ ImageHeight: value })}
						min={0}
						max={700}
					/>
					<RangeControl
						label="Radius"
						value={ImageRadiusValue}
						onChange={(value) => setAttributes({ ImageRadiusValue: value })}
						min={0}
						max={200}
					/>
				</PanelBody>
				<PanelBody title={__("Padding", "secondblock")} initialOpen={false}>
					<BoxControl
						label={__("Padding", "fisrtblog")}
						values={paddings}
						onChange={(nextValues) => setAttributes({ paddings: nextValues })}
					/>
				</PanelBody>
				<PanelBody title={__("Margins", "secondblock")} initialOpen={false}>
					<BoxControl
						label={__("Margin", "fisrtblog")}
						values={margins}
						onChange={(nextValues) => setAttributes({ margins: nextValues })}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
