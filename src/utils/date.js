export function formatDate(num) {
    num = String(num);
    var singleDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (singleDigits.includes(num)) {
        num = "0" + num;
    }
    return num;
}