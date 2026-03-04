
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// level_btn_loader
const level=()=>{
const url=fetch("https://openapi.programming-hero.com/api/levels/all");
url.then((response)=>response.json())
.then((load)=>load_levels(load.data))

}
level();

const load_levels=(levels)=>{
let mother=document.getElementById("vocabulary_sec");
mother.innerHTML=" ";
levels.forEach(element => {
   child=document.createElement('div');
   child.innerHTML=`<button id="lvlbtn_${element.level_no}" class="btn lvl_btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson-${element.level_no}</button>`




//    lesson_load0
 mother.appendChild(child);

        const btn = document.getElementById(`lvlbtn_${element.level_no}`);

     
        btn.addEventListener("click", () => {

          
            document.querySelectorAll(".lvl_btn")
                    .forEach(b => b.classList.remove("active"));

           
            btn.classList.add("active");

           
            load_word(element.level_no);

        });


});


}


 const load_word=(level)=>{
const url=fetch(`https://openapi.programming-hero.com/api/level/${level}`)
url.then((response)=>response.json())
.then((load_words)=>load_card(load_words.data))
 }

//  load_card

const load_card=(lessons)=>{
    mother=document.getElementById("card_sec");
    mother.innerHTML="";
     const alert=document.getElementById("alert_sec");
    if(lessons.length===0){
       
        alert.classList.remove("hidden");
        mother.classList.add("hidden");
    }
    else{
           alert.classList.add("hidden");
        mother.classList.remove("hidden");
    }
    lessons.forEach((elements)=>{
        let child=document.createElement("div")
        child.className="bg-white rounded-2xl flex flex-col items-center justify-center text-center p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-slate-50"
        child.innerHTML=`<h1 class="text-2xl font-bold text-slate-800">${elements.word}</h1>

      <p class="text-slate-600 mt-2">Meaning||Pronunciation</p>
      <p class="bangla text-slate-500 text-2xl ">${elements.meaning}/${elements.pronunciation}</p>

      <div class="flex justify-between w-full mt-5">
          <button class="btn btn-circle btn-sm bg-indigo-100 border-none text-indigo-600 hover:bg-indigo-200">
              <i class="fa-solid fa-circle-info text-sm"></i>
          </button>

          <button  class="btn_voice btn-circle btn-sm bg-indigo-100 text-indigo-600 border-none  hover:bg-indigo-700 hover:text-white">
              <i class="fa-solid fa-volume-high text-sm"></i>
          </button>
      </div>
`


mother.appendChild(child);

const audioBtn = child.querySelector(".btn_voice");

audioBtn.addEventListener("click", () => {
    pronounceWord(elements.word);
    console.log(elements.word);
});


    })


}

