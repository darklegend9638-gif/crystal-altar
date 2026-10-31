/* 03_game.js — ГЛАВНОЕ: данные предметов и вся основная логика игры
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #4 ── */
const R=[{n:"Common",ru:"Обычный",w:0,v:1,c:"var(--c0)",items:["🥢 Новичок-ученик"]},{n:"Uncommon",ru:"Необычный",w:28.5,v:2,c:"var(--c1)",items:["🌀 Тень-разведчик"]},{n:"Rare",ru:"Редкий",w:17.5,v:4,c:"var(--c2)",items:["🍃 Лесной страж"]},{n:"Epic",ru:"Эпический",w:8.5,v:10,c:"var(--c3)",items:["🔥 Мастер огня"]},{n:"Legendary",ru:"Легендарный",w:1,v:40,c:"#ff7a1a",items:["🎴 Тихий клинок"]},{n:"Mythic",ru:"Мифический",w:.05,v:150,c:"var(--c5)",items:["🐍 Хранитель свитков"]},{n:"Secret",ru:"Секретный",w:.004,v:600,c:"#0b0b10",items:["🏯 Владыка клана"]},{n:"Divine",ru:"Божественный",w:.0004,v:2500,c:"var(--c7)",items:["🦊 Дух лисы"]},{n:"Astral",ru:"Астрал",w:1.01e-5,v:5000,c:"#56e0ff",items:["🌕 Лунный Мудрец"]}];R[0].w=+(100-R.slice(1).reduce((e,t)=>e+t.w,0)).toFixed(4);const ALL=[];R.forEach((e,t)=>e.items.forEach(n=>ALL.push({i:t,t:n})));const RA=e=>R[e],$=e=>document.getElementById(e);const devLang=()=>{try{const l=(navigator.languages&&navigator.languages[0])||navigator.language||"ru";return/^(ru|uk|be|kk)/i.test(l)?"ru":"en"}catch(e){return"ru"}};let LANG=devLang();const D={gal:["Из галереи","From gallery"],avbad:["Не удалось загрузить картинку","Could not load the image"],avcut:["Сервер обрезает аватарку — нужно обновить SQL. Вернул прежнюю.","The server truncates avatars — the SQL needs updating. Restored the previous one."],pnone:["Никого не найдено — можно ввести ник вручную","Nobody found — you can type a nickname"],player:["Игрок","Player"],owner:["Владелец","Owner"],admin:["Админ","Admin"],logout:["Выйти","Log out"],guest:["Гость","Guest"],login:["Войти","Sign in"],signin:["Вход","Sign in"],createProf:["Создай профиль","Create profile"],create:["Создать","Create"],wait:["Подождите…","Please wait…"],nickrule:["Ник: 3–16 символов — буквы, цифры, _ и -","Nickname: 3–16 characters — letters, digits, _ and -"],pwmin:["Пароль: минимум 4 символа","Password: at least 4 characters"],pwmin2:["Новый пароль: минимум 4 символа","New password: at least 4 characters"],nickwait:["Ник можно сменить через {0} дн.","You can change your nickname in {0} d."],samenick:["Это ваш текущий ник","This is your current nickname"],nickok:["Ник изменён","Nickname changed"],avok:["Аватарка сохранена","Avatar saved"],pwok:["Пароль изменён","Password changed"],noconn:["Нет связи с сервером","No connection to the server"],retry:["Нет связи с сервером, повторяю…","No connection to the server, retrying…"],revoke:["Забрать","Revoke"],grant:["Выдать","Grant"],nobodyyet:["Пока никого","Nobody yet"],nobody:["Никого","Nobody"],luckmax:["Удача на максимуме ({0})","Luck maxed ({0})"],luckup:["Удача {0} → {1} · {2}","Luck {0} → {1} · {2}"],incmax:["Доход на максимуме","Income maxed"],incup:["Доход {0}→{1}/с · {2}","Income {0}→{1}/s · {2}"],pity:["Гарант: Legendary через {0} рл. · Mythic через {1} рл. · Secret через {2} рл. · доход {3}/с","Pity: Legendary in {0} rolls · Mythic in {1} rolls · Secret in {2} rolls · income {3}/s"],maxd:["На максимуме удачи ({0}) шанс Divine: {1}% ({2})","At max luck ({0}) Divine chance: {1}% ({2})"],colcnt:["{0}/{1} · бонус монет +{2}%","{0}/{1} · coin bonus +{2}%"],oneIn:["1 из ","1 in "],byadm:["Выдано админом","Given by admin"],meopt:["Я (себя)","Me (myself)"],gwho:["Кого изменить…","Who to change…"],ggive:["Выдать админа","Make admin"],gtake:["Забрать админа","Remove admin"],gpick:["Сначала выберите игрока","Pick a player first"],galready:["У него уже есть админка","Already an admin"],gnot:["У него нет админки","Not an admin"],edited:["Изменено у {0}","Updated {0}"],ownerdel:["Владелец не может удалить аккаунт","The owner cannot delete the account"],delmis:["Ник не совпадает","Nickname does not match"],error:["Ошибка","Error"],tlogin:["Сначала войди в аккаунт","Log in first"],tnick:["Введите ник получателя","Enter the recipient's nickname"],tamt:["Введите сумму","Enter an amount"],tself:["Нельзя переводить самому себе","You can't send coins to yourself"],tmoney:["Недостаточно монет","Not enough coins"],tsent:["Отправлено {0} 🪙 игроку {1}","Sent {0} 🪙 to {1}"],tgot:["Вам перевели монеты","You received coins"],tgotx:["Получено {0} 🪙 от: {1}","Received {0} 🪙 from: {1}"],tnot:["Переводы пока не включены на сервере","Transfers are not enabled on the server yet"],evon:["Ивент запущен: {0}","Event started: {0}"],evmax:["Максимум — 30 дней","Maximum is 30 days"],evmin:["Укажите длительность","Enter a duration"],evoff:["Ивент остановлен","Event stopped"],evnext:["Следующий ивент через","Next event in"],evaon:["Автоивенты: включены (нажми, чтобы выключить)","Auto events: on (tap to turn off)"],evaoff:["Автоивенты: выключены (нажми, чтобы включить)","Auto events: off (tap to turn on)"],topnot:["Топ пока не включён на сервере (нужен 05_top.sql)","Leaderboard is not enabled on the server yet (05_top.sql needed)"],topme:["Твоё место: #{0} · 🪙 {1}","Your rank: #{0} · 🪙 {1}"],topempty:["Пока никого нет","Nobody here yet"],evnot:["Ивенты не включены на сервере (нужен 07_events.sql)","Events are not enabled on the server (07_events.sql needed)"],done:["Готово","Done"],wiped:["Прогресс всех игроков успешно обнулён.","All players' progress has been wiped."]},tr=(e,...t)=>{let n=D[e][LANG==="en"?1:0];return t.forEach((o,a)=>n=n.split("{"+a+"}").join(o)),n},IT={};const iname=e=>LANG==="en"&&IT[e]?IT[e]:e.slice(e.indexOf(" ")+1),rname=e=>RA(e).n,rn=e=>RA(e).n,SRV={"Нельзя заблокировать этого игрока":"You can't ban this player","Игрок заблокирован":"Player banned","Этот ник уже занят":"This nickname is already taken","Неверный ник или пароль":"Wrong nickname or password","Текущий пароль неверный":"Current password is incorrect","Нет доступа":"Access denied","Ошибка сервера":"Server error","Игрок не найден":"Player not found","Некорректное сохранение":"Invalid save","Владелец не может удалить аккаунт":"The owner cannot delete the account","Недостаточно монет":"Not enough coins","Нельзя переводить себе":"You can't send coins to yourself","Некорректная сумма":"Invalid amount"},SRVX={"Сессия недействительна, войдите заново":"Session expired — please sign in again","Ник: 3–16 символов — буквы, цифры, _ и -":"Nickname: 3–16 characters — letters, digits, _ and -","Пароль: минимум 4 символа":"Password: at least 4 characters","Новый пароль: минимум 4 символа":"New password: at least 4 characters","Нет прав":"Access denied","Неверная роль":"Invalid role","Неизвестный ивент":"Unknown event","Промокод не найден":"Promo code not found","Срок промокода истёк":"This promo code has expired","Промокод закончился":"This promo code has run out of uses","Вы уже использовали этот промокод":"You have already used this promo code","Код: 3–24 символа — латиница, цифры, _ и -":"Code: 3–24 characters — Latin letters, digits, _ and -","Некорректная награда":"Invalid reward","Некорректный лимит активаций":"Invalid uses limit","Некорректный срок":"Invalid duration","Такой промокод уже есть":"This promo code already exists","Некорректное предложение":"Invalid offer","Нельзя меняться с собой":"You can't trade with yourself","У вас нет столько предметов или денег":"You don't have enough items or currency","У игрока нет столько предметов или денег":"The player doesn't have enough items or currency","Слишком много активных предложений (макс. 10)":"Too many active offers (max 10)","Предложение уже не активно":"This offer is no longer active","Отправитель недоступен":"The sender is unavailable","У отправителя уже нет нужных предметов или денег":"The sender no longer has the required items or currency","У вас нет нужных предметов или денег":"You don't have the required items or currency","Не хватает тикетов":"Not enough tickets","Название: 3–16 символов":"Name: 3–16 characters","Название содержит недопустимые символы":"Name contains invalid characters","Тег: 2–4 символа, латиница или цифры":"Tag: 2–4 characters, Latin letters or digits","Ты уже в клане":"You're already in a clan","Название или тег уже заняты":"This name or tag is already taken","Клан не найден":"Clan not found","В клане нет свободных мест":"The clan is full","Ты не в клане":"You're not in a clan","Вы не в клане":"You're not in a clan","Только владелец клана может прокачивать вместимость":"Only the clan leader can upgrade capacity","Вместимость уже максимальная":"Capacity is already maxed","Неизвестное улучшение":"Unknown upgrade","Улучшения покупает глава или со-глава клана":"Only the leader or a co-leader can buy upgrades","Улучшение уже максимальное":"This upgrade is already maxed","Недостаточно прав":"Insufficient permissions","Некорректный ранг":"Invalid rank","Со-главу назначает только глава":"Only the leader can appoint a co-leader","Игрок не состоит в вашем клане":"This player is not in your clan","Нельзя менять свой ранг":"You can't change your own rank","Нельзя менять ранг главы":"You can't change the leader's rank","Нельзя менять ранг со-главы":"You can't change a co-leader's rank","Только глава или со-глава может исключать участников":"Only the leader or a co-leader can kick members","Нельзя исключить самого себя":"You can't kick yourself","Нельзя исключить главу":"You can't kick the leader","Со-главу исключает только глава":"Only the leader can kick a co-leader","Только глава может менять настройки клана":"Only the leader can change clan settings","В казне не хватает монет":"Not enough coins in the clan treasury"},srv=e=>{if(/trade_(self|partner)_too_young/.test(String(e))&&typeof trErr==="function")return trErr(e);e=String(e).replace(/алмаз/g,"тикет").replace(/Алмаз/g,"Тикет");if(LANG!=="en")return e;const s=String(e);if(SRV[s])return SRV[s];if(SRVX[s])return SRVX[s];let m=/^Аккаунт заблокирован(?:: ([\s\S]*))?$/.exec(s);if(m)return"Account is banned"+(m[1]?": "+m[1]:"");m=/^Ник можно сменить через (\d+) дн\.$/.exec(s);if(m)return"You can change your nickname in "+m[1]+" d.";return e},TX={"Профили игроков":"Player profiles","Музыка: вкл":"Music: on","📜 Журнал действий":"📜 Action log",Модерация:"Moderation","Выберите игрока:":"Choose a player:","Причина (необязательно)":"Reason (optional)",Забанить:"Ban",Разбанить:"Unban","Очистить профиль":"Clear profile","Мини-игры":"Mini-games","Кристальный алтарь":"Crystal Altar","Бросай, качай удачу, собери всё — вплоть до Astral":"Roll, upgrade your luck, collect everything — up to Astral","Изменить профиль":"Edit profile",Выйти:"Log out","Админ панель":"Admin panel","Очистить весь прогресс":"Wipe all progress","👤 Изменить профиль":"👤 Edit profile","🛠️ Админ панель":"🛠️ Admin panel","🗑️ Очистить весь прогресс":"🗑️ Wipe all progress","🪙 Монеты":"🪙 Coins","🍀 Удача":"🍀 Luck","🎲 Роллы":"🎲 Rolls","Сделай первый ролл":"Make your first roll","Копи монеты и бросай":"Save coins and roll","Ролл · 10":"Roll · 10","Шансы с учётом удачи":"Odds with luck",Коллекция:"Collection","Настройки профиля":"Profile settings",Аватарка:"Avatar","Сохранить аватарку":"Save avatar","Никнейм (меняется раз в 7 дней)":"Nickname (changes once every 7 days)",Сменить:"Change",Пароль:"Password","Админ-панель":"Admin panel","Выдать доступ к админке":"Grant admin access","Заходили на сайт:":"Visited the site:","Есть доступ:":"Has access:","Выдать монеты":"Give coins","Забрать монеты":"Take coins","Уровень удачи":"Luck level","Выдать предмет":"Give item","Открыть всю коллекцию":"Unlock the whole collection","⚠️ Обнуление прогресса":"⚠️ Progress wipe","Вы уверены, что хотите обнулить прогресс всех игроков?":"Are you sure you want to wipe all players' progress?","Это действие нельзя отменить.":"This cannot be undone.",Отмена:"Cancel",Обнулить:"Wipe",Понятно:"OK",Регистрация:"Sign up",Вход:"Sign in",Позже:"Later","Новый ник":"New nickname","Текущий пароль":"Current password","Новый пароль (от 4 символов)":"New password (4+ characters)",Никнейм:"Nickname","Пароль (от 4 символов)":"Password (4+ characters)",Меню:"Menu",Закрыть:"Close","Удалить аккаунт":"Delete account","⚠️ Удаление аккаунта":"⚠️ Delete account","Аккаунт и весь ваш прогресс будут удалены навсегда. Для подтверждения введите свой ник.":"Your account and all progress will be permanently deleted. Type your nickname to confirm.",Удалить:"Delete","Кого изменить:":"Whom to edit:","Уровень дохода":"Income level","Топ по монетам":"Coins leaderboard",Топ:"Top","Ивенты (для всех игроков)":"Events (for all players)","Запустить ивент":"Start event","Остановить ивент":"Stop event",Минут:"Minutes","Кол-во":"Amount",Минуты:"Minutes",Часы:"Hours",Дни:"Days","Максимум 30 дней":"Maximum 30 days",Переводы:"Transfers","💸 Переводы":"💸 Transfers","Отправь монеты другому игроку":"Send coins to another player","Ник получателя":"Recipient nickname","Поиск игрока или ник":"Search player or nickname",Сумма:"Amount",Отправить:"Send",Магазин:"Shop","🛒 Магазин":"🛒 Shop","Покупай питомцев и геймпассы за тикеты":"Buy pets and game passes with tickets"},o0=new WeakMap;function applyStatic(){const e=LANG==="en",t=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;for(;n=t.nextNode();){if(n.parentNode.tagName==="SCRIPT")continue;const o=o0.has(n)?o0.get(n):n.nodeValue,a=o.trim();TX[a]&&(o0.set(n,o),n.nodeValue=e?o.replace(a,TX[a]):o)}document.querySelectorAll("[placeholder],[aria-label]").forEach(o=>["placeholder","aria-label"].forEach(a=>{const r=o.getAttribute(a);if(r===null)return;const i="_"+a,d=o[i]||r;TX[d]&&(o[i]=d,o.setAttribute(a,e?TX[d]:d))})),document.title=e?"Crystal Altar":"Кристальный алтарь"}function setLang(e){LANG=e;document.documentElement.lang=e,applyStatic(),$("lang").innerHTML=$("lang2").innerHTML='<svg class="ico"><use href="#i-globe"/></svg>'+(e==="en"?"Русский":"English"),render(),renderProf(),evSel(),renderEv(),updAuto(),grTxt(),topTabs(),$("reg").style.display==="flex"&&openReg(),me&&$("setp").style.display==="block"&&renderSet()}let CLAN=null;const RB_MAX=10,RB_BEST=[3,4,4,5,5,6,6,7,7,8];
function rbN(){return Math.min(RB_MAX,Math.max(0,Math.floor(+S.rb)||0))}
function rbMul(){return 1+.25*rbN()}
function rbLuck(){return rbN()}
function rbDisc(){return(1-.03*rbN())*gpDisc()}
function rbStart(n){return Math.max(30,2500*n*n)}
function rbGems(n){return 25*n}
function rbReq(n){return{coins:3e6*Math.pow(3,n),luck:RBLUCK,inc:MAXINC,best:RB_BEST[Math.min(n,RB_MAX-1)]}}
function rbOk(n){const q=rbReq(n);return S.coins>=q.coins&&S.luck>=q.luck&&S.inc>=q.inc&&S.best>=q.best}
function gpHas(k){return!!(S.gp&&S.gp[k])}function gpMul(){return gpHas("coin")?2:1}function gpLuck(){return(gpHas("luck")?3:0)+(gpHas("vip")?1:0)}function gpDisc(){return gpHas("disc")?.85:1}
function vipTag(x){try{const v=x&&(x.vip===true||x.vip===1||x.vip==="1"||x.vip==="t"||x.vip==="true"||!!(x.nick&&window.VIPS&&window.VIPS[String(x.nick).toLowerCase()])),own=!!(me&&x&&x.nick&&String(x.nick).toLowerCase()===String(me.nick).toLowerCase()&&gpHas("vip"));return v||own?'<span class="vtag">VIP</span>':""}catch(e){return""}}
function clanMul(){return(CLAN?1+.03*(CLAN.level||0):1)*rbMul()*gpMul()*(window.gxMul?gxMul():1)*(window.cuMul?cuMul():1)}var CPK={luck:0,inc:0,gem:0};function clanLuck(){return(CLAN&&CPK?.5*(CPK.luck||0):0)+rbLuck()+gpLuck()+(window.petLuck?petLuck():0)}function clanInc(){return(CLAN&&CPK?1+.05*(CPK.inc||0):1)*(gpHas("vip")?1.25:1)}function clanGem(){return CLAN&&CPK?1+.05*(CPK.gem||0):1}/* ==========================================================================================
   СЛОЖНОСТЬ ЭКОНОМИКИ — чем меньше число, тем труднее получать монеты. 1 = как раньше.
   roll — множитель монет за предметы с роллов;  inc — множитель пассивного дохода (монеты в секунду).
   Покупка за реальные деньги и промокоды этим не затрагиваются.
   ========================================================================================== */
const ECON = { roll: 1, inc: 1 };
/* УДАЧА КАК В ANIME ASTRAL: плоский множитель (×2, ×3 …) шанса редких выпадений, начиная с редкости LUCK_FROM (4 = Легендарный и выше). Обычный предмет забирает остаток шанса. Множитель = 1 + уровни удачи × LUCK_STEP */ const INCOME=1,LUCK_STEP=.25,LUCK_BASE=8,LUCK_FROM=4,MAXLUCK=100,RBLUCK=20,MAXINC=15,PM=1000,PS=10000,PB=[1,1,1,2,5,12,30,80],PP=[1,2,4,8,15,30,60,120],PN=[["Мышка","Mouse","Воробей","Sparrow"],["Лиса","Fox","Заяц","Hare"],["Волк","Wolf","Сова","Owl"],["Единорог","Unicorn","Грифон","Griffin"],["Дракончик","Dragonet","Левиафан","Leviathan"],["Феникс","Phoenix","Кракен","Kraken"],["Теневой кот","Shadow Cat","Хронодракон","Chrono Drake"],["Солнечный лев","Sun Lion","Звёздный кит","Star Whale"]],PETS=[];PN.forEach((e,t)=>[0,1].forEach(n=>PETS.push({id:"p"+t+n,r:t,ru:e[n*2],en:e[n*2+1],inc:n?Math.ceil(PB[t]*1.5):PB[t],price:n?Math.ceil(PP[t]*1.6):PP[t]})));function petInc(){return(S.pt||[]).reduce((e,t)=>{const n=PETS.find(o=>o.id===t);return e+(n?n.inc:0)},0)+(window.wpInc?wpInc():0)}const gemDrop=e=>0,incAt=e=>(INCOME+e)*(window.wVm?wVm():1),incB=e=>+(e*(window.prMul?prMul():1)*clanMul()*clanInc()*ECON.inc*(window.dgCoin?dgCoin():1)).toFixed(2),inc=()=>incB(incAt(S.inc)+petInc()),incNow=()=>inc()*(ev().inc||1)*(ev().coin||1),fmtInc=e=>String(+(+e).toFixed(2)),incCost=()=>Math.floor(400*(window.wCm?wCm():1)*Math.pow(1.6,S.inc)*(ev().disc||1)*rbDisc()),EVD={luck2:{e:"✨",c:"var(--c3)",lk:1.5,ru:["Повышенная удача","Уровень удачи ×1.5"],en:["Lucky Hour","Luck level ×1.5"]},bless:{e:"🌟",c:"var(--c7)",la:5,ru:["Благословение","+5 уровней удачи"],en:["Blessing","+5 luck levels"]},gold:{e:"💰",c:"var(--c4)",coin:1.5,ru:["Золотой дождь","Монеты ×1.5 с роллов и дохода"],en:["Golden Rain","Coins ×1.5 from rolls and income"]},storm:{e:"🪙",c:"var(--c4)",inc:2,ru:["Монетный шторм","Пассивный доход ×2"],en:["Coin Storm","Passive income ×2"]},sale:{e:"⚡",c:"var(--c2)",disc:.75,ru:["Скидка на прокачку","Удача и доход −25%"],en:["Upgrade Sale","Luck and income −25%"]},shop:{e:"🛒",c:"var(--c1)",shop:.75,ru:["Распродажа","Цены в магазине −25%"],en:["Shop Sale","Shop prices −25%"]},pity:{e:"🎯",c:"var(--c5)",pity:1.5,ru:["Час гаранта","Гаранты срабатывают в 1.5× чаще"],en:["Pity Hour","Pity triggers 1.5× as often"]},gain:{e:"🎲",c:"var(--c6)",gain:1.5,ru:["Щедрые роллы","Награда за роллы ×1.5"],en:["Generous Rolls","Roll rewards ×1.5"]},rare:{e:"🔥",c:"var(--c5)",rare:1.5,ru:["Час легенд","Шанс Legendary и выше ×1.5"],en:["Legend Hour","Legendary+ chance ×1.5"]},mega:{e:"🌈",c:"var(--c7)",lk:1.5,coin:1.5,ru:["Мега-событие","Удача ×1.5 и монеты ×1.5"],en:["Mega Event","Luck ×1.5 and coins ×1.5"]}};let EVL=(()=>{try{const a=JSON.parse(localStorage.getItem(GPX+"gacha-evl")||"[]");return Array.isArray(a)?a.filter(x=>x&&x.id&&x.until>Date.now()):[]}catch{return[]}})(),_evc=null,_evt=0;const setEvl=e=>{EVL=e,_evc=null;try{localStorage.setItem(GPX+"gacha-evl",JSON.stringify(e))}catch{}},evActive=()=>{const s=new Set;return EVL.filter(e=>Date.now()<e.until&&EVD[e.id]&&!s.has(e.id)&&s.add(e.id))};const EVMUL=["lk","coin","inc","disc","shop","pity","gain","rare"],ev=()=>{const e=Date.now();if(_evc&&e<_evt)return _evc;const t=evActive();if(_evt=e+1e3,!t.length)return _evc={};if(t.length===1)return _evc=EVD[t[0].id];const n={};return t.forEach(o=>{const a=EVD[o.id];EVMUL.forEach(r=>{a[r]!=null&&(n[r]=(n[r]||1)*a[r])}),a.la&&(n.la=(n.la||0)+a.la)}),_evc=n},TH=e=>Math.max(2,Math.ceil(e/(ev().pity||1))),pr=e=>Math.floor(e.price*(ev().shop||1)*(gpHas("vip")?.9:1)),setsDone=()=>R.filter(e=>e.items.every(t=>S.found[t])).length,FRESH=()=>({pk:0,pg:0,gem:0,pt:[],coins:30,luck:0,rolls:0,found:{},best:-1,inc:0,pl:0,pm:0,ps:0,tb:[],rb:0,gp:{}});let S=FRESH(),busy=!1;const GENV=/[?&]env=test\b/.test(location.search)||/test\.html$/i.test(location.pathname)?"test":"prod",GPX=GENV==="test"?"test-":"g2-";let GTC={};try{GTC=JSON.parse(localStorage.getItem("gacha-testcfg")||"{}")}catch{}{const e=new URLSearchParams(location.search);if(GENV==="test"&&e.get("sb")&&e.get("key")){GTC={url:e.get("sb").replace(/\/+$/,""),key:e.get("key")};try{localStorage.setItem("gacha-testcfg",JSON.stringify(GTC))}catch{}}}const GCFG={prod:{url:"https://ybjnbrioosiumcnoqvbz.supabase.co",key:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inliam5icmlvb3NpdW1jbm9xdmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NjMyMTksImV4cCI6MjEwNjQzOTIxOX0.PO15psCKHeawvXdS50UwF7u7Gq1scL02TM2djXWwIBs"},test:{url:GTC.url||"",key:GTC.key||""}},SB_URL=GCFG[GENV].url,SB_KEY=GCFG[GENV].key;if(GENV==="test"){const e=document.createElement("div");e.textContent=SB_URL?"TEST · "+SB_URL.replace(/^https?:\/\//,"").split(".")[0]:"TEST · сервер не настроен",e.style.cssText="position:fixed;top:env(safe-area-inset-top,0);left:0;z-index:2000;background:#ff4d6d;color:#fff;font:700 11px sans-serif;padding:3px 10px;border-radius:0 0 10px 0;pointer-events:none",document.body.appendChild(e)}/* ===== СЕТЬ: очередь (макс. 5 запросов одновременно), ретраи только для безопасных запросов, пауза при сбоях ===== */
const RO=/^g2_(me|top|profile|now|vip_list|friend_list|players|gift_history|promo_list|trade_list|trade_partner|trade_sync|clan_(caps|me|list|perks|top)|bp_owners|pass_owners|mod_log_list|event_get|save)$/;
let _act=0,_bad=0;const _wq=[];
const _slot=()=>new Promise(r=>{_act<5?(_act++,r()):_wq.push(r)});
const _free=()=>{const n=_wq.shift();n?n():_act--};
const _sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function rpc(e,t,n){
 const body=JSON.stringify(t||{}),ka=!!n&&body.length<6e4,tries=RO.test(e)?3:1;let last={error:tr("noconn"),net:!0};
 await _slot();
 try{
  for(let a=0;a<tries;a++){
   if(a)await _sleep(a*700+Math.random()*300);
   const c=new AbortController,tm=setTimeout(()=>c.abort(),2e4);
   try{
    const o=await fetch(SB_URL+"/rest/v1/rpc/"+e,{method:"POST",keepalive:ka,signal:c.signal,headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"},body}),j=await o.json().catch(()=>null);
    try{const h=o.headers.get("date"),q=h?Date.parse(h):0;if(q>0)window.__srvBase=q-performance.now();else window.__srvMiss=(window.__srvMiss||0)+1}catch{}
    if(o.ok){_bad=0;window.__cool=0;if(e==="g2_me"&&j&&j.uid)window.__rtStart&&window.__rtStart(j.uid);return{data:j}}
    last={error:srv(j&&j.message||"Ошибка сервера"),status:o.status};
    if(!(o.status===429||o.status>=500)||a===tries-1)break;
   }catch{last={error:tr("noconn"),net:!0}}finally{clearTimeout(tm)}
  }
  if(last.net||last.status===429||last.status>=500){_bad++;if(_bad>=2)window.__cool=Date.now()+Math.min(15e3,1500*_bad)}
  return last;
 }finally{_free()}
}
/* ===== REALTIME: сервер сам толкает событие (админка, деньги, подарки) — клиент сразу забирает данные ===== */
(function(){
 let ws=null,uid=null,hb=0,rc=0,tmo=0,lastRx=0;window.__rtOn=!1;
 const T=f=>{try{const r=f();r&&r.catch&&r.catch(()=>{})}catch{}};
 const JOBS={
  save:()=>{T(()=>adminSync());T(()=>claim())},
  gift:()=>{T(()=>window.gcClaim&&gcClaim());T(()=>claim());T(()=>window.vipLoad&&vipLoad(!0))},
  vip:()=>T(()=>window.vipLoad&&vipLoad(!0)),
  trade:()=>{T(()=>trSync());T(()=>typeof trPartnerRefresh==="function"&&trPartnerRefresh())},
  friend:()=>T(()=>window.frLoad&&frLoad(!0)),
  event:()=>T(()=>pollEv()),
  promo:()=>T(()=>{const p=$("promop");p&&p.style.display==="block"&&loadPromos()}),
  clan:()=>T(()=>adminSync())
 };
 let pend=new Set,pt=0;
 const kick=k=>{pend.add(k||"all");if(pt)return;pt=setTimeout(()=>{pt=0;const ks=pend;pend=new Set;if(ks.has("all")||ks.size>3){Object.keys(JOBS).forEach(x=>JOBS[x]())}else ks.forEach(x=>(JOBS[x]||JOBS.save)())},40)};
 window.__kick=kick;
 function open(){
  if(ws||!uid||!SB_URL)return;
  try{ws=new WebSocket(SB_URL.replace(/^http/,"ws")+"/realtime/v1/websocket?apikey="+encodeURIComponent(SB_KEY)+"&vsn=1.0.0")}catch{ws=null;return}
  const w=ws;
  w.onopen=()=>{rc=0;w.send(JSON.stringify({topic:"realtime:g2ping",event:"phx_join",ref:"1",join_ref:"1",payload:{config:{broadcast:{ack:!1,self:!1},presence:{key:""},postgres_changes:[{event:"*",schema:"public",table:"g2_ping",filter:"uid=eq."+uid},{event:"*",schema:"public",table:"g2_ping",filter:"uid=eq.00000000-0000-0000-0000-000000000000"}],private:!1},access_token:SB_KEY}}));lastRx=Date.now();hb=setInterval(()=>{if(Date.now()-lastRx>55e3){try{w.close()}catch{}return}try{w.send(JSON.stringify({topic:"phoenix",event:"heartbeat",payload:{},ref:"h"}))}catch{}},2e4)};
  w.onmessage=m=>{lastRx=Date.now();let d;try{d=JSON.parse(m.data)}catch{return}
   if(d.event==="phx_reply"&&d.topic==="realtime:g2ping"){const ok=d.payload&&d.payload.status==="ok";window.__rtOn=ok;ok&&kick("all")}
   else if(d.event==="postgres_changes"){let k="all";try{k=d.payload.data.record.kind||"all"}catch{}kick(k)}};
  const end=()=>{if(ws!==w)return;ws=null;window.__rtOn=!1;clearInterval(hb);clearTimeout(tmo);tmo=setTimeout(open,Math.min(3e4,1e3*Math.pow(2,rc++)))};
  w.onclose=end;w.onerror=()=>{try{w.close()}catch{}}
 }
 window.__rtStart=u=>{if(uid===u&&ws)return;uid=u;open()};
 addEventListener("online",()=>{rc=0;if(!ws)open();kick()});
 document.addEventListener("visibilitychange",()=>{if(!document.hidden){if(!ws){rc=0;open()}kick()}});
})();
const BASE=GPX+"gacha-v2",KEY=BASE;let TOKEN=null;try{TOKEN=localStorage.getItem(GPX+"gacha-token")}catch{}let ready=!TOKEN,dirty=!1;function normS(){window.applyWorld&&window.applyWorld();typeof S.pk!="number"&&(S.pk=0),typeof S.pg!="number"&&(S.pg=0),Array.isArray(S.tb)||(S.tb=[]),Array.isArray(S.pt)||(S.pt=[]),typeof S.gem!="number"&&(S.gem=0),(!S.gp||typeof S.gp!="object"||Array.isArray(S.gp))&&(S.gp={}),S.luck=Math.min(S.luck,MAXLUCK),S.rb=Math.min(10,Math.max(0,Math.floor(+S.rb)||0)),S.best<0&&ALL.forEach(e=>{S.found[e.t]&&e.i>S.best&&(S.best=e.i)})}
if(!TOKEN)try{const e=localStorage.getItem(KEY);e&&(S=Object.assign(S,JSON.parse(e)))}catch{}normS();if(TOKEN)try{const c=JSON.parse(localStorage.getItem(GPX+"gacha-snap")||"null");c&&c.t===TOKEN&&c.s&&(S=Object.assign(FRESH(),c.s),normS())}catch{}const save=()=>{if(ready)if(TOKEN)dirty=!0;else try{localStorage.setItem(KEY,JSON.stringify(S))}catch{}};let _q=Promise.resolve(),_ops=0;const serial=f=>{_ops++;const p=_q.then(f);_q=p.then(()=>{_ops--},()=>{_ops--});return p};
function adopt(sv){if(typeof sv=="string"){try{sv=JSON.parse(sv)}catch{sv=null}}if(!sv||typeof sv!="object"||Array.isArray(sv)||!Object.keys(sv).length){dirty=!0;pushSoon();return}S=Object.assign(FRESH(),sv),normS(),iaRestore(),dirty=!1,S.rolls||(resetOrb(),TRB=1),render(),S.rolls||snapNums()}
async function resync(){const m=await rpc("g2_me",{p_token:TOKEN});if(m.data&&m.data.save){const sv=m.data.save,sc=+sv.coins||0,dc=S.coins-(typeof S._pc=="number"?S._pc:sc);S.coins=Math.max(0,Math.floor(sc+dc));S._pc=sc;if(sv._v!=null)S._v=sv._v;dirty=!0;render();pushSoon()}}
function pushRes(t,sn){if(t.data)t.data.reset?(adopt(t.data.save)):(t.data.v!=null&&(S._v=t.data.v),typeof sn=="number"&&(S._pc=sn,_pg=_gsn))}let _gsn=0,_pg=null,_lastO=null;let _ps=0;const pushSoon=()=>{clearTimeout(_ps);_ps=setTimeout(()=>push(),500)};
function clampS(){try{window.capAll&&capAll()}catch(e){}if(!(S.coins<=ADM_CAP))S.coins=S.coins>ADM_CAP?ADM_CAP:0;if(!(S.gem<=ADM_CAP))S.gem=S.gem>ADM_CAP?ADM_CAP:0}
async function push(e){if(!TOKEN||!ready||!dirty)return;clampS();if(e){if(_ops)return;dirty=!1;const sn=(_gsn=S.gem,S.coins),t=await rpc("g2_save",{p_token:TOKEN,p_save:S},!0);if(t.error){dirty=!0;return}pushRes(t,sn);return}return serial(async()=>{if(!dirty)return;dirty=!1;const sn=(_gsn=S.gem,S.coins),t=await rpc("g2_save",{p_token:TOKEN,p_save:S});if(t.error){dirty=!0;return}pushRes(t,sn)})}
const snapO=o=>[o.luck,o.inc,o.best,(o.tb||[]).length,(o.pt||[]).length,Object.keys(o.found||{}).length].join("|");
async function adminSync(){if(!TOKEN||!ready||document.hidden||busy)return;await serial(async()=>{const m=await rpc("g2_me",{p_token:TOKEN}),sv=m.data&&m.data.save;if(!sv)return;let ch=0;const sc=Math.floor(+sv.coins||0),sg=Math.floor(+sv.gem||0);
if(typeof S._pc=="number"&&sc!==S._pc&&(sv.w||0)===(S.w||0)){S.coins=Math.max(0,S.coins+sc-S._pc);ch=1}S._pc=sc;
if(_pg!==null&&sg!==_pg){S.gem=Math.max(0,(S.gem||0)+sg-_pg);ch=1}_pg=sg;
const so=snapO(sv);if(_lastO!==null&&so!==_lastO&&so!==snapO(S)){if(dirty||_ops>1||(sv.w||0)!==(S.w||0)){_lastO=so;return}S.luck=Math.min(MAXLUCK,Math.max(S.luck||0,+sv.luck||0));S.inc=Math.min(MAXINC,Math.max(S.inc||0,+sv.inc||0));if(typeof sv.best=="number")S.best=sv.best;S.tb=Array.isArray(sv.tb)?sv.tb:S.tb;S.pt=Array.isArray(sv.pt)?sv.pt:S.pt;for(const k in sv.found||{})S.found[k]=Math.max(S.found[k]||0,sv.found[k]);ch=1}_lastO=so;
if(sv.gp&&typeof sv.gp=="object"){let gc=0;for(const k in sv.gp){if(sv.gp[k]&&!gpHas(k)){(S.gp||(S.gp={}))[k]=1;gc=1}}if(gc){ch=1;setTimeout(()=>{window.gpChanged&&window.gpChanged(1)},0)}}
if(ch){if(sv._v!=null)S._v=sv._v;dirty=!0;render();pushSoon()}})}
let _at=0;setInterval(__one(()=>{if(!document.hidden&&(!window.__rtOn||++_at%2===0))return adminSync()}),2500),document.addEventListener("visibilitychange",()=>{document.hidden||adminSync()});
setInterval(__one(()=>{if(!document.hidden)return push()}),1000),document.addEventListener("visibilitychange",()=>{document.hidden?push(!0):push()}),addEventListener("pagehide",()=>push(!0));/* ==========================================================================================
   БУСТЫ ТИТУЛОВ — здесь можно менять, какой титул что даёт.
   Бусты работают у ВСЕХ полученных титулов сразу (надевать титул не нужно, это только украшение профиля).
   Формат:  id_титула: { тип: число },   типы:
     luck  — +N к эффективной удаче          speed — ролл быстрее на N%
     gain  — награды за роллы +N%            inc   — доход (монеты/сек) +N%
     gem   — шанс выпадения тикетов +N%
   Можно давать несколько типов сразу:  ex_all: { luck: 2, gain: 5 }
   Чтобы убрать буст — удалите строку этого титула.
   ========================================================================================== */
window.nfMode=function(){var m=window.__nf;if(!m){try{m=localStorage.getItem("ca-nf")}catch(e){}m=window.__nf=(m==="words"||m==="full")?m:"short"}return m};
window.nfSet=function(m){m=(m==="words"||m==="full")?m:"short";window.__nf=m;try{localStorage.setItem("ca-nf",m)}catch(e){}};
const NFW_RU=[null,["тысяча","тысячи","тысяч"],["миллион","миллиона","миллионов"],["миллиард","миллиарда","миллиардов"],["триллион","триллиона","триллионов"],["квадриллион","квадриллиона","квадриллионов"],["квинтиллион","квинтиллиона","квинтиллионов"],["секстиллион","секстиллиона","секстиллионов"],["септиллион","септиллиона","септиллионов"],["октиллион","октиллиона","октиллионов"],["нониллион","нониллиона","нониллионов"],["дециллион","дециллиона","дециллионов"]],
NFW_EN=["","thousand","million","billion","trillion","quadrillion","quintillion","sextillion","septillion","octillion","nonillion","decillion"];
const SUF=["","K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc"],fmt=e=>{
/* Формат чисел (Настройки → Формат чисел): short = 1M · words = 1 миллион · full = 1.000.000 */
const m=window.nfMode?window.nfMode():"short",en=typeof LANG!=="undefined"&&LANG==="en";
if(m==="full"&&isFinite(e)){const a=Math.floor(Math.abs(e));let d;
/* до 1e15 цифры точные; выше точность double ≈15 знаков, остальное — нули (без «хвостов» вроде …999.945) */
if(a<1e15)d=String(a);else{const q=a.toExponential(14).split("e");d=q[0].replace(".","")+"0".repeat(+q[1]-14)}
return(e<0?"-":"")+d.replace(/\B(?=(\d{3})+(?!\d))/g,en?",":".")}
if(e<1e4)return Math.floor(e).toString();
let t=Math.floor(Math.log10(e)/3),n=e/Math.pow(1e3,t);
+n.toFixed(2)>=1e3&&(t++,n/=1e3);
if(t>=SUF.length)return e.toExponential(2);
const v=+n.toFixed(2);
if(m==="words"){
if(en)return v+" "+NFW_EN[t];
let f;if(!Number.isInteger(v))f=1;else{const a=v%100,b=v%10;f=(a>=11&&a<=14)?2:b===1?0:(b>=2&&b<=4)?1:2}
return String(v).replace(".",",")+" "+NFW_RU[t][f]}
return v+SUF[t]};var LK=l=>"+"+(+(LUCK_BASE+l*LUCK_STEP*100).toFixed(1)),luckCost=()=>Math.floor(2000*(window.wCm?wCm():1)*Math.pow(1.9,S.luck)*(ev().disc||1)*rbDisc()),weights=e=>{const t=e===void 0?ev():{};e===void 0&&(e=(S.luck+clanLuck()+(window.dgLuck?dgLuck():0))*(t.lk||1)+(t.la||0));/* Удача по таблицам из игры: +8 (старт), +110.7, +423.7. Лог-лог интерполяция по M=1+удача%/100, после +423.7 рост вдвое медленнее, Common = остаток */ const u=Math.log(1+(LUCK_BASE+e*LUCK_STEP*100)/100),U0=Math.log(1.08),U1=Math.log(2.107),U2=Math.log(5.237),ext=A=>R.map((o,i)=>i<A.length?A[i]:A[A.length-1]*o.w/R[A.length-1].w),P0=R.map((o,a)=>a<6?o.w:a===6?.004:a===7?4e-4:1.01e-5),P1=ext([30.61,26.5,22.93,16.38,3.36,.2,.02,.0019,.0000498]),P2=ext([15.4,19.1,24.94,28.3,11.34,.83,.09,.00964,.000267]);const w=R.map((o,a)=>{if(!a)return 0;const l0=Math.log(P0[a]),l1=Math.log(P1[a]),l2=Math.log(P2[a]);let l;if(u<=U1)l=l0+(l1-l0)*Math.max(0,(u-U0)/(U1-U0));else if(u<=U2)l=l1+(l2-l1)*(u-U1)/(U2-U1);else l=l2+.5*(l2-l1)*(u-U2)/(U2-U1);return Math.exp(l)*(t.rare&&a>=4?t.rare:1)});w[0]=Math.max(.01,100-w.slice(1).reduce((x,y)=>x+y,0));return w},luckMul=()=>{const t=ev();return 1+(LUCK_BASE+((S.luck+clanLuck()+(window.dgLuck?dgLuck():0))*(t.lk||1)+(t.la||0))*LUCK_STEP*100)/100},fmtP=e=>e>=1?e.toFixed(1)+"%":e>=.1?e.toFixed(2)+"%":tr("oneIn")+fmt(Math.round(100/e));function pick(){const e=weights(),t=e.reduce((a,r)=>a+r,0);let n=Math.random()*t,o=0;for(;o<e.length&&!((n-=e[o])<0);o++);return o>=e.length&&(o=0),S.ps>=TH(PS)-1&&o<6?o=6:S.pm>=TH(PM)-1&&o<5?o=5:0,S.pl=o>=4?0:S.pl+1,S.pm=o>=5?0:S.pm+1,S.ps=o>=6?0:S.ps+1,o}const dupes=e=>R[e].items.reduce((t,n)=>t+Math.max(0,(S.found[n]||0)-1),0);function show(e,t,n){const[o,...a]=t.split(" "),r=$("orb");if(r.style.setProperty("--rc",RA(e).c),r.dataset.rf=e,r.classList.toggle("rx-sec",e===6),r.classList.toggle("rx-cel",e===9),r.classList.toggle("rx-tra",e===10),$("rr").className=e===9?"rr-cel":e===10?"rr-tra":"",$("em").textContent=o,$("nm").textContent=iname(t),$("rr").textContent=rn(e)+(n?" · "+n:""),$("rr").style.color=RA(e).c,r.classList.remove("reveal"),r.offsetWidth,r.classList.add("reveal"),window.__fxReveal&&__fxReveal(r,e,t,n),e>=4&&!$("pwrap").classList.contains("open")){const i=$("flash");i.style.setProperty("--fc",RA(e).c),i.classList.remove("go"),i.offsetWidth,i.classList.add("go")}}/* ===== НАСТРОЙКИ СКОРОСТИ РОЛЛА (можно менять) =====
   ROLL_T0   — сколько длится ролл, мс: [один ролл, ×10]  (прежняя скорость: 450 и 650)
   RING_PEAK — самая высокая скорость вращения кольца во время ролла (1 = обычная)
   RING_END  — скорость вращения кольца в самом конце ролла */
const ROLL_T0=[220,320],RING_PEAK=14,RING_END=14;
let _rdt=0;
const rollTime=e=>e>1?ROLL_T0[1]:ROLL_T0[0];
function rollCost(e){return 10*e*(window.wGm?wGm():1)}
function rollLbl(){try{const a=$("r1").querySelector(".rc"),b=$("r10").querySelector(".rc"),x=fmt(rollCost(1))+" 🪙",y=fmt(rollCost(10))+" 🪙";if(a.textContent!==x)a.textContent=x;if(b.textContent!==y)b.textContent=y}catch(e){}}
function roll(e){const t=rollCost(e);if(busy||!ready)return;if(S.coins<t)return toast(L2("Не хватает монет","Not enough coins"),"err");busy=!0,render();let n=-1,o=null,a=-1,r=0;const i=[],d=ev();let l=0;const _p0=[S.pl,S.pm,S.ps];for(let c=0;c<e;c++){let u,g;u=pick();const b=R[u].items;g=b[Math.floor(Math.random()*b.length)];i.push(g),r+=RA(u).v,l+=gemDrop(u),u>n&&(n=u,o=g),u>a&&(a=u)}const _p1=[S.pl,S.pm,S.ps];S.pl=_p0[0],S.pm=_p0[1],S.ps=_p0[2];const s=$("orb"),D=rollTime(e);s.style.setProperty("--rt",D+"ms"),s.classList.add("charge"),window.__fxCharge&&__fxCharge(s,D,e,n,o,i),ringRate(RING_PEAK,Math.round(D*.9)),clearTimeout(_rdt),_rdt=setTimeout(()=>ringRate(RING_END,Math.round(D*.4)),Math.round(D*.6)),$("nm").textContent="…",$("rr").textContent="",setTimeout(()=>{window.__hold=1,clearTimeout(_rdt),s.classList.remove("charge"),s.style.removeProperty("--rt"),ringRate(1,700),S.coins-=t,S.rolls+=e,S.pl=_p1[0],S.pm=_p1[1],S.ps=_p1[2],dqRoll(i,e,l),i.forEach(c=>{S.found[c]=(S.found[c]||0)+1}),a>S.best&&(S.best=a),S.coins+=Math.floor(r*(1+.1*setsDone())*(d.coin||1)*(d.gain||1)*clanMul()*ECON.roll),S.gem+=l,window.__fxStrip&&__fxStrip(i,e),show(n,o),l&&($("rr").textContent+=" · +"+l+" 💎"),busy=!1,render(),save(),l&&pushSoon(),clearTimeout(window.__hT),window.__hT=setTimeout(()=>{window.__hold=0,requestAnimationFrame(()=>{try{render()}catch(x){}})},450)},D)}const RVSEL="main>h2,main>.odds,main>#maxd,.ac";
const rvIO=document.documentElement.classList.contains("js")?new IntersectionObserver(es=>{
 let k=0;
 es.filter(x=>x.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top||a.boundingClientRect.left-b.boundingClientRect.left).forEach(x=>{
  const t=x.target;rvIO.unobserve(t);t.style.setProperty("--d",Math.min(k++,9)*.05+"s");t.classList.add("in");if(t._seen)t._seen[t._k]=1})
},{rootMargin:"0px 0px -6% 0px",threshold:.05}):null;
if(rvIO){clearTimeout(window.__rvT);document.querySelectorAll(RVSEL).forEach(x=>rvIO.observe(x))}else document.documentElement.classList.remove("js");
function rvKids(c){if(!rvIO)return;const seen=c._seen||(c._seen={});[...c.children].forEach((n,i)=>{if(seen[i])return;n.classList.add("rvc");n._seen=seen;n._k=i;rvIO.observe(n)})}
function morphKids(a,b){
  const A=a.childNodes,B=b.childNodes;
  for(let i=0;i<B.length;i++){
    const x=A[i],y=B[i];
    if(!x){a.appendChild(y.cloneNode(true));continue}
    if(x.nodeType!==y.nodeType||(x.nodeType===1&&x.nodeName!==y.nodeName)){a.replaceChild(y.cloneNode(true),x);continue}
    if(x.nodeType===3||x.nodeType===8){if(x.nodeValue!==y.nodeValue)x.nodeValue=y.nodeValue;continue}
    for(const at of [...x.attributes]){if(!y.hasAttribute(at.name)&&!(at.name==="class"))x.removeAttribute(at.name)}
    for(const at of [...y.attributes]){
      if(at.name==="value"&&x===document.activeElement)continue;
      if(at.name==="class"){const keep=[...x.classList].filter(c=>/^rv/.test(c));const nc=(at.value+" "+keep.join(" ")).trim();if(x.getAttribute("class")!==nc)x.setAttribute("class",nc);continue}
      if(x.getAttribute(at.name)!==at.value)x.setAttribute(at.name,at.value);
    }
    if(x.nodeName==="INPUT"||x.nodeName==="TEXTAREA"||x.nodeName==="SELECT"){if(x!==document.activeElement&&"value"in y&&x.value!==y.value)try{x.value=y.value}catch(e){}continue}
    morphKids(x,y);
  }
  while(A.length>B.length)a.removeChild(a.lastChild);
}
const setH=(e,t)=>{if(e._h===t)return;e._h=t;const r=rvIO&&e.dataset.rv;
  if(!e.firstChild){e.innerHTML=t;if(r)rvKids(e);return}
  const tp=document.createElement("template");tp.innerHTML=t;morphKids(e,tp.content);if(r)rvKids(e)};
const NT={},RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
function setNum(id,v){let t=NT[id];if(!t){t=NT[id]={el:$(id),cur:v,to:v,from:v,t0:0,raf:0};t.el.textContent=fmt(v);return}
 if(v===t.to)return;t.to=v;
 if(!(Math.abs(v-t.cur)>Math.max(3,Math.abs(t.cur)*.004))||RM||document.hidden){t.cur=v;if(!t.raf)t.el.textContent=fmt(v);return}
 t.from=t.cur;t.t0=performance.now();
 if(!t.raf)t.raf=requestAnimationFrame(function st(now){const p=Math.min(1,(now-t.t0)/480),e=1-Math.pow(1-p,3);t.cur=t.from+(t.to-t.from)*e;t.el.textContent=fmt(Math.floor(t.cur));
  if(p<1)t.raf=requestAnimationFrame(st);else{t.raf=0;t.cur=t.to;t.el.textContent=fmt(t.to)}})}
let _rv=1,_rt=0,_ra=null;
function ringRate(target,ms){if(!_ra||_ra.playState==="idle"){try{_ra=document.querySelector("#orb .ring").getAnimations()[0]||null}catch{_ra=null}}
 const a=_ra;if(!a||!a.updatePlaybackRate)return;cancelAnimationFrame(_rt);
 const from=_rv,t0=performance.now(),dur=ms||(target>from?260:420);
 (function st(n){const p=Math.min(1,(n-t0)/dur),e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;_rv=from+(target-from)*e;a.updatePlaybackRate(_rv);if(p<1)_rt=requestAnimationFrame(st)})(t0)}
$("em").addEventListener("animationend",ev=>{if(ev.animationName==="pop"||ev.animationName==="fxpop")$("orb").classList.remove("reveal")});function peaks(){const c=Math.floor(S.coins||0),g=S.gem||0;c>(S.pk||0)&&(S.pk=c,dirty=!0),g>(S.pg||0)&&(S.pg=g,dirty=!0)}
let TRB=0;
function snapNums(){for(const k in NT){const t=NT[k];if(t.raf){cancelAnimationFrame(t.raf);t.raf=0}t.cur=t.to;t.el.textContent=fmt(t.to)}}
function resetOrb(){try{window.__fxClear&&window.__fxClear();const o=$("orb");o.classList.remove("reveal","charge");o.style.removeProperty("--rc");delete o.dataset.rf;o.classList.remove("rx-cel","rx-tra","rx-sec");$("rr").className="";$("em").textContent=(window.WORLD_ORB&&window.WORLD_ORB[S.w|0])||"🔮";0}catch(e){}}
/* ===== ОБМЕННИК ПОВТОРОК: дубликаты → монеты. Цена за штуку = XCH_MULT × R[i].v (можно менять). Один экземпляр каждого предмета всегда остаётся в коллекции ===== */
const XCH_MULT=1,XCH_SAFE=3;
const xchP=i=>Math.max(1,Math.floor(R[i].v*XCH_MULT));
const xchKeys=i=>R[i].items;
const xchD=i=>xchKeys(i).reduce((t,k)=>t+Math.max(0,(S.found[k]||0)-1),0);
function xchTake(i,want){let n=0;for(const k of xchKeys(i)){if(n>=want)break;const d=Math.max(0,(S.found[k]||0)-1),t=Math.min(d,want-n);if(t>0){S.found[k]-=t;n+=t}}return n}
function xchSell(i,all){if(busy)return;const n=xchTake(i,all?Infinity:1);if(!n)return toast(L2("Повторок нет","No duplicates"),"err");const g=n*xchP(i);S.coins+=g;render();save();toast(L2("Обмен: ×","Exchange: ×")+fmt(n)+" → 🪙 "+fmt(g),"ok")}
function xchSellSafe(){if(busy)return;let n=0,g=0;for(let i=0;i<=XCH_SAFE;i++){const t=xchTake(i,Infinity);n+=t;g+=t*xchP(i)}if(!n)return toast(L2("Повторок нет","No duplicates"),"err");S.coins+=g;render();save();toast(L2("Обмен: ×","Exchange: ×")+fmt(n)+" → 🪙 "+fmt(g),"ok")}
function xchHtml(){const rows=[];let sg=0;const idx=R.map((_,i)=>i);idx.forEach(i=>{const d=xchD(i),p=xchP(i),c=RA(i).c;if(i<=XCH_SAFE)sg+=d*p;rows.push(`<div class="xr"><div class="xl"><b style="color:${c}">${LANG==="en"?RA(i).n:RA(i).n+" · "+RA(i).ru}</b><small>${L2("Повторок","Duplicates")}: ${fmt(d)} · 🪙 ${fmt(p)}/${L2("шт","ea")}</small></div><button class="alt x1" data-x1="${i}" ${d<1||busy?"disabled":""} style="border-color:${c}">×1</button><button class="alt xmx" data-xa="${i}" ${d<1||busy?"disabled":""} style="border-color:${c}">${L2("Все","All")} → 🪙 ${fmt(d*p)}</button></div>`)});rows.push(`<button class="xall" data-xs="1" ${sg<1||busy?"disabled":""}>${L2("Обменять все повторки до Epic","Exchange all duplicates up to Epic")} → 🪙 ${fmt(sg)}</button>`);return rows.join("")}
$("xch").onclick=e=>{const a=e.target.closest("[data-xa]");if(a){a.disabled||xchSell(+a.dataset.xa,!0);return}const b=e.target.closest("[data-x1]");if(b){b.disabled||xchSell(+b.dataset.x1,!1);return}const c=e.target.closest("[data-xs]");c&&!c.disabled&&xchSellSafe()};
Object.assign(TX,{"Обменник повторок (повторки → монеты)":"Exchanger (duplicates → coins)"});
var XCHR=1;
window.__memo=function(k,sig,fn){var c=(window.__mc=window.__mc||{})[k];if(c&&(c.s===sig||(window.__hold&&k==="col")))return c.h;var h=fn();window.__mc[k]={s:sig,h:h};return h};
function render(){try{peaks()}catch(e){}try{renderRb()}catch(e){}const e=$("gm_bal");e&&(e.textContent=fmt(S.coins)),setNum("coins",S.coins),setNum("gems",S.gem||0);{const s=$("shp");s&&s.style.display==="block"&&renderGem()}typeof drawTop=="function"&&$("topp").style.display==="block"&&drawTop(),$("rolls").textContent=S.rolls;$("r1").disabled=busy||S.coins<rollCost(1),$("r10").disabled=busy||S.coins<rollCost(10),rollLbl();const n=luckCost(),o=S.luck>=MAXLUCK;$("luck").textContent=o?tr("luckmax",LK(MAXLUCK)):tr("luckup",LK(S.luck),LK(S.luck+1),fmt(n)),$("luck").disabled=o||busy||S.coins<n,$("inc").textContent=S.inc>=MAXINC?tr("incmax"):tr("incup",fmtInc(inc()),fmtInc(incB(incAt(S.inc+1)+petInc())),fmt(incCost())),$("inc").disabled=S.inc>=MAXINC||busy||S.coins<incCost(),setH($("pity"),[[5,S.pm||0,TH(PM)],[6,S.ps||0,TH(PS)]].map(([ri,cnt,th])=>{const T=(a,b)=>LANG==="en"?b:a,rem=Math.max(1,th-cnt),pct=Math.max(2,Math.min(100,cnt/th*100)),hot=rem<=1;return`<div class="pt2${hot?" hot":""}${ri===6?" sec":ri===5?" mys":""}" style="--pc:${R[ri].c}"><div class="ph"><b>🎯 ${rname(ri)}</b><span>${hot?T("Следующий ролл — гарант!","Next roll guaranteed!"):T("через ","in ")+fmt(rem)+T(" рл."," rolls")}</span></div><div class="pbar"><i style="width:${pct}%"></i></div><div class="pn2">${fmt(Math.min(cnt,th-1))} / ${fmt(th)}</div></div>`}).join("")+`<div class="pinc">${LANG==="en"?"Income":"Доход"}: ${fmtInc(incNow())}/${LANG==="en"?"s":"с"}</div>`),setH($("xch"),XCHR?xchHtml():""),$("lucklv").innerHTML="+"+(+((luckMul()-1)*100).toFixed(1))+(o?'<span class="mx">MAX</span>':"");const a=weights(),r=a.reduce((s,c)=>s+c,0);setH($("odds"),R.map((s,c)=>{const u=a[c]/r*100,g=Math.max(2,Math.min(100,Math.log10(u*1e4+1)/6*100));return`<div class="od"><span style="color:${s.c};font-weight:700">${s.n}</span><span class="bar"><i style="width:${g}%;background:${s.c}"></i></span><span>${fmtP(u)}</span></div>`}).join(""));const i=weights(RBLUCK),d=i[7]/i.reduce((s,c)=>s+c,0)*100;$("maxd").textContent=tr("maxd",RBLUCK,d.toFixed(3),fmtP(d)),$("pwrap").classList.contains("open")&&(updShop(),0);const l=ALL.filter(s=>S.found[s.t]).length;$("colcount").textContent=tr("colcnt",l,ALL.length,setsDone()*10),window.__colTabs&&window.__colTabs(),setH($("col"),__memo("col",(window.__colTab||"o")+"|"+S.w+"|"+LANG+"|"+weights().join()+"|"+ALL.map(x=>S.found[x.t]|0).join(),()=>{const _a=weights(),_t=_a.reduce((x,y)=>x+y,0),_m=1;return __colWrap(ALL.map((s,k)=>{if(!__colF(S.found[s.t]))return"";const c=S.found[s.t]||0,_p=__pf(_a[s.i]/_t*100*_m/R[s.i].items.length);return __eyeCard(s.t,s.i,c,rname(s.i),c?iname(s.t):"???",R[s.i].c,k,_p)}).join(""))}))}$("upgBtn").onclick=()=>$("upgPanel").classList.toggle("show");
$("inc").onclick=()=>{const e=incCost();if(busy)return;if(S.inc>=MAXINC)return toast(L2("Доход уже максимальный","Income is already maxed"),"err");if(S.coins<e)return toast(L2("Не хватает монет","Not enough coins"),"err");S.coins-=e,S.inc++,dqAdd("up",1),render(),save(),toast(L2("Доход повышен: ","Income upgraded: ")+fmtInc(inc())+L2("/с","/s"),"ok")},$("r1").onclick=()=>roll(1),$("r10").onclick=()=>roll(10);$("luck").onclick=()=>{const e=luckCost();if(busy)return;if(S.luck>=MAXLUCK)return toast(L2("Удача уже максимальная","Luck is already maxed"),"err");if(S.coins<e)return toast(L2("Не хватает монет","Not enough coins"),"err");S.coins-=e,S.luck++,dqAdd("up",1),render(),save(),toast(L2("Удача повышена: ","Luck upgraded: ")+LK(S.luck),"ok")};function showNotice(e,t,n=!0){toast(e&&t?e+": "+t:t||e,n?"ok":"err")}$("noticeOk").onclick=()=>$("noticeModal").classList.remove("show"),$("noticeModal").onclick=e=>{e.target===$("noticeModal")&&$("noticeModal").classList.remove("show")},$("reset").onclick=async()=>{!isOwner||!TOKEN||$("confirmModal").classList.add("show")},$("confirmNo").onclick=()=>$("confirmModal").classList.remove("show"),$("confirmModal").onclick=e=>{e.target===$("confirmModal")&&$("confirmModal").classList.remove("show")},$("confirmYes").onclick=async()=>{$("confirmModal").classList.remove("show");const e=await rpc("g2_reset_all",{p_token:TOKEN});if(e.error){showNotice(tr("error"),e.error,!1);return}S=FRESH(),dirty=!1,resetOrb(),TRB=1,render(),snapNums(),showNotice(tr("done"),tr("wiped"),!0)};let isOwner=!1,granted=!1,me=null,pickAv="😀",mode="reg";const isImg=e=>/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+$/.test(e||""),bad=e=>/^data:/.test(e||"")&&!isImg(e),avH=e=>isImg(e)?`<img class="avimg" src="${e}" alt="">`:esc(!e||bad(e)?"👤":e),avT=e=>isImg(e)?"🖼":!e||bad(e)?"👤":e,avP=e=>isImg(e)?"":avT(e)+" ",AVMAP={};let lastCust="",avCb=null;function fileToAv(e){return new Promise((t,n)=>{const o=URL.createObjectURL(e),a=new Image;a.onload=()=>{const i=document.createElement("canvas");i.width=i.height=96;const d=i.getContext("2d"),l=Math.min(a.width,a.height);d.fillStyle="#120d26",d.fillRect(0,0,96,96),d.drawImage(a,(a.width-l)/2,(a.height-l)/2,l,l,0,0,96,96),URL.revokeObjectURL(o),t(i.toDataURL("image/jpeg",.82))},a.onerror=()=>{URL.revokeObjectURL(o),n()},a.src=o})}const upl=document.createElement("input");upl.type="file",upl.accept="image/*",upl.style.display="none",document.body.appendChild(upl),upl.onchange=async()=>{const e=upl.files[0];if(upl.value="",!!e)try{lastCust=await fileToAv(e),pickAv=lastCust,avCb&&avCb()}catch{toast(tr("avbad"),"err")}};
/* ===== Крутые аватарки: процедурные аниме-портреты (canvas -> JPEG data-URL) ===== */
let _AVX=null;
function AVX(){
if(_AVX)return _AVX;
const W=192,TAU=Math.PI*2;
const rng=s=>()=>((s=(s*16807)%2147483647)/2147483647);
const LG=(c,x0,y0,x1,y1,st)=>{const g=c.createLinearGradient(x0,y0,x1,y1);st.forEach((s,i)=>g.addColorStop(i/(st.length-1),s));return g};
const RG=(c,x,y,r0,r1,st)=>{const g=c.createRadialGradient(x,y,r0,x,y,r1);st.forEach((s,i)=>g.addColorStop(i/(st.length-1),s));return g};
const poly=(c,p)=>{c.beginPath();p.forEach((q,i)=>i?c.lineTo(q[0],q[1]):c.moveTo(q[0],q[1]));c.closePath()};
const mix=(a,b,t)=>{const h=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16));const x=h(a),y=h(b);return'#'+x.map((v,i)=>Math.round(v+(y[i]-v)*t).toString(16).padStart(2,'0')).join('')};

function scene(c,o){
 c.fillStyle=LG(c,0,0,0,W,o.bg);c.fillRect(0,0,W,W);
 // свечение за головой
 c.fillStyle=RG(c,o.gx||96,o.gy||80,0,120,[o.glow+'cc',o.glow+'00']);c.fillRect(0,0,W,W);
 // огромная луна/солнце
 if(o.orb){c.fillStyle=RG(c,o.orb[0],o.orb[1],4,o.orb[2],[o.orb[3],o.orb[3]+'00']);c.beginPath();c.arc(o.orb[0],o.orb[1],o.orb[2],0,TAU);c.fill();
  c.fillStyle=o.orb[3];c.beginPath();c.arc(o.orb[0],o.orb[1],o.orb[2]*.62,0,TAU);c.fill()}
 // лучи
 c.save();c.translate(96,96);c.globalAlpha=.16;c.fillStyle=o.glow;
 for(let i=0;i<16;i++){c.rotate(TAU/16);c.beginPath();c.moveTo(0,0);c.lineTo(8,-150);c.lineTo(-8,-150);c.closePath();if(i%2)c.fill()}
 c.restore();
 // силуэты
 c.fillStyle=o.sil||'#00000055';
 if(o.sc==='mount'){poly(c,[[0,150],[30,110],[52,138],[84,96],[120,140],[150,104],[192,146],[192,192],[0,192]]);c.fill()}
 if(o.sc==='city'){let x=0;const r=rng(o.seed||7);while(x<W){const w=10+r()*16,h=40+r()*70;c.fillRect(x,W-h,w,h);x+=w+2}}
 if(o.sc==='waves'){for(let k=0;k<3;k++){c.fillStyle=mix(o.bg[1],'#000000',.2+k*.2)+'cc';c.beginPath();c.moveTo(0,W);for(let x=0;x<=W;x+=6)c.lineTo(x,150+k*16+Math.sin(x/16+k*2)*6);c.lineTo(W,W);c.closePath();c.fill()}}
 if(o.sc==='forest'){const r=rng(o.seed||3);for(let i=0;i<14;i++){const x=r()*W,h=60+r()*60;c.beginPath();c.moveTo(x,W);c.lineTo(x-14,W);c.lineTo(x,W-h);c.lineTo(x+14,W);c.fill()}}
 // частицы
 const r=rng((o.seed||1)*13+5);c.globalCompositeOperation='lighter';
 for(let i=0;i<46;i++){const x=r()*W,y=r()*W,s=.6+r()*2.4;c.fillStyle=(r()>.5?o.glow:o.pt||'#ffffff')+'aa';c.beginPath();c.arc(x,y,s,0,TAU);c.fill()}
 c.globalCompositeOperation='source-over';
}

function hairBack(c,o){
 const H=LG(c,0,20,0,170,[o.hair[0],o.hair[1]]);c.fillStyle=H;
 if(o.hs==='spiky'){poly(c,[[60,100],[40,80],[52,66],[40,46],[62,52],[62,28],[82,42],[92,14],[104,40],[124,22],[126,46],[148,40],[140,62],[154,76],[134,100]]);c.fill()}
 else if(o.hs==='long'){c.beginPath();c.moveTo(58,78);c.bezierCurveTo(30,88,36,140,28,186);c.lineTo(164,186);c.bezierCurveTo(156,140,162,88,134,78);c.closePath();c.fill()}
 else if(o.hs==='twin'){c.beginPath();c.ellipse(96,84,42,40,0,0,TAU);c.fill();
  [[46,1],[146,-1]].forEach(([x,s])=>{c.beginPath();c.moveTo(x+s*10,70);c.bezierCurveTo(x-s*22,86,x-s*26,140,x-s*10,176);c.bezierCurveTo(x+s*4,150,x+s*20,110,x+s*14,78);c.closePath();c.fill()})}
 else if(o.hs==='pony'){c.beginPath();c.ellipse(96,84,42,40,0,0,TAU);c.fill();c.beginPath();c.moveTo(130,64);c.bezierCurveTo(170,50,184,100,160,150);c.bezierCurveTo(166,110,150,86,126,84);c.closePath();c.fill()}
 else {c.beginPath();c.ellipse(96,84,42,41,0,0,TAU);c.fill()}
}
function hairFront(c,o){
 const H=LG(c,0,28,0,100,[o.hair[0],o.hair[1]]);
 let p;
 if(o.hs==='spiky')p=[[60,92],[54,66],[70,74],[66,44],[84,62],[88,34],[100,58],[112,36],[116,62],[134,44],[132,74],[140,64],[134,92],[126,84],[118,68],[110,92],[100,70],[90,92],[82,70],[74,88]];
 else if(o.hs==='sweep')p=[[60,94],[56,64],[72,44],[98,34],[126,42],[138,66],[134,94],[128,78],[116,62],[100,66],[90,86],[78,70],[70,92]];
 else p=[[60,98],[56,64],[72,44],[96,38],[120,44],[136,64],[132,98],[126,76],[114,62],[100,58],[96,66],[92,58],[78,62],[66,76]];
 c.fillStyle=H;poly(c,p);c.fill();
 c.strokeStyle=o.hair[1];c.lineWidth=1.4;c.stroke();
 // блики
 c.strokeStyle=(o.hl||'#ffffff')+'66';c.lineWidth=2.4;c.lineCap='round';
 c.beginPath();c.moveTo(76,52);c.quadraticCurveTo(92,44,110,50);c.stroke();
 c.beginPath();c.moveTo(70,68);c.quadraticCurveTo(76,60,84,58);c.stroke();
}
function face(c,o){
 // шея
 c.fillStyle=LG(c,0,112,0,150,[o.skin[1],mix(o.skin[1],'#000000',.4)]);c.beginPath();c.moveTo(85,110);c.lineTo(107,110);c.quadraticCurveTo(108,134,116,148);c.lineTo(76,148);c.quadraticCurveTo(84,134,85,110);c.closePath();c.fill();
 // уши
 c.fillStyle=o.skin[1];[[66,100],[126,100]].forEach(([x,y])=>{c.beginPath();c.ellipse(x,y,6,9,0,0,TAU);c.fill()});
 // лицо
 const fp=()=>{c.beginPath();c.moveTo(66,72);c.bezierCurveTo(66,56,126,56,126,72);c.bezierCurveTo(128,100,122,122,104,132);c.quadraticCurveTo(96,136,88,132);c.bezierCurveTo(70,122,64,100,66,72);c.closePath()};
 fp();c.fillStyle=LG(c,70,60,124,134,[o.skin[0],o.skin[1]]);c.fill();
 c.save();fp();c.clip();
 c.fillStyle=RG(c,86,114,0,18,['#ff7a8a55','#ff7a8a00']);c.fillRect(60,96,60,34);
 c.fillStyle=RG(c,110,114,0,18,['#ff7a8a55','#ff7a8a00']);c.fillRect(80,96,60,34);
 c.fillStyle=LG(c,0,112,0,136,['#00000000','#00000038']);c.fillRect(60,110,80,30);
 c.fillStyle=LG(c,60,0,128,0,['#00000030','#00000000','#00000000','#00000022']);c.fillRect(60,60,70,80);
 c.restore();
}
function eye(c,x,flip,o){
 const y=98,tilt=o.tilt==null?.14:o.tilt;
 c.save();c.translate(x,y);c.scale(flip,1);c.rotate(tilt);
 const sh=()=>{c.beginPath();c.moveTo(-10.5,0);c.bezierCurveTo(-6,-9.5,6,-9.5,10.5,-1);c.bezierCurveTo(6,6.5,-6,7,-10.5,0);c.closePath()};
 if(o.eyeGlow){c.shadowColor=o.eye[0];c.shadowBlur=10}
 sh();c.fillStyle=o.sclera||'#f4f6ff';c.fill();c.shadowBlur=0;
 c.save();sh();c.clip();
 c.fillStyle=RG(c,0,0,1,8,[o.eye[0],o.eye[1]]);c.beginPath();c.ellipse(0,-.4,6,7.8,0,0,TAU);c.fill();
 c.fillStyle=o.pupil||'#0b0614';c.beginPath();c.ellipse(0,-.4,2.6,4.6,0,0,TAU);c.fill();
 c.fillStyle=LG(c,0,-10,0,0,['#00000088','#00000000']);c.fillRect(-12,-10,24,9);
 c.fillStyle='#fff';c.beginPath();c.arc(-2.2,-3.2,2.1,0,TAU);c.fill();c.globalAlpha=.8;c.beginPath();c.arc(2.4,2,1.1,0,TAU);c.fill();c.globalAlpha=1;
 c.restore();
 c.strokeStyle='#120a1a';c.lineWidth=2.8;c.lineCap='round';c.lineJoin='round';
 c.beginPath();c.moveTo(-11,.4);c.bezierCurveTo(-6,-10,6,-10,10.5,-1.2);c.stroke();
 c.lineWidth=1.8;c.beginPath();c.moveTo(-11,.4);c.lineTo(-14,-2.6);c.stroke();
 c.lineWidth=1;c.globalAlpha=.6;c.beginPath();c.moveTo(-7,5.4);c.quadraticCurveTo(0,8,7,4.6);c.stroke();c.globalAlpha=1;
 c.restore();
 // бровь
 c.save();c.translate(x,y-15);c.scale(flip,1);c.rotate(tilt*1.3);
 c.strokeStyle=o.brow||o.hair[1];c.lineWidth=3.2;c.lineCap='round';c.beginPath();c.moveTo(-10,1);c.quadraticCurveTo(0,-3,10,0);c.stroke();c.restore();
}
function mouth(c,o){
 c.strokeStyle='#7a3a42';c.lineWidth=1.8;c.lineCap='round';c.beginPath();
 if(o.smile){c.moveTo(87,121);c.quadraticCurveTo(96,129,106,120)}else{c.moveTo(89,122);c.quadraticCurveTo(97,124,105,121)}
 c.stroke();
 c.strokeStyle='#00000030';c.lineWidth=1.2;c.beginPath();c.moveTo(94,110);c.quadraticCurveTo(96,112.5,99,110);c.stroke();
}
function body(c,o){
 c.fillStyle=LG(c,0,130,0,W,[o.cl[0],o.cl[1]]);
 c.beginPath();c.moveTo(14,192);c.bezierCurveTo(18,152,56,140,96,140);c.bezierCurveTo(136,140,174,152,178,192);c.closePath();c.fill();
 c.fillStyle=LG(c,0,0,W,0,['#ffffff22','#00000000','#00000044']);c.fill();
 if(o.pat==='check'){c.save();c.clip();const s=12;for(let y=136;y<W;y+=s)for(let x=0;x<W;x+=s)if(((x/s)+(y/s))%2<1){c.fillStyle=o.cl[2];c.fillRect(x,y,s,s)}c.restore()}
 if(o.pat==='stripe'){c.save();c.clip();c.strokeStyle=o.cl[2];c.lineWidth=5;for(let x=-40;x<W+40;x+=18){c.beginPath();c.moveTo(x,140);c.lineTo(x-20,W);c.stroke()}c.restore()}
 // воротник
 if(o.collar==='high'){c.fillStyle=o.cl[3]||o.cl[0];poly(c,[[66,148],[72,114],[88,126],[90,152]]);c.fill();poly(c,[[126,148],[120,114],[104,126],[102,152]]);c.fill();c.strokeStyle='#00000055';c.lineWidth=1.4;c.stroke()}
 if(o.collar==='v'){c.fillStyle=o.cl[3]||'#ffffff';poly(c,[[74,144],[88,128],[96,152],[104,128],[118,144],[108,176],[84,176]]);c.fill();c.fillStyle='#0008';poly(c,[[88,128],[96,152],[104,128],[96,134]]);c.fill()}
 if(o.collar==='white'){c.fillStyle=o.cl[3]||'#fff';poly(c,[[70,146],[84,126],[94,150],[88,160]]);c.fill();poly(c,[[122,146],[108,126],[98,150],[104,160]]);c.fill();c.strokeStyle='#00000044';c.lineWidth=1.2;c.stroke()}
 if(o.collar==='armor'){c.fillStyle=LG(c,0,140,0,192,['#4a4a66','#14142a']);poly(c,[[20,170],[40,150],[70,152],[80,176],[70,192],[20,192]]);c.fill();poly(c,[[172,170],[152,150],[122,152],[112,176],[122,192],[172,192]]);c.fill();c.strokeStyle=o.glow;c.lineWidth=1.6;c.stroke()}
}
function accBack(c,o){
 (o.acc||[]).forEach(a=>{
  if(a==='wings'){[[1],[-1]].forEach(([s])=>{c.save();c.translate(96,140);c.scale(s,1);for(let i=0;i<5;i++){c.fillStyle=i%2?'#ffffffdd':'#eef2ffee';c.beginPath();c.moveTo(20,0);c.bezierCurveTo(60+i*8,-70+i*16,110+i*6,-90+i*22,130-i*4,-40+i*26);c.bezierCurveTo(100,-30+i*20,60,-6+i*8,26,14);c.closePath();c.fill()}c.restore()})}
  if(a==='sword'){c.save();c.translate(150,150);c.rotate(-.7);c.fillStyle='#1a1330';c.fillRect(-5,-120,10,130);c.fillStyle='#cfd8ee';c.fillRect(-2.4,-120,4.8,120);c.fillStyle=o.glow;c.fillRect(-14,-6,28,6);c.fillStyle='#141020';c.fillRect(-4,0,8,34);c.restore()}
  if(a==='smoke'){c.globalCompositeOperation='lighter';for(let i=0;i<7;i++){c.fillStyle=RG(c,30+i*22,150-((i*37)%40),0,40,[o.glow+'66',o.glow+'00']);c.beginPath();c.arc(30+i*22,150-((i*37)%40),40,0,TAU);c.fill()}c.globalCompositeOperation='source-over'}
  if(a==='ice'){[[40,70,.4],[152,60,-.4],[30,130,.8],[162,126,-.8]].forEach(([x,y,r])=>{c.save();c.translate(x,y);c.rotate(r);c.fillStyle=LG(c,0,-30,0,30,['#e8fbff','#5ac8ff']);poly(c,[[0,-34],[9,0],[0,30],[-9,0]]);c.fill();c.strokeStyle='#ffffffaa';c.lineWidth=1.2;c.stroke();c.restore()})}
  if(a==='hoodback'){c.fillStyle=LG(c,0,20,0,170,[o.hood[0],o.hood[1]]);c.beginPath();c.moveTo(44,170);c.bezierCurveTo(30,110,48,40,96,28);c.bezierCurveTo(144,40,162,110,148,170);c.closePath();c.fill()}
  if(a==='catears'||a==='foxears'){const col=o.earc||o.hair[0];[[1],[-1]].forEach(([s])=>{c.save();c.translate(96,0);c.scale(s,1);c.fillStyle=col;poly(c,[[-30,70],[-44,22],[-10,50]]);c.fill();c.fillStyle=o.earin||'#ff9ec0';poly(c,[[-27,62],[-37,32],[-16,50]]);c.fill();c.restore()})}
  if(a==='horns'){[[1],[-1]].forEach(([s])=>{c.save();c.translate(96,0);c.scale(s,1);c.fillStyle=LG(c,0,10,0,60,['#fff6e0','#c8b890']);c.beginPath();c.moveTo(-18,56);c.bezierCurveTo(-30,40,-34,24,-24,6);c.bezierCurveTo(-18,24,-8,38,-4,52);c.closePath();c.fill();c.restore()})}
 });
}
function accFront(c,o){
 (o.acc||[]).forEach(a=>{
  if(a==='headband'){c.save();c.translate(96,74);c.rotate(-.04);c.fillStyle='#16203a';c.fillRect(-36,-6,72,12);c.fillStyle=LG(c,0,-8,0,8,['#f2f6ff','#8a96b4']);c.beginPath();c.roundRect(-18,-8,36,16,3);c.fill();c.strokeStyle='#2a3050';c.lineWidth=1.6;c.stroke();c.lineWidth=2.2;c.beginPath();c.moveTo(-8,3);c.quadraticCurveTo(-4,-5,0,0);c.quadraticCurveTo(4,5,8,-3);c.stroke();c.restore()}
  if(a==='strawhat'){c.fillStyle=LG(c,0,36,0,76,['#f6dc7a','#c8a040']);c.beginPath();c.ellipse(96,62,70,15,0,0,TAU);c.fill();c.strokeStyle='#8a6a20';c.lineWidth=1.4;c.stroke();c.fillStyle=LG(c,0,20,0,62,['#f9e68a','#d8b050']);c.beginPath();c.moveTo(60,60);c.bezierCurveTo(58,20,134,20,132,60);c.closePath();c.fill();c.fillStyle='#d8282e';c.fillRect(60,48,72,9);c.strokeStyle='#8a6a20';c.stroke()}
  if(a==='halo'){c.shadowColor='#ffe27a';c.shadowBlur=14;c.strokeStyle='#ffe27a';c.lineWidth=5;c.beginPath();c.ellipse(96,22,34,9,0,0,TAU);c.stroke();c.shadowBlur=0;c.strokeStyle='#fff8c8';c.lineWidth=1.6;c.stroke()}
  if(a==='crown'){c.fillStyle=LG(c,0,24,0,50,['#f0d4ff','#7a3ad8']);poly(c,[[66,52],[64,26],[80,40],[96,20],[112,40],[128,26],[126,52]]);c.fill();c.strokeStyle='#2a0a4a';c.lineWidth=1.4;c.stroke()}
  if(a==='scarf'){c.fillStyle=LG(c,0,130,0,176,['#ff5a6a','#a0101e']);c.beginPath();c.moveTo(62,138);c.quadraticCurveTo(96,160,130,138);c.lineTo(134,154);c.quadraticCurveTo(96,176,58,154);c.closePath();c.fill();c.beginPath();c.moveTo(124,150);c.lineTo(150,186);c.lineTo(132,188);c.lineTo(112,160);c.closePath();c.fill()}
  if(a==='scar'){c.strokeStyle='#c8404a';c.lineWidth=2.2;c.lineCap='round';c.beginPath();c.moveTo(116,84);c.lineTo(106,114);c.stroke();c.lineWidth=1.4;[[113,92,119,94],[111,99,117,101],[109,106,115,108]].forEach(q=>{c.beginPath();c.moveTo(q[0],q[1]);c.lineTo(q[2],q[3]);c.stroke()})}
  if(a==='glasses'){c.strokeStyle='#e8eef8';c.lineWidth=2;c.beginPath();c.roundRect(68,88,24,18,5);c.stroke();c.beginPath();c.roundRect(100,88,24,18,5);c.stroke();c.beginPath();c.moveTo(92,95);c.lineTo(100,95);c.stroke();c.fillStyle='#ffffff22';c.fillRect(69,89,22,16);c.fillRect(101,89,22,16)}
  if(a==='hoodfront'){c.strokeStyle=LG(c,0,30,0,150,[o.hood[0],o.hood[1]]);c.lineWidth=16;c.lineCap='round';c.beginPath();c.moveTo(56,138);c.bezierCurveTo(44,96,56,46,96,38);c.bezierCurveTo(136,46,148,96,136,138);c.stroke();c.strokeStyle='#00000055';c.lineWidth=3;c.beginPath();c.moveTo(63,136);c.bezierCurveTo(54,98,64,56,96,48);c.bezierCurveTo(128,56,138,98,129,136);c.stroke()}
  if(a==='mask'){c.save();c.beginPath();c.moveTo(66,72);c.bezierCurveTo(66,56,126,56,126,72);c.bezierCurveTo(128,100,122,122,104,132);c.quadraticCurveTo(96,136,88,132);c.bezierCurveTo(70,122,64,100,66,72);c.clip();
   c.fillStyle=LG(c,96,56,130,134,['#fffdf6','#cfc8b8']);c.fillRect(94,50,50,100);
   c.fillStyle='#0b0614';c.beginPath();c.ellipse(110,98,11,8,.15,0,TAU);c.fill();c.fillStyle='#ffd23a';c.shadowColor='#ffb020';c.shadowBlur=10;c.beginPath();c.ellipse(110,98,5,5,0,0,TAU);c.fill();c.shadowBlur=0;c.fillStyle='#0b0614';c.beginPath();c.ellipse(110,98,1.8,4,0,0,TAU);c.fill();
   c.strokeStyle='#e0141c';c.lineWidth=3;c.lineCap='round';c.beginPath();c.moveTo(110,64);c.quadraticCurveTo(100,80,108,90);c.moveTo(118,110);c.quadraticCurveTo(122,122,112,130);c.moveTo(100,118);c.lineTo(112,124);c.stroke();
   c.strokeStyle='#00000033';c.lineWidth=1.2;c.beginPath();c.moveTo(94,56);c.lineTo(94,140);c.stroke();c.restore()}
  if(a==='cross'){c.strokeStyle='#8ad8ff';c.shadowColor='#4ab8ff';c.shadowBlur=8;c.lineWidth=3;c.lineCap='round';c.beginPath();c.moveTo(96,160);c.lineTo(96,186);c.moveTo(86,170);c.lineTo(106,170);c.stroke();c.shadowBlur=0}
  if(a==='petals'){const r=rng(11);c.fillStyle='#ffb7d5dd';for(let i=0;i<16;i++){c.save();c.translate(r()*W,r()*W);c.rotate(r()*6);c.beginPath();c.ellipse(0,0,4,2.2,0,0,TAU);c.fill();c.restore()}}
  if(a==='earring'){c.fillStyle='#ffd23c';c.beginPath();c.arc(66,112,3,0,TAU);c.fill()}
  if(a==='fang'){c.fillStyle='#fff';poly(c,[[91,123],[94,123],[92.5,128]]);c.fill()}
 });
}
function finish(c,o){
 // контровой свет сбоку
 c.globalCompositeOperation='screen';c.fillStyle=LG(c,0,0,W,0,[o.glow+'55','#00000000','#00000000','#00000000']);c.fillRect(0,0,W,W);c.globalCompositeOperation='source-over';
 // виньетка
 c.fillStyle=RG(c,96,96,60,140,['#00000000','#00000099']);c.fillRect(0,0,W,W);
}

const D=[
 // 1 Шиноби
 {bg:['#0a1030','#2a1a4a'],glow:'#5a7aff',orb:[140,48,46,'#d8e4ff'],sc:'forest',sil:'#050816aa',hair:['#2a2f4a','#07091a'],hl:'#8aa0ff',hs:'spiky',skin:['#ffe2c8','#e0a888'],eye:['#ff4a5a','#7a0010'],eyeGlow:1,cl:['#1d2a52','#0a1028','#33406e','#1d2a52'],collar:'high',acc:['headband','scarf'],tilt:.2,seed:4},
 // 2 Мечник-синигами
 {bg:['#0a0a1a','#12304a'],glow:'#3ab8ff',orb:[48,56,40,'#bfeaff'],sc:'mount',sil:'#03060fbb',hair:['#ffb02e','#d0601a'],hl:'#fff2b0',hs:'spiky',skin:['#ffe6d0','#e8b090'],eye:['#8a5a2a','#3a1a08'],cl:['#14141e','#05050a','#222','#ffffff'],collar:'white',acc:['sword'],tilt:.22,seed:9},
 // 3 Супер-воин
 {bg:['#3a1a00','#ff9a1a'],glow:'#ffe24a',sc:'mount',sil:'#4a1a0099',hair:['#fff27a','#ffb020'],hl:'#ffffff',hs:'spiky',skin:['#ffe6cc','#e8b48c'],eye:['#3fe0d0','#0a7a7a'],eyeGlow:1,cl:['#ff8a1a','#b84a00','#2a4ad8','#2a4ad8'],collar:'v',acc:[],tilt:.2,seed:2,gy:70},
 // 4 Охотник на демонов
 {bg:['#1a0508','#5a0a1e'],glow:'#ff5a3a',orb:[146,50,38,'#ffb0a0'],sc:'forest',sil:'#100204aa',hair:['#3a2a30','#120a10'],hl:'#ff6a4a',hs:'sweep',skin:['#ffe0c8','#e0a284'],eye:['#c8282e','#5a0610'],cl:['#12261c','#050e0a','#06120c','#12261c'],pat:'check',collar:'high',acc:['scar','earring'],tilt:.1,seed:6},
 // 5 Пират
 {bg:['#ff9a5a','#2a3a8a'],glow:'#ffd27a',orb:[96,92,70,'#fff0b0'],sc:'waves',hair:['#2a2018','#0a0806'],hl:'#8a7050',hs:'short',skin:['#ffdcbc','#dc9c78'],eye:['#3a2a1a','#120a04'],smile:1,cl:['#d8282e','#7a1018','#fff'],collar:'v',acc:['strawhat','scar'],tilt:.05,seed:5},
 // 6 Маг
 {bg:['#12062a','#3a0a6a'],glow:'#c05aff',sc:'city',sil:'#0a0318aa',hair:['#c8a0ff','#6a3ad8'],hl:'#ffffff',hs:'long',skin:['#ffe8e0','#e8b8b0'],eye:['#5affea','#0a8a9a'],eyeGlow:1,cl:['#3a1a7a','#12063a','#6a3ad8','#6a3ad8'],collar:'high',acc:['smoke'],tilt:.1,seed:8,pt:'#c8a0ff'},
 // 7 Пустой с маской
 {bg:['#05050a','#3a0610'],glow:'#e0141c',orb:[96,60,56,'#ff3040'],sc:'mount',sil:'#02020488',hair:['#e8eef8','#6a7490'],hl:'#ffffff',hs:'sweep',skin:['#f4e4dc','#c8a89c'],eye:['#ffb020','#7a3a00'],cl:['#1a1a24','#05050a','#222','#fff'],collar:'white',acc:['mask','fang'],tilt:.22,seed:12},
 // 8 Монарх теней
 {bg:['#03020a','#240a4a'],glow:'#8a3aff',sc:'city',sil:'#05030faa',hair:['#2a2438','#05030c'],hl:'#a07aff',hs:'sweep',skin:['#f0e0d8','#bca8a4'],eye:['#c07aff','#5a10c0'],eyeGlow:1,cl:['#14102a','#05030c','#2a2050','#14102a'],collar:'armor',acc:['smoke','crown'],tilt:.2,seed:3,pt:'#a07aff'},
 // 9 Квинси
 {bg:['#bfe4ff','#4a8ae8'],glow:'#ffffff',sc:'city',sil:'#2a5ab855',hair:['#f4f8ff','#a8b8d8'],hl:'#ffffff',hs:'sweep',skin:['#fff0e6','#ecc4b0'],eye:['#4ab8ff','#1a4ab0'],cl:['#f4f8ff','#a8b8d8','#fff','#e8f0ff'],collar:'high',acc:['glasses','cross'],tilt:.1,seed:10,pt:'#ffffff'},
 // 10 Кошко-девочка
 {bg:['#ffd0e8','#a07aff'],glow:'#ffffff',sc:'none',hair:['#ff9ec8','#d83a8a'],hl:'#ffffff',hs:'twin',skin:['#fff0ea','#f2c0b8'],eye:['#ff5a9a','#a01a5a'],smile:1,cl:['#ffffff','#c8b0e8','#fff','#ff5a9a'],collar:'v',acc:['catears','petals'],tilt:.02,seed:14,earc:'#ff9ec8',pt:'#ffffff'},
 // 11 Ронин
 {bg:['#ff7a3a','#3a0a2a'],glow:'#ffcf7a',orb:[96,100,76,'#ffd27a'],sc:'mount',sil:'#2a0a1a99',hair:['#1a1418','#050405'],hl:'#8a7a90',hs:'pony',skin:['#f6d8bc','#d49c78'],eye:['#8a1a1a','#3a0606'],cl:['#2a2a38','#0a0a12','#3a3a50','#1a1a24'],collar:'white',acc:['scarf','scar'],tilt:.18,seed:15},
 // 12 Божество
 {bg:['#1a0a3a','#ffd27a'],glow:'#fff0a0',orb:[96,76,60,'#fff6c8'],sc:'none',hair:['#ffffff','#d8d0f0'],hl:'#ffffff',hs:'long',skin:['#fff4ec','#f0d0b8'],eye:['#ffd23a','#c07a00'],eyeGlow:1,smile:1,cl:['#ffffff','#d8cce8','#fff','#ffd23a'],collar:'v',acc:['wings','halo'],tilt:.08,seed:16,pt:'#fff0a0'},
 // 13 Ледяной маг
 {bg:['#0a2a4a','#5ac8ff'],glow:'#bff5ff',sc:'mount',sil:'#0a3a6a77',hair:['#bff5ff','#3a9ae8'],hl:'#ffffff',hs:'sweep',skin:['#f6f0f0','#d0c4cc'],eye:['#6ae0ff','#1a6ac8'],eyeGlow:1,cl:['#2a5ab0','#0a1a4a','#6ac8ff','#e8fbff'],collar:'high',acc:['ice'],tilt:.15,seed:17,pt:'#e8fbff'},
 // 14 Лисий дух
 {bg:['#2a0a1a','#ff7a3a'],glow:'#ffb04a',orb:[44,50,34,'#ffe0a0'],sc:'forest',sil:'#1a0610aa',hair:['#ff9a3a','#c0400a'],hl:'#ffe0a0',hs:'sweep',skin:['#ffe6d4','#e8b498'],eye:['#ffd23a','#c07a00'],eyeGlow:1,smile:1,cl:['#d8402a','#6a0e0a','#fff','#fff'],collar:'white',acc:['foxears','fang'],tilt:.22,seed:18,earc:'#ff9a3a',earin:'#fff0d8'}
];

_AVX=D.map(o=>{
 const cv=document.createElement('canvas');cv.width=cv.height=W;const c=cv.getContext('2d');
 scene(c,o);c.save();c.translate(96,112);c.scale(1.22,1.22);c.translate(-96,-104);accBack(c,Object.assign({},o,{acc:(o.acc||[]).filter(a=>['wings','sword','smoke','ice','hoodback','catears','foxears','horns'].includes(a))}));
 c.restore();c.save();c.translate(96,112);c.scale(1.22,1.22);c.translate(-96,-104);hairBack(c,o);body(c,o);face(c,o);eye(c,82,1,o);eye(c,110,-1,o);mouth(c,o);hairFront(c,o);
 accFront(c,Object.assign({},o,{acc:(o.acc||[]).filter(a=>!['wings','sword','smoke','ice','hoodback','catears','foxears','horns'].includes(a))}));
 c.restore();
 finish(c,o);
 const out=document.createElement('canvas');out.width=out.height=96;const oc=out.getContext('2d');oc.imageSmoothingQuality='high';oc.drawImage(cv,0,0,96,96);
 return out.toDataURL('image/jpeg',.9);
});
return _AVX}
function avGrid(e){if(pickAv==="😀"&&!me)pickAv=AVX()[0];const t=$(e);avCb=()=>avGrid(e),t.innerHTML=(lastCust?`<button class="alt avb${pickAv===lastCust?" sel":""}" data-c="1">${avH(lastCust)}</button>`:"")+AVX().map(n=>`<button class="alt avb${n===pickAv?" sel":""}" data-a="${n}">${avH(n)}</button>`).join("")+`<button class="alt avup" data-up="1"><svg class="ico"><use href="#i-gallery"/></svg>${tr("gal")}</button>`,t.querySelectorAll(".avb").forEach(n=>n.onclick=()=>{pickAv=n.dataset.c?lastCust:n.dataset.a,avGrid(e)}),t.querySelector(".avup").onclick=()=>upl.click()}const esc=e=>String(e).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);$("a_rar").innerHTML=R.map((e,t)=>`<option value="${t}">${e.n}</option>`).join(""),$("adm").onclick=()=>{openPanel("admp"),renderGrants(),(isOwner||granted)&&modLoad()};function profSub(){const e=isOwner?"#ffb02e":granted?"#6cb4ff":"#3fe0b0";return`<span style="color:${e}">${tr(isOwner?"owner":granted?"admin":"player")}</span>${gpHas("vip")?' <span class="vtag">VIP</span>':""}`}function pendCached(){try{const c=JSON.parse(localStorage.getItem(GPX+"gacha-prof")||"null");return!!(c&&c.t===TOKEN&&c.nick)}catch{return!1}}function __ldS(p){try{window.__ld&&window.__ld.stage(p)}catch{}}function __ldD(){try{window.__ld&&window.__ld.done()}catch{}}function pendProf(){let c=null;try{c=JSON.parse(localStorage.getItem(GPX+"gacha-prof")||"null")}catch{}if(c&&c.t===TOKEN&&c.nick){const k=c.role==="owner"?"#ffb02e":c.role==="admin"?"#6cb4ff":"#3fe0b0",r=tr(c.role==="owner"?"owner":c.role==="admin"?"admin":"player");return`<button class="alt chip" disabled><span class="av">${avH(c.avatar)}</span><span class="pw"><b class="pn">${esc(c.nick)}</b><small class="ps"><span style="color:${k}">${r}</span></small></span></button>`}return`<button class="alt chip" disabled style="visibility:hidden"><span class="pw"><b class="pn">&nbsp;</b><small class="ps">&nbsp;</small></span></button>`}function renderProf(){$("menuBtn").style.display="",$("shopBtn").style.display="",$("topBtn").style.display="",$("prof").innerHTML=me?`<button class="alt chip" id="pchip"><span class="av">${avH(me.avatar)}</span><span class="pw"><b class="pn">${esc(me.nick)}</b><small class="ps">${profSub()}</small></span></button>`:TOKEN?pendProf():`<button class="chip" id="inb"><svg class="ico"><use href="#i-user"/></svg>${tr("login")}</button>`,$("out").style.display=me?"":"none",$("pchip")&&($("pchip").onclick=()=>$("setb").onclick()),$("inb")&&($("inb").onclick=()=>{window.__regManual=1;openReg()})}$("out").onclick=()=>{try{localStorage.removeItem(GPX+"gacha-token")}catch{}toGuest()};function openReg(e){if(window.NOREG&&!window.__regManual)return;const _w=$("reg").style.display==="flex";if(!_w){const a=$("reg_nick"),b=$("reg_pw");a.value="";b.value="";setTimeout(()=>{document.activeElement!==a&&document.activeElement!==b&&(a.value="",b.value="")},250)}e&&(mode=e);const t=mode==="reg";$("reg").style.display="flex",$("reg_t").textContent=tr(t?"createProf":"signin"),$("t_reg").style.opacity=t?1:.5,$("t_in").style.opacity=t?.5:1,$("avs").style.display=t?"grid":"none",$("reg_ok").textContent=tr(t?"create":"signin"),$("reg_st").textContent="",avGrid("avs")}$("t_reg").onclick=()=>openReg("reg"),$("t_in").onclick=()=>openReg("in");function applyMe(e){window.__clAmt=1;window.__colReset&&window.__colReset();resetOrb();me={nick:e.nick,avatar:e.avatar,role:e.role||"",nickAt:+e.nick_at||0},(()=>{try{localStorage.setItem(GPX+"gacha-prof",JSON.stringify({t:TOKEN,nick:me.nick,avatar:me.avatar,role:me.role}))}catch{}})(),isOwner=me.role==="owner",granted=me.role==="admin",evSel(),S=Object.assign(FRESH(),e.save||{}),normS(),iaRestore(),ready=!0,dirty=!1;try{localStorage.setItem(GPX+"gacha-seen","1")}catch{}renderProf();const t=isOwner||granted;$("adm").style.display=t?"":"none",$("reset").style.display=isOwner?"":"none",$("setb").style.display="",$("tgtw").style.display=t?"block":"none",$("modbox").style.display=t?"block":"none",$("m_clrw").style.display=isOwner?"":"none",t&&modLoad(),isOwner&&($("own").style.display="block",$("logbox").style.display="block",renderGrants(),window.logLoad&&window.logLoad(!0)),$("reg").style.display="none",render(),snapNums(),setTimeout(()=>{try{loadPlayers();loadTr()}catch{}},800);__ldD()}setInterval(()=>{try{if(!TOKEN&&!me&&$("reg").style.display!=="flex")openReg()}catch(e){}},500);
["reg_nick","reg_pw"].forEach(i=>$(i).addEventListener("input",()=>{$("reg_st").textContent=""}));$("reg_ok").onclick=async()=>{const e=$("reg_nick").value.trim(),t=$("reg_pw").value,n=$("reg_st");const bad=()=>{n.style.color="#ff4d4d";n.textContent=L2("Заполните поля","Fill in the fields")};if(!/^[A-Za-z0-9_А-Яа-яЁё-]{3,16}$/.test(e)){bad();return}if(t.length<4){bad();return}n.textContent=tr("wait");const o=mode==="reg"?await rpc("g2_register",{p_nick:e,p_pass:t,p_avatar:pickAv,p_save:S}):await rpc("g2_login",{p_nick:e,p_pass:t});if(o.error){if(mode!=="reg"){const a=await rpc("g2_is_banned",{p_nick:e});if(a.data&&a.data.banned){n.textContent="",toast(L2("Аккаунт заблокирован","Account is banned")+(a.data.reason?": "+a.data.reason:""),"err");return}}n.textContent="",toast(srv(o.error),"err");return}n.textContent="",toast(mode==="reg"?L2("Аккаунт создан","Account created"):L2("Вы вошли в аккаунт","Signed in"),"ok"),mode==="reg"&&iaClear(e);TOKEN=o.data.token;try{localStorage.setItem(GPX+"gacha-token",TOKEN)}catch{}applyMe(o.data)};async function setRole(e,t){const n=await rpc("g2_set_role",{p_token:TOKEN,p_key:e,p_role:t});n.error?toast(srv(n.error),"err"):toast(t?L2("Доступ к админке выдан","Admin access granted"):L2("Доступ к админке забран","Admin access revoked"),"ok"),renderGrants()}function grTxt(){$("g_give").textContent=tr("ggive"),$("g_take").textContent=tr("gtake");const e=$("g_who").options[0];e&&(e.textContent=tr("gwho"));const w=$("a_who").options;w[0]&&(w[0].textContent=L2("Выберите игрока","Choose a player")),w[1]&&w[1].value==="me"&&(w[1].textContent=tr("meopt"))}function ccKey(k){return GPX+"gacha-cc-"+k+"-"+String(me&&me.nick||"").toLowerCase()}function ccGet(k){try{return JSON.parse(localStorage.getItem(ccKey(k))||"null")}catch{return null}}function ccSet(k,v){try{localStorage.setItem(ccKey(k),JSON.stringify(v))}catch{}}function ccClear(){try{Object.keys(localStorage).filter(x=>x.indexOf(GPX+"gacha-cc-")===0).forEach(x=>localStorage.removeItem(x))}catch{}}
let GP=[];async function renderGrants(){if(!isOwner)return;const c=ccGet("pl");c&&!GP.length&&drawGrants({data:c});const e=await rpc("g2_players",{p_token:TOKEN});if(e.error)return;ccSet("pl",e.data);drawGrants(e)}function drawGrants(e){(e.data||[]).forEach(i=>{AVMAP[i.key]=i.avatar});let t="";const n=$("a_who"),o=n.value;n.innerHTML=`<option value="" disabled hidden>${L2("Выберите игрока","Choose a player")}</option><option value="me">${tr("meopt")}</option>`+(e.data||[]).filter(i=>i.role!=="owner").map(i=>`<option value="${esc(i.key)}">${avP(i.avatar)}${esc(i.nick)}</option>`).join(""),n.value=[...n.options].some(i=>i.value===o)?o:"",GP=(e.data||[]).filter(i=>i.role!=="owner"),GP.forEach(i=>{i.role==="admin"&&(t+=`<div class="gr"><span>${avH(i.avatar)} ${esc(i.nick)}</span><button class="alt" data-rv="${esc(i.key)}">${tr("revoke")}</button></div>`)}),$("g_list").innerHTML=t||"<i>"+tr("nobody")+"</i>";const a=$("g_who"),r=a.value;a.innerHTML=`<option value="" disabled hidden>${tr("gwho")}</option>`+GP.map(i=>`<option value="${esc(i.key)}">${avP(i.avatar)}${esc(i.nick)}${i.role==="admin"?" ★":""}</option>`).join(""),a.value=[...a.options].some(i=>i.value===r)?r:"",grTxt(),document.querySelectorAll("#g_list [data-rv]").forEach(i=>i.onclick=()=>setRole(i.dataset.rv,""))}function grAct(e){const t=$("g_who").value;if(!t)return toast(tr("gpick"),"err");const n=GP.find(o=>o.key===t);if(n&&n.role===e)return toast(tr(e?"galready":"gnot"),"info");setRole(t,e)}$("g_give").onclick=()=>grAct("admin"),$("g_take").onclick=()=>grAct("");const DAY7=7*864e5,NICKRE=/^[A-Za-z0-9_А-Яа-яЁё-]{3,16}$/,sMsg=(e,t)=>{$("s_st").textContent="",e&&toast(e,t?"ok":"err")},nickLeft=()=>me.nickAt?me.nickAt+DAY7-Date.now():0;function renderSet(){avGrid("s_avs"),$("s_nick").value=me.nick;const e=nickLeft(),h=$("s_st");h.textContent=e>0?tr("nickwait",Math.ceil(e/864e5)):"",h.style.color="var(--mute)"}$("setb").onclick=()=>{pickAv=me.avatar,isImg(me.avatar)&&(lastCust=me.avatar),renderSet(),openPanel("setp")},$("s_av").onclick=async()=>{const e=me.avatar,t=await rpc("g2_set_avatar",{p_token:TOKEN,p_avatar:pickAv});if(t.error)return sMsg(t.error);if(isImg(pickAv)){const n=await rpc("g2_me",{p_token:TOKEN});if((n&&n.data?n.data.avatar:pickAv)!==pickAv)return await rpc("g2_set_avatar",{p_token:TOKEN,p_avatar:bad(e)?"😀":e}),me.avatar=bad(e)?"😀":e,pickAv=me.avatar,renderProf(),renderSet(),sMsg(tr("avcut"))}me.avatar=pickAv,renderProf(),sMsg(tr("avok"),1)},$("s_nb").onclick=async()=>{const e=$("s_nick").value.trim();if(!NICKRE.test(e))return sMsg(tr("nickrule"));if(e===me.nick)return sMsg(tr("samenick"));const t=nickLeft();if(t>0)return sMsg(tr("nickwait",Math.ceil(t/864e5)));const n=await rpc("g2_change_nick",{p_token:TOKEN,p_nick:e});if(n.error)return sMsg(n.error);me.nick=e,me.nickAt=Date.now(),renderProf(),renderSet(),sMsg(tr("nickok"),1),isOwner&&renderGrants()},$("s_pb").onclick=async()=>{const e=$("s_old").value,t=$("s_new").value;if(t.length<4)return sMsg(tr("pwmin2"));const n=await rpc("g2_change_password",{p_token:TOKEN,p_old:e,p_new:t});if(n.error)return sMsg(n.error);TOKEN=n.data.token;try{localStorage.setItem(GPX+"gacha-token",TOKEN)}catch{}$("s_old").value=$("s_new").value="",sMsg(tr("pwok"),1)},$("s_del").onclick=()=>{if(isOwner)return sMsg(tr("ownerdel"));$("del_nick").value="",$("del_st").textContent="",$("delModal").classList.add("show")},$("delNo").onclick=()=>$("delModal").classList.remove("show"),$("delYes").onclick=async()=>{if($("del_nick").value.trim().toLowerCase()!==me.nick.toLowerCase()){toast(tr("delmis"),"err");return}const e=await rpc("g2_delete_account",{p_token:TOKEN});if(e.error){toast(srv(e.error),"err");return}try{localStorage.removeItem(GPX+"gacha-token")}catch{}iaClear(me.nick),toast(L2("Аккаунт удалён","Account deleted"),"ok"),toGuest()};function toGuest(){window.__clAmt=1;window.__colReset&&window.__colReset();ccClear();TOKEN=null;me=null;isOwner=!1;granted=!1;ready=!0;dirty=!1;
 S=FRESH();try{const x=localStorage.getItem(KEY);x&&(S=Object.assign(S,JSON.parse(x)))}catch{}normS();
 ["adm","reset","tgtw","modbox","own","m_clrw","logbox"].forEach(i=>{const e=$(i);e&&(e.style.display="none")});
 try{closePanel()}catch{}renderProf();render();openReg("in")}
async function selfCleared(av){ready=!1;dirty=!1;TRB=1;if(av)await rpc("g2_set_avatar",{p_token:TOKEN,p_avatar:av});
 const m=await rpc("g2_me",{p_token:TOKEN});m.data?applyMe(m.data):ready=!0}
async function boot(){const e=await rpc("g2_me",{p_token:TOKEN});if(e.net||e.status>=500||e.status===429){$("pity").textContent=tr("retry"),setTimeout(boot,4e3);__ldD();return}if(e.error){TOKEN=null;S=FRESH();try{localStorage.removeItem(GPX+"gacha-token"),localStorage.removeItem(GPX+"gacha-snap")}catch{}ready=!0,renderProf(),render(),openReg("in"),__ldD();return}applyMe(e.data)}if(renderProf(),TOKEN){setTimeout(()=>{try{me||(render(),snapNums())}catch{}},0);__ldS(70);pendCached()&&setTimeout(__ldD,2500);boot()}else{let e=null;try{e=localStorage.getItem(GPX+"gacha-seen")}catch{}openReg(e?"in":"reg");__ldD()}const aMsg=(e,t)=>toast(srv(e),t?"ok":"err");function admSelfLog(a,b){try{if(!TOKEN)return;const P=[],n=x=>Math.floor(+x||0),L=(k,l,sg)=>{const x=n(a[k]),y=n(b[k]);if(x!==y)P.push(sg?l+" "+(y>x?"+":"−")+Math.abs(y-x)+" ("+x+"→"+y+")":l+" "+x+"→"+y)};L("coins","монеты",1);L("gem","тикеты",1);L("luck","удача");L("inc","доход");L("rolls","роллы");const c=o=>o?Object.keys(o).length:0,l=o=>Array.isArray(o)?o.length:0;if(c(a.found)!==c(b.found))P.push("коллекция "+c(a.found)+"→"+c(b.found));if(l(a.pt)!==l(b.pt))P.push("питомцы "+l(a.pt)+"→"+l(b.pt));if(l(a.tb)!==l(b.tb))P.push("титулы "+l(a.tb)+"→"+l(b.tb));if(P.length)rpc("g2_admin_log",{p_token:TOKEN,p_detail:P.join("; ")})}catch(e){}}const ADM_CAP=999e33,admCap=n=>Math.min(ADM_CAP,Math.max(0,n)),admAmt=()=>{const i=$("a_coins"),v=+i.value||0;if(v>ADM_CAP){i.value=ADM_CAP;toast(L2("Максимум 999 Dc","Maximum 999 Dc"),"err")}return Math.min(ADM_CAP,Math.max(0,Math.floor(v)))};let _admLk=0,_admAt=0;async function adm(e){if(_admLk)return;_admLk=1;try{await adm0(e)}finally{_admAt=Date.now();_admLk=0}}async function adm0(e){const __st=isOwner||granted;let t=__st?$("a_who").value:"";if(__st&&!t)return toast(L2("Выберите игрока (этого игрока править нельзя)","Pick a player (this one can\u2019t be edited)"),"err");if(t==="me")t="";if(!t){const __b=JSON.parse(JSON.stringify(S));e(S),render(),save(),dirty=!0,push(),admSelfLog(__b,S),toast(L2("Готово","Done"),"ok");return}const n=await rpc("g2_admin_get",{p_token:TOKEN,p_key:t});if(n.error)return aMsg(n.error);const o=Object.assign(FRESH(),n.data&&n.data.save||n.data||{});e(o);try{(function d(x,n){if(!x||typeof x!=="object"||n>6)return;for(var k in x){var v=x[k];if(typeof v==="number"){if(v!==v)x[k]=0;else if(v>999e33)x[k]=999e33}else if(v&&typeof v==="object")d(v,n+1)}})(o,0)}catch(e){}const a=await rpc("g2_admin_set",{p_token:TOKEN,p_key:t,p_save:o});if(a.error)return aMsg(a.error);aMsg(tr("edited",$("a_who").selectedOptions[0].textContent),1)}$("a_give").onclick=()=>adm(e=>{e.coins=admCap((+e.coins||0)+admAmt())}),$("a_take").onclick=()=>adm(e=>{e.coins=Math.max(0,(+e.coins||0)-admAmt())}),$("a_setluck").onclick=()=>adm(e=>{e.luck=Math.min(MAXLUCK,Math.max(0,Math.floor(+$("a_luck").value||0)))}),$("a_setinc").onclick=()=>adm(e=>{e.inc=Math.min(MAXINC,Math.max(0,Math.floor(+$("a_inc").value||0)))}),$("a_item").onclick=()=>{adm(e=>{const n=+$("a_rar").value,o=R[n].items,a=o[Math.floor(Math.random()*o.length)];e.found[a]=(e.found[a]||0)+1,n>e.best&&(e.best=n),e===S&&show(n,a,tr("byadm"))})},$("a_all").onclick=()=>adm(e=>{ALL.forEach(t=>{e.found[t.t]||(e.found[t.t]=1)})}),setInterval(()=>{if(ready){let cf=+S.cf;(!isFinite(cf)||cf<0||cf>=1)&&(cf=0);const g=incNow()+cf,w=Math.floor(g);S.cf=+(g-w).toFixed(6),S.coins+=w,document.hidden||render(),save()}},1e3);const G=(e,t)=>LANG==="en"?t:e,rnd=e=>{const t=new Uint32Array(1);return crypto.getRandomValues(t),t[0]%e};let gmTab="mines",MN=null,BJ=null,DC={side:"u",t:50};let gmT=null;const gmMsg=(e,t)=>{const n=$("gm_msg");n.textContent=e,n.style.color=t||"var(--text)",gmT&&gmT.parentNode&&gmT.remove(),gmT=e&&t?toast(e,t==="var(--c5)"?"err":"ok"):null},gmBal=()=>{$("gm_bal").textContent=fmt(S.coins)},gmBet=()=>Math.floor(+$("gm_bet").value||0),gmLocked=()=>!!(MN&&MN.on||BJ&&BJ.on||RR&&RR.on);function gmTake(e){return ready?e<1?(gmMsg(G("Укажите ставку","Enter a bet"),"var(--c5)"),!1):e>S.coins?(gmMsg(G("Не хватает монет","Not enough coins"),"var(--c5)"),!1):(S.coins-=e,render(),save(),gmBal(),!0):!1}function gmPay(e){e=Math.floor(e),e>0&&(S.coins+=e,render(),save()),gmBal()}const gmNames=()=>({mines:G("Мины","Mines"),bj:G("Блэкджек","Blackjack"),coin:G("Монетка","Coin"),dice:G("Кости","Dice"),rr:G("Рулетка","Roulette")});function gmDraw(){gmBal();const e=gmNames(),t=gmLocked();$("gm_tabs").innerHTML=Object.keys(e).map(n=>`<button class="${n===gmTab?"":"alt"}" data-g="${n}" style="padding:10px;min-width:0">${e[n]}</button>`).join(""),document.querySelectorAll("#gm_tabs [data-g]").forEach(n=>n.onclick=()=>{if(gmLocked())return gmMsg(G("Сначала закончите раунд","Finish the round first"),"var(--c5)");gmTab=n.dataset.g,gmMsg(""),gmDraw()}),$("gm_bet").disabled=t,document.querySelectorAll("[data-q]").forEach(n=>n.disabled=t),{mines:drawMines,bj:drawBJ,coin:drawCoin,dice:drawDice,rr:drawRR}[gmTab]()}document.querySelectorAll("[data-q]").forEach(e=>e.onclick=()=>{const t=gmBet()||1,n=e.dataset.q;$("gm_bet").value=n==="h"?Math.max(1,Math.floor(t/2)):n==="d"?t*2:Math.max(1,Math.floor(S.coins))});const MNT=[1,1.28,1.65,2.1],MNf=(e,t)=>{if(e<MNT.length)return MNT[e];let n=1;for(let o=0;o<e;o++)n*=(25-o)/(19-o);return +(n*.885).toFixed(2)};function mnCash(){if(!MN||!MN.on)return;const e=Math.floor(MN.bet*MNf(MN.open.size,MN.m));MN.on=!1,gmPay(e),gmMsg(G("Забрано ","Cashed out ")+fmt(e)+" 🪙 (+"+fmt(e-MN.bet)+")","var(--c1)"),gmDraw()}function drawMines(){const e=MN,t=e&&e.on,n=e?e.open.size:0,o=e&&!e.lost?MNf(n,e.m):0;let a="";t||(a+=`<div class="row" style="align-items:center;margin-top:0"><span style="flex:none;font-size:14px">💣 6</span><button id="mn_go">${G("Начать","Start")}</button></div>`),e&&(a+=`<div style="font-size:14px;margin-top:10px">${G("Множитель","Multiplier")}: <b>x${o.toFixed(2)}</b>${t&&n<25-e.m?` · ${G("следующий","next")} x${MNf(n+1,e.m).toFixed(2)}`:""}</div><div class="gmg">`+Array.from({length:25},(r,i)=>{const d=e.open.has(i),l=e.mines.has(i);return`<button class="alt gmc" data-c="${i}"${t&&!d?"":" disabled"}>${d||!t&&l?l?"💣":"💎":"❔"}</button>`}).join("")+"</div>",t&&n>0&&(a+=`<button id="mn_cash" style="width:100%;background:linear-gradient(135deg,#1fa85a,#17c29a)">${G("Забрать","Cash out")} ${fmt(Math.floor(e.bet*o))}</button>`)),$("gm_area").innerHTML=a,$("mn_go")&&($("mn_go").onclick=()=>{const r=6,i=gmBet();if(!gmTake(i))return;const d=new Set;for(;d.size<r;)d.add(rnd(25));MN={on:!0,mines:d,open:new Set,m:r,bet:i,lost:!1},gmMsg(""),gmDraw()}),$("mn_cash")&&($("mn_cash").onclick=mnCash),document.querySelectorAll(".gmc").forEach(r=>r.onclick=()=>{const i=+r.dataset.c;if(!(!MN||!MN.on||MN.open.has(i))){if(MN.mines.has(i)){MN.on=!1,MN.lost=!0,gmMsg(G("Мина! Ставка проиграна","Boom! Bet lost"),"var(--c5)"),gmDraw();return}MN.open.add(i),MN.open.size===25-MN.m?mnCash():gmDraw()}})}const SU=["♠","♥","♦","♣"],RK=["A","2","3","4","5","6","7","8","9","10","J","Q","K"],bjTot=e=>{let t=0,n=0;for(e.forEach(o=>{t+=o.r===1?11:Math.min(o.r,10),o.r===1&&n++});t>21&&n;)t-=10,n--;return t},bjCard=(e,t)=>`<span class="bjc${e.s===1||e.s===2?" red":""}">${t?"?":RK[e.r-1]+SU[e.s]}</span>`;function bjEnd(){if(!BJ||!BJ.on)return;const e=BJ,t=bjTot(e.p);if(e.on=!1,t<=21)for(;bjTot(e.d)<17;)e.d.push(e.deck.pop());const n=bjTot(e.d),o=e.p.length===2&&t===21&&!e.dbl,a=e.d.length===2&&n===21;let r=0,i;t>21?i=G("Перебор, проигрыш","Bust, you lose"):o&&!a?(r=e.bet*2.5,i=G("Блэкджек! x2.5","Blackjack! x2.5")):n>21||t>n?(r=e.bet*2,i=G("Победа!","You win!")):t===n?(r=e.bet,i=G("Ничья, ставка возвращена","Push, bet returned")):i=G("Дилер выиграл","Dealer wins"),gmPay(r),gmMsg(i+(r>e.bet?" +"+fmt(Math.floor(r-e.bet))+" 🪙":""),r>e.bet?"var(--c1)":r===e.bet?"var(--text)":"var(--c5)"),gmDraw()}function drawBJ(){const e=BJ,t=e&&e.on;let n="";e&&(n+=`<div style="font-size:13px;color:var(--mute)">${G("Дилер","Dealer")}${t?"":" · "+bjTot(e.d)}</div><div>${e.d.map((o,a)=>bjCard(o,t&&a===1)).join("")}</div><div style="font-size:13px;color:var(--mute);margin-top:6px">${G("Вы","You")} · ${bjTot(e.p)}</div><div>${e.p.map(o=>bjCard(o)).join("")}</div>`),n+=t?`<div class="row"><button id="bj_h">${G("Ещё","Hit")}</button><button id="bj_s">${G("Хватит","Stand")}</button>${e.p.length===2&&e.bet<=S.coins?'<button class="alt" id="bj_d">x2</button>':""}</div>`:`<button id="bj_go" style="width:100%;margin-top:10px">${G("Раздать","Deal")}</button>`,$("gm_area").innerHTML=n,$("bj_go")&&($("bj_go").onclick=()=>{const o=gmBet();if(!gmTake(o))return;const a=[];for(let r=0;r<4;r++)for(let i=1;i<=13;i++)a.push({r:i,s:r});for(let r=51;r>0;r--){const i=rnd(r+1);[a[r],a[i]]=[a[i],a[r]]}BJ={on:!0,deck:a,p:[a.pop(),a.pop()],d:[a.pop(),a.pop()],bet:o,dbl:!1},gmMsg(""),bjTot(BJ.p)===21?bjEnd():gmDraw()}),$("bj_h")&&($("bj_h").onclick=()=>{BJ.p.push(BJ.deck.pop()),bjTot(BJ.p)>=21?bjEnd():gmDraw()}),$("bj_s")&&($("bj_s").onclick=bjEnd),$("bj_d")&&($("bj_d").onclick=()=>{gmTake(BJ.bet)&&(BJ.bet*=2,BJ.dbl=!0,BJ.p.push(BJ.deck.pop()),bjEnd())})}function drawCoin(){$("gm_area").innerHTML=`<div id="cf_r" style="font-size:56px;text-align:center">🪙</div><div style="text-align:center;font-size:13px;color:var(--mute)">${G("Выигрыш","Payout")} x1.94</div><div class="row"><button data-s="0">${G("Орёл","Heads")}</button><button class="alt" data-s="1">${G("Решка","Tails")}</button></div>`,document.querySelectorAll("#gm_area [data-s]").forEach(e=>e.onclick=()=>{const t=gmBet();if(!gmTake(t))return;const n=rnd(2),o=n===+e.dataset.s;$("cf_r").textContent=n?"🌑":"🦅",o&&gmPay(t*1.94),gmMsg(o?G("Угадали! +","Won! +")+fmt(Math.floor(t*.94))+" 🪙":G("Не угадали","Wrong guess"),o?"var(--c1)":"var(--c5)")})}function drawDice(){const e=()=>{const t=DC.side==="u"?(DC.t-1)/100:(100-DC.t)/100;$("dc_i").innerHTML=`${G("Шанс","Chance")} <b>${Math.round(t*100)}%</b> · x<b>${(.97/t).toFixed(2)}</b>`,$("dc_t").textContent=(DC.side==="u"?"< ":"> ")+DC.t};$("gm_area").innerHTML=`<div class="row" style="margin-top:0"><button id="dc_u" class="${DC.side==="u"?"":"alt"}">${G("Меньше","Under")}</button><button id="dc_o" class="${DC.side==="o"?"":"alt"}">${G("Больше","Over")}</button></div><div id="dc_t" style="text-align:center;font:800 28px var(--fh);margin:10px 0 4px"></div><input id="dc_s" type="range" min="5" max="95" value="${DC.t}" style="width:100%;padding:0"><div id="dc_i" style="text-align:center;font-size:14px;margin:6px 0"></div><div id="dc_r" style="text-align:center;font:800 34px var(--fh);min-height:44px"></div><button id="dc_go" style="width:100%">${G("Бросить","Roll")}</button>`,e(),$("dc_u").onclick=()=>{DC.side="u",drawDice()},$("dc_o").onclick=()=>{DC.side="o",drawDice()},$("dc_s").oninput=t=>{DC.t=+t.target.value,e()},$("dc_go").onclick=()=>{const t=gmBet();if(!gmTake(t))return;const n=rnd(100)+1,o=DC.side==="u"?n<DC.t:n>DC.t,a=DC.side==="u"?(DC.t-1)/100:(100-DC.t)/100;if($("dc_r").textContent=n,o){const r=Math.floor(t*.97/a);gmPay(r),gmMsg(G("Победа! +","You win! +")+fmt(r-t)+" 🪙","var(--c1)")}else gmMsg(G("Проигрыш","You lose"),"var(--c5)")}}
/* ===== РУССКАЯ РУЛЕТКА ===== */
const RRN=6,RRm=(k,n)=>{let p=1;for(let i=0;i<n;i++)p*=(RRN-k-i)/(RRN-i);return p>0?+(.95/p).toFixed(2):0};
let RR=null,RRK=2;
function rrCash(){
  if(!RR||!RR.on)return;
  const e=Math.floor(RR.bet*RRm(RR.k,RR.pulls));
  RR.on=!1;gmPay(e);
  gmMsg(G("Забрано ","Cashed out ")+fmt(e)+" 🪙 (+"+fmt(e-RR.bet)+")","var(--c1)");
  gmDraw();
}
function drawRR(){
  const e=RR,t=!!(e&&e.on),n=e?e.pulls:0,k=e?e.k:RRK;
  const mult=e?(e.lost?0:RRm(k,n)):0;
  const slots=Array.from({length:RRN},(_,i)=>{
    const ang=i*60*Math.PI/180,x=50+36*Math.sin(ang),y=50-36*Math.cos(ang);
    let c="●",cl="";
    if(e){
      if(i<n){c="○";cl="ok"}
      else if(e.lost&&i===n){c="💥";cl="boom"}
      else if(!e.on){c=e.ch[i]?"🔴":"○";cl=e.ch[i]?"bl":"ok"}
      else if(i===n){cl="cur"}
    }
    return `<div class="rrh ${cl}" style="left:${x}%;top:${y}%">${c}</div>`;
  }).join("");
  let a=`<div class="rrc">${slots}<div class="rrm">${e?"x"+mult.toFixed(2):"🔫"}</div></div>`;
  if(t){
    const left=RRN-k-n,pl=RRN-n;
    a+=`<div style="font-size:14px;text-align:center">${G("Шанс выжить","Survive chance")}: <b>${Math.round(left/pl*100)}%</b> · ${G("следующий","next")} <b>x${RRm(k,n+1).toFixed(2)}</b></div>`;
    a+=`<div class="row"><button id="rr_pull" style="background:linear-gradient(135deg,#c0392b,#ff4f6d)">🔫 ${G("Нажать на курок","Pull trigger")}</button>${n>0?`<button id="rr_cash" style="background:linear-gradient(135deg,#1fa85a,#17c29a)">${G("Забрать","Cash out")} ${fmt(Math.floor(e.bet*mult))}</button>`:""}</div>`;
  }else{
    a+=`<div style="text-align:center;font-size:13px;color:var(--mute)">${G("Патронов в барабане (из 6)","Bullets in the cylinder (of 6)")}</div><div class="row" style="margin-top:6px">${[1,2,3,4,5].map(x=>`<button class="${x===RRK?"":"alt"}" data-rk="${x}" style="padding:10px;min-width:0">${x}</button>`).join("")}</div><div style="text-align:center;font-size:13px;color:var(--mute);margin-top:6px">${G("Первый выстрел безопасен на","First pull is safe at")} ${Math.round((RRN-RRK)/RRN*100)}% · x${RRm(RRK,1).toFixed(2)} · ${G("макс.","max")} x${RRm(RRK,RRN-RRK).toFixed(2)}</div><button id="rr_go" style="width:100%;margin-top:10px">${G("Зарядить и крутить барабан","Load & spin")}</button>`;
  }
  $("gm_area").innerHTML=a;
  document.querySelectorAll("#gm_area [data-rk]").forEach(b=>b.onclick=()=>{RRK=+b.dataset.rk;RR=null;drawRR()});
  if($("rr_go"))$("rr_go").onclick=()=>{
    const bet=gmBet();if(!gmTake(bet))return;
    const ch=Array.from({length:RRN},(_,i)=>i<RRK);
    for(let i=RRN-1;i>0;i--){const j=rnd(i+1);[ch[i],ch[j]]=[ch[j],ch[i]]}
    RR={on:!0,k:RRK,ch,pulls:0,bet,lost:!1};
    gmMsg("");gmDraw();
    const c=document.querySelector(".rrc");c&&c.classList.add("sp");
  };
  if($("rr_pull"))$("rr_pull").onclick=()=>{
    if(!RR||!RR.on)return;
    if(RR.ch[RR.pulls]){RR.on=!1;RR.lost=!0;gmMsg(G("Выстрел! Ставка проиграна","Bang! Bet lost"),"var(--c5)");gmDraw();return}
    RR.pulls++;
    if(RR.pulls>=RRN-RR.k){rrCash();return}
    gmMsg(G("Щёлк! Пусто…","Click! Empty…"));gmDraw();
  };
  if($("rr_cash"))$("rr_cash").onclick=rrCash;
}

$("gmb").onclick=()=>{gmMsg(""),gmDraw(),openPanel("gmp")};function openPanel(e){const was=$("pwrap").classList.contains("open");try{const _f=$("flash");_f&&_f.classList.remove("go");const _x=$("fxl");_x&&(_x.textContent="");e==="topp"&&window.vipLoad&&window.vipLoad(1)}catch(_e){}["setp","admp","shp","trp","topp","gmp","promop","qstp","clanp","bpp","exp","privp","drp","wdp","mobp","rwp","frp","gxp","wpp"].forEach(t=>$(t)&&($(t).style.display=t===e?"block":"none")),$("pwrap").classList.add("open"),$(e).scrollTop=0;if(was){const p=$(e);p.classList.remove("swap");p.offsetWidth;p.classList.add("swap")}}function closePanel(){$("pwrap").classList.remove("open"),document.querySelectorAll("#pwrap>.pbox").forEach(x=>{x.classList.remove("swap");x.style.display="none"})}$("pwrap").onclick=e=>{e.target===$("pwrap")&&closePanel()},document.querySelectorAll(".pclose").forEach(e=>e.onclick=closePanel),document.addEventListener("keydown",e=>{e.key==="Escape"&&closePanel()});let evOff=!1,EVNEXT=0,EVAUTO=!0;const fmtT=e=>{const t=Math.floor(e/86400),n=Math.floor(e%86400/3600),o=Math.floor(e%3600/60),a=e%60,r=i=>String(i).padStart(2,"0");return(t?t+(LANG==="en"?"d ":"д "):"")+(t||n?(t?r(n):n)+":":"")+r(o)+":"+r(a)};function evH(el,h){if(el.__h!==h){el.innerHTML=h;el.__h=h}}function renderEv(){const e=$("evbar"),t=LANG==="en",n=evActive();if(renderEvLive(),n.length){e.style.display="block",e.style.borderColor=EVD[n[0].id].c,evH(e,n.map(o=>{const a=EVD[o.id],r=a[t?"en":"ru"];return`<div class="evr"><span style="font-size:28px">${a.e}</span><div style="flex:1;min-width:0"><b style="color:${a.c}">${esc(r[0])}</b><div style="color:var(--mute);font-size:12px">${esc(r[1])}</div></div><b class="evt" data-u="${o.until}" style="font:800 15px var(--fh);flex:none"></b></div>`}).join("")),tickEv();return}if(EVNEXT>Date.now()){e.style.display="block",e.style.borderColor="",evH(e,`<div class="evr"><span style="font-size:24px">⏳</span><div style="flex:1;min-width:0;color:var(--mute);font-size:13px">${tr("evnext")}</div><b class="evt" data-u="${EVNEXT}" style="font:800 15px var(--fh);flex:none"></b></div>`),tickEv();return}e.style.display="none"}function renderEvLive(){const e=$("a_evlive");if(!e)return;const t=LANG==="en",n=evActive();evH(e,n.length?n.map(o=>{const a=EVD[o.id],r=a[t?"en":"ru"];return`<div class="gr"><span>${a.e} ${esc(r[0])} · <b class="evt" data-u="${o.until}"></b></span>${o.auto?`<i style="color:var(--mute);font-size:12px">${L2("авто","auto")}</i>`:`<button class="alt" data-stop="${o.id}">✕</button>`}</div>`}).join(""):`<div class="ac-note">${L2("Сейчас ивентов нет","No events running")}</div>`),tickEv()}let _tkB=0;function tickEv(){if(_tkB)return;_tkB=1;try{const f=()=>{let x=!1;document.querySelectorAll(".evt[data-u]").forEach(t=>{const n=Math.ceil((+t.dataset.u-Date.now())/1e3);if(n<=0){x=!0;return}t.textContent=fmtT(n)});return x};
if(f()){setEvl(EVL.filter(t=>Date.now()<t.until)),EVNEXT&&EVNEXT<=Date.now()&&(EVNEXT=0),renderEv(),render(),$("shp").style.display==="block"&&renderShop(),f(),pollEv()}}finally{_tkB=0}}setInterval(()=>{document.hidden||tickEv()},1e3);document.addEventListener("visibilitychange",()=>{document.hidden||tickEv()}),addEventListener("pageshow",()=>tickEv()),addEventListener("focus",()=>tickEv());function updAuto(){const e=$("a_evauto");e&&(e.textContent=tr(EVAUTO?"evaon":"evaoff"))}const evSig=()=>evActive().map(e=>e.id).sort().join(",");async function pollEv(){if(evOff)return;const e=await rpc("g2_event_get",{});if(e.error){/Could not find|schema cache/i.test(e.error)&&(evOff=!0);return}const t=e.data,n=evSig(),o=Date.now();let a=[],nx=0;t&&Array.isArray(t.list)?a=t.list.filter(r=>r&&r.ev&&r.left>0&&EVD[r.ev]).map(r=>({id:r.ev,until:o+r.left*1e3,auto:!!r.auto})):t&&t.ev&&t.left>0&&EVD[t.ev]&&(a=[{id:t.ev,until:o+t.left*1e3,auto:!1}]);{const m=new Map(EVL.map(x=>[x.id,x.until]));a=a.map(r=>{const u=m.get(r.id);return u&&Math.abs(u-r.until)<4e3?Object.assign({},r,{until:u}):r})}nx=t&&t.next>0?o+t.next*1e3:0;if(nx&&EVNEXT&&Math.abs(EVNEXT-nx)<4e3)nx=EVNEXT;const _sg=JSON.stringify([a.map(x=>[x.id,x.auto,Math.round(x.until/1e3)]),nx?Math.round(nx/1e3):0,t?t.auto_on:1]),_chg=_sg!==window.__evSg||evSig()!==a.map(x=>x.id).sort().join(",");window.__evSg=_sg;_chg&&setEvl(a),EVNEXT=nx,EVAUTO=!t||t.auto_on!==!1,updAuto(),_chg&&(renderEv(),render()),evSig()!==n&&$("shp").style.display==="block"&&renderShop()}setInterval(__one(()=>{if(!document.hidden)return pollEv()}),2000),pollEv(),setInterval(()=>{const d=new Date;d.getMinutes()===0&&d.getSeconds()===2&&pollEv()},1e3),document.addEventListener("visibilitychange",()=>{document.hidden||pollEv()});function evSel(){const e=$("a_ev"),t=e.value,n=LANG==="en"?1:0;e.innerHTML=Object.keys(EVD).filter(k=>isOwner||!EVD[k].ex).map(o=>{const a=n?EVD[o].en:EVD[o].ru;return`<option value="${o}">${EVD[o].e} ${a[0]} — ${a[1]}</option>`}).join(""),t&&(e.value=t)}const evMsg=(e,t)=>toast(srv(e),t?"ok":"err");async function evSet(e,t){const n=await rpc("g2_event_set",{p_token:TOKEN,p_ev:e,p_minutes:t});if(n.error)return evMsg(/Could not find|schema cache/i.test(n.error)?tr("evnot"):n.error);evMsg(e?tr("evon",fmtDur(t)):tr("evoff"),1),evOff=!1,pollEv()}const fmtDur=e=>{const t=Math.floor(e/1440),n=Math.floor(e%1440/60),o=e%60,a=LANG==="en";return[t&&t+(a?"d":" д"),n&&n+(a?"h":" ч"),o&&o+(a?"m":" мин")].filter(Boolean).join(" ")};$("a_evgo").onclick=()=>{const e=Math.floor((+$("a_evm").value||0)*(+$("a_evu").value||1));if(e<1)return evMsg(tr("evmin"));if(e>43200)return evMsg(tr("evmax"));const k=$("a_ev").value;if(!k)return;if(EVD[k]&&EVD[k].ex&&!isOwner)return evMsg(L2("Сезонные ивенты может запускать только владелец","Only the owner can start seasonal events"));evSet(k,e)},$("a_evstop").onclick=()=>evSet("",0);async function evStop(e){const t=await rpc("g2_event_stop",{p_token:TOKEN,p_ev:e});if(t.error)return/Could not find|schema cache/i.test(t.error)?evSet("",0):evMsg(t.error);evMsg(tr("evoff"),1),evOff=!1,pollEv()}$("a_evlive").onclick=e=>{const t=e.target.closest("[data-stop]");t&&evStop(t.dataset.stop)},$("a_evauto").onclick=async()=>{const e=await rpc("g2_event_auto",{p_token:TOKEN,p_on:!EVAUTO});if(e.error)return evMsg(/Could not find|schema cache/i.test(e.error)?tr("evnot"):e.error);evOff=!1,pollEv()};let topTab = "c0", topLW = 0, TOPD = null, topSeq = 0, topInF = null, topOld = false, topTries = 0;
const TOPC = { g: null };          /* кэш топа по вкладкам: панель открывается мгновенно */
async function topFetch(tab) {              /* свои цифры drawTop берёт из памяти, поэтому push() ждать не нужно */
  const g = tab === "g", w = g ? 0 : (+String(tab).slice(1) || 0);
  let n = await rpc("g2_top", g ? { p_token: TOKEN, p_limit: 20, p_by: "gem" } : { p_token: TOKEN, p_limit: 20, p_by: "coins", p_world: w }), old = false;
  if (n.error && /Could not find|schema cache/i.test(n.error)) { old = true; n = await rpc("g2_top", { p_token: TOKEN, p_limit: g ? 500 : 20 }); }
  return { n, old };
}
async function loadTop() {
  const tab = topTab;
  if (topInF === tab) return;
  topInF = tab; ++topSeq;
  try {
    const r = await topFetch(tab);
    if (r.n.error) {
      if (tab === topTab && !TOPC[tab]) { TOPD = null; $("topme").textContent = ""; $("toplist").innerHTML = `<div style="color:var(--c5);margin-top:10px">${esc(/Could not find|schema cache/i.test(r.n.error) ? tr("topnot") : r.n.error)}</div>`; }
      return;
    }
    const _sg = JSON.stringify(r.n.data || {}) + "|" + Math.floor(S.coins) + "|" + (S.gem || 0) + "|" + LANG;
    const _same = !!(TOPC[tab] && TOPC[tab].sg === _sg);
    TOPC[tab] = { d: r.n.data || {}, old: r.old, sg: _sg };
    if (tab === topTab && !_same) { TOPD = TOPC[tab].d; topOld = TOPC[tab].old; drawTop(); }
  } catch (e) {} finally { topInF = null; }
}
function topShow() {                        /* показать сохранённый топ сразу, без пустого окна */
  const c = TOPC[topTab];
  if (c) { TOPD = c.d; topOld = c.old; drawTop(); }
  else { TOPD = null; setH($("toplist"), ""); $("topme").textContent = ""; }
}
async function topPrefetch() {              /* фоново подгружаем оба топа после входа: первое открытие мгновенное */
  topTries++;
  for (const tb of ["c0"]) {
    if (TOPC[tb]) continue;
    try { const r = await topFetch(tb); if (!r.n.error) TOPC[tb] = { d: r.n.data || {}, old: r.old }; } catch (e) {}
  }
}
function cIco(id){id=id|0;const em=window.wCe?window.wCe(id):"";const sz='class="ico ei"';if(false)return `<svg ${sz} viewBox="0 0 24 24" aria-hidden="true">${WCS[id]}</svg>`;return window.__cs0?`<svg ${sz} viewBox="0 0 24 24" aria-hidden="true">${window.__cs0}</svg>`:`<svg ${sz} viewBox="0 0 24 24" aria-hidden="true"><use href="#i-coin"/></svg>`}
function myWC(){if(topTab==="g")return S.coins;const w=+String(topTab).slice(1)||0;return S.coins}function drawTop(){if(!TOPD)return;const e=topTab==="g",t=l=>e?+l.gem||0:+l.coins||0,n=e?"💎 ":cIco(+String(topTab).slice(1)||0)+" ",o=(TOPD.top||[]).map(l=>Object.assign({},l));if(me){const l=o.find(s=>s.nick===me.nick);l&&(l.coins=myWC(),l.gem=S.gem||0)}o.sort((l,s)=>t(s)-t(l));const a=o.slice(0,20),r=me?o.findIndex(l=>l.nick===me.nick):-1,i=l=>`<svg class="ico" style="width:30px;height:30px" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10.5" fill="url(#g-${["gold","silver","bronze"][l]})"/><circle cx="12" cy="12" r="7.8" fill="none" stroke="rgba(255,255,255,.6)"/><text x="12" y="16.1" text-anchor="middle" font-size="11" font-weight="800" fill="#2a1700" font-family="Nunito,sans-serif">${l+1}</text></svg>`,d=L2("Твоё место: #","Your rank: #");$("topme").innerHTML=r>=0?d+(r+1)+" · "+n+fmt(t(o[r])):TOPD.me&&!topOld?d+TOPD.me.rank+" · "+n+fmt(+(e?TOPD.me.gem:TOPD.me.coins)||0):"",setH($("toplist"),a.length&&!(e&&o.every(l=>l.gem==null))?a.map((l,s)=>`<div class="glass ti${me&&l.nick===me.nick?" eq":""}"><div class="ic">${s<3?i(s):"#"+(s+1)}</div><div class="tx"><b>${avH(l.avatar)} ${esc(l.nick)}${vipTag(l)}</b></div><b style="flex:none">${n}${fmt(t(l))}</b></div>`).join(""):`<div style="color:var(--mute);margin-top:10px">${e?L2("Сервер пока не отдаёт тикеты игроков: обнови функцию g2_top (05_top.sql).","The server does not return players' tickets yet: update g2_top (05_top.sql)."):tr("topempty")}</div>`)}function topTabs(){const g=topTab==="g",wl=window.WORLDS||[],wid=0,W0=wl[wid];$("toptitle").textContent=g?L2("Топ по тикетам","Tickets leaderboard"):L2("Топ по монетам","Coins leaderboard"),document.querySelectorAll("#toptabs [data-tp]").forEach(e=>{e.className=(e.dataset.tp==="g")===g?"":"alt",e.innerHTML=e.dataset.tp==="c"?cIco(g?(S.w||0):wid)+" "+L2("Монеты","Coins"):"💎 "+L2("Тикеты","Tickets")});const ch=$("topw");if(ch){ch.style.display="none";const h=wl.map(w=>`<button type="button" data-tw="${w.id}" class="${w.id===wid?"":"alt"}" title="${esc(L2(w.ru,w.en))}" aria-label="${esc(L2(w.ru,w.en))}">${w.ic}</button>`).join("");if(ch.__h!==h){ch.__h=h;ch.innerHTML=h}}}$("toptabs").onclick = e => {
  const t = e.target.closest("[data-tp]");
  if (t) { topTab = t.dataset.tp === "g" ? "g" : "c" + topLW; topSeq++; topTabs(); topShow(); loadTop(); }
};
$("topw").onclick = e => {
  const b = e.target.closest("[data-tw]");
  if (b) { topLW = +b.dataset.tw || 0; topTab = "c" + topLW; topSeq++; topTabs(); topShow(); loadTop(); }
};
$("topBtn").onclick = () => { topLW = 0; if (topTab !== "g") topTab = "c" + topLW; topTabs(); topShow(); openPanel("topp"); loadTop(); };
/* пока топ открыт — обновляется сам каждые 5 секунд */
setInterval(() => { $("topp").style.display === "block" && !document.hidden && loadTop(); }, 1000);
document.addEventListener("visibilitychange", () => { !document.hidden && $("topp").style.display === "block" && loadTop(); });
setInterval(__one(() => { return !document.hidden && TOKEN && ready && topTries < 3 && !TOPC["c0"] && topPrefetch(); }), 3000);
const IC=n=>`<svg class="ico ei" aria-hidden="true"><use href="#i-${n}"/></svg>`,EIM={"🏆":"top","🪙":"coin","💎":"gem","🎲":"dice","🍀":"clover","💰":"income","⭐":"star","🐾":"paw","📚":"book","🛡":"shield","🔄":"rebirth"},EI=t=>esc(t).replace(/(🏆|🪙|💎|🎲|🍀|💰|⭐|🐾|📚|🛡|🔄)\uFE0F?/g,(m,g)=>IC(EIM[g]));
let rbArm=0,rbT=0;
function renderRb(){const el=$("rbBox");if(!el||typeof IC!=="function")return;const n=rbN(),max=n>=RB_MAX,q=rbReq(Math.min(n,RB_MAX-1)),ok=!max&&rbOk(n),nx=n+1;
 const row=(t,v,g)=>`<div class="rb-r ${g?"ok":"no"}"><span>${g?"✅":"⬜"} ${t}</span><b>${v}</b></div>`;
 const cur=n?`<div class="rb-cur">${L2("Сейчас: монеты и доход ×","Now: coins & income ×")}${+rbMul().toFixed(2)} · ${L2("удача +","luck +")}${rbLuck()} · ${L2("прокачка −","upgrades −")}${Math.round((1-rbDisc())*100)}%</div>`:"";
 const head=`<div class="rb-t"><span>${IC("rebirth")}${L2("Перерождение","Rebirth")}</span><span style="color:var(--mute);font-size:13px">${n}/${RB_MAX}</span></div><div class="rb-s">${L2("Сбрось монеты, удачу и доход — получи постоянные бонусы. Коллекция, тикеты и питомцы остаются.","Reset coins, luck and income for permanent bonuses. Collection, tickets and pets are kept.")}</div>`;
 if(max){setH(el,head+`<div class="rb-r ok"><span>🏆 ${L2("Все перерождения пройдены","All rebirths completed")}</span></div>`+cur);return}
 const rn=R[q.best].n;
 const body=`<div class="rb-h">${L2("Требования","Requirements")}</div>`+
  row(IC("coin")+L2("Монеты","Coins"),fmt(S.coins)+" / "+fmt(q.coins),S.coins>=q.coins)+
  row(IC("clover")+L2("Уровень удачи","Luck level"),S.luck+" / "+q.luck,S.luck>=q.luck)+
  row(IC("income")+L2("Уровень дохода","Income level"),S.inc+" / "+q.inc,S.inc>=q.inc)+
  row(IC("star")+L2("Лучшая редкость","Best rarity"),(S.best>=0?R[Math.min(S.best,R.length-1)].n:"—")+" / "+rn,S.best>=q.best)+
  `<div class="rb-h">${L2("Награда за перерождение №","Reward for rebirth #")}${nx}</div><div class="rb-g">`+
  `<div>${IC("gem")}+${rbGems(nx)} ${L2("тикетов","tickets")}</div>`+
  `<div>${IC("coin")}${L2("Монеты и доход ×","Coins & income ×")}${+(1+.25*nx).toFixed(2)} ${L2("навсегда","forever")}</div>`+
  `<div>${IC("clover")}${L2("+1 уровень удачи навсегда (всего +","+1 luck level forever (total +")}${nx})</div>`+
  `<div>${IC("income")}${L2("Прокачка дешевле на ","Upgrades cheaper by ")}${3*nx}%</div>`+
  `<div>${IC("coin")}${L2("Стартовые монеты: ","Starting coins: ")}${fmt(rbStart(nx))}</div>`+
  `</div>`;
 setH(el,head+body+cur+`<button id="rbBtn" class="${rbArm?"arm":""}" ${ok?"":"disabled"}>${rbArm?L2("Точно? Нажми ещё раз — прогресс сбросится","Sure? Tap again — progress will reset"):ok?L2("Переродиться","Be reborn"):L2("Требования не выполнены","Requirements not met")}</button>`)}
function rbDo(){if(busy||!ready||(S.w|0)!==0)return;const n=rbN();if(n>=RB_MAX||!rbOk(n))return;
 if(!rbArm){rbArm=1;clearTimeout(rbT);rbT=setTimeout(()=>{rbArm=0;renderRb()},4e3);renderRb();return}
 clearTimeout(rbT);rbArm=0;const nx=n+1;S.rb=nx;S.coins=rbStart(nx);S.luck=0;S.inc=0;S.cf=0;S.gem=(S.gem||0)+rbGems(nx);
 render();save();pushSoon();
 toast("🔄 "+L2("Перерождение №","Rebirth #")+nx+" · +"+rbGems(nx)+" 💎 · ×"+(+rbMul().toFixed(2)),"ok")}
$("rbBox").addEventListener("click",e=>{e.target.closest("#rbBtn")&&rbDo()});
setTimeout(()=>{try{renderRb()}catch(e){}},0);
/* единый выбор игрока в админке: m_who главный, a_who и g_who повторяют его значение */
(function(){const tg=$("tgtw"),own=$("own"),mw=$("m_who"),aw=$("a_who"),gw=$("g_who");if(!tg||!mw||!aw||!gw)return;
 tg.appendChild(mw.parentElement);aw.parentElement.style.display="none";gw.parentElement.style.display="none";
 own&&own.parentNode.insertBefore(tg,own);
 function syncWho(){const v=mw.value,mine=!!(me&&v&&v===String(me.nick).toLowerCase());
  try{aw.value=mine?"me":v}catch(e){}try{gw.value=v}catch(e){}}
 mw.addEventListener("change",syncWho);
 [mw,aw,gw].forEach(x=>new MutationObserver(syncWho).observe(x,{childList:true}))})();
const AVC={},avQ=[];let avRun=0,avIO=null;
const avN=(nick,fb)=>AVC[String(nick).toLowerCase()]||fb,
avW=(nick,fb)=>`<span class="avw" data-an="${esc(nick)}">${avH(avN(nick,fb))}</span>`;
function avPut(nick,av){document.querySelectorAll(".avw").forEach(w=>{if(w.dataset.an.toLowerCase()===nick.toLowerCase()&&isImg(av))w.innerHTML=avH(av)})}
async function avPump(){while(avRun<3&&avQ.length){const nick=avQ.shift();avRun++;(async()=>{try{const r=await rpc("g2_profile",{p_token:TOKEN,p_nick:nick}),x=r&&!r.error&&r.data?(Array.isArray(r.data)?r.data[0]:r.data):null,a=x&&x.avatar;AVC[nick.toLowerCase()]=isImg(a)?a:"";isImg(a)&&avPut(nick,a)}catch(e){AVC[nick.toLowerCase()]=""}avRun--;avPump()})()}}
function avAsk(w){const nick=w.dataset.an,k=nick.toLowerCase();if(!TOKEN||AVC[k]!==undefined||avQ.includes(nick))return;if(me&&k===me.nick.toLowerCase())return;avQ.push(nick);avPump()}
let avTopAt=0;
async function avTop(){if(!TOKEN||Date.now()-avTopAt<45e3)return;avTopAt=Date.now();try{const r=await rpc("g2_top",{p_token:TOKEN,p_limit:20});((r&&r.data&&r.data.top)||[]).forEach(x=>{if(!x||!x.nick)return;const k=String(x.nick).toLowerCase();AVC[k]=isImg(x.avatar)?x.avatar:"";isImg(x.avatar)&&avPut(x.nick,x.avatar)})}catch(e){}}
function avWatch(root){if(!root)return;avTop();const ws=root.querySelectorAll(".avw");if(!("IntersectionObserver"in window)){[...ws].slice(0,30).forEach(avAsk);return}avIO=avIO||new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){avIO.unobserve(e.target);avAsk(e.target)}}),{rootMargin:"120px"});ws.forEach(w=>{AVC[w.dataset.an.toLowerCase()]===undefined&&avIO.observe(w)})}
const tMsg=(e,t)=>{const n=$("t_st");if(e===tr("wait")){n.textContent=e,n.style.color="var(--mute)";return}n.textContent="",e&&toast(e,t?"ok":"err")};let tBusy=!1,claimOff=0,TP=[],tSel="";function drawPl(){const e=$("t_nick").value.trim().toLowerCase(),t=TP.filter(n=>!me||n.nick.toLowerCase()!==me.nick.toLowerCase()).filter(n=>!e||n.nick.toLowerCase().includes(e));$("t_list").innerHTML=t.length?t.map(n=>`<div class="glass ti pl${n.nick===tSel?" eq":""}" data-n="${esc(n.nick)}"><div class="tx"><b>${avW(n.nick,n.avatar)} ${esc(n.nick)}${vipTag(n)}</b></div></div>`).join(""):`<div style="color:var(--mute);font-size:13px;margin-top:8px">${tr("pnone")}</div>`;avWatch($("t_list"))}let _lpAt=0;async function loadPlayers(){if(!TOKEN)return;if(Date.now()-_lpAt<6e4&&TP.length){drawPl();return}_lpAt=Date.now();const e=await rpc("g2_top",{p_token:TOKEN,p_limit:500});e.error&&(_lpAt=0);TP=e.error?[]:(e.data||{}).top||[],drawPl()}$("t_nick").oninput=()=>{$("t_nick").value!==tSel&&(tSel="",trPD={},trPC={coins:0,gems:0},trW={}),drawPl(),drawTrI()};
$("t_list").onclick=e=>{const t=e.target.closest("[data-n]");t&&trPick(t.dataset.n)};
Object.assign(TX,{"Переводы":"Transfers","Переводи монеты и тикеты другим игрокам — они приходят сразу":"Send coins and tickets to other players — they arrive instantly","Перевести":"Send"});
let trTab="n",trPD={},trPC={coins:0,gems:0},trG={},trW={},trRF=-1,trIn=0,trData=null,trOff=0;
const trSide=o=>Object.entries(o||{}).sort((a,b)=>(b[0][0]==="$")-(a[0][0]==="$")).map(([k,v])=>/^\$t:/.test(k)?trTkName(k)+" ×"+fmt(+v):k==="$coins"?IC("coin")+L2("Монеты","Coins")+" ×"+fmt(+v):k==="$gems"?IC("gem")+L2("Тикеты","Tickets")+" ×"+fmt(+v):esc(k.split(" ")[0])+" "+esc(iname(k))+" ×"+v).join(", ");
// Поля «монеты / тикеты» в окне трейда (отдаю / хочу получить)
const trTkBase=k=>{const m=/^\$t:(\d+):(\d+)$/.exec(k);if(!m)return 0;const a=S.tok&&S.tok[m[1]];return Array.isArray(a)?Math.floor(+a[+m[2]]||0):0};const trTkName=k=>{const m=/^\$t:(\d+):(\d+)$/.exec(k),w=m?WORLDS[+m[1]]:null;return "🎴 "+L2("Токен","Token")+(w?" · "+w.ic+" "+L2(w.ru,w.en):"")};
const trMax=(sd,k)=>sd==="g"?(k[1]==="t"?trTkBase(k):Math.floor(k==="$coins"?S.coins:S.gem||0)):k==="$coins"?trPC.coins:trPC.gems;
function trMoney(sd,k,el){const o=sd==="g"?trG:trW;let v=Math.floor(Number(String(el.value).replace(/\D/g,"")))||0;v=Math.min(v,trMax(sd,k),1e36);v>0?o[k]=v:delete o[k];el.value=v>0?String(v):""}
function trMaxLbl(){const cn=L2("Монеты","Coins"),gn=L2("Тикеты","Tickets"),mx=L2("макс. ","max ");  $("tr_gcl").innerHTML=IC("coin")+cn+" · "+mx+fmt(trMax("g","$coins"));$("tr_ggl").innerHTML=IC("gem")+gn+" · "+mx+fmt(trMax("g","$gems"));  $("tr_wcl").innerHTML=IC("coin")+cn+(tSel?" · "+mx+fmt(trPC.coins):"");$("tr_wgl").innerHTML=IC("gem")+gn+(tSel?" · "+mx+fmt(trPC.gems):"")}
function trMoneyUI(){const rows=[["tr_gc","g","$coins"],["tr_gg","g","$gems"],["tr_wc","w","$coins"],["tr_wg","w","$gems"]];
 rows.forEach(([id,sd,k])=>{const el=$(id),o=sd==="g"?trG:trW;if(document.activeElement!==el)el.value=o[k]?String(o[k]):"";el.disabled=sd==="w"&&!tSel;if(o[k]>trMax(sd,k)&&sd==="w")trMoney(sd,k,el)});
 trMaxLbl()}
const trLbl={done:["Выполнен","Done"],declined:["Отклонён","Declined"],cancelled:["Отменён","Cancelled"],expired:["Истёк","Expired"]};
function trRow(a,max,sel,side){const c=R[a.i].c,k=ALL.indexOf(a);return `<div class="glass ti" style="border-color:${c}"><div class="ic">${esc(a.t.split(" ")[0])}</div><div class="tx"><b style="color:${c}">${esc(iname(a.t))}</b><span>${rname(a.i)} · ${L2("повторок","dupes")} ${max}</span></div><div class="stp"><button class="alt" data-tq="${side}|${k}|-1">−</button><b>${sel||0}</b><button class="alt" data-tq="${side}|${k}|1">+</button></div></div>`}
function trTkUI(){const box=$("tr_tk");if(!box)return;const ws=[];for(let w=0;w<7&&w<WORLDS.length;w++)ws.push(w);const sig=ws.join();
 if(box._s!==sig){box._s=sig;box.innerHTML='<h2 style="font-size:15px;margin:12px 0 6px">'+L2("Токены","Tokens")+'</h2><div class="trm">'+ws.map(w=>'<label><span id="tr_tl'+w+'"></span><input id="tr_tk'+w+'" data-mn="g|$t:'+w+':0" inputmode="numeric" autocomplete="off" placeholder="0"></label>').join("")+'</div>'}
 ws.forEach(w=>{const k="$t:"+w+":0",el=$("tr_tk"+w),lb=$("tr_tl"+w);if(!el||!lb)return;if(document.activeElement!==el)el.value=trG[k]?String(trG[k]):"";lb.textContent=trTkName(k)+" · "+L2("макс. ","max ")+fmt(trTkBase(k));if((trG[k]||0)>trTkBase(k))trMoney("g",k,el)})}
function drawTrI(){const f=a=>trRF<0||a.i===trRF,mine=ALL.filter(a=>(S.found[a.t]||0)>1&&f(a)).sort((x,y)=>y.i-x.i),th=ALL.filter(a=>(trPD[a.t]||0)>0&&f(a)).sort((x,y)=>y.i-x.i);
 $("tr_gh").textContent=L2("Я отдаю","I give");$("tr_wh").textContent=L2("Хочу получить","I want");trMoneyUI();trTkUI();
 $("tr_rf").innerHTML=`<button class="${trRF<0?"":"alt"}" data-rf="-1">${L2("Все","All")}</button>`+R.map((r,i)=>`<button class="${trRF===i?"":"alt"}" data-rf="${i}" style="border-color:${r.c}">${r.n}</button>`).join("");
 $("tr_give").innerHTML=mine.length?mine.map(a=>trRow(a,S.found[a.t]-1,trG[a.t],"g")).join(""):`<div class="trn">${L2("Нет повторок","No duplicates")}</div>`;
 $("tr_want").innerHTML=!tSel?`<div class="trn">${L2("Выберите игрока выше","Pick a player above")}</div>`:th.length?th.map(a=>trRow(a,trPD[a.t],trW[a.t],"w")).join(""):`<div class="trn">${L2("У игрока нет повторок","Player has no duplicates")}</div>`;
 $("t_send").disabled=!tSel||tBusy;$("t_send").textContent=L2("Перевести","Send")}
function trCard(x,kind){const mk=(l,o)=>`<span class="l">${l}: ${trSide(o)}</span>`;
 return `<div class="glass ti"><div class="tx"><b>${esc(kind==="out"?x.to_nick:x.from_nick)}</b>`+(kind==="in"?mk(L2("Перевод","Transfer"),x.give)+(Object.keys(x.want||{}).length?mk(L2("Просит","Wants"),x.want):""):mk(L2("Вы переводите","You send"),x.give)+(Object.keys(x.want||{}).length?mk(L2("Вы просите","You want"),x.want):""))+`</div>`+
 (kind==="in"?`<button data-ta="ok|${x.id}">${L2("Принять","Accept")}</button><button class="alt" data-ta="no|${x.id}">${L2("Отказ","Decline")}</button>`:kind==="out"?`<button class="alt" data-ta="no|${x.id}">${L2("Отмена","Cancel")}</button>`:`<span style="flex:none;color:var(--mute);font-size:12px">${L2(...(trLbl[x.status]||[x.status,x.status]))}</span>`)+`</div>`}
function drawTr(){const inn=(trData&&trData.incoming)||[],out=(trData&&trData.outgoing)||[],his=(trData&&trData.history)||[];
 $("trtabs").innerHTML=[["n",L2("Перевод","Send")],["i",L2("Входящие","Incoming")+(inn.length?" ("+inn.length+")":"")]].map(a=>`<button class="${trTab===a[0]?"":"alt"}" data-tt="${a[0]}">${a[1]}</button>`).join("");
 $("tr_new").style.display=trTab==="n"?"":"none";$("tr_in").style.display=trTab==="i"?"":"none";$("tr_out").style.display=trTab==="o"?"":"none";
 $("tr_in").innerHTML=inn.length?inn.map(x=>trCard(x,"in")).join(""):`<div class="trn">${L2("Нет входящих предложений","No incoming offers")}</div>`;
 $("tr_out").innerHTML=(out.length?out.map(x=>trCard(x,"out")).join(""):`<div class="trn">${L2("Нет исходящих предложений","No outgoing offers")}</div>`)+(his.length?`<h2>${L2("История","History")}</h2>`+his.map(x=>trCard(x,"his")).join(""):"");
 if(trTab==="n")drawTrI()}
async function loadTr(){if(!TOKEN)return;const r=await rpc("g2_trade_list",{p_token:TOKEN});if(r.error)return;trData=r.data;trIn=(trData.incoming||[]).length;drawTr()}
async function trPick(nick){tSel=nick;$("t_nick").value=nick;trW={};trPD={};trPC={coins:0,gems:0};drawPl();drawTrI();const r=await rpc("g2_trade_partner",{p_token:TOKEN,p_nick:nick});if(tSel!==nick)return;if(r.error)return tMsg(/Could not find|schema cache/i.test(r.error)?L2("Переводы ещё не включены на сервере","Transfers are not enabled on the server yet"):trErr(r.error));trPD=(r.data||{}).dupes||{};trPC={coins:Math.floor(+(r.data||{}).coins)||0,gems:Math.floor(+(r.data||{}).gems)||0};drawTrI()}
async function trFlush(){if(!dirty)return;clampS();dirty=!1;const sn=(_gsn=S.gem,S.coins),q=await rpc("g2_save",{p_token:TOKEN,p_save:S});if(q.error){dirty=!0;return}if(q.data&&q.data.reset){adopt(q.data.save);return}pushRes(q,sn)}
function iaKey(n){return GPX+"gacha-ia-"+String(n||(me&&me.nick)||"").toLowerCase()}function iaLoad(){try{const o=JSON.parse(localStorage.getItem(iaKey())||"null");return o&&typeof o=="object"&&!Array.isArray(o)?o:null}catch{return null}}function iaSave(o){try{localStorage.setItem(iaKey(),JSON.stringify(o))}catch{}}function iaClear(n){try{localStorage.removeItem(iaKey(n))}catch{}}function iaRestore(){if(!S._ia){const l=iaLoad();l&&(S._ia=l)}}
function applyTrade(ia){ia=ia||{};iaRestore();if(TRB||!S._ia&&(S.rolls>0||Object.keys(S.found||{}).length>0)){TRB=0;S._ia=Object.assign({},ia);iaSave(S._ia);dirty=!0;pushSoon();return 0}S._ia=S._ia||{};let ch=0;for(const k in ia){const d=(+ia[k]||0)-(+S._ia[k]||0);if(!d)continue;if(k==="$coins")S.coins=Math.max(0,S.coins+d);else if(/^\$t:\d+:\d+$/.test(k)){const m=/^\$t:(\d+):(\d+)$/.exec(k);if(!S.tok||typeof S.tok!=="object"||Array.isArray(S.tok))S.tok={};let a=S.tok[m[1]];if(!Array.isArray(a)||a.length!==2)a=S.tok[m[1]]=[0,0];a[+m[2]]=Math.max(0,(a[+m[2]]||0)+d)}else if(k==="$gems")S.gem=Math.max(0,(S.gem||0)+d);else S.found[k]=Math.max(0,(S.found[k]||0)+d);S._ia[k]=+ia[k];ch++}
 if(ch){ALL.forEach(a=>{S.found[a.t]&&a.i>S.best&&(S.best=a.i)});iaSave(S._ia);dirty=!0;render();pushSoon();$("trp").style.display==="block"&&trTab==="n"&&drawTrI()}return ch}
function trErr(e){e=String(e||"");if(/trade_self_too_young/.test(e))return L2("Переводы доступны с 7 дней после регистрации вашего аккаунта","Transfers unlock 7 days after your account was created");if(/trade_partner_too_young/.test(e))return L2("Аккаунту игрока меньше 7 дней — перевод недоступен","That player's account is younger than 7 days — transfer unavailable");return e}
async function trAct(kind,id){if(tBusy)return;tBusy=!0;const ok=kind==="ok",n=await serial(async()=>{ok&&await trFlush();return await rpc("g2_trade_respond",{p_token:TOKEN,p_id:id,p_accept:ok})});tBusy=!1;
 if(n.error){tMsg(trErr(n.error));loadTr();return}(n.data||{}).iadj&&applyTrade(n.data.iadj);tMsg(ok?"":L2("Готово","Done"),!0);loadTr()}
let trAutoDone=0,trAutoB=0,trSeen={};
async function trAuto(){if(trAutoB||tBusy||!TOKEN)return;trAutoB=1;try{const r=await rpc("g2_trade_list",{p_token:TOKEN});if(r.error)return;trData=r.data;
 const all=(trData.incoming||[]),mon=x=>!Object.keys(x.want||{}).length&&Object.keys(x.give||{}).length&&Object.keys(x.give).every(k=>k==="$coins"||k==="$gems"||/^\$t:/.test(k));
 for(const x of all.filter(mon)){const n=await serial(async()=>{await trFlush();return await rpc("g2_trade_respond",{p_token:TOKEN,p_id:x.id,p_accept:!0})});
  if(!n.error){(n.data||{}).iadj&&applyTrade(n.data.iadj);toast("💸 "+x.from_nick+L2(" перевёл(а) вам: "," sent you: ")+trSide(x.give),"ok")}}
 for(const x of all.filter(y=>!mon(y))){if(!trSeen[x.id]){trSeen[x.id]=1;await serial(()=>rpc("g2_trade_respond",{p_token:TOKEN,p_id:x.id,p_accept:!1}))}}
 const r2=await rpc("g2_trade_list",{p_token:TOKEN});if(!r2.error){trData=r2.data;trIn=(trData.incoming||[]).length;drawTr()}}finally{trAutoB=0}}
async function trSync(){if(!TOKEN||!ready||document.hidden||Date.now()<trOff)return;const r=await serial(()=>rpc("g2_trade_sync",{p_token:TOKEN}));
 if(r.error){/Could not find|schema cache/i.test(r.error)&&(trOff=Date.now()+6e4);return}const d=r.data||{};applyTrade(d.iadj);
 const ch=(d.inc||0)!==trIn;if((d.inc||0)>0&&(ch||!trAutoDone)){trAutoDone=1;trAuto()}trIn=d.inc||0;ch&&$("trp").style.display==="block"&&trTab!=="n"&&loadTr()}
$("trp").addEventListener("input",e=>{const el=e.target,m=el&&el.dataset&&el.dataset.mn;if(!m)return;const[sd,k]=m.split("|");trMoney(sd,k,el)});
$("trp").addEventListener("click",e=>{let b;
 if(b=e.target.closest("[data-tq]")){const[sd,i,d]=b.dataset.tq.split("|"),a=ALL[+i],m=sd==="g"?(S.found[a.t]||0)-1:(trPD[a.t]||0),o=sd==="g"?trG:trW;o[a.t]=Math.max(0,Math.min(m,(o[a.t]||0)+ +d));o[a.t]||delete o[a.t];drawTrI();return}
 if(b=e.target.closest("[data-rf]")){trRF=+b.dataset.rf;drawTrI();return}
 if(b=e.target.closest("[data-tt]")){trTab=b.dataset.tt;drawTr();trTab!=="n"&&loadTr();return}
 if(b=e.target.closest("[data-ta]")){const[k,id]=b.dataset.ta.split("|");trAct(k,+id)}});
/* ===== ПРОМОКОДЫ =====
   Коды хранятся на сервере (08_promo.sql). Игрок вводит код в меню → «Промокод».
   Админ и владелец видят в этой же панели форму создания кодов и список активных. */
const promoErr=m=>/Could not find|schema cache/i.test(m||"")?L2("Промокоды ещё не подключены на сервере","Promo codes are not set up on the server yet"):m;
$("promob").onclick=()=>{$("pr_code").value="";openPanel("promop");promoAdmin()};
$("pr_go").onclick=async()=>{
 const code=$("pr_code").value.trim();
 if(!code)return toast(L2("Введите промокод","Enter a promo code"),"err");
 if(!TOKEN||!me)return toast(L2("Войдите в аккаунт, чтобы активировать промокод","Sign in to redeem a promo code"),"err");
 if(!ready)return;
 const b=$("pr_go");b.disabled=!0;
 const r=await rpc("g2_promo_redeem",{p_token:TOKEN,p_code:code});b.disabled=!1;
 if(r.error)return toast(promoErr(r.error),"err");
 const d=r.data||{},c=Math.floor(+d.coins)||0,g=Math.floor(+d.gems)||0;
 S.coins+=c;S.gem=(S.gem||0)+g;render();save();pushSoon();$("pr_code").value="";
 toast(L2("Промокод активирован: ","Promo code redeemed: ")+[c?"🪙 "+fmt(c):"",g?"💎 "+fmt(g):""].filter(Boolean).join(" · "),"ok")};
$("pr_code").addEventListener("keydown",e=>{e.key==="Enter"&&$("pr_go").click()});
function promoAdmin(){const on=(isOwner||granted)&&!!TOKEN;$("pr_adm").style.display=on?"block":"none";on&&loadPromos()}
async function loadPromos(){const r=await rpc("g2_promo_list",{p_token:TOKEN}),el=$("pr_list"),hint=t=>`<div style="color:var(--mute);font-size:13px">${esc(t)}</div>`;
 if(r.error){el.innerHTML=hint(promoErr(r.error));return}
 const a=Array.isArray(r.data)?r.data:[];
 const key=a.map(x=>x.code).join("|");
 if(a.length&&el._pk===key){a.forEach(x=>{const sm=[...el.querySelectorAll("small[data-pc]")].find(q=>q.dataset.pc===x.code);if(sm){sm.dataset.u=x.uses;sm.dataset.m=x.max_uses==null?"":x.max_uses;sm.dataset.e=x.expires_at?+new Date(x.expires_at):"";sm.dataset.c=x.coins||0;sm.dataset.g=x.gems||0;pTxt(sm)}});return}
 el._pk=key;
 setH(el,a.length?a.map(x=>`<div class="glass ti"><div class="tx"><b>${esc(x.code)}</b><small data-pc="${esc(x.code)}" data-u="${x.uses}" data-m="${x.max_uses==null?"":x.max_uses}" data-e="${x.expires_at?+new Date(x.expires_at):""}" data-c="${x.coins||0}" data-g="${x.gems||0}"></small></div><button class="alt" data-pd="${esc(x.code)}">${L2("Удалить","Delete")}</button></div>`).join(""):hint(L2("Пока нет промокодов","No promo codes yet")));
 el.querySelectorAll("small[data-pc]").forEach(pTxt)}
const fmtLeft=ms=>{let t=Math.max(0,Math.floor(ms/1e3));const d=Math.floor(t/86400),h=Math.floor(t%86400/3600),m=Math.floor(t%3600/60),q=t%60,u=L2(["д","ч","м","с"],["d","h","m","s"]);return[d?d+u[0]:"",d||h?h+u[1]:"",d||h||m?m+u[2]:"",q+u[3]].filter(Boolean).join(" ")};
function pTxt(sm){const d=sm.dataset,p=[];if(+d.c>0)p.push("🪙 "+fmt(+d.c));if(+d.g>0)p.push("💎 "+fmt(+d.g));p.push(L2("использовано ","used ")+d.u+"/"+(d.m===""?"∞":d.m));if(d.e!==""){const ms=+d.e-Date.now();p.push(ms>0?L2("осталось ","left ")+fmtLeft(ms):L2("срок истёк","expired"))}const t=p.join(" · ");sm.textContent!==t&&(sm.textContent=t)}
setInterval(()=>{$("promop").style.display==="block"&&!document.hidden&&document.querySelectorAll("#pr_list small[data-pc]").forEach(pTxt)},500);
$("pr_create").onclick=async()=>{
 const code=$("pr_ncode").value.trim().toUpperCase(),coins=Math.floor(+$("pr_ncoins").value)||0,gems=Math.floor(+$("pr_ngems").value)||0,
  uses=$("pr_nuses").value.trim()===""?null:Math.floor(+$("pr_nuses").value),hours=$("pr_nhours").value.trim()===""?null:+$("pr_nhours").value;
 if(!/^[A-Z0-9_-]{3,24}$/.test(code))return toast(L2("Код: 3–24 символа — латиница, цифры, _ и -","Code: 3–24 chars — letters, digits, _ and -"),"err");
 if(coins<=0&&gems<=0)return toast(L2("Укажите монеты или тикеты","Enter coins or tickets"),"err");
 if(uses!==null&&!(uses>=1))return toast(L2("Лимит активаций должен быть не меньше 1","Uses limit must be at least 1"),"err");
 if(hours!==null&&!(hours>0))return toast(L2("Срок должен быть больше 0 часов","Lifetime must be more than 0 hours"),"err");
 const r=await rpc("g2_promo_create",{p_token:TOKEN,p_code:code,p_coins:coins,p_gems:gems,p_max_uses:uses,p_hours:hours});
 if(r.error)return toast(promoErr(r.error),"err");
 ["pr_ncode","pr_ncoins","pr_ngems","pr_nuses","pr_nhours"].forEach(i=>$(i).value="");
 toast(L2("Промокод создан: ","Promo code created: ")+code,"ok");loadPromos()};
$("pr_list").onclick=async e=>{const b=e.target.closest("[data-pd]");if(!b)return;
 if(!b.dataset.sure){b.dataset.sure="1";b.textContent=L2("Точно?","Sure?");setTimeout(()=>{b.dataset.sure="";b.textContent=L2("Удалить","Delete")},3000);return}
 const r=await rpc("g2_promo_delete",{p_token:TOKEN,p_code:b.dataset.pd});if(r.error)return toast(promoErr(r.error),"err");
 toast(L2("Промокод удалён","Promo code deleted"),"ok");loadPromos()};
/* пока панель промокодов открыта, список (и счётчик «использовано») обновляется сам каждые 6 секунд */
setInterval(()=>{$("promop").style.display==="block"&&!document.hidden&&TOKEN&&(isOwner||granted)&&loadPromos()},4000);
Object.assign(TX,{"Промокод":"Promo code","Введи промокод и получи награду":"Enter a promo code to get a reward","Активировать":"Redeem","Новый промокод":"New promo code","Создать промокод":"Create promo code","Активные промокоды":"Active promo codes","Введите промокод":"Enter promo code","Код (A-Z, 0-9)":"Code (A-Z, 0-9)","Монеты":"Coins","Тикеты":"Tickets","Макс. активаций (пусто — без лимита)":"Max uses (empty — unlimited)","Срок, часов (пусто — навсегда)":"Lifetime, hours (empty — forever)"});
$("trb").onclick=()=>{if(!TOKEN||!me)return toast(tr("tlogin"),"err");trTab="n";trG={};trW={};trPD={};trPC={coins:0,gems:0};tSel="";$("t_nick").value="";tMsg(TOKEN?"":tr("tlogin"));drawPl();drawTr();openPanel("trp");loadPlayers();loadTr()};
$("t_send").onclick=async()=>{if(!TOKEN||!me)return tMsg(tr("tlogin"));if(tBusy||busy||!ready||!tSel)return;
 Object.keys(trG).forEach(k=>{k!=="$coins"&&k!=="$gems"&&!/^\$t:\d+:0$/.test(k)&&delete trG[k]});trW={};
 if(!Object.keys(trG).length)return tMsg(L2("Укажите сумму перевода","Enter an amount to send"));
 tBusy=!0;drawTrI();const n=await serial(async()=>{await trFlush();return await rpc("g2_trade_send",{p_token:TOKEN,p_to:tSel,p_give:trG,p_want:trW})});tBusy=!1;
 if(n.error){drawTrI();return tMsg(/Could not find|schema cache/i.test(n.error)?L2("Переводы ещё не включены на сервере","Transfers are not enabled on the server yet"):trErr(n.error))}
 try{(n.data||{}).iadj&&applyTrade(n.data.iadj)}catch(e){}trG={};trW={};tMsg(L2("Перевод отправлен","Transfer sent"),!0);trTab="n";drawTr();loadTr();setTimeout(trSync,300)};
setInterval(__one(()=>{if(!document.hidden)return trSync()}),3000),setTimeout(trSync,2500);
// Живое обновление «макс.» в окне трейда: свои монеты/тикеты каждую секунду, у партнёра каждые 5 секунд
const trOpen=()=>$("trp").style.display==="block"&&trTab==="n"&&!document.hidden;
setInterval(()=>{if(!trOpen())return;trMaxLbl();trTkUI();[["tr_gc","$coins"],["tr_gg","$gems"]].forEach(([id,k])=>{const el=$(id);el.value&&document.activeElement!==el&&trMoney("g",k,el)})},500);
async function trPartnerRefresh(){if(!TOKEN||!tSel||!trOpen()||tBusy)return;const nick=tSel,r=await rpc("g2_trade_partner",{p_token:TOKEN,p_nick:nick});if(r.error||tSel!==nick)return;
 const d=r.data||{},pd=d.dupes||{},pc={coins:Math.floor(+d.coins)||0,gems:Math.floor(+d.gems)||0};if(JSON.stringify([pd,pc])===JSON.stringify([trPD,trPC]))return;trPD=pd;trPC=pc;
 for(const k in trW){const m=k==="$coins"?pc.coins:k==="$gems"?pc.gems:pd[k]||0;trW[k]>m&&(m>0?trW[k]=m:delete trW[k])}drawTrI()}
setInterval(__one(()=>{if(!document.hidden)return trPartnerRefresh()}),2500);
let _claiming=!1;async function claim(){if(!TOKEN||!ready||_claiming||document.hidden||Date.now()<claimOff)return;_claiming=!0;try{await serial(async()=>{const e=await rpc("g2_claim",{p_token:TOKEN,p_v:S._v});if(e.error){/Could not find|schema cache/i.test(e.error)&&(claimOff=Date.now()+6e4);return}const t=e.data||{};if(t.stale){await resync();return}const n=Math.floor(+t.amount)||0;n<1||(S.coins+=n,t.v!=null&&(S._v=t.v),dirty=!0,render(),showNotice(tr("tgot"),tr("tgotx",fmt(n),t.from||"?"),!0))})}finally{_claiming=!1}}setInterval(claim,2000),setTimeout(claim,2e3),document.addEventListener("visibilitychange",()=>{document.hidden||claim()});let shLang="";function shBal(){setH($("shbal"),`<div class="bch c"><i><svg class="ico"><use href="#i-coin"/></svg></i><span><small>${L2("Монеты","Coins")}</small><b>${fmt(S.coins)}</b></span></div><div class="bch g"><i><svg class="ico"><use href="#i-gem"/></svg></i><span><small>${L2("Тикеты","Tickets")}</small><b>${fmt(S.gem||0)}</b></span></div>`)}
function renderShop(){shBal(),shLang=LANG}function updShop(){if($("shp").style.display==="block"){if(shLang!==LANG)return renderShop();shBal()}}/* ==========================================================================================
   ЕЖЕДНЕВНЫЕ КВЕСТЫ — настройки (можно менять, HTML знать не нужно)
   Каждый день (в полночь по времени устройства) выбираются QUESTS_PER_DAY квестов из QUEST_POOL.
   Набор квестов один и тот же у всех игроков в этот день.
   QUEST_POOL  — список возможных квестов. id менять не нужно. goals — три варианта цели
                 (лёгкая, средняя, тяжёлая): чем тяжелее цель, тем больше награда.
                 {n} в тексте заменится на число. ok — условие, когда квест можно выдавать (необязательно).
   QUEST_REWARD.tiers — награды за лёгкую / среднюю / тяжёлую цель.
                 coinsSec — столько секунд вашего дохода дают монетами, coinsMin — но не меньше этого числа,
                 gems — тикеты. QUEST_REWARD.all — бонус за выполнение ВСЕХ квестов дня.
   ========================================================================================== */
const QUESTS_PER_DAY = 4;
const QUEST_REWARD = {
  tiers: [
    { coinsSec: 120, coinsMin: 300,  gems: 1 },
    { coinsSec: 240, coinsMin: 600,  gems: 2 },
    { coinsSec: 480, coinsMin: 1200, gems: 3 }
  ],
  all: { coinsSec: 900, coinsMin: 2000, gems: 5 }
};
const QUEST_POOL = [
  { id: "roll", e: "🎲", ru: "Сделать роллов: {n}",                 en: "Do rolls: {n}",                      goals: [100, 250, 500] },
  { id: "x10",  e: "🔟", ru: "Сделать роллов ×10: {n}",           en: "Do ×10 rolls: {n}",                 goals: [10, 25, 50] },
  { id: "rare", e: "💠", ru: "Выбить предметов Rare и выше: {n}",  en: "Get items Rare or higher: {n}",     goals: [25, 60, 120] },
  { id: "epic", e: "🔮", ru: "Выбить предметов Epic и выше: {n}",  en: "Get items Epic or higher: {n}",     goals: [8, 20, 45] },
  { id: "leg",  e: "👑", ru: "Выбить предметов Legendary и выше: {n}", en: "Get items Legendary or higher: {n}", goals: [3, 7, 15] },
  { id: "gem",  e: "🎫", ru: "Получить тикетов с роллов: {n}",    en: "Get tickets from rolls: {n}",          goals: [3, 6, 10], ok: () => false },
  { id: "up",   e: "⬆️", ru: "Прокачек удачи или дохода: {n}",     en: "Luck or income upgrades: {n}",      goals: [2, 4, 6],
    ok: () => S.luck < MAXLUCK || S.inc < MAXINC }
];
/* ===================== Дальше ничего менять не нужно ===================== */

const ITR = {};  ALL.forEach(a => { ITR[a.t] = a.i; });
const dqToday = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
function dqRng(seed) {
  let a = 0; for (const c of seed) a = (a * 31 + c.charCodeAt(0)) >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
function dqCheck() {            /* возвращает квесты на сегодня (создаёт новые, если наступил новый день) */
  const today = dqToday();
  if (S.dq && Array.isArray(S.dq.q) && S.dq.d >= today) { S.dq.q.forEach(x => { if (x.id === "gem" && !x.c && x.p < x.g) { x.id = "roll"; x.g = dqDef("roll").goals[x.t] || 100; x.p = 0; } }); return S.dq; }   // d >= today: перевод часов назад квесты не обновляет
  const rnd = dqRng("quests:" + today), pool = QUEST_POOL.filter(q => !q.ok || q.ok()), q = [];
  while (q.length < QUESTS_PER_DAY && pool.length) {
    const d = pool.splice(Math.floor(rnd() * pool.length), 1)[0], t = Math.floor(rnd() * d.goals.length);
    q.push({ id: d.id, t, g: d.goals[t], p: 0, c: 0 });
  }
  S.dq = { d: today, q, a: 0 };
  save();
  return S.dq;
}
const dqDef = id => QUEST_POOL.find(x => x.id === id);
const dqName = x => { const d = dqDef(x.id); return (LANG === "en" ? d.en : d.ru).replace("{n}", x.g); };
function dqAdd(id, n) {
  if (!n || !ready) return;
  dqCheck().q.forEach(x => {
    if (x.id !== id || x.p >= x.g) return;
    x.p = Math.min(x.g, x.p + n);
    if (x.p >= x.g) toast(L2("Квест выполнен: ", "Quest complete: ") + dqName(x), "ok");
  });
}
function dqRoll(items, n, gems) {       /* вызывается после каждого ролла */
  if (!ready) return;
  dqAdd("roll", n);
  if (n >= 10) dqAdd("x10", 1);
  let rare = 0, epic = 0, leg = 0;
  items.forEach(t => { const r = t in ITR ? ITR[t] : -1; if (r >= 2) rare++; if (r >= 3) epic++; if (r >= 4) leg++; });
  dqAdd("rare", rare); dqAdd("epic", epic); dqAdd("leg", leg); dqAdd("gem", gems);
}
const dqRew = r => ({ coins: Math.max(r.coinsMin, Math.floor(inc() * r.coinsSec)), gems: r.gems });
const dqRewTxt = w => "🪙 " + fmt(w.coins) + " · 💎 " + w.gems;
let _qSig = "";
function renderQuests() {
  const dq = dqCheck(), sec = Math.max(0, Math.floor((new Date(new Date().setHours(24, 0, 0, 0)) - Date.now()) / 1000));
  $("qhd").innerHTML = '<svg class="ico"><use href="#i-quest"/></svg>' + L2("Ежедневные квесты", "Daily quests");
  $("qsub").textContent = L2("Обновление через ", "Resets in ") + fmtT(sec) + " · " + dq.q.filter(x => x.c).length + "/" + dq.q.length;
  const allDone = dq.q.every(x => x.c);
  const html = dq.q.map((x, i) => {
    const d = dqDef(x.id), done = x.p >= x.g, w = dqRew(QUEST_REWARD.tiers[x.t]);
    return `<div class="glass ti ${x.c ? "off" : ""}"><div class="ic">${done ? "✅" : d.e}</div><div class="tx"><b>${esc(dqName(x))}</b>` +
      `<span>${x.p}/${x.g} · ${dqRewTxt(w)}</span><div class="pb"><i style="width:${x.p / x.g * 100}%;background:var(--c1)"></i></div></div>` +
      `<button data-qc="${i}" ${done && !x.c ? "" : "disabled"}>${x.c ? L2("Получено", "Claimed") : done ? L2("Забрать", "Claim") : "…"}</button></div>`;
  }).join("") +
    `<div class="glass ti ${dq.a ? "off" : ""}" style="border-color:var(--c4)"><div class="ic">🎁</div><div class="tx"><b>${L2("Бонус за все квесты", "All-quests bonus")}</b>` +
    `<span>${dqRewTxt(dqRew(QUEST_REWARD.all))}</span></div><button data-qc="all" ${allDone && !dq.a ? "" : "disabled"}>${dq.a ? L2("Получено", "Claimed") : allDone ? L2("Забрать", "Claim") : "…"}</button></div>`;
  if (html !== _qSig) { _qSig = html; $("qlist").innerHTML = html; }
}
$("qlist").onclick = e => {
  if (!ready || busy) return;
  const b = e.target.closest("[data-qc]");
  if (!b || b.disabled) return;
  const dq = dqCheck();
  let rw;
  if (b.dataset.qc === "all") { if (dq.a || !dq.q.every(x => x.c)) return; dq.a = 1; rw = dqRew(QUEST_REWARD.all); }
  else { const x = dq.q[+b.dataset.qc]; if (!x || x.c || x.p < x.g) return; x.c = 1; rw = dqRew(QUEST_REWARD.tiers[x.t]); }
  S.coins += rw.coins; S.gem += rw.gems;
  render(); save(); pushSoon(); renderQuests();
  toast(L2("Награда: ", "Reward: ") + dqRewTxt(rw), "ok");
};
function qBtn() {                       /* подпись кнопки в меню + число готовых наград */
  let n = 0;
  if (ready) { const dq = dqCheck(); n = dq.q.filter(x => x.p >= x.g && !x.c).length + (dq.q.every(x => x.c) && !dq.a ? 1 : 0); }
  $("qstb").innerHTML = '<svg class="ico"><use href="#i-quest"/></svg>' + L2("Квесты", "Quests") + (n ? " (" + n + ")" : "");
}
$("qstb").onclick = () => { renderQuests(); openPanel("qstp"); };
/* qBtn() не вызываем при загрузке: L2 объявлен ниже по коду. Таймер обновит подпись через секунду. */
setInterval(() => { if (document.hidden) return; try { qBtn(); if ($("qstp").style.display === "block") renderQuests(); } catch (e) {} }, 500);
setTimeout(() => { try { qBtn(); } catch (e) {} }, 0);

$("shopBtn").onclick=()=>{renderShop(),openPanel("shp")},(function(){const e=$("menuBtn"),t=$("menu"),n=o=>{t.classList.toggle("open",o),e.classList.toggle("open",o),e.setAttribute("aria-expanded",o)};e.onclick=o=>{o.stopPropagation(),n(!t.classList.contains("open"))},document.addEventListener("click",o=>{t.contains(o.target)||n(!1)}),document.addEventListener("keydown",o=>{o.key==="Escape"&&n(!1)}),t.addEventListener("click",o=>{o.target.closest("button")&&n(!1)})})(),(function(){const e=$("stB"),t=$("stF"),n=e.getContext("2d"),o=t.getContext("2d");if(!n||!o)return;const a=matchMedia("(prefers-reduced-motion:reduce)").matches,r=matchMedia("(prefers-color-scheme:light)"),i=()=>!(r.matches&&document.documentElement.getAttribute("data-theme")!=="dark"),d=-.38/Math.hypot(.38,1),l=1/Math.hypot(.38,1);let s=0,c=0,u=[],g=[],k=0,b=0,x=!1,E=0;function T(){const f=i()?["255,255,255","190,170,255","255,233,138"]:["123,77,255","192,77,255","80,60,200"];g=[],f.forEach(m=>[34,58,88].forEach(y=>{const p=document.createElement("canvas"),v=4,N=Math.ceil(-d*y)+v*2,C=Math.ceil(l*y)+v*2,h=p.getContext("2d");p.width=N,p.height=C;const _=v,w=C-v,H=N-v,O=v,L=h.createLinearGradient(H,O,_,w);L.addColorStop(0,`rgba(${m},0)`),L.addColorStop(1,`rgba(${m},.9)`),h.strokeStyle=L,h.lineWidth=1.6,h.lineCap="round",h.beginPath(),h.moveTo(H,O),h.lineTo(_,w),h.stroke(),h.fillStyle=`rgba(${m},1)`,h.beginPath(),h.arc(_,w,1.8,0,6.283),h.fill(),g.push({c:p,hx:_,hy:w,h:C})}))}function A(f,m){return f.s=g[Math.random()*g.length|0],f.x=Math.random()*(s+c*.4),f.y=m?Math.random()*c:-f.s.h-Math.random()*c*.3,f.v=70+Math.random()*170,f.a=.35+Math.random()*.6,f}function q(){const f=Math.min(devicePixelRatio||1,2);e.width=Math.round(s*f),e.height=Math.round(c*f),n.setTransform(f,0,0,f,0,0),n.clearRect(0,0,s,c);const m=Math.min(400,Math.round(s*c/3e3)),y=i()?"255,255,255":"90,60,170";for(let p=0;p<m;p++)n.fillStyle=`rgba(${y},${(.12+Math.random()*.4).toFixed(2)})`,n.beginPath(),n.arc(Math.random()*s,Math.random()*c,Math.random()<.12?1.3:.7,0,6.283),n.fill()}function M(){s=innerWidth,c=innerHeight,t.width=s,t.height=c;const f=Math.max(14,Math.min(40,Math.round(s*c/28e3)));u=[];for(let m=0;m<f;m++)u.push(A({},!0));q()}function P(f){if(k=requestAnimationFrame(P),f-b<33)return;const m=Math.min((f-b)/1e3,.06);b=f,o.clearRect(0,0,s,c);for(let y=0;y<u.length;y++){const p=u[y],v=p.s;p.x+=d*p.v*m,p.y+=l*p.v*m,(p.y>c+8||p.x<-40)&&A(p,!1),o.globalAlpha=p.a,o.drawImage(v.c,Math.round(p.x-v.hx),Math.round(p.y-v.hy))}}function j(){}function B(){x=!1,cancelAnimationFrame(k)}T(),M(),j(),document.addEventListener("visibilitychange",()=>document.hidden?B():j()),addEventListener("resize",()=>{clearTimeout(E),E=setTimeout(()=>{(innerWidth!==s||Math.abs(innerHeight-c)>150)&&M()},150)});const I=()=>{T(),M()};r.addEventListener?r.addEventListener("change",I):r.addListener(I)})();const L2=(e,t)=>LANG==="en"?t:e;Object.assign(TX,{"💎 Тикеты":"💎 Tickets","Питомцы и тикеты":"Pets & tickets","Выдать тикеты":"Give tickets","Забрать тикеты":"Take tickets","Выдать титул «Баг-хантер»":"Give «Bug Hunter» title"});/* ЯЙЦА В МАГАЗИНЕ: price — тикеты, rr — редкости питомцев, w — шансы (%) */
const EGGS=[
 {k:0,ic:"🥚",ru:"Обычное яйцо",en:"Common egg",price:5,rr:[0,1,2,3],w:[60,25,10,5]},
 {k:1,ic:"🐣",ru:"Редкое яйцо",en:"Rare egg",price:25,rr:[2,3,4,5],w:[50,30,15,5]},
 {k:2,ic:"🔮",ru:"Легендарное яйцо",en:"Legendary egg",price:100,rr:[4,5,6,7],w:[50,30,15,5]}];
function eggBuy(k){const g=EGGS[k];if(!g)return;const p=pr({price:g.price});if((S.gem||0)<p)return toast(L2("Не хватает тикетов","Not enough tickets"),"err");let x=Math.random()*100,i=0;for(;i<g.w.length-1&&x>=g.w[i];i++)x-=g.w[i];const r=g.rr[i],l=PETS.filter(q=>q.r===r),q=l[Math.floor(Math.random()*l.length)]||PETS[0];S.gem-=p;S.pt.push(q.id);render();save();pushSoon();renderShop();toast("🥚 "+L2(q.ru,q.en)+" · "+rname(r),"ok")}
let shTab="g";function applyShTab(){$("sh_t").style.display=shTab==="t"?"":"none",$("sh_g").style.display=shTab==="g"?"":"none",$("sh_b").style.display=shTab==="b"?"":"none",document.querySelectorAll("#shtabs [data-st]").forEach(e=>{e.className=e.dataset.st===shTab?"":"alt",e.textContent=e.dataset.st==="t"?L2("Титулы","Titles"):e.dataset.st==="b"?L2("Бандлы","Bundles"):L2("Геймпассы","Passes")})}function renderGem(){applyShTab(),typeof renderGP=="function"&&renderGP(),typeof renderBN=="function"&&renderBN()}{const e=renderShop;renderShop=function(){e(),renderGem()}}$("shtabs").onclick=e=>{const t=e.target.closest("[data-st]");t&&(shTab=t.dataset.st,renderGem())},$("shp").addEventListener("click",e=>{if(!ready||busy)return;const t=e.target.closest("[data-egg]");if(t&&!t.disabled)eggBuy(+t.dataset.egg)}),$("a_gem").onclick=()=>adm(e=>{e.gem=admCap((+e.gem||0)+admAmt())}),$("a_gemt").onclick=()=>adm(e=>{e.gem=Math.max(0,(+e.gem||0)-admAmt())});let MP=[];async function modLoad(){const c=ccGet("md");c&&!MP.length&&drawMod({data:c});const e=await rpc("g2_mod_list",{p_token:TOKEN});if(e.error)return;ccSet("md",e.data);drawMod(e)}function drawMod(e){MP=(e.data||[]).slice(),(isOwner||granted)&&me&&!MP.some(o=>o.me)&&MP.unshift({key:me.nick.toLowerCase(),nick:me.nick,avatar:me.avatar,role:isOwner?"owner":"admin",banned:!1,reason:"",me:!0}),MP.forEach(o=>{AVMAP[o.key]=o.avatar});const t=$("m_who"),n=t.value;t.innerHTML=`<option value="" disabled hidden>${L2("Выберите игрока","Choose a player")}</option>`+MP.map(o=>`<option value="${esc(o.key)}">${o.banned?"🚫 ":""}${avP(o.avatar)}${esc(o.nick)}${o.me?" ("+L2("вы","you")+")":""}${o.role==="admin"?" ★":""}</option>`).join(""),t.value=[...t.options].some(o=>o.value===n)?n:"",!isOwner&&(()=>{const a=$("a_who"),v=a.value;a.innerHTML=`<option value="" disabled hidden>${L2("Выберите игрока","Choose a player")}</option><option value="me">${tr("meopt")}</option>`+MP.filter(o=>!o.me&&!o.role).map(o=>`<option value="${esc(o.key)}">${avP(o.avatar)}${esc(o.nick)}</option>`).join(""),a.value=[...a.options].some(o=>o.value===v)?v:""})(),modSel()}function modSel(){const e=MP.find(n=>n.key===$("m_who").value),t=!e||e.me||e.role==="owner"||!isOwner&&e.role==="admin";$("m_ban").disabled=t||e.banned,$("m_unban").disabled=t||!e.banned,$("m_clear").disabled=!e,$("m_info").textContent=e&&e.banned?"🚫 "+L2("Заблокирован","Banned")+(e.reason?": "+e.reason:""):e&&e.me?L2("Это вы: бан недоступен, можно очистить свой профиль","This is you: ban is unavailable, you can clear your own profile"):""}$("m_who").addEventListener("change",modSel);async function modAct(e,t,n,o){const a=$("m_who").value;if(!a)return toast(L2("Выберите игрока","Pick a player"),"err");const r=await rpc(e,Object.assign({p_token:TOKEN,p_key:a},t));if(r.error)return toast(srv(r.error),"err");toast(n,"ok"),o&&o(),modLoad()}$("m_ban").onclick=()=>modAct("g2_ban",{p_ban:!0,p_reason:$("m_reason").value.trim()},L2("Игрок заблокирован","Player banned")),$("m_unban").onclick=()=>modAct("g2_ban",{p_ban:!1,p_reason:""},L2("Игрок разблокирован","Player unbanned"));let clrT=0;$("m_clear").onclick=()=>{const e=$("m_clear"),t=L2("Очистить профиль","Clear profile");if(!clrT){e.textContent=L2("Точно очистить? Нажмите ещё раз","Sure? Tap again"),clrT=setTimeout(()=>{clrT=0,e.textContent=t},4e3);return}clearTimeout(clrT),clrT=0,e.textContent=t;const n=MP.find(a=>a.key===$("m_who").value),o=!!(n&&n.me);modAct("g2_clear_profile",{},L2("Профиль очищен","Profile cleared"),()=>{o&&selfCleared(me&&me.avatar)})};const SELD=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value"),optHTML=(e,t)=>{const n=e.id==="a_who"||e.id==="g_who"||e.id==="m_who"?AVMAP[t.value]:"";return(n&&isImg(n)?avH(n)+" ":"")+esc(t.textContent)};function enhanceSel(e){if(e._cs||e.classList.contains("csel-n"))return;const t=document.createElement("div");t.className="csel",e.style.flex==="none"&&t.setAttribute("data-fit","1");const n=document.createElement("button");n.type="button",n.className="csel-b",n.innerHTML="<span></span>",e.parentNode.insertBefore(t,e),t.appendChild(n),t.appendChild(e),e.classList.add("csel-n");const o=()=>{const a=e.selectedOptions[0];n.firstChild.innerHTML=a?optHTML(e,a):"",n.disabled=e.disabled};Object.defineProperty(e,"value",{get(){return SELD.get.call(e)},set(a){SELD.set.call(e,a),o()},configurable:!0}),new MutationObserver(o).observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["disabled"]}),n.onclick=()=>openSel(e),e._cs=1,o()}const SELT={m_who:["Игрок","Player"],g_who:["Игрок","Player"],a_who:["Игрок","Player"],a_ev:["Ивент","Event"],a_evu:["Единицы времени","Time unit"],a_rar:["Редкость","Rarity"],mn_m:["Количество мин","Number of mines"]};function closeSel(){$("selPop").classList.remove("show")}function openSel(e){const t=[...e.options].filter(l=>!l.disabled),n=$("sp_list"),o=$("sp_q"),a=t.length>12&&t.every(l=>l.textContent.length<=3),r=SELT[e.id];$("sp_t").textContent=r?L2(r[0],r[1]):L2("Выбор","Choose"),$("sp_x").textContent=L2("Отмена","Cancel"),o.placeholder=L2("Поиск","Search"),n.className="sp-list"+(a?" grid":""),o.style.display=t.length>8&&!a?"":"none",o.value="";const i=l=>{n.innerHTML="",t.filter(s=>!l||s.textContent.toLowerCase().includes(l)).forEach(s=>{const c=document.createElement("button");c.type="button",c.className="sp-o"+(s.value===e.value?"":" alt"),c.innerHTML=optHTML(e,s),c.onclick=()=>{e.value=s.value,e.dispatchEvent(new Event("change",{bubbles:!0})),closeSel()},n.appendChild(c)})};o.oninput=()=>i(o.value.trim().toLowerCase()),i(""),$("selPop").classList.add("show");const d=n.querySelector(".sp-o:not(.alt)");d&&d.scrollIntoView({block:"center"})}$("sp_x").onclick=closeSel,$("selPop").onclick=e=>{e.target===$("selPop")&&closeSel()},addEventListener("keydown",e=>{e.key==="Escape"&&closeSel()}),(function(){let e=0;const t=()=>{e=0,document.querySelectorAll("select:not(.csel-n)").forEach(enhanceSel)};new MutationObserver(ms=>{if(e)return;for(const m of ms)for(const n of m.addedNodes)if(n.nodeType===1){e=requestAnimationFrame(t);return}}).observe(document.body,{childList:!0,subtree:!0}),t()})();function toast(e,t){const n=$("toasts");if(!n||!e)return;if(t==="err"){const rg=$("reg");if(!(rg&&rg.style.display==="flex")){window.__sfxErr&&window.__sfxErr();return}}if((t==="ok"||t==="info")&&/повышен|upgraded/i.test(String(e)))return;if((t==="ok"||t==="info")&&/^(Обмен|Exchange|Доход повышен|Income upgraded|Удача повышена|Luck upgraded|Аккаунт создан|Account created|Вы вошли|Signed in|Доступ к админке|Admin access|Аккаунт удалён|Account deleted|Готово|Done|Куплено|Bought|Промокод создан|Promo code created|Промокод удалён|Promo code deleted|Ранг изменён|Rank changed|Клан создан|Clan created|Ты в клане|Joined|Вложено|Donated|Игрок исключён|Player kicked|Вместимость|Clan capacity|Улучшено|Upgraded|Ты покинул|You left|Награда|Reward)/.test(String(e)))return;const o=document.createElement("div");o.className="toast "+(t||"info"),o.innerHTML=`<i>${t==="ok"?"✅":t==="err"?"❌":"ℹ️"}</i><span></span>`,o.lastChild.textContent=e;const a=()=>{o.parentNode&&(o.classList.add("out"),setTimeout(()=>o.remove(),260))};for(o.onclick=a,n.appendChild(o);n.children.length>3;)n.firstChild.remove();setTimeout(a,3400);return o}$("a_chips").onclick=e=>{const t=e.target.closest("[data-v]");t&&($("a_coins").value=t.dataset.v)},Object.assign(TX,{"Остановить все":"Stop all","Управление игроками, экономикой и ивентами":"Manage players, economy and events",Игрок:"Player","Монеты и тикеты":"Coins and tickets",Прокачка:"Progression","Коллекция и титулы":"Collection and titles",Сумма:"Amount"}),Object.assign(TX,{"🔄 Перерождения":"🔄 Rebirths","Перерождения":"Rebirths","⚡ Апгрейды":"⚡ Upgrades","Апгрейды":"Upgrades","Улучшай удачу и доход за монеты":"Upgrade luck and income with coins"}),Object.assign(TX,{"🏰 Кланы":"🏰 Clans",Кланы:"Clans"}),addEventListener("languagechange",()=>setLang(devLang())),setLang(LANG);
