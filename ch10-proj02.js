

document.addEventListener("DOMContentLoaded", function () {


   const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';

   /*
     To get a specific play, add play name via query string, 
      e.g., url = url + '?name=hamlet';
    
    https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
    https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
     
   */


   /* note: you may get a CORS error if you test this locally (i.e., directly from a
      local file). To work correctly, this needs to be tested on a local web server.  
      Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
      use built-in Live Preview.
   */
      Apicall()

      
   const Apicall = async () => {
      const apiEndpoint = `https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet`;
      fetch(apiEndpoint, {
         method: 'GET', mode: "cors", // no-cors, *cors, same-origin
         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
         credentials: "same-origin", // include, *same-origin, omit
         headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
         },
      })

         .then(response => {
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
         })
         .then(data => {
            // Handle the API response data
            console.log(data);
         })
         .catch(error => {
            // Handle errors
            console.error('Error:', error);
         });
   }

   const Playlist = document.getElementById('playlist');
   const Acterlist = document.getElementById('actList');
   const Scenelist = document.getElementById('sceneList');
   const Playerlist = document.getElementById('playerList');
   const Playtitle = document.getElementById('h2');
   const Actname = document.getElementById('h3');
   const Scenehere = document.getElementById('sceneHere');
   const BtnHighlight = document.getElementById('btnHighlight');
   const TxtHeighlight = document.getElementById('txtHighlight');

   Scenehere.innerHTML = "";

   function LoadScene(text, speaker, scene) {
      if (scene) {
         let speeches = scene.speeches;
         if (speaker && speaker != 0) {
            speeches = speeches.filter(i => i.speaker == speaker);
         }

         let Regx;
         if (text && text.trim()) {
            Regx = new RegExp(text, 'gi');
         }

         let HtmlSpeeches = "";
         speeches.forEach(element => {
            let lines = "";
            element.lines.forEach(line => {
               if (re) {
                  line = line.replace(re, '<b>$&</b>');
               }
               lines += `<p>${line}</p>`;
            });

            HtmlSpeeches += `<div class="speech">
               <span>${element.speaker}</span>
            </div>`;
         });

         Scenehere.innerHTML = `
         <h4>${scene.name}</h4>
         <p class ="title">${scene.title}</p>
         <p class="direction"> ${scene.stageDireaction}</p>
         ${HtmlSpeeches}
         `;
      }
      else {
         scene.innerHTML = "";
      }
   }

   Playerlist.addEventListener('change', () => {
      const playVal = Playlist.value;
      if (playVal && Playlist.length > 0) {

         var  Api = `${url}?name=${playVal}`;

         fetch(Api)
         .then(response => response.json())
         .then(data => {
            const play = new Play(data.title, data.short, data.persona, data.acts);

            Playtitle.innerHTML =play.title;

            const acts =play.acts;
            Acterlist.innerHTML = "";
            acts.forEach(i => {
               let act =new Act(i.name,i.scenes);
               Acterlist.innerHTML = `<option value ="${act.name}">${act.name}</opttion>`;
            })

            const persona =play.persona;
            Playerlist.innerHTML ="<option value=0>All Players</option>";
            persona.forEach(i =>{
               Playerlist.innerHTML += `<option value="${i.player}">${i.player}</option>`;
            });

            Playerlist.selectedIndex = 0;

            Acterlist.onchange = ()=>{
               let act = acts.find(a =>a.name == Acterlist.value);
               let actObj = new act(acts.name,act.scenes);

               Actname.innerHTML = actObj.name;

               let scenes =actObj.scenes;
               scenes.forEach(s=> {
                  const scene =new Scene(s.name,s.title,s.stageDireaction,s,speeches);
                  Scenelist.innerHTML += `<option value="${scene.name}">${scene.name}</option>`;
               });

               Scenelist.onchange = ()=>{
                  let scene = scenes.finf(s =>s.name == Scenelist.value);
                  const sceneObj = new Scene(scene.name,scene,title,scene,stageDireaction,scene.speeches);
                  LoadScene(sceneObj);

                  BtnHighlight.onclick = ( )=> {
                     let player =Playerlist.value;
                     let text = TxtHeighlight.value.trim();
                     LoadScene(sceneObj,player,text);
                  }
               }

               Scenelist.selectedIndex = 0 ;
               Scenelist.onchange();
            }
            Acterlist.selectedIndex =0;
            Acterlist.onchange();
         })
      }
      else{

         Playerlist.innerHTML ="Play title here";
         Acterlist.innerHTML = 'Act name here';
         LoadScene(null);

         Acterlist.innerHTML = "";
         Scenelist.innerHTML = "";
         Playerlist.innerHTML = "";

         Acterlist.onchange =null;
         Scenelist.onchange =null;
         BtnHighlight.onclick =null;
      }
   },false)
});