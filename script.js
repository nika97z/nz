(function () {
    var KEY = 'nz_start_time';
    var startTime;
    var TKAY = 'tday-start-time';
    var tdayStartTime;
    var XDAY = 'xday-start-time';
    var xdayStartTime;
    function init() {
        startTime = localStorage.getItem(KEY);
        tdayStartTime = localStorage.getItem(TKAY);
        xdayStartTime = localStorage.getItem(XDAY);
        if (!startTime) {
            startTime = Date.now();
            localStorage.setItem(KEY, startTime);
        } else {
            startTime = parseInt(startTime, 10);
        }
        if (!tdayStartTime) {
            tdayStartTime = Date.now();
            localStorage.setItem(TKAY, tdayStartTime);
        } else {
            tdayStartTime = parseInt(tdayStartTime, 10);
        }
        if (!xdayStartTime) {
            xdayStartTime = Date.now();
            localStorage.setItem(XDAY, xdayStartTime);
        } else {
            xdayStartTime = parseInt(xdayStartTime, 10);
        }
    }

    function updateLevels() {
        var elapsed = Math.floor((Date.now() - startTime) / 3600000);
        var tdayElapsed = Math.floor((Date.now() - tdayStartTime) / 86400000);
        var xdayElapsed = Math.floor((Date.now() - xdayStartTime) / 86400000);

        var visible = elapsed + 1;
        for (var i = 1; i <= 70; i++) {
            var el = document.querySelector('.level' + i);
            if (el) el.style.visibility = i <= visible ? 'visible' : 'hidden';
        }

        var tdayVisible = tdayElapsed;
        for (var j = 1; j <= 30; j++) {
            var tdayEl = document.querySelector('.day' + j);
            if (tdayEl) tdayEl.style.visibility = j <= tdayVisible ? 'visible' : 'hidden';
        }

        var xdayVisible = xdayElapsed;
        for (var k = 1; k <= 20; k++) {
            var xdayEl = document.querySelector('.x_day' + k);
            if (xdayEl) xdayEl.style.visibility = k <= xdayVisible ? 'visible' : 'hidden';
        }

        if (xdayVisible >= 20) {
            localStorage.setItem('nz_xday_done', '1');
        } else{
            localStorage.removeItem('nz_xday_done');
        }

        if (tdayVisible >= 30) {
            localStorage.setItem('nz_30days_done', '1');
        } else {
            localStorage.removeItem('nz_30days_done');
        }

        if (visible >= 70) {
            localStorage.setItem('nz_70hours_done', '1');
        } else {
            localStorage.removeItem('nz_70hours_done');
        }
    }

    init();
    updateLevels();
    setInterval(updateLevels, 3600000);
    var resetBtn = document.getElementById('resetBtn');
    if (resetBtn) resetBtn.addEventListener('click', function () {
        localStorage.removeItem(KEY);
        init();
        updateLevels();
    });

    var tdayResetBtn = document.getElementById('tdayresetBtn');
    if (tdayResetBtn) tdayResetBtn.addEventListener('click', function () {
        localStorage.removeItem(TKAY);
        init();
        updateLevels();
    });

    var xdayResetBtn = document.getElementById('xdayresetBtn');
    if (xdayResetBtn) xdayResetBtn.addEventListener('click', function () {
        localStorage.removeItem(XDAY);
        init();
        updateLevels();
    });
})();

if (localStorage.getItem('nz_30days_done')) {
        document.getElementById('30').style.backgroundColor = '#15ac33';
    }
if (localStorage.getItem('nz_70hours_done')) {
        document.getElementById('70').style.backgroundColor = '#15ac33';
    }
if (localStorage.getItem('nz_xday_done')) {
        document.getElementById('20').style.backgroundColor = '#15ac33';
    }