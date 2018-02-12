function getRandomRGBElement() {
    var i,
        result = [];
    for (i = 3; i--;) {
        result.push(Math.ceil(Math.random() * 255));
    }

    return `rgb(${result.join(",")})`;
}

var game = buildGame();

function start() {
    game.init();
}

$("#newColors").on("click", () => {
    game.helper.changeItemsColor();
    $(".one").text(game.getRGB());
});

$("#easy-btn").on("click", function () {
    if (this.classList.contains("active")) return;

    document.getElementById("color-wrapper").innerHTML = "";
    game.level.setDifficulty("easy");
    game.itemsBuilder.renderElements();
    game.menu.setActiveMode();

    ggg();
});

$("#hard-btn").on("click", function () {
    if (this.classList.contains("active")) return;

    document.getElementById("color-wrapper").innerHTML = "";
    game.level.setDifficulty("hard");
    game.itemsBuilder.renderElements();
    game.menu.setActiveMode();
    ggg();
});

function buildGame() {
    var modes = {
        easy: {
            items: 3,
            rows: 1,
            name: "easy"
        },
        hard: {
            items: 3,
            rows: 3,
            name: "hard"
        }
    };

    var difficulty;
    var randomItemRGB;

    function getRandomItemsRGB() {
        var items = $(".flex-item");
        var count = items.length;
        var randomElementIndex = Math.ceil(Math.random() * count) - 1;
        return items[randomElementIndex].style.backgroundColor;
    }

    var helper = {
        createElement(props) {
            var element = document.createElement(props.tag);
            element.className = props.class;
            if (props.styles) this.stylizeElement(element, props.styles);
            return element;
        },
        stylizeElement(element, styles) {
            Object.keys(styles).forEach(styleKey => {
                element.style[styleKey] = styles[styleKey];
            });
        },
        changeItemsColor() {
            $(".flex-item").each((index, element) => {
                element.style.backgroundColor = getRandomRGBElement();
                randomItemRGB = getRandomItemsRGB();
                $(".one").text(game.getRGB());
            });
        }
    };

    var itemsBuilder = {
        createItems(itemsCount) {
            var items = [],
                i;

            for (i = itemsCount; i--;) {
                items.push(
                    helper.createElement({
                        tag: "div",
                        class: "flex-item",
                        styles: {
                            "background-color": getRandomRGBElement()
                        }
                    })
                );
            }

            return items;
        },
        createRows(rowCount) {
            var rows = [],
                i;
            for (i = rowCount; i--;) {
                rows.push(
                    helper.createElement({
                        tag: "div",
                        class: "flex-row"
                    })
                );
            }

            return rows;
        },
        renderElements() {
            var rowContainer = document.getElementById("color-wrapper");
            this.createRows(difficulty.rows).forEach(row => {
                this.createItems(difficulty.items).forEach((item, index) => {
                    row.appendChild(item);
                });

                $(rowContainer).append(row);
            });
        }
    };

    return {
        init() {
            this.level.setDifficulty(modes.easy);
            itemsBuilder.renderElements();
            this.menu.setActiveMode();
            randomItemRGB = getRandomItemsRGB();
        },
        level: {
            setDifficulty(mode) {
                difficulty = modes[mode] || modes.easy;
            },
            getDifficulty() {
                return difficulty || modes.easy;
            }
        },
        itemsBuilder,
        helper,
        menu: {
            setActiveMode() {
                $(".modes").removeClass("active");
                $(`#${difficulty.name}-btn`).addClass("active");
            }
        },
        getRGB() {
            return randomItemRGB || "Failed to get rgb.";
        }
    };
}

start();

$(".one").text(game.getRGB());

function ggg() {
    $(".flex-item").on("click", function () {
        if (this.style.backgroundColor === game.getRGB()) {
            alert("You are fucking right!");
            var response = confirm("Play again?");

            response ? game.helper.changeItemsColor() : alert("Fuck you");
        } else {
            alert("Wrong!");
            var response = confirm("Play again?");

            response ? game.helper.changeItemsColor() : alert("Fuck you");
        }
    });
}

ggg();