---
layout: post
title: Electromagnetic Spiral film [ML for the Web]
description: 
summary: 
tags: ml-for-web
---
<h3>Making use of Runway's AI Magic Tools to generate a short video art film. </h3>

![Electromagnetic Spiral](https://user-images.githubusercontent.com/49932341/227027051-e09373c0-7e07-432b-8ae3-ef8f7ae7c26b.mp4)

<h4>Workflow</h4>

1. I started generating an image with text to image an a prompt that read "electromagnetic field"
![9e0dcc5e-6cc6-41fc-8f8e-d2e4a5bc3f4e jpg](https://user-images.githubusercontent.com/49932341/227034584-6d1f25e7-cb11-44c8-85bf-681851a04e9a.jpg)
3. Then I sent that image to the image variations tool which I ran a few times before landing on an image that spoke to me.
4. Image Variation 1       |  Image Variation 2
:-------------------------:|:-------------------------:
![Runway 2023-03-22T19 47 00 561Z Image Variation jpg](https://user-images.githubusercontent.com/49932341/227034880-d6ad72bc-bc91-4924-8820-559d71179ddb.jpg) ![Runway 2023-03-22T19 44 45 977Z Image Variation jpg](https://user-images.githubusercontent.com/49932341/227035063-ef00a24e-75da-4070-8d32-d2f311b20efd.jpg)

5. From there ran Erase and Replace on one of the variations several times to create a few frames of the image transforming into a spriral

7. I then ran image variation again before dragging about 15 frames into Frame Interpolation to create a short video.

<h4>Describe the results of working with the tool, do they match your expectations?</h4>
I believe the result is a pretty simple video with a slight computer graphics look and a strong AI generated look. I expected the Frame Interpolation to be more intelligent in creating an organic transistion between frames but it seems to just be a morph transition tool more than anything else. The text to image generations met my expectations in creating images that brought me joy in relation to my unrealistic prompts. 

<h4>Can you "break" the tool? In other words, use it in a way that it was intended for and what kinds of results do you get?</h4>
By inputting concepts into the text-toimage tool rather than actual real life reference points, I often found the AI to be confused and producing unreadable text. Inputted texts such as "Fear", "love", and "security" all seems to break the AI's flow of generation. 

<h4>Can you find any pro tips in terms of prompt engineering?</h4>
If you are looking to generate images of abstract concepts, include more words of real-life reference points that may have actual recorded imagery in a database. 


<h4>Compare and contrast working with Runway as a tool for machine learning as related to ml5.js, python, and any other tools explored this semester.</h4>
Working with AI Magic Tools in Runway felt like a much more passive experience than working in ml5.js for image generation/training and python for text generation in the past. The latter two allow much more control of the process of generation and thus, in my opinion, provide more satisfactory results. 
