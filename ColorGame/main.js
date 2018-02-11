function getRandomRGBElement() {
    var i,
        result = [];
    for (i = 3; i--;) {
        result.push(Math.ceil(Math.random() * 255));
    }

    return `rgb(${result.join(",")})`;
}

var lvls = {
    easy: {
        items: 3,
        rows: 1
    },
    hard: {
        items: 3,
        rows: 3
    }
};

var currentLvl = lvls.easy;

$("#easy-btn").on("click", () => {
    document.getElementById("color-wrapper").innerHTML = "";
    initItems(lvls.easy);
});

$("#hard-btn").on("click", () => {
    document.getElementById("color-wrapper").innerHTML = "";
    initItems(lvls.hard);
});

initGame();
initColors();
initItems(currentLvl);

$("#newColors").on("click", () => {
    initColors();
});

function initGame() {}

function initColors() {
    $(".flex-item").each((index, element) => {
        element.style.backgroundColor = getRandomRGBElement();
    });
}

function initItems(lvl) {
    var rows = getRows(lvl.rows);
    var rowContainer = document.getElementById("color-wrapper");

    rows.forEach(row => {
        var items = getItems(lvl.items);
        items.forEach((item, index) => {
            row.appendChild(item);
        });

        $(rowContainer).append(row);
    });
}

function getItems(itemsCount) {
    var items = [],
        i;

    for (i = itemsCount; i--;) {
        items.push(
            createElement({
                tag: "div",
                class: "flex-item",
                styles: {
                    "background-color": getRandomRGBElement()
                }
            })
        );
    }

    return items;
}

function getRows(rowCount) {
    var rows = [],
        i;
    for (i = rowCount; i--;) {
        rows.push(
            createElement({
                tag: "div",
                class: "flex-row"
            })
        );
    }

    return rows;
}

function createElement(props) {
    var element = document.createElement(props.tag);
    element.className = props.class;
    if (props.styles) stylizeElement(element, props.styles);
    return element;
}

function stylizeElement(element, styles) {
    Object.keys(styles).forEach(styleKey => {
        element.style[styleKey] = styles[styleKey];
    });
}