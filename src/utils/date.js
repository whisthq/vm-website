export function formatDate(num) {
    num = String(num);
    var singleDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (singleDigits.includes(num)) {
        num = "0" + num;
    }
    return num;
}

export function monthConvert(month) {
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    var selectedMonthName = months[month];
    return selectedMonthName;
};

export function unixToDate(unix) {
    const milliseconds = unix * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject
        .toLocaleString("en-US")
        .split(",")[0];
    var dateArr = humanDateFormat.split("/");
    const month = this.monthConvert(dateArr[0] - 1);
    var finalDate =
        month + " " + dateArr[1].toString() + ", " + dateArr[2].toString();
    return finalDate;
};