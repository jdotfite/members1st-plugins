import { useBlockProps } from "@wordpress/block-editor";
import { SIZE_CLASSES, STYLE_CLASSES, POSITION_CLASSES, WIDTH_CLASSES } from "./constants";

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
    
    // Fixed spacing classes to not include the prefix
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
        ${uppercase ? 'uppercase' : ''}
        ${WIDTH_CLASSES[width]}
        ${spacingClasses}
        ${customClass}
    `.trim();

    // Only add target and rel attributes for new tab links
    const linkProps = {
        className: buttonClasses,
        href: url,
        'aria-label': ariaLabel,
        ...(target === '_blank' ? {
            target: '_blank',
            rel: 'noopener noreferrer'
        } : {})
    };

    return (
        <div {...blockProps} className={`flex ${POSITION_CLASSES[position]}`}>
            <a {...linkProps}>
                {icon && iconPosition === 'left' && (
                    <img src={icon.url} alt="" className="w-5 h-5 mr-2" />
                )}
                <span>{content}</span>
                {icon && iconPosition === 'right' && (
                    <img src={icon.url} alt="" className="w-5 h-5 ml-2" />
                )}
            </a>
        </div>
    );
}