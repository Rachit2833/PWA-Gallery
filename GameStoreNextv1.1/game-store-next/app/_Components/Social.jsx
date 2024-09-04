import "@/app/_Styles/social.css"
function Social({item}) {
   return (
      <>
      <div class="Social-Btn">
         <span class="svgContainer">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" id="mail"><defs><linearGradient id="a" x1="26.206" x2="146.207" y1="-1059.782" y2="-1059.782" gradientTransform="rotate(90 -486.788 -512.994)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1d6ff2"></stop><stop offset="1" stop-color="#1ac8fc"></stop></linearGradient></defs><path fill="url(#a)" fill-rule="evenodd" d="M0,94V26A25.94821,25.94821,0,0,1,26,0H94a25.94821,25.94821,0,0,1,26,26V94a25.94821,25.94821,0,0,1-26,26H26A26.012,26.012,0,0,1,0,94Z"></path><path fill="#fff" fill-rule="evenodd" d="M99,86.2a6.10894,6.10894,0,0,1-3,.8H24a5.83049,5.83049,0,0,1-3-.8l24-24,5.9,5.9A12.219,12.219,0,0,0,60,71.5a12.37426,12.37426,0,0,0,9.1-3.4L75,62.2Zm2.1-2.2-24-24,24-24a6.10893,6.10893,0,0,1,.8,3V81A4.55088,4.55088,0,0,1,101.1,84ZM18.8,84a6.10894,6.10894,0,0,1-.8-3V39a5.83049,5.83049,0,0,1,.8-3l24,24ZM99,33.8,66.9,65.9A9.353,9.353,0,0,1,60,68.5a9.353,9.353,0,0,1-6.9-2.6L21,33.8a6.10894,6.10894,0,0,1,3-.8H96A6.10862,6.10862,0,0,1,99,33.8Z"></path></svg>
         </span>
         <span class="BG">example@gmail.com</span>
      </div>
         <div class="Social-Btn">
            <span class="svgContainer">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="instagram"><linearGradient id="a" x1="1.464" x2="14.536" y1="14.536" y2="1.464" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFC107"></stop><stop offset=".507" stop-color="#F44336"></stop><stop offset=".99" stop-color="#9C27B0"></stop></linearGradient><path fill="url(#a)" d="M11 0H5a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zm3.5 11c0 1.93-1.57 3.5-3.5 3.5H5c-1.93 0-3.5-1.57-3.5-3.5V5c0-1.93 1.57-3.5 3.5-3.5h6c1.93 0 3.5 1.57 3.5 3.5v6z"></path><linearGradient id="b" x1="5.172" x2="10.828" y1="10.828" y2="5.172" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFC107"></stop><stop offset=".507" stop-color="#F44336"></stop><stop offset=".99" stop-color="#9C27B0"></stop></linearGradient><path fill="url(#b)" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.5A2.503 2.503 0 0 1 5.5 8c0-1.379 1.122-2.5 2.5-2.5s2.5 1.121 2.5 2.5c0 1.378-1.122 2.5-2.5 2.5z"></path><linearGradient id="c" x1="11.923" x2="12.677" y1="4.077" y2="3.323" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFC107"></stop><stop offset=".507" stop-color="#F44336"></stop><stop offset=".99" stop-color="#9C27B0"></stop></linearGradient><circle cx="12.3" cy="3.7" r=".533" fill="url(#c)"></circle></svg>
            </span>
            <p class="BG">{item.SocialMediaHandle}</p>
         </div>
         <div class="Social-Btn">
            <span class="svgContainer">
               <svg xmlns="http://www.w3.org/2000/svg" width="2500" height="2500" viewBox="7.025 7.025 497.951 497.95" id="linkedin"><linearGradient id="a" x1="-974.482" x2="-622.378" y1="1306.773" y2="1658.877" gradientTransform="translate(1054.43 -1226.825)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2489be"></stop><stop offset="1" stop-color="#0575b3"></stop></linearGradient><path fill="url(#a)" d="M256 7.025C118.494 7.025 7.025 118.494 7.025 256S118.494 504.975 256 504.975 504.976 393.506 504.976 256C504.975 118.494 393.504 7.025 256 7.025zm-66.427 369.343h-54.665V199.761h54.665v176.607zM161.98 176.633c-17.853 0-32.326-14.591-32.326-32.587 0-17.998 14.475-32.588 32.326-32.588s32.324 14.59 32.324 32.588c.001 17.997-14.472 32.587-32.324 32.587zm232.45 199.735h-54.4v-92.704c0-25.426-9.658-39.619-29.763-39.619-21.881 0-33.312 14.782-33.312 39.619v92.704h-52.43V199.761h52.43v23.786s15.771-29.173 53.219-29.173c37.449 0 64.257 22.866 64.257 70.169l-.001 111.825z"></path></svg>
            </span>
            <span class="BG"></span>
         </div>
      </>

   )
}

export default Social
