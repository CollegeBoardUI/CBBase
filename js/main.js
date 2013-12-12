/* Example JavaScript */

/* ==========================================================================
 * CHANGE LOG
 *
 * v0.1 - Josh Jeffryes 10/17/13
 *
 * ========================================================================== */
 
/* ==========================================================================
   Self-Executing Anonymous Functions
   ========================================================================== */

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


/* ==========================================================================
   Functions to be called later
   ========================================================================== */

var slidify = function(targ) {
    
    /*slidify assumes the following DOM:
     * <div class="js-slidify">
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
        .find('> ul').css({
            'position': 'relative',
            'list-style': 'none',
            'margin': 0,
            'padding': 0,
            'left': 0
        })
        .end()
        .find('> ul  li').css({
            'display': 'block',
            'float': 'left'
        });
        
    $this.height(slideWidth * 2/5); /* change this ratio to change the ratio of the slide height to width */
    slideHeight = $this.height();
    mainUl.width(mainUl.children().length * slideWidth);
    
    $this.find('li > a')
        .css({
            'display': 'block',
            'width': slideWidth,
            'height': slideHeight
            })
        .on('click', function(e){
            console.log("clicked");
            e.preventDefault();
            var slideTotal = $(this).parent().siblings().length; //note that this is one less than real total
            var $parent = $(this).parent().parent();
            var currentPosition = parseInt($parent.css('left'), 10);
            if(currentPosition > slideTotal * slideWidth * -1){
                console.log("slide");
                $parent.css('left', (currentPosition - slideWidth));
            }else{
                console.log("don't slide");
                $parent.css('left', 0);
            }
        });
        
    $this.find('.js-slidify-arrow').on('click', function(e){
       var nextTarget = $(this).next()
       nextTarget.trigger(e); /*passes click event to slide below, needed because IE does not understand pointer-events CSS property */ 
    });
}


/* ==========================================================================
   Document Ready functions
   ========================================================================== */

$(function(){
    console.log('e');
    /*fire on window ready and on window resize*/
    $(window).resize(function(){
        $('.js-slidify').each(function(){
            slidify($(this));
            console.log("f");
        });
    }).resize(); /*trigger the resize event handlers*/
    
    notify('#main', 'notifySample.json');
});