import { ColorModeToggleButton } from "../components/ColorModeToggleButton";
import { render } from "@wordpress/element";

export function appendColorModeToggleInSettings() {
    const settingsBar = document.querySelector(".editor-header__settings");
    const viewButton = document.querySelector(".editor-preview-dropdown");

    if (settingsBar && viewButton) {
        const colorModeToggleWrapper = document.createElement("div");
        colorModeToggleWrapper.id = "color-mode-toggle-wrapper";
        settingsBar.insertBefore(colorModeToggleWrapper, viewButton);

        render(
            <ColorModeToggleButton />,
            document.getElementById("color-mode-toggle-wrapper")
        );
        console.log("Color mode toggle button added to the left of the View button.");
    } else {
        console.warn(".editor-header__settings or View button not found.");
    }
}
