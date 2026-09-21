(() => {
  const mapSearch = (query, label) => `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
  const mapRoute = (origin, destination, mode, label) => `<a href="https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${mode}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
  const attachInlineMaps = (section, mappings) => {
    if (!section) return;
    const rows = [...section.querySelectorAll(":scope > p")];
    mappings.forEach(([needle, links]) => {
      const row = rows.find((item) => item.querySelector("b")?.textContent.includes(needle));
      const detail = row?.querySelector("span");
      if (!detail || detail.querySelector(".inline-map-links")) return;
      detail.insertAdjacentHTML("beforeend", `<span class="inline-map-links">${links}</span>`);
    });
  };
  const normalizeInlineMaps = (day) => {
    if (!day) return;
    day.querySelectorAll(".day-columns p > span").forEach((detail) => {
      const mapLinks = [...detail.querySelectorAll("a")].filter((link) =>
        /(?:google\.[^/]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps)/.test(link.href)
      );
      if (!mapLinks.length) return;

      let wrapper = detail.querySelector(":scope > .inline-map-links");
      if (!wrapper) {
        wrapper = document.createElement("span");
        wrapper.className = "inline-map-links";
        detail.append(wrapper);
      }

      const seen = new Set([...wrapper.querySelectorAll("a")].map((link) => link.href));
      mapLinks.forEach((link) => {
        if (link.closest(".inline-map-links") === wrapper) return;
        const previous = link.previousSibling;
        if (previous?.nodeType === Node.ELEMENT_NODE && previous.tagName === "BR") previous.remove();
        if (seen.has(link.href)) {
          link.remove();
          return;
        }
        seen.add(link.href);
        wrapper.append(link);
      });
    });
  };

  const overviewMetrics = document.querySelectorAll("#overview .metric-grid > div");
  if (overviewMetrics[3]) overviewMetrics[3].innerHTML = "<small>大行李</small><strong>28 吋・三邊 &lt;160 cm</strong>";
  const status = document.querySelector("#overview .status-key .confirmed");
  if (status) status.textContent = "已訂：機票／四晚住宿／VLML／ecbo／10/1 晚餐／桃機接送";

  const luggage = document.querySelector(".luggage-card");
  if (luggage) {
    const title = luggage.querySelector(":scope > b");
    const detail = luggage.querySelector(":scope > div");
    if (title) title.textContent = "28 吋行李｜全程自行拖行，尾道 ecbo 已訂";
    if (detail) detail.innerHTML = `
      <p><strong>已確認：</strong>行李三邊合計小於 160 cm，不寄送至廣島。D3 從 VIA INN 退房後直接拖到尾道；遊覽期間使用已預約的 ecbo cloak。</p>
      <p><strong>D3 寄放：</strong>到尾道先依 ecbo 訂單時間報到、確認取件截止，再去千光寺山。<a href="https://goo.gl/maps/ewVvCWXM1SKJpn5a7?g_st=ac" target="_blank" rel="noopener noreferrer">已預約寄放地址 ↗</a></p>
      <p><strong>搭車：</strong>小於 160 cm 不屬於東海道・山陽新幹線強制預約特大行李席的尺寸；本次尾道到廣島改搭 JR 山陽本線普通／快速列車，依車廂空間放行李架或不妨礙通道的位置。</p>
      <a href="https://www.westjr.co.jp/travel-information/tc/train-usage-guide/luggage/" target="_blank" rel="noopener noreferrer">JR 官方行李規則 ↗</a>`;
  }

  const d1 = document.querySelector("#d1");
  if (d1) {
    const firstRoute = d1.querySelector(".day-columns > section:first-child");
    const firstItem = firstRoute?.querySelector("p");
    if (firstItem && !firstRoute.textContent.includes("UGO 桃園機場送機")) {
      firstItem.insertAdjacentHTML("beforebegin", `<p><b>03:30｜UGO 桃園機場送機</b><span><strong class="status confirmed">已預訂</strong> 依 UGO 訂單顯示的上車地址、車輛資訊與等候規則執行；建議前晚再次確認預約狀態，03:20 前到上車點。</span></p>`);
    }
    const breakfast = d1.querySelector(".day-columns > section:nth-child(2) > p:first-of-type span");
    if (breakfast) breakfast.innerHTML = `<strong class="status confirmed">去程 VLML 已確認</strong> 華航蛋奶素特殊餐；仍自備一份符合限制的密封點心，以防供餐異常。`;
  }

  const d3 = document.querySelector("#d3");
  if (d3) {
    const badges = d3.querySelectorAll(".day-badges span");
    if (badges.length >= 3) {
      badges[0].textContent = "拖 28 吋行李換宿";
      badges[1].textContent = "ecbo cloak 已預約";
      badges[2].textContent = "JR 山陽本線到廣島";
    }
    const links = d3.querySelector(".map-links");
    if (links) links.innerHTML = `
      ${mapRoute("VIA INN Okayama", "Onomichi Station", "transit", "岡山飯店 → 尾道")}
      <a href="https://goo.gl/maps/ewVvCWXM1SKJpn5a7?g_st=ac" target="_blank" rel="noopener noreferrer">ecbo 已訂寄放點 ↗</a>
      ${mapSearch("Senkoji Ropeway Sanroku Station", "千光寺山纜車山麓站")}
      ${mapSearch("Cat Alley Onomichi", "貓之細道")}
      ${mapSearch("Onomichi Hondori Shopping Street", "本通商店街")}
      <a href="https://maps.app.goo.gl/cpjtwRvFkexRWuNq7" target="_blank" rel="noopener noreferrer">尾道 → 廣島 JR 路線 ↗</a>
      ${mapSearch("The Royal Park Hotel Hiroshima Riverside", "廣島住宿")}
      ${mapSearch("Hiroshima Peace Memorial Park", "和平紀念公園")}
      ${mapSearch("Atomic Bomb Dome Hiroshima", "原爆圓頂館")}
      ${mapSearch("Hiroshima Castle", "廣島城外圍")}
      ${mapSearch("Bar Alegre Hiroshima", "Bar Alegre")}`;

    const notice = d3.querySelector(".notice");
    if (notice) notice.innerHTML = `<strong>D3 已定案：</strong>行李不寄送，尾道 ecbo cloak 已預約；取件後依你提供的路線搭 JR 山陽本線到廣島，不走三原新幹線。入住後先走和平公園，資料館只在有合適時段且不影響 19:15 訂位時進館。晚餐後的「原子博物館」按<strong>原爆圓頂館戶外夜拍</strong>安排。`;

    const columns = d3.querySelectorAll(".day-columns > section");
    if (columns[0]) columns[0].innerHTML = `
      <h4>時間與動線</h4>
      <p><b>07:00 早餐、08:00 左右退房</b><span>拖 28 吋行李步行進岡山站，搭 JR 山陽本線往尾道，抓約 1 小時 25–35 分。${mapRoute("VIA INN Okayama", "Onomichi Station", "transit", "開啟 JR 路線")}</span></p>
      <p><b>約 09:50–10:10｜ecbo cloak 寄放</b><span><strong class="status confirmed">已預約</strong>。依訂單地點報到並確認取件截止；不再找置物櫃或黑貓。<a href="https://goo.gl/maps/ewVvCWXM1SKJpn5a7?g_st=ac" target="_blank" rel="noopener noreferrer">已訂寄放點 ↗</a></span></p>
      <p><b>10:15–12:00｜千光寺山 → 貓之細道</b><span>先到${mapSearch("Senkoji Ropeway Sanroku Station", "千光寺山纜車山麓站")}搭纜車上山，經 PEAK 展望台、千光寺後步行下山到${mapSearch("Cat Alley Onomichi", "貓之細道")}；下坡石階請留意相機與鞋底。</span></p>
      <p><b>12:10–13:00｜Komedoko 午餐</b><span>只點明確 Vegan 菜單，保留在午餐 LO 前入店。${mapSearch("Komedoko Shokudo Onomichi", "Komedoko 地圖")}</span></p>
      <p><b>13:05–14:05｜本通商店街、海岸街拍</b><span>沿${mapSearch("Onomichi Hondori Shopping Street", "尾道本通商店街")}慢慢走回寄放點；U2 僅在有餘裕時加選。</span></p>
      <p><b>14:10 取件 → 約 14:30–16:15｜JR 到廣島</b><span>拖行李回尾道站，改搭 JR 山陽本線普通／快速列車，可能需在糸崎換車；不搭新幹線。實際班次以當日顯示為準。<a href="https://maps.app.goo.gl/cpjtwRvFkexRWuNq7" target="_blank" rel="noopener noreferrer">你指定的 JR 路線 ↗</a></span></p>
      <p><b>約 16:30｜入住 Royal Park</b><span>先放行李再出門。${mapSearch("The Royal Park Hotel Hiroshima Riverside", "飯店位置")}</span></p>
      <p><b>17:10–18:30｜和平公園，資料館隨緣</b><span>先走戶外紀念軸線；若當天有適用入場時段且不會壓縮晚餐，才進和平紀念資料館。${mapSearch("Hiroshima Peace Memorial Park", "和平公園")} · ${mapSearch("Hiroshima Peace Memorial Museum", "和平紀念資料館")}</span></p>
      <p><b>19:15｜JoGeSaYu 晚餐</b><span><strong class="status confirmed">已訂位：10/1（四）19:15・1 人</strong>，19:05 左右抵達。${mapSearch("JoGeSaYu Hiroshima", "餐廳位置")}</span></p>
      <p><b>約 20:45–22:00｜原爆圓頂館＋廣島城外圍夜拍</b><span>${mapSearch("Atomic Bomb Dome Hiroshima", "原爆圓頂館")}可從柵欄外隨時觀看；再移動到${mapSearch("Hiroshima Castle", "廣島城外圍／護城河")}拍外觀，不視為夜間入館。若太晚或下雨，二選一。</span></p>
      <p><b>約 22:10｜Bar Alegre</b><span>週四官方營業 19:00–02:00（LO 01:30），桌費 ¥500；胡町電停步行約 2 分。${mapSearch("Bar Alegre Hiroshima", "Bar Alegre 地圖")}</span></p>`;

    if (columns[1]) columns[1].innerHTML = `
      <h4>三餐與備案</h4>
      <p><b>早餐｜VIA INN 房內</b><span>D2 晚間已買的合適麵包＋飲料；07:00 吃完再整理行李。</span></p>
      <p><b>午餐｜Komedoko Shokudo</b><span>11:00–14:00、LO 13:30，通常週一休；只點指定 Vegan 菜單。${mapSearch("Komedoko Shokudo Onomichi", "地圖／評論")}</span></p>
      <p><b>晚餐｜JoGeSaYu</b><span>100% 植物性，10/1 19:15 已訂位；動物性食材、酒精與五葷均不使用。${mapSearch("JoGeSaYu Hiroshima", "地圖／評論")}</span></p>
      <div class="meal-backup"><b>食品／臨休備案</b><p>尾道仍帶足量常溫食品。Komedoko 臨休時不臨時吃不明高湯；到廣島後可在 YOURS ekie 補隔日早餐與宮島備糧。</p></div>`;
  }

  const d4 = document.querySelector("#d4");
  if (d4) {
    const badges = d4.querySelectorAll(".day-badges span");
    if (badges.length >= 3) {
      badges[0].textContent = "07:20 出門搭廣電 2 號線";
      badges[1].textContent = "滿潮參考 13:27";
      badges[2].textContent = "纜車＋獅子岩・不攻頂";
    }
    const links = d4.querySelector(".map-links");
    if (links) links.innerHTML = `
      <a href="https://maps.app.goo.gl/fPyfT7bYowUfqfut8" target="_blank" rel="noopener noreferrer">飯店 → 廣電 2 號線 → 宮島口 ↗</a>
      ${mapSearch("Miyajima Ropeway Momijidani Station", "紅葉谷站／宮島纜車")}
      ${mapSearch("Shishiiwa Observatory Miyajima", "獅子岩展望台")}
      ${mapSearch("Daisho-in Miyajima", "大聖院")}
      ${mapSearch("Miyajima Omotesando Shopping Street", "表參道商店街")}
      ${mapSearch("Senjokaku Miyajima", "千疊閣")}
      ${mapSearch("Sonoma Miyajima 389-1", "Sonoma 午餐")}
      ${mapSearch("Itsukushima Shrine", "嚴島神社＋大鳥居")}
      ${mapSearch("GEBURA Miyajima", "GEBURA")}
      ${mapSearch("Momijido Main Store Miyajima", "紅葉堂本店")}
      ${mapSearch("Tenshinkaku Miyajima", "天心閣")}
      ${mapSearch("Itsuki Coffee Miyajima", "伊都岐咖啡")}
      ${mapSearch("Nagataya Hiroshima", "晚餐長田屋")}
      ${mapSearch("Bar Upstairs Hiroshima", "Bar Upstairs")}`;

    const notice = d4.querySelector(".notice");
    if (notice) notice.innerHTML = `<strong>D4 重排：</strong>你指定的是「廣島電鐵 2 號線」路面電車，不是地鐵。上島後先搭宮島纜車到獅子岩展望台，保留 90 分鐘，不續走彌山山頂。官方目前列 10/2 非強制預約特定日；前一晚仍須查運行公告，強風、雷雨或臨時停駛時改走大聖院、千疊閣與街區。`;

    const columns = d4.querySelectorAll(".day-columns > section");
    if (columns[0]) columns[0].innerHTML = `
      <h4>時間與動線</h4>
      <p><b>07:20｜飯店出門 → 廣電 2 號線</b><span>步行到廣島站，搭「2 廣電宮島口」路面電車；搭乘時與下車時都刷 Suica／ICOCA。抵宮島口後轉渡輪。<a href="https://maps.app.goo.gl/fPyfT7bYowUfqfut8" target="_blank" rel="noopener noreferrer">你指定的完整路線 ↗</a></span></p>
      <p><b>約 09:05 上島 → 09:30–11:00｜纜車＋獅子岩</b><span>從碼頭步行約 20–25 分至紅葉谷站，搭兩段纜車到獅子岩站，在展望台拍瀨戶內海後原路下山；不續走彌山山頂。官方上行 09:00–16:00、下行末班 16:30，往返成人 ¥2,000；紅葉谷站起算官方約 1 小時，本表含候車與拍照抓 90 分。${mapSearch("Miyajima Ropeway Momijidani Station", "紅葉谷站／纜車山麓站")} ${mapSearch("Shishiiwa Observatory Miyajima", "獅子岩展望台")} <a href="https://miyajima-ropeway.info/english/fare/" target="_blank" rel="noopener noreferrer">官方時間與票價 ↗</a></span></p>
      <p><b>11:15–11:40｜大聖院</b><span>抓 25 分鐘走重點參拜與拍照；08:00–17:00，御朱印授與通常至 16:00，免費參拜。${mapSearch("Daisho-in Miyajima", "大聖院地圖")}</span></p>
      <p><b>11:45–12:05｜表參道短逛</b><span>先沿${mapSearch("Miyajima Omotesando Shopping Street", "表參道商店街")}前往餐廳，下午再回來吃點心與喝咖啡。</span></p>
      <p><b>12:10–13:00｜Sonoma 午餐</b><span>官方列 11:00–17:00，週二至週四休；10/2 週五不衝突。點 Vegan 咖哩，再確認當日版本無動物性高湯。${mapSearch("Sonoma Miyajima 389-1", "Sonoma 地圖")}</span></p>
      <p><b>13:05–13:20｜千疊閣</b><span>抓 15 分鐘看建築與拍照；08:30–16:30，昇殿 ¥100。五重塔目前整修中，不能把完整外觀當保證。${mapSearch("Senjokaku Miyajima", "千疊閣地圖")}</span></p>
      <p><b>13:25–14:10｜嚴島神社＋大鳥居</b><span>10/2 適用 06:30–18:00、¥300；滿潮參考 13:27，抵達時間已盡量貼近滿潮。${mapSearch("Itsukushima Shrine", "嚴島神社地圖")}</span></p>
      <p><b>14:20–15:20｜表參道點心＋咖啡</b><span>${mapSearch("GEBURA Miyajima", "GEBURA")}、${mapSearch("Momijido Main Store Miyajima", "紅葉堂本店")}與${mapSearch("Itsuki Coffee Miyajima", "伊都岐咖啡")}依排隊與胃口擇一至兩站，不要求全部消費。</span></p>
      <p><b>15:25–16:00｜天心閣</b><span>高台咖啡沙龍，官方目前列 13:00–17:00、無休；有坡道與階梯，若上午纜車排隊延誤就刪除此站。${mapSearch("Tenshinkaku Miyajima", "天心閣地圖")}</span></p>
      <p><b>16:10 左右離島 → 約 17:30 回廣島</b><span>回程為了準時吃晚餐，渡輪後優先搭 JR 宮島口 → 廣島；若堅持全程路面電車，至少多留 30 分鐘。</span></p>
      <p><b>18:00｜長田屋晚餐</b><span>點專用 Vegan 廣島燒，不自行加普通醬。${mapSearch("Nagataya Hiroshima", "長田屋地圖")}</span></p>
      <p><b>約 20:00｜Bar Upstairs</b><span>10/2 週五，資料列週一至週六 14:00–24:00（LO 23:30）；胡町 2-19 Grace Building 5F。${mapSearch("Bar Upstairs Hiroshima", "Upstairs 地圖")}</span></p>`;

    if (columns[1]) columns[1].innerHTML = `
      <h4>三餐與備案</h4>
      <p><b>早餐｜Royal Park 房內</b><span>前晚買好的原料合適麵包、原味乳品／豆漿與香蕉；07:20 前吃完。</span></p>
      <p><b>午餐｜Sonoma（素の間）</b><span>目標 Vegan 咖哩；週五營業時段相符，但季節輕食與售罄仍會變動。${mapSearch("Sonoma Miyajima 389-1", "地圖／評論")}</span></p>
      <p><b>下午點心｜紅葉堂、GEBURA、兩間咖啡</b><span>紅葉堂本店、GEBURA、伊都岐咖啡、天心閣均已排入動線；它們是點心／飲料停靠，不取代午餐。每站視胃口與排隊狀況取捨。</span></p>
      <p><b>晚餐｜長田屋 Vegan 廣島燒</b><span>必須點專用 Vegan 菜單，確認麵、油與醬汁；不是普通版去肉。${mapSearch("Nagataya Hiroshima", "地圖／評論")}</span></p>
      <div class="meal-backup"><b>Sonoma 售罄備案</b><p>攜帶前晚買好的完整食品；若需要現做餐，可先確認島上明確標示 Vegan 的店家當日供餐，不用一般咖哩或烏龍麵硬猜高湯。</p></div>`;
  }

  normalizeInlineMaps(d3);
  normalizeInlineMaps(d4);

  const d1Routes = d1?.querySelector(".day-columns > section:first-child");
  attachInlineMaps(d1Routes, [
    ["03:30｜UGO", mapSearch("Taiwan Taoyuan International Airport", "桃園機場")],
    ["CI112", `${mapSearch("Taiwan Taoyuan International Airport", "桃園機場")} ${mapSearch("Hiroshima Airport", "廣島機場")}`],
    ["機場到福山", mapRoute("Hiroshima Airport", "Fukuyama Station", "transit", "廣島機場 → 福山站")],
    ["Sakura 752", mapRoute("Fukuyama Station", "Okayama Station", "transit", "福山站 → 岡山站")],
    ["VIA INN Okayama", mapSearch("VIA INN Okayama", "VIA INN Okayama")],
    ["岡山城＋後樂園", `${mapRoute("VIA INN Okayama", "Okayama Castle", "transit", "飯店 → 岡山城")} ${mapSearch("Okayama Korakuen", "岡山後樂園")}`],
    ["岡山城夜景", `${mapSearch("Tsukimi Bridge Okayama", "月見橋")} ${mapSearch("Okayama Castle", "岡山城外觀")}`],
    ["Ali Baba 晚餐", '<a href="https://maps.app.goo.gl/fnS8pNb4yYBQ7vYQ7" target="_blank" rel="noopener noreferrer">Ali Baba ↗</a>']
  ]);
  const d1Meals = d1?.querySelector(".day-columns > section:nth-child(2)");
  attachInlineMaps(d1Meals, [
    ["華航 VLML", `${mapSearch("Taiwan Taoyuan International Airport", "桃園機場")} ${mapSearch("Hiroshima Airport", "廣島機場")}`],
    ["廣島機場 Y Shop", mapSearch("Y Shop Hiroshima Airport", "Y Shop／廣島機場")],
    ["Ali Baba", '<a href="https://maps.app.goo.gl/fnS8pNb4yYBQ7vYQ7" target="_blank" rel="noopener noreferrer">Ali Baba ↗</a>']
  ]);

  const d2 = document.querySelector("#d2");
  const d2Routes = d2?.querySelector(".day-columns > section:first-child");
  attachInlineMaps(d2Routes, [
    ["VIA INN 直接出發", mapRoute("VIA INN Okayama", "Kurashiki Station", "transit", "飯店 → 倉敷站")],
    ["倉敷站 → 倉敷館", mapRoute("Kurashiki Station", "Kurashiki-kan Tourist Information Office", "walking", "倉敷站 → 售票處")],
    ["倉敷川舟流し", mapSearch("Kurashiki River Boat Kurashiki-kan", "川舟乘船處")],
    ["Café Nature 早餐", mapSearch("Cafe Nature Kurashiki", "Café Nature")],
    ["大原美術館", mapSearch("Ohara Museum of Art", "大原美術館")],
    ["午餐、阿智神社、本町", `${mapSearch("Tsubame Kissashitsu Kurashiki", "つばめ喫茶室")} ${mapSearch("Achi Shrine Kurashiki", "阿智神社")} ${mapSearch("Honmachi Kurashiki", "本町")}`],
    ["TAKU 晚餐", '<a href="https://maps.app.goo.gl/n6aadUknTTQoBJ8z6" target="_blank" rel="noopener noreferrer">TAKU ↗</a>'],
    ["BAR FUKUROU", '<a href="https://maps.app.goo.gl/YFpPm9UonhUhbCaT7" target="_blank" rel="noopener noreferrer">FUKUROU ↗</a>'],
    ["返岡山＋買隔日早餐", `${mapRoute("Kurashiki Station", "VIA INN Okayama", "transit", "倉敷站 → 飯店")} ${mapSearch("Convenience Store Okayama Station", "岡山站超商")}`]
  ]);

  const d5 = document.querySelector("#d5");
  if (d5) {
    const links = d5.querySelector(".map-links");
    if (links) links.innerHTML = `
      ${mapSearch("The Royal Park Hotel Hiroshima Riverside", "Royal Park 飯店")}
      ${mapRoute("The Royal Park Hotel Hiroshima Riverside", "Hiroshima Station Shinkansen Exit", "walking", "飯店 → 新幹線口")}
      ${mapSearch("Hiroshima Station Shinkansen Exit Airport Limousine Bus Stop", "機場巴士站")}
      ${mapRoute("Hiroshima Station", "Hiroshima Airport", "transit", "廣島站 → 廣島機場")}
      ${mapSearch("Hiroshima Airport International Terminal", "廣島機場國際線")}
      ${mapSearch("Taiwan Taoyuan International Airport", "桃園機場")}`;
    attachInlineMaps(d5.querySelector(".day-columns > section:first-child"), [
      ["房內早餐", mapSearch("The Royal Park Hotel Hiroshima Riverside", "Royal Park 飯店")],
      ["離開飯店", mapRoute("The Royal Park Hotel Hiroshima Riverside", "Hiroshima Station Shinkansen Exit", "walking", "飯店 → 新幹線口巴士站")],
      ["機場巴士", mapRoute("Hiroshima Station Shinkansen Exit", "Hiroshima Airport", "transit", "廣島站 → 廣島機場")],
      ["國際線報到", mapSearch("Hiroshima Airport International Terminal", "廣島機場國際線")],
      ["CI113", `${mapSearch("Hiroshima Airport", "廣島機場")} ${mapSearch("Taiwan Taoyuan International Airport", "桃園機場")}`]
    ]);
    attachInlineMaps(d5.querySelector(".day-columns > section:nth-child(2)"), [
      ["飯店房內", mapSearch("The Royal Park Hotel Hiroshima Riverside", "Royal Park 飯店")],
      ["華航 VLML", `${mapSearch("Hiroshima Airport", "廣島機場")} ${mapSearch("Taiwan Taoyuan International Airport", "桃園機場")}`]
    ]);
  }

  const booking = document.querySelector("#booking .booking-grid");
  const flight = booking?.querySelector("article:first-child");
  if (flight) {
    const small = flight.querySelector("small");
    if (small) small.innerHTML = `<strong class="status confirmed">去回程 VLML 蛋奶素餐均已確認</strong>；託運行李三邊小於 160 cm。`;
  }
  if (booking && !booking.querySelector(".klook-transfer")) {
    const card = document.createElement("article");
    card.className = "klook-transfer";
    card.innerHTML = `<span class="status confirmed">已預訂</span><h3>UGO 桃園機場送機</h3><p>9/29 凌晨 03:30 送至桃園機場；上車地點、車輛資訊與等候規則依 UGO 訂單。</p><strong>金額未提供</strong><small>目前未列入網站總預算；提供實付金額後再補入。</small>`;
    booking.appendChild(card);
  }
  const budget = booking?.querySelector(".budget");
  if (budget) {
    const dts = budget.querySelectorAll("dt");
    if (dts[2]) dts[2].textContent = "ecbo 行李寄放預留";
    const small = budget.querySelector("small");
    if (small) small.textContent = "合理範圍約 NT$35,000–37,000；UGO 桃園機場送機、酒吧消費尚未提供實付金額，未計入總額。";
  }

  const tickets = document.querySelector("#tickets");
  if (tickets && !document.querySelector("#ic-cards")) {
    tickets.insertAdjacentHTML("afterend", `
      <section class="section transit-guide" id="ic-cards">
        <div class="section-head"><p>IC CARD GUIDE</p><h2>岡山、尾道、廣島怎麼刷卡。</h2><div class="intro">你的路線使用 Suica／ICOCA 即可，不需要為市區公車另買交通卡。上車與下車都要刷，並先在 JR 車站或便利商店儲值。</div></div>
        <div class="transit-card-grid">
          <article><span>OKAYAMA</span><h3>岡山電車／岡電巴士</h3><p>後門上、前門下；Suica、ICOCA 等全國互通卡，上車刷一次、下車再刷一次。車內通常不能替 Suica／ICOCA 儲值。</p><a href="https://okayama-kido.co.jp/bus/norikata.html" target="_blank" rel="noopener noreferrer">岡電巴士官方 ↗</a><a href="https://okayama-kido.co.jp/tram/how-to-use/" target="_blank" rel="noopener noreferrer">岡山路面電車官方 ↗</a></article>
          <article><span>ONOMICHI</span><h3>尾道市區巴士</h3><p>おのみちバス全線原則可用 Suica／ICOCA 等 10 種互通卡；上車刷藍色讀卡機、下車刷運賃箱旁黃色讀卡機。車內不能儲值。</p><a href="https://onomichibus.jp/route-bus/iccard/" target="_blank" rel="noopener noreferrer">尾道巴士官方 ↗</a></article>
          <article><span>HIROSHIMA</span><h3>廣電路面電車／巴士</h3><p>你的 D4 2 號線是路面電車。使用單人 Suica／ICOCA時，上車與下車都感應；遇到指定車門或讀卡錯誤，從有乘務員的前門處理。</p><a href="https://www.hiroden.co.jp/train/use/index20191001.html" target="_blank" rel="noopener noreferrer">廣電官方乘車方式 ↗</a></article>
        </div>
      </section>`);
  }

  document.querySelector('.hero-secondary[href="#pending"]')?.remove();
  document.querySelector("#overview .status-key .pending")?.remove();

  const pendingSection = document.querySelector("#pending");
  const transportSources = pendingSection?.querySelector(".travel-sources");
  const icGuide = document.querySelector("#ic-cards");
  if (transportSources && icGuide) {
    transportSources.querySelector("b").textContent = "交通／潮汐官方來源";
    icGuide.appendChild(transportSources);
  }
  pendingSection?.remove();
})();
