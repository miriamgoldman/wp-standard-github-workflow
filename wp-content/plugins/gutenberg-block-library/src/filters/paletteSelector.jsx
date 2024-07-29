import { addFilter } from '@wordpress/hooks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ColorPalette } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { cloneElement } from '@wordpress/element';

const colors = [
    { name: 'Bright Green', color: '#00bf7d', slug: 'bright-green' },
    { name: 'Vibrant Cyan', color: '#00b4c5', slug: 'vibrant-cyan' },
    { name: 'Deep Blue', color: '#0073e6', slug: 'deep-blue' },
    { name: 'Rich Indigo', color: '#2546f0', slug: 'rich-indigo' },
    { name: 'Deep Purple', color: '#5928ed', slug: 'deep-purple' },
];

addFilter(
    'blocks.registerBlockType',
    'mag-blocks/add-color-picker',
    (settings, name) => {
        if (name === 'core/pullquote') {
            settings.attributes = {
                ...settings.attributes,
                bracketColor: {
                    type: 'string',
                    default: '#000000',
                },
            };

        }

        return settings;
    }
);

const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
        if ( 'core/pullquote' !== props.name ) {
			return <BlockEdit { ...props } />;
		}

        const { attributes, setAttributes } = props;
        const { bracketColor } = attributes;

        return (
            <>
    		<BlockEdit { ...props } />
            <InspectorControls>
                <PanelBody title="Bracket Color" initialOpen={true}>
                    <ColorPalette
                        colors={colors}
                        value={bracketColor}
                        onChange={(color) => setAttributes({ bracketColor: color })
                    }
                    />
                </PanelBody>
            </InspectorControls>
          
             </>
        );
    }

}, 'withInspectorControls');

addFilter( 'editor.BlockEdit', 'mag-blocks/add-color-picker', withInspectorControls );

addFilter(
    'blocks.getSaveElement',
    'mag-blocks/add-color-picker',
    ( element, block, attributes ) => {
        if ( 'core/pullquote' !== block.name ) {
            return element;
        }

        const { bracketColor } = attributes;
        const selectedColor = colors.find(color => color.color === bracketColor);
        const colorSlug = selectedColor ? selectedColor.slug : 'none';
        const prefixedColorSlug = `has-bracket-color-${colorSlug}`;




        return cloneElement(
            element,
            { className: `${element.props.className} ${prefixedColorSlug}` },
            cloneElement( element.props.children, {})
        );

    }
);