$(document).ready(function () {
    // Уникальный ключ для каждой страницы
    const pageKey = window.location.pathname;

    // Инициализация draggable для героев
    $(".hero").draggable({
        stop: function (event, ui) {
            saveHeroPosition($(this));
        }
    });

    // Загружаем позиции героев при загрузке страницы
    loadHeroPositions();

    function saveHeroPosition($hero) {
        const heroIndex = $(".hero").index($hero);
        const positions = JSON.parse(localStorage.getItem(pageKey)) || {};
        positions[heroIndex] = {
            top: $hero.css("top"),
            left: $hero.css("left")
        };
        localStorage.setItem(pageKey, JSON.stringify(positions));
    }

    function loadHeroPositions() {
        const positions = JSON.parse(localStorage.getItem(pageKey));
        if (positions) {
            $(".hero").each(function (index) {
                if (positions[index]) {
                    $(this).css({
                        top: positions[index].top,
                        left: positions[index].left
                    });
                }
            });
        }
    }

    // Скрытие теней при клике и сохранение их состояния
    $('.shadow').click(function () {
        const shadowIndex = $(".shadow").index($(this));
        const hiddenShadows = JSON.parse(localStorage.getItem(`${pageKey}-hiddenShadows`)) || [];
        if (!hiddenShadows.includes(shadowIndex)) {
            hiddenShadows.push(shadowIndex);
            localStorage.setItem(`${pageKey}-hiddenShadows`, JSON.stringify(hiddenShadows));
        }
        $(this).fadeOut(700);
    });

    // Загрузка состояния скрытых теней
    loadShadowStates();

    function loadShadowStates() {
        const hiddenShadows = JSON.parse(localStorage.getItem(`${pageKey}-hiddenShadows`)) || [];
        $(".shadow").each(function (index) {
            if (hiddenShadows.includes(index)) {
                $(this).hide();
            }
        });
    }
    function resetAllChanges() {
        localStorage.clear(); // Удаляем все сохраненные данные
        location.reload(); // Перезагружаем страницу
    }
    $("#reset-btn").click(function () {
        resetAllChanges();
    });
});