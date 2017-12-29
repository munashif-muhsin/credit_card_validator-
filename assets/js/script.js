document.getElementById('cardnumber').addEventListener('keydown', function(e) {

});

function finalCheck(number) {
    var evens = [],
        odds = [];
    for (var i = 0; i < number.length; i++) {
        if (i % 2 == 0) {
            var n = parseInt(number.substring(i, i + 1)) * 2;
            if (n.toString().length > 1) {
                n = n.toString();
                n = parseInt(n.substring(0, 1)) + parseInt(n.substring(1, 2));
            }
            evens.push(n);
        } else {
            odds.push(parseInt(number.substring(i, i + 1)));
        }
    }
    var sum = evens.reduce((a, b) => a + b, 0) + odds.reduce((a, b) => a + b, 0);
    if (sum % 10 == 0) {
        return "VALID";
    } else {
        return "INVALID";
    }
}


$(document).ready(function() {

    $('#cardnumber').on('keyup change', function() {
        var cardType;
        var cardStatus;
        if ($(this).val() == 0) { $(this).val(""); return; }
        if ($(this).val().length < 1) { return; }
        switch ($(this).val().substring(0, 1)) {
            case '4':
                cardType = "Visa";
                if ($(this).val().length > 16) {
                    cardStatus = "INVALID";
                } else if ($(this).val().length >= 13) {
                    cardStatus = "VALID";
                }
                break;
            case '2':
                cardType = "Mastercard";
                if ($(this).val().length == 16) {
                    cardStatus = "VALID";
                }
                break;
            case '5':
                cardType = "Mastercard";
                if ($(this).val().length == 16) {
                    cardStatus = "VALID";
                }
                break;
            case '3':
                if ($(this).val().substring(1, 2) != '4' && $(this).val().substring(1, 2) != '7') { cardType = "?"; break; }
                cardType = "American Express";
                if ($(this).val().length == 15) {
                    cardStatus = "VALID";
                }
                break;
            case '0':
                break;
            default:
                cardType = "?";
        }
        $('.validator-correct').removeClass("show-validator");
        $('.validator-wrong').removeClass("show-validator");
        if (cardStatus == "VALID") {
            cardStatus = finalCheck($(this).val());
        }
        switch (cardStatus) {
            case "INVALID":
                $('.validator-wrong').addClass("show-validator");
                break;
            case "VALID":
                $('.validator-correct').addClass("show-validator");
                break;
            default:
        }
        $('.validator-label').html(cardType);
    });

    $('#expiry-date').on('keyup change', function(e) {
      var code = e.keyCode;
      var allowedKeys = [8];
      if (allowedKeys.indexOf(code) !== -1) {return;}
      $(this).val(
        $(this).val().replace(
          /^([1-9]\/|[2-9])$/g, '0$1/'
        ).replace(
          /^(0[1-9]|1[0-2])$/g, '$1/'
        ).replace(
          /^([0-1])([3-9])$/g, '0$1/$2'
        ).replace(
          /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2'
        ).replace(
          /^([0]+)\/|[0]+$/g, '0'
        ).replace(
          /[^\d\/]|^[\/]*$/g, ''
        ).replace(
          /\/\//g, '/'
        )
      );
    });
});
