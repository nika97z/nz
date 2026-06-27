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



var TRAIN_KEY = 'train_start';

function updateTrainDays() {
    var current = parseInt(localStorage.getItem(TRAIN_KEY) || '0', 10);
    for (var i = 1; i <= 20; i++) {
        var el = document.querySelector('.t_day' + i);
        if (el) el.style.visibility = i <= current ? 'visible' : 'hidden';
    }
}

updateTrainDays();

var trainSnapshot = null;

var train_next = document.getElementById('trainforwardBtn');
if (train_next) train_next.addEventListener('click', function () {
    var current = parseInt(localStorage.getItem(TRAIN_KEY) || '0', 10);
    trainSnapshot = current + 1;
    localStorage.setItem(TRAIN_KEY, current + 1);
    localStorage.setItem('train_start_time', Date.now());
    if (trainSnapshot >= 20){
        localStorage.setItem('train_done', '1')
    } else {
        localStorage.removeItem('train_done')
    }
    updateTrainDays();
});
if (localStorage.getItem('train_done')) {
    var trainEl = document.getElementById('train');
    if (trainEl) trainEl.style.backgroundColor = '#15ac33';
}

var train_reset = document.getElementById('trainresetBtn');
if (train_reset) train_reset.addEventListener('click', function () {
    localStorage.removeItem(TRAIN_KEY);
    localStorage.removeItem('train_start_time');
    localStorage.removeItem('train_done')
    trainSnapshot = null;
    updateTrainDays();
});

function checktrain() {
    var train_start_time = localStorage.getItem('train_start_time');
    if (!train_start_time) return;
    var elapsed = Date.now() - parseInt(train_start_time, 10);
    if (elapsed >= 144000000) {
        var current = parseInt(localStorage.getItem(TRAIN_KEY) || '0', 10);
        if (current === trainSnapshot) {
            var newValue = Math.max(0, current - 2);
            localStorage.setItem(TRAIN_KEY, newValue);
            updateTrainDays();
            trainSnapshot = newValue;
            localStorage.setItem('train_start_time', Date.now());
        } else {
            localStorage.removeItem('train_start_time');
            trainSnapshot = null;
        }
    }
}

setInterval(checktrain, 100000);



var STEP_KEY = 'step_start';

function updateStepDays() {
    var current = parseInt(localStorage.getItem(STEP_KEY) || '0', 10);
    for (var i = 1; i <= 50; i++) {
        var el = document.querySelector('.s_day' + i);
        if (el) el.style.visibility = i <= current ? 'visible' : 'hidden';
    }
}

updateStepDays();

var stepSnapshot = null;

var step_next = document.getElementById('stepforwardBtn');
if (step_next) step_next.addEventListener('click', function () {
    var current = parseInt(localStorage.getItem(STEP_KEY) || '0', 10);
    stepSnapshot = current + 1;
    localStorage.setItem(STEP_KEY, current + 1);
    localStorage.setItem('step_start_time', Date.now());
    if (stepSnapshot >= 50) {
        localStorage.setItem('step_done', '1');
    } else {
        localStorage.removeItem('step_done');
    }
    updateStepDays();
});

var step_reset = document.getElementById('stepresetBtn');
if (step_reset) step_reset.addEventListener('click', function () {
    localStorage.removeItem(STEP_KEY);
    localStorage.removeItem('step_start_time');
    localStorage.removeItem('step_done');
    stepSnapshot = null;
    updateStepDays();
});
if (localStorage.getItem('step_done')) {
    var stepEl = document.getElementById('step');
    if (stepEl) stepEl.style.backgroundColor = '#15ac33';
}

function checkstep() {
    var step_start_time = localStorage.getItem('step_start_time');
    if (!step_start_time) return;
    var elapsed = Date.now() - parseInt(step_start_time, 10);
    if (elapsed >= 144000000) {
        var current = parseInt(localStorage.getItem(STEP_KEY) || '0', 10);
        if (current === stepSnapshot) {
            var newValue = Math.max(0, current - 2);
            localStorage.setItem(STEP_KEY, newValue);
            updateStepDays();
            stepSnapshot = newValue;
            localStorage.setItem('step_start_time', Date.now());
        } else {
            localStorage.removeItem('step_start_time');
            stepSnapshot = null;
        }
    }
}

setInterval(checkstep, 100000);



var COSTUMER_KEY = 'costumer_start';

function updateCostumerDays() {
    var current = parseInt(localStorage.getItem(COSTUMER_KEY) || '0', 10);
    for (var i = 1; i <= 50; i++) {
        var el = document.querySelector('.c_day' + i);
        if (el) el.style.visibility = i <= current ? 'visible' : 'hidden';
    }
}

updateCostumerDays();

var costumerSnapshot = null;

var costumer_next = document.getElementById('costumerforwardBtn');
if (costumer_next) costumer_next.addEventListener('click', function () {
    var current = parseInt(localStorage.getItem(COSTUMER_KEY) || '0', 10);
    costumerSnapshot = current + 1;
    localStorage.setItem(COSTUMER_KEY, current + 1);
    localStorage.setItem('costumer_start_time', Date.now());
    if (costumerSnapshot >= 50) {
        localStorage.setItem('costumer_done', '1');
    } else {
        localStorage.removeItem('costumer_done');
    }
    updateCostumerDays();
});

var costumer_reset = document.getElementById('costumerresetBtn');
if (costumer_reset) costumer_reset.addEventListener('click', function () {
    localStorage.removeItem(COSTUMER_KEY);
    localStorage.removeItem('costumer_start_time');
    localStorage.removeItem('costumer_done');
    costumerSnapshot = null;
    updateCostumerDays();
});
if (localStorage.getItem('costumer_done')) {
    var costumerEl = document.getElementById('costumer');
    if (costumerEl) costumerEl.style.backgroundColor = '#15ac33';
}

function checkcostumer() {
    var costumer_start_time = localStorage.getItem('costumer_start_time');
    if (!costumer_start_time) return;
    var elapsed = Date.now() - parseInt(costumer_start_time, 10);
    if (elapsed >= 144000000) {
        var current = parseInt(localStorage.getItem(COSTUMER_KEY) || '0', 10);
        if (current === costumerSnapshot) {
            var newValue = Math.max(0, current - 2);
            localStorage.setItem(COSTUMER_KEY, newValue);
            updateCostumerDays();
            costumerSnapshot = newValue;
            localStorage.setItem('costumer_start_time', Date.now());
        } else {
            localStorage.removeItem('costumer_start_time');
            costumerSnapshot = null;
        }
    }
}

setInterval(checkcostumer, 100000);



var VIDEO_KEY = 'video_start';

function updateVideoDays() {
    var current = parseInt(localStorage.getItem(VIDEO_KEY) || '0', 10);
    for (var i = 1; i <= 50; i++) {
        var el = document.querySelector('.v_day' + i);
        if (el) el.style.visibility = i <= current ? 'visible' : 'hidden';
    }
}

updateVideoDays();

var videoSnapshot = null;

var video_next = document.getElementById('videoforwardBtn');
if (video_next) video_next.addEventListener('click', function () {
    var current = parseInt(localStorage.getItem(VIDEO_KEY) || '0', 10);
    videoSnapshot = current + 1;
    localStorage.setItem(VIDEO_KEY, current + 1);
    localStorage.setItem('video_start_time', Date.now());
    if (videoSnapshot >= 50) {
        localStorage.setItem('video_done', '1');
    } else {
        localStorage.removeItem('video_done');
    }
    updateVideoDays();
});

var video_reset = document.getElementById('videoresetBtn');
if (video_reset) video_reset.addEventListener('click', function () {
    localStorage.removeItem(VIDEO_KEY);
    localStorage.removeItem('video_start_time');
    localStorage.removeItem('video_done');
    videoSnapshot = null;
    updateVideoDays();
});
if (localStorage.getItem('video_done')) {
    var videoEl = document.getElementById('video');
    if (videoEl) videoEl.style.backgroundColor = '#15ac33';
}

function checkvideo() {
    var video_start_time = localStorage.getItem('video_start_time');
    if (!video_start_time) return;
    var elapsed = Date.now() - parseInt(video_start_time, 10);
    if (elapsed >= 144000000) {
        var current = parseInt(localStorage.getItem(VIDEO_KEY) || '0', 10);
        if (current === videoSnapshot) {
            var newValue = Math.max(0, current - 2);
            localStorage.setItem(VIDEO_KEY, newValue);
            updateVideoDays();
            videoSnapshot = newValue;
            localStorage.setItem('video_start_time', Date.now());
        } else {
            localStorage.removeItem('video_start_time');
            videoSnapshot = null;
        }
    }
}

setInterval(checkvideo, 100000);