let localVideo = document.getElementById("local-video")
let remoteVideo = document.getElementById("remote-video")


localVideo.style.opacity = 0
remoteVideo.style.opacity = 0


localVideo.onplaying = () => {localVideo.style.opacity = 1}
remoteVideo.onplaying = () => {remoteVideo.style.opacity = 1}


let peer

const init = userId =>{
    peer = new Peer(userId)
    listen()
}

let localStream
const listen =()=>{
    peer.on('call', (call) =>{
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        }).then(stream =>{
            localStream = stream
            localVideo.srcObject = stream

            call.answer(stream)
            call.on('stream', remoteStream => {
                remoteVideo.srcObject = remoteStream

                remoteVideo.className = "primary-video"
                localVideo.className = "secondary-video"
            })
        })
    })
}