// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

$(function(){
    /*fire on window ready and on window resize*/
    $(window).resize(function(){
        $('.js-slidify').each(function(){
            slidify($(this));
        });
    })
});

var slidify = function(targ) {
    
    /*slidify assumes the following DOM:
     * <div class="carousel">
     *     <ul>
     *         <li><a href="#">
     *             <div class="slide">slide1</div>
     *         </a></li>
     *         <li><a href="#">
     *             <div class="slide">slide2</div>
     *         </a></li>
     *         <li><a href="#">
     *             <div class="slide">slide3</div>
     *         </a></li>
     *         <li><a href="#">
     *             <div class="slide">slide4</div>
     *         </a></li>
     *     </ul>
     * </div>
     */
    
    var $this = $(targ),
        slideWidth = $this.width(),
        slideHeight = 0,
        mainUl = $this.find('ul:first');
        
    /* force certain css properties. These are required for the slides to work.*/
    $this.css({
        'overflow': 'hidden',
        '-moz-box-sizing': 'border-box',
        'box-sizing': 'border-box'
        })
        .find('> ul').css('position', 'relative')
        .find('> ul > li').css({
            'display': 'block',
            'float': 'left'
        });
        
    $this.height(slideWidth * 3/5);
    slideHeight = $this.height();
    mainUl.width(mainUl.children().length * slideWidth);
    
    $this.find('li > a')
        .css({
            'display': 'block',
            'width': slideWidth,
            'height': slideHeight
            })
        .on('click', function(e){
            e.preventDefault();
            var slideTotal = $(this).parent().siblings().length; //note that this is one less than real total
            var $parent = $(this).parent().parent();
            var currentPosition = parseInt($parent.css('left'), 10);
            if(currentPosition > slideTotal * slideWidth * -1){
                $parent.css('left', (currentPosition - slideWidth));
            }else{
                $parent.css('left', 0);
            }
        });
}
