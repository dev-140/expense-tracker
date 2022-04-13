$(document).ready(function() {
    $('.addBtn').on('click', (e) => {
        var value = $('.value').val();
        var desc = $('.desc').val();
        var renderText = desc + value; 
        var subTotal = $('#total').text();
        var numb = subTotal.match(/\d/g);
        var numb = numb.join("");
        var total = parseInt(numb) + parseInt(value);

        localStorage.setItem(desc,renderText);
        $('.expense-container .dataExpense').text('₱ ' + total);
        $('.desc').val('');
        $('.value').val('');
        $('.datas').append('<div class="render">' + desc + '<p>' + value + ' </p> <span class="removeExp" data-id="'+desc+'">x</span> </div>');
    });

    $('.addBtn-income').on('click', (e) => {
        var value = $('.input-data-income .value-input').val();

        $('.data-income-handler').text(value);
        $('.input-data-income .value-input').val('');
        localStorage.setItem('income', value);
    });

    for (var i = 0; i < localStorage.length; i++) {
        var data = localStorage.getItem(localStorage.key(i));
        total = [0];
        var txt = data;
        var str = txt;
        var desc = str.replace(/[0-9]/g, '');
        var numb = txt.match(/\d/g);
        var numb = numb.join("");
        $('.datas').append('<div class="render">' + desc + '<p>₱ ' + numb + ' </p> <span class="removeExp" data-id="'+desc+'">x</span> </div>');
        $('.renderTotalExp').append('<p class="price '+desc+'" data-num="'+ numb +'">'+ numb +'</p>');
        console.log(desc);
        var $numbers = $('.renderTotalExp p');
        var sum = 0;

        $numbers.each(function() {
        sum += parseInt($(this).data('num'));
        });

        $('.expense-container .dataExpense').text('₱ ' + sum);
        $('#total').text('YOUR TOTAL EXPENSE IS: ₱ ' + sum);

        console.log(sum);
    }



    // remove functions
    $('.removeExp').on('click', (e) => {
        var $this = $(e.currentTarget);
        var value = $this.data('id');
        var exp = $this.parent().children().text();
        var numbExp = exp.match(/\d/g);
        var numbExp = numbExp.join("");
        var subTotal = $('#total').text();
        var numbTotal = subTotal.match(/\d/g);
        var numbTotal = numbTotal.join("");
        var total = parseInt(numbTotal) - parseInt(numbExp); 

        $this.parent().remove();
        $('.' + value ).remove();
        $('#total').text('YOUR TOTAL EXPENSE IS: ₱ ' + total)
        window.localStorage.removeItem(value);
    });

    //bottom nav functions
    $('.bottom-nav .expense.btn , .close-add').on('click' , (e) => {
        $('.input-data').toggleClass('active');
        $('.background').toggleClass('expense');
        $('.expense-container').toggleClass('active');
    });

    $('.bottom-nav .income.btn , .close-add-income').on('click' , (e) => {
        $('.input-data-income').toggleClass('active');
        $('.background').toggleClass('income');
        $('.income-container').toggleClass('active');
        $('.expense-container').toggleClass('null');
    });

    //income function
    var income = window.localStorage.getItem('income');
    var x = $('.renderTotalExp .price').text();
    $('.data-income-handler').text(income);

    $.fn.income = (e) => {
        var $this = $(e.currentTarget);
        $this.addClass('active');
        console.log('hello')
    }

    if(x === income) {
        $.fn.income();
    }
});


