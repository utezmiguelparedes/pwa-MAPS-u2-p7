if (navigator.serviceWorker) {
    let url = ''
    const BASE_URL = window.location.href
    BASE_URL.startsWith('https:') ? url = '/pwa-MAPS-u2-p7/sw.js' : url = "/sw.js"
    navigator.serviceWorker.register(url)

}

let player = $("#player");
let photoUser = $("#photoUser");

let btnCamera = $("#btnCameraFront");
let btnCameraBack = $("#btnCameraBack");
let btnTakePhoto = $("#btnTakePhoto");

const camera = new Camera(player[0]);

btnCamera.on("click", () => {
    camera.on().then((result) => {
        if (!result) {
            alert("Ocurrió un error al iniciar la camara")
        }
    });
});

btnCameraBack.on("click", () => {
    camera.onBack().then((result) => {
        if (!result) {
            alert("No cuentas con dispositivo multimedia")
        }
    });
});

btnTakePhoto.on("click", async() => {

    camera.off();
    const [foto, tipo] = camera.takePhoto();
    const photo = `
      <div class="card bg-light mb-3 m-4" style="max-width: 18rem;">
            <div class="card-header">${tipo}</div>
            <div class="card-body">
                <img class="card-img-top" src="${foto}" alt="Card image cap">
            </div>
        </div>
      `;
    $("#photoContainer").append(photo);
});