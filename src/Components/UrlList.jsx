import React from "react";



function handlerEnter(e) {
    e.target.classList.add('visible');
}

function handlerLeave(e) {
    e.target.classList.remove('visible');
}



// url list 그려주는 함수
function UrlList({ data }) {
    function handlerClick() {
        const modal = document.querySelector('.modal_wrap');
        modal.classList.add('visible');
        document.querySelector('.url').innerHTML = data.url;
        document.querySelector('.like_cnt').innerHTML = data.like_cnt;
        document.querySelector('.comment_cnt').innerHTML = data.comment_cnt;
        document.querySelector('.mov_cnt').innerHTML = data.mov_cnt;
        document.querySelector('.pic_cnt').innerHTML = data.pic_cnt;
        document.querySelector('.post_time').innerHTML = data.post_time;

        setTimeout(() => {
            modal.classList.remove('visible');
        }, 2000);
    }

    return (
        <li
            onMouseEnter={handlerEnter}
            onMouseLeave={handlerLeave}
            onClick={handlerClick}>
            {data.url}
        </li>);
}


export default UrlList;