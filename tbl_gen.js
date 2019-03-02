s = window.prompt('');

kk_td_tmp='<td style="padding:3px 10px">';
kk_tr_tmp='<tr style="border-top:1px solid black;">';

kk_tc='';

lines=s.split('\n');

for(l in lines)
	lines[l] = lines[l].split('\t').join('</td>'+kk_td_tmp);
kk_tc = lines.join('</td></tr>'+kk_tr_tmp+kk_td_tmp);
console.log(kk_tc);

kk_t=document.createElement('div');
kk_tb='<table border="1" style="position:fixed;left:0;top:0;z-index:9999;background:white;border-collapse:collapse;">'+kk_tr_tmp+kk_td_tmp;
kk_te='</td></tr></table>';
kk_t.id='kk_t';
kk_t.innerHTML=kk_tb+kk_tc+kk_te;
document.querySelector('body').append(kk_t);
