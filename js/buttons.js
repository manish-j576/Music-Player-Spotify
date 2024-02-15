
// function to extract the curren song name from the song src"
function extractSongName(currentSong){
    let a = currentSong.src
    let songArr=a.split("/")
    let length=songArr.length
    let str=songArr[length-1]
    // return str.replaceAll("%20"," ")
    return str;


}


// main function that will call other function and change the music
function changeMusic(songs,currentSong , button) {
    // funtion to get the index of the current song in the array
    let indexOfCurrentSong= findCurrentSongInArray(currentSong,songs)

    if (button==0 && indexOfCurrentSong!=0) {
        //for previous song
        changeSong(indexOfCurrentSong-1,)
    }
    else if(button==1 && indexOfCurrentSong!=songs.length-1){
        // for next song
        changeSong(indexOfCurrentSong+1,)
    }
    else{
        //if the playlist ends or begins next and previous button will not work
    }
    
    
} 

function changeSong(index,){
    // console.log(songs[index][1].replaceAll("%20"," "))
    //fucntion to call the play music from the main script with the previous song or next song 
    playMusic( songs[index][1].replaceAll("%20"," "))

}

// function to find the index of current song in the song array
function findCurrentSongInArray(currentSong,songs) {
    // console.log("---------------------------------")
    let song=extractSongName(currentSong)
    console.log(songs , song)
    for (let i = 0; i < songs.length; i++) {
        for (let j = 0; j < songs[i].length; j++) {
            if(songs[i][1]==song)
            {
                console.log(i)
                return i
            }
            
        }
        
    }
    return -1



    
    
}
// event listners attach to previous and next 
prev.addEventListener("click",()=>{
    changeMusic(songs,currentSong,0)
    
    
})
next.addEventListener("click",()=>{
    changeMusic(songs,currentSong,1)
    
    
})

