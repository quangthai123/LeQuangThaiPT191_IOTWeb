/** @format */

import React, {useEffect, useState} from 'react';

export default function Profile() {
   const [imageno, setImageno] = useState(1);

   useEffect(() => {
      displayimg(imageno);
   }, [imageno]);

   function nextimg(n) {
      setImageno((prevImageno) => prevImageno + n);
   }

   function currentSlide(n) {
      setImageno(n);
   }

   function displayimg(n) {
      const images = document.getElementsByClassName('image');
      const dots = document.getElementsByClassName('dot');

      if (images.length === 0 || dots.length === 0) {
         // Handle the case where elements are not found
         return;
      }

      let i;

      if (n > images.length) {
         setImageno(1);
         return;
      }

      if (n < 1) {
         setImageno(images.length);
         return;
      }

      for (i = 0; i < images.length; i++) {
         images[i].style.display = 'none';
      }

      for (i = 0; i < dots.length; i++) {
         dots[i].className = dots[i].className.replace(' active', '');
      }

      images[imageno - 1].style.display = 'block';
      dots[imageno - 1].className += ' active';
   }
   return (
      <div>
         <header class='header'>
            <nav>
               <div class='menu'>
                  <ul>
                     <li className='active'>
                        <a href='/'>Dashboard</a>
                     </li>
                     <li>
                        <a href='/data_sensor'>Data Sensors</a>
                     </li>
                     <li>
                        <a href='/action_history'>Action History</a>
                     </li>
                     <li>
                        <a href='/profile'>Profile</a>
                     </li>
                  </ul>
               </div>
            </nav>
         </header>
         <div class='box'>
            <div class='image'>
               <img src='images/img-1.jpg' alt='' class='box-img' />
               <h1>Quang Thái Lê</h1>
               <h5>Game Developer - LN Author</h5>
               <p>
                  A 4th year college student with dreams of becoming a game developer. With the spirit of self-study and
                  enthusiasm, i'm trying every day to be able to create works in the virtual world that bring many
                  interesting experiences for players (in the future). And my biggest dream is to become a light novel
                  author...
               </p>
            </div>
            <div class='image'>
               <img src='images/img-2.jpg' alt='' class='box-img' />
               <h1>Where was i born?</h1>
               <h5>HÀ NAM</h5>
               <p>
                  Ha Nam has long been known as a heroic land with famous spiritual tourist sites, historical sites and
                  craft villages. I was born and raised in Ha Nam for 21 years and never have I stopped loving my
                  hometown.
               </p>
            </div>

            <div class='image'>
               <img src='images/img-5.jpg' alt='' class='box-img' />
               <h1>My personality</h1>
               <h5>Fun-Sociable</h5>
               <p>
                  Although I am an introvert, I am always cheerful and optimistic, ready to talk with anyone (if that
                  person takes the initiative :)). Sometimes I feel pressured because things don't go the way I wanted,
                  but then I'm happy again very quickly.
               </p>
            </div>

            <div class='image'>
               <img src='images/img-3.jpg' alt='' class='box-img' />
               <h1>My Hobbies</h1>
               <h5>Enjoys playing games and watching anime</h5>
               <p>
                  When I deserve to be rewarded with a time to enjoy the things I like, I will turn on my computer and
                  play games for entertainment, to relieve stress. And when I feel sad and pressured, what revives me
                  and brings me happiness is anime - my emotional world.
               </p>
            </div>
            <div class='image'>
               <img src='images/img-4.jpg' alt='' class='box-img' />
               <h1>Skills - Experience</h1>
               <ol>
                  <li>I have basic knowledge of C++, java, c#, data structures and algorithms, oop.</li>
                  <li>Experience in developing simple games using unity C#.</li>
                  <li>Able to read and understand English documents.</li>
                  <li>Enthusiastic and eager to learn, especially in the field of passion: game developer.</li>
               </ol>
            </div>
            <ul>
               <li>
                  <a href='https://www.facebook.com/thaiquangle1234' target='_blank' rel='noreferrer'>
                     <i class='fa fa-facebook-square' aria-hidden='true'></i>
                  </a>
               </li>
               <li>
                  <a href='https://twitter.com/LeQuang94795708' target='_blank' rel='noreferrer'>
                     <i class='fa fa-twitter-square' aria-hidden='true'></i>
                  </a>
               </li>
               <li>
                  <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noreferrer'>
                     <i class='fa fa-youtube-square' aria-hidden='true'></i>
                  </a>
               </li>
               <li>
                  <a href='https://mail.google.com/mail/?authuser=0' target='_blank' rel='noreferrer'>
                     <i class='fa fa-google-plus-square' aria-hidden='true'></i>
                  </a>
               </li>
            </ul>

            <div class='button'>
               <a onclick='nextimg(-1)' class='prev'>
                  &#10094;
               </a>
               <a onclick='nextimg(1)' class='next'>
                  &#10095;
               </a>
            </div>

            <div class='dots'>
               <span class='dot' onclick='currentSlide(1)'></span>
               <span class='dot' onclick='currentSlide(2)'></span>
               <span class='dot' onclick='currentSlide(3)'></span>
               <span class='dot' onclick='currentSlide(4)'></span>
               <span class='dot' onclick='currentSlide(5)'></span>
            </div>
         </div>
      </div>
   );
}
