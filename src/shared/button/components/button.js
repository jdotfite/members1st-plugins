// src/shared/button/components/button.js
import { SIZE_CLASSES, STYLE_CLASSES, POSITION_CLASSES, WIDTH_CLASSES } from '../constants';

export const Button = ({ 
    content,
    size = 'md',
    style = 'primary',
    position = 'left',
    uppercase = true,
    url = '#',
    width = 'normal',
    icon = null,
    iconPosition = 'left',
    target = '',
    ariaLabel = '',
    customClass = '',
    spacingClasses = ''
}) => {
    const buttonClasses = `
        btn
        ${SIZE_CLASSES[size]}
        ${STYLE_CLASSES[style]}
        ${uppercase ? 'uppercase' : ''}
        ${WIDTH_CLASSES[width]}
        ${spacingClasses}
        ${customClass}
    `.trim();

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
        <a {...linkProps}>
            {icon && iconPosition === 'left' && (
                <img src={icon.url} alt="" className="w-5 h-5 mr-2" />
            )}
            <span>{content}</span>
            {icon && iconPosition === 'right' && (
                <img src={icon.url} alt="" className="w-5 h-5 ml-2" />
            )}
        </a>
    );
};