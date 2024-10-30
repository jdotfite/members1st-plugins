import { registerPlugin } from "@wordpress/plugins";
import { ColorModeToggleButton } from "./components/ColorModeToggleButton";
import { appendColorModeToggleInSettings } from "./utils/dom";

registerPlugin("color-mode-toggle-plugin", {
    render: () => {
        setTimeout(() => {
            appendColorModeToggleInSettings();
        }, 1000);
        return null;
    },
});
