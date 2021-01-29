import React, { useEffect, useState } from 'react';
function handlerEnter(e) {
    e.target.classList.add('visible');
}

function handlerLeave(e) {
    e.target.classList.remove('visible');
}
function handlerClick() {
    document.querySelector('.right_nav').classList.remove('visible');
}
function NavRightTopTable({ data }) {
    return (
        <tr>
            <td>{data.hashtag}</td>
            <td>{data.post_cnt}</td>
        </tr>
    );
}

function NavRightLogTable({ data }) {
    return (
        <tr>
            <td>{data.check_date}</td>
            <td>{data.post_cnt}</td>
        </tr>
    );
}
function NavRight({ logs, topRelation, topAutocomplete }) {
    const [useinfo, setUseinfo] = useState({ info: 'log', datas: logs });
    function handlerClickBtn(e) {
        const id = e.target.getAttribute('id');
        const btns = document.querySelectorAll('.right_nav .sub_nav button');
        console.log(btns);
        btns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        let thead_1 = "해쉬 태그";
        if (id === 'log') {
            thead_1 = "날짜";
        }
        document.querySelector('.nav_section .thead_1').innerHTML = thead_1;
        loadingUserinfo();
    }

    useEffect(() => {
        loadingUserinfo();
    }, []);

    function loadingUserinfo() {
        const id = document.querySelector('.right_nav .sub_nav .active').getAttribute('id');
        let info = id;
        let datas = [];
        if (info === 'log') datas = logs;
        else if (info === 'top_rel') datas = topRelation;
        else datas = topAutocomplete;

        setUseinfo({
            info,
            datas
        });
    }

    return (
        <div className="nav_wrap right">
            <div className="nav_header">
                <div className="nav_title">
                    로그 기록
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
                        <button id="log" onClick={handlerClickBtn} onMouseEnter={handlerEnter} onMouseLeave={handlerLeave} className="btn active">로그</button>
                    </li>
                    <li>
                        <button id="top_rel" onClick={handlerClickBtn} onMouseEnter={handlerEnter} onMouseLeave={handlerLeave} className="btn">관련 태그</button>
                    </li>
                    <li>
                        <button id="top_auto" onClick={handlerClickBtn} onMouseEnter={handlerEnter} onMouseLeave={handlerLeave} className="btn">포함 태그</button>
                    </li>
                </ul>
            </div>
            <div className="nav_section">
                <table>
                    <thead>
                        <tr>
                            <th className="thead_1">날 짜</th>
                            <th className="thead_2">포스팅</th>
                        </tr>
                    </thead>
                    <tbody>
                        {useinfo.info === "log" &&
                            useinfo.datas.map((data, index) =>
                                <NavRightLogTable key={index} data={data} />
                            )}
                        {useinfo.info !== "log" &&
                            useinfo.datas.map((data, index) =>
                                <NavRightTopTable key={index} data={data} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default NavRight;