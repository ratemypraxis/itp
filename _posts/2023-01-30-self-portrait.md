---
layout: post
title: Web Self-Portrait [Live Web]
description: 
summary: 
tags: live-web 
---
Self-Portrait made using HTML, CSS and javaScript

Run my piece locally by downloading and unzipping this <a href="selfPortrait.zip">compressed folder</a> then doubl-click the index.html file.

 ![](https://raw.githubusercontent.com/ratemypraxis/itp/master/_posts/selfportrait.PNG)
 
Code:
```html
<!DOCTYPE html>
    <head>
        <title>
            Sim's Desk
        </title>
        <style>
            #intro{
                background-color: rgb(170, 187, 238);
            }

            .bg {
        position: absolute;
        top: 100;
        left: 5;
        z-index: 1;
      }

      .desk {
        position: absolute;
        top: 100;
        left: 5;
        z-index: 2;
      }
      .anims {
        position: absolute;
        top: 70;
        left: 5;
        z-index: 3;
      }
        </style>
    </head>
    <body>        

        <div id="intro">
          <h3>Live Web Wk 1: Sim's Self-Portrait</h3>
        <p>I think a person's desk can tell alot about how they spend their time and what they are interested in. 
        Feel free to learn a little bit about me by navigating my desk using the buttons below. This page is in progress 
      so for now you must hit the refresh button to reload the page between viewing the items on my desk. </p>
        <p>
          <button type="button" onclick="keyAnim()">keyboard</button>
          <button type="button" onclick="mouseAnim()">mouse</button>
          <button type="button" onclick="speakerAnim()">speaker</button>
          <button onClick="window.location.reload();">refresh</button>
        </p>
        </div>

        <div id="base">
            <img class="desk" src="desk.png" alt="" width="960" height="540"> 
            <img class="bg" src="bg.png" alt="" width="960" height="540"> 
        </div>

        <div id="keyboard">
        <video class="anims" id="keyboardVid" width="960" height="540">
            <source src="keyboardAnim.mp4" type="video/mp4">
            Your browser does not support HTML5 video.
          </video>
        </div>


        <div id="speaker">
            <video class="anims" id="speakerVid" width="960" height="540">
              <source src="speakerAnim.mp4" type="video/mp4">
              Your browser does not support HTML5 video.
            </video>
          </div>

          <div id="mouse">
              <video class="anims" id="mouseVid" width="960" height="540">
                <source src="mouseAnimation.mp4" type="video/mp4">
                Your browser does not support HTML5 video.
              </video>
            </div>

            <script>
               var keyA = document.getElementById("keyboardVid")
               var mouseA = document.getElementById("mouseVid")
               var speakerA = document.getElementById("speakerVid")


                //asks the html to load before running script via a load event and an anon inline function
                window.addEventListener('load', function(){
          
        
               let key = document.getElementById('keyboard');
               key.style.display = "none";

               let speak = document.getElementById('speaker');
               speak.style.display = "none";

               let mou = document.getElementById('mouse');
               mou.style.display = "none";
               

              })

                function keyAnim() {
                  var keyA = document.getElementById("keyboardVid")

                  let key = document.getElementById('keyboard');

                  key.style.display = "block";
                  keyA.play();
                }

                function speakerAnim() {
                  var speakerA = document.getElementById("speakerVid")

                  let speak = document.getElementById('speaker');

                  speak.style.display = "block";
                  speakerA.play();
                }

                function mouseAnim() {
                  var mouseA = document.getElementById("mouseVid")

                  let mou = document.getElementById('mouse');

                  mou.style.display = "block";
                  mouseA.play();
                }

                //changes background color of divs div on click
                // window.addEventListener('click', function(){
                // doIt.style.backgroundColor="aquamarine"
                // })
            
            </script>
</html>
```



