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
} from "@wordpress/components";
import { pin, list, grid } from "@wordpress/icons";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import "./tailwind.css";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		text,
		content,
		multiContent,
		multiParagraph,
		tag,
		colorPelete,
		togglecontent,
		gradiuntColor,
		paddings,
		imageOne,
		imageMulti,
	} = attributes;
	const [gradient, setGradient] = useState(null);
	const [headColor, setHeadColor] = useState("red");
	const [headWidth, setHeadWidth] = useState([300, 300, 10]);
	const [headHeight, setHeadHeight] = useState([200, 200, 5]);
	const [linesData, setLinesData] = useState(["hello welcome to our state"]);
	const [previewImage, setPreviewImage] = useState(null);
	const [images, setImages] = useState([]);
	const [newTag, setNewTag] = useState(null);
	const [angle, setAngle] = useState(0);
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setAttributes({ imageOne: reader.result });
			};
			reader.readAsDataURL(file);
		}
	};
	const handleImageChangeMultiple = (e) => {
		const files = e.target.files;
		if (files) {
			const imagesPromises = Array.from(files).map((file) => {
				return new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.onloadend = () => {
						resolve(reader.result);
					};
					reader.onerror = reject;
					reader.readAsDataURL(file);
				});
			});

			Promise.all(imagesPromises)
				.then((results) => {
					// Set the attributes with the array of image URLs
					setAttributes({ imageMulti: results });
				})
				.catch((error) => {
					console.error("Error reading files:", error);
				});
		}
	};
	const handleNewTagAdd = () => {
		if (newTag.length !== 0 && newTag !== null) {
			setLinesData([...linesData, newTag]);
			setNewTag("");
		}
	};

	const layoutControls = [
		{
			icon: list,
			title: _x("List view", "Latest posts block display setting"),
			// onClick: () => setAttributes( { postLayout: 'list' } ),
			// isActive: postLayout === 'list',
		},
		{
			icon: grid,
			title: _x("Grid view", "Latest posts block display setting"),
			// onClick: () => setAttributes( { postLayout: 'grid' } ),
			// isActive: postLayout === 'grid',
		},
	];

	return (
		<>
			{/* <BlockControls>
				fgfgfgtgrtgefge
				<h1>wfrwefwef</h1>
			</BlockControls> */}
			<InspectorControls>
				<PanelBody title={__("Jenish Div", "firstblock")} initialOpen={false}>
					<div>
						<div className="flex gap-2 items-center mb-4 mt-1">
							<div
								style={{
									height: "25px",
									width: "25px",
									borderRadius: "100px",
									cursor: "pointer",
									backgroundColor: "Black",
								}}
								onClick={() => setHeadColor("black")}
							></div>
							<div
								style={{
									height: "25px",
									width: "25px",
									borderRadius: "100px",
									cursor: "pointer",
									backgroundColor: "green",
								}}
								onClick={() => setHeadColor("green")}
							></div>
							<div
								style={{
									height: "25px",
									width: "25px",
									borderRadius: "100px",
									cursor: "pointer",
									backgroundColor: "yellow",
								}}
								onClick={() => setHeadColor("yellow")}
							></div>
							<div
								style={{
									height: "25px",
									width: "25px",
									borderRadius: "100px",
									cursor: "pointer",
									backgroundColor: "orange",
								}}
								onClick={() => setHeadColor("orange")}
							></div>
							<div
								style={{
									height: "25px",
									width: "25px",
									borderRadius: "100px",
									cursor: "pointer",
									backgroundColor: "pink",
								}}
								onClick={() => setHeadColor("pink")}
							></div>
							<div
								style={{
									height: "25px",
									width: "25px",
									borderRadius: "100px",
									cursor: "pointer",
								}}
							>
								<input
									type="color"
									onChange={(e) => setHeadColor(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div
						style={{
							marginTop: "15px",

							marginBottom: "15px",
						}}
					>
						<div>
							<h3>Image</h3>
							<input
								type="file"
								onChange={handleImageChange}
								style={{ marginTop: "-8px" }}
							/>
						</div>
						{previewImage && (
							<div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
								<div>
									<h6 style={{ margin: "0px", padding: "0px" }}>Width</h6>
									<input
										type="number"
										style={{ width: "60px" }}
										value={headWidth[0]}
										onChange={(e) =>
											setHeadWidth([e.target.value, headWidth[1], headWidth[2]])
										}
									/>
								</div>
								<div>
									<h6 style={{ margin: "0px", padding: "0px" }}>Height</h6>
									<input
										type="number"
										style={{ width: "60px" }}
										value={headWidth[1]}
										onChange={(e) =>
											setHeadWidth([headWidth[0], e.target.value, headWidth[2]])
										}
									/>
								</div>
								<div>
									<h6 style={{ margin: "0px", padding: "0px" }}>Radius</h6>
									<input
										type="number"
										style={{ width: "60px" }}
										value={headWidth[2]}
										onChange={(e) =>
											setHeadWidth([headWidth[0], headWidth[1], e.target.value])
										}
									/>
								</div>
							</div>
						)}

						<div style={{ marginTop: "15px" }}>
							<h3>Image Multiple</h3>
							<input
								type="file"
								multiple
								onChange={handleImageChangeMultiple}
							/>
						</div>
						{Array.isArray(images) && images.length !== 0 && (
							<div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
								<div>
									<h6 style={{ margin: "0px", padding: "0px" }}>Width</h6>
									<input
										type="number"
										style={{ width: "60px" }}
										value={headHeight[0]}
										onChange={(e) =>
											setHeadHeight([
												e.target.value,
												headHeight[1],
												headHeight[2],
											])
										}
									/>
								</div>
								<div>
									<h6 style={{ margin: "0px", padding: "0px" }}>Height</h6>
									<input
										type="number"
										style={{ width: "60px" }}
										value={headHeight[1]}
										onChange={(e) =>
											setHeadHeight([
												headHeight[0],
												e.target.value,
												headHeight[2],
											])
										}
									/>
								</div>
								<div>
									<h6 style={{ margin: "0px", padding: "0px" }}>Radius</h6>
									<input
										type="number"
										style={{ width: "60px" }}
										value={headHeight[2]}
										onChange={(e) =>
											setHeadHeight([
												headHeight[0],
												headHeight[1],
												e.target.value,
											])
										}
									/>
								</div>
							</div>
						)}
					</div>
					<div style={{ marginTop: "15px" }}>
						<input
							name="newtag"
							value={newTag}
							onChange={(e) => setNewTag(e.target.value)}
							placeholder="Enter Content"
						/>
						<button onClick={handleNewTagAdd}>Add Tag</button>
					</div>
				</PanelBody>
				<PanelBody title={__("panal Title", "secondblock")} initialOpen={true}>
					<ToggleControl
						checked={!!togglecontent}
						label={__("Show Title", "copyright-title")}
						onChange={() =>
							setAttributes({
								togglecontent: !togglecontent,
							})
						}
					/>
					{togglecontent && (
						<TextControl
							label={__("Block content Label", "thirdblocks")}
							value={text}
							onChange={(v) => setAttributes({ text: v })}
						></TextControl>
					)}
					<SelectControl
						label={__("select tag", "selecttag")}
						value={tag}
						options={[
							{
								label: __("H1", "selecttag"),
								value: "h1",
							},
							{
								label: __("H2", "selecttag"),
								value: "h2",
							},
							{
								label: __("H3", "selecttag"),
								value: "h3",
							},
							{
								label: __("H4", "selecttag"),
								value: "h4",
							},
							{
								label: __("H5", "selecttag"),
								value: "h5",
							},
							{
								label: __("H6", "selecttag"),
								value: "h6",
							},
							{
								label: __("P", "selecttag"),
								value: "p",
							},
						]}
						onChange={(v) => setAttributes({ tag: v })}
					/>
					<p className="my_custom_color">{__("Content Color", "blockss")}</p>
					{/* <ColorPalette
						colors={[
							{
								name: "red",
								color: "#f00",
							},
							{
								name: "white",
								color: "#fff",
							},
							{
								name: "black",
								color: "#000",
							},
						]}
						value={colorPelete}
						onChange={(v) => setAttributes({ colorPelete: v })}
						// clearable={false}
					/> */}
					{/* <ColorPicker
						color={colorPelete || ""}
						onChange={(e) => setAttributes({ colorPelete: e })}
						enableAlpha
						defaultValue="#000"
					/> */}
					<GradientPicker
						value={gradiuntColor}
						onChange={(currentGradient) =>
							setAttributes({ gradiuntColor: currentGradient })
						}
						gradients={[
							{
								name: "JShine",
								gradient:
									"linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)",
								slug: "jshine",
							},
							{
								name: "Moonlit Asteroid",
								gradient:
									"linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)",
								slug: "moonlit-asteroid",
							},
							{
								name: "Rastafarie",
								gradient:
									"linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)",
								slug: "rastafari",
							},
						]}
					/>
					<BoxControl
						values={paddings}
						onChange={(nextValues) => setAttributes({ paddings: nextValues })}
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup controls={layoutControls} />
			</BlockControls>
			<div>
				<AnglePickerControl value={angle} onChange={setAngle} />
				{/* <Animate type="slide-in" options={{ origin: "center" }}>
					{({ className }) => (
						<Notice className={className} status="success">
							<p>Animation finished.</p>
						</Notice>
					)}
				</Animate> */}
				<h1
					{...useBlockProps({
						className: "block_info_custom_classes ",
					})}
					// className={`bg-${gradiuntColor}`}
					style={{ background: gradiuntColor }}
				>
					{text}
				</h1>
				<div>
					<RichText
						tagName={tag}
						value={content}
						onChange={(v) => setAttributes({ content: v })}
						allowedFormats={["core/bold", "core/italic", "core/link"]}
						placeholder={__("Add content..", "thirdblock")}
						style={{ color: colorPelete }}
					/>
				</div>
				<RichText
					tagName="ul"
					value={multiContent}
					multiline="li"
					onChange={(v) => setAttributes({ multiContent: v })}
					allowedFormats={["core/bold", "core/italic", "core/link"]}
					placeholder={__("Add List..", "thirdblock")}
				/>
				<RichText
					tagName="div"
					value={multiParagraph}
					multiline="p"
					className="our-content"
					onChange={(v) => setAttributes({ multiParagraph: v })}
					allowedFormats={["core/bold", "core/italic", "core/link"]}
					placeholder={__("Add Paragraph..", "thirdblock3")}
				/>
				<h1 style={{ color: headColor }}>Jay Hind Jay Bharat</h1>
				<h2 className=" text-[50px] bg-slate-500">Native infotech</h2>
				<h5>Lets do something new for our office</h5>
				{imageOne && (
					<div>
						<h2>Preview</h2>
						<img
							src={imageOne}
							alt="Preview"
							height={headWidth[1]}
							width={headWidth[0]}
							style={{ borderRadius: headWidth[2] + "px" }}
						/>
					</div>
				)}
				{Array.isArray(imageMulti) && imageMulti.length !== 0 && (
					<div className="mt-5">
						<h2>Preview Images</h2>
						<div className="flex gap-5">
							{imageMulti?.map((item, key) => {
								return (
									<img
										src={item}
										key={key}
										alt="Preview"
										height={headHeight[1]}
										width={headHeight[0]}
										style={{ borderRadius: headHeight[2] + "px" }}
									/>
								);
							})}
						</div>
					</div>
				)}
				<div>
					{linesData?.map((item, key) => {
						return (
							<p key={key} style={{ fontSize: "25px" }}>
								{item}
							</p>
						);
					})}
				</div>
			</div>
		</>
	);
}
