$(document).ready(() => {
    $("#counter").val(0);
    var $player1 = $("#player1");
    var $player2 = $("#player2");
    var $reset = $("#reset");
    var limit = 0;

    var $num1 = $("#num1");
    var $num2 = $("#num2");

    var counter1 = 0;
    var counter2 = 0;

    $(num1).text(counter1);
    $(num2).text(counter2);

    $reset.click(() => reset());

    $player1.on("click", () => {
        if (counter1 === limit) return;

        ++counter1 === limit && $num1.addClass("textGreen");
        $num1.text(counter1);
    });

    $player2.on("click", () => {
        if (counter2 === limit) return;

        ++counter2 === limit && $num2.addClass("textGreen");

        $num2.text(counter2);
    });

    $("#counter").change(function() {
        $(".badge").text(this.value);
        limit = +this.value;
    });

    function reset() {
        $(".nums").each((index, num) => {
            $(num)
                .text(0)
                .removeClass("textGreen");
        });

        counter1 = counter2 = limit = 0;
        $("#counter").val(0);
        $(".badge").text(0);
    }
});