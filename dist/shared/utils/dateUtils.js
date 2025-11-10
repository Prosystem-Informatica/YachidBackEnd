"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nowUTC = nowUTC;
exports.parseISO = parseISO;
exports.diffInDays = diffInDays;
exports.formatDateZ = formatDateZ;
const luxon_1 = require("luxon");
function nowUTC() {
    return luxon_1.DateTime.utc();
}
function parseISO(date) {
    return luxon_1.DateTime.fromISO(date, { zone: "utc" });
}
function diffInDays(start, end) {
    return end.diff(start, "days").days;
}
function formatDateZ(date) {
    return date.toUTC().toISO() ?? "";
}
