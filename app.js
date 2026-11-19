/* Buildless, local-file compatible itinerary. No analytics, login or network data fetch. */
(() => {
  'use strict';
  const trip = window.TRIP;
  const P = trip.places;
  const states = new Map(trip.days.map(day => [day.id, 'sun']));
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const href = value => esc(new URL(value).href);
  const link = (url, text, cls = '') => `<a href="${href(url)}" target="_blank" rel="noopener noreferrer"${cls ? ` class="${cls}"` : ''}>${esc(text)}</a>`;
  const map = id => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(P[id].query)}`;
  function route(from, to, mode = 'driving') {
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(P[from].query)}&destination=${encodeURIComponent(P[to].query)}&travelmode=${mode}`;
  }
  const mins = text => {const [h,m] = text.split(':').map(Number); return h*60+m;};
  const uncertain = id => ['sunsun','xiaomei','qiao','yuan','syosyo','avi','abao','weng'].includes(id);
  function feasibility(day, id, time) {
    const p = P[id], t = mins(time);
    if (p.closed?.includes(day.jsDay) || (t >= 960 && p.closedEvening?.includes(day.jsDay))) return {text:'公休衝突，必須換店',className:'conditional'};
    if (!p.slots?.length) return {text:'供餐未核實，條件式備案',className:'conditional'};
    if (!p.slots.some(([a,b]) => t >= a && t < b)) return {text:'需調整餐期',className:'conditional'};
    return {text:uncertain(id) ? '餐期吻合・臨休／供餐另確認' : '常態餐期吻合・非訂位',className:uncertain(id) ? 'caution' : ''};
  }
  function actions(id, from, transport) {
    return `<div class="inline-links">${link(map(id),'地點／評論 ↗')}${from ? link(route(from,id,transport),'上一站 → 這裡 ↗') : ''}${P[id].source ? link(P[id].source,'資訊來源 ↗') : ''}${P[id].phone ? `<a href="tel:${esc(P[id].phone)}">打電話</a>` : ''}</div>`;
  }
  function timeline(rows) {
    return `<ol class="timeline">${rows.map(([time,id,title,note,from,drive]) => {
      const transit = id === 'taipei' || id === 'syosyo';
      return `<li><span class="time">${esc(time)}</span><h4>${esc(title)}</h4>${link(map(id),P[id].name,'place-link')}<p>${esc(note)}</p><p class="travel">${esc(transit ? '搭車預留' : '開車預留')}｜${esc(drive)}${id==='home'?'':' · 停留依上方時間'}</p>${actions(id,from,transit?'transit':'driving')}</li>`;
    }).join('')}</ol>`;
  }
  function mealCard(day, row) {
    const [label,time,id,backup] = row, p = P[id], status = feasibility(day,id,time);
    return `<article class="meal-card" data-meal="${esc(id)}"><div class="meal-top"><span>${esc(label)}</span><time>${esc(time)}</time></div><h4>${link(map(id),p.name)}</h4><p class="rating">${link(p.ratingSource,`收錄 Google ${p.rating.toFixed(1)}★`)} · 每成人預留 $${p.price.join('–')}</p><p>${esc(p.order)}</p><p class="meal-hours">營業｜${esc(p.hours)}</p><span class="tag ${status.className}">${esc(status.text)}</span>${actions(id)}${backup ? `<div class="meal-backup"><b>備案：</b>${link(map(backup),P[backup].name)}<p>${esc(P[backup].hours)}<br>${esc(P[backup].note)}</p>${actions(backup)}</div>` : `<div class="meal-backup"><b>臨休處理：</b>${id==='syosyo'?'若店休或不想轉車，直接返家用餐；不為打卡再繞遠。':id==='abao'?'先查烏日翁濟是否可取餐；錯過餐期就提早在服務區吃合適的備餐。':'若主店未接單，先用自備足量蛋奶素食品，不把一般飯糰或葷湯當素食。'}</div>`}</article>`;
  }
  function mealsFor(day,mode) {return mode === 'rain' && day.rainMeals ? day.rainMeals : day.meals;}
  function version(day,mode) {
    const isRain = mode==='rain';
    return `<section class="version ${isRain?'rain-version':'sun-version'}" data-version="${mode}" aria-label="${esc(day.date)}${isRain?'雨天':'晴天'}行程"><h4 class="version-title ${isRain?'rain':''}">${isRain?'☂ 下雨這樣走':'☀ 沒下雨這樣走'}<span class="line"></span></h4><div class="day-columns"><section><h5 class="column-title">時間與動線</h5>${timeline(day[mode])}</section><section><h5 class="column-title">早餐・午餐・晚餐</h5>${mealsFor(day,mode).map(row=>mealCard(day,row)).join('')}${day.id==='d4'?familyRoute():''}</section></div></section>`;
  }
  function familyRoute(){
    return `<div class="closure-note"><b>家人南返：3大1小</b><p>約12:35–13:00離開知本站 → 大武休息 → 國道3號沿線休息 → 約17:30中埔晚餐 → 約19:00–20:30回烏日。總車程含休息抓6–7.5小時；錯過中埔餐期就提早聯絡烏日翁濟。</p><div class="inline-links">${link(route('zstation','dawuyi'),'知本 → 大武 ↗')}${link(route('dawuyi','abao'),'大武 → 中埔晚餐 ↗')}${link(route('abao','wuri'),'中埔 → 烏日 ↗')}${link(map('weng'),'烏日晚餐備案 ↗')}</div></div>`;
  }
  function heavy(day) {
    return `<details class="heavy"><summary>豪雨／風大？D3改成「不跑縱谷版」</summary><div class="heavy-content"><p>與一般雨天不同：取消台9線長途觀光。先聯絡池上餐廳調整／取消，沿用市區素食午餐與民宿午睡。</p><div class="day-columns"><section><h5 class="column-title">大雨時間與動線</h5>${timeline(day.heavy)}</section><section><h5 class="column-title">大雨版三餐</h5>${day.heavyMeals.map(row=>mealCard(day,row)).join('')}</section></div></div></details>`;
  }
  function renderContents(day) {
    const mode=states.get(day.id), container=document.querySelector(`#${day.id} .day-contents`);
    container.innerHTML=(mode==='both'?version(day,'sun')+version(day,'rain'):version(day,mode))+(day.heavy?heavy(day):'')+(day.id==='d1'?parkingOptions():'');
    document.querySelectorAll(`#${day.id} [data-day-mode]`).forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.dayMode===mode)));
  }
  function parkingOptions() {
    const search = query => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    return `<details class="heavy parking-options"><summary>D1沿途短停與停車｜先看5–10分鐘，累了直接去民宿</summary><div class="heavy-content"><p>停車資料補查：2026/11/19。沿南迴挑2–3站；看景5–10分鐘，加找車位、步行與幼兒上下車，每站預留15–25分鐘，多良30–45分鐘。此處為可刪選項，沒有把全部景點塞進原時間表。</p><p><b>優先：9420或大武濱海公園擇一。</b>多良有精神、能安全停車才走；太麻里或華源再擇一。若16:00才到大武，保留一次必要休息後直往夏雪居；已多停或玩得久，就刪後續點。固定18:00晚餐前要留入住與進市區時間，不為拍照壓縮休息。雨天不增加露天觀光站。</p><p>「有停車設施」不代表當日有空位、免費或可全天使用；「路邊」也不代表合法停車已確認。依現場標誌、標線、管制及出入口判斷，白線不是停車許可；找不到安全合法位置就跳過，不在橋上、平交道口或車道停拍。</p><div class="attraction-list">${trip.parking.map(p=>`<article><h4>${link(search(p.query),p.name)}</h4><span class="tag ${p.kind==='有停車設施'?'':'caution'}">${esc(p.kind)}</span><p>${esc(p.note)}</p><p>停留預留｜${esc(p.stay)}</p><div class="inline-links">${link(search(p.query),'景點地圖')}${p.parkingQuery?link(search(p.parkingQuery),'停車設施搜尋'):''}${p.source?link(p.source,'停車資料來源'):''}</div></article>`).join('')}</div><p>地圖為具名搜尋，未取得固定車位座標或實地勘查；備選點的費率、步行距離與當日管制未核實者不填確定數字。金崙觀景臺、天空之鏡等名稱相近的點，請核對地圖照片與入口再導航。</p></div></details>`;
  }
  function renderDays() {
    document.getElementById('days').innerHTML=trip.days.map((day,index)=>`<article class="day-card" id="${day.id}"><header class="day-banner"><figure><img src="assets/${day.image}" loading="lazy" alt="${esc(day.photo)}"></figure><div class="day-banner-copy"><div class="day-number"><span>DAY ${String(index+1).padStart(2,'0')}</span><span>2026 / ${day.date} 週${day.weekday}</span></div><h3>${esc(day.title)}</h3><p>${esc(day.theme)}</p><p>駕駛量｜${esc(day.drive)}</p></div></header><div class="day-photo-note">${esc(day.photo)}</div><div class="day-controls" role="group" aria-label="${day.date}天氣方案"><span>這一天</span><button type="button" data-day="${day.id}" data-day-mode="sun" aria-pressed="true">☀ 晴天</button><button type="button" data-day="${day.id}" data-day-mode="rain" aria-pressed="false">☂ 雨天</button><button type="button" data-day="${day.id}" data-day-mode="both" aria-pressed="false">兩種都看</button></div><div class="day-contents"></div><aside class="day-note">${esc(day.note)}</aside></article>`).join('');
    trip.days.forEach(renderContents);
  }
  function syncGlobal() {
    const same=new Set(states.values());
    document.querySelectorAll('[data-global-mode]').forEach(button=>button.setAttribute('aria-pressed',String(same.size===1 && same.has(button.dataset.globalMode))));
  }
  function renderRestaurants() {
    const ids=Object.keys(P).filter(id=>P[id].rating);
    const uses = id => trip.days.flatMap(day=>['sun','rain'].flatMap(mode=>mealsFor(day,mode).filter(row=>row[2]===id).map(row=>`${day.date}（${day.weekday}）${mode==='rain'?'雨':'晴'} ${row[0]} ${row[1]}`)));
    document.getElementById('restaurant-table').innerHTML=ids.map(id=>{
      const p=P[id], used=uses(id), conditional=['anan','dalidls','boy'].includes(id);
      return `<tr data-restaurant="${id}"><td><strong>${link(map(id),p.name)}</strong>${link(p.ratingSource,`收錄 Google ${p.rating.toFixed(1)}★`)}<p>${esc(p.diet)}<br>每成人預留$${p.price.join('–')}</p></td><td><p>${esc(p.hours)}</p><span class="tag ${conditional?'conditional':uncertain(id)?'caution':''}">${conditional?'△ 先確認才使用':uncertain(id)?'◐ 餐期可排，日期／供餐另確認':'● 常態餐期可排'}</span><p class="meal-hours">${used.length?esc([...new Set(used)].join('；')):'替代餐廳，不是已訂主餐'}</p></td><td><p>${esc(p.order)}</p><p>${esc(p.note)}</p></td><td>${actions(id)}${p.ratingSource!==p.source?link(p.ratingSource,'評分資料 ↗'):''}<p class="meal-hours">${esc(p.address)}</p></td></tr>`;
    }).join('');
  }
  function renderAttractions() {
    const ids=['forest','xiaoyeliu','seaside','luye','dapo','brown','zforest','art','rice','bento','spa','library','dawuyi'];
    document.getElementById('attraction-list').innerHTML=ids.map(id=>`<article><h4>${link(map(id),P[id].name)}</h4><p>${esc(P[id].hours)}</p><p>建議停留｜${esc(P[id].stay)}</p>${actions(id)}</article>`).join('');
  }
  document.getElementById('stay-links').innerHTML=actions('home');
  document.getElementById('return-map').innerHTML=`${link(route('zstation','wuri'),'知本 → 烏日駕車地圖 ↗')}${link(map('abao'),'中埔晚餐位置 ↗')}${link(map('weng'),'烏日晚餐備案 ↗')}${link('https://1968.freeway.gov.tw/','國道即時路況 ↗')}`;
  renderDays();renderRestaurants();renderAttractions();
  document.addEventListener('click',event=>{
    const global=event.target.closest('[data-global-mode]');
    if(global){trip.days.forEach(day=>{states.set(day.id,global.dataset.globalMode);renderContents(day);});syncGlobal();}
    const dayButton=event.target.closest('[data-day-mode]');
    if(dayButton){states.set(dayButton.dataset.day,dayButton.dataset.dayMode);renderContents(trip.days.find(day=>day.id===dayButton.dataset.day));syncGlobal();}
  });
  document.getElementById('large-text').addEventListener('click',event=>{
    const on=document.body.classList.toggle('large-text');event.currentTarget.setAttribute('aria-pressed',String(on));event.currentTarget.textContent=on?'標準字級':'大字閱讀';
  });
  let previousPrint=null;
  function preparePrint(){
    if(previousPrint)return;
    previousPrint=new Map(states);
    trip.days.forEach(day=>{states.set(day.id,'both');renderContents(day);});
    document.querySelectorAll('details').forEach(d=>{d.dataset.prePrintOpen=String(d.open);d.open=true;});syncGlobal();
  }
  function restorePrint(){
    if(!previousPrint)return;
    document.querySelectorAll('details').forEach(d=>{d.open=d.dataset.prePrintOpen==='true';delete d.dataset.prePrintOpen;});
    trip.days.forEach(day=>{states.set(day.id,previousPrint.get(day.id));renderContents(day);});previousPrint=null;syncGlobal();
  }
  window.addEventListener('beforeprint',preparePrint);window.addEventListener('afterprint',restorePrint);
  document.getElementById('print').addEventListener('click',()=>{preparePrint();window.print();});
  const foodText='我們四位大人、一位3歲孩子，全部吃蛋奶素。不吃肉、魚、海鮮、柴魚、魚露、肉骨高湯和動物性萃取；雞蛋與乳製品可以。孩子請做不辣、不要酒味明顯的料理。若有五辛或共鍋限制，點餐時再說明。';
  document.getElementById('copy-food').addEventListener('click',async()=>{
    const status=document.getElementById('copy-status');
    try{await navigator.clipboard.writeText(foodText);status.textContent='已複製，可貼給店家。';}
    catch{const textarea=document.createElement('textarea');textarea.value=foodText;textarea.setAttribute('readonly','');textarea.style.position='fixed';textarea.style.top='-1000px';document.body.append(textarea);textarea.select();const copied=document.execCommand('copy');textarea.remove();status.textContent=copied?'已複製，可貼給店家。':'請直接選取上方文字複製。';}
  });
  requestAnimationFrame(()=>{
    if(location.hash){const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(target)target.scrollIntoView();}
  });
  window.tripAudit = () => {
    const meals=trip.days.flatMap(day=>['sun','rain'].flatMap(mode=>mealsFor(day,mode).map(row=>({day:day.id,mode,meal:row[0],time:row[1],id:row[2],rating:P[row[2]].rating,status:feasibility(day,row[2],row[1])}))));
    return {days:trip.days.length,meals,primaryRatingPass:meals.every(m=>m.rating>=4.5),primaryHoursPass:meals.every(m=>!m.status.className.includes('conditional')),idsUnique:new Set([...document.querySelectorAll('[id]')].map(e=>e.id)).size===document.querySelectorAll('[id]').length,states:Object.fromEntries(states)};
  };
})();
