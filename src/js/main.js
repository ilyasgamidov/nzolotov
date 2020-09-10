window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {

        try {
            const header = document.querySelector(headerSelector),
              tab = document.querySelectorAll(tabSelector),
              content = document.querySelectorAll(contentSelector);
              
     
        function hideContent() {
            tab.forEach(item => {
                item.classList.remove(activeClass);
            });
    
            content.forEach(item => {
                item.style.display = 'none';
            });
        }
    
        function showContent(i = 0) {
            content[i].style.display = display;
            tab[i].classList.add(activeClass);

        }
    
        hideContent();
        showContent();
    
        header.addEventListener('click', (e) => {
            const target = e.target;
            if (target &&
                target.classList.contains(tabSelector.replace(/\./, "")) ||
                target.parentNode.classList.contains(tabSelector.replace(/\./, ""))) {
                    tab.forEach((item, i) => {
                        if (target == item || target.parentNode == item) {
                            hideContent();
                            showContent(i);
                        }
                    });
            }
        });
        } catch(e){}
    
    };

    const images = (workSelector) => {
        try {
            const imgPopup = document.createElement('div'),
            workSection = document.querySelector(workSelector),
            bigImg = document.createElement('img');
            
            bigImg.style.maxHeight = '100%';
            bigImg.style.width = 'auto';
    
            imgPopup.classList.add('popup');
            workSection.appendChild(imgPopup);
    
            imgPopup.style.justifyContent = 'center';
            imgPopup.style.alignItems = 'center';
            imgPopup.style.display = 'none';
    
            imgPopup.appendChild(bigImg);
    
            workSection.addEventListener('click', (e) => {
                e.preventDefault();
                let target = e.target;
    
                if (target && target.classList.contains('preview')) {
                    imgPopup.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                    const path = target.parentNode.getAttribute('href');
                    bigImg.setAttribute('src', path);
                }
    
                if (target && target.matches('div.popup')) {
                    imgPopup.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        }catch(e) {}
    };

    


    
    tabs('.tabs', '.tab-item', '.content-item', 'tab-item-active');
    tabs('.portfolio-tabs', '.portfolio-tab', '.portfolio-content-item', 'portfolio-tab-active');
    tabs('.price-foto__tabs', '.price-foto__tabs-item', '.price-foto__table', 'active', 'flex');
    tabs('.price-video__tabs', '.price-video__tabs-item', '.price-video__table', 'active', 'flex');
    tabs('.price-fotoAndVideo__tabs', '.price-fotoAndVideo__tabs-item', '.price-fotoAndVideo__table', 'active', 'flex');
    // tabs('.main-tabs', '.main-tabs-item', '.main-content-item', 'active');
    tabs('.standart-tabs', '.second-tabs-item', '.standart', 'active-standart');
    tabs('.medium-tabs', '.second-tabs-medium-item', '.medium', 'active-standart');
    tabs('.luxury-tabs', '.second-tabs-luxury-item', '.luxury', 'active-standart');

    images('.portfolio');
    // images('.about-backStage');
    images('.medium-foto');
    images('.standart');
    images('.luxury');

    
    try {
        var colc = new Colcade( '.grid', {
            columns: '.grid-col',
            items: '.grid-item'
          });
    } catch(e){}

/*     try {
        var colc1 = new Colcade( '.gridd', {
            columns: '.gridd-col',
            items: '.gridd-item'
            });
    } catch(e){}

    try {
        var colc2 = new Colcade( '.griddd', {
            columns: '.griddd-col',
            items: '.griddd-item'
            });
    } catch(e){} */

        try {
            const modals = () => {
                let btnPressed = false;
            
                function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
                    const trigger = document.querySelectorAll(triggerSelector),
                          modal = document.querySelector(modalSelector),
                          close = document.querySelector(closeSelector),
                          windows = document.querySelectorAll('[data-modal]'),
                          scroll = calcScroll();
            
                    trigger.forEach(item => {
                        item.addEventListener('click', (e) => {
                            if (e.target) {
                                e.preventDefault();
                            }
            
                            btnPressed = true;
            
                            if (destroy) {
                                item.remove();
                            }
            
                            windows.forEach(item => {
                                item.style.display = 'none';
                                item.classList.add('animated', 'fadeIn');
                            });
                
                            modal.style.display = "block";
                            document.body.style.overflow = "hidden";
                            document.body.style.marginRight = `${scroll}px`;
                        });
                    });
            
                    close.addEventListener('click', () => {
                        windows.forEach(item => {
                            item.style.display = 'none';
                        });
            
                        modal.style.display = "none";
                        document.body.style.overflow = "";
                        document.body.style.marginRight = `0px`;
                    });
            
                    modal.addEventListener('click', (e) => {
                        if (e.target === modal) {
                            windows.forEach(item => {
                                item.style.display = 'none';
                            });
            
                            modal.style.display = "none";
                            document.body.style.overflow = ""; 
                            document.body.style.marginRight = `0px`;
                        }
                    });
                }
            
                function showModalByTime(selector, time) {
                    setTimeout(function() {
                        let display;
            
                        document.querySelectorAll('[data-modal]').forEach(item => {
                            if (getComputedStyle(item).display !== 'none') {
                                display = "block";
                            }
                        });
            
                        if (!display) {
                            document.querySelector(selector).style.display = 'block';
                            document.body.style.overflow = "hidden";
                            let scroll = calcScroll();
                            document.body.style.marginRight = `${scroll}px`;
                        }
                    }, time);
                }
            
                function calcScroll() {
                    let div = document.createElement('div');
            
                    div.style.width = '50px';
                    div.style.height = '50px';
                    div.style.overflowY = 'scroll';
                    div.style.visibility = 'hidden';
            
                    document.body.appendChild(div);
                    let scrollWidth = div.offsetWidth - div.clientWidth;
                    div.remove();
            
                    return scrollWidth;
                }
            
                function openByScroll(selector) {
                    window.addEventListener('scroll', () => {
                        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            
                        if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
                            document.querySelector(selector).click();
                        }
                    });
                }
            
                bindModal('.order', '.modal-order', '.modal-order-content .close');
                // showModalByTime('.popup-consultation', 5000);
            };
            
            modals();
        }catch(e){}
        

        const forms = () => {
            const form = document.querySelectorAll('form'),
                  inputs = document.querySelectorAll('input'),
                  phoneInputs = document.querySelectorAll('input[name="user_phone"]');
          
            phoneInputs.forEach(item => {
                item.addEventListener('input', () => {
                    item.value = item.value.replace(/\D/, '');
                });
            });
            
            const message = {
                loading: 'Загрузка...',
                success: 'Сообщение отправлено! Скоро мы с вами свяжемся.',
                failure: 'Что-то пошло не так...'
            };
          
            const postData = async (url, data) => {
                document.querySelector('.status').textContent = message.loading;
                let res = await fetch(url, {
                    method: "POST",
                    body: data
                });
          
                return await res.text();
            };
          
            const clearInputs = () => {
                inputs.forEach(item => {
                    item.value = '';
                });
            };
          
            form.forEach(item => {
                item.addEventListener('submit', (e) => {
                    e.preventDefault();
          
                    let statusMessage = document.createElement('div');
                    statusMessage.classList.add('status');
                    item.appendChild(statusMessage);
          
                    const formData = new FormData(item);
          
                    postData('mailer/smart.php', formData)
                        .then(res => {
                            console.log(res);
                            statusMessage.textContent = message.success;
                        })
                        .catch(() => statusMessage.textContent = message.failure)
                        .finally(() => {
                            clearInputs();
                            setTimeout(() => {
                                statusMessage.remove();
                            }, 5000);
                        });
                });
            });
          };
          
          forms();

          lightGallery(document.getElementById('lightgallery'));
});
