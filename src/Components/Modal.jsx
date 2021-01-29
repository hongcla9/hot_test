import React from 'react';

function Modal() {
    return (
        <table className="modal_table">
            <thead>
                <tr>
                    <th colSpan="2">상세 정보</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>게시물 주소</td>
                    <td className="url"></td>
                </tr>
                <tr>
                    <td>좋아요 수</td>
                    <td className="like_cnt"></td>
                </tr>
                <tr>
                    <td>댓글 수</td>
                    <td className="comment_cnt"></td>
                </tr>
                <tr>
                    <td>영상 수</td>
                    <td className="mov_cnt"></td>
                </tr>
                <tr>
                    <td>사진 수</td>
                    <td className="pic_cnt"></td>
                </tr>
                <tr>
                    <td>포스팅 시간</td>
                    <td className="post_time"></td>
                </tr>
            </tbody>
        </table>
    );
}

export default Modal;