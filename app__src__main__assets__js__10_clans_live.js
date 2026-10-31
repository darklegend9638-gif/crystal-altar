/* 10_clans_live.js — живое обновление экрана + кланы
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #5 ── */
try{
/* Живое обновление: счётчики гаранта, шансы и всё, что зависит от ивентов/состояния,
   перерисовывается само, без перезагрузки страницы. */
(function(){
  let last="",skip=0;
  const sig=()=>{try{
    const e=ev();
    return [clanLuck(),clanInc(),clanGem(),S.pm,S.ps,S.rolls,S.luck,S.inc,S.gem,TH(PM),TH(PS),
            e.pity||1,e.lk||1,e.la||0,e.rare||1,e.coin||1,e.inc||1,e.disc||1,e.shop||1,e.gain||1,
            (e.ex||[]).length, typeof evSig==="function"?evSig():""].join("|");
  }catch(_){return last}};
  function tick(){
    if(document.hidden||!ready)return;
    if(busy){skip=1;return}
    const k=sig();
    if(k!==last||skip){last=k;skip=0;try{render()}catch(_){}}
  }
  setInterval(tick,1000);
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)tick()});
  addEventListener("focus",tick);addEventListener("pageshow",tick);
  addEventListener("storage",ev2=>{
    try{
      if(TOKEN||busy||ev2.key!==KEY||!ev2.newValue)return;
      S=Object.assign(FRESH(),JSON.parse(ev2.newValue));normS();render();
    }catch(_){}
  });
  last=sig();
  /* снимок состояния для мгновенного показа шансов после перезапуска */
  function snap(){
    try{
      if(!TOKEN||!ready)return;
      const c=Object.assign({},S);delete c._v;delete c._pc;
      localStorage.setItem(GPX+"gacha-snap",JSON.stringify({t:TOKEN,s:c}));
    }catch(_){}
  }
  setInterval(snap,3000);
  addEventListener("pagehide",snap);
  document.addEventListener("visibilitychange",()=>{if(document.hidden)snap()});
})();
}catch(e){try{console.error("[10_clans_live.js #5]",e)}catch(_){}}

/* ── скрипт #6 ── */
try{
(function () {
    let off = !1;
    let LST = [];
    let lt = 0;
    let lf = null;
    let CAPS = null;        // настройки вместимости с сервера (10_clans.sql); null — сервер ещё не обновлён
    let capT = 0;
    let selM = "";          // участник, на которого нажал владелец
    let kt = 0;
    const capOf = tag => CAPS ? CAPS.base + CAPS.step * ((CAPS.lv || {})[String(tag).toUpperCase()] || 0) : 30;
    const isOwner = () => !!(CLAN && me && (CLAN.members || []).some(m => m.role === "owner" && String(m.nick).toLowerCase() === me.nick.toLowerCase()));
    const RKM = { owner: ["👑", "Глава", "Leader"], coleader: ["⭐", "Со-глава", "Co-leader"], veteran: ["🛡️", "Ветеран", "Veteran"] };
    const rkName = k => RKM[k] ? L2(RKM[k][1], RKM[k][2]) : "";
    const mrow = () => CLAN && me ? (CLAN.members || []).find(m => String(m.nick).toLowerCase() === me.nick.toLowerCase()) : null;
    const myRank = () => { const m = mrow(); return m ? (m.role === "owner" ? "owner" : m.rank || "") : ""; };
    async function loadRanks() {   // ранг лежит в role участника: owner / coleader / veteran / member
        (CLAN && CLAN.members || []).forEach(m => { m.rank = m.role === "coleader" || m.role === "veteran" ? m.role : ""; });
    }
    const noSql = e => /Could not find|schema cache/i.test(String(e || ""));
    const emc = e => noSql(e) ? L2("Нужно обновить SQL (10_clans.sql)", "SQL update needed (10_clans.sql)") : srv(String(e || ""));
    async function loadCaps(force) {
        if (!force && CAPS && Date.now() - capT < 30000) {
            return;
        }
        const r = await rpc("g2_clan_caps", TOKEN ? { p_token: TOKEN } : {});
        if (!r.error && r.data && r.data.base != null) {
            CAPS = r.data;
            capT = Date.now();
        }
    }
    const P = $("clanp");
    const B = () => $("clan_body");
    const OFFM = () => L2("Кланы ещё не включены на сервере (нужен 10_clans.sql)", "Clans are not enabled on the server yet (10_clans.sql needed)");
    const em = e => {
        const m = String(e || "");
        if (/Could not find|schema cache/i.test(m)) {
            off = !0;
            return OFFM();
        }
        return srv(m);
    };
    const open = () => P.style.display === "block";
    const typing = () => {
        const a = document.activeElement;
        return !!(a && a.closest && a.closest("#clanp") && a.tagName === "INPUT");
    };
    async function load() {
        if (!TOKEN || off) {
            return;
        }
        const r = await rpc("g2_clan_me", { p_token: TOKEN });
        if (r.error) {
            em(r.error);
            if (open())
                draw();
            return;
        }
        CLAN = r.data && r.data.clan || null;
        const __cs = JSON.stringify(CLAN), __same = (window.__clSg === __cs);
        window.__clSg = __cs;
        const __full = !__same || ((window.__clN = (window.__clN || 0) + 1) % 10 === 0);
        await loadCaps();
        await loadRanks();
        if (__full)
            await loadPerks();
        if (__full) {
            try {
                render();
            }
            catch (e) { }
            if (open() && !typing())
                draw();
        }
    }
    async function loadList() {
        if (!TOKEN || off) {
            return;
        }
        const r = await rpc("g2_clan_list", { p_token: TOKEN });
        if (r.error) {
            em(r.error);
            if (open())
                draw();
            return;
        }
        LST = r.data || [];
        await loadCaps();
        if (open() && !typing())
            draw();
    }
    // строка про вместимость; владельцу — кнопка прокачки
    function capBlock(c) {
        const n = (c.members || []).length;
        let h = `<div style="color:var(--mute);font-size:13px;margin-top:2px">👥 ${L2("Вместимость", "Capacity")}: ${n}/${capOf(c.tag)}</div>`;
        if (CAPS && isOwner()) {
            const lv = (CAPS.lv || {})[String(c.tag).toUpperCase()] || 0;
            if (lv >= CAPS.max) {
                h += `<div style="color:var(--c1);font-size:12px;margin-top:2px">${L2("Вместимость на максимуме", "Capacity maxed")}</div>`;
            }
            else {
                const cost = +CAPS.costs[lv] || 0;
                h += `<div class="row"><button data-a="capup" class="alt">${L2("⬆ Вместимость +", "⬆ Capacity +")}${CAPS.step} · 🪙 ${fmt(cost)}</button></div>`;
            }
        }
        return h;
    }
    // ===== УЛУЧШЕНИЯ КЛАНА: удача / доход / тикеты =====
    let PKMODE = "srv";   // "srv" — общие для клана (нужны RPC g2_clan_perks / g2_clan_perk_up), "local" — только на этом устройстве
    const PK = [
        { k: "luck", ic: "🍀", ru: "Удача клана", en: "Clan luck", dru: "+0.5 ур. удачи за уровень", den: "+0.5 luck level per level", val: l => "+" + (l * .5) + " " + L2("ур.", "lv"), m: 1 },
        { k: "inc", ic: "💰", ru: "Доход клана", en: "Clan income", dru: "+5% к пассивному доходу за уровень", den: "+5% passive income per level", val: l => "+" + l * 5 + "%", m: .8 },
        { k: "gem", ic: "🎫", ru: "Бонус тикетов", en: "Ticket bonus", dru: "+5% тикетов с ежедневных наград за уровень", den: "+5% tickets from daily rewards per level", val: l => "+" + l * 5 + "%", m: 1.2 }
    ];
    const PKC = [200, 400, 700, 1100, 1700, 2600, 3800, 5500, 8000, 12000];
    const pkCost = (k, l) => Math.round(PKC[l] * PK.find(x => x.k === k).m / 10) * 10;
    const pkKey = () => GPX + "gacha-clanperks-" + String(CLAN && CLAN.tag).toUpperCase();
    const canPk = () => PKMODE === "local" || myRank() === "owner" || myRank() === "coleader";
    async function loadPerks() {
        if (!CLAN) {
            CPK = { luck: 0, inc: 0, gem: 0 };
            return;
        }
        const r = await rpc("g2_clan_perks", { p_token: TOKEN });
        if (!r.error && r.data && r.data.lv) {
            PKMODE = "srv";
            CPK = Object.assign({ luck: 0, inc: 0, gem: 0 }, r.data.lv);
        }
        else if (r.error && !noSql(r.error)) {
            return;   // временная ошибка — оставляем что было
        }
        else {
            PKMODE = "local";
            try {
                CPK = Object.assign({ luck: 0, inc: 0, gem: 0 }, JSON.parse(localStorage.getItem(pkKey()) || "{}"));
            }
            catch (e) {
                CPK = { luck: 0, inc: 0, gem: 0 };
            }
        }
    }
    function perkBlock(c) {
        let h = `<h2 style="margin-top:16px">⚡ ${L2("Улучшения клана", "Clan upgrades")}</h2>`;
        PK.forEach(p => {
            const lv = Math.min(10, +CPK[p.k] || 0), mx = lv >= 10;
            h += `<div class="glass ti"><div class="ic">${p.ic}</div><div class="tx"><b>${L2(p.ru, p.en)} · ${lv}/10</b><span>${L2(p.dru, p.den)} · ${L2("сейчас", "now")} ${p.val(lv)}</span><div class="pb"><i style="width:${lv * 10}%;background:linear-gradient(90deg,var(--btn1),var(--btn2))"></i></div></div>${mx ? '<b style="color:var(--c1);flex:none">MAX</b>' : canPk() ? `<button data-a="pkup" data-k="${p.k}">${PKMODE === "local" ? "💎" : "🪙"} ${fmt(pkCost(p.k, lv))}</button>` : ""}</div>`;
        });
        if (PKMODE === "local") {
            h += `<div style="font-size:12px;color:var(--mute);margin-top:6px">${L2("Сервер ещё без этих улучшений — они действуют только на этом устройстве.", "Server has no clan upgrades yet — they apply on this device only.")}</div>`;
        }
        else if (!canPk()) {
            h += `<div style="font-size:12px;color:var(--mute);margin-top:6px">${L2("Улучшения покупает глава или со-глава клана.", "Only the leader or co-leader can buy upgrades.")}</div>`;
        }
        return h;
    }
    // строка участника; владелец может нажать на любого, кроме себя
    function memberRow(m, i) {
        const mine = me && String(m.nick).toLowerCase() === me.nick.toLowerCase();
        const mr = myRank();
        const can = !mine && m.role !== "owner" && (mr === "owner" || (mr === "coleader" && m.rank !== "coleader"));
        const sel = can && selM === m.nick;
        const rk = m.role === "owner" ? "owner" : m.rank || "";
        const ico = RKM[rk] ? RKM[rk][0] + " " : "";
        let h = `<div class="glass ti${mine ? " eq" : ""}${can ? " clk" : ""}"${can ? ` data-a="msel" data-nick="${esc(m.nick)}" style="cursor:pointer"` : ""}><div class="ic">${i < 3 ? ["🥇", "🥈", "🥉"][i] : "#" + (i + 1)}</div><div class="tx"><b>${ico}${esc(m.nick)}</b>${rk ? `<span>${esc(rkName(rk))}</span>` : ""}</div><b style="flex:none">🪙 ${fmt(+m.donated || 0)}</b>${can ? `<span style="flex:none;opacity:.6">${sel ? "▾" : "›"}</span>` : ""}</div>`;
        if (sel) {
            const rb = (k, lbl) => `<button class="${(m.rank || "") === k ? "" : "alt"}" data-a="rk" data-nick="${esc(m.nick)}" data-rank="${k}" style="padding:9px 6px;font-size:12px">${lbl}</button>`;
            h += `<div class="row">${mr === "owner" ? rb("coleader", "⭐ " + rkName("coleader")) : ""}${rb("veteran", "🛡️ " + rkName("veteran"))}${rb("", L2("Без ранга", "No rank"))}</div>`;
            h += `<div class="row"><button class="alt" data-a="kick" data-nick="${esc(m.nick)}" style="border-color:var(--c5);color:var(--c5)">${L2("Исключить из клана", "Kick from clan")}</button><button class="alt" data-a="mx" style="flex:none">✕</button></div>`;
        }
        return h;
    }
    function drawMain() {
        const b = B();
        if (!TOKEN) {
            b.innerHTML = '<div style="color:var(--mute);margin-top:10px">' + L2("Войди в аккаунт, чтобы вступить в клан", "Sign in to join a clan") + '</div>';
            return;
        }
        if (off) {
            b.innerHTML = '<div style="color:var(--c5);margin-top:10px">' + OFFM() + '</div>';
            return;
        }
        if (CLAN) {
            const c = CLAN;
            const mx = c.level >= 10;
            const pct = mx ? 100 : Math.min(100, c.pool / c.next * 100);
            b.innerHTML = `<div style="font:800 19px var(--fh);margin-top:10px">[${esc(c.tag)}] ${esc(c.name)}</div><div style="color:var(--mute);font-size:13px;margin-top:2px">${L2("Уровень", "Level")} ${c.level}/10 · ${L2("бонус монет", "coin bonus")} +${c.level * 3}%</div><div style="font-size:14px;margin-top:6px">🏦 ${L2("Казна клана", "Clan treasury")}: <b>🪙 ${fmt(+c.bank || 0)}</b></div><div style="font-size:12px;color:var(--mute);margin-top:2px">${L2("Улучшения покупаются за монеты из казны", "Upgrades are bought with coins from the treasury")}</div>${capBlock(c)}${perkBlock(c)}<div style="height:8px;border-radius:6px;background:var(--line);margin:10px 0 4px;overflow:hidden"><i style="display:block;height:100%;width:${pct}%;background:linear-gradient(90deg,var(--btn1),var(--btn2))"></i></div><div style="font-size:13px;color:var(--mute)">${mx ? "MAX" : "🪙 " + fmt(c.pool) + " / " + fmt(c.next) + " " + L2("до следующего уровня", "to next level")}</div>` + (`<div class="row"><input id="cl_amt" type="number" min="1" value="${window.__clAmt||1}" inputmode="numeric"><button class="alt" data-a="all" style="flex:none">${L2("Все", "All")}</button><button data-a="don" style="flex:none">${L2("Вложить 🪙", "Donate 🪙")}</button></div><div style="font-size:12px;color:var(--mute);margin-top:4px">${L2("У тебя", "You have")}: 🪙 <span class="cl-have">${fmt(S.coins || 0)}</span></div>`) + `<h2 style="margin-top:16px">${L2("Топ вкладчиков клана", "Clan top donors")} (${c.members.length})</h2>` + c.members.map((m, i) => memberRow(m, i)).join("") + `<div class="row"><button class="alt" data-a="leave" style="border-color:var(--c5);color:var(--c5)">${L2("Покинуть клан", "Leave clan")}</button></div>`;
            return;
        }
        b.innerHTML = `<div style="color:var(--mute);font-size:13px;margin-top:6px">${L2("Клан даёт +3% к монетам за каждый уровень (до +30%). Уровень качается монетами участников.", "A clan gives +3% coins per level (up to +30%). Levels are upgraded with members' coins.")}</div><h2>${L2("Создать клан", "Create clan")}</h2><div class="row"><input id="cl_name" maxlength="16" placeholder="${L2("Название", "Name")}"><input id="cl_tag" maxlength="4" placeholder="TAG" style="flex:none;width:90px;text-transform:uppercase"></div><div class="row"><button data-a="create">${L2("Создать", "Create")} · 💎 500</button></div><h2>${L2("Кланы", "Clans")}</h2>` + (LST.length ? LST.map(x => `<div class="glass ti"><div class="tx"><b>[${esc(x.tag)}] ${esc(x.name)}</b><span>${L2("Ур.", "Lv")} ${x.level} · ${x.members}/${capOf(x.tag)}</span></div><button data-a="join" data-id="${x.id}" ${x.members >= capOf(x.tag) ? "disabled" : ""}>${L2("Вступить", "Join")}</button></div>`).join("") : `<div style="color:var(--mute);font-size:13px">${L2("Пока нет кланов", "No clans yet")}</div>`);
    }
    let TOPV = false, TOP = null, topErr = "";
    const topTabs = () => `<div class="row" style="margin-top:8px"><button class="${TOPV ? "alt" : ""}" data-a="tb" style="padding:9px">🏰 ${L2("Клан", "Clan")}</button><button class="${TOPV ? "" : "alt"}" data-a="tt" style="padding:9px">🏆 ${L2("Топ кланов", "Clan top")}</button></div>`;
    function drawTop() {
        const b = B();
        let h = topTabs() + `<div style="color:var(--mute);font-size:13px;margin:10px 0 2px">${L2("Кто больше всех вложил в казну", "Who donated the most to the treasury")}</div>`;
        if (topErr) {
            h += `<div style="color:var(--c5);margin-top:10px">${esc(topErr)}</div>`;
        }
        else if (!TOP) {
            h += `<div style="color:var(--mute);margin-top:10px">${L2("Загрузка…", "Loading…")}</div>`;
        }
        else if (!TOP.length) {
            h += `<div style="color:var(--mute);margin-top:10px">${L2("Пока нет кланов", "No clans yet")}</div>`;
        }
        else {
            h += TOP.map((x, i) => {
                const mine = CLAN && String(CLAN.tag).toUpperCase() === String(x.tag).toUpperCase();
                return `<div class="glass ti${mine ? " eq" : ""}"><div class="ic">${i < 3 ? ["🥇", "🥈", "🥉"][i] : "#" + (i + 1)}</div><div class="tx"><b>[${esc(x.tag)}] ${esc(x.name)}</b><span>${L2("Ур.", "Lv")} ${x.level} · 👥 ${x.members}</span></div><b style="flex:none">🪙 ${fmt(+x.total || 0)}</b></div>`;
            }).join("");
        }
        b.innerHTML = h;
    }
    async function loadTop() {
        const r = await rpc("g2_clan_top", { p_token: TOKEN });
        if (r.error) {
            topErr = noSql(r.error) ? L2("Нужно обновить SQL (10_clans.sql)", "SQL update needed (10_clans.sql)") : srv(String(r.error));
            TOP = null;
        }
        else {
            topErr = "";
            TOP = (r.data || []).slice().sort((a, b) => (+b.total || 0) - (+a.total || 0));
        }
        if (open() && TOPV)
            drawTop();
    }
    let SETV = false;
    function drawSet() {
        const c = CLAN;
        B().innerHTML = `<div class="row" style="margin-top:8px"><button class="alt" data-a="setb" style="flex:none;padding:9px 14px">← ${L2("Назад", "Back")}</button></div><h2 style="margin-top:14px">⚙ ${L2("Настройки клана", "Clan settings")}</h2><div style="color:var(--mute);font-size:12px;margin-bottom:4px">${L2("Название", "Name")}</div><div class="row" style="margin-top:0"><input id="cl_sname" maxlength="16" value="${esc(c.name)}"></div><div style="color:var(--mute);font-size:12px;margin:10px 0 4px">${L2("Тег (2–4 символа, латиница или цифры)", "Tag (2–4 letters or digits)")}</div><div class="row" style="margin-top:0"><input id="cl_stag" maxlength="4" value="${esc(c.tag)}" style="text-transform:uppercase"></div><div class="row"><button data-a="setsave">${L2("Сохранить", "Save")}</button></div>`;
    }
    function draw() {
        if (SETV && CLAN && isOwner() && TOKEN && !off) {
            drawSet();
            return;
        }
        SETV = false;
        if (TOPV && TOKEN && !off) {
            drawTop();
            return;
        }
        drawMain();
        if (TOKEN && !off) {
            B().insertAdjacentHTML("afterbegin", topTabs() + (CLAN && isOwner() ? `<div class="row" style="margin-top:8px"><button class="alt" data-a="sets" style="padding:9px">⚙ ${L2("Настройки клана", "Clan settings")}</button></div>` : ""));
        }
    }
    P.addEventListener("click", async function (e) {
        const t = e.target.closest("[data-a=sets],[data-a=setb],[data-a=setsave],[data-a=rk]");
        if (!t || t.disabled) {
            return;
        }
        const a = t.dataset.a;
        if (a === "sets") {
            SETV = true;
            draw();
        }
        else if (a === "setb") {
            SETV = false;
            draw();
        }
        else if (a === "setsave") {
            const n = $("cl_sname").value.trim();
            const g = $("cl_stag").value.trim().toUpperCase();
            if (n.length < 3) {
                return toast(L2("Название: от 3 символов", "Name: 3+ characters"), "err");
            }
            if (!/^[A-Z0-9]{2,4}$/.test(g)) {
                return toast(L2("Тег: 2–4 символа, латиница или цифры", "Tag: 2–4 letters or digits"), "err");
            }
            t.disabled = !0;
            const r = await rpc("g2_clan_edit", { p_token: TOKEN, p_name: n, p_tag: g });
            t.disabled = !1;
            if (r.error) {
                return toast(noSql(r.error) ? L2("Нужно обновить SQL (10_clans.sql)", "SQL update needed (10_clans.sql)") : srv(String(r.error)), "err");
            }
            
            SETV = false;
            await load();
            await loadCaps(!0);
            draw();
        }
        else if (a === "rk") {
            t.disabled = !0;
            const r = await rpc("g2_clan_set_rank", { p_token: TOKEN, p_nick: t.dataset.nick, p_rank: t.dataset.rank });
            t.disabled = !1;
            if (r.error) {
                return toast(noSql(r.error) ? L2("Нужно обновить SQL (10_clans.sql)", "SQL update needed (10_clans.sql)") : srv(String(r.error)), "err");
            }
            toast(L2("Ранг изменён", "Rank changed"), "ok");
            selM = "";
            await load();
        }
    });
    P.addEventListener("click", function (e) {
        const t = e.target.closest("[data-a=tt],[data-a=tb]");
        if (!t) {
            return;
        }
        TOPV = t.dataset.a === "tt";
        if (TOPV) {
            drawTop();
            loadTop();
        }
        else {
            draw();
        }
    });
    P.addEventListener("click", async function (e) {
        const t = e.target.closest("[data-a]");
        if (!t || t.disabled) {
            return;
        }
        const a = t.dataset.a;
        if (a === "create") {
            const n = $("cl_name").value.trim();
            const g = $("cl_tag").value.trim().toUpperCase();
            if (n.length < 3) {
                return toast(L2("Название: от 3 символов", "Name: 3+ characters"), "err");
            }
            if (!/^[A-Z0-9]{2,4}$/.test(g)) {
                return toast(L2("Тег: 2–4 символа, латиница или цифры", "Tag: 2–4 letters or digits"), "err");
            }
            if ((S.gem || 0) < 500) {
                return toast(L2("Нужно 500 💎", "Need 500 💎"), "err");
            }
            t.disabled = !0;
            const r = await rpc("g2_clan_create", { p_token: TOKEN, p_name: n, p_tag: g });
            t.disabled = !1;
            if (r.error) {
                return toast(em(r.error), "err");
            }
            S.gem -= 500;
            render();
            save();
            pushSoon();
            try { localStorage.removeItem(GPX + "gacha-clanperks-" + g); } catch (x) { }   // новый клан — без старых баффов с таким же тегом
            CPK = { luck: 0, inc: 0, gem: 0 };
            if (CAPS && CAPS.lv) { delete CAPS.lv[g]; }
            toast(L2("Клан создан", "Clan created"), "ok");
            capT = 0;
            await load();
        }
        else if (a === "join") {
            t.disabled = !0;
            let r = await rpc("g2_clan_join_cap", { p_token: TOKEN, p_id: +t.dataset.id });
            if (r.error && noSql(r.error)) {   // сервер ещё без 10_clans.sql — вступаем по-старому
                r = await rpc("g2_clan_join", { p_token: TOKEN, p_id: +t.dataset.id });
            }
            t.disabled = !1;
            if (r.error) {
                return toast(em(r.error), "err");
            }
            toast(L2("Ты в клане", "Joined the clan"), "ok");
            await load();
        }
        else if (a === "all") {
            const n = Math.max(1, Math.floor(S.coins || 0));
            const inp = $("cl_amt");
            if (inp) {
                inp.value = n;
                window.__clAmt = n;
            }
            return;
        }
        else if (a === "don") {
            const n = Math.floor(+$("cl_amt").value || 0);
            if (n < 1) {
                return;
            }
            if (n > Math.floor(S.coins || 0)) {
                return toast(L2("Не хватает монет", "Not enough coins"), "err");
            }
            t.disabled = !0;
            const r = await serial(async () => {
                await trFlush();   // сервер проверяет монеты по сохранению
                return await rpc("g2_clan_donate_coins", { p_token: TOKEN, p_coins: n });
            });
            t.disabled = !1;
            if (r.error) {
                return toast(noSql(r.error) ? emc(r.error) : em(r.error), "err");
            }
            await resync();   // сервер сам списал монеты — забираем актуальный баланс, без двойного списания
            if (CLAN && r.data && r.data.bank != null) {
                CLAN.bank = +r.data.bank;
            }
            render();
            toast(L2("Вложено в казну: ", "Donated to treasury: ") + fmt(n) + " 🪙", "ok");
            await load();
        }
        else if (a === "msel") {
            selM = selM === t.dataset.nick ? "" : t.dataset.nick;
            kt && (clearTimeout(kt), kt = 0);
            draw();
        }
        else if (a === "mx") {
            selM = "";
            draw();
        }
        else if (a === "kick") {
            if (!kt) {
                t.textContent = L2("Точно? Нажми ещё раз", "Sure? Tap again");
                kt = setTimeout(function () {
                    kt = 0;
                    draw();
                }, 4000);
                return;
            }
            clearTimeout(kt);
            kt = 0;
            const nick = t.dataset.nick;
            t.disabled = !0;
            const r = await rpc("g2_clan_kick", { p_token: TOKEN, p_nick: nick });
            t.disabled = !1;
            if (r.error) {
                return toast(emc(r.error), "err");
            }
            selM = "";
            toast(L2("Игрок исключён: ", "Player kicked: ") + nick, "ok");
            await load();
            loadList();
        }
        else if (a === "capup") {
            if (!CAPS || !CLAN) {
                return;
            }
            const lv = (CAPS.lv || {})[String(CLAN.tag).toUpperCase()] || 0;
            const cost = +CAPS.costs[lv] || 0;
            if ((+CLAN.bank || 0) < cost) {
                return toast(L2("В казне не хватает монет", "Not enough coins in the clan treasury"), "err");
            }
            t.disabled = !0;
            const r = await serial(async () => await rpc("g2_clan_cap_up", { p_token: TOKEN }));
            t.disabled = !1;
            if (r.error) {
                return toast(emc(r.error), "err");
            }
            const d = r.data || {};
            CLAN.bank = d.bank != null ? +d.bank : Math.max(0, (+CLAN.bank || 0) - cost);
            CAPS.lv = CAPS.lv || {};
            CAPS.lv[String(CLAN.tag).toUpperCase()] = +d.lvl || lv + 1;
            toast(L2("Вместимость клана: ", "Clan capacity: ") + (d.cap || capOf(CLAN.tag)), "ok");
            draw();
            await loadCaps(!0);
            await load();
            draw();
        }
        else if (a === "pkup") {
            const k = t.dataset.k, lv = Math.min(10, +CPK[k] || 0);
            if (!CLAN || lv >= 10) {
                return;
            }
            const cost = pkCost(k, lv);
            if (PKMODE === "srv") {
                if ((+CLAN.bank || 0) < cost) {
                    return toast(L2("В казне не хватает монет", "Not enough coins in the clan treasury"), "err");
                }
                t.disabled = !0;
                const r = await serial(async () => await rpc("g2_clan_perk_up", { p_token: TOKEN, p_perk: k }));
                t.disabled = !1;
                if (r.error) {
                    if (noSql(r.error)) {
                        PKMODE = "local";
                        draw();
                        return toast(L2("Сервер без улучшений клана — нажми ещё раз (локально)", "Server has no clan upgrades — tap again (local)"), "err");
                    }
                    return toast(srv(String(r.error)), "err");
                }
                const d = r.data || {};
                CLAN.bank = d.bank != null ? +d.bank : Math.max(0, (+CLAN.bank || 0) - cost);
                CPK[k] = +d.lvl || lv + 1;
            }
            else {   // старый сервер без улучшений: только на этом устройстве, за тикеты
                if ((S.gem || 0) < cost) {
                    return toast(L2("Не хватает тикетов", "Not enough tickets"), "err");
                }
                S.gem -= cost;
                CPK[k] = lv + 1;
                try {
                    localStorage.setItem(pkKey(), JSON.stringify(CPK));
                }
                catch (x) { }
                render();
                save();
                pushSoon();
            }
            render();
            toast(L2("Улучшено: ", "Upgraded: ") + L2(PK.find(x => x.k === k).ru, PK.find(x => x.k === k).en) + " " + CPK[k] + "/10", "ok");
            draw();
            load();
        }
        else if (a === "leave") {
            if (!lt) {
                t.textContent = L2("Точно? Нажми ещё раз", "Sure? Tap again");
                lt = setTimeout(function () {
                    lt = 0;
                    draw();
                }, 4000);
                return;
            }
            clearTimeout(lt);
            lt = 0;
            const _lastOne = !!(CLAN && (CLAN.members || []).length <= 1), _ltag = CLAN ? String(CLAN.tag).toUpperCase() : "";
            const r = await rpc("g2_clan_leave", { p_token: TOKEN });
            if (r.error) {
                return toast(em(r.error), "err");
            }
            if (_lastOne && _ltag) {   // клан распался — сбрасываем баффы (удача, тикеты, доход) и вместимость
                try { localStorage.removeItem(GPX + "gacha-clanperks-" + _ltag); } catch (x) { }
                if (CAPS && CAPS.lv) { delete CAPS.lv[_ltag]; }
            }
            CPK = { luck: 0, inc: 0, gem: 0 };
            CLAN = null;
            capT = 0;
            try {
                render();
            }
            catch (x) { }
            toast(L2("Ты покинул клан", "You left the clan"), "ok");
            draw();
            loadList();
        }
    });
    $("clanBtn").onclick = function () {
        draw();
        openPanel("clanp");
        load();
        loadList();
    };
    {
        const _rp = renderProf;
        renderProf = function () {
            _rp();
            $("clanBtn").style.display = "";
        };
        renderProf();
    }
    setInterval(function () {
        try {
            if (!TOKEN || !me) {
                if (CLAN) {
                    CLAN = null;
                    render();
                }
                lf = null;
                return;
            }
            if (ready && lf !== me.nick) {
                lf = me.nick;
                load();
            }
        }
        catch (e) { }
    }, 500);
    setInterval(window.__one(function () { if (TOKEN && ready && !document.hidden)
        return load(); }), 4000);
    Object.assign(TX, { "Кланы": "Clans" });
    applyStatic();
})();
}catch(e){try{console.error("[10_clans_live.js #6]",e)}catch(_){}}
