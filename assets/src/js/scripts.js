/* jshint browser: true */

// If JavaScript works then remove class .no-js
if(document.querySelector('.no-js')) {
  let stylesNoJs = document.querySelectorAll('.no-js');
  for (let i = 0; i < stylesNoJs.length; i++) {
    stylesNoJs[i].classList.remove('no-js');
  }
}

/**
 * Change tabIndex from links in submenu
 */
if (document.querySelector('.sub-menu a')) {
  var linksSubmenu = document.querySelectorAll('.sub-menu a');
  Array.prototype.forEach.call(linksSubmenu, function(item){
    item.tabIndex = -1;
  });
}



jQuery(document).ready(function($){

  /**
   * Show button top
   */
  if(document.querySelector('#btnTop'))
    jQuery(window).scroll(function(){
      if(jQuery(this).scrollTop()>540){
        jQuery('#btnTop').addClass('btn-top--show');
      }
      else if ($(this).scrollTop()<540 && $('#btnTop').hasClass('btn-top--show')){
        jQuery('#btnTop').addClass('btn-top--hide');
        setTimeout(function() {
          jQuery('#btnTop').removeClass('btn-top--show');
          jQuery('#btnTop').removeClass('btn-top--hide');
        }, 650);
      }
    });

  /**
   * Href animate
   */
  $("a[href^='#']").click(function() {
    if($(this).attr('href') != "#") {
      var e = $(this).attr("href");
      return $("html, body").animate({
          scrollTop: $(e).offset().top + "px"
      }, 650),
      !1;
    }
  });

});
// jQuery - END
