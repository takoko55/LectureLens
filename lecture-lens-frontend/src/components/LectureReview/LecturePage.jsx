import React from 'react';
import './LecturePage.css';
import { AiOutlineFileText, AiTwotoneEdit } from "react-icons/ai";
import {useLocation} from "react-router-dom";
import { ReviewItem } from "./ReviewItem";
//import Syllabus_dict from "../data/syllabus.json";

export const LecturePage = () => {
  const image_url = "/images/S_touka.png";
  //const class_name = "データ分析演習"; //8文字かあ
  //const teacher_name = "松本真一";
  //const class_code = "B3A01";
  //const class_credit = "2";
  //const class_semester = "前期";
  //const class_time = "火曜日3限";
  const is_attendance = "あり";
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const class_name = query.get('name')
  const professor = query.get('professor_name')
  const year_term = query.get('year_term')
  const class_id = query.get('lecture_id')
  const class_url = query.get('url')

  const review_example = [
    {ID: 1,
    ReviewerID: 1,
    ReviewerName: "山田太郎",
    LectureID: 1,
    Review_Content: "とても面白かったです",
    Review_Star: 5},

    {ID: 2,
    ReviewerID: 2,
    ReviewerName: "田中花子",
    LectureID: 1,
    Review_Content: "とても面白かったです",
    Review_Star: 5},
    
    {ID: 3,
    ReviewerID: 3,
    ReviewerName: "佐藤次郎",
    LectureID: 1,
    Review_Content: "とても面白かったです",
    Review_Star: 5},
  ]

  return (
    <>
    <div class="lecture-page"> 
      <div class = "evalution">
        <div class="header-left">
          <img class="rank-image" src={image_url} />
          <img class="total-image" src={image_url} />
        </div>

        <div class="header-right">
          <div class = "header-right-block1">
          <h1>{class_name}</h1>
            <div class="review-button">
              <span title="レビューを書く"><AiTwotoneEdit class="lecture-icon"/></span>

            </div>
          </div>

          <div class = "header-right-block2">
            <p class="class_credit">{year_term}</p>
            <p class="teacher_name">担当教員：{professor}</p>
            <div class="syllabus-button">
              
              <a href={class_url} title="シラバス"><AiOutlineFileText class="lecture-icon"/></a>
            </div>
          </div>

          <div class = "header-right-block3">
            <img class="graph-image" src={image_url} />  
            
            <div class="block3-right">
              <p class = "attendance">出席{is_attendance}</p>
              <div class = "circle"></div>
            </div>

          </div>

        </div>

      </div>

      <div class="comment">
        <h2>みんなのコメント</h2>
        <div class="comment-block">
          <ReviewItem ReviewerName={"田中"} Review_Content={"激おもろ"} Review_Star={"5"}/>
        </div>
        <div class="bottom-review-button">
          <p><AiTwotoneEdit />　レビューを書く</p>
        </div>
      </div>
    </div>
    </>
    );
};
