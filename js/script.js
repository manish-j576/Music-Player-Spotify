console.log("lets Write js")
let currentSong=new Audio();
let songs;
let toggle=1;
currentSong.volume=0.20
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSongs(){
    // replace this fetch with your ip 
    let a=await fetch('/songs/')
    let response= await a.text()

    let div=document.createElement("div")
    div.innerHTML=response
    let as=div.getElementsByTagName('a')
    let songs=[]
    for (let index = 0; index < as.length; index++) {
        const element = as[index]
        if(element.href.endsWith("mp3"))
            songs.push(element.href.split("/songs/"))
    }
    return songs

}
const playMusic = (track, pause = false) => {
    currentSong.src = "/songs/" + track
    if (!pause) {
        currentSong.play()
        play.src = "pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"


}
async function main() {



    
    // get the list of songs
     songs=await getSongs()
    playMusic(songs[0],true)
    // attach the list to the playlist
    let songUL=document.querySelector(".songList").getElementsByTagName("ul")[0]
    for(const song of songs){
        songUL.innerHTML=songUL.innerHTML+ `
        <li>
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song[1].replaceAll("%20"," ")}</div>
                                <div> Manish </div>
                            </div>
                            <div class="playnow">
                                <span> Play Now</span>
                                <img class="invert" src="playpause.svg" alt="">
                            </div>
        </li>`;
    }

    // getall the songs form the play list and add event listner
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((e)=>{
        e.addEventListener("click", (element)=>{
            // console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())//dunction wil play the music
            console.log(e.querySelector(".info").firstElementChild.innerHTML.trim());
            


        })
        
    })

    // change the svg of play and pause


    play.addEventListener("click",()=>{
        if(currentSong.paused)
        {
            currentSong.play()
            play.src="pause.svg"
        }
        else{
            currentSong.pause()
            play.src="play.svg"
        }
    })


    // time update event
    currentSong.addEventListener("timeupdate",()=>{
        document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100+"%"
    })

     // Add an event listener to seekbar
     document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })


    // Add an event listener for hamburger
    document.querySelector(".hamburgerContainer").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0px"
        document.querySelector(".close").style.display="block"
    })
   
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-100%"

    })



    //by default unmute at a volume of 20% and seekbar will also be in 20 %
    //adding volume


    let currentVolume;
    volume.addEventListener("click",()=>{
        // console.log("mute was clicked",currentVolume)
        // following code will toggle the mute svg and also the music volume
        
        if(toggle){
            
            volume.src="mute.svg"
            console.log('volume is zero');
            currentVolume=currentSong.volume
            currentSong.volume=0
            toggle=0

        }
        else{
            volume.src="volume.svg"
            toggle=1
            currentSong.volume=currentVolume
            console.log('volume is ',currentVolume);
            
        }
    })
    document.querySelector(".circ").style.left = 20 + "%"
    document.querySelector(".seekbar-volume").addEventListener("click", b => {
        let percent = (b.offsetX / b.target.getBoundingClientRect().width)*100;
        document.querySelector(".circ").style.left = percent + "%";
        currentSong.volume=(percent/100);
        // console.log(b.offsetX)  -2 se suru hoke 20.65 tk
        // console.log(b.target.getBoundingClientRect().width)
    })


}
main()