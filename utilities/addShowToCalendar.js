export default function addShowToCalendar(show) {
    const { venue, location, date, time } = show;
    const showDate = new Date(date);
    const showTime = time.split(":");
    showDate.setHours(showTime[0], showTime[1]);

    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(venue)}&dates=${showDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${new Date(showDate.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, "").split(".")[0]}Z&details=Location%3A%20${encodeURIComponent(location)}`;

    window.open(calendarUrl, "_blank");
}
