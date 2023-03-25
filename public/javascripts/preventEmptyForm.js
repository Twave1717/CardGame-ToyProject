document.addEventListener('submit', checkOnclick);

function checkOnclick(event){
    const form = document.querySelector("form");
    if(form.writer.value === "" || form.content.value === "" ){
        event.preventDefault();
        alert("필수 입력란이 비었습니다. 확인해주세요.");
    }
}