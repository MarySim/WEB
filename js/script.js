$(document).ready(function () {
    $('#hamburger-btn').on('click', function () {
        $('#main-nav').slideToggle(300);
    });

    $('.nav-link, #openModalBtn').on('click', function () {
        if ($(window).width() <= 767) {$('#main-nav').slideUp(300);
        }
    });

    $(window).resize(function() {
        if ($(window).width() > 767) {
            $('#main-nav').css('display', ''); 
        } else {
            if (!$('#main-nav').is(':visible')) {
                $('#main-nav').hide();
            }
        }
    });

    $('a.nav-link').on('click', function (e) {
        if (this.hash !== "") {
            e.preventDefault();
            let hash = this.hash;
            $('html, body').animate({ scrollTop:$(hash).offset().top - 80 }, 800);
        }
    });

    $(window).on('scroll', function () {
        let scrollPos = $(document).scrollTop() + 100;
        $('nav a.nav-link').each(function () {
            let currLink = $(this);
            let refElement = $(currLink.attr('href'));
            if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('nav a.nav-link').removeClass('active');
                currLink.addClass('active');
            }
        });
    });

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {$('#scrollTopBtn').fadeIn();
        } else {
            $('#scrollTopBtn').fadeOut();
        }
    });

    $('#scrollTopBtn').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    $('#openModalBtn').on('click', function () {
        $('#contactModal').fadeIn(300);
    });

    $('.close-btn, .modal').on('click', function (e) {
        if (e.target === this) {
            $('#contactModal').fadeOut(300);
            $('#formResponse').hide();
        }
    });

    $('#feedbackForm').on('submit', function (e) {
        e.preventDefault();
        
        let name = $('#name').val().trim();
        let email = $('#email').val().trim();
        let message = $('#message').val().trim();

        if (name === "" || email === "" || message === "") {
            alert("Пожалуйста, заполните все обязательные поля.");
            return;
        }

        let $btn = $(this).find('.submit-btn');$btn.text('Отправка...').prop('disabled', true);

        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'POST',
            data: { name: name, email: email, message: message },
            success: function () {
                $('#formResponse').text('Сообщение успешно отправлено!').css('color', '#785873').slideDown();
                $('#feedbackForm')[0].reset();
            },
            error: function () {
                $('#formResponse').text('Произошла ошибка при отправке.').css('color', 'red').slideDown();
            },
            complete: function () {
                $btn.text('Отправить форму').prop('disabled', false);
            }
        });
    });

    $.getJSON('data/portfolio.json', function (data) {
        let $container =$('#portfolio-container');
        
        $.each(data, function (index, project) {
            let cardHTML = `
                <article class="portfolio-card" style="display:none;">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank" class="project-link">GitHub репозиторий →</a>
                </article>
            `;
            $container.append(cardHTML);
        });

        $('.portfolio-card').each(function(i) {$(this).delay(200 * i).fadeIn(500);
        });

        function moveNext() {
            let firstCard = $('.portfolio-card').first();
            firstCard.fadeOut(200, function() {
                firstCard.appendTo('#portfolio-container').fadeIn(200);
            });
        }

        function movePrev() {
            let lastCard = $('.portfolio-card').last();
            lastCard.fadeOut(200, function() {
                lastCard.prependTo('#portfolio-container').fadeIn(200);
            });
        }

        $('.next-btn').on('click', moveNext);
        $('.prev-btn').on('click', movePrev);

    }).fail(function() {
        console.error("Не удалось загрузить данные из portfolio.json. Проверьте правильность пути или запустите проект через Live Server.");
    });
});