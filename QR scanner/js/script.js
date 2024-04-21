const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
  //e denote parameter presumably "event"
  e.preventDefault(); //prevent default action of form submission

  clearUI();
  // 1) clear the previous query
  // 2) prevent from repeatation of save btn

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Please enter the URL");
  } else {
    showSpinner(); //call for show spinner icon

    setTimeout(() => {
      hideSpinner(); //call for hide the loading spinner after 1s

      generateQRCode(url, size); //call for generatinG QR

      setTimeout(() => {
        const saveURL = qr.querySelector("img").src; //collect the image query data("data/image.....")
        createSaveBtn(saveURL);
      }, 50);
    }, 1000);
  }
  // console.log(url,size);
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    //QRCode is a qr generating library
    //objects
    text: url,
    width: size,
    height: size,
  });
};

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};
const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

const clearUI = () => {
  qr.innerHTML = ""; //precuous data clear
  const saveLink = document.getElementById("save-link");
  if (saveLink) saveLink.remove();
};

const createSaveBtn = (saveURL) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    " text-white py-2 w-1/3 m-auto my-5 bg-gradient-to-r from-green-400 to-blue-500 rounded hover:from-pink-500 hover:to-yellow-500 justify-center backdrop-blur-sm bg-white/30 font-bold rounded";
  link.href = saveURL;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link);
};

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
// max-w-xs place-content-center py-3 px-4 mt-5 mb-5
