let currentSong = new Audio()
async function getSongs(){
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text();
    console.log(response) 
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    console.log(as)
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(decodeURIComponent(element.href).split("\\songs\\")[1]);
        }
        
    }
    return songs;
}
const PlayMusic = (track)=>{
    currentSong.src = "/songs/" + track
    currentSong.play()
}
async function main(){
    let songs = await getSongs()
    console.log(songs)
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> 
                            <img style="height: 20px;" src="music.png">
                            <div class="info">
                                <div>${song.replaceAll("%20" , " ")}</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img height="20px" src="play (1).png">
                            </div>
                         </li>`
    }
Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click", element => {
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        PlayMusic(e.querySelector(".info").firstElementChild.innerHTML)
    });
    PlayMusic.addEventListener("click", ()=>{
        if(currentSong.paused){
            currentSong.play;
            
        }
        else{
            currentSong.pause;
        }
    })
    
})
}
main()
