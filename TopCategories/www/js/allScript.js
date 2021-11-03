let MyJson;
let key = "";
let value = "";
let container = document.getElementById('valuecontainer');
let MyJsonFromLocalStorage = localStorage.getItem("MyAPP");

const HOME = document.getElementById('home');
const TexteTop = document.getElementById('TexteTop');
const NewTop = document.getElementById('newTop');


HOME.addEventListener('click', LOAD);

function LOAD()
{
    document.getElementById('valuecontainer').innerHTML = "";
    MyJsonFromLocalStorage = localStorage.getItem("MyAPP");
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
            a.addEventListener('click', () =>
            {
                TexteTop.innerHTML = key;
                ViewTop(MyJson[key]);
            });
        }
    }

}

NewTop.addEventListener('click', () =>
{
    TexteTop.innerHTML = " CREATION ";
    document.getElementById('valuecontainer').innerHTML = "";
    var NewTop = {};
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

    var ListeOfTop = document.createElement("div");
    var adder = document.createElement("button");
    var saveur = document.createElement("button");
    saveur.innerHTML = "Save";
    saveur.classList.add("adder");
    saveur.style.marginLeft = "50%";
    saveur.addEventListener('click', () =>
    {
        NewTop[key] = value;
        MyJsonFromLocalStorage = localStorage.getItem("MyAPP");
        if (MyJsonFromLocalStorage == null) {
            MyJsonFromLocalStorage = "{}";
        }
        MyJson = JSON.parse(MyJsonFromLocalStorage);
        var Nkey = input.value;
        MyJson[Nkey] = NewTop;
        MyJsonFromLocalStorage = JSON.stringify(MyJson);
        localStorage.setItem("MyAPP", MyJsonFromLocalStorage);
        LOAD();
    });

    adder.innerHTML = "New";
    adder.classList.add("adder");
    let i = 0;

    adder.addEventListener('click', () =>
    {
        if (i !== 0) {
            NewTop[key] = value;
        }
        var smallblock = document.createElement("div");
        smallblock.classList.add("smallblock");
        ListeOfTop.appendChild(smallblock);
        var imageBlock = document.createElement("div");
        var texte = document.createElement("b");
        texte.innerText = "Ajouter ou glisser une image"
        imageBlock.appendChild(texte);
        var inputImage = document.createElement("input");
        inputImage.type = "file";
        inputImage.classList.add("imageInput");
        var reelImage = document.createElement("img");
        reelImage.classList.add("realImage");

        inputImage.addEventListener('change', () =>
        {
            var typeFile = inputImage.files[0].type;
            if (typeFile == "image/png" || typeFile == "image/jpeg") {
                reelImage.src = "/img/imagesTop/" + inputImage.files[0].name;
                inputImage.style.display = "none";
                texte.style.display = "none";
                imageBlock.appendChild(reelImage);
                key = reelImage.src;
            }
        });

        imageBlock.appendChild(inputImage);

        imageBlock.classList.add("imagesBlock");
        var description = document.createElement("textarea");
        description.placeholder = "     description    "
        description.classList.add("texte_block");
        description.addEventListener('change', () =>
        {
            value = description.value;
        })
        smallblock.appendChild(imageBlock);
        smallblock.appendChild(description);

        i = 1;
    });

    container.appendChild(BigDiv);
    container.appendChild(ListeOfTop);
    container.appendChild(saveur);
    container.appendChild(adder);
});




const ViewTop = (top) =>
{
    document.getElementById('valuecontainer').innerHTML = "";
    var container = document.getElementById('valuecontainer');
    var ListeOfTop = document.createElement("div");
    for (const key in top) {
        var smallblock = document.createElement("div");
        smallblock.classList.add("smallblock");
        smallblock.style.height = "200px";
        var image = document.createElement("img");
        var texteDescription = document.createElement("p");
        image.style.width = "50%";
        image.src = key;
        texteDescription.innerHTML = top[key];
        texteDescription.style.width = "50%";
        texteDescription.style.textAlign = "center";
        smallblock.appendChild(image);
        smallblock.appendChild(texteDescription);
        ListeOfTop.appendChild(smallblock);
    }
    container.appendChild(ListeOfTop);
}



function NewImage_(input, reelImage)
{
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
    oFReader.onload = function (oFREvent)
    {
        Image.src = "" + oFREvent.target.result;
    }
    Image.classList.add("resetImage");
    //liens avec les parents
    document.getElementById('container').appendChild(BigDiv);
    BigDiv.appendChild(Deleter);
    BigDiv.appendChild(ImageBlock);
    ImageBlock.appendChild(Image);

    //methodes
    Deleter.onclick = () =>
    {
        document.getElementById('container').removeChild(BigDiv);
        tableau.splice(parseInt(BigDiv.id, 10), 1);
    }
}

LOAD();