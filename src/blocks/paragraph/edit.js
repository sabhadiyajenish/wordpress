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
} from "@wordpress/components";
import { pin, list, grid } from "@wordpress/icons";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "../paragraph/editor.scss";
import "../../tailwind.css";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function ParagraphEdit({ attributes, setAttributes }) {
	const {
		ParagrapText,
		ParagrapTextSize,
		ParagrapTextAlign,
		ParagrapTextColor,
		ParagrapBgColor,
		Radius,
		paddings,
		margins,
	} = attributes;
	const HandleChangeFontSize = (size) => {
		setAttributes({ ParagrapTextSize: size });
	};
	const HandleChangeFontAlign = (align) => {
		setAttributes({ ParagrapTextAlign: align || "left" });
	};
	const onChangeTextColor = (newColor) => {
		setAttributes({ ParagrapTextColor: newColor });
	};

	const onChangeBgColor = (newColor) => {
		setAttributes({ ParagrapBgColor: newColor });
	};
	const options = [
		{ label: "Small (s)", value: "s" },
		{ label: "Medium (m)", value: "m" },
		{ label: "Large (l)", value: "l" },
		{ label: "Extra Large (xl)", value: "xl" },
		{ label: "Extra Extra Large (xxl)", value: "xxl" },
	];
	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ParagrapTextAlign}
					onChange={HandleChangeFontAlign}
				/>
			</BlockControls>
			<RichText
				tagName="p"
				value={ParagrapText}
				onChange={(v) => setAttributes({ ParagrapText: v })}
				// allowedFormats={["core/bold", "core/italic", "core/link"]}
				placeholder={__("Add Paragraph content..", "thirdblock")}
				style={{
					fontSize: ParagrapTextSize,
					textAlign: ParagrapTextAlign,
					color: ParagrapTextColor,
					backgroundColor: ParagrapBgColor,
					borderRadius: `${Radius}px`,
					padding: `${paddings.top} ${paddings.left} ${paddings.right} ${paddings.bottom}`,
					margin: `${margins.top} ${margins.left} ${margins.right} ${margins.bottom}`,
				}}
			/>
			<InspectorControls>
				<PanelBody title={__("Paragraph", "secondblock")} initialOpen={true}>
					<PanelColorSettings
						title={__("Text Color", "fisrtboks")}
						initialOpen={false}
						colorSettings={[
							{
								value: ParagrapTextColor,
								onChange: onChangeTextColor,
								label: __("Text Color", "fisrtblog"),
							},
							{
								value: ParagrapBgColor,
								onChange: onChangeBgColor,
								label: __("Background Color", "fisrtblog"),
							},
						]}
					/>
					<RangeControl
						label="Radius"
						value={Radius}
						onChange={(value) => setAttributes({ Radius: value })}
						min={0}
						max={200}
					/>
					<p className="my_custom_color">{__("Content Size", "blockss")}</p>

					<div className="mt-5 flex items-center justify-around gap-1">
						<button
							type="button"
							onClick={() => HandleChangeFontSize("16px")}
							class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
						>
							S
						</button>
						<button
							type="button"
							onClick={() => HandleChangeFontSize("20px")}
							class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
						>
							M
						</button>
						<button
							type="button"
							onClick={() => HandleChangeFontSize("24px")}
							class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
						>
							L
						</button>
						<button
							type="button"
							onClick={() => HandleChangeFontSize("28px")}
							class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
						>
							Xl
						</button>
						<button
							type="button"
							onClick={() => HandleChangeFontSize("32px")}
							class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
						>
							Xll
						</button>
					</div>
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
