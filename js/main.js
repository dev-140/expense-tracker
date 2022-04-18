$(document).ready(function() {
    for (var i = 0; i < localStorage.length; i++) {
        var data = localStorage.getItem(localStorage.key(i));
        total = [0];
        var txt = data;
        var str = txt;
        var desc = str.replace(/[0-9]/g, '');
        var numb = txt.match(/\d/g);
        var numb = numb.join("");
        $('.datas').append('<div class="render">' + desc + '<p>₱ ' + numb + ' </p> <span class="removeExp" data-id="'+desc+'">x</span> </div>');
        $('.renderTotalExp').append('<p class="price '+desc+'" data-num="'+ numb +'"data-d="'+ desc +'">'+ numb +'</p>');
        var $numbers = $('.renderTotalExp p');
        var sum = 0;
        var income = window.localStorage.getItem('income');
        $numbers.each(function() {
            sum += parseInt($(this).data('num'));
        });
        var incomeSubTotal = parseInt(income) - parseInt(income) - parseInt(income) + parseInt(sum);

        $('.expense-container .dataExpense').text('₱ ' + incomeSubTotal);
        $('#total').text('YOUR TOTAL EXPENSE IS: ₱ ' + incomeSubTotal);
    }

    //bottom nav functions
    $('.bottom-nav .expense.btn , .close-add').on('click' , (e) => {
        $('.input-data').toggleClass('active');
        $('.background, .fixed').toggleClass('expense');
        $('.account-balance .text').toggleClass('active');
        $('.expense-container').toggleClass('active');
        $('.total').toggleClass('active');
    });

    $('.bottom-nav .income.btn , .close-add-income').on('click' , (e) => {
        $('.input-data-income').toggleClass('active');
        $('.background, .fixed').toggleClass('income');
        $('.income-container').toggleClass('active');
        $('.account-balance .text').toggleClass('active');
        $('.total').toggleClass('active');
    });

    //income function
    $.fn.dataExpense = function() {
        var income = window.localStorage.getItem('income');
        $('.data-income-handler').text(income);

        $('.renderTotalExp .price').each(function(e) {
            if($(this).text() === income) {
                // $(this).remove();
                $(this).addClass('income');
            }
        });

        $('.datas .render p').each(function(e) {
            if($(this).text() === '₱ ' + income + ' ') {
                // $(this).remove();
                $(this).parent().addClass('income');
            }
        });

        $('.render.income, .renderTotalExp .price.income').remove();
    }

    $.fn.dataExpense();

    var status = true;

    $.fn.filter = function() {
        var words = $('.desc').val();
        var str = $('.datas .render').text();
        var x = str.replace(/[0-9, x,₱]/g, ' ');
        // var result = x.match(wordss);

        if(x.match(words)) {
            // $('.input-data .warning').slideDown();
            status = true;
        }else{
            // $('.input-data .warning').slideUp();
            status = false;
        }

    }

    setInterval(function () {
        $.fn.filter();         
    },);

    $('.addBtn').on('click', (e) => {
        var value = $('.value').val();
        var desc = $('.desc').val();
        var renderText = desc + value; 
        var subTotal = $('#total').text();
        var numb = subTotal.match(/\d/g);
        var numb = numb.join("");
        var total = parseInt(numb) + parseInt(value); 

        if(status === true){
            $('.warning').text('This word is already used!');
        }else{
            localStorage.setItem(desc,renderText);
            $('.warning').text('');
            $('.desc').val('');
            $('.value').val('');
            $('.datas').append('<div class="render">' + desc + '<p> ₱' + value + ' </p> <span class="removeExp" data-id="'+desc+'">x</span> </div>');

            var $numbers = $('.renderTotalExp p');
            var sum = 0;
            var income = window.localStorage.getItem('income');
            $numbers.each(function() {
                sum += parseInt($(this).data('num'));
            });

            var incomeSubTotal = parseInt(income) - parseInt(income) - parseInt(income) + parseInt(sum);
            var incomeTotal = parseInt(income) - parseInt(sum);
            var expTotal = sum;
            
            $('.renderTotalExp').append('<p class="price '+desc+'" data-num="'+ value +'"data-d="'+desc+'">'+ value +'</p>');
            $('.income-container .dataIncome').text('₱ ' + incomeTotal);

            setTimeout(function() {
                var $numbers = $('.renderTotalExp p');
                var sum = 0;
                var income = window.localStorage.getItem('income');
                $numbers.each(function() {
                    sum += parseInt($(this).data('num'));
                });

                $('.expense-container .dataExpense').text('₱ ' + sum);
                $('#total').text('YOUR TOTAL EXPENSE IS: ₱ ' + sum);
            }, 1);

            $('.minus-animation').text('-' + value);
            $('.minus-animation').addClass('active');
            setTimeout(function() { 
                $('.minus-animation').removeClass('active');
            }, 1000);
        }
    });

    // remove functions 
    setInterval(function () {
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
    
            $this.parent().addClass('removed');
            setTimeout(function(){
                $this.parent().addClass('up');
                $this.parent().remove();
            }, 500);
            $('.' + value ).remove();
            window.localStorage.removeItem(value);
        });
    },);

    $('.addBtn-income').on('click', (e) => {
        var value = $('.input-data-income .value-input').val();

        $('.data-income-handler').text(value);
        $('.input-data-income .value-input').val('');
        localStorage.setItem('income', value);
    });

    setInterval(function () {
        var $numbers = $('.renderTotalExp p');
        var sum = 0;
        var income = window.localStorage.getItem('income');
        $numbers.each(function() {
            sum += parseInt($(this).data('num'));
        });
        var incomeSubTotal = parseInt(income) - parseInt(sum);

        $('.account-balance .total-bal').text('₱ ' + incomeSubTotal);
        $('.expense-container .dataExpense').text('₱ ' + sum);
        $('#total').text('YOUR TOTAL EXPENSE IS: ₱ ' + sum);
        $('.income-container .dataIncome').text('₱ ' + income);

        if($('.account-balance .total-bal').text() === '₱ NaN'){
            $('.account-balance .total-bal').text('Add income');
        }else{
            $('.account-balance .total-bal').text('₱ ' + incomeSubTotal);
        }
    },);

    //checker function
    setInterval(function () {
        if($('.input-data .desc').val() === ('')){
            $('.addBtn').hide();
            $('.addBtn-disable').show();
        }else if($('.input-data .value').val() === ('')){
            $('.addBtn').hide();
            $('.addBtn-disable').show();
        } else {
            $('.addBtn').show();
            $('.addBtn-disable').hide();
        }

        if($('.input-data-income .value-input').val() === '') {
            $('.addBtn-income').hide();
            $('.addBtn-income-disable').show();
        }else{
            $('.addBtn-income').show();
            $('.addBtn-income-disable').hide();
        }
    },);

    //summary function 
    $('.summary.view').on('click', (e)=> {
        var Xpense = $('.dataExpense').text();
        var Income = $('.dataIncome').text();
        var totalXpense = Xpense.match(/\d/g);
        totalXpense = totalXpense.join("");
        var totalIncome = Income.match(/\d/g);
        totalIncome = totalIncome.join("");
        const result = Math.round((parseInt(totalXpense) / parseInt(totalIncome)) * 100)
        
        $('.datas').toggleClass('active');
        $('.account-balance').toggleClass('active');
        
        if ($('.datas').hasClass('active')) {
            $('.render').hide(500);
            setTimeout(function(){
                $('.percent').css('width', result + 'px');
            }, 500);
            $('.btn.summary').html('<i class="fa-solid fa-xmark"></i> Close');
            $('.data-summary').addClass('active');
        } else {
            $('.render').show(500);
            $('.percent').css('width', 0 + 'px');
            $('.btn.summary').html('<i class="fa-solid fa-receipt"></i> Summary');
            $('.data-summary').removeClass('active');
        }
    });

});

// setInterval(function () {
// },);