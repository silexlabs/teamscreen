(function($scope) {
    $scope.App = function(){
        console.log('aaa');
        $('body').click(function () {
            $scope.nextPage();
        });
        this.loadData($scope.Config.dataUrl);
    };
    $scope.App.prototype.loadData = function(url){
        $.getJSON(url, function(data) {
            var urls = data.urls;
            // iframes
            for (idx in urls){
                var url = urls[idx].url;
                var refresh = urls[idx].refresh;
                if (typeof(refresh) === 'undefined') refresh = true;
                $('body').append('<iframe class="page" data-refresh="'+refresh+'" src="'+url+'" />');
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
        if (iframe.attr('data-refresh') === 'true') {
            console.log('refresh');
            iframe.attr('src', iframe.attr('src'));
        }
        $('.current-page').removeClass('current-page').next('.page').addClass('current-page');
        if (document.getElementsByClassName('current-page').length === 0){
            console.log('nextPage 1st');
            $('.page').first().addClass('current-page');
        }
        setTimeout($scope.nextPage, 20000);
    }
})(this);
//$.getJSON('data.json', function (res) {alert('result'+res)}).done(function() {console.log( "second success" );}).fail(function() {console.log( "error", arguments );}).always(function() {console.log( "complete" );});
