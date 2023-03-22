---
layout: post
title: Electromagnetic Spiral film [ML for the Web]
description: 
summary: 
tags: ml-for-web
---
<h3>Making use of Runway's AI Magic Tools to generate a short video art film. </h3>

![Electromagnetic Spiral](https://user-images.githubusercontent.com/49932341/227027051-e09373c0-7e07-432b-8ae3-ef8f7ae7c26b.mp4)

<iframe src="https://user-images.githubusercontent.com/49932341/227036037-dc29c8fb-ea5d-4578-ae5c-85aad98ef783.mp4" width="100%" height="1080" title="Electromagnetic Spiral" autoplay = "autoplay" loop = "loop">
</iframe>

<h4>Workflow</h4>

1. I started generating an image with text to image an a prompt that read "electromagnetic field"
![9e0dcc5e-6cc6-41fc-8f8e-d2e4a5bc3f4e jpg](https://user-images.githubusercontent.com/49932341/227034584-6d1f25e7-cb11-44c8-85bf-681851a04e9a.jpg)

2. Then I sent that image to the image variations tool which I ran a few times before landing on an image that spoke to me.
![Runway 2023-03-22T19 47 00 561Z Image Variation jpg](https://user-images.githubusercontent.com/49932341/227034880-d6ad72bc-bc91-4924-8820-559d71179ddb.jpg) ![Runway 2023-03-22T19 44 45 977Z Image Variation jpg](https://user-images.githubusercontent.com/49932341/227035063-ef00a24e-75da-4070-8d32-d2f311b20efd.jpg)

3. From there ran Erase and Replace on one of the variations several times to create a few frames of the image transforming into a spriral
![erase-and-replace png](https://user-images.githubusercontent.com/49932341/227035411-49588d0b-217e-4e6b-9ae7-72b47840c54e.png)
![erase-and-replace png (2)](https://user-images.githubusercontent.com/49932341/227035426-49200bcf-c894-4ff7-a6c3-8c735f4a5d64.png)
![erase-and-replace png (3)](https://user-images.githubusercontent.com/49932341/227035435-6557daea-4b89-4dd3-ad3f-1ce8da3fe3be.png)
![black spiral jpg](https://user-images.githubusercontent.com/49932341/227035442-f4e54dd6-b7a9-4f3a-88ac-1cf8b5dc63fd.jpg)

4. I then ran image variation to create a change in sequence.
![Runway 2023-03-22T19 53 33 773Z Image to Image beam of blue light explosion jpg](https://user-images.githubusercontent.com/49932341/227035840-0dcbe24d-8662-40cb-bb16-fb776726b0ac.jpg)


5. Before running image to image a few times to manipulate the color of the image with the prompt "blue light fill"
![Runway 2023-03-22T19 53 56 522Z Image to Image blue light fill jpg](https://user-images.githubusercontent.com/49932341/227035936-be47d283-f055-4e41-a7bf-1d2b3c1a84be.jpg)

6. Lasty I brought all of the images together in Frame Interpolation to create a short video.

https://user-images.githubusercontent.com/49932341/227036037-dc29c8fb-ea5d-4578-ae5c-85aad98ef783.mp4


<h4>Describe the results of working with the tool, do they match your expectations?</h4>
I believe the result is a pretty simple video with a slight computer graphics look and a strong AI generated look. I expected the Frame Interpolation to be more intelligent in creating an organic transistion between frames but it seems to just be a morph transition tool more than anything else. The text to image generations met my expectations in creating images that brought me joy in relation to my unrealistic prompts. 

<h4>Can you "break" the tool? In other words, use it in a way that it was intended for and what kinds of results do you get?</h4>
By inputting concepts into the text-toimage tool rather than actual real life reference points, I often found the AI to be confused and producing unreadable text. Inputted texts such as "Fear", "love", and "security" all seems to break the AI's flow of generation. 

<h4>Can you find any pro tips in terms of prompt engineering?</h4>
If you are looking to generate images of abstract concepts, include more words of real-life reference points that may have actual recorded imagery in a database. 


<h4>Compare and contrast working with Runway as a tool for machine learning as related to ml5.js, python, and any other tools explored this semester.</h4>
Working with AI Magic Tools in Runway felt like a much more passive experience than working in ml5.js for image generation/training and python for text generation in the past. The latter two allow much more control of the process of generation and thus, in my opinion, provide more satisfactory results. 
