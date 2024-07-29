    var countdownElement = document.querySelector(".countdown");

    var countdownDate = new Date(countdownElement.dataset.date);
    var countdownType = countdownElement.dataset.type;

    var daysElement = countdownElement.querySelector(".countdown-days span");
    var hoursElement = countdownElement.querySelector(".countdown-hours span");
    var minutesElement = countdownElement.querySelector(".countdown-minutes span");
    var secondsElement = countdownElement.querySelector(".countdown-seconds span");

    var interval;
    switch (countdownType) {
        case "days":
            interval = 1000 * 60 * 60 * 24;
            break;
        case "hours":
            interval = 1000 * 60 * 60;
            break;
        case "minutes":
            interval = 1000 * 60;
            break;
        case "seconds":
            interval = 1000;
            break;
        default:
            interval = 1000;
    }

    setInterval(function() {
        var now = new Date();
        var timeDifference = countdownDate - now;

        if (timeDifference <= 0) {
            clearInterval(interval);
            if (daysElement) daysElement.textContent = "0";
            if (hoursElement) hoursElement.textContent = "0";
            if (minutesElement) minutesElement.textContent = "0";
            if (secondsElement) secondsElement.textContent = "0";
            return;
        }

        var remainingDays = Math.max(0, Math.floor(timeDifference / (1000 * 60 * 60 * 24)));
        var remainingHours = Math.max(0, Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        var remainingMinutes = Math.max(0, Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)));
        var remainingSeconds = Math.max(0, Math.floor((timeDifference % (1000 * 60)) / 1000));

        if (daysElement) daysElement.textContent = remainingDays;
        if (hoursElement) hoursElement.textContent = remainingHours;
        if (minutesElement) minutesElement.textContent = remainingMinutes;
        if (secondsElement) secondsElement.textContent = remainingSeconds;
    }, interval);

