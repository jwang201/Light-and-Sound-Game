# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's FTL Program. 

Submitted by: Jonathan Wang

Time spent: **5** hours spent in total

Link to project code: https://glitch.com/edit/#!/pickle-substantial-mapusaurus

Link to project website: https://pickle-substantial-mapusaurus.glitch.me

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] List anything else that you can get done to improve the app!
- [x] When the player wins or loses, a respective audio file will play
- [x] The current score and max score of the player is recorded 
- [x] The number of attempts the player has left is kept track of and displayed

## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:
[Winning the Game](http://g.recordit.co/QV1693y6vo.gif)
<img src = "http://g.recordit.co/QV1693y6vo.gif"><br>
[Losing the Game](http://g.recordit.co/7dodqjqIfW.gif)
<img src = "http://g.recordit.co/7dodqjqIfW.gif"><br>
[Gameplay](http://g.recordit.co/3N3H8WMc2t.gif)
<img src = "http://g.recordit.co/3N3H8WMc2t.gif"><br>
[Start/Stop Button & Current Score Updating](http://g.recordit.co/270nzvFPWw.gif)
<img src = "http://g.recordit.co/270nzvFPWw.gif"><br>

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

I used the website provided (https://courses.codepath.org/snippets/summer_internship_for_tech_excellence/prework#heading-optional-features-1) as a tutorial to learn the basics. I also used the w3schools'
documentations. When I ran into problems, I searched on stackoverflow for some details in this project. I also searched for a frequency chart for musical notes and the CSS color chart. Lastly, I used the programminghead link provided to help me add in audio files.


2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

The biggest challenge I faced while doing this project was the addition of audio files for player wins or losses. At first, I created global variables for my audio files by using new Audio(). However, this would not produce any sounds in my project. I thought that there was a bug in my code and that I misplaced some of the functions. As a result, I spent a few hours combing through my code step by step using consol.log() to debug. I found multiple other unrelated issues, all of which I tackled to polish my code. Unfortunately, I still was unable to find a solution to the missing audio file. If there were no problems with my functions, I inferred that the problem must lie in the pathway. I discovered that my code was calling new Audio() incorrectly, so I went to w3schools and referenced their page documenting audio objects. Their first method that was shown simply accessed an audio element by id. I was still unsure about how to add the audio files to the HTML file so I accessed the programminghead.com link provided, and started tinkering with my code. After adding <audio src="audio.mp3" id="myAudio"></audio> into my HTML file with the respective audio files, I started editing my functions to match this change. 

Maybe it was due to the specific formatting of my code, but no matter how I changed my functions, I was still unable to produce any sounds from my audio files–even though the mp3 files were all in the assets folder. Feeling a bit stuck, I returned to programminghead.com and scrolled further down. I noticed that the last example simply set src to equal a link. Intrigued, I searched my assets folder and found out that a link could be generated easily. After this discovery, I was able to modify my HTML file. This small fix was the solution. Although this solution was simple, it was quick and effective, and through the process of finding it, I was able to learn a lot more about the interactions between the HTML, the JavaScript file, and other imported files. 


3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 

After finishing this project, I am a lot more curious about how backend and frontend coding weave into each other. As someone with a hefty history of backend experience with languages like Java and C, it was really interesting to see how JavaScript, HTML, and CSS all work together. I was able to learn how to code the pathways between each file and I wonder whether this elegance carries over to the integration between backend and frontend coding. However, I also noticed that most of the functionality could be easily done in JavaScript, so I would like to ask about the specifics of projects/algorithms that would require a backend language instead of only using JavaScript. How about integrating web development into a mobile application or on a mobile interface? How would frontend developers customize their code for mobile users, or is there not much change? 

Another part of this project I really enjoyed was the UI/UX portion of the HTML and CSS parts. I found myself spending a lot of time playing around with the sizes of the various buttons, the color palettes, and the positioning of the objects on the screen after I finished my project. Would there be a way to generate the UI/UX portions first and then implement the functionality afterward? I would be interested to gain more insight into how the code and design interact with each other and how I could incorporate more design elements into my code.


4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

  a. I would add several difficulty optimization settings for the player to choose from. This would include modifying the number of buttons and the length of the patterns. I would also set an option for the player to choose if they want to disable sound or disable lighting up of the buttons for additional difficulty. Right now, the player gets three attempts before they lose. I would add a setting where players can choose to keep the 3 attempts or restrict themselves to 2 attempts, or even just 1 attempt.

  b. I originally wanted to make the frequencies generate randomly like the pattern. However, I ran into some bugs and was unable to have this work without affecting the functionality of the game. 

  c. I currently have audio files that play when the player wins or loses. I would like to add more audio files for when the player makes correct/incorrect guesses. 

  d. I would definitely work on adding image files in the background of the buttons. I had the image files inside the assets folder, but I could not find a way to have the image show on the buttons without affecting how the buttons light up. 

  e. I would add a timer that ticks down and causes the player to lose the moment the timer hits 0. Every time the player makes a correct guess, the timer would also reset. Of course, the timer would stop when the game has been stopped and would reset for new games. 




## Interview Recording URL Link

[My 5-minute Interview Recording](https://www.loom.com/share/dfdba4a008e0416881baf7b64f3e541a)


## License

    Copyright Jonathan Wang

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.