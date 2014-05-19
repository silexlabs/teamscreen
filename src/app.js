(function($scope) {
    $scope.App = function(){
        this.loadData($scope.Config.dataUrl);
    };
    $scope.App.prototype.loadData = function(url){
        $.getJSON(url, function(data) {
            var urls = data.urls;
            // iframes
            for (idx in urls){
                var url = urls[idx];
                $('body').append('<iframe class="page" src="'+url+'" />');
                console.log('add browser ', name);
            }
            $scope.nextPage();
        }).fail(function(_, message) {
                console.error( "error", message );
        });
    };
    $scope.nextPage = function(){
        console.log('nextPage');
        // refresh previous iframe

        var iframe = $('.current-page').first();
        iframe.attr('src', iframe.attr('src'));

        $('.current-page').removeClass('current-page').next('.page').addClass('current-page');
        if (document.getElementsByClassName('current-page').length === 0){
            console.log('nextPage 1st');
            $('.page').first().addClass('current-page');
        }
        setTimeout($scope.nextPage, 20000);
    }
})(this);
//$.getJSON('data.json', function (res) {alert('result'+res)}).done(function() {console.log( "second success" );}).fail(function() {console.log( "error", arguments );}).always(function() {console.log( "complete" );});
