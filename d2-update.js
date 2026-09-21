(() => {
  const day = document.querySelector("#d2");
  if (!day) return;

  const content = day.querySelector(":scope > div");
  const badges = day.querySelectorAll(".day-badges span");
  if (badges.length >= 3) {
    badges[0].textContent = "同一間住第二晚";
    badges[1].textContent = "08:45 抵倉敷館排隊";
    badges[2].textContent = "09:30 川舟目標班次";
  }

  const links = day.querySelector(".map-links");
  if (links) {
    links.innerHTML = `
      <a href="https://www.google.com/maps/dir/?api=1&origin=VIA%20INN%20Okayama&destination=Kurashiki%20Station&travelmode=transit" target="_blank" rel="noopener noreferrer">飯店 → 倉敷站 ↗</a>
      <a href="https://www.google.com/maps/dir/?api=1&origin=Kurashiki%20Station&destination=Kurashiki-kan%20Tourist%20Information%20Office&travelmode=walking" target="_blank" rel="noopener noreferrer">倉敷站 → 倉敷館 ↗</a>
      <a href="https://www.google.com/maps/search/?api=1&query=Kurashiki-kan%20Tourist%20Information%20Office" target="_blank" rel="noopener noreferrer">川舟售票處 ↗</a>
      <a href="https://maps.app.goo.gl/n6aadUknTTQoBJ8z6" target="_blank" rel="noopener noreferrer">晚餐 TAKU ↗</a>
      <a href="https://maps.app.goo.gl/YFpPm9UonhUhbCaT7" target="_blank" rel="noopener noreferrer">BAR FUKUROU ↗</a>
      <a href="https://www.google.com/maps/dir/?api=1&origin=Kurashiki%20Station&destination=VIA%20INN%20Okayama&travelmode=transit" target="_blank" rel="noopener noreferrer">倉敷 → 飯店 ↗</a>`;
  }

  const notice = day.querySelector(".notice");
  if (notice) {
    notice.innerHTML = `<strong>川舟不是事前預約：</strong>9/30 適用當日售票；倉敷館 09:00 開賣，09:30 為第一班。08:45 左右到場排隊，以 09:30 為目標但不保證。若第一班額滿，買最早可得班次，再和早餐／大原美術館前後互換。雨、強風或水況不佳可能停航。`;
  }

  if (content && notice && !day.querySelector(".boat-booking")) {
    const card = document.createElement("aside");
    card.className = "boat-booking";
    card.innerHTML = `
      <div>
        <small>當日搶票清單</small>
        <h4>くらしき川舟流し｜09:30 目標</h4>
        <p><b>08:45</b> 到倉敷館排隊 → <b>09:00</b> 買票 → <b>09:30–09:50</b> 搭船。成人目前 ¥700，約 20 分鐘、每船 6 席；9 月末班 15:00。</p>
      </div>
      <nav aria-label="倉敷川舟資料">
        <a href="https://kankou-kurashiki.jp/special/kawafune/" target="_blank" rel="noopener noreferrer">川舟官方規則 ↗</a>
        <a href="https://www.kurashiki-tabi.jp/see/see-2265/" target="_blank" rel="noopener noreferrer">倉敷館資訊 ↗</a>
      </nav>`;
    notice.insertAdjacentElement("afterend", card);
  }

  const columns = day.querySelectorAll(".day-columns > section");
  const route = columns[0];
  const meals = columns[1];

  if (route) {
    route.innerHTML = `
      <h4>時間與動線</h4>
      <p><b>07:35 左右｜VIA INN 直接出發</b><span>D2 不處理寄送，也不必等櫃檯；步行進岡山站，搭 JR 山陽本線到倉敷約 17–20 分。班次以當日 Google Maps／JR 顯示為準。</span></p>
      <p><b>08:25–08:45｜倉敷站 → 倉敷館</b><span>步行約 12–15 分，提早到售票處外等待。09:00 開賣後購買 09:30 川舟票；若額滿，就買當日最早還有位的班次。</span></p>
      <p><b>09:30–09:50｜倉敷川舟流し</b><span>約 20 分鐘。當日現場票不是預約保證；停航時直接啟動河岸散步＋早餐，不空等。</span></p>
      <p><b>10:00–10:40｜Café Nature 早餐</b><span>搭船後再吃，避免錯過 09:00 售票。吃完步行前往大原美術館。</span></p>
      <p><b>10:50–12:30｜大原美術館</b><span>09:00–17:00，末入 16:30，通常週一休；¥2,000。若船班延後，縮成 60–75 分鐘或移到午後。</span></p>
      <p><b>12:40–16:45｜午餐、阿智神社、本町街拍</b><span>午餐後走阿智神社、本町與東町；保留巷弄散步及 GR 拍照時間。下雨可多留美術館與店鋪。</span></p>
      <p><b>17:30–18:40｜TAKU 晚餐</b><span>お好み焼き・カレー TAKU，官方觀光頁列 11:30–22:00、週一晚休；9/30 週三原則不衝突。點素食版本，仍逐項確認無肉、魚、柴魚高湯、魚露與豬骨。</span></p>
      <p><b>19:00–20:15｜BAR FUKUROU</b><span>商店街官方資料列 19:00 起營業；在美觀地區入口附近。現場臨休則略過，直接回倉敷站。</span></p>
      <p><b>約 20:30–21:30｜返岡山＋買隔日早餐</b><span>倉敷搭 JR 回岡山，回 VIA INN 前到車站周邊便利商店買原料合適的麵包＋飲料，作 D3 房內早餐。</span></p>`;
  }

  if (meals) {
    meals.innerHTML = `
      <h4>三餐與備案</h4>
      <p><b>早餐｜Café Nature</b><span>100% Vegan；07:30–17:00、通常 LO 16:30；現金。排在川舟之後約 10:00。<br><a href="https://www.google.com/maps/search/?api=1&query=Cafe%20Nature%20Kurashiki" target="_blank" rel="noopener noreferrer">餐廳位置／評論 ↗</a></span></p>
      <p><b>午餐｜つばめ喫茶室</b><span>指定 Vegan 餐盤；通常 11:30–16:00、不定休，9/30 營業仍須看店家當月公告。休息則回 Café Nature。<br><a href="https://www.google.com/maps/search/?api=1&query=%E3%81%A4%E3%81%B0%E3%82%81%E5%96%AB%E8%8C%B6%E5%AE%A4%20%E5%80%89%E6%95%B7" target="_blank" rel="noopener noreferrer">餐廳位置／評論 ↗</a></span></p>
      <p><b>晚餐｜お好み焼き・カレー TAKU</b><span>目標 17:30；店家有素食版廣島燒資訊，但你的限制較嚴格，點餐時必須再確認麵糊、醬汁與烹調面均不含肉、魚、柴魚高湯、魚露、豬骨。<br><a href="https://maps.app.goo.gl/n6aadUknTTQoBJ8z6" target="_blank" rel="noopener noreferrer">你指定的 Google Maps ↗</a> · <a href="https://kankou-kurashiki.jp/2020/08/%E3%81%8A%E5%A5%BD%E3%81%BF%E7%84%BC%E3%81%8D%E3%83%BB%E3%82%AB%E3%83%AC%E3%83%BC%E3%80%80taku/" target="_blank" rel="noopener noreferrer">營業資料 ↗</a></span></p>
      <div class="meal-backup"><b>食品／臨休備案</b><p>早餐店臨休時，以前晚備糧撐到つばめ；午餐臨休時改 Café Nature。TAKU 若無法確認嚴格蛋奶素，改在倉敷站超商／超市依原料標示組合麵包、乳品／豆漿、香蕉與原味豆腐，不以「去肉」當安全餐。</p></div>`;
  }

  const stay = day.querySelector(".stay-line");
  if (stay && !day.querySelector(".d2-night-plan")) {
    const night = document.createElement("aside");
    night.className = "d2-night-plan";
    night.innerHTML = `
      <div><small>晚間順序</small><strong>TAKU → FUKUROU → JR 回岡山 → 超商補給</strong></div>
      <p>隔日早餐買：原料合適麵包＋原味豆漿／乳品飲料；避免肉鬆、明膠與不明高湯調味品。<a href="https://maps.app.goo.gl/YFpPm9UonhUhbCaT7" target="_blank" rel="noopener noreferrer">Fukurou 地圖 ↗</a></p>`;
    stay.insertAdjacentElement("beforebegin", night);
  }

  const luggage = document.querySelector(".luggage-card");
  if (luggage) {
    const title = luggage.querySelector(":scope > b");
    const detail = luggage.querySelector(":scope > div");
    if (title) title.textContent = "28 吋行李方案｜改為 D3 尾道寄放";
    if (detail) {
      detail.innerHTML = `
        <p><strong>已採用：</strong>D2 不在 VIA INN 辦寄送；10/1 退房後帶 28 吋行李到尾道，抵達後先寄放，再開始千光寺行程。</p>
        <p><strong>寄放順序：</strong>先看尾道站置物櫃；大型櫃已滿時，改黑貓尾道商店街中心。營業與容量仍依當日現場，行程已預留處理時間。</p>
        <p><strong>新幹線規則：</strong>量含輪子、把手的長＋寬＋高。超過 160 cm 才須預約附特大行李放置區座位；160 cm 以內可依車廂規定放行李架，但太重抬不上去時仍可主動選附放置區的指定席。</p>
        <a href="https://www.westjr.co.jp/travel-information/tc/train-usage-guide/luggage/" target="_blank" rel="noopener noreferrer">JR 官方行李規則 ↗</a> · <a href="https://www.google.com/maps/search/?api=1&query=%E3%83%A4%E3%83%9E%E3%83%88%E9%81%8B%E8%BC%B8%20%E5%B0%BE%E9%81%93%E5%95%86%E5%BA%97%E8%A1%97%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC" target="_blank" rel="noopener noreferrer">尾道寄放位置 ↗</a>`;
    }
  }
})();
