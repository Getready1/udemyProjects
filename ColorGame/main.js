function getRandomRGBElement() {
    var i,
        result = [];
    for (i = 3; i--;) {
        result.push(Math.ceil(Math.random() * 255));
    }

    return `rgb(${result.join(",")})`;
}

$(".color").each((index, element) => {
    element.style.backgroundColor = getRandomRGBElement();
});