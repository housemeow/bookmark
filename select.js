var style = document.createElement('style');
style.innerHTML = '* { user-select: all !important; }';
document.body.append(style);
var a = document.querySelectorAll('*');
for(var d of a) {
    d.onselectstart = null
}