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
    images('.portfolio');
    images('.about-backStage');


});
