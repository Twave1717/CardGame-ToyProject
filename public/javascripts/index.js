function showDetails(idx){
    let bodywrap = document.querySelector('.body-wrap');
    bodywrap.style.display = 'none';
    let detail = document.querySelector(`.article-wrap-${idx}`);
    detail.style.display = 'block';
}