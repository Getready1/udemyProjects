$(document).ready(() => {
    var $player1 = $("#player1");
    var $player2 = $("#player2");

    var $num1 = $("#num1");
    var $num2 = $("#num2");

    var counter1 = 0;
    var counter2 = 0;

    $(num1).text(counter1);
    $(num2).text(counter2);

    $player1.on("click", () => {
        counter1++;
        $(num1).text(counter1);
    });

    $player2.on("click", () => {
        counter2++;
        $(num2).text(counter2);
    });
});