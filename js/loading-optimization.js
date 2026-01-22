/**
 * Loading Optimization Script
 * Helps improve page loading performance
 */

(function() {
  'use strict';
  
  // Defer non-critical CSS
  function deferCSS(href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = function() {
      setTimeout(function() {
        link.media = 'all';
      });
    };
    document.head.appendChild(link);
  }
  
  // Lazy load images
  function lazyLoadImages() {
    var images = document.querySelectorAll('img[data-src]');
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(function(img) {
      imageObserver.observe(img);
    });
  }
  
  // Optimize script loading
  function optimizeScripts() {
    var scripts = document.querySelectorAll('script[defer]');
    scripts.forEach(function(script) {
      if (script.src) {
        var newScript = document.createElement('script');
        newScript.src = script.src;
        newScript.async = true;
        document.head.appendChild(newScript);
      }
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      lazyLoadImages();
      optimizeScripts();
    });
  } else {
    lazyLoadImages();
    optimizeScripts();
  }
  
  // Handle window load event
  window.addEventListener('load', function() {
    // Remove preloader if it exists
    var preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(function() {
        preloader.style.opacity = '0';
        setTimeout(function() {
          if (preloader.parentNode) {
            preloader.parentNode.removeChild(preloader);
          }
        }, 300);
      }, 500);
    }
  });
  
})();