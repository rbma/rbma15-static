(function(){$(function(){var t,i,n,a,r,s,e;return i=function(){return $.ajax("artists.json",{success:function(i,n,a){var r,e,u,o,c,l,d,h,f,$,m,g;for(o=i.artists,u=m=0,g=o.length;g>m;u=++m)r=o[u],d=o[u].name,h=o[u].nickname,c=o[u].lecture,l=o[u].magazine,f=o[u].radio,e=o[u].bio,$=o[u].website,t(d,h);return s()},error:function(t,i,n){return console.log("fail")},complete:function(t,i){return console.log("comp")}})},n=function(t){var i,n;return i=t.data("name"),n=t.data("pic"),$(".artist-images").css({display:"block"}),e(n)},r=function(t){return $(".artist-images img").each(function(){return $(this).addClass("hidden"),$(this).css({width:"100%"})}),$(".artist-images").hide()},e=function(t){return $(".artist-images img").each(function(){return $(this).addClass("hidden"),$(this).hasClass(t)?($(this).removeClass("hidden"),$(this).transition({width:"101%"},900)):void 0})},t=function(t,i){var n,a,r;return a=$(".artist-list ul"),r=$(".artist-images"),a.append("<a data-name='"+t+"' href='#' data-pic='"+i+"'><li>"+t+"</li></a>"),r.append("<img data-pic='"+i+"' class='"+i+"' src='//d17vwh530ty7de.cloudfront.net/artist/"+i+".jpg' alt='"+t+"'>"),n=$(".artist-list ul a")},a=function(t,i){var n;return console.log(i),n=t.index(t)},s=function(){var t,i;return t=$(".artist-list ul a"),i=$(".artist-list ul"),t.bind("mouseenter",function(){return n($(this))}),t.bind("mouseleave",function(){return r($(this))}),i.bind("click",function(){return a($(this),i)})},i()})}).call(this);