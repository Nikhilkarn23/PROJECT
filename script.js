class tableRow {
    constructor(startDate, endDate, monthYear, dateExclued, numberDays, leadCount, expectedDrr, lastUpdated) {
        this.startDate = startDate
        this.endDate = endDate
        this.monthYear = monthYear
        this.dateExclued = dateExclued
        this.numberDays = numberDays
        this.leadCount = leadCount
        this.expectedDrr = expectedDrr
        this.lastUpdated = lastUpdated
    }
}
// let table = document.getElementById("data")


let dataRow = new Array
function monthDiff(dateFrom, dateTo) {
    let monthNum = dateTo.getMonth() - dateFrom.getMonth() +
        (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
    let yearNum = getYearDiff(dateFrom, dateTo);
    if (yearNum == 0) {
        return monthNum;
    } else {
        return (monthNum - yearNum * 12) + "," + yearNum
    }
}

function getYearDiff(date1, date2) {
    let year = Math.abs(date2.getFullYear() - date1.getFullYear());
    let monthGap = date2.getMonth() - date1.getMonth();
    if (monthGap < 0) {
        return year - 1;
    } else {
        return year;
    }
}
let output = document.getElementById('output');
function clearAllInputs(event) {
    var allInputs = document.querySelectorAll('input');
    allInputs.forEach(singleInput => singleInput.value = '');
}
function addNewRow() {
    let startDate = new Date(document.getElementById("Start-date").value)
    // let startDate = new Date()
    // startValue.addEventListener("input", event => {
    //     startDate = new Date(event.target.value);
    // });
    let endDate = new Date(document.getElementById("End-date").value)
    let dateExcluded = document.getElementById("demo-mobile-picker-input").value
    let expectedDrrInput = document.getElementById("Expected-drr")
    let lastUpdated = document.getElementById("last-upadted")
    let leadCount = document.getElementById("Lead-number").value
    if (!checkEntitiesPresent(startDate,endDate,leadCount)){
        alert (" please make sure all fields are satisfied")
        retrun;
    }
    if (!checkDateExcluded(startDate, endDate, dateExcluded)) {

        return;
    };
    let numberOfExclusion = dateExcluded.split(",").length;
    var diffInTime = endDate.getTime() - startDate.getTime();
    let diffInDays = (diffInTime / (1000 * 3600 * 24)) - numberOfExclusion
    let month = monthDiff(startDate, endDate)
    let year = getYearDiff(startDate, endDate)
    let expectedDrr = getExpectedDrr(leadCount, diffInDays)
    if (endDate < startDate) {
        alert("please select the end date ahead of start date")
        return;
    }
    let newRow = new tableRow(convertDate(startDate), convertDate(endDate), month, dateExcluded, diffInDays, leadCount, expectedDrr, convertDate(new Date(Date.now())))
    dataRow.push(newRow)
    renderNewRow(dataRow.slice(-1))

}

function checkDateExcluded(startDate, endDate, dateExcluded) {
    let dateArray = dateExcluded.split(",")
    let shoudReturn = true;
    dateArray.forEach(date => {
        if (process(date) < startDate || process(date) > endDate) {
            alert("please select date Excluded between start and end date")
            shoudReturn = false;
            return;
        }
    })
    if (shoudReturn) {
        return true;
    } else {
        return false;
    }

}
function getExpectedDrr(leadCount, diffInDays) {
    let drr = leadCount / diffInDays;
    return (Math.round(drr * 100) / 100).toFixed(2);
}

function renderNewRow(lastElement) {

    let table = document.getElementById('data').getElementsByTagName('tbody')[0]
    lastElement.forEach(i => {
        let row = table.insertRow()
        // table.insertRow(row)
        let action = document.createElement("td")
        let id = document.createElement("td")
        id.innerHTML = dataRow.length
        action.innerHTML = 'N/A'
        row.appendChild(action)
        row.appendChild(id)
        for (key in i) {
            let cell = document.createElement("td")
            cell.innerHTML = i[key]
            row.appendChild(cell)
        }
        // table.appendChild(row)

    })


}

function process(date) {
    let parts = date.split("/");
    date = new Date(parts[0] + "/" + parts[1] + "/" + parts[2]);
    return date;
}

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}

mobiscroll.setOptions({
    theme: 'ios',
    themeVariant: 'light'
});


mobiscroll.datepicker('#demo-mobile-picker-input', {
    controls: ['calendar'],
    selectMultiple: true
});


function checkEntitiesPresent(startDate, endDate, leadCount){
    if (!isValidDate(startDate)  || !isValidDate(endDate)  || leadCount == ""){
        return false;
    }
    return true;
}
function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}


