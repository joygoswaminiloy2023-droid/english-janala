
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


function synonym_display(id){
const new_arr=id.map(el=>` <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition">
    ${el}
  </span>`);
return (new_arr.join(" "));
}

const loadDetail=(id)=>{
const url=fetch(`https://openapi.programming-hero.com/api/word/${id}`);
url.then((response)=>response.json())
.then((load)=>display_wordDetail(load.data))
}



const display_wordDetail = (id) => {

  const detail_container = document.getElementById("my_modal_5");

  detail_container.innerHTML = `
  <div class="modal-box max-w-2xl">

    <!-- Word -->
    <h2 class="text-3xl font-bold">
      Eager (<span class="text-gray-700"><i class="fa-solid fa-microphone-lines text-black"></i>: ${id.pronunciation}</span>)
    </h2>

    <!-- Meaning -->
    <div class="mt-6">
      <h3 class="font-bold text-lg">${id.meaning}</h3>
    </div>

    <!-- Example -->
    <div class="mt-6">
      <h3 class="font-bold text-lg">Example</h3>
      <p class="text-gray-600 mt-1">
        ${id.sentence}
      </p>
    </div>

    <!-- Synonyms -->
    <div class="mt-6">
      <h3 class="font-bold text-lg">সমার্থক শব্দ গুলো</h3>

      <div class="flex gap-3 mt-3 flex-wrap">
        ${synonym_display(id.synonyms)}
      </div>
    </div>

    <!-- Bottom button -->
    <div class="modal-action mt-8 justify-start">
  <form method="dialog">
    <button class="btn bg-purple-600 text-white px-6">
      Complete Learning
    </button>
  </form>
</div>
  `;

  detail_container.showModal();
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
      spin(true);
const url=fetch(`https://openapi.programming-hero.com/api/level/${level}`)
url.then((response)=>response.json())
.then((load_words)=>load_card(load_words.data));


 }



//  load_card

const load_card=(lessons)=>{
    spin(false);
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
          <button onclick="loadDetail(${elements.id})" class="btn btn-circle btn-sm bg-indigo-100 border-none text-indigo-600 hover:bg-indigo-200">
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
   
});

spin(false);
    })


}
// spinner

function spin(status){
    const spinner=document.getElementById("spinner");
    const card_sec=document.getElementById("card_sec");
    if(status ===true){
spinner.classList.remove("hidden");
card_sec.classList.add("hidden");

    }
    else {
spinner.classList.add("hidden");
card_sec.classList.remove("hidden");

    }


}

