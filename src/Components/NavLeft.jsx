import React, { useEffect, useState } from 'react';


function handlerEnter(e) {
    e.target.classList.add('visible');
}

function handlerLeave(e) {
    e.target.classList.remove('visible');
}

function handlerClick() {
    document.querySelector('.left_nav').classList.remove('visible');
}

function NavLeftTable({ hashtag }) {
    function handlerMulEnter(e) {
        const target1 = e.target.parentNode;
        const target2 = document.querySelector('.left_modal_wrap');

        target1.classList.add('visible');
        target2.classList.add('visible');
        document.querySelector('.left_modal_wrap .username').innerHTML = hashtag.username;
        document.querySelector('.left_modal_wrap .score').innerHTML = hashtag.score;
        document.querySelector('.left_modal_wrap .follower_cnt').innerHTML = hashtag.follower_cnt;
        document.querySelector('.left_modal_wrap .follow_cnt').innerHTML = hashtag.follow_cnt;
        document.querySelector('.left_modal_wrap .post_cnt').innerHTML = hashtag.post_cnt;
        document.querySelector('.left_modal_wrap .average_like_cnt').innerHTML = hashtag.average_like_cnt;

    }

    function handlerMulLeave(e) {
        const target1 = e.target.parentNode;
        const target2 = document.querySelector('.left_modal_wrap');

        target1.classList.remove('visible');
        target2.classList.remove('visible');
    }
    return (
        <tr
            onMouseEnter={handlerMulEnter}
            onMouseLeave={handlerMulLeave}
        >
            <td>{hashtag.username}</td>
            <td>{hashtag.score}</td>
        </tr>
    );
}
// nav_left
function NavLeft({ hashtaginfo }) {
    const defaultData = {
        day: 7,
        datas: []
    }
    const [userinfos, setUserinfos] = useState(defaultData);

    useEffect(() => {
        loadUserInfos();
    }, []);
    function loadUserInfos() {
        const btn = document.querySelector('.left_nav .sub_nav .active');
        const day = btn.getAttribute('id');
        const query = `top_id_${day}`
        const datas = hashtaginfo[query];
        setUserinfos({
            day,
            datas
        });
    }

    function handlerClickDay(e) {
        const btns = document.querySelectorAll('.left_nav .sub_nav button');

        btns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        const day = e.target.getAttribute('id');

        loadUserInfos();
    }
    return (
        <div className="nav_wrap left">
            <div className="nav_header">
                <div className="nav_title">
                    활동 순위
                        </div>
                <div className="close">
                    <button
                        onClick={handlerClick}
                        onMouseEnter={handlerEnter}
                        onMouseLeave={handlerLeave}
                        className="btn">접기</button>
                </div>
            </div>
            <div className="sub_nav flex">
                <ul>
                    <li>
                        <button id="7" onClick={handlerClickDay} onMouseEnter={handlerEnter} onMouseLeave={handlerLeave} className="btn active">7일</button>
                    </li>
                    <li>
                        <button id="30" onClick={handlerClickDay} onMouseEnter={handlerEnter} onMouseLeave={handlerLeave} className="btn">30일</button>
                    </li>
                    <li>
                        <button id="90" onClick={handlerClickDay} onMouseEnter={handlerEnter} onMouseLeave={handlerLeave} className="btn">90일</button>
                    </li>
                    <li>
                        <button id="180" onClick={handlerClickDay} onMouseEnter={handlerEnter} onMouseLeave={handlerLeave} className="btn">180일</button>
                    </li>
                </ul>
            </div>
            <div className="nav_section">
                <table>
                    <thead>
                        <tr>
                            <th>사용자 이름</th>
                            <th>점 수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userinfos.datas.map((data, index) => <NavLeftTable key={index} hashtag={data} />)}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default NavLeft;