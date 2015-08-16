(function () {
  'use strict';

  var header       = document.getElementById('header');
  var container    = document.getElementById('container');
  var toc          = document.getElementById('article-toc');
  var tocTop       = document.getElementById('article-toc-top');
  var headerHeight = header.clientHeight;

  if (!toc) return;

  function updateSidebarPosition () {
    var scrollTop = container.scrollTop;

    if (scrollTop > headerHeight){
      toc.classList.add('fixed');
    } else {
      toc.classList.remove('fixed');
    }
  }

  container.addEventListener('scroll', function () {
    window.requestAnimationFrame(updateSidebarPosition);
  });

  updateSidebarPosition();

  tocTop.addEventListener('click', function (e) {
    e.preventDefault();
    container.scrollTop = 0;
  });
})();
