(function () {
  'use strict';

  var SUBPAGES = ['about', 'publications', 'news-events', 'team'];

  function siteRootPath() {
    var candidates = [
      document.querySelector('link[href*="assets/index-"]'),
      document.querySelector('script[src*="nav-fix.js"]'),
      document.getElementById('iadapt-config')
    ];

    for (var i = 0; i < candidates.length; i++) {
      var el = candidates[i];
      if (!el) continue;
      var src = el.getAttribute('href') || el.getAttribute('src') || el.getAttribute('data-entry');
      if (!src) continue;
      var path = new URL(src, location.href).pathname;
      if (path.indexOf('/assets/') !== -1) {
        return path.replace(/\/assets\/[^/]+$/, '/');
      }
    }

    var path = location.pathname;
    if (path.endsWith('/index.html')) {
      path = path.slice(0, -'index.html'.length);
    } else if (!path.endsWith('/')) {
      path = path.slice(0, path.lastIndexOf('/') + 1);
    }

    var parts = path.replace(/\/$/, '').split('/').filter(Boolean);
    if (parts.length && SUBPAGES.indexOf(parts[parts.length - 1]) !== -1) {
      parts.pop();
    }

    return parts.length ? '/' + parts.join('/') + '/' : '/';
  }

  function siteUrl(relativePath) {
    var root = siteRootPath();
    return new URL(relativePath, location.origin + root).href;
  }

  function isHomeLink(a, text, href) {
    return a.classList.contains('site-logo-link') ||
      text === 'Home' ||
      href === '/' ||
      href === '' ||
      /home/i.test(href) ||
      /index\.html$/i.test(href) && SUBPAGES.some(function (p) { return location.pathname.indexOf('/' + p + '/') !== -1; }) && !/publications|about|news|team/i.test(href);
  }

  function applyNavLinks() {
    var links = {
      home: siteUrl('index.html'),
      about: siteUrl('about/index.html'),
      news: siteUrl('news-events/index.html'),
      publications: siteUrl('publications/index.html'),
      team: siteUrl('team/index.html')
    };

    document.querySelectorAll('a.site-logo-link, header .nav-links a, footer a').forEach(function (a) {
      var text = (a.textContent || '').trim();
      var href = a.getAttribute('href') || '';
      var target = null;

      if (isHomeLink(a, text, href)) {
        target = links.home;
      } else if (text === 'About Us' || text === 'About' || /about/i.test(href)) {
        target = links.about;
      } else if (text.indexOf('News') === 0 || /news/i.test(href)) {
        target = links.news;
      } else if (text === 'Publications' || /publications/i.test(href)) {
        target = links.publications;
      } else if (text === 'Our Team' || text === 'Team' || /team/i.test(href)) {
        target = links.team;
      }

      if (!target) return;

      a.setAttribute('href', target);
      if (!a.dataset.navFixed) {
        a.dataset.navFixed = '1';
        a.addEventListener('click', function (e) {
          var url = e.currentTarget.getAttribute('href');
          if (!url) return;
          e.preventDefault();
          e.stopImmediatePropagation();
          window.location.assign(url);
        }, true);
      }
    });

    var title = document.querySelector('.site-title');
    if (title) title.textContent = 'iAdapt Research Center';
  }

  applyNavLinks();

  var observeTarget = document.querySelector('.site-header') || document.body;
  if (observeTarget) {
    new MutationObserver(applyNavLinks).observe(observeTarget, { childList: true, subtree: true });
  }

  document.addEventListener('DOMContentLoaded', applyNavLinks);
})();
