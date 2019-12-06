var link = "https://maps.googleapis.com/maps/api/js?key=" + key();
var script = document.createElement('script');
script.src = link;
document.write(script.outerHTML);
