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
	ToolbarButton,
	ToolbarDropdownMenu,
	__experimentalHeading as Heading,
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
export default function HeadEdit({ attributes, setAttributes }) {
	const {
		HeadText,
		HeadTextSize,
		HeadTextAlign,
		HeadTextColor,
		HeadBgColor,
		HeadTags,
		Radius,
		paddings,
		margins,
	} = attributes;
	const [values, setValues] = useState({
		top: "0px",
		left: "0%",
		right: "0%",
		bottom: "0px",
	});
	const HandleChangeFontSize = (size) => {
		setAttributes({ HeadTextSize: size });
	};
	const HandleChangeFontAlign = (align) => {
		setAttributes({ HeadTextAlign: align || "left" });
	};
	const onChangeTextColor = (newColor) => {
		setAttributes({ HeadTextColor: newColor });
	};

	const onChangeBgColor = (newColor) => {
		setAttributes({ HeadBgColor: newColor });
	};
	const headingOptions = [
		{ title: __("H1", "thirdblock"), tag: "h1" },
		{ title: __("H2", "thirdblock"), tag: "h2" },
		{ title: __("H3", "thirdblock"), tag: "h3" },
		{ title: __("H4", "thirdblock"), tag: "h4" },
		{ title: __("H5", "thirdblock"), tag: "h5" },
		{ title: __("H6", "thirdblock"), tag: "h6" },
	];
	const handleTagChange = (newTag) => {
		setAttributes({ HeadTags: newTag });
	};
	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={HeadTextAlign}
					onChange={HandleChangeFontAlign}
				/>
				<ToolbarGroup>
					{/* <ToolbarDropdownMenu
					// icon="heading"
					label={__(`${HeadTags}`, "thirdblock")}
					controls={headingOptions.map((option) => ({
						title: option.title,
						isActive: HeadTags === option.tag,
						onClick: () => handleTagChange(option.tag),
					}))}
					buttonProps={{
						children: HeadTags,
					}}
					
				/> */}
					{/* <h1 className="m-auto font-bold text-[20px]">H</h1> */}
					<select
						className="m-auto font-bold text-[20px] border-none"
						onChange={(e) => handleTagChange(e.target.value)}
					>
						{headingOptions?.map((item) => {
							return (
								<option
									className="m-auto font-medium text-[20px]"
									value={item.tag}
								>
									{item?.title}
								</option>
							);
						})}
					</select>
				</ToolbarGroup>
			</BlockControls>
			{/* <BlockControls>
				<ToolbarGroup>
					{["h1", "h2", "h3", "h4", "h5", "h6"].map((headingTag) => (
						<ToolbarButton
							key={headingTag}
							isPressed={HeadTags === headingTag}
							onClick={() => handleTagChange(headingTag)}
						>
							{headingTag.toUpperCase()}
						</ToolbarButton>
					))}
				</ToolbarGroup>
			</BlockControls> */}
			<RichText
				tagName={HeadTags}
				value={HeadText}
				onChange={(v) => setAttributes({ HeadText: v })}
				// allowedFormats={["core/bold", "core/italic", "core/link"]}
				placeholder={__("Add Heading tag content..", "thirdblock")}
				style={{
					fontSize: HeadTextSize,
					textAlign: HeadTextAlign,
					color: HeadTextColor,
					backgroundColor: HeadBgColor,
					minWidth: "1300px",
					padding: `${paddings.top} ${paddings.left} ${paddings.right} ${paddings.bottom}`,
					margin: `${margins.top} ${margins.left} ${margins.right} ${margins.bottom}`,

					borderRadius: `${Radius}px`,
				}}
			/>
			<InspectorControls>
				<PanelBody title={__("Paragraph", "secondblock")} initialOpen={true}>
					{/* <BoxControl
						values={values}
						onChange={(nextValues) => setValues(nextValues)}
					/> */}
					<PanelColorSettings
						title={__("Text Color", "fisrtboks")}
						initialOpen={false}
						colorSettings={[
							{
								value: HeadTextColor,
								onChange: onChangeTextColor,
								label: __("Text Color", "fisrtblog"),
							},
							{
								value: HeadBgColor,
								onChange: onChangeBgColor,
								label: __("Background Color", "fisrtblog"),
							},
						]}
					/>
					{/* <p className="my_custom_color">{__("Radius", "blockss")}</p> */}

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
							className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
						>
							S
						</button>
						<button
							type="button"
							onClick={() => HandleChangeFontSize("20px")}
							className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
						>
							M
						</button>
						<button
							type="button"
							onClick={() => HandleChangeFontSize("24px")}
							className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
						>
							L
						</button>
						<button
							type="button"
							onClick={() => HandleChangeFontSize("28px")}
							className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
						>
							Xl
						</button>
						<button
							type="button"
							onClick={() => HandleChangeFontSize("32px")}
							className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
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
