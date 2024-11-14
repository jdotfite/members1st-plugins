/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import Save from "./save";

// Note: We don't need to import the SCSS file here since it will be handled by the build process
import metadata from "./block.json";

registerBlockType(metadata.name, {
    ...metadata,
    edit: Edit,
    save: Save,
});