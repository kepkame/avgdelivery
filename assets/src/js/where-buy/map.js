/**
 * Accordion on the Products and Where to Buy pages
 */

if(document.querySelector('#where-buy-accordion') && document.querySelector('#where-buy-map')) {
  // This variables for the following functions adds balloons to the map
  var arrayAddressesContent = '';
  var arrayShop = { 
    addresses: [],
    pointers: [],
    names: [],
    contents: [],
  };
  var arrayShopAddresses = [];
  var arrayShopPointers = [];
  var arrayShopNames = [];
  var arrayShopContent = [];
  var titlesAreaShop = document.querySelectorAll('.accordion__title');
  var addressForClick = document.querySelectorAll('.accordion__text--address');
  var addressesForClick = document.querySelectorAll('.accordion__inner-list--addresses .accordion__inner-item button');

  function getAddressFromPage() {
    var shopOnPage = document.querySelectorAll('.accordion__shop');
    var arrLength = 0;
    var shopsArray = [];

    Array.prototype.forEach.call(shopOnPage, function (itemShop) {
        var shopName = itemShop.querySelector('h5').innerText;
        var shopAddress = dataAddresses(itemShop);
        var shopPointers = dataPointers(itemShop);
        var shopAddressPhones = dataAddressPhones(itemShop);
        var shopPhone = dataPhones(itemShop);
        // var shopPhoneLink = phoneLinks(itemShop);
        var shopEmail = dataEmails(itemShop);
        var shopSite = dataSites(itemShop);

        /**
         * Functions for collecting data from the page
         */
        // Addresses
        function dataAddresses(shop) {
            if(shop.querySelector('.accordion__inner-list--addresses')) {
                var addresses = shop.querySelectorAll('.accordion__inner-list--addresses .accordion__inner-item button');
                var listAddresses = [];

                for(var i = 0; i < addresses.length; i++) {
                    listAddresses.push(addresses[i].innerText.trim());
                }

                return listAddresses;
            } else if(shop.querySelector('.accordion__text--address')) {
                var address = shop.querySelector('.accordion__text--address button').innerText.trim(); //.split(':')[1].trim();
                return address;
            } else {
                console.log('Нет адресов у магазина: ', shop);
            }
        }

        // Pointers
        function dataPointers(shop) {
            if(shop.querySelector('.accordion__inner-list--addresses')) {
                var addresses = shop.querySelectorAll('.accordion__inner-list--addresses .accordion__inner-item');
                var listPointers = [];

                for(var i = 0; i < addresses.length; i++) {
                    listPointers.push(addresses[i].getAttribute('data-pointer'));
                }

                return listPointers;
            } else if(shop.querySelector('.accordion__text--address')) {
                var pointer = shop.querySelector('.accordion__text--address').getAttribute('data-pointer');
                return pointer;
            } else {
                console.log('Нет адресов у магазина: ', shop);
            }
        }

        // Address Phones
        function dataAddressPhones(shop) {
          if (shop.querySelector('.accordion__address-phone')) {
            var addresses = shop.querySelector('.accordion__inner-list--addresses');
            var list = [];

            // If the address has phone numbers
            if (shop.querySelector('.accordion__address-phone') !== null) {

              // If there is more than 1 phone number
              if (shop.querySelectorAll('.accordion__address-phone').length > 1) {
                var arrayAddress = shop.querySelectorAll('.accordion__inner-item'); // Массив адресов в колонке адресов одного магазина
                var arrayPhones = [];
                
                // Loop of address with phones
                for(var i = 0; i < arrayAddress.length; i++) {
                  if (arrayAddress[i].querySelectorAll('.accordion__address-phone').length == 1) {
                    list[i] = arrayAddress[i].querySelector('.accordion__address-phone').innerText;
                  } else {
                    for(var j = 0; j < arrayAddress[i].querySelectorAll('.accordion__address-phone').length; j++) {
                      var phones = arrayAddress[i].querySelectorAll('.accordion__address-phone');

                      // Loop iterating over an array with phone numbers
                      for (var k = 0; k < phones.length; k++) {
                        var phone = phones[k].innerText;
                        arrayPhones[k] = phone;
                      }

                      list[i] = arrayPhones;
                    }
                  }

                }
              }

              return list;
            } else {
              list.push(shop.querySelector('.accordion__address-phone'));
              return list; 
            }
          } else {
            // Number not specified
            return [''];
          }
        }

        // Phones
        function dataPhones(shop) {
          if(shop.querySelector('.accordion__inner-list--phones')) {
              var phones = shop.querySelectorAll('.accordion__inner-list--phones .accordion__link');
              var list = [];
              for(var i = 0; i < phones.length; i++) {
                  if (phones[i].innerText.charAt(0) =='+' ) {
                      list.push('+' + phones[i].innerText);
                  } else {
                      list.push(phones[i].innerText);
                  }
              }
              return list;
          } else if(shop.querySelector('.accordion__text--phone')) {
              var phone = shop.querySelector('.accordion__text--phone .accordion__link').innerText;
              if (phone.charAt(0) =='+' ) {
                  return '+' + phone;
              } else {
                  return phone;
              }
          } else {
              return '';
          }
        }

        // Phone Links
        function phoneLinks(shop) {
            if(shop.querySelector('.accordion__inner-list--phones')) {
                var phones = shop.querySelectorAll('.accordion__inner-list--phones .accordion__link');
                var links = [];
                for(var i = 0; i < phones.length; i++) {
                    if (phones[i].innerText.charAt(0) =='+' ) {
                        links.push('+' + phones[i].innerText.replace(/\D/g, ''));
                    } else {
                        links.push(phones[i].innerText.replace(/\D/g, ''));
                    }
                }
                return links;
            } else if(shop.querySelector('.accordion__text--phone')) {
                var phone = shop.querySelector('.accordion__text--phone .accordion__link').innerText;
                if (phone.charAt(0) =='+' ) {
                    return '+' + phone.replace(/\D/g, '');
                } else {
                    return phone.replace(/\D/g, '');
                }
            } else {
                return '';
            }
        }

        // Emails
        function dataEmails(shop) {
            if(shop.querySelector('.accordion__inner-list--emails')) {
                var emails = shop.querySelectorAll('.accordion__inner-list--emails .accordion__link');
                var list = [];
                for(var i = 0; i < emails.length; i++) {
                    list.push(emails[i].innerText);
                }
                return list;
            } else if(shop.querySelector('.accordion__text--email')) {
                var email = shop.querySelector('.accordion__text--email .accordion__link').innerText;
                return email;
            } else {
                return '';
            }
        }

        // Sites
        function dataSites(shop) {
            if(shop.querySelector('.accordion__inner-list--sites')) {
                var sites = shop.querySelectorAll('.accordion__inner-list--sites .accordion__link');
                var list = [];
                for(var i = 0; i < sites.length; i++) {
                    list.push(sites[i].innerText);
                }
                return list;
            } else if(shop.querySelector('.accordion__text--site')) {
                var site = shop.querySelector('.accordion__text--site .accordion__link').innerText;
                return site;
            } else {
                return '';
            }
        }

        /**
         * Connect all data from page
         */
        if(typeof shopAddress === 'object') {
            // if the store has several addresses with the same contact information
            for(var i = 0; i < shopAddress.length; i++) {
                arrLength = shopsArray.length;
                shopsArray[arrLength] = {};
                shopsArray[arrLength].address = shopAddress[i];
                shopsArray[arrLength].pointer = shopPointers[i];
                shopsArray[arrLength].addressPhone = shopAddressPhones[i];
                shopsArray[arrLength].name = shopName;
                shopsArray[arrLength].phone = shopPhone;
                shopsArray[arrLength].email = shopEmail;
                shopsArray[arrLength].site = shopSite;
            }
        } else if(typeof shopAddress === 'string') {
            arrLength = shopsArray.length;
            // if the store has only one address
            shopsArray[arrLength] = {};
            shopsArray[arrLength].address = shopAddress;
            shopsArray[arrLength].pointer = shopPointers;
            shopsArray[arrLength].name = shopName;
            shopsArray[arrLength].phone = shopPhone;
            shopsArray[arrLength].email = shopEmail;
            shopsArray[arrLength].site = shopSite;
        }

    }); // End foreach
    
    return shopsArray;

  }

  var arrayAddresses = getAddressFromPage();
  arrayAddresses.forEach(function(arrayAddresses) {
    
    // Change phone numbers for a link
    if(typeof arrayAddresses.phone === 'object') {
      var arrayAddressesPhoneLink = [];
      for(var i = 0; i < arrayAddresses.phone.length; i++) {
        if (arrayAddresses.phone[i].charAt(0) =='+' ) {
          arrayAddressesPhoneLink.push('+' + arrayAddresses.phone[i].replace(/\D/g, ''));
        } else if (arrayAddresses.phone[i].charAt(0) =='8') {
          arrayAddressesPhoneLink.push(arrayAddresses.phone[i].replace(/\D/g, ''));
        }
      }
    } else if( arrayAddresses.phone === undefined ) {
      var arrayAddressesPhoneLink = '';
    } else {
      var arrayAddressesPhoneLink = '';
      if (arrayAddresses.phone.charAt(0) =='+' ) {
        arrayAddressesPhoneLink = '+' + arrayAddresses.phone.replace(/\D/g, '');
      } else if (arrayAddresses.phone.charAt(0) =='8') {
        arrayAddressesPhoneLink = arrayAddresses.phone.replace(/\D/g, '');
      }
    }

    // Connection of all addresses, pointers, shop names
    arrayShopAddresses.push(arrayAddresses.address);
    arrayShopPointers.push(arrayAddresses.pointer);
    arrayShopNames.push(arrayAddresses.name);



    // Concatenate all shop data into one line with HTML tags
    function combineDataOneShop() {
      // Address
      arrayAddressesContent = '';
      arrayAddressesContent += '<div class="balloon__text"><span>' + arrayAddresses.address + '</span>';
  
      // Address Phones
      if(typeof arrayAddresses.addressPhone === 'object') {
        for(var i = 0; i < arrayAddresses.addressPhone.length; i++) {
          arrayAddressesContent += '<a href="tel:' + clearPhoneLink(arrayAddresses.addressPhone[i]) + '">' + arrayAddresses.addressPhone[i].trim() + '</a><br>';
        }
      } else if(arrayAddresses.addressPhone === undefined || arrayAddresses.addressPhone === '') {
        arrayAddressesContent += '';
      } else {
        arrayAddressesContent += '<a href="tel:' + clearPhoneLink(arrayAddresses.addressPhone) + '">' + arrayAddresses.addressPhone.trim() + '</a><br>';
      }

      function clearPhoneLink(item) {
        var phoneLink = item.replace(/ +/g, ' ').trim();
        if (phoneLink.charAt(0) =='+' ) {
          phoneLink = '+' + phoneLink.replace(/\D/g, '');
        } else if (phoneLink.charAt(0) =='8') {
          phoneLink = phoneLink.replace(/\D/g, '');
        }
        return phoneLink;
      }
  
      // Phones
      if(typeof arrayAddresses.phone === 'object') {
        for(var i = 0; i < arrayAddresses.phone.length; i++) {
          arrayAddressesContent += '<a href="tel:' + arrayAddressesPhoneLink[i] + '">' + arrayAddresses.phone[i] + '</a><br>';
        }
      } else if(arrayAddresses.phone === '') {
        arrayAddressesContent += '';
      } else {
        arrayAddressesContent += '<a href="tel:' + arrayAddressesPhoneLink + '">' + arrayAddresses.phone + '</a><br>';
      }
      
      // Emails
      if(typeof arrayAddresses.email === 'object') {
        for(var i = 0; i < arrayAddresses.email.length; i++) {
          arrayAddressesContent += '<a href="mailto:' + arrayAddresses.email[i] + '">' + arrayAddresses.email[i] + '</a><br>';
        }
      } else if(arrayAddresses.email === '') {
        arrayAddressesContent += '';
      } else {
        arrayAddressesContent += '<a href="mailto:' + arrayAddresses.email + '">' + arrayAddresses.email + '</a><br>';
      }
      
      // Sites
      if(typeof arrayAddresses.site === 'object') {
        for(var i = 0; i < arrayAddresses.site.length; i++) {
          arrayAddressesContent += '<a href="' + arrayAddresses.site[i] + '" target="_blank">' + arrayAddresses.site[i] + '</a><br>';
        }
      } else if(arrayAddresses.site === '') {
        arrayAddressesContent += '';
      } else {
        arrayAddressesContent += '<a href="' + arrayAddresses.site + '" target="_blank">' + arrayAddresses.site + '</a><br>';
      }
      // End tag
      arrayAddressesContent += '</div>';
      
      arrayShopContent.push(arrayAddressesContent);
    }
    combineDataOneShop();
    arrayShop.addresses.push(arrayAddresses.address);
    arrayShop.pointers.push(arrayAddresses.pointer);
    arrayShop.names.push(arrayAddresses.name);
    arrayShop.contents.push(arrayAddressesContent);

  });  



  // Adding the collected store data to Yandex map
  if(document.querySelector("#where-buy-map")) {

    var arrMapCoordinates = [];
    var arrMapNames = [];
    var arrMapContacts = [];
    var allShops = document.querySelectorAll('.accordion__shop');
    var geoObjects = [];
  
    ymaps.ready(init);
    function init(){ 
        // Map creation
        var myMap = new ymaps.Map("where-buy-map", {
            center: [48.17702050, 40.65431956],
            zoom: 5,
            controls: ['zoomControl', 'typeSelector', 'fullscreenControl', 'routeButtonControl'],
            behaviors: ['default', 'scrollZoom'],
        });
        
        for(var i = 0; i < arrayShop.addresses.length; ++i) {
          geoObjects[i] = new ymaps.Placemark([arrayShop.pointers[i].split(',')[0], arrayShop.pointers[i].split(',')[1]], {
            balloonContentHeader: arrayShop.names[i],
            balloonContentBody: arrayShop.contents[i],
            },
            {
              iconLayout: 'default#image',
              iconImageHref: '/avgdelivery/build/img/icon-placeholder.svg',
              iconImageSize: [34, 41],
              iconImageOffset: [-17,-39],
            });
          }

          var clusterer = new ymaps.Clusterer({
            preset: 'islands#redClusterIcons',
          });
          myMap.geoObjects.add(clusterer);
          clusterer.add(geoObjects);

          // Click by region (area)
          Array.prototype.forEach.call(titlesAreaShop, function(item){
            item.addEventListener('click', function() {
              var titlePointer = item.getAttribute('data-map');
              var titlePointerZoom = item.getAttribute('data-zoom');
              myMap.setCenter([titlePointer.split(',')[0], titlePointer.split(',')[1]], titlePointerZoom);
            });
          });

          // Click by address
          Array.prototype.forEach.call(addressForClick, function(item){
            item.addEventListener('click', function() {
              var titlePointer = item.getAttribute('data-pointer');
              myMap.setCenter([titlePointer.split(',')[0], titlePointer.split(',')[1]], 16);
              getCoords(document.querySelector('.where-buy__item--map').parentNode);
            });
          });

          // Click on the button with the address
          Array.prototype.forEach.call(addressesForClick, function(item){
            item.addEventListener('click', function() {
              var titlePointer = item.parentNode.getAttribute('data-pointer');
              myMap.setCenter([titlePointer.split(',')[0], titlePointer.split(',')[1]], 16);
              getCoords(document.querySelector('.where-buy__item--map').parentNode);
            });
          });
        }

        function getCoords(elem) {
          var box = elem.getBoundingClientRect();
          var body = document.body;
          var docEl = document.documentElement;
          var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
          var clientTop = docEl.clientTop || body.clientTop || 0;
          var top = box.top + scrollTop - clientTop;

          if( top + 330 < document.documentElement.scrollTop ) {
            window.scroll({
              left: 0,
              top: top - 30,
              behavior: 'smooth'
            });
          }
        }
  }

}
