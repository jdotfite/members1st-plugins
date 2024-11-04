// src/blocks/custom-button/save.js
import { useBlockProps } from "@wordpress/block-editor";
import { Button } from "@shared/button";
import { POSITION_CLASSES } from "@shared/button/constants";

export default function Save({ attributes }) {
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

    const blockProps = useBlockProps.save();
    
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

    return (
        <div {...blockProps} className={`flex ${POSITION_CLASSES[position]}`}>
            <Button
                content={content}
                size={size}
                style={style}
                position={position}
                uppercase={uppercase}
                url={url}
                width={width}
                icon={icon}
                iconPosition={iconPosition}
                target={target}
                ariaLabel={ariaLabel}
                customClass={customClass}
                spacingClasses={spacingClasses}
            />
        </div>
    );
}