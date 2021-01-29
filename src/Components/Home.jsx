import React, { useEffect, useState } from "react";
import hashtagTrend from '../json/hashtag_trend.json';
import { Link, Route } from 'react-router-dom';

// mouse enter / leave
// callback 응 사용하여 중복되는 함수 간편화
function togleAnimated(target, callback) {
    callback(target);
}
function handlerEnter(e) {
    let target = e.target;
    if (e.target.tagName === "TD")
        target = e.target.parentNode;
    togleAnimated(target, (target) => {
        target.classList.add('visible');
    })
}
function handlerLeave(e) {
    let target = e.target;
    if (e.target.tagName === "TD")
        target = e.target.parentNode;
    togleAnimated(target, (target) => {
        target.classList.remove('visible');
    });
}

function handlerPost(e) {
    const id = e.target.parentNode.getAttribute('id');
    document.location.href = `/hashtag/${id}`;
}

function Hashtagtbody({ hashtag, postData }) {
    return (
        <tr id={hashtag} className="hashtag"
            onClick={handlerPost}
            onMouseEnter={handlerEnter}
            onMouseLeave={handlerLeave} >
            <td className="hashtag_name">{hashtag}</td>
            <td className="hashtag_info">{postData}</td>
        </tr>
    );
}

function RealTimeFooter({ recents }) {
    console.log(recents);
    let count = 0;
    let maxCount = recents.length;

    setInterval(() => {
        if (count === maxCount - 1) {
            count = 0;
        } else {
            ++count;
        }
        const query = ` <div class = "animated_footer">
                            <div class = "footer_header">
                                <span class = "title">${recents[count].hashtag}</span>
                                <span> (${recents[count].add_date})</span>
                            </div>
                            <div class = "footer_section">
                                <span>분석 시작 시간 : </span>
                                <span>${recents[count].check_start_time}</span>
                            </div>
                            <div class = "footer_section">
                                <span>포스트 수 : </span>
                                <span>${recents[count].post_cnt}</span>
                            </div>
                        </div>`;
        document.querySelector('.footer_wrap').innerHTML = query;
    }, 3000);
    return (

        <div className="footer_wrap">
        </div>
    );
}
function Home() {
    const [hashtags, setHashtags] = useState({
        way: 'gap',
        day: 1,
        datas: [],
        recents: []
    });

    useEffect(() => {
        loadHashtag();
    }, []);

    // hashtag_trend.json 파일에서 데이터를 불러와 저장한다.
    function loadHashtag() {
        // ul.ways 와 ul.days 쪽에서 active 된 버튼들의 data 값들을 가져온다.
        // 그 값에 맞는 데이터를 setHashtags 로 저장
        const active_ways = document.querySelector('.ways li .active');
        const active_days = document.querySelector('.days li .active');

        const way = active_ways.getAttribute('data-way');
        const day = active_days.getAttribute('data-day');

        const jsonQuery = `day${day}_${way}`;
        setHashtags({
            way,
            day,
            datas: hashtagTrend[jsonQuery],
            recents: hashtagTrend['recent_list']
        });
    }
    //  ways 와 days 버튼 클릭시 이벤트 생성 
    function handlerClickEvent(e) {
        //  ul의 어떤 클래스에서 호출했는지 찾은 후 클릭한 버튼만 active 클래스 삽입 
        //  그 후 loadHashtag() 함수 호출
        const ul_className = e.target.parentNode.parentNode.className;

        const btns = document.querySelectorAll(`.${ul_className} li button`);
        const targetBtn = e.target;

        btns.forEach(btn => btn.classList.remove('active'));
        targetBtn.classList.add('active');

        loadHashtag();
    }
    return (
        <div>

            <div className="contents_wrap">
                <div className="btnbox flex">
                    <ul className="ways">
                        <li>
                            <button onClick={handlerClickEvent}
                                onMouseEnter={handlerEnter}
                                onMouseLeave={handlerLeave}
                                className="btn active" data-way="gap">GAP</button>
                        </li>
                        <li>
                            <button onClick={handlerClickEvent}
                                onMouseEnter={handlerEnter}
                                onMouseLeave={handlerLeave}
                                className="btn" data-way="rate">RATE</button>
                        </li>
                    </ul>
                </div>
                <div className="contents">
                    <table className="hashtags">
                        <thead>
                            <tr>
                                <th className="hashtag_name">
                                    hashtag name
                    </th>
                                <th className="hashtag_info">
                                    {`Post ${hashtags.way}`}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                hashtags.datas.map((data, index) =>
                                    <Hashtagtbody
                                        key={index}
                                        hashtag={data.hashtag}
                                        postData={data[`post_${hashtags.way}`]}
                                    />)
                            }
                        </tbody>
                    </table>
                </div>
                <div className="btnbox flex">
                    <ul className="days">
                        <li>
                            <button onClick={handlerClickEvent}
                                onMouseEnter={handlerEnter}
                                onMouseLeave={handlerLeave}
                                className="btn active" data-day="1">1일</button>
                        </li>
                        <li>
                            <button onClick={handlerClickEvent}
                                onMouseEnter={handlerEnter}
                                onMouseLeave={handlerLeave}
                                className="btn" data-day="7">7일</button>
                        </li>
                        <li>
                            <button onClick={handlerClickEvent}
                                onMouseEnter={handlerEnter}
                                onMouseLeave={handlerLeave}
                                className="btn" data-day="30">30일</button>
                        </li>
                        <li>
                            <button onClick={handlerClickEvent}
                                onMouseEnter={handlerEnter}
                                onMouseLeave={handlerLeave}
                                className="btn" data-day="60">60일</button>
                        </li>
                    </ul>
                </div>
            </div>
            <footer>
                {hashtags.recents.length !== 0 &&
                    <RealTimeFooter recents={hashtags.recents} />
                }
            </footer>
        </div>
    );
}

export default Home;