class Question
{
    constructor(kerdes,valasz1,pont1,valasz2,pont2,valasz3,pont3)
    {
        this.kerdes = kerdes
        this.valasz1 = valasz1
        this.pont1 = pont1
        this.valasz2 = valasz2
        this.pont2 = pont2
        this.valasz3 = valasz3
        this.pont3 = pont3
    }
}
let Questions = []
let QuestionIndex = 0
let Points = 0
let values = [1,2,3]
const endResults = 
[
    "13 - 21 Gratulálunk, te tudod, hogy kell igazán egészségesen élni. Ami nagyon fontos, hogy továbbra is figyelj oda a megfelelő hidratálásra és a rostbevitelre. Ha még nem próbáltad, akkor itt az ideje kipróbálni az alternatív fehérje megoldásokat is. Szuper egészséges és finom tud lenni. Egyre vigyázz, azért ne hajtsd túl magad. ;)",
    "22 - 30 Jó úton jársz, de még van mit javítani az étkezéseden. Figyelj a rost és a megfelelő fehérje bevitelre (hal, pulyka vagy csirke legyen a fő és a hüvelyes zöldségek). Nézz utána a mediterrán étrendnek, a tested meg fogja hálálni. A nassolást, amennyire lehet, mellőzd. A nyugodt alváshoz pedig elengedhetetlen a jó környezet, a sötét szoba. Nyugi, nincs szörny az ágy alatt. ;)",
    "31 - 39 Ajjaj, nagy a baj. Nem figyelsz az étkezésedre. Ha ezen nem változtatsz, komoly egészségügyi következményei is lehetnek (mint a cukorbetegség, a magas vérnyomás vagy a korai csontritkulás). Légy tudatos, egy életünk van. Javasoljuk, hogy a gyorsan felszívódó szénhidrátokat (vagy épp a szupergyorsan felszívódókat) -mint a nassok, sütemények, krumpli, rizs- cseréld lassan felszívódó szénhidrátokra – basmati rizs, hajdina, köles, kuszkusz- és fogyassz elég folyadékot. Minden nap legalább egy 4km-es távot sétálj le gyorssétával. Ha azt érzed, hogy nehézkes az alvás, akkor lefekvés előtt egy 30 perccel már ne nézz tv-t és ne használd a telefonodat sem. Így nyugodtabb lesz az alvásod és másnap nem kelsz fáradtan, ami miatt amúgy összezabálsz mindent."
]
function NextQuestion()
{
    let radios = document.getElementsByName("Kerdes")
    let canContinue = false
    radios.forEach(element => 
    {
        if (element.checked)
        {
            Points += values[element.value-1]
            canContinue = true
        }
    })
    if (canContinue)
    {
        QuestionIndex += 1
        InitializeQuestion(QuestionIndex)
    }
}
function RestartQuiz()
{
    Points = 0
    QuestionIndex = 0
    InitializeQuestion(QuestionIndex)
}
function InitializeQuestion(index)
{
    if (index < Questions.length)
    {
        let Element = document.getElementById("QuestionForm")
        values[0] = Questions[index].pont1
        values[1] = Questions[index].pont2
        values[2] = Questions[index].pont3
        Element.innerHTML = 
        `
                <h1>${Questions[index].kerdes}</h1>
                <input type="radio" name="Kerdes" id="Kerdes1" value="1"><label for="Kerdes1">${Questions[index].valasz1}</label><br>
                <input type="radio" name="Kerdes" id="Kerdes2" value="2"><label for="Kerdes2">${Questions[index].valasz2}</label><br>
                <input type="radio" name="Kerdes" id="Kerdes3" value="3"><label for="Kerdes3">${Questions[index].valasz3}</label><br>
                <button type="button" onclick="NextQuestion()">Következö Kérdés</button>
        `
    }
    else
    {
        let Element = document.getElementById("QuestionForm")
        let eredmeny = ""
        if (Points < 21)
        {
            eredmeny = endResults[0]
        }
        else if (Points < 30)
        {
            eredmeny = endResults[1]
        }
        else
        {
            eredmeny = endResults[2]
        }
        Element.innerHTML = 
        `
            <h1>Eredmény</h1>
            <p>${eredmeny}</p>
            <button type="button" onclick="RestartQuiz()">Ujrakezdés</button>
        `
    }
}
fetch("kerdesek.json").then(JSON =>JSON.json()).then(file => 
{
    file.forEach(element => 
    {
        Questions.push(new Question(element.kerdes,element.valasz1,element.pont1,element.valasz2,element.pont2,element.valasz3,element.pont3))
    });
    InitializeQuestion(13)
})