import { __ } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';

// Using explicit Tailwind class names mapped to slider values
const SPACING_MAP = {
    padding: {
        top: [
            { value: 0, class: '' },
            { value: 1, class: 'pt-1' },
            { value: 2, class: 'pt-2' },
            { value: 3, class: 'pt-3' },
            { value: 4, class: 'pt-4' },
            { value: 5, class: 'pt-5' },
            { value: 6, class: 'pt-6' },
            { value: 7, class: 'pt-7' },
            { value: 8, class: 'pt-8' },
            { value: 9, class: 'pt-9' },
            { value: 10, class: 'pt-10' },
            { value: 11, class: 'pt-11' },
            { value: 12, class: 'pt-12' },
            { value: 14, class: 'pt-14' },
            { value: 16, class: 'pt-16' }
        ],
        right: [
            { value: 0, class: '' },
            { value: 1, class: 'pr-1' },
            { value: 2, class: 'pr-2' },
            { value: 3, class: 'pr-3' },
            { value: 4, class: 'pr-4' },
            { value: 5, class: 'pr-5' },
            { value: 6, class: 'pr-6' },
            { value: 7, class: 'pr-7' },
            { value: 8, class: 'pr-8' },
            { value: 9, class: 'pr-9' },
            { value: 10, class: 'pr-10' },
            { value: 11, class: 'pr-11' },
            { value: 12, class: 'pr-12' },
            { value: 14, class: 'pr-14' },
            { value: 16, class: 'pr-16' }
        ],
        bottom: [
            { value: 0, class: '' },
            { value: 1, class: 'pb-1' },
            { value: 2, class: 'pb-2' },
            { value: 3, class: 'pb-3' },
            { value: 4, class: 'pb-4' },
            { value: 5, class: 'pb-5' },
            { value: 6, class: 'pb-6' },
            { value: 7, class: 'pb-7' },
            { value: 8, class: 'pb-8' },
            { value: 9, class: 'pb-9' },
            { value: 10, class: 'pb-10' },
            { value: 11, class: 'pb-11' },
            { value: 12, class: 'pb-12' },
            { value: 14, class: 'pb-14' },
            { value: 16, class: 'pb-16' }
        ],
        left: [
            { value: 0, class: '' },
            { value: 1, class: 'pl-1' },
            { value: 2, class: 'pl-2' },
            { value: 3, class: 'pl-3' },
            { value: 4, class: 'pl-4' },
            { value: 5, class: 'pl-5' },
            { value: 6, class: 'pl-6' },
            { value: 7, class: 'pl-7' },
            { value: 8, class: 'pl-8' },
            { value: 9, class: 'pl-9' },
            { value: 10, class: 'pl-10' },
            { value: 11, class: 'pl-11' },
            { value: 12, class: 'pl-12' },
            { value: 14, class: 'pl-14' },
            { value: 16, class: 'pl-16' }
        ]
    },
    margin: {
        top: [
            { value: 0, class: '' },
            { value: 1, class: 'mt-1' },
            { value: 2, class: 'mt-2' },
            { value: 3, class: 'mt-3' },
            { value: 4, class: 'mt-4' },
            { value: 5, class: 'mt-5' },
            { value: 6, class: 'mt-6' },
            { value: 7, class: 'mt-7' },
            { value: 8, class: 'mt-8' },
            { value: 9, class: 'mt-9' },
            { value: 10, class: 'mt-10' },
            { value: 11, class: 'mt-11' },
            { value: 12, class: 'mt-12' },
            { value: 14, class: 'mt-14' },
            { value: 16, class: 'mt-16' }
        ],
        right: [
            { value: 0, class: '' },
            { value: 1, class: 'mr-1' },
            { value: 2, class: 'mr-2' },
            { value: 3, class: 'mr-3' },
            { value: 4, class: 'mr-4' },
            { value: 5, class: 'mr-5' },
            { value: 6, class: 'mr-6' },
            { value: 7, class: 'mr-7' },
            { value: 8, class: 'mr-8' },
            { value: 9, class: 'mr-9' },
            { value: 10, class: 'mr-10' },
            { value: 11, class: 'mr-11' },
            { value: 12, class: 'mr-12' },
            { value: 14, class: 'mr-14' },
            { value: 16, class: 'mr-16' }
        ],
        bottom: [
            { value: 0, class: '' },
            { value: 1, class: 'mb-1' },
            { value: 2, class: 'mb-2' },
            { value: 3, class: 'mb-3' },
            { value: 4, class: 'mb-4' },
            { value: 5, class: 'mb-5' },
            { value: 6, class: 'mb-6' },
            { value: 7, class: 'mb-7' },
            { value: 8, class: 'mb-8' },
            { value: 9, class: 'mb-9' },
            { value: 10, class: 'mb-10' },
            { value: 11, class: 'mb-11' },
            { value: 12, class: 'mb-12' },
            { value: 14, class: 'mb-14' },
            { value: 16, class: 'mb-16' }
        ],
        left: [
            { value: 0, class: '' },
            { value: 1, class: 'ml-1' },
            { value: 2, class: 'ml-2' },
            { value: 3, class: 'ml-3' },
            { value: 4, class: 'ml-4' },
            { value: 5, class: 'ml-5' },
            { value: 6, class: 'ml-6' },
            { value: 7, class: 'ml-7' },
            { value: 8, class: 'ml-8' },
            { value: 9, class: 'ml-9' },
            { value: 10, class: 'ml-10' },
            { value: 11, class: 'ml-11' },
            { value: 12, class: 'ml-12' },
            { value: 14, class: 'ml-14' },
            { value: 16, class: 'ml-16' }
        ]
    }
};

export const SpacingControls = ({ attributes, setAttributes }) => {
console.log('Spacing Control Props:', attributes)
    const {
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
    } = attributes;

    // Get slider value from class
    const getValueFromClass = (className, type, direction) => {
        if (!className) return 0;
        return SPACING_MAP[type][direction].find(item => item.class === className)?.value || 0;
    };

    // Get class from slider value
    const getClassFromValue = (value, type, direction) => {
        return SPACING_MAP[type][direction].find(item => item.value === value)?.class || '';
    };

    return (
        <>
            <div className="spacing-control-group">
                <h3>{__('Padding', 'custom-button')}</h3>
                <div className="spacing-control-row">
                    <RangeControl
                        label={__('Top', 'custom-button')}
                        value={getValueFromClass(paddingTop, 'padding', 'top')}
                        onChange={(value) => setAttributes({ paddingTop: getClassFromValue(value, 'padding', 'top') })}
                        min={0}
                        max={16}
                        step={1}
                        marks={[
                            { value: 0, label: '0' },
                            { value: 4, label: '4' },
                            { value: 8, label: '8' },
                            { value: 12, label: '12' },
                            { value: 16, label: '16' }
                        ]}
                        withInputField={false}
                        railColor="#E2E8F0"
                        trackColor="#3B82F6"
                    />
                </div>
                <div className="spacing-control-row">
                    <RangeControl
                        label={__('Right', 'custom-button')}
                        value={getValueFromClass(paddingRight, 'padding', 'right')}
                        onChange={(value) => setAttributes({ paddingRight: getClassFromValue(value, 'padding', 'right') })}
                        min={0}
                        max={16}
                        step={1}
                        marks={[
                            { value: 0, label: '0' },
                            { value: 4, label: '4' },
                            { value: 8, label: '8' },
                            { value: 12, label: '12' },
                            { value: 16, label: '16' }
                        ]}
                        withInputField={false}
                        railColor="#E2E8F0"
                        trackColor="#3B82F6"
                    />
                </div>
                <div className="spacing-control-row">
                    <RangeControl
                        label={__('Bottom', 'custom-button')}
                        value={getValueFromClass(paddingBottom, 'padding', 'bottom')}
                        onChange={(value) => setAttributes({ paddingBottom: getClassFromValue(value, 'padding', 'bottom') })}
                        min={0}
                        max={16}
                        step={1}
                        marks={[
                            { value: 0, label: '0' },
                            { value: 4, label: '4' },
                            { value: 8, label: '8' },
                            { value: 12, label: '12' },
                            { value: 16, label: '16' }
                        ]}
                        withInputField={false}
                        railColor="#E2E8F0"
                        trackColor="#3B82F6"
                    />
                </div>
                <div className="spacing-control-row">
                    <RangeControl
                        label={__('Left', 'custom-button')}
                        value={getValueFromClass(paddingLeft, 'padding', 'left')}
                        onChange={(value) => setAttributes({ paddingLeft: getClassFromValue(value, 'padding', 'left') })}
                        min={0}
                        max={16}
                        step={1}
                        marks={[
                            { value: 0, label: '0' },
                            { value: 4, label: '4' },
                            { value: 8, label: '8' },
                            { value: 12, label: '12' },
                            { value: 16, label: '16' }
                        ]}
                        withInputField={false}
                        railColor="#E2E8F0"
                        trackColor="#3B82F6"
                    />
                </div>
            </div>

            <div className="spacing-control-group">
                <h3>{__('Margin', 'custom-button')}</h3>
                <div className="spacing-control-row">
                    <RangeControl
                        label={__('Top', 'custom-button')}
                        value={getValueFromClass(marginTop, 'margin', 'top')}
                        onChange={(value) => setAttributes({ marginTop: getClassFromValue(value, 'margin', 'top') })}
                        min={0}
                        max={16}
                        step={1}
                        marks={[
                            { value: 0, label: '0' },
                            { value: 4, label: '4' },
                            { value: 8, label: '8' },
                            { value: 12, label: '12' },
                            { value: 16, label: '16' }
                        ]}
                        withInputField={false}
                        railColor="#E2E8F0"
                        trackColor="#3B82F6"
                    />
                </div>
                <div className="spacing-control-row">
                    <RangeControl
                        label={__('Right', 'custom-button')}
                        value={getValueFromClass(marginRight, 'margin', 'right')}
                        onChange={(value) => setAttributes({ marginRight: getClassFromValue(value, 'margin', 'right') })}
                        min={0}
                        max={16}
                        step={1}
                        marks={[
                            { value: 0, label: '0' },
                            { value: 4, label: '4' },
                            { value: 8, label: '8' },
                            { value: 12, label: '12' },
                            { value: 16, label: '16' }
                        ]}
                        withInputField={false}
                        railColor="#E2E8F0"
                        trackColor="#3B82F6"
                    />
                </div>
                <div className="spacing-control-row">
                    <RangeControl
                        label={__('Bottom', 'custom-button')}
                        value={getValueFromClass(marginBottom, 'margin', 'bottom')}
                        onChange={(value) => setAttributes({ marginBottom: getClassFromValue(value, 'margin', 'bottom') })}
                        min={0}
                        max={16}
                        step={1}
                        marks={[
                            { value: 0, label: '0' },
                            { value: 4, label: '4' },
                            { value: 8, label: '8' },
                            { value: 12, label: '12' },
                            { value: 16, label: '16' }
                        ]}
                        withInputField={false}
                        railColor="#E2E8F0"
                        trackColor="#3B82F6"
                    />
                </div>
                <div className="spacing-control-row">
                    <RangeControl
                        label={__('Left', 'custom-button')}
                        value={getValueFromClass(marginLeft, 'margin', 'left')}
                        onChange={(value) => setAttributes({ marginLeft: getClassFromValue(value, 'margin', 'left') })}
                        min={0}
                        max={16}
                        step={1}
                        marks={[
                            { value: 0, label: '0' },
                            { value: 4, label: '4' },
                            { value: 8, label: '8' },
                            { value: 12, label: '12' },
                            { value: 16, label: '16' }
                        ]}
                        withInputField={false}
                        railColor="#E2E8F0"
                        trackColor="#3B82F6"
                    />
                </div>
            </div>
        </>
    );
};