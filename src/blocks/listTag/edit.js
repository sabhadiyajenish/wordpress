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
import { pin, list, grid, filter, Icon } from "@wordpress/icons";

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
export default function ListEdit({ attributes, setAttributes }) {
	const {
		ParagrapText,
		ParagrapTextSize,
		ParagrapTextAlign,
		ParagrapTextColor,
		ParagrapBgColor,
		Radius,
		listStyle,
		paddings,
		margins,
	} = attributes;
	const [toggleSize, setToggleSize] = useState(false);

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
			<div
				{...useBlockProps({
					className: "block_info_custom_classes",
				})}
			>
				<RichText
					tagName="ul"
					multiline="li"
					value={ParagrapText}
					onChange={(v) => setAttributes({ ParagrapText: v })}
					// allowedFormats={["core/bold", "core/italic", "core/link"]}
					placeholder={__("Add List.......", "thirdblock")}
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

			<InspectorControls>
				<PanelBody title={__("Paragraph", "secondblock")} initialOpen={true}>
					<SelectControl
						label={__("select list-style Type", "selecttag")}
						value={listStyle}
						options={[
							{
								label: __("disc", "selecttag"),
								value: "disc",
							},
							{
								label: __("armenian", "selecttag"),
								value: "armenian",
							},
							{
								label: __("cjk-ideographic", "selecttag"),
								value: "cjk-ideographic	",
							},
							{
								label: __("decimal", "selecttag"),
								value: "decimal",
							},
							{
								label: __("georgian", "selecttag"),
								value: "georgian",
							},
							{
								label: __("hebrew", "selecttag"),
								value: "hebrew",
							},
							{
								label: __("hiragana", "selecttag"),
								value: "hiragana",
							},
							{
								label: __("katakana", "selecttag"),
								value: "katakana",
							},
							{
								label: __("upper-greek", "selecttag"),
								value: "upper-greek",
							},
							{
								label: __("lower-greek", "selecttag"),
								value: "lower-greek",
							},
							{
								label: __("square", "selecttag"),
								value: "square",
							},
							{
								label: __("upper-alpha", "selecttag"),
								value: "upper-alpha",
							},
							{
								label: __("lower-alpha", "selecttag"),
								value: "lower-alpha",
							},
							{
								label: __("initial", "selecttag"),
								value: "initial",
							},
							{
								label: __("inherit", "selecttag"),
								value: "inherit",
							},
						]}
						onChange={(v) => setAttributes({ listStyle: v })}
					/>
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
					<div className="flex justify-between items-center">
						<p className="my_custom_color">{__("Content Size", "blockss")}</p>{" "}
						<Icon
							icon={filter}
							className=" cursor-pointer"
							onClick={() => setToggleSize((prev) => !prev)}
						/>
					</div>
					{toggleSize ? (
						<RangeControl
							className="mt-3"
							value={ParagrapTextSize}
							onChange={(value) => HandleChangeFontSize(value)}
							min={0}
							max={200}
							renderTooltipContent={(value) => `${value} px`}
						/>
					) : (
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
					)}
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
