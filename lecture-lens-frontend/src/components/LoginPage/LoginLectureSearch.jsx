import { React, useState, useRef } from "react";
import "../SyllabusSearch/SyllabusSearch.css";
import Syllabus from "../../data/syllabus_map.json";
import { GlassCard } from "../GlassCard";
import { MdOutlineLogout } from "react-icons/md";

export const LoginLectureSearch = () => {
  const [searchText, setSearchText] = useState("");
  const textRef = useRef(null);
  // チェックボックス
  const initialVal = {
    common: false,
    sis: false,
    em: false,
    emgbc: false,
    eng: false,
    sci: false,
    shse: false,
    cnas: false,
    minor: false,
    cons: false,
    1: false,
    2: false,
    3: false,
    4: false,
    first: false,
    second: false,
  };
  const [val, setVal] = useState(initialVal);

  // JSONデータ
  const data = Syllabus;
  // 検索ボタン
  const onClickSearch = () => {
    setSearchText(textRef.current.value);
  };

  const onClickReset = () => {
    setSearchText("");
  };

  const handleChange = (e) => {
    const newVal = Object.assign({}, val, {
      [e.target.value]: !val[e.target.value],
    });
    setVal(newVal);
  };

  return (
    <>
      <div className="page">
        <div className="header">
          <h1 class="header-title">Lecture Lens</h1>
          <a href="/Auth">
            <MdOutlineLogout className="icon" />
          </a>
        </div>
        <div className="search-form">
          <div className="check-box-1">
            <label>
              <input
                type="checkbox"
                value="common"
                onChange={handleChange}
                checked={val["common"]}
              />
              全学共通科目
            </label>
            <label>
              <input
                type="checkbox"
                value="sis"
                onChange={handleChange}
                checked={val["sis"]}
              />
              社会情報科学部
            </label>
            <label>
              <input
                type="checkbox"
                value="em"
                onChange={handleChange}
                checked={val["em"]}
              />
              国際商経学部
            </label>
            <label>
              <input
                type="checkbox"
                value="emgbc"
                onChange={handleChange}
                checked={val["emgbc"]}
              />
              国際商経GCB
            </label>
            <label>
              <input
                type="checkbox"
                value="eng"
                onChange={handleChange}
                checked={val["eng"]}
              />
              工学部
            </label>
            <label>
              <input
                type="checkbox"
                value="sci"
                onChange={handleChange}
                checked={val["sci"]}
              />
              理学部
            </label>
            <label>
              <input
                type="checkbox"
                value="shse"
                onChange={handleChange}
                checked={val["shse"]}
              />
              環境人間学部
            </label>
            <label>
              <input
                type="checkbox"
                value="cnas"
                onChange={handleChange}
                checked={val["cnas"]}
              />
              看護学部
            </label>
            <label>
              <input
                type="checkbox"
                value="minor"
                onChange={handleChange}
                checked={val["minor"]}
              />
              副専攻
            </label>
            <label>
              <input
                type="checkbox"
                value="cons"
                onChange={handleChange}
                checked={val["cons"]}
              />
              集中講義
            </label>
          </div>
          <div className="year">
            <label>
              <input
                type="checkbox"
                value="1"
                onChange={handleChange}
                checked={val["1"]}
              />
              1年次
            </label>
            <label>
              <input
                type="checkbox"
                value="2"
                onChange={handleChange}
                checked={val["2"]}
              />
              2年次
            </label>
            <label>
              <input
                type="checkbox"
                value="3"
                onChange={handleChange}
                checked={val["3"]}
              />
              3年次
            </label>
            <label>
              <input
                type="checkbox"
                value="4"
                onChange={handleChange}
                checked={val["4"]}
              />
              4年次
            </label>
          </div>
          <div className="term">
            <label>
              <input
                type="checkbox"
                value="first"
                onChange={handleChange}
                checked={val["first"]}
              />
              前期
            </label>
            <label>
              <input
                type="checkbox"
                value="second"
                onChange={handleChange}
                checked={val["second"]}
              />
              後期
            </label>
          </div>
          <div className="input-area">
            <input
              ref={textRef}
              placeholder=" 科目名を部分一致検索"
              className="text-input"
            />
            <button className="input-button" onClick={onClickSearch}>
              検索
            </button>
            <button className="reset-button" onClick={onClickReset}>
              リセット
            </button>
          </div>
        </div>

        <div class="search-result-card">
          {Object.keys(data).map((key) => (
            <GlassCard
              key={key}
              details={data[key]}
              filterClass={val}
              searchText={searchText}
            />
          ))}
        </div>
      </div>
    </>
  );
};
