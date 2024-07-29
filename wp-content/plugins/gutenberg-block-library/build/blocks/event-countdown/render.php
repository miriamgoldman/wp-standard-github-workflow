<?php
if ( $attributes['eventId'] ) :
    $event_id   = $attributes['eventId'];
    $event_date = get_field( 'event_date', $event_id );
    $now = time();
    $event_timestamp = strtotime($event_date);
    $difference = $event_timestamp - $now;

    $days = floor($difference / (60 * 60 * 24));
    $hours = floor(($difference % (60 * 60 * 24)) / (60 * 60));
    $minutes = floor(($difference % (60 * 60)) / 60);
    $seconds = $difference % 60;
endif;
if ( $attributes['countdownType'] ) :
    $countdown_type = $attributes['countdownType'];
endif;
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
<?php if ( $event_id ) : ?>
    <h2><?php echo esc_html( get_the_title( $event_id ) ); ?></h2>
<div class="countdown" data-date="<?php echo esc_attr( $event_date ); ?>" data-type="<?php echo esc_attr( $countdown_type ); ?>">
    <div class="countdown-days"><span><?php echo esc_html( $days ); ?></span>Days</div>
    <div class="countdown-hours"><span><?php echo esc_html( $hours ); ?></span>Hours</div>
    <div class="countdown-minutes"><span><?php echo esc_html( $minutes ); ?></span>Minutes</div>
    <div class="countdown-seconds"><span><?php echo esc_html( $seconds ); ?></span>Seconds</div>
</div>
<?php endif; ?>
</div>