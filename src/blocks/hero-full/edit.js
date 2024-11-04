// src/blocks/hero-full/edit.js
import { useBlockProps, InspectorControls, MediaUpload, RichText } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Button } from '@shared/button';
import { OPACITY_OPTIONS, OPACITY_CHOICES } from '@shared/constants/opacity';

export default function Edit({ attributes, setAttributes }) {
    const {
        backgroundImage,
        overlayOpacity,
        darkModeOpacity,
        headingText,
        subheadingText,
        description,
        buttonText,
        buttonUrl,
        buttonStyle = 'primary',
        buttonSize = 'lg',
        buttonWidth = 'normal'
    } = attributes;

    const blockProps = useBlockProps();

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Hero Settings', 'hero-block')}>
                    <BaseControl
                        label={__('Background Image', 'hero-block')}
                        className="components-base-control"
                    >
                        <div className="flex flex-col gap-2">
                            {backgroundImage && (
                                <div className="relative w-full h-32 bg-gray-100 rounded overflow-hidden">
                                    <img
                                        src={backgroundImage}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <MediaUpload
                                onSelect={(media) => setAttributes({ backgroundImage: media.url })}
                                type="image"
                                render={({ open }) => (
                                    <button
                                        onClick={open}
                                        className="components-button is-primary"
                                    >
                                        {backgroundImage ?
                                            __('Change Image', 'hero-block') :
                                            __('Select Background Image', 'hero-block')
                                        }
                                    </button>
                                )}
                            />
                            {backgroundImage && (
                                <button
                                    onClick={() => setAttributes({ backgroundImage: '' })}
                                    className="components-button is-destructive"
                                >
                                    {__('Remove Image', 'hero-block')}
                                </button>
                            )}
                        </div>
                    </BaseControl>
                    <SelectControl
                        label={__('Overlay Opacity', 'hero-block')}
                        value={overlayOpacity}
                        options={OPACITY_CHOICES}
                        onChange={(value) => setAttributes({ overlayOpacity: value })}
                    />
                    <SelectControl
                        label={__('Dark Mode Overlay Opacity', 'hero-block')}
                        value={darkModeOpacity}
                        options={OPACITY_CHOICES}
                        onChange={(value) => setAttributes({ darkModeOpacity: value })}
                    />

                    {/* Button Controls */}
                    <PanelBody title={__('Button Settings', 'hero-block')}>
                        <TextControl
                            label={__('Button Text', 'hero-block')}
                            value={buttonText}
                            onChange={(value) => setAttributes({ buttonText: value })}
                        />
                        <TextControl
                            label={__('Button URL', 'hero-block')}
                            value={buttonUrl}
                            onChange={(value) => setAttributes({ buttonUrl: value })}
                        />
                        <SelectControl
                            label={__('Button Style', 'hero-block')}
                            value={buttonStyle}
                            options={[
                                { label: 'Primary', value: 'primary' },
                                { label: 'Secondary', value: 'secondary' },
                                { label: 'Primary Outline', value: 'primary-outline' },
                                { label: 'Secondary Outline', value: 'secondary-outline' },
                            ]}
                            onChange={(value) => setAttributes({ buttonStyle: value })}
                        />
                        <SelectControl
                            label={__('Button Size', 'hero-block')}
                            value={buttonSize}
                            options={[
                                { label: 'Small', value: 'sm' },
                                { label: 'Medium', value: 'md' },
                                { label: 'Large', value: 'lg' },
                                { label: 'Extra Large', value: 'xl' },
                            ]}
                            onChange={(value) => setAttributes({ buttonSize: value })}
                        />
                        <SelectControl
                            label={__('Button Width', 'hero-block')}
                            value={buttonWidth}
                            options={[
                                { label: 'Normal', value: 'normal' },
                                { label: 'Full Width', value: 'full' },
                                { label: 'Full Width on Mobile', value: 'full-mobile' },
                            ]}
                            onChange={(value) => setAttributes({ buttonWidth: value })}
                        />
                    </PanelBody>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <section id="hero">
                    <div
                        className="relative h-screen w-full flex items-center justify-center text-center bg-cover bg-center"
                        style={{
                            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                            height: '100vh'
                        }}
                    >
                        <div
                            className={`absolute top-0 right-0 bottom-0 left-0 bg-black dark:bg-black ${OPACITY_OPTIONS[overlayOpacity]?.class || 'bg-opacity-0'
                                } ${OPACITY_OPTIONS[darkModeOpacity]?.darkClass || 'dark:bg-opacity-0'
                                }`}
                        ></div>

                        <main className="px-4 sm:px-6 lg:px-10 z-10">
                            <div className="text-center">
                                <h2 className="mb-4 text-7xl font-bold tracking-tight leading-none uppercase">
                                    <RichText
                                        tagName="span"
                                        className="text-m1-red"
                                        value={headingText}
                                        onChange={(value) => setAttributes({ headingText: value })}
                                    />
                                    <RichText
                                        tagName="span"
                                        className="md:text-6xl text-5xl block tracking-wide text-white"
                                        value={subheadingText}
                                        onChange={(value) => setAttributes({ subheadingText: value })}
                                    />
                                </h2>

                                <RichText
                                    tagName="p"
                                    className="mt-3 text-white sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 font-opensans"
                                    value={description}
                                    onChange={(value) => setAttributes({ description: value })}
                                />

                                <div className="mt-5 sm:mt-8 sm:flex justify-center">
                                    <div className="rounded-md shadow">
                                        <Button
                                            content={buttonText}
                                            url={buttonUrl}
                                            style={buttonStyle}
                                            size={buttonSize}
                                            width={buttonWidth}
                                            position="center"
                                            uppercase={true}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="scroll_icon_wrap">
                                <a
                                    aria-label="Scroll down"
                                    className="scroll_link bloop text--white"
                                    href="#mission"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="animate-bounce fill-white"
                                        focusable="false"
                                        role="presentation"
                                        viewBox="0 0 30 17"
                                    >
                                        <path
                                            d="M0 3.235 3.525 0l11.473 10.509L26.473 0 30 3.235 14.998 17z"
                                            fillRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </main>
                    </div>
                </section>
            </div>
        </>
    );
}