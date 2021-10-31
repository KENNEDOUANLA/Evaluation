let MyJson = {
    'kenne': {
        'nom': "name",
        'image2': 'url'
    },
    'dilane': {}
}

let container = document.getElementById('valuecontainer');

let MyJsonFromLocalStorage = localStorage.getItem("MyAPP");
if (MyJsonFromLocalStorage == null) {
    JSON.stringify(MyJson);
    localStorage.setItem("MyAPP", JSON.stringify(MyJson));
} else {

}


const HOME = document.getElementById('home');
const TexteTop = document.getElementById('TexteTop');
const NewTop = document.getElementById('newTop');

HOME.addEventListener('click', () => {
    document.getElementById('valuecontainer').innerHTML = "";
    var container = document.getElementById('valuecontainer');
    TexteTop.innerHTML = "TOP_TOP";
    if (MyJsonFromLocalStorage !== null) {
        let ul = document.createElement('ul');
        ul.classList.add("liste_top_block");
        container.appendChild(ul);
        MyJson = JSON.parse(MyJsonFromLocalStorage);
        for (const key in MyJson) {
            var a = document.createElement('a');
            a.innerHTML = key;
            a.classList.add("top");
            ul.appendChild(a);
            a.href = "#";
            a.addEventListener('click', () => {
                TexteTop.innerHTML = key;
                document.getElementById('valuecontainer').innerHTML = "";
                ViewTop(key);
            });
        }
    }

})

NewTop.addEventListener('click', () => {
    TexteTop.innerHTML = " CREATION ";
    document.getElementById('valuecontainer').innerHTML = "";
    var container = document.getElementById('valuecontainer');
    var BigDiv = document.createElement("div");
    var label = document.createElement("label");
    label.innerHTML = "Titre <br>"
    label.style.fontWeight = "bold";
    BigDiv.classList.add("Titre");
    var input = document.createElement("input");
    input.classList.add("Texte_titre")
    BigDiv.appendChild(label);
    BigDiv.appendChild(input);
    container.appendChild(BigDiv);

})

const ViewTop = (key) => {

    alert(key);
}

function NewImage_(input) {
    var oFReader = new FileReader();
    var typeFile = input.files[0].type;
    console.log(input.files[0]);
    oFReader.readAsDataURL(input.files[0]);
    //creation des elements Html
    var BigDiv = document.createElement("div");
    var Deleter = document.createElement("div");
    var ImageBlock = document.createElement("div");
    var Image = document.createElement("img");

    // affectation des valeurs
    BigDiv.id = "" + tableau.length;
    BigDiv.classList.add("image-uploader");
    Deleter.innerHTML = "X"
    Deleter.classList.add("image_deleter_btn");
    ImageBlock.classList.add("image-uploader-temp");
    oFReader.onload = function(oFREvent) {
        Image.src = "" + oFREvent.target.result;
    }
    Image.classList.add("resetImage");
    //liens avec les parents
    document.getElementById('container').appendChild(BigDiv);
    BigDiv.appendChild(Deleter);
    BigDiv.appendChild(ImageBlock);
    ImageBlock.appendChild(Image);

    //methodes
    Deleter.onclick = () => {
        document.getElementById('container').removeChild(BigDiv);
        tableau.splice(parseInt(BigDiv.id, 10), 1);
    }
}