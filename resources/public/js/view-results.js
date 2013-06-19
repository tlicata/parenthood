window.results = (function ($) {
    $(document).ready(function () {
        $("#results").dataTable({
            bLengthChange: false,
            iDisplayLength: -1
        });
    });
})(window.jQuery);
