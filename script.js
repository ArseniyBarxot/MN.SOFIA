(function(){
  var groups = {};
  document.querySelectorAll('.reveal').forEach(function(el){
    var parent = el.closest('section');
    var key = parent ? Array.prototype.indexOf.call(document.querySelectorAll('section'), parent) : 0;
    groups[key] = groups[key] || [];
    groups[key].push(el);
  });

  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var el = entry.target;
        var key = Object.keys(groups).find(function(k){ return groups[k].indexOf(el) !== -1; });
        var index = groups[key] ? groups[key].indexOf(el) : 0;
        el.style.animationDelay = (index * 0.03) + 's'; // было 0.1s — теперь короче пауза между элементами
        el.classList.add('in-view');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px 0px 0px' });

  document.querySelectorAll('.reveal').forEach(function(el){ observer.observe(el); });
})();