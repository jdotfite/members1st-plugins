// src/blocks/hero-full/save.js
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button } from '@shared/button';
import { OPACITY_OPTIONS } from '@shared/constants/opacity';

export default function Save({ attributes }) {
    const {
        backgroundImage,
        overlayOpacity,
        darkModeOpacity,
        headingText,
        subheadingText,
        description,
        buttonText,
        buttonUrl,
        buttonStyle,
        buttonSize,
        buttonWidth
    } = attributes;

    const blockProps = useBlockProps.save();

    return (
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
                        className={`absolute top-0 right-0 bottom-0 left-0 bg-black dark:bg-black ${OPACITY_OPTIONS[overlayOpacity]?.class || 'bg-opacity-50'
                            } ${OPACITY_OPTIONS[darkModeOpacity]?.darkClass || 'dark:bg-opacity-70'
                            }`}
                    ></div>
                    <main className="px-4 sm:px-6 lg:px-10 z-10">
                        <div className="text-center">
                            <h2 className="mb-4 text-7xl font-bold tracking-tight leading-none uppercase">
                                <RichText.Content
                                    tagName="span"
                                    className="text-m1-red"
                                    value={headingText}
                                />
                                <RichText.Content
                                    tagName="span"
                                    className="md:text-6xl text-5xl block tracking-wide text-white"
                                    value={subheadingText}
                                />
                            </h2>

                            <RichText.Content
                                tagName="p"
                                className="mt-3 text-white sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 font-opensans"
                                value={description}
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
                                className="absolute bottom-5 w-8"
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
    );
}