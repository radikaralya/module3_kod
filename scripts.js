const startBtn = document.getElementById("startBtn");
const cameraScreen = document.getElementById("cameraScreen");
const bgMusic = document.getElementById("bgMusic");

const cameraHelpBtn = document.getElementById("helpBtn");
const cameraHelpModal = document.getElementById("cameraHelpModal");
const cameraHelpBackdrop = document.getElementById("cameraHelpBackdrop");

const cameraStage = document.getElementById("cameraStage");
const cameraFeedImage = document.getElementById("cameraFeedImage");
const cameraRoomLabel = document.getElementById("cameraRoomLabel");
const cameraAnomaly = document.getElementById("cameraAnomaly");
const signalValue = document.getElementById("signalValue");
const cameraTimeValue = document.getElementById("cameraTimeValue");
const screamer = document.getElementById("screamer");
const mapButtons = Array.from(document.querySelectorAll(".camera-map-button"));

const faceHelpBtn = document.getElementById("faceHelpBtn");
const faceHelpModal = document.getElementById("faceHelpModal");
const faceHelpBackdrop = document.getElementById("faceHelpBackdrop");
const faceLeft = document.getElementById("faceLeft");
const faceRight = document.getElementById("faceRight");
const faceLeftImage = document.getElementById("faceLeftImage");
const faceRightImage = document.getElementById("faceRightImage");
const faceStepTitle = document.getElementById("faceStepTitle");
const faceStepIndicators = Array.from(document.querySelectorAll(".face-step-indicator"));
const faceTestFinish = document.getElementById("faceTestFinish");
const archiveButtons = Array.from(document.querySelectorAll(".iceberg-archive-button"));
const icebergLevels = Array.from(document.querySelectorAll(".iceberg-level"));
const diaryDates = Array.from(document.querySelectorAll(".diary-date"));
const diaryEntryPanel = document.getElementById("diaryEntryPanel");
const diaryEntryDate = document.getElementById("diaryEntryDate");
const diaryEntryText = document.getElementById("diaryEntryText");
const diaryScreamer = document.getElementById("diaryScreamer");
const systemError = document.getElementById("systemError");
const systemErrorBox = systemError?.querySelector(".system-error-box");
const photobotScreen = document.getElementById("photobotScreen");
const photobotFrame = document.getElementById("photobotFrame");
const photobotCells = Array.from(document.querySelectorAll(".photobot-cell"));
const photobotControls = Array.from(document.querySelectorAll(".photobot-control"));
const photobotPieces = Array.from(document.querySelectorAll(".photobot-piece"));

let musicUnlocked = false;

const cameras = {
    cam1: {
        gif: "images/вид1.gif",
        anomaly: "images/1sc-Photoroom 2.svg",
        movement: "horizontal",
        room: "Кухня",
        time: "02:14",
        size: 0.18
    },
    cam2: {
        gif: "images/вид2.gif",
        anomaly: "images/2sc-Photoroom 2.svg",
        movement: "vertical",
        room: "Гостиная",
        time: "01:38",
        size: 0.17
    },
    cam3: {
        gif: "images/вид3.gif",
        anomaly: "images/3sc-Photoroom 1.svg",
        movement: "diagonal",
        room: "Зал",
        time: "03:07",
        size: 0.155
    },
    cam4: {
        gif: "images/вид4.gif",
        anomaly: "images/4sc-Photoroom 1.svg",
        movement: "random",
        room: "Подвал",
        time: "00:49",
        size: 0.16
    }
};

const cameraState = {
    activeCamera: "cam1",
    signal: 0,
    completedCameras: {
        cam1: false,
        cam2: false,
        cam3: false,
        cam4: false
    },
    isScreamerActive: false
};

const faceSteps = [
    {
        id: 1,
        leftImage: "images/3экр пацан1.svg",
        rightImage: "images/3экр пацан2.svg",
        correct: "right"
    },
    {
        id: 2,
        leftImage: "images/3экр пацан3.svg",
        rightImage: "images/3экр пацан4.svg",
        correct: "right"
    },
    {
        id: 3,
        leftImage: "images/3экр пацан5.svg",
        rightImage: "images/3экр пацан6.svg",
        correct: "right"
    }
];

const faceState = {
    currentStep: 0,
    isFinished: false
};

const icebergState = {
    levels: {
        1: false,
        2: false,
        3: false,
        4: false
    }
};

const icebergContent = {
    1: {
        text: "Slumber — это безопасно. Ты просто закрыл глаза, чтобы сохраниться или переждать ночь."
    },
    2: {
        text: "Curse ломает твоё снаряжение, но хуже другое — прокляты не вещи, а сам файл сохранения. Ты чувствуешь, что удача покинула тебя не в игре, а в реальной жизни."
    },
    3: {
        text: "Possession забирает управление. Ты смотришь, как твои руки сами идут к краю обрыва. Ты кричишь, но персонаж улыбается. Он наконец-то свободен."
    },
    4: {
        text: "Этого слова нет в словарях. White Jives — это когда из-под кожи твоего персонажа начинает проступать не его настоящая текстура, а та, первая, которая была у ещё не родившегося человека в утробе."
    }
};

const diaryEntries = {
    "02.04.2007": {
        text: "СИСТЕМА ЗАПУЩЕНА\n\nВСЕ КАМЕРЫ ███████\nСИГНАЛ █████ НОРМЕ\n\nНИЧЕГО НЕ ОБЫЧНОГО"
    },
    "01.04.2008": {
        text: "ЗАМЕЧЕНА ЗАДЕРЖКА\n\nКАМЕРА 3 ███████\nДВИЖЕНИЕ ███ НЕТ\n\nВОЗМОЖЕН СБОЙ"
    },
    "27.04.2008": {
        text: "ФИКСАЦИЯ ОБЪЕКТА\n\nФИГУРА ███████\nСТОИТ В █████\n\nНЕ ДВИГАЕТСЯ"
    },
    "01.07.2008": {
        text: "ПРОВЕРКА КАМЕР\n\nВСЕ АКТИВНЫ ███\nКРОМЕ ███████\n\nСИГНАЛ ИСКАЖЁН"
    },
    "14.08.2008": {
        text: "ЗАПИСЬ ПОВРЕЖДЕНА\n\n████████████████\n██ СМОТРИТ ████\n████████████████\n\nНЕ УДАЛОСЬ ВОССТАНОВИТЬ"
    },
    "06.03.2009": {
        text: "СЕГОДНЯ КАМЕРА █████\n\nФИГУРА СТОЯЛА\nВ УГЛУ КОМНАТЫ\n\nОНА ███████ НА КАМЕРУ"
    },
    "01.05.2009": {
        text: "СИГНАЛ ПРОПАДАЕТ\n\nКАМЕРА ███████\nПЕРЕДАЁТ █████\n\nЗВУК ████ НЕ ЗАПИСАН"
    },
    "15.05.2009": {
        text: "Я СНОВА ВИЖУ █████\n\nЭТО НЕ ███████\n\nКАЖЕТСЯ ОНО █████\nЖДЁТ ███████"
    },
    "01.06.2009": {
        text: "ОНО ДВИГАЕТСЯ\n\nКАЖДАЯ КАМЕРА ███\nПОКАЗЫВАЕТ █████\n\nЭТО █████ НЕ ОШИБКА"
    },
    "15.06.2009": {
        initialText: "Я ДУМАЮ,\nЧТО АНОМАЛИИ МОГУТ\nВИДЕТЬ НАБЛЮДАТЕЛЯ.",
        glitchedText: "Я ДУМАЮ,\nЧТО АНОМАЛИИ МОГУТ\nВИДЕТЬ ТЕБЯ."
    }
};

const diaryState = {
    activeDate: null,
    isGlitching: false,
    isScreamerActive: false,
    isSystemErrorVisible: false,
    hasTriggeredFinalSequence: false
};

const anomalyMotion = {
    frameId: 0,
    spawnTimeoutId: 0,
    isVisible: false,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    vx: 0,
    vy: 0,
    randomTurnAt: 0
};

let screamerTimeoutId = 0;
let diaryTimers = [];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const openModal = (modal) => {
    if (!modal) {
        return;
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
};

const closeModal = (modal) => {
    if (!modal) {
        return;
    }

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
};

const clearDiaryTimers = () => {
    diaryTimers.forEach((timerId) => {
        clearTimeout(timerId);
    });
    diaryTimers = [];
};

const setDiaryText = (text) => {
    diaryEntryText.innerHTML = text
        .replace(/█+/g, (mask) => `<span class="diary-mask" style="width:${Math.max(mask.length * 1.55, 4.8)}vw"></span>`)
        .replace(/\n/g, "<br>");
};

const photobotState = {
    selectedCell: null,
    grid: [3, 1, 4, 2],
    correct: [1, 2, 3, 4],
    isCompleted: false,
    isGlitching: false,
    isFinalFaceShown: false
};

let photobotTimers = [];

const photobotNormalPositions = {
    1: "0% 0%",
    2: "100% 0%",
    3: "0% 100%",
    4: "100% 100%"
};

const photobotFinalPositions = {
    1: "0% 0%",
    2: "100% 0%",
    3: "0% 100%",
    4: "100% 100%"
};

const clearPhotobotTimers = () => {
    photobotTimers.forEach((timerId) => window.clearTimeout(timerId));
    photobotTimers = [];
};

const renderPhotobot = () => {
    photobotPieces.forEach((piece, index) => {
        const partId = photobotState.isFinalFaceShown ? photobotState.correct[index] : photobotState.grid[index];

        if (photobotState.isFinalFaceShown) {
            piece.style.backgroundImage = 'url("images/лицо2.svg")';
            piece.style.backgroundSize = "200% 200%";
            piece.style.backgroundPosition = photobotFinalPositions[partId];
        } else {
            piece.style.backgroundImage = 'url("images/лцо1.svg")';
            piece.style.backgroundSize = "200% 200%";
            piece.style.backgroundPosition = photobotNormalPositions[partId];
        }
    });

    photobotCells.forEach((cell, index) => {
        cell.classList.toggle("selected", photobotState.selectedCell === index && !photobotState.isCompleted);
    });

    if (photobotScreen) {
        photobotScreen.classList.toggle("completed", photobotState.isCompleted);
    }

    if (photobotFrame) {
        photobotFrame.classList.toggle("glitching", photobotState.isGlitching);
    }
};

const getPhotobotNeighbor = (index, direction) => {
    const row = Math.floor(index / 2);
    const col = index % 2;

    if (direction === "up" && row > 0) {
        return index - 2;
    }

    if (direction === "down" && row < 1) {
        return index + 2;
    }

    if (direction === "left" && col > 0) {
        return index - 1;
    }

    if (direction === "right" && col < 1) {
        return index + 1;
    }

    return null;
};

const triggerPhotobotFinal = () => {
    if (photobotState.isCompleted) {
        return;
    }

    photobotState.isCompleted = true;
    photobotState.selectedCell = null;
    renderPhotobot();

    photobotTimers.push(window.setTimeout(() => {
        photobotState.isGlitching = true;
        renderPhotobot();
    }, 320));

    photobotTimers.push(window.setTimeout(() => {
        photobotState.isFinalFaceShown = true;
        renderPhotobot();
    }, 780));
};

const tryMovePhotobot = (direction) => {
    if (photobotState.isCompleted || photobotState.selectedCell === null) {
        return;
    }

    const neighbor = getPhotobotNeighbor(photobotState.selectedCell, direction);

    if (neighbor === null) {
        return;
    }

    const currentIndex = photobotState.selectedCell;
    [photobotState.grid[currentIndex], photobotState.grid[neighbor]] = [photobotState.grid[neighbor], photobotState.grid[currentIndex]];
    photobotState.selectedCell = neighbor;
    renderPhotobot();

    if (photobotState.grid.every((value, index) => value === photobotState.correct[index])) {
        triggerPhotobotFinal();
    }
};

const goToSecondScreen = () => {
    if (!cameraScreen) {
        return;
    }

    cameraScreen.scrollIntoView({ behavior: "smooth", block: "start" });
};

const tryStartMusic = () => {
    if (!bgMusic || musicUnlocked) {
        return;
    }

    bgMusic.volume = 0.35;

    const playAttempt = bgMusic.play();

    if (playAttempt && typeof playAttempt.then === "function") {
        playAttempt
            .then(() => {
                musicUnlocked = true;
            })
            .catch(() => {
                musicUnlocked = false;
            });
        return;
    }

    musicUnlocked = true;
};

const unlockMusicOnInteraction = () => {
    if (musicUnlocked) {
        return;
    }

    tryStartMusic();
};

const setMapState = () => {
    mapButtons.forEach((button) => {
        const cameraId = button.dataset.camera;
        const isActive = cameraId === cameraState.activeCamera;
        const isCompleted = cameraState.completedCameras[cameraId];

        button.classList.toggle("active", isActive);
        button.classList.toggle("completed", isCompleted);
    });
};

const updateSignal = () => {
    signalValue.textContent = `${cameraState.signal}%`;
};

const stopAnomalyMotion = () => {
    if (anomalyMotion.frameId) {
        cancelAnimationFrame(anomalyMotion.frameId);
        anomalyMotion.frameId = 0;
    }

    if (anomalyMotion.spawnTimeoutId) {
        clearTimeout(anomalyMotion.spawnTimeoutId);
        anomalyMotion.spawnTimeoutId = 0;
    }

    anomalyMotion.isVisible = false;
    cameraAnomaly.classList.remove("visible");
};

const getStageMetrics = () => {
    const stageWidth = cameraStage.clientWidth;
    const stageHeight = cameraStage.clientHeight;
    const activeConfig = cameras[cameraState.activeCamera];
    const anomalyWidth = stageWidth * activeConfig.size;
    const anomalyHeight = anomalyWidth;
    const maxX = Math.max(stageWidth - anomalyWidth, 0);
    const maxY = Math.max(stageHeight - anomalyHeight, 0);

    return {
        stageWidth,
        stageHeight,
        anomalyWidth,
        anomalyHeight,
        maxX,
        maxY
    };
};

const getCam4Bounds = (metrics) => {
    return {
        minX: 0,
        maxX: Math.max(metrics.stageWidth * 0.62 - metrics.anomalyWidth, 0),
        minY: 0,
        maxY: Math.max(metrics.stageHeight - metrics.anomalyHeight, 0)
    };
};

const applyAnomalyPosition = () => {
    cameraAnomaly.style.left = `${anomalyMotion.x}px`;
    cameraAnomaly.style.top = `${anomalyMotion.y}px`;
};

const tickAnomaly = () => {
    if (!anomalyMotion.isVisible || cameraState.isScreamerActive) {
        return;
    }

    const activeConfig = cameras[cameraState.activeCamera];
    const metrics = getStageMetrics();

    anomalyMotion.width = metrics.anomalyWidth;
    anomalyMotion.height = metrics.anomalyHeight;
    cameraAnomaly.style.width = `${metrics.anomalyWidth}px`;

    if (activeConfig.movement === "horizontal") {
        anomalyMotion.x += anomalyMotion.vx;

        if (anomalyMotion.x <= 0 || anomalyMotion.x >= metrics.maxX) {
            anomalyMotion.vx *= -1;
            anomalyMotion.x = clamp(anomalyMotion.x, 0, metrics.maxX);
        }
    }

    if (activeConfig.movement === "vertical") {
        anomalyMotion.y += anomalyMotion.vy;

        if (anomalyMotion.y <= 0 || anomalyMotion.y >= metrics.maxY) {
            anomalyMotion.vy *= -1;
            anomalyMotion.y = clamp(anomalyMotion.y, 0, metrics.maxY);
        }
    }

    if (activeConfig.movement === "diagonal") {
        anomalyMotion.x += anomalyMotion.vx;
        anomalyMotion.y += anomalyMotion.vy;

        if (anomalyMotion.x <= 0 || anomalyMotion.x >= metrics.maxX) {
            anomalyMotion.vx *= -1;
            anomalyMotion.x = clamp(anomalyMotion.x, 0, metrics.maxX);
        }

        if (anomalyMotion.y <= 0 || anomalyMotion.y >= metrics.maxY) {
            anomalyMotion.vy *= -1;
            anomalyMotion.y = clamp(anomalyMotion.y, 0, metrics.maxY);
        }
    }

    if (activeConfig.movement === "random") {
        const bounds = getCam4Bounds(metrics);
        const now = performance.now();

        if (now >= anomalyMotion.randomTurnAt) {
            anomalyMotion.vx = (Math.random() * 1.1 + 0.35) * (Math.random() > 0.5 ? 1 : -1);
            anomalyMotion.vy = (Math.random() * 1.1 + 0.35) * (Math.random() > 0.5 ? 1 : -1);
            anomalyMotion.randomTurnAt = now + 450 + Math.random() * 700;
        }

        anomalyMotion.x += anomalyMotion.vx;
        anomalyMotion.y += anomalyMotion.vy;

        if (anomalyMotion.x <= bounds.minX || anomalyMotion.x >= bounds.maxX) {
            anomalyMotion.vx *= -1;
            anomalyMotion.x = clamp(anomalyMotion.x, bounds.minX, bounds.maxX);
        }

        if (anomalyMotion.y <= bounds.minY || anomalyMotion.y >= bounds.maxY) {
            anomalyMotion.vy *= -1;
            anomalyMotion.y = clamp(anomalyMotion.y, bounds.minY, bounds.maxY);
        }
    }

    applyAnomalyPosition();
    anomalyMotion.frameId = requestAnimationFrame(tickAnomaly);
};

const spawnAnomaly = () => {
    if (cameraState.completedCameras[cameraState.activeCamera] || cameraState.isScreamerActive) {
        return;
    }

    const activeConfig = cameras[cameraState.activeCamera];
    const metrics = getStageMetrics();

    cameraAnomaly.src = activeConfig.anomaly;
    cameraAnomaly.style.width = `${metrics.anomalyWidth}px`;

    anomalyMotion.width = metrics.anomalyWidth;
    anomalyMotion.height = metrics.anomalyHeight;
    anomalyMotion.isVisible = true;
    cameraAnomaly.classList.add("visible");

    if (activeConfig.movement === "horizontal") {
        anomalyMotion.x = metrics.stageWidth * 0.08;
        anomalyMotion.y = clamp(metrics.stageHeight * 0.48, 0, metrics.maxY);
        anomalyMotion.vx = Math.max(metrics.stageWidth * 0.0034, 1.6);
        anomalyMotion.vy = 0;
    }

    if (activeConfig.movement === "vertical") {
        anomalyMotion.x = clamp(metrics.stageWidth * 0.68, 0, metrics.maxX);
        anomalyMotion.y = metrics.stageHeight * 0.14;
        anomalyMotion.vx = 0;
        anomalyMotion.vy = Math.max(metrics.stageHeight * 0.0032, 1.5);
    }

    if (activeConfig.movement === "diagonal") {
        anomalyMotion.x = metrics.stageWidth * 0.2;
        anomalyMotion.y = metrics.stageHeight * 0.2;
        anomalyMotion.vx = Math.max(metrics.stageWidth * 0.0027, 1.3);
        anomalyMotion.vy = Math.max(metrics.stageHeight * 0.0029, 1.3);
    }

    if (activeConfig.movement === "random") {
        const bounds = getCam4Bounds(metrics);

        anomalyMotion.x = clamp(metrics.stageWidth * 0.28, bounds.minX, bounds.maxX);
        anomalyMotion.y = clamp(metrics.stageHeight * 0.54, bounds.minY, bounds.maxY);
        anomalyMotion.vx = Math.max(metrics.stageWidth * 0.0025, 1.2);
        anomalyMotion.vy = Math.max(metrics.stageHeight * 0.0025, 1.2);
        anomalyMotion.randomTurnAt = performance.now() + 500;
    }

    applyAnomalyPosition();
    tickAnomaly();
};

const scheduleAnomaly = () => {
    stopAnomalyMotion();

    if (cameraState.completedCameras[cameraState.activeCamera] || cameraState.isScreamerActive) {
        return;
    }

    anomalyMotion.spawnTimeoutId = window.setTimeout(
        spawnAnomaly,
        2000 + Math.random() * 1000
    );
};

const updateCamera = () => {
    const activeConfig = cameras[cameraState.activeCamera];

    cameraFeedImage.src = activeConfig.gif;
    cameraFeedImage.alt = `Камера ${activeConfig.room}`;
    cameraRoomLabel.textContent = activeConfig.room;
    cameraTimeValue.textContent = activeConfig.time;
    setMapState();
    scheduleAnomaly();
};

const activateScreamer = () => {
    cameraState.isScreamerActive = true;
    stopAnomalyMotion();
    screamer.classList.add("active");
    screamer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (screamerTimeoutId) {
        clearTimeout(screamerTimeoutId);
    }

    screamerTimeoutId = window.setTimeout(() => {
        cameraState.isScreamerActive = false;
        screamer.classList.remove("active");
        screamer.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }, 1500);
};

const handleAnomalyClick = () => {
    const currentCamera = cameraState.activeCamera;

    if (!anomalyMotion.isVisible || cameraState.completedCameras[currentCamera]) {
        return;
    }

    cameraState.completedCameras[currentCamera] = true;
    cameraState.signal = Math.min(cameraState.signal + 25, 100);
    updateSignal();
    setMapState();
    stopAnomalyMotion();

    if (cameraState.signal === 100) {
        activateScreamer();
    }
};

const handleCameraSwitch = (cameraId) => {
    if (!cameraId || cameraId === cameraState.activeCamera || cameraState.isScreamerActive) {
        return;
    }

    cameraState.activeCamera = cameraId;
    updateCamera();
};

const renderFaceStep = () => {
    const step = faceSteps[faceState.currentStep];
    const stepNumber = String(step.id).padStart(2, "0");

    faceLeftImage.src = step.leftImage;
    faceRightImage.src = step.rightImage;
    faceStepTitle.textContent = `ШАГ ${stepNumber}`;
    faceLeft.classList.remove("wrong");
    faceRight.classList.remove("wrong");

    faceStepIndicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === faceState.currentStep);
    });
};

const finishFaceTest = () => {
    faceState.isFinished = true;
    faceLeft.disabled = true;
    faceRight.disabled = true;
    faceTestFinish.classList.add("active");
    faceTestFinish.setAttribute("aria-hidden", "false");
};

const handleFaceChoice = (side) => {
    if (faceState.isFinished) {
        return;
    }

    const step = faceSteps[faceState.currentStep];
    const clickedButton = side === "left" ? faceLeft : faceRight;

    if (step.correct !== side) {
        clickedButton.classList.add("wrong");
        window.setTimeout(() => {
            clickedButton.classList.remove("wrong");
        }, 220);
        return;
    }

    if (faceState.currentStep === faceSteps.length - 1) {
        finishFaceTest();
        return;
    }

    faceState.currentStep += 1;
    renderFaceStep();
};

const openIcebergLevel = (levelId) => {
    const level = document.querySelector(`.iceberg-level[data-level="${levelId}"]`);
    const textNode = document.getElementById(`icebergText${levelId}`);

    if (!level || !textNode || icebergState.levels[levelId]) {
        return;
    }

    textNode.textContent = icebergContent[levelId].text;
    level.classList.add("open");
    icebergState.levels[levelId] = true;
};

const showDiaryError = () => {
    diaryState.isSystemErrorVisible = true;
    systemError.classList.add("active");
    systemError.setAttribute("aria-hidden", "false");
};

const hideDiaryError = () => {
    diaryState.isSystemErrorVisible = false;
    systemError.classList.remove("active");
    systemError.setAttribute("aria-hidden", "true");
};

const showDiaryScreamer = () => {
    diaryState.isScreamerActive = true;
    diaryScreamer.classList.add("active");
    diaryScreamer.setAttribute("aria-hidden", "false");

    diaryTimers.push(window.setTimeout(() => {
        diaryState.isScreamerActive = false;
        diaryScreamer.classList.remove("active");
        diaryScreamer.setAttribute("aria-hidden", "true");
        showDiaryError();
    }, 1100));
};

const triggerDiaryFinalSequence = () => {
    if (diaryState.hasTriggeredFinalSequence) {
        return;
    }

    diaryState.hasTriggeredFinalSequence = true;
    diaryState.isGlitching = false;
    diaryEntryPanel.classList.remove("glitching");

    diaryTimers.push(window.setTimeout(() => {
        diaryState.isGlitching = true;
        diaryEntryPanel.classList.add("glitching");
    }, 1400));

    diaryTimers.push(window.setTimeout(() => {
        diaryEntryDate.textContent = "15.06.2009";
        setDiaryText(diaryEntries["15.06.2009"].glitchedText);
    }, 2850));

    diaryTimers.push(window.setTimeout(() => {
        showDiaryScreamer();
    }, 4100));
};

const renderDiaryEntry = (date) => {
    const entry = diaryEntries[date];

    if (!entry) {
        return;
    }

    clearDiaryTimers();
    diaryEntryPanel.classList.remove("glitching");

    if (date !== "15.06.2009") {
        diaryState.hasTriggeredFinalSequence = false;
        diaryState.isGlitching = false;
        diaryState.isScreamerActive = false;
        diaryState.isSystemErrorVisible = false;
        diaryScreamer.classList.remove("active");
        diaryScreamer.setAttribute("aria-hidden", "true");
        hideDiaryError();
    }

    diaryEntryDate.textContent = date;
    setDiaryText(entry.text || entry.initialText);
    diaryEntryPanel.classList.remove("diary-entry-panel-hidden");

    diaryDates.forEach((button) => {
        button.classList.toggle("active", button.dataset.date === date);
    });

    diaryState.activeDate = date;

    if (date === "15.06.2009") {
        triggerDiaryFinalSequence();
    }
};

if (startBtn && cameraScreen) {
    startBtn.addEventListener("click", goToSecondScreen);
    startBtn.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            goToSecondScreen();
        }
    });
}

["pointerdown", "touchstart", "keydown"].forEach((eventName) => {
    window.addEventListener(eventName, unlockMusicOnInteraction, { passive: true });
});

if (cameraHelpBtn && cameraHelpModal && cameraHelpBackdrop) {
    cameraHelpBtn.addEventListener("click", () => {
        openModal(cameraHelpModal);
    });

    cameraHelpBackdrop.addEventListener("click", (event) => {
        if (event.target === cameraHelpBackdrop) {
            closeModal(cameraHelpModal);
        }
    });
}

if (faceHelpBtn && faceHelpModal && faceHelpBackdrop) {
    faceHelpBtn.addEventListener("click", () => {
        openModal(faceHelpModal);
    });

    faceHelpBackdrop.addEventListener("click", (event) => {
        if (event.target === faceHelpBackdrop) {
            closeModal(faceHelpModal);
        }
    });
}

mapButtons.forEach((button) => {
    button.addEventListener("click", () => {
        handleCameraSwitch(button.dataset.camera);
    });
});

cameraAnomaly.addEventListener("click", handleAnomalyClick);

if (faceLeft && faceRight) {
    faceLeft.addEventListener("click", () => {
        handleFaceChoice("left");
    });

    faceRight.addEventListener("click", () => {
        handleFaceChoice("right");
    });
}

archiveButtons.forEach((button) => {
    button.addEventListener("click", () => {
        openIcebergLevel(button.dataset.archive);
    });
});

diaryDates.forEach((button) => {
    button.addEventListener("click", () => {
        renderDiaryEntry(button.dataset.date);
    });
});

photobotCells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (photobotState.isCompleted) {
            return;
        }

        photobotState.selectedCell = Number(cell.dataset.index);
        renderPhotobot();
    });
});

photobotControls.forEach((button) => {
    button.addEventListener("click", () => {
        tryMovePhotobot(button.dataset.direction);
    });
});

if (systemError) {
    systemError.addEventListener("click", (event) => {
        if (event.target === systemError) {
            hideDiaryError();
        }
    });
}

if (systemErrorBox) {
    systemErrorBox.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}

window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
        return;
    }

    closeModal(cameraHelpModal);
    closeModal(faceHelpModal);
});

window.addEventListener("resize", () => {
    if (anomalyMotion.isVisible) {
        const metrics = getStageMetrics();
        anomalyMotion.x = clamp(anomalyMotion.x, 0, metrics.maxX);
        anomalyMotion.y = clamp(anomalyMotion.y, 0, metrics.maxY);
        cameraAnomaly.style.width = `${metrics.anomalyWidth}px`;
        applyAnomalyPosition();
    }
});

updateSignal();
updateCamera();
renderFaceStep();
renderPhotobot();
tryStartMusic();
