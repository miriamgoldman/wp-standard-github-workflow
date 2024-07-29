import { useState } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';


export default function Edit({ attributes, setAttributes }) {
    const { eventId, countdownType } = attributes;

    const [events, setEvents] = useState([]);

    const EventSelectorEditWithSelect = withSelect((select) => {
        const { getEntityRecords } = select('core');
        return {
            events: getEntityRecords('postType', 'event'), 
        };
    })(({ events }) => {
        if (!events) {
            return 'Loading...';
        }

        setEvents(events); 

        return null; 
    });

    // Render block content
    const blockProps = useBlockProps();

    return (
        <>
            <EventSelectorEditWithSelect />
            <InspectorControls>
                <PanelBody title="Event Settings">
                    <SelectControl
                        label="Select Event"
                        value={eventId}
                        options={events.map((event) => ({
                            label: event.title.rendered,
                            value: event.id,
                        }))}
                        onChange={(value) => setAttributes({ eventId: value })}
                        help="Select an Event."
                    />
                    <SelectControl
                        label="Event Countdown Interval"
                        value={countdownType}
                        options={[
                            {label : "Days", value: "days" },
                            {label : "Hours", value: "hours" },
                            {label: "Minutes", value: "minutes" },
                            {label: "Seconds", value: "seconds" }
                        ]}
                        onChange={(newValue) => setAttributes( { countdownType: newValue } ) }
                        help="Please select the interval that you wish the countdown to go down by."
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
            <ServerSideRender
                    block="mag-blocks/event-countdown"
                    attributes={ attributes }
                />
            </div>
        </>
    );
}
