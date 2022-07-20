/**
 * Accordion
 */
jQuery(document).ready(function($){

  if(document.querySelector('#accordion-list')) {
    var accordionList = $('#accordion-list.accordion__list--product');
    accordionList.find('.accordion__item:first').addClass('accordion__item--active');
    accordionList.find('.accordion__item:first .accordion__description').addClass('accordion__description--active');
    accordionList.find('.accordion__item:first .accordion__description').css('display' , 'block');

    $('#accordion-list .accordion__title').click(function(e) {
      e.preventDefault();
      avg_accordion($(this));
    });

    $('#accordion-list .accordion__item').keypress(function(e) {
      e.preventDefault();
      if(e.which == 32) {
        avg_accordion($(this).find('.accordion__title'));
      }
    });

    function avg_accordion(self) {
      var $this = self;

      if ($this.next().hasClass('accordion__description--active')) {
          $this.next().removeClass('accordion__description--active');
          $this.parent('.accordion__item').removeClass('accordion__item--active');
          $this.next().slideUp(350);
      } else {
          $this.parent().parent().find('.accordion__description').removeClass('accordion__description--active');
          $this.parent().parent().find('.accordion__item').removeClass('accordion__item--active');
          $this.parent('.accordion__item').addClass('accordion__item--active');
          $this.parent().parent().find('.accordion__description').slideUp(350);
          $this.next().toggleClass('accordion__description--active');
          $this.next().slideToggle(350);
      }
    }
  }
  
});
// jQuery - END