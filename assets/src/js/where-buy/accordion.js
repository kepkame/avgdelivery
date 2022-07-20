/* jshint browser: true */

// If this is "Where to buy" page, then create an accordion with store addresses
if (document.querySelector('#where-buy-accordion')) {
    createListAddresses(whereBuyAddresses.areas);
}

// Create area
function createListArea(name, pointer, zoom) {
    let listBlock = document.querySelector('#where-buy-accordion #accordion-list');

    // Create
    let newItem = document.createElement('li');
    let itemTitle = document.createElement('h2');
    let itemDescription = document.createElement('div');
    
    // Add attributes and text
    newItem.classList.add('accordion__item');
    newItem.tabIndex = 0;
    itemTitle.classList.add('accordion__title');
    itemTitle.setAttribute('data-map', pointer);
    itemTitle.setAttribute('data-zoom', zoom);
    itemTitle.innerText = name;
    itemDescription.classList.add('accordion__description');

    // Append
    listBlock.appendChild(newItem);
    newItem.appendChild(itemTitle);
    newItem.appendChild(itemDescription);

    // Return the area description block
    return itemDescription;
}

// Create accordion item
function createListShops(shop, itemDescription) {
    // Create
    let itemShop = document.createElement('div');
    let shopTitle = document.createElement('h5');

    // Add attributes and text
    itemShop.classList.add('accordion__shop');
    shopTitle.innerText = shop.shop_name;

    // Append
    itemDescription.appendChild(itemShop);
    itemShop.appendChild(shopTitle);

    return itemShop;
}

// Create description for shop
function createShopDescription(shop, itemShop) {
    // Create paragraph
    let itemText = document.createElement('p');

    // Add class and text
    itemText.classList.add('accordion__text');
    itemText.innerText = shop.shop_description;

    // Append
    itemShop.appendChild(itemText);
}

// Create addresses for shop 
function createShopAddresses(addresses, itemDescription, itemShop) {
    if (1 === addresses.length) {
        // If there is only one address

        // Create
        let shopAddress = document.createElement('p');
        let shopAddressButton = document.createElement('button');

        // Add attributes and text
        shopAddress.classList.add('accordion__text', 'accordion__text--address');
        shopAddress.setAttribute('data-pointer', addresses[0].shop_pointer);
        shopAddress.innerText = 'Адрес: ';
        shopAddressButton.innerText = addresses[0].shop_address;
    
        // Append
        shopAddress.appendChild(shopAddressButton);
        itemShop.appendChild(shopAddress);

        return shopAddress;
    } else if (2 <= addresses.length) {
        // If there are several addresses

        // Create list
        let shopTitle = document.createElement('h6');
        let shopListAddresses = document.createElement('ul');
        
        // Add attributes and text for list
        shopTitle.classList.add('accordion__small-title');
        shopTitle.innerText = 'Адреса:';
        shopListAddresses.classList.add('accordion__inner-list', 'accordion__inner-list--addresses');
        
        // Append the title for addresses
        itemShop.appendChild(shopTitle); 

        // Creating multiple list items
        for (let i = 0; i < addresses.length; i++) {
            // Create item
            let shopAddress = document.createElement('li');
            let shopAddressButton = document.createElement('button');

            // Add attributes and text for item
            shopAddress.classList.add('accordion__inner-item');
            shopAddress.setAttribute('data-pointer', addresses[i].shop_pointer);
            shopAddressButton.innerText = addresses[i].shop_address;
    
            // Append multiple list items
            shopAddress.appendChild(shopAddressButton);
            shopListAddresses.appendChild(shopAddress);
        }

        // Append list
        itemShop.appendChild(shopListAddresses);

        return shopListAddresses;
    } else {
        console.trace();
    }
}

// Create phone, e-mail and site elements
function createListShopItems(item, shopListAddresses, itemShop, type) {
    if ('string' === typeof item || 1 === item.length) {
        // Create item
        let shopItem = document.createElement('p');
        let shopItemLink = document.createElement('a');

        // Add attributes and text
        shopItem.classList.add('accordion__text', 'accordion__text--' + type);
        shopItemLink.classList.add('accordion__link');
        shopItemLink.innerText = item;

        switch(type) {
            case 'phone':
                shopItem.innerText = 'Телефон: ';
                shopItemLink.href = 'tel:' + item[0].replace(/[^\d\+]/g,'');
                break;
            case 'email':
                shopItem.innerText = 'E-mail: ';
                shopItemLink.href = 'mailto:' + item;
                break;
            case 'site':
                shopItem.innerText = 'Сайт: ';
                shopItemLink.href = item;
                shopItemLink.setAttribute('rel', 'nofollow');
                shopItemLink.setAttribute('target', '_blank');
                break;
            default:
                console.log("Error in switch-condition. Line:");
                console.trace();
                break;
        }

        // Append
        shopItem.appendChild(shopItemLink);
        itemShop.appendChild(shopItem);
    } else if ('object' === typeof item && 2 <= item.length) {
        // Create list
        let shopItemList = document.createElement('ul');
        let shopItemListTitle = document.createElement('h6');

        // Add attributes and text for list
        shopItemList.classList.add('accordion__inner-list', 'accordion__inner-list--' + type + 's');
        shopItemListTitle.classList.add('accordion__small-title');

        switch(type) {
            case 'phone':
                shopItemListTitle.innerText = 'Телефоны:';
                break;
            case 'email':
                shopItemListTitle.innerText = 'E-mail:';
                break;
            case 'site':
                shopItemListTitle.innerText = 'Сайты:';
                break;
            default:
                console.log("Error in switch-condition. Line:");
                console.trace();
                break;
        }

        // Creating multiple list items
        for (let i = 0; i < item.length; i++) {
            // Create item
            let shopItemLi = document.createElement('li');
            let shopItemLink = document.createElement('a');

            // Add attributes and text for item
            shopItemLi.classList.add('accordion__inner-item');
            shopItemLink.classList.add('accordion__link');
            shopItemLink.innerText = item[i];

            switch(type) {
                case 'phone':
                    shopItemLink.href = 'tel:' + item[i].replace(/[^\d\+]/g,'');
                    shopItemLink.innerText = item[i];
                    break;
                case 'email':
                    shopItemLink.href = 'mailto:' + item[i];
                    shopItemLink.innerText = item[i];
                    break;
                case 'site':
                    shopItemLink.href = item[i];
                    shopItemLink.setAttribute('rel', 'nofollow');
                    shopItemLink.setAttribute('target', '_blank');
                    shopItemLink.innerText = item[i];
                    break;
                default:
                    console.log("Error in switch-condition. Line:");
                    console.trace();
                    break;
            }
            
            // Append multiple list items
            shopItemLi.appendChild(shopItemLink);
            shopItemList.appendChild(shopItemLi);
        }

        // Append list
        itemShop.appendChild(shopItemListTitle);
        itemShop.appendChild(shopItemList);
    }
}

/**
 * The main function of creating areas
 */
function createListAddresses(areas) {
    
    for (let i = 0; i < areas.length; i++) {
        // Description of the area containing shops
        let itemDescription = createListArea(areas[i].area_name, areas[i].area_pointer, areas[i].area_zoom);

        // Publishing shops on the page
        if (1 <= areas[i].area_shop.length) {
            for (let j = 0; j < areas[i].area_shop.length; j++) {
                let shop = areas[i].area_shop[j];
                let itemShop = createListShops(shop, itemDescription);

                // Addresses. Checking the existence of addresses in the list and adds addresses to the page.
                if (1 <= shop.shop_addresses.length) {
                    // Description shop
                    if (typeof shop.shop_description !== "undefined") {
                        createShopDescription(shop, itemShop);
                    }

                    // Addresses
                    let shopWrapper = createShopAddresses(shop.shop_addresses, itemDescription, itemShop);

                    // Phones
                    if (typeof shop.shop_phone !== "undefined") {
                        createListShopItems(shop.shop_phone, shopWrapper, itemShop, 'phone');
                    }
    
                    // Emails
                    if (typeof shop.shop_email !== "undefined") {
                        createListShopItems(shop.shop_email, shopWrapper, itemShop, 'email');
                    }
    
                    // Sites
                    if (typeof shop.shop_site !== "undefined") {
                        createListShopItems(shop.shop_site, shopWrapper, itemShop, 'site');
                    }
                }
            }
        }

        // Open the first shop
        document.querySelector('#accordion-list li:first-child').classList.add('accordion__item--active');
        document.querySelector('#accordion-list li:first-child').querySelector('.accordion__description').classList.add('accordion__description--active');
        document.querySelector('#accordion-list li:first-child').querySelector('.accordion__description').setAttribute('style', 'display:block;');
    }
}
