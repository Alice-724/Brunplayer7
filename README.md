<!DOCTYPE html>
<html lang="en">
<head>
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#FFFDF5">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>Brunplayer7</title>
<title>Loop — your music player</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      
    
  :root{
    --blue:#95B1EE;
    --cream:#FFFDF5;
    --green:#E7F1A8;
    --navy:#364C84;
    --navy-dim:#7C8AA6;
    --card:#FFFFFF;
    --border:#EAEEFA;
    --shadow:0 8px 24px rgba(54,76,132,0.10);
  }
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;height:100%;}
  body{
    background:var(--cream);
    color:var(--navy);
    font-family:'Plus Jakarta Sans', sans-serif;
    -webkit-font-smoothing:antialiased;
  }
  #app{max-width:480px;margin:0 auto;min-height:100vh;position:relative;padding-bottom:86px;}
  button{font-family:inherit;cursor:pointer;background:none;border:none;color:inherit;}
  input{font-family:inherit;}
  img{display:block;}

  /* ---------- header ---------- */
  .topbar{display:flex;align-items:center;justify-content:space-between;padding:22px 20px 6px;}
  .brand{display:flex;align-items:center;gap:9px;}
  .brand-name{font-weight:800;font-size:22px;color:var(--navy);letter-spacing:-0.3px;}
  .topbar-actions{display:flex;gap:8px;}
  .round-btn{
    width:38px;height:38px;border-radius:50%;background:var(--card);
    display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow);
  }
  .round-btn.filled{background:var(--navy);}

  .greeting{padding:14px 20px 4px;}
  .greeting h1{font-size:22px;font-weight:700;margin:0 0 2px;}
  .greeting p{margin:0;color:var(--navy-dim);font-size:14px;}

  /* ---------- tip banner ---------- */
  .tip{
    margin:14px 20px 4px;background:var(--green);border-radius:16px;padding:12px 14px;
    font-size:12.5px;color:#4B5B2A;line-height:1.5;display:flex;gap:10px;align-items:flex-start;
  }
  .tip button.close{flex-shrink:0;color:#4B5B2A;opacity:0.6;font-size:13px;}

  /* ---------- sections ---------- */
  .section{padding:20px 20px 4px;}
  .section-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
  .section-head h2{font-size:16px;font-weight:700;margin:0;}
  .see-all{font-size:12.5px;color:var(--navy-dim);font-weight:600;}

  .hscroll{display:flex;gap:12px;overflow-x:auto;padding-bottom:4px;margin:0 -20px;padding-left:20px;padding-right:20px;}
  .hscroll::-webkit-scrollbar{display:none;}

  .cover{border-radius:16px;background-size:cover;background-position:center;position:relative;overflow:hidden;flex-shrink:0;}
  .cover img{width:100%;height:100%;object-fit:cover;}
  .cover .placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;}

  .rec-card{width:126px;}
  .rec-card .cover{width:126px;height:126px;}
  .rec-card .t{font-size:13px;font-weight:600;margin-top:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .rec-card .a{font-size:11.5px;color:var(--navy-dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

  .pl-card{width:140px;background:var(--card);border-radius:18px;padding:10px;box-shadow:var(--shadow);flex-shrink:0;}
  .pl-collage{width:100%;height:100px;border-radius:12px;overflow:hidden;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:1.5px;}
  .pl-collage .cell{background-size:cover;background-position:center;}
  .pl-card .t{font-size:13px;font-weight:700;margin-top:9px;}
  .pl-card .c{font-size:11.5px;color:var(--navy-dim);}
  .new-pl-card{width:110px;flex-shrink:0;border:1.5px dashed var(--blue);border-radius:18px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:var(--navy);font-size:12.5px;font-weight:600;height:154px;}

  .song-row{display:flex;align-items:center;gap:12px;padding:9px 0;}
  .song-row .cover{width:50px;height:50px;border-radius:12px;}
  .song-row .meta{flex:1;min-width:0;}
  .song-row .t{font-size:14.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .song-row .a{font-size:12px;color:var(--navy-dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .song-row .dur{font-size:11.5px;color:var(--navy-dim);flex-shrink:0;}
  .song-row .opt{flex-shrink:0;width:30px;height:30px;display:flex;align-items:center;justify-content:center;}

  .song-list{padding:0 20px;}
  .list-head{display:flex;align-items:center;justify-content:space-between;padding:20px 20px 8px;}
  .sort-btn{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--navy-dim);font-weight:600;background:var(--card);padding:7px 11px;border-radius:999px;box-shadow:var(--shadow);}

  .empty-state{padding:60px 30px;text-align:center;color:var(--navy-dim);font-size:14px;line-height:1.6;}
  .empty-state button{margin-top:14px;background:var(--navy);color:var(--cream);padding:11px 20px;border-radius:999px;font-size:13.5px;font-weight:600;}

  /* ---------- bottom nav ---------- */
  .bottomnav{
    position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:480px;
    background:var(--cream);border-top:1px solid var(--border);
    display:flex;align-items:center;justify-content:space-around;padding:10px 30px calc(10px + env(safe-area-inset-bottom));
    z-index:20;
  }
  .nav-btn{display:flex;flex-direction:column;align-items:center;gap:3px;color:var(--navy-dim);font-size:10px;font-weight:600;}
  .nav-btn.active{color:var(--navy);}
  .nav-fab{
    width:54px;height:54px;border-radius:50%;background:var(--navy);display:flex;align-items:center;justify-content:center;
    box-shadow:0 10px 20px rgba(54,76,132,0.35);margin-top:-30px;
  }

  /* mini player bar */
  .mini-player{
    position:fixed;bottom:72px;left:50%;transform:translateX(-50%);width:calc(100% - 24px);max-width:456px;
    background:var(--navy);border-radius:18px;padding:9px 12px;display:flex;align-items:center;gap:11px;
    box-shadow:0 10px 24px rgba(54,76,132,0.3);z-index:19;
  }
  .mini-player .cover{width:38px;height:38px;border-radius:9px;}
  .mini-player .meta{flex:1;min-width:0;color:var(--cream);}
  .mini-player .t{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .mini-player .a{font-size:11px;color:var(--blue);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .mini-player .ctrl{width:32px;height:32px;flex-shrink:0;color:var(--cream);display:flex;align-items:center;justify-content:center;}

  /* ---------- now playing ---------- */
  .np-screen{position:fixed;inset:0;background:var(--cream);z-index:30;max-width:480px;margin:0 auto;display:flex;flex-direction:column;overflow-y:auto;}
  .np-top{display:flex;align-items:center;justify-content:space-between;padding:20px;}
  .np-top .title{font-size:14px;font-weight:700;color:var(--navy-dim);}
  .np-art-wrap{margin:10px auto 0;padding:14px;border:2px solid var(--blue);border-radius:32px;width:min(78%, 300px);}
  .np-art{width:100%;aspect-ratio:1/1;border-radius:24px;overflow:hidden;}
  .np-info{text-align:center;padding:22px 30px 6px;}
  .np-info .t{font-size:21px;font-weight:800;margin-bottom:4px;}
  .np-info .a{font-size:14px;color:var(--navy-dim);}
  .np-icon-row{display:flex;justify-content:center;gap:36px;padding:14px 0 6px;}
  .np-icon-row button{color:var(--navy-dim);display:flex;flex-direction:column;align-items:center;gap:4px;font-size:10px;font-weight:600;}
  .np-icon-row button.active{color:var(--navy);}

  .np-progress{padding:14px 30px 0;}
  .np-progress input[type=range]{
    width:100%;-webkit-appearance:none;height:6px;border-radius:4px;background:var(--border);outline:none;
  }
  .np-progress input[type=range]::-webkit-slider-thumb{
    -webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:var(--navy);cursor:pointer;
  }
  .np-times{display:flex;justify-content:space-between;font-size:11px;color:var(--navy-dim);margin-top:6px;}

  .np-controls{display:flex;align-items:center;justify-content:center;gap:22px;padding:20px 20px 8px;}
  .np-controls button{color:var(--navy);}
  .np-controls .play-big{
    width:64px;height:64px;border-radius:50%;background:var(--navy);color:var(--cream);
    display:flex;align-items:center;justify-content:center;
  }
  .np-side-btn{position:relative;color:var(--navy-dim);}
  .np-side-btn.on{color:var(--navy);}
  .np-side-btn .badge{position:absolute;top:-4px;right:-6px;background:var(--navy);color:var(--cream);font-size:8px;font-weight:700;border-radius:50%;width:12px;height:12px;display:flex;align-items:center;justify-content:center;}

  .np-queue{padding:14px 20px 30px;}
  .relink-note{margin:0 30px 10px;background:var(--green);border-radius:12px;padding:10px 12px;font-size:12px;color:#4B5B2A;text-align:center;}
  .relink-note button{font-weight:700;text-decoration:underline;}

  /* ---------- modals / sheets ---------- */
  .overlay{position:fixed;inset:0;background:rgba(54,76,132,0.35);z-index:40;display:flex;align-items:flex-end;}
  .sheet{
    background:var(--cream);width:100%;max-width:480px;margin:0 auto;border-radius:24px 24px 0 0;
    padding:20px 20px calc(24px + env(safe-area-inset-bottom));max-height:82vh;overflow-y:auto;
  }
  .sheet-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
  .sheet-head h3{font-size:17px;font-weight:800;margin:0;}
  .field{margin-bottom:14px;}
  .field label{font-size:12.5px;color:var(--navy-dim);font-weight:600;display:block;margin-bottom:6px;}
  .field input[type=text]{
    width:100%;background:var(--card);border:1.5px solid var(--border);border-radius:12px;padding:11px 13px;font-size:15px;color:var(--navy);outline:none;
  }
  .field input[type=text]:focus{border-color:var(--blue);}
  .cover-picker{display:flex;align-items:center;gap:12px;}
  .cover-picker .cover{width:64px;height:64px;border-radius:14px;}
  .cover-picker button{background:var(--card);border:1.5px solid var(--border);border-radius:10px;padding:9px 13px;font-size:13px;font-weight:600;}
  .sheet-actions{display:flex;gap:10px;margin-top:18px;}
  .btn{flex:1;padding:13px;border-radius:12px;font-size:14.5px;font-weight:700;text-align:center;}
  .btn.primary{background:var(--navy);color:var(--cream);}
  .btn.ghost{background:var(--card);color:var(--navy);border:1.5px solid var(--border);}

  .option-row{display:flex;align-items:center;gap:14px;padding:13px 2px;font-size:15px;font-weight:600;border-bottom:1px solid var(--border);}
  .option-row.danger{color:#B3452F;}

  .pl-check-row{display:flex;align-items:center;gap:12px;padding:11px 2px;border-bottom:1px solid var(--border);}
  .pl-check-row .name{flex:1;font-size:14.5px;font-weight:600;}
  .checkbox{width:21px;height:21px;border-radius:6px;border:1.5px solid var(--blue);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .checkbox.checked{background:var(--navy);border-color:var(--navy);}

  .toast{
    position:fixed;bottom:170px;left:50%;transform:translateX(-50%);background:var(--navy);color:var(--cream);
    padding:11px 18px;border-radius:999px;font-size:13px;font-weight:600;z-index:60;box-shadow:var(--shadow);
    animation:toastIn .2s ease both;
  }
  @keyframes toastIn{from{opacity:0;transform:translate(-50%,8px);}to{opacity:1;transform:translate(-50%,0);}}

  .search-input-wrap{padding:18px 20px 6px;}
  .search-input{
    width:100%;background:var(--card);border:1.5px solid var(--border);border-radius:14px;padding:12px 15px;
    font-size:15px;color:var(--navy);outline:none;box-shadow:var(--shadow);
  }
  .search-input:focus{border-color:var(--blue);}

  .fab-add{position:fixed;right:calc(50% - 240px + 20px);bottom:110px;z-index:15;}
  @media (max-width:480px){ .fab-add{right:20px;} }
</style>
</head>
<body>
<div id="app"></div>
<audio id="audioEl" playsinline></audio>
<input type="file" id="fileInput" accept="audio/*" multiple style="display:none">
<input type="file" id="coverInput" accept="image/*" style="display:none">
<input type="file" id="relinkInput" accept="audio/*" style="display:none">

<script>
/* ---------------- icons ---------------- */
const ic = {
  loop:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 2l4 4-4 4" stroke="#364C84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 11V9a4 4 0 0 1 4-4h14" stroke="#364C84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 22l-4-4 4-4" stroke="#364C84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 13v2a4 4 0 0 1-4 4H3" stroke="#364C84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  plus:(c='#364C84')=>`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="${c}" stroke-width="2.3" stroke-linecap="round"/></svg>`,
  plusW:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#FFFDF5" stroke-width="2.3" stroke-linecap="round"/></svg>`,
  home:(a)=>`<svg width="21" height="21" viewBox="0 0 24 24" fill="none"><path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9z" stroke="${a?'#364C84':'#7C8AA6'}" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  layers:(a)=>`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="${a?'#364C84':'#7C8AA6'}" stroke-width="1.8" stroke-linejoin="round"/><path d="M3 13l9 5 9-5" stroke="${a?'#364C84':'#7C8AA6'}" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  search:(c='#FFFDF5')=>`<svg width="21" height="21" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="${c}" stroke-width="2"/><path d="M21 21l-4.3-4.3" stroke="${c}" stroke-width="2" stroke-linecap="round"/></svg>`,
  back:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#364C84" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  dots:`<svg width="19" height="19" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.8" fill="#7C8AA6"/><circle cx="12" cy="12" r="1.8" fill="#7C8AA6"/><circle cx="19" cy="12" r="1.8" fill="#7C8AA6"/></svg>`,
  play:(c='#FFFDF5',s=22)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none"><path d="M7 4l13 8-13 8V4z" fill="${c}"/></svg>`,
  pause:(c='#FFFDF5',s=22)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none"><rect x="6" y="4" width="4" height="16" rx="1" fill="${c}"/><rect x="14" y="4" width="4" height="16" rx="1" fill="${c}"/></svg>`,
  prev:(c='#364C84')=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 5L8 12l10 7V5z" fill="${c}"/><rect x="5" y="5" width="2.4" height="14" rx="1" fill="${c}"/></svg>`,
  next:(c='#364C84')=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 5l10 7-10 7V5z" fill="${c}"/><rect x="16.6" y="5" width="2.4" height="14" rx="1" fill="${c}"/></svg>`,
  shuffle:(c)=>`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 6h4l10 12h4" stroke="${c}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 4l4 4-4 4M3 18h4l3.2-3.8M17 20l4-4-4-4" stroke="${c}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  repeat:(c)=>`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17 2l4 4-4 4" stroke="${c}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 11V9a4 4 0 0 1 4-4h14" stroke="${c}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 22l-4-4 4-4" stroke="${c}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 13v2a4 4 0 0 1-4 4H3" stroke="${c}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  share:(c='#364C84')=>`<svg width="19" height="19" viewBox="0 0 24 24" fill="none"><circle cx="18" cy="5" r="2.6" stroke="${c}" stroke-width="1.8"/><circle cx="6" cy="12" r="2.6" stroke="${c}" stroke-width="1.8"/><circle cx="18" cy="19" r="2.6" stroke="${c}" stroke-width="1.8"/><path d="M8.3 10.7L15.7 6.3M8.3 13.3l7.4 4.4" stroke="${c}" stroke-width="1.8"/></svg>`,
  addToList:(c='#364C84')=>`<svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h10M4 18h10" stroke="${c}" stroke-width="1.9" stroke-linecap="round"/><path d="M19 15v6M16 18h6" stroke="${c}" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  pencil:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 20l1-4.5L15.5 5 19 8.5 8.5 19 4 20z" stroke="#364C84" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  camera:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" stroke="#364C84" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="14" r="3.4" stroke="#364C84" stroke-width="1.8"/></svg>`,
  trash:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0l1 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-13" stroke="#B3452F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  x:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="#364C84" stroke-width="2" stroke-linecap="round"/></svg>`,
  chevUp:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 15l6-6 6 6" stroke="#7C8AA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevDown:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#7C8AA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  sort:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M7 12h10M10 18h4" stroke="#7C8AA6" stroke-width="1.8" stroke-linecap="round"/></svg>`,
};
const GRADIENTS = [
  ['#95B1EE','#364C84'], ['#E7F1A8','#95B1EE'], ['#364C84','#7C8AA6'], ['#E7F1A8','#364C84'], ['#95B1EE','#E7F1A8']
];
function gradFor(id){
  let h=0; for(const c of String(id)) h=(h*31+c.charCodeAt(0))>>>0;
  return GRADIENTS[h % GRADIENTS.length];
}
function coverStyle(song, size){
  if(song && song.cover) return `<img src="${song.cover}" style="width:100%;height:100%;object-fit:cover">`;
  const [a,b] = gradFor(song ? song.id : Math.random());
  return `<div class="placeholder" style="width:100%;height:100%;background:linear-gradient(135deg,${a},${b})"></div>`;
}

/* ---------------- state ---------------- */
let state = {
  screen:'library', // library | playlists | playlistDetail | search
  songs:[],          // {id,title,artist,cover,fileName,duration,addedAt}
  playlists:[],       // {id,name,songIds:[]}
  activePlaylistId:null,
  tipDismissed:false,
  sortMode:'recent',  // recent | title | artist
  search:'',
  nowPlayingOpen:false,
  queue:[],           // array of song ids
  currentIndex:-1,
  repeatMode:'off',   // off | all | one
  shuffle:false,
  isPlaying:false,
  currentTime:0,
  duration:0,
  modal:null,          // {type:'edit'|'addToPlaylist'|'options', songId}
  relinkFor:null,
  toastMsg:null,
};
const sessionFiles = {};
  const dbPromise = new Promise((resolve) => {
  const req = indexedDB.open('LoopAudioDB', 1);
  req.onupgradeneeded = (e) => e.target.result.createObjectStore('audio');
  req.onsuccess = (e) => resolve(e.target.result);
});

async function saveAudio(id, file) {
  const db = await dbPromise;
  db.transaction('audio', 'readwrite').objectStore('audio').put(file, id);
}

async function getAudio(id) {
  const db = await dbPromise;
  return new Promise(res => {
    const req = db.transaction('audio', 'readonly').objectStore('audio').get(id);
    req.onsuccess = () => res(req.result);
  });
}
  // songId -> File (in-memory only, not persisted)
const audioEl = document.getElementById('audioEl');

async function loadData(){
  try{
    const r = localStorage.getItem('loop_library'); 
    if(r){
      const d = JSON.parse(r);
      state.songs = d.songs || [];
      state.playlists = d.playlists || [];
    }
  }catch(e){}
}

async function saveData(){
  try{
    localStorage.setItem('loop_library', JSON.stringify({songs:state.songs, playlists:state.playlists}));
  }catch(e){}
}
function uid(){ return Math.random().toString(36).slice(2,10) + Date.now().toString(36); }
function fmtTime(s){
  if(!isFinite(s) || s<0) s=0;
  const m = Math.floor(s/60), sec = Math.floor(s%60);
  return `${m}:${sec<10?'0':''}${sec}`;
}
function songById(id){ return state.songs.find(s=>s.id===id); }
function toast(msg){
  state.toastMsg = msg; render();
  clearTimeout(window.__toastT);
  window.__toastT = setTimeout(()=>{ state.toastMsg=null; render(); }, 2200);
}

/* ---------------- render ---------------- */
function render(){
  const app = document.getElementById('app');
  let html = '';
  if(state.screen==='library') html = renderLibrary();
  else if(state.screen==='playlists') html = renderPlaylists();
  else if(state.screen==='playlistDetail') html = renderPlaylistDetail();
  else if(state.screen==='search') html = renderSearch();

  html += renderMiniPlayer();
  html += renderBottomNav();
  app.innerHTML = html;

  if(state.nowPlayingOpen) app.innerHTML += renderNowPlaying();
  if(state.modal) app.innerHTML += renderModal();
  if(state.toastMsg) app.innerHTML += `<div class="toast">${escapeHtml(state.toastMsg)}</div>`;

  const npProgress = document.getElementById('npProgress');
  if(npProgress) npProgress.addEventListener('input', onSeekInput);
}

function renderTip(){
  if(state.tipDismissed) return '';
  return `<div class="tip">
    <div>Tip: for lock-screen controls and background playback, open this page directly in your phone's browser rather than inside an embedded app view.</div>
    <button class="close" onclick="dismissTip()">✕</button>
  </div>`;
}

function renderLibrary(){
  const recent = [...state.songs].sort((a,b)=>b.addedAt-a.addedAt).slice(0,8);
  const all = sortedSongs(state.songs);
  return `
    <div class="topbar">
      <div class="brand">${ic.loop}<span class="brand-name">Loop</span></div>
      <div class="topbar-actions">
        <button class="round-btn" onclick="triggerAdd()">${ic.plus()}</button>
      </div>
    </div>
    <div class="greeting"><h1>Your library</h1><p>${state.songs.length} song${state.songs.length===1?'':'s'} · ${state.playlists.length} playlist${state.playlists.length===1?'':'s'}</p></div>
    ${renderTip()}

    ${state.songs.length===0 ? `
      <div class="empty-state">
        No songs yet. Add MP3s from your downloads to start building your library.
        <div><button onclick="triggerAdd()">Add songs</button></div>
      </div>
    ` : `
      <div class="section">
        <div class="section-head"><h2>Recently added</h2></div>
        <div class="hscroll">
          ${recent.map(s => `
            <div class="rec-card">
              <button class="cover" style="width:126px;height:126px;padding:0" onclick='playFromList("${s.id}", ${JSON.stringify(recent.map(x=>x.id))})'>${coverStyle(s)}</button>
              <div class="t">${escapeHtml(s.title)}</div>
              <div class="a">${escapeHtml(s.artist)}</div>
            </div>`).join('')}
        </div>
      </div>

      <div class="section">
        <div class="section-head"><h2>Playlists</h2><button class="see-all" onclick="goPlaylists()">See all</button></div>
        <div class="hscroll">
          <button class="new-pl-card" onclick="openCreatePlaylist()">${ic.plus()}New playlist</button>
          ${state.playlists.slice(0,6).map(p => renderPlCard(p)).join('')}
        </div>
      </div>

      <div class="list-head"><h2 style="font-size:16px;font-weight:700;margin:0">All songs</h2>
        <button class="sort-btn" onclick="cycleSort()">${ic.sort} ${sortLabel()}</button>
      </div>
      <div class="song-list">
        ${all.map(s => renderSongRow(s, all.map(x=>x.id))).join('')}
      </div>
    `}
  `;
}

function renderPlCard(p){
  const covers = p.songIds.slice(0,4).map(id=>songById(id)).filter(Boolean);
  const cells = [0,1,2,3].map(i=>{
    const s = covers[i];
    if(s && s.cover) return `<div class="cell" style="background-image:url('${s.cover}')"></div>`;
    const [a,b] = gradFor(s ? s.id : p.id+i);
    return `<div class="cell" style="background:linear-gradient(135deg,${a},${b})"></div>`;
  }).join('');
  return `<button class="pl-card" onclick="openPlaylist('${p.id}')">
    <div class="pl-collage">${cells}</div>
    <div class="t">${escapeHtml(p.name)}</div>
    <div class="c">${p.songIds.length} song${p.songIds.length===1?'':'s'}</div>
  </button>`;
}

function renderSongRow(s, queueIds){
  return `<div class="song-row">
    <button class="cover" style="width:50px;height:50px;padding:0" onclick='playFromList("${s.id}", ${JSON.stringify(queueIds)})'>${coverStyle(s)}</button>
    <button class="meta" style="text-align:left" onclick="playFromList('${s.id}', ${JSON.stringify(queueIds)})">
      <div class="t">${escapeHtml(s.title)}</div>
      <div class="a">${escapeHtml(s.artist)}</div>
    </button>
    <span class="dur">${s.duration?fmtTime(s.duration):''}</span>
    <button class="opt" onclick="openOptions('${s.id}')">${ic.dots}</button>
  </div>`;
}

function sortedSongs(list){
  const arr=[...list];
  if(state.sortMode==='title') arr.sort((a,b)=>a.title.localeCompare(b.title));
  else if(state.sortMode==='artist') arr.sort((a,b)=>a.artist.localeCompare(b.artist));
  else arr.sort((a,b)=>b.addedAt-a.addedAt);
  return arr;
}
function sortLabel(){ return state.sortMode==='title'?'Title A–Z':state.sortMode==='artist'?'Artist A–Z':'Recently added'; }
function cycleSort(){
  state.sortMode = state.sortMode==='recent' ? 'title' : state.sortMode==='title' ? 'artist' : 'recent';
  render();
}

function renderPlaylists(){
  return `
    <div class="topbar"><div class="brand">${ic.loop}<span class="brand-name">Loop</span></div>
      <div class="topbar-actions"><button class="round-btn" onclick="openCreatePlaylist()">${ic.plus()}</button></div></div>
    <div class="greeting"><h1>Playlists</h1><p>${state.playlists.length} playlist${state.playlists.length===1?'':'s'}</p></div>
    ${state.playlists.length===0 ? `
      <div class="empty-state">No playlists yet. Group your songs into a playlist to play them together.
        <div><button onclick="openCreatePlaylist()">Create a playlist</button></div>
      </div>
    ` : `
      <div class="song-list" style="padding-top:10px">
        ${state.playlists.map(p=>`
          <div class="song-row">
            <button class="cover" style="width:50px;height:50px;padding:0" onclick="openPlaylist('${p.id}')">
              <div class="pl-collage" style="height:50px;border-radius:12px">${(()=>{
                const covers = p.songIds.slice(0,4).map(id=>songById(id)).filter(Boolean);
                return [0,1,2,3].map(i=>{
                  const s=covers[i];
                  if(s && s.cover) return `<div class="cell" style="background-image:url('${s.cover}')"></div>`;
                  const [a,b]=gradFor(s?s.id:p.id+i);
                  return `<div class="cell" style="background:linear-gradient(135deg,${a},${b})"></div>`;
                }).join('');
              })()}</div>
            </button>
            <button class="meta" style="text-align:left" onclick="openPlaylist('${p.id}')">
              <div class="t">${escapeHtml(p.name)}</div>
              <div class="a">${p.songIds.length} song${p.songIds.length===1?'':'s'}</div>
            </button>
          </div>`).join('')}
      </div>
    `}
  `;
}

function renderPlaylistDetail(){
  const p = state.playlists.find(x=>x.id===state.activePlaylistId);
  if(!p){ state.screen='playlists'; return renderPlaylists(); }
  const songs = p.songIds.map(id=>songById(id)).filter(Boolean);
  return `
    <div class="topbar">
      <button class="round-btn" onclick="goLibrary()">${ic.back}</button>
      <span style="font-weight:700">${escapeHtml(p.name)}</span>
      <button class="round-btn" onclick="renamePlaylist('${p.id}')">${ic.pencil}</button>
    </div>
    <div class="greeting"><p>${songs.length} song${songs.length===1?'':'s'}</p></div>
    ${songs.length ? `<div class="section" style="padding-top:6px">
      <button class="btn primary" style="width:100%" onclick='playFromList("${songs[0].id}", ${JSON.stringify(songs.map(s=>s.id))})'>${ic.play('#FFFDF5',16)} Play all</button>
    </div>` : ''}
    ${songs.length===0 ? `
      <div class="empty-state">No songs in this playlist yet. Open a song's ⋯ menu from your library and choose "Add to playlist".</div>
    ` : `
      <div class="song-list" style="padding-top:6px">
        ${songs.map((s,i)=>`
          <div class="song-row">
            <button class="cover" style="width:50px;height:50px;padding:0" onclick="playFromList('${JSON.stringify(songs.map(x=>x.id))})">${coverStyle(s)}</button>
            <button class="cover" style="width:50px;height:50px;padding:0" onclick='playFromList("${s.id}", ${JSON.stringify(songs.map(x=>x.id))})'>${coverStyle(s)}</button>
<button class="meta" style="text-align:left" onclick='playFromList("${s.id}", ${JSON.stringify(songs.map(x=>x.id))})'>

              <div class="t">${escapeHtml(s.title)}</div><div class="a">${escapeHtml(s.artist)}</div>
            </button>
            <div style="display:flex;flex-direction:column">
              <button class="opt" style="width:22px;height:16px" onclick="moveInPlaylist('${p.id}','${s.id}',-1)" ${i===0?'disabled style="opacity:.3"':''}>${ic.chevUp}</button>
              <button class="opt" style="width:22px;height:16px" onclick="moveInPlaylist('${p.id}','${s.id}',1)" ${i===songs.length-1?'disabled style="opacity:.3"':''}>${ic.chevDown}</button>
            </div>
            <button class="opt" onclick="removeFromPlaylist('${p.id}','${s.id}')">${ic.x}</button>
          </div>`).join('')}
      </div>
    `}
  `;
}

function renderSearch(){
  const q = state.search.trim().toLowerCase();
  const results = q ? state.songs.filter(s => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)) : [];
  return `
    <div class="topbar"><div class="brand">${ic.loop}<span class="brand-name">Loop</span></div></div>
    <div class="search-input-wrap">
      <input class="search-input" placeholder="Search your songs…" value="${escapeAttr(state.search)}" oninput="onSearchInput(this.value)" autofocus>
    </div>
    ${q==='' ? `<div class="empty-state">Search by song title or artist.</div>` :
      results.length===0 ? `<div class="empty-state">No songs match "${escapeHtml(state.search)}".</div>` :
      `<div class="song-list" style="padding-top:6px">${results.map(s=>renderSongRow(s, results.map(x=>x.id))).join('')}</div>`}
  `;
}

function renderMiniPlayer(){
  if(state.currentIndex<0 || state.nowPlayingOpen) return '';
  const s = songById(state.queue[state.currentIndex]);
  if(!s) return '';
  return `<div class="mini-player" onclick="openNowPlaying(event)">
    <div class="cover" style="width:38px;height:38px;padding:0">${coverStyle(s)}</div>
    <div class="meta"><div class="t">${escapeHtml(s.title)}</div><div class="a">${escapeHtml(s.artist)}</div></div>
    <button class="ctrl" onclick="event.stopPropagation();togglePlay()">${state.isPlaying?ic.pause('#FFFDF5',20):ic.play('#FFFDF5',20)}</button>
    <button class="ctrl" onclick="event.stopPropagation();nextTrack()">${ic.next('#FFFDF5')}</button>
  </div>`;
}

function renderBottomNav(){
  return `<div class="bottomnav">
    <button class="nav-btn ${state.screen==='library'?'active':''}" onclick="goLibrary()">${ic.home(state.screen==='library')}<span>Library</span></button>
    <button class="nav-fab" onclick="goSearch()">${ic.search()}</button>
    <button class="nav-btn ${state.screen==='playlists'||state.screen==='playlistDetail'?'active':''}" onclick="goPlaylists()">${ic.layers(state.screen==='playlists'||state.screen==='playlistDetail')}<span>Playlists</span></button>
  </div>`;
}

function renderNowPlaying(){
  const s = songById(state.queue[state.currentIndex]);
  if(!s) return '';
  const hasFile = !!sessionFiles[s.id];
  const repeatColor = state.repeatMode==='off' ? '#7C8AA6' : '#364C84';
  return `<div class="np-screen">
    <div class="np-top">
      <button class="round-btn" onclick="closeNowPlaying()">${ic.back}</button>
      <span class="title">Listening now</span>
      <button class="round-btn" onclick="openOptions('${s.id}')">${ic.dots}</button>
    </div>
    <div class="np-art-wrap"><div class="np-art">${coverStyle(s)}</div></div>
    <div class="np-info"><div class="t">${escapeHtml(s.title)}</div><div class="a">${escapeHtml(s.artist)}</div></div>

    <div class="np-icon-row">
      <button onclick="shareSong('${s.id}')">${ic.share()}<span>Share</span></button>
      <button onclick="openAddToPlaylist('${s.id}')">${ic.addToList()}<span>Playlist</span></button>
    </div>

    ${!hasFile ? `<div class="relink-note">This song's audio isn't loaded this session. <button onclick="relinkSong('${s.id}')">Locate the file</button> to play it.</div>` : ''}

    <div class="np-progress">
      <input type="range" id="npProgress" min="0" max="${state.duration||0}" step="0.1" value="${state.currentTime||0}">
      <div class="np-times"><span>${fmtTime(state.currentTime)}</span><span>${fmtTime(state.duration)}</span></div>
    </div>

    <div class="np-controls">
      <button class="np-side-btn ${state.shuffle?'on':''}" onclick="toggleShuffle()">${ic.shuffle(state.shuffle?'#364C84':'#7C8AA6')}</button>
      <button onclick="prevTrack()">${ic.prev()}</button>
      <button class="play-big" onclick="togglePlay()">${state.isPlaying?ic.pause('#FFFDF5',26):ic.play('#FFFDF5',26)}</button>
      <button onclick="nextTrack()">${ic.next()}</button>
      <button class="np-side-btn ${state.repeatMode!=='off'?'on':''}" onclick="cycleRepeat()">${ic.repeat(repeatColor)}${state.repeatMode==='one'?'<span class="badge">1</span>':''}</button>
    </div>

    <div class="np-queue">
      <div class="section-head"><h2>Up next</h2></div>
      ${state.queue.slice(state.currentIndex+1, state.currentIndex+6).map(id=>{
        const qs = songById(id); if(!qs) return '';
        return `<div class="song-row"><div class="cover" style="width:44px;height:44px;padding:0">${coverStyle(qs)}</div>
          <div class="meta"><div class="t">${escapeHtml(qs.title)}</div><div class="a">${escapeHtml(qs.artist)}</div></div></div>`;
      }).join('') || '<div style="color:var(--navy-dim);font-size:13px;padding:8px 0">End of queue.</div>'}
    </div>
  </div>`;
}

function renderModal(){
  const m = state.modal;
  if(m.type==='edit') return renderEditModal(m.songId);
  if(m.type==='options') return renderOptionsModal(m.songId);
  if(m.type==='addToPlaylist') return renderAddToPlaylistModal(m.songId);
  if(m.type==='createPlaylist') return renderCreatePlaylistModal();
  return '';
}

function renderEditModal(id){
  const s = songById(id);
  return `<div class="overlay" onclick="closeModalBg(event)"><div class="sheet" onclick="event.stopPropagation()">
    <div class="sheet-head"><h3>Edit song</h3><button onclick="closeModal()">${ic.x}</button></div>
    <div class="field"><label>Cover</label>
      <div class="cover-picker">
        <div class="cover" style="width:64px;height:64px;padding:0">${coverStyle(s)}</div>
        <button onclick="triggerCoverPick('${id}')">${ic.camera} Change cover</button>
      </div>
    </div>
    <div class="field"><label>Title</label><input type="text" id="editTitle" value="${escapeAttr(s.title)}"></div>
    <div class="field"><label>Artist</label><input type="text" id="editArtist" value="${escapeAttr(s.artist)}"></div>
    <div class="sheet-actions">
      <button class="btn ghost" onclick="closeModal()">Cancel</button>
      <button class="btn primary" onclick="saveEdit('${id}')">Save</button>
    </div>
  </div></div>`;
}

function renderOptionsModal(id){
  const s = songById(id);
  return `<div class="overlay" onclick="closeModalBg(event)"><div class="sheet" onclick="event.stopPropagation()">
    <div class="sheet-head"><h3>${escapeHtml(s.title)}</h3><button onclick="closeModal()">${ic.x}</button></div>
    <button class="option-row" style="width:100%" onclick="openEdit('${id}')">${ic.pencil} Edit title, artist & cover</button>
    <button class="option-row" style="width:100%" onclick="openAddToPlaylist('${id}')">${ic.addToList()} Add to playlist</button>
    <button class="option-row" style="width:100%" onclick="shareSong('${id}')">${ic.share()} Share</button>
    <button class="option-row danger" style="width:100%" onclick="deleteSong('${id}')">${ic.trash} Remove from library</button>
  </div></div>`;
}

function renderAddToPlaylistModal(id){
  return `<div class="overlay" onclick="closeModalBg(event)"><div class="sheet" onclick="event.stopPropagation()">
    <div class="sheet-head"><h3>Add to playlist</h3><button onclick="closeModal()">${ic.x}</button></div>
    <button class="option-row" style="width:100%;color:var(--navy)" onclick="openCreatePlaylist('${id}')">${ic.plus()} New playlist</button>
    ${state.playlists.map(p=>{
      const checked = p.songIds.includes(id);
      return `<button class="pl-check-row" style="width:100%" onclick="togglePlaylistMembership('${p.id}','${id}')">
        <span class="checkbox ${checked?'checked':''}">${checked?'✓':''}</span>
        <span class="name">${escapeHtml(p.name)}</span>
      </button>`;
    }).join('') || `<div style="color:var(--navy-dim);font-size:13px;padding:10px 2px">No playlists yet — create one above.</div>`}
  </div></div>`;
}

function renderCreatePlaylistModal(){
  return `<div class="overlay" onclick="closeModalBg(event)"><div class="sheet" onclick="event.stopPropagation()">
    <div class="sheet-head"><h3>New playlist</h3><button onclick="closeModal()">${ic.x}</button></div>
    <div class="field"><label>Name</label><input type="text" id="newPlName" placeholder="e.g. Morning drive" autofocus></div>
    <div class="sheet-actions">
      <button class="btn ghost" onclick="closeModal()">Cancel</button>
      <button class="btn primary" onclick="confirmCreatePlaylist()">Create</button>
    </div>
  </div></div>`;
}

/* ---------------- navigation ---------------- */
function goLibrary(){ state.screen='library'; state.activePlaylistId=null; render(); }
function goPlaylists(){ state.screen='playlists'; render(); }
function goSearch(){ state.screen='search'; render(); }
function openPlaylist(id){ state.activePlaylistId=id; state.screen='playlistDetail'; render(); }
function dismissTip(){ state.tipDismissed=true; render(); }
function onSearchInput(v){ state.search=v; render(); const el=document.querySelector('.search-input'); if(el){el.focus(); el.setSelectionRange(v.length,v.length);} }

function closeModal(){ state.modal=null; render(); }
function closeModalBg(e){ if(e.target.classList.contains('overlay')) closeModal(); }
function openOptions(id){ state.modal={type:'options', songId:id}; render(); }
function openEdit(id){ state.modal={type:'edit', songId:id}; render(); }
function openAddToPlaylist(id){ state.modal={type:'addToPlaylist', songId:id}; render(); }
function openCreatePlaylist(pendingSongId){ state.modal={type:'createPlaylist', pendingSongId:pendingSongId||null}; render(); }

/* ---------------- library actions ---------------- */
function triggerAdd(){ document.getElementById('fileInput').click(); }
document.getElementById('fileInput').addEventListener('change', async (e)=>{
  const files = Array.from(e.target.files || []);
  let count=0;
  for(const file of files){
    const id = uid();
    sessionFiles[id] = file;
    saveAudio(id, file); // Saves it permanently to the database
    const rawName = file.name.replace(/\.[^/.]+$/, '');
    const title = rawName.replace(/[_\-]+/g,' ').replace(/\s+/g,' ').trim() || 'Untitled';
    const song = {id, title: title.charAt(0).toUpperCase()+title.slice(1), artist:'Unknown artist', cover:null, fileName:file.name, duration:null, addedAt:Date.now()+count};
    state.songs.push(song);
    count++;
    getDuration(file, id);
  }
  await saveData();
  e.target.value = '';
  toast(`Added ${count} song${count===1?'':'s'}`);
  render();
});
function getDuration(file, id){
  const tmp = document.createElement('audio');
  tmp.preload='metadata';
  tmp.src = URL.createObjectURL(file);
  tmp.onloadedmetadata = ()=>{
    const s = songById(id);
    if(s){ s.duration = tmp.duration; saveData(); if(state.screen==='library') render(); }
    URL.revokeObjectURL(tmp.src);
  };
}

let coverTargetId=null;
function triggerCoverPick(id){ coverTargetId=id; document.getElementById('coverInput').click(); }
document.getElementById('coverInput').addEventListener('change', (e)=>{
  const file = e.target.files[0];
  if(!file || !coverTargetId) return;
  const reader = new FileReader();
  reader.onload = (ev)=>{
    const img = new Image();
    img.onload = ()=>{
      const size=400;
      const canvas = document.createElement('canvas');
      canvas.width=size; canvas.height=size;
      const ctx = canvas.getContext('2d');
      const side = Math.min(img.width, img.height);
      ctx.drawImage(img, (img.width-side)/2, (img.height-side)/2, side, side, 0, 0, size, size);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      const s = songById(coverTargetId);
      if(s){ s.cover = dataUrl; saveData(); render(); }
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
  e.target.value='';
});

function saveEdit(id){
  const s = songById(id);
  const title = document.getElementById('editTitle').value.trim();
  const artist = document.getElementById('editArtist').value.trim();
  if(s){ s.title = title || s.title; s.artist = artist || 'Unknown artist'; }
  saveData();
  state.modal=null;
  render();
}

function deleteSong(id){
  state.songs = state.songs.filter(s=>s.id!==id);
  state.playlists.forEach(p => p.songIds = p.songIds.filter(sid=>sid!==id));
  delete sessionFiles[id];
  saveData();
  state.modal=null;
  render();
}

/* ---------------- playlists ---------------- */
function confirmCreatePlaylist(){
  const name = document.getElementById('newPlName').value.trim();
  if(!name) return;
  const p = {id:uid(), name, songIds:[]};
  const pending = state.modal.pendingSongId;
  if(pending) p.songIds.push(pending);
  state.playlists.push(p);
  saveData();
  state.modal = pending ? {type:'addToPlaylist', songId:pending} : null;
  render();
  toast('Playlist created');
}
function togglePlaylistMembership(plId, songId){
  const p = state.playlists.find(x=>x.id===plId);
  if(!p) return;
  if(p.songIds.includes(songId)) p.songIds = p.songIds.filter(id=>id!==songId);
  else p.songIds.push(songId);
  saveData();
  render();
}
function renamePlaylist(id){
  const p = state.playlists.find(x=>x.id===id);
  const name = window.prompt('Rename playlist', p.name);
  if(name && name.trim()){ p.name = name.trim(); saveData(); render(); }
}
function removeFromPlaylist(plId, songId){
  const p = state.playlists.find(x=>x.id===plId);
  p.songIds = p.songIds.filter(id=>id!==songId);
  saveData();
  render();
}
function moveInPlaylist(plId, songId, dir){
  const p = state.playlists.find(x=>x.id===plId);
  const i = p.songIds.indexOf(songId);
  const j = i+dir;
  if(j<0 || j>=p.songIds.length) return;
  [p.songIds[i], p.songIds[j]] = [p.songIds[j], p.songIds[i]];
  saveData();
  render();
}

/* ---------------- playback engine ---------------- */
function playFromList(songId, queueIds){
  state.queue = queueIds;
  state.currentIndex = queueIds.indexOf(songId);
  loadAndPlay();
}
async function loadAndPlay(){
  const s = songById(state.queue[state.currentIndex]);
  if(!s) return;
  
  let file = sessionFiles[s.id];
  // If it's not in temporary memory, pull it from the database!
  if(!file) {
    file = await getAudio(s.id);
    if(file) sessionFiles[s.id] = file; 
  }
  
  if(!file){
    state.isPlaying=false;
    state.nowPlayingOpen=true;
    render();
    return;
  }
  audioEl.src = URL.createObjectURL(file);
  audioEl.play().then(()=>{ state.isPlaying=true; render(); }).catch(()=>{ state.isPlaying=false; render(); });
  updateMediaSession(s);
}
function togglePlay(){
  if(state.currentIndex<0) return;
  const s = songById(state.queue[state.currentIndex]);
  if(!sessionFiles[s.id]){ relinkSong(s.id); return; }
  if(!audioEl.src){ loadAndPlay(); return; }
  if(state.isPlaying){ audioEl.pause(); state.isPlaying=false; }
  else { audioEl.play(); state.isPlaying=true; }
  render();
}
function nextTrack(){
  if(state.queue.length===0) return;
  if(state.shuffle){
    let idx = Math.floor(Math.random()*state.queue.length);
    if(state.queue.length>1) while(idx===state.currentIndex) idx = Math.floor(Math.random()*state.queue.length);
    state.currentIndex = idx;
  } else {
    state.currentIndex += 1;
    if(state.currentIndex >= state.queue.length){
      if(state.repeatMode==='all') state.currentIndex = 0;
      else { state.currentIndex = state.queue.length-1; state.isPlaying=false; render(); return; }
    }
  }
  loadAndPlay();
}
function prevTrack(){
  if(state.queue.length===0) return;
  if(audioEl.currentTime > 3){ audioEl.currentTime = 0; return; }
  state.currentIndex = (state.currentIndex-1+state.queue.length) % state.queue.length;
  loadAndPlay();
}
function toggleShuffle(){ state.shuffle = !state.shuffle; render(); }
function cycleRepeat(){
  state.repeatMode = state.repeatMode==='off' ? 'all' : state.repeatMode==='all' ? 'one' : 'off';
  render();
}
audioEl.addEventListener('timeupdate', ()=>{
  state.currentTime = audioEl.currentTime;
  state.duration = audioEl.duration || 0;
  if(state.nowPlayingOpen){
    const p = document.getElementById('npProgress');
    const times = document.querySelector('.np-times');
    if(p && document.activeElement !== p){ p.max = state.duration||0; p.value = state.currentTime; }
    if(times) times.innerHTML = `<span>${fmtTime(state.currentTime)}</span><span>${fmtTime(state.duration)}</span>`;
  }
});
audioEl.addEventListener('ended', ()=>{
  if(state.repeatMode==='one'){ audioEl.currentTime=0; audioEl.play(); return; }
  nextTrack();
});
function onSeekInput(e){
  audioEl.currentTime = parseFloat(e.target.value);
}

function openNowPlaying(e){ if(e) e.stopPropagation(); state.nowPlayingOpen=true; render(); }
function closeNowPlaying(){ state.nowPlayingOpen=false; render(); }

function relinkSong(id){
  state.relinkFor = id;
  document.getElementById('relinkInput').click();
}
document.getElementById('relinkInput').addEventListener('change', (e)=>{
  const file = e.target.files[0];
  if(file && state.relinkFor){
    sessionFiles[state.relinkFor] = file;
    saveAudio(state.relinkFor, file);       // <--- Add this new line here too!
    const s = songById(state.relinkFor);
    if(s && !s.duration) getDuration(file, s.id);
    if(state.currentIndex>=0 && state.queue[state.currentIndex]===state.relinkFor) loadAndPlay();
    toast('File linked — ready to play');
  }
  e.target.value='';
  state.relinkFor=null;
  render();
});

function updateMediaSession(song){
  if(!('mediaSession' in navigator)) return;
  navigator.mediaSession.metadata = new MediaMetadata({
    title: song.title, artist: song.artist, album:'Loop',
    artwork: song.cover ? [{src:song.cover, sizes:'400x400', type:'image/jpeg'}] : []
  });
  navigator.mediaSession.setActionHandler('play', ()=>{ audioEl.play(); state.isPlaying=true; render(); });
  navigator.mediaSession.setActionHandler('pause', ()=>{ audioEl.pause(); state.isPlaying=false; render(); });
  navigator.mediaSession.setActionHandler('previoustrack', prevTrack);
  navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
}

/* ---------------- share ---------------- */
async function shareSong(id){
  const s = songById(id);
  const file = sessionFiles[id];
  try{
    if(file && navigator.canShare && navigator.canShare({files:[file]})){
      await navigator.share({files:[file], title:s.title, text:`${s.title} — ${s.artist}`});
    } else if(navigator.share){
      await navigator.share({title:s.title, text:`Listening to ${s.title} — ${s.artist} on Loop`});
    } else if(navigator.clipboard){
      await navigator.clipboard.writeText(`${s.title} — ${s.artist}`);
      toast('Sharing files isn\'t supported here — copied song info instead');
    }
  }catch(e){ /* cancelled */ }
  state.modal=null;
  render();
}

/* ---------------- utils ---------------- */
function escapeHtml(str){ const d=document.createElement('div'); d.textContent = str==null?'':String(str); return d.innerHTML; }
function escapeAttr(str){ return escapeHtml(str).replace(/"/g,'&quot;'); }

(async function init(){
  await loadData();
  render();
})();
  // Turn on Offline Mode
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}
</script>
</body>
</html>
