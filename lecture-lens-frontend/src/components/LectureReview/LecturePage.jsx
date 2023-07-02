import React from "react";
import "./LecturePage.css";
import { AiOutlineFileText, AiTwotoneEdit } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { ReviewItem } from "./ReviewItem";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);

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
  const class_name = query.get("name");
  const professor = query.get("professor_name");
  const year_term = query.get("year_term");
  const class_id = query.get("lecture_id");
  const class_url = query.get("url");

  const review_example = [
    {
      ID: 3,
      ReviewerID: 3,
      ReviewerName: "佐藤次郎",
      LectureID: 1,
      Review_Content: "これ以上ない講義でした",
      Review_Star: 1,
    },
    {
      ID: 3,
      ReviewerID: 3,
      ReviewerName: "佐藤次郎",
      LectureID: 1,
      Review_Content: "出席たいへん",
      Review_Star: 2,
    },
    {
      ID: 3,
      ReviewerID: 3,
      ReviewerName: "佐藤次郎",
      LectureID: 1,
      Review_Content: "さいこうではない",
      Review_Star: 2,
    },
    {
      ID: 3,
      ReviewerID: 3,
      ReviewerName: "佐藤次郎",
      LectureID: 1,
      Review_Content: "さいこ～",
      Review_Star: 2,
    },
    {
      ID: 1,
      ReviewerID: 1,
      ReviewerName: "山田太郎",
      LectureID: 1,
      Review_Content: "とても面白かったです",
      Review_Star: 3,
    },

    {
      ID: 2,
      ReviewerID: 2,
      ReviewerName: "田中花子",
      LectureID: 1,
      Review_Content: "とても面白かったです",
      Review_Star: 3,
    },

    {
      ID: 3,
      ReviewerID: 3,
      ReviewerName: "佐藤次郎",
      LectureID: 1,
      Review_Content: "とても面白かったです",
      Review_Star: 4,
    },
  ];

  function countStarRatings(reviews) {
    let counts = [0, 0, 0, 0];

    for (let i = 0; i < reviews.length; i++) {
      let review = reviews[i];

      if (review.Review_Star >= 1 && review.Review_Star <= 4) {
        counts[review.Review_Star - 1]++;
      }
    }

    return counts;
  }
  const data = {
    // x 軸のラベル
    labels: ["1", "2", "3", "4"],
    options: {
      scales: {
        yAxes: {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
      },
    },
    datasets: [
      {
        label: "Dataset",
        // データの値
        data: countStarRatings(review_example),
        // グラフの背景色
        backgroundColor: [
          "rgba(29, 61, 120, 0.7)",
          "rgba(84, 93,148, 0.7)",
          "rgba(146, 128, 179, 0.7)",
          "rgba(217, 170, 215, 0.7)",
        ],
        // グラフの枠線の色
        borderColor: [
          "rgba(29, 61, 120, 1)",
          "rgba(84, 93,148, 1)",
          "rgba(146, 128, 179, 1)",
          "rgba(217, 170, 215, 1)",
        ],
        // グラフの枠線の太さ
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div class="lecture-page">
        <div class="evalution">
          <div class="header-left">
            <img class="rank-image" src={image_url} />
            <div style={{ height: "95%", width: "95%", marginTop: "50px" }}>
              <Bar data={data} />
            </div>
          </div>

          <div class="header-right">
            <div class="header-right-block1">
              <h1>{class_name}</h1>
              <div class="review-button">
                <span title="レビューを書く">
                  <AiTwotoneEdit class="lecture-icon" />
                </span>
              </div>
            </div>

            <div class="header-right-block2">
              <p class="class_credit">{year_term}</p>
              <p class="teacher_name">担当教員：{professor}</p>
              <div class="syllabus-button">
                <a href={class_url} title="シラバス">
                  <AiOutlineFileText class="lecture-icon" />
                </a>
              </div>
            </div>

            <div class="header-right-block3">
              <img class="graph-image" src={image_url} />

              <div class="block3-right">
                <p class="attendance">出席{is_attendance}</p>
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="comment">
          <p class="comment-title">みんなのコメント</p>
          <div class="comment-block">
            <ReviewItem
              ReviewerName={"田中１号"}
              Review_Content={"課題が少なくてよかった"}
              Review_Star={"3"}
            />
          </div>
          <div class="comment-block">
            <ReviewItem
              ReviewerName={"ミノムシ"}
              Review_Content={"楽単。おすすめです。"}
              Review_Star={"4"}
            />
          </div>
          <div class="bottom-review-button">
            <p>
              <AiTwotoneEdit />
              　レビューを書く
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
