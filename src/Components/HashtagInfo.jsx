import React, { useEffect, useState, useLayoutEffect } from "react";
import '../hashtaginfo.css';
import '../nav.css';

import UrlList from './UrlList';
import Modal from './Modal';
import NavLeft from './NavLeft';
import NavRight from './NavRight';

function handlerEnter(e) {
    e.target.classList.add('visible');
}

function handlerLeave(e) {
    e.target.classList.remove('visible');
}

function handlerClick(e) {
    const classNames = e.target.className.split(' ');
    let visibleTarget;
    if (classNames[1] === "nav_left") {
        visibleTarget = document.querySelector('.left_nav');
    } else if (classNames[1] === "nav_right") {
        visibleTarget = document.querySelector('.right_nav');
    }

    visibleTarget.classList.add('visible');
}


function Hashtaginfoview({ hashtaginfo }) {
    return (
        <div>
            <button
                onClick={handlerClick}
                onMouseEnter={handlerEnter}
                onMouseLeave={handlerLeave}
                className="btn nav_left">활동 순위</button>
            <button
                onClick={handlerClick}
                onMouseEnter={handlerEnter}
                onMouseLeave={handlerLeave}
                className="btn nav_right">더 보기</button>
            <div className="modal_wrap flex">
                <div className="mask"></div>
                <div className="modal">
                    <Modal />
                </div>
            </div>
            <nav className="left_nav">
                {hashtaginfo.top_id_7.length > 0 &&
                    <NavLeft hashtaginfo={hashtaginfo} />
                }
            </nav>
            <div className="left_modal_wrap">
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">상세 정보</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>사용자 이름</td>
                            <td className="username"></td>
                        </tr>
                        <tr>
                            <td>점 수</td>
                            <td className="score"></td>
                        </tr>
                        <tr>
                            <td>팔로워 수</td>
                            <td className="follower_cnt"></td>
                        </tr>
                        <tr>
                            <td>팔로우 수</td>
                            <td className="follow_cnt"></td>
                        </tr>
                        <tr>
                            <td>포스팅 수</td>
                            <td className="post_cnt"></td>
                        </tr>
                        <tr>
                            <td>평균 좋아요 수</td>
                            <td className="average_like_cnt"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <nav className="right_nav">
                {hashtaginfo.post_log.length > 0 &&
                    <NavRight logs={hashtaginfo.post_log} topRelation={hashtaginfo.top_relation} topAutocomplete={hashtaginfo.top_autocomplete} />
                }
            </nav>
            <div className="contents">
                <div className="contents_header">
                    <div className="contents_title">
                        #{hashtaginfo.info.hashtag} ({hashtaginfo.info.post_cnt})
                    </div>
                </div>
                <div className="contents_section">
                    <div className="lately_papular">
                        <div className="contents_title">
                            최근 인기 게시물
                        </div>
                        <div className="url_list">
                            <ul>
                                {hashtaginfo.lately_popular.map((data, index) =>
                                    <UrlList key={index} data={data} />
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="top_remain">
                        <div className="contents_title">
                            가장 오래동안 인기받은 게시물
                        </div>
                        <div className="url_list">
                            <ul>
                                {hashtaginfo.top_remain.map((data, index) =>
                                    <UrlList key={index} data={data} />
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="top_like">
                        <div className="contents_title">
                            가장 좋아요가 많은 게시물
                        </div>
                        <div className="url_list">
                            <ul>
                                {hashtaginfo.top_like.map((data, index) =>
                                    <UrlList key={index} data={data} />
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="top_comment">
                        <div className="contents_title">
                            가장 댓글 많은 게시물
                        </div>
                        <div className="url_list">
                            <ul>
                                {hashtaginfo.top_comment.map((data, index) =>
                                    <UrlList key={index} data={data} />
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Notfoundview() {
    return (
        <div>
            Sorry, not found!
        </div>
    );
}

function HashtagInfo({ match }) {
    const defaultData = {
        info: {},
        top_relation: [],
        top_autocomplate: [],
        lately_popular: [],
        top_remain: [],
        top_like: [],
        top_comment: [],
        top_id_7: [],
        top_id_30: [],
        top_id_90: [],
        top_id_180: [],
        post_log: []
    }
    const [hashtaginfo, setHashtags] = useState(defaultData);

    useEffect(async () => {
        const jsonFile = await loadHashtagInfo();
        setHashtags(jsonFile);
    }, []);

    async function loadHashtagInfo() {
        const jsonFile = await require(`../json/hashtag_info/${match.params.id}.json`);
        return jsonFile;
    }
    return (
        <div className="contents">
            {hashtaginfo !== undefined ?
                <Hashtaginfoview
                    hashtaginfo={hashtaginfo}
                /> :
                <Notfoundview />
            }

        </div>
    );

}

export default HashtagInfo;
