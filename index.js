function ajaxCall() {
    $.ajax({
        url : 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + $('#search').val(),
        dataType : 'jsonp',
        type : 'GET',
        success : function(data) {
            output(data.query.search, data.query.searchinfo.totalhits)
        }
    });
}

function showArticleOfTheDay() {
    $('#searchResults').empty();
    $('#search').empty();   
    $('iframe').attr('src', 'https://en.wikipedia.org/wiki/Special:Random');
}


function output(query, total) {
    $('#searchResults').append(
        `<div class="col-sm-12 col-lg-8 pt-2 text-center">
                ${total} Search Results
        </div>`
    );

    for(item in query) {
        $('#searchResults').append(
            `<div class="col-sm-12 col-lg-8 pt-4 box-shadow">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title pt-1">
                            <h2 class="main-title">
                                <a href="https://en.wikipedia.org/wiki/${query[item].title}" class="card-title-url" target="_blank"> ${query[item].title}</a>
                            </h2>
                        </div>
                        <div class="card-desc text-muted">${query[item].snippet}</div>
                    </div>
                </div>
            </div>`
        );
    }
}

$(document).ready(function() {
    $('#search').focus();
    $('#search').off('keyup');

    $('#search').on('keyup', function() {
        $('#searchResults').empty();
        ajaxCall();
        $('iframe').attr('src', '');
    });


    //Article of the day
    $('#articleBtn').on('click', function() {
        showArticleOfTheDay();
        $(this).text("Show Another Article Of The Day");
    });
});