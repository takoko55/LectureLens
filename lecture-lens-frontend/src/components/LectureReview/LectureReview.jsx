import React from 'react';
import Syllabus_dict from "../../data/syllabus.json";
export const SyllabusPage = () => {
  console.log(Syllabus_dict[0]);
  return (
    <>
      <p>講義レビューのページだよ</p>
    </>
  );
};
