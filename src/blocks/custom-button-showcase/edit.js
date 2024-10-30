/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { BUTTON_STYLES, BUTTON_SIZES } from "./constants";
import "./editor.scss";

/**
 * The edit component for the Custom Button Showcase block.
 * 
 * @return {WPElement} Element to render.
 */
export default function Edit() {
    const blockProps = useBlockProps();

    return (
        <div {...blockProps}>
            <h2 className="text-4xl font-light mb-4">
                {__("Buttons", "members1st")}
            </h2>
            
            <div className="bg-gray-lightest  p-6 border border-gray-200 rounded-lg mb-4">
                <h3 className="text-xl font-semibold mb-3">
                    {__("Button Styles", "members1st")}
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                    {BUTTON_STYLES.map((style, index) => (
                        <a 
                            key={index} 
                            href="#"
                            className={`btn ${style.class} text-base px-4 py-2`}
                        >
                            {style.name}
                        </a>
                    ))}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    {__("Button Sizes", "members1st")}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                    {BUTTON_SIZES.map((size, index) => (
                        <a 
                            key={index} 
                            href="#" 
                            className={`btn btn-primary ${size.class}`}
                        >
                            {size.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
