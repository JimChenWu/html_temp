(() => {
  const overview = document.querySelector("#overview .intro");
  if (overview) overview.textContent = overview.textContent.replace("更新：2026/9/12", "更新：2026/9/21");

  const day = document.querySelector("#d1");
  if (!day) return;

  const badges = day.querySelectorAll(".day-badges span");
  if (badges.length >= 3) {
    badges[1].textContent = "先寄放 28 吋行李";
    badges[2].textContent = "福山主線＋廣島備線";
  }

  const links = day.querySelector(".map-links");
  if (links) {
    links.innerHTML = `
      <a href="https://www.google.com/maps/dir/?api=1&origin=Hiroshima%20Airport&destination=VIA%20INN%20Okayama&waypoints=Fukuyama%20Station&travelmode=transit" target="_blank" rel="noopener noreferrer">路線 A｜經福山到飯店 ↗</a>
      <a href="https://www.google.com/maps/dir/?api=1&origin=Hiroshima%20Airport&destination=VIA%20INN%20Okayama&waypoints=Hiroshima%20Station&travelmode=transit" target="_blank" rel="noopener noreferrer">路線 B｜經廣島到飯店 ↗</a>
      <a href="https://www.viainn.com/okayama/access/" target="_blank" rel="noopener noreferrer">岡山站→飯店入口 ↗</a>
      <a href="https://www.google.com/maps/dir/?api=1&origin=VIA%20INN%20Okayama&destination=Okayama%20Castle&travelmode=transit" target="_blank" rel="noopener noreferrer">寄行李後→岡山城 ↗</a>`;
  }

  const notice = day.querySelector(".notice");
  if (notice) notice.innerHTML = "<b>現場判斷：</b>能搭 12:25 福山巴士就走路線 A；若錯過且不想等到 13:30，立刻改走班次密集的廣島站路線 B。先寄放行李、不等 15:00 入住。";

  const columns = day.querySelectorAll(".day-columns > section");
  const route = columns[0];
  const meals = columns[1];
  if (route) {
    const rows = route.querySelectorAll(":scope > p");
    if (rows.length >= 6) {
      rows[1].innerHTML = "<b>12:25 → 13:30｜推薦：機場到福山</b><span>3 號站牌，¥1,600；非預約制。抵達後轉山陽新幹線往岡山。</span>";
      rows[2].innerHTML = "<b>13:57 → 14:13｜Sakura 752</b><span>目前表列福山 → 岡山；抵達岡山後直接步行至站內直結 VIA INN。28 吋行李若三邊合計超過 160 cm，須使用附特大行李放置區座席。</span>";
      rows[3].innerHTML = "<b>約 14:20｜VIA INN Okayama 寄放行李</b><span>中央／新幹線閘口出站後右轉，從さんすて西館搭電梯到 5 樓。只寄放行李，不等待 15:00 入住。</span>";
      rows[4].innerHTML = "<b>約 14:45–17:45｜岡山城＋後樂園</b><span>飯店下樓後到岡山站前，搭東山行市電至城下；先逛岡山城約 50–60 分，再經月見橋進後樂園。岡山城最終入場 17:00、後樂園最終入園 17:45。</span>";
      rows[5].innerHTML = "<b>約 17:50–18:15｜岡山城夜景</b><span>後樂園離場後可在旭川／月見橋一帶拍日落後亮燈外觀，再搭市電回岡山站。</span>";
      rows[5].insertAdjacentHTML("afterend", "<p><b>約 18:40｜Ali Baba 晚餐</b><span>到店出示飲食限制，確認咖哩、醬料與高湯均不含肉、魚、柴魚、魚露及豬骨；晚餐後回 VIA INN 正式入住。</span></p>");
    }

    route.insertAdjacentHTML("beforeend", `
      <div class="route-timetables" aria-label="廣島機場巴士班次">
        <div><h5>路線 A｜到福山站</h5><table><thead><tr><th>機場發</th><th>福山到</th></tr></thead><tbody>
          <tr><td>09:10</td><td>10:15</td></tr><tr class="recommended"><td>12:25</td><td>13:30</td></tr><tr><td>13:30</td><td>14:35</td></tr><tr><td>16:10</td><td>17:15</td></tr><tr><td>16:55</td><td>18:00</td></tr><tr><td>21:50</td><td>22:55</td></tr>
        </tbody></table><a href="https://www.hij.airport.jp/access/timetable/3.html" target="_blank" rel="noopener noreferrer">機場官方完整時刻表 ↗</a></div>
        <div><h5>路線 B｜到廣島站</h5><table><thead><tr><th>機場發</th><th>廣島到</th></tr></thead><tbody>
          <tr><td>10:35</td><td>11:25</td></tr><tr><td>10:50</td><td>11:40</td></tr><tr><td>11:05</td><td>11:55</td></tr><tr><td>11:15</td><td>12:05</td></tr><tr class="recommended"><td>11:50</td><td>12:40</td></tr><tr><td>12:00</td><td>12:50</td></tr><tr><td>12:10</td><td>13:00</td></tr><tr><td>12:20</td><td>13:10</td></tr><tr><td>12:30</td><td>13:20</td></tr><tr><td>13:05</td><td>13:55</td></tr><tr><td>13:20</td><td>14:10</td></tr><tr><td>13:30</td><td>14:20</td></tr>
        </tbody></table><a href="https://www.hij.airport.jp/access/timetable/2.html" target="_blank" rel="noopener noreferrer">機場官方完整時刻表 ↗</a></div>
      </div>`);
  }

  if (meals) {
    const mealRows = meals.querySelectorAll(":scope > p");
    if (mealRows[2]) mealRows[2].innerHTML = '<b>晚餐｜Ali Baba</b><span>使用你指定的餐廳；入店先出示蛋奶素限制卡，實際點餐以店家確認為準。<br><a href="https://maps.app.goo.gl/fnS8pNb4yYBQ7vYQ7" target="_blank" rel="noopener noreferrer">Ali Baba 地圖／評論 ↗</a></span>';
  }

  const stay = day.querySelector(".stay-line");
  if (stay) stay.insertAdjacentHTML("beforebegin", `
    <div class="night-options">
      <div><p>AFTER DINNER · 現場自由選</p><h4>岡山夜間備選</h4><span>依體力、天氣與實際營業情況決定，不綁死行程。</span></div>
      <nav aria-label="岡山夜間備選地圖">
        <a href="https://www.google.com/maps/search/?api=1&query=AEON%20MALL%20Okayama" target="_blank" rel="noopener noreferrer"><b>永旺夢樂城岡山</b><span>逛街・採買隔日早餐</span></a>
        <a href="https://www.google.com/maps/search/?api=1&query=84%20ESPRESSO%20BAR%20Okayama" target="_blank" rel="noopener noreferrer"><b>84 ESPRESSO&amp;BAR</b><span>咖啡酒吧・出發前再核營業</span></a>
        <a href="https://www.google.com/maps/search/?api=1&query=Nishigawa%20Canal%20Park%20Okayama" target="_blank" rel="noopener noreferrer"><b>西川綠道公園</b><span>免費夜間散步・街拍</span></a>
        <a href="https://www.google.com/maps/search/?api=1&query=WHISKY%20GALLERY%20BAGUS%20Okayama" target="_blank" rel="noopener noreferrer"><b>WHISKY GALLERY BAGUS</b><span>威士忌酒吧</span></a>
        <a href="https://www.google.com/maps/search/?api=1&query=Bar%20Transparence%20Okayama" target="_blank" rel="noopener noreferrer"><b>Bar Transparence</b><span>調酒酒吧</span></a>
      </nav>
    </div>`);
})();
