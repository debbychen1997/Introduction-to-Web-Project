let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");
let selectDate = document.getElementById("date");
let Textmonth = $("#inputText").val();
let Textdate = $("#inputText1").val();
let Textyear = $("#inputText2").val();
let Textevent = document.createTextNode($("#inputText3").val());

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);
function getEvent() {
    let event = ['3', '9', '2020', 'Web design'];
    return event;
}
function isEvent(month, date, year) {
    let events = getEvent();
    if (events[0] == month && events[1] == date && events[2] == year) {
        return true;
    }
}
function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}
function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}
function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    getcurrDate(currentMonth, currentYear);
    showCalendar(currentMonth, currentYear);
    
   
}
function getcurrDate(month, year) {
  
    let date_sel = document.getElementById("date");
    date_sel.innerHTML = "";
    for (let i = 1; i <= 32 - new Date(year, month, 32).getDate(); i++) {
        let opt = document.createElement("option");
        let opt_txt = document.createTextNode(i);
        opt.appendChild(opt_txt);
        opt.setAttribute("value", i);
        opt.setAttribute("text", opt_txt);
        date_sel.appendChild(opt);
    }
   
}
function showCalendar(month, year) {
    
    let firstDay = (new Date(year, month)).getDay();
    let cal_tbl = document.getElementById("calendar-body");
    let dateInMonth = 32 - new Date(year, month, 32).getDate();
    cal_tbl.innerHTML = "";
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    let date = 1;


    for (let row = 0; row < 6; row++) {
        let createRow = document.createElement("tr");
        for (let col = 0; col < 7; col++) {
            let cell = document.createElement("td");
            if (row == 0 && col < firstDay) {
                let TextNode = document.createTextNode(" ");
                cell.appendChild(TextNode);

                createRow.appendChild(cell);
            }
            else if (date > dateInMonth) {
                break;
            }
            else {
                let TextNode = document.createTextNode(date);
                let input = document.createElement("INPUT");

                cell.appendChild(TextNode);
                if (isEvent(month + 1, col + row * 7 - firstDay + 1, year)) {
                    let event = getEvent();
                    let TextNodeEvent = document.createTextNode(event[3]);
                    let TextNodeBreak = document.createTextNode("\n");
                    cell.appendChild(TextNodeBreak);
                    cell.appendChild(TextNodeEvent);
                }
                $(document).ready(function () {

                    $("#inputText3").keypress(function (event) {

                        var keycode = (event.keyCode ? event.keyCode : event.which);
                        if (keycode == '13') {
                            Textmonth = $("#inputText").val();
                            Textdate = $("#inputText1").val();
                            Textyear = $("#inputText2").val();
                            Textevent = document.createTextNode($("#inputText3").val());
                        }
                    });
                    if ((month + 1 == Textmonth) && ((col + row * 7 - firstDay + 1) == Textdate) && (year == Textyear)) {
                        let TextNodeBreak = document.createTextNode("\n");
                        cell.appendChild(TextNodeBreak);
                        cell.appendChild(Textevent);

                    }


                });
                //need to learn how to store the data

                if (date == today.getDate() && month == today.getMonth() && year == today.getFullYear()) {
                    cell.classList.add("bg-info");
                }
                createRow.appendChild(cell);
                date++;
            }

        }

        cal_tbl.appendChild(createRow);
    }


}// JavaScript source code
