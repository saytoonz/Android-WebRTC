let localVideo = document.getElementById("local-video")
let remoteVideo = document.getElementById("remote-video")


localVideo.style.opacity = 0
remoteVideo.style.opacity = 0


localVideo.onplaying = () => {localVideo.style.opacity = 1}
remoteVideo.onplaying = () => {remoteVideo.style.opacity = 1}


let peer

const init = userId =>{
    peer = new Peer(userId, {
        host: '192.168.0.162',
        port: 9000,
    })

    peer.on('open', () => {
        //WE WILL MAKE A CALL TO A KOTLIN/JAVA/FLUTTER FUNCTION
    })

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



const startCall = (otherUserId) => {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream => {
        localVideo.srcObject = stream
        localStream = stream

        const call = peer.call(otherUserId, stream)
        call.on('stream', remoteStream => {
            remoteVideo.srcObject = remoteStream

            remoteVideo.className = "primary-video"
            localVideo.className = "secondary-video"
        })
    })
}



const toggleAudio = (stringBool) => {
    if(stringBool == "true"){
        localStream.getAudioTracks()[0].enabled = true
    }else{
        localStream.getAudioTracks()[0].enabled = false
    }
}

const toggleVideo = (stringBool) => {
    if(stringBool == "true"){
        localStream.getVideoTracks()[0].enabled = true
    }else{
        localStream.getVideoTracks()[0].enabled = false
    }
}