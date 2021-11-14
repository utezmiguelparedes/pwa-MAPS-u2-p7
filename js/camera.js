class Camera {

    constructor(videoNode) {
        this.videoNode = videoNode;
        this.stream = null;
        this.photo = null;
        this.alt = "";
    }

    on() {

        if (navigator.mediaDevices) {
            this.off();
            return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: 300,
                    height: 300,
                    facingMode: 'user'
                }
            }).then(stream => {
                this.alt = 'Frontal'
                this.videoNode.srcObject = stream;
                this.stream = stream;
                return true
            }).catch(err => {
                console.log(err);
                return false
            });
        } else {
            return false
        }
    }

    onBack() {
        if (navigator.mediaDevices) {
            this.off();
            return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: 300,
                    height: 300,
                    facingMode: {
                        exact: 'environment'
                    }
                }
            }).then(stream => {
                this.alt = 'Trasera'
                this.videoNode.srcObject = stream;
                this.stream = stream;
                return true
            }).catch(err => {
                return false
            });
        } else {
            return false
        }

    }

    off() {
        if (this.videoNode) {

            this.videoNode.pause();
            if (this.stream) {
                this.stream.getTracks().forEach(track => {
                    track.stop();
                });
            }
        }
    }

    takePhoto() {
        let canvas = document.createElement('canvas');
        canvas.setAttribute('width', 300)
        canvas.setAttribute('height', 300)
        let context = canvas.getContext('2d');
        context.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);
        this.photo = context.canvas.toDataURL();
        canvas = null;
        context = null;
        this.videoNode.removeAttribute('src');
        this.videoNode.load();
        const tipo = this.alt
        const foto = this.photo
        this.alt = ''
        return [foto, tipo];
    }
}