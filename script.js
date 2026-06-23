(function () {
    var KEY = 'nz_start_time';
    var startTime;

    function init() {
        startTime = localStorage.getItem(KEY);
        if (!startTime) {
            startTime = Date.now();
            localStorage.setItem(KEY, startTime);
        } else {
            startTime = parseInt(startTime, 10);
        }
    }

    function updateLevels() {
        var elapsed = Math.floor((Date.now() - startTime) / 1000);
        var visible = elapsed + 1;
        for (var i = 1; i <= 70; i++) {
            var el = document.querySelector('.level' + i);
            if (el) el.style.visibility = i <= visible ? 'visible' : 'hidden';
        }
    }

    init();
    updateLevels();
    setInterval(updateLevels, 1000);

    document.getElementById('resetBtn').addEventListener('click', function () {
        localStorage.removeItem(KEY);
        init();
        updateLevels();
    });
})();