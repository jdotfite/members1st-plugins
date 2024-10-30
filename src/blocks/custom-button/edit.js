// src/blocks/custom-button/edit.js
import { __ } from "@wordpress/i18n";
import {
    InspectorControls,
    RichText,
    useBlockProps,
    URLInput,
    MediaUpload,
    MediaUploadCheck,
} from "@wordpress/block-editor";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    Button,
    TextControl,
} from "@wordpress/components";

import { SIZE_CLASSES, STYLE_CLASSES, POSITION_CLASSES, WIDTH_CLASSES } from "./constants";
import { SpacingControls } from "@shared/spacing-control";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
    console.log('Edit Attributes:', attributes);
    const {
        content,
        size,
        style,
        position,
        uppercase,
        url,
        width,
        icon,
        iconPosition,
        target,
        ariaLabel,
        customClass,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
    } = attributes;

    const blockProps = useBlockProps();

    const spacingClasses = [
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
    ].filter(Boolean).join(" ");

    const buttonClasses = `
        btn
        ${SIZE_CLASSES[size]}
        ${STYLE_CLASSES[style]}
        ${uppercase ? "" : "normal-case"}
        ${WIDTH_CLASSES[width]}
        ${customClass}
        ${spacingClasses}
    `;

    const handleContentChange = (newContent) => {
        newContent = newContent.replace(/\n/g, "");
        if (newContent.length > 20) {
            newContent = newContent.slice(0, 20);
        }
        setAttributes({ content: newContent });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Button Settings", "members1st")}>
                    <TextControl
                        label={__("Button Text (max 20 characters)", "members1st")}
                        value={content}
                        onChange={handleContentChange}
                        maxLength={20}
                        help={`${20 - content.length} characters remaining`}
                    />
                    <SelectControl
                        label={__("Size", "members1st")}
                        value={size}
                        options={[
                            { label: __("Extra Small", "members1st"), value: "xs" },
                            { label: __("Small", "members1st"), value: "sm" },
                            { label: __("Medium", "members1st"), value: "md" },
                            { label: __("Large", "members1st"), value: "lg" },
                            { label: __("Extra Large", "members1st"), value: "xl" },
                            { label: __("2X Large", "members1st"), value: "2xl" },
                        ]}
                        onChange={(newSize) => setAttributes({ size: newSize })}
                    />
                    <SelectControl
                        label={__("Style", "members1st")}
                        value={style}
                        options={[
                            { label: __("Primary", "members1st"), value: "primary" },
                            { label: __("Secondary", "members1st"), value: "secondary" },
                            { label: __("Primary Outline", "members1st"), value: "primary-outline" },
                            { label: __("Secondary Outline", "members1st"), value: "secondary-outline" },
                        ]}
                        onChange={(newStyle) => setAttributes({ style: newStyle })}
                    />
                    <SelectControl
                        label={__("Position", "members1st")}
                        value={position}
                        options={[
                            { label: __("Left", "members1st"), value: "left" },
                            { label: __("Center", "members1st"), value: "center" },
                            { label: __("Right", "members1st"), value: "right" },
                        ]}
                        onChange={(newPosition) => setAttributes({ position: newPosition })}
                    />
                    <ToggleControl
                        label={__("Uppercase Text", "members1st")}
                        checked={uppercase}
                        onChange={() => setAttributes({ uppercase: !uppercase })}
                    />
                    <URLInput
                        label={__("Button URL", "members1st")}
                        value={url}
                        onChange={(newURL) => setAttributes({ url: newURL })}
                    />
                    <SelectControl
                        label={__("Width", "members1st")}
                        value={width}
                        options={[
                            { label: __("Normal", "members1st"), value: "normal" },
                            { label: __("Full Width", "members1st"), value: "full" },
                            { label: __("Full Width Mobile", "members1st"), value: "full-mobile" },
                        ]}
                        onChange={(newWidth) => setAttributes({ width: newWidth })}
                    />
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => setAttributes({ icon: media })}
                            allowedTypes={["image"]}
                            value={icon ? icon.id : ""}
                            render={({ open }) => (
                                <Button onClick={open} isPrimary>
                                    {icon ? __("Change Icon", "members1st") : __("Select Icon", "members1st")}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                    {icon && (
                        <Button isDestructive onClick={() => setAttributes({ icon: null })}>
                            {__("Remove Icon", "members1st")}
                        </Button>
                    )}
                    <SelectControl
                        label={__("Icon Position", "members1st")}
                        value={iconPosition}
                        options={[
                            { label: __("Left", "members1st"), value: "left" },
                            { label: __("Right", "members1st"), value: "right" },
                        ]}
                        onChange={(newIconPosition) => setAttributes({ iconPosition: newIconPosition })}
                    />
                    <SelectControl
                        label={__("Open link in", "members1st")}
                        value={target}
                        options={[
                            { label: __("Same tab", "members1st"), value: "" },
                            { label: __("New tab", "members1st"), value: "_blank" },
                        ]}
                        onChange={(newTarget) => setAttributes({ target: newTarget })}
                    />
                    <TextControl
                        label={__("Aria Label", "members1st")}
                        value={ariaLabel}
                        onChange={(newAriaLabel) => setAttributes({ ariaLabel: newAriaLabel })}
                        help={__("Provide a description for screen readers", "members1st")}
                    />
                    <TextControl
                        label={__("Custom CSS Class", "members1st")}
                        value={customClass}
                        onChange={(newCustomClass) => setAttributes({ customClass: newCustomClass })}
                    />
                </PanelBody>
                <PanelBody title={__("Spacing Settings", "members1st")} initialOpen={false}>
                    <SpacingControls attributes={attributes} setAttributes={setAttributes} />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps} className={`wp-block flex ${POSITION_CLASSES[position]}`}>
                <a
                    className={buttonClasses.trim()}
                    href={url}
                    {...(target ? { target: target } : {})}
                    aria-label={ariaLabel}
                >
                    {icon && iconPosition === "left" && (
                        <img src={icon.url} alt="" className="w-5 h-5 mr-2" />
                    )}
                    <RichText
                        tagName="span"
                        value={content}
                        onChange={handleContentChange}
                        placeholder={__("Add text…", "members1st")}
                        allowedFormats={[]}
                    />
                    {icon && iconPosition === "right" && (
                        <img src={icon.url} alt="" className="w-5 h-5 ml-2" />
                    )}
                </a>
            </div>
        </>
    );
}