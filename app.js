





window.onscroll = function() {scrollFunction()};



      function scrollFunction() {
          var navbar = document.getElementById("navbar");
          if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
              navbar.style.boxShadow = "0 0 10px #888888";
          } else {
              navbar.style.boxShadow = "";
          }
      }
      function generateHtml() {
        console.log("Starting generateHtml() function");
      
        fetch('/x.json')
          .then((response) => response.json())
          .then((D) => {
            console.log("Got data from x.json:", D);
            var data =JSON.parse(D)
      
            if (data.hasOwnProperty("mainTitle")) {
              const cont = document.createElement("notes-ai");
              const line = document.createElement("div");
              line.classList.add("line");
      
              const title = document.createElement("div");
              title.classList.add("h2-main-title");
              title.innerHTML = data.mainTitle;
      
              const parentElement = document.querySelector("#notes-ai");
              if (document.readyState === 'complete') {
                cont.appendChild(line);
                cont.appendChild(title);
                parentElement.appendChild(cont);
              } else {
                document.addEventListener('DOMContentLoaded', function() {
                  cont.appendChild(line);
                  cont.appendChild(title);
                  parentElement.appendChild(cont);
                });
              }
      
              const arr = [];
              arr.push(data);
              createContNMainTitle(data);
            } else {
              console.error('Error: mainTitle property not found in x.json');
            }
          });
      
        console.log("Finished generateHtml() function");
      }

      function createContNMainTitle(data){

            for (var subTitle in data.subTitles) {
          
              // Create the container element and add the appropriate class
              const container = document.createElement("div");
              container.classList.add("note-cont");
          
              // Create the header element and add the appropriate classes and content
              const header = document.createElement("div");
              header.classList.add("note-header");
              const headerContent = `
              <div style="display: flex; align-items: center;">
                <h4 style="margin-right: 5px;">Flash Card?</h4>
                <label class="switch">
                  <input type="checkbox" value="checked" name="flash">
                  <span class="slider round"></span>
                </label>
              </div>
              <h3 id="h3-sub-title">`+subTitle+`</h3>
              <button class="sound-img"onclick=audio()><img src="images/icons8-speaker-64 (1) 1.png" alt=""></button>
              `;
              header.innerHTML = headerContent;
          
              // Create the content element and add the appropriate class
              const content = document.createElement("div");
              content.classList.add("note");
          
              // Loop through the notes for the current subtitle and create a paragraph element for each note
              for (var index in data.subTitles[subTitle]) {
                const note = document.createElement("p");
                note.textContent = index + ": " + data.subTitles[subTitle][index]+".";
                content.appendChild(note);
              }
          
              // Append the header and content elements to the container element
              container.appendChild(header);
              container.appendChild(content);
          
              // Append the container element to the parent element in the HTML document
              const parentElement = document.querySelector("#notes-ai");
              parentElement.appendChild(container);
            }
          }
          // function audio(){
          //   const audio = new Audio("output.mp3");
          //     audio.play();
          // }