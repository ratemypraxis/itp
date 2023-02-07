---
layout: post
title: Mini PIR Sensor with Time and Sensitivity Control - BS612 [Intangible Interaction]
description: 
summary: 
tags: intangible-interaction 
---
<h2>About the PIR Sensor with Time and Sensitivity Control (BS612):</h2>

 ![](https://raw.githubusercontent.com/ratemypraxis/itp/master/media/sensingLED.png)

**Sensing angle:** 45 degrees

**Sensitivity:** Different from other PIR sensors, this model features a SENS pin (pin 1) which allows you to control sensitiviy of the sensing by manipulating voltage applied through that pin. At 0 volts (ground) the sensor is most sensitive and at 3.3 volts (maximum) the sensor is least sensitive to movement. Using resistors and a given chart from the datasheet one can configure to various levels of sensitivity.

 ![](https://raw.githubusercontent.com/ratemypraxis/itp/master/media/sensitivityChart.PNG)

**Timing:** This PIR also features a dedicated pin for manipulating the length of time that the output pin sends HIGH for. At ground this pin 
sends a minimum of 2 seconds output and at full 3.3 volts this pin can send output for up to one hour! Timing can also be configured in detail
making use of resistors and a given chart.

 ![](https://raw.githubusercontent.com/ratemypraxis/itp/master/media/timingChart.PNG)

**Distance:**
The product description on Adafruit's webpage states that the sensor can read up to 5 meters away but the data sheet refuses to give specific
parameters for distance stating that it's sensing range is "affected by its own SNR, imaging distance
of Fresnel lens, temperature of the moving body, environment temperature and humidity,
and electromagnetic interference, etc." Additionally it states that when the sensor is configured to higher sensitivity (or when the SENS
pin voltage is lower) the distance it can read becomes longer.

**Strengths:** The highly configural nature of this sensor gives it a ton of potential for practical and fun applications alike. Specifically the ability to manipulate sensitivity and output time length is a great strength.

**Weaknesses:** From the backend I'd say the lack of clarity and labelling of the pins on the actual sensor is a weak point for circuit builders and on the frontend the limited scope of the sensing angle is a weakness as well compared to other sensors which may sense a full 360 degrees. 

 ![](https://raw.githubusercontent.com/ratemypraxis/itp/master/media/pinInfo.png)
 
**Applications:** The datasheet provides some example uses of this PIR sensor for smart home technologies like air conditioning, doorbells and refrigirators,security tools like cameras and alarms, and lighting systems. It also lists "toy" as an application which intrigued me as an interesting base for ideating on how it can be used.

**Ideas:**
In the realm of "toy" applications I can see this sensor being used to create playful interactions and installations like a little toy boat that floats in a small bowl, controlling a motor to start moving in the water when it sensings presence in front of it 
or with many of these PIR sensors some installation with immersive audio that triggers playback of different audio files in different areas of a space depending on where motion is detected.


Ideas inspired by sensor:

<a href="https://cdn.sparkfun.com/assets/6/7/9/8/e/AK9753_DS.pdf">Data Sheet</a>
<br>
<a href="https://www.adafruit.com/product/5578">Product Listing</a>

