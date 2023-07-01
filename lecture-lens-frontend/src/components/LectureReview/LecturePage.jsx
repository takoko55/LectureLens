import React from 'react';
import './LecturePage.css';
import { AiOutlineFileText, AiTwotoneEdit } from "react-icons/ai";
//import Syllabus_dict from "../data/syllabus.json";

export const LecturePage = () => {
  const image_url = "/images/A.png";
  const class_name = "データ分析演習"; //8文字かあ
  const teacher_name = "松本真一";
  const class_code = "B3A01";
  const class_credit = "2";
  const class_semester = "前期";
  const class_time = "火曜日3限";
  const is_attendance = "あり";

  return (
    <> 
      <div class = "evalution">
        <div class="header-left">
          <img class="rank_image" src={image_url} />
          <img class="total_image" src={image_url} />
        </div>

        <div class="header-right">
          <div class = "header-right-block1">
          <h1>{class_name}</h1>
            <div class="review-button">
              <AiTwotoneEdit />
              <span>レビューを書く</span>
            </div>
          </div>

          <div class = "header-right-block2">
            <p class="class_credit">{class_credit}年次{class_semester}</p>
            <p class="teacher_name">担当教員：{teacher_name}</p>
            <div class="syllabus-button">
              <AiOutlineFileText />
              <span>シラバス</span>
            </div>
          </div>

          <div class = "header-right-block3">
            <img class="graph_image" src={image_url} />  
            
            <div class="block3-right">
              <p class = "attendance">出席{is_attendance}</p>
              <div class = "circle"></div>
            </div>

          </div>

        </div>

      </div>

      <div class="comment">

      </div>
    </>
    );
};
