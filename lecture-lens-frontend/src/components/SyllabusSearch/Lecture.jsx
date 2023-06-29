import React from 'react';

export const Lecture = (props) => {
  const { details } = props;
  const { filterClass } = props;
  const { searchText } = props;
  // レンダリングするかどうか
  const flag_array = Object.keys(filterClass).filter((output, index) => {
    return filterClass[output] && details.class.includes(output)
  });
  const count_array = Object.values(filterClass).filter((output, index) => {
    return output === true
  });
  const searchFlag = details.name.includes(searchText);

  return (
    <>
      { searchFlag && count_array.length === flag_array.length && <tr><td>{details.name} <a className={details.class} href={details.url} target="_blank" rel='noreferrer'><i className="far fa-file-alt icon"></i></a></td><td>{details.year_term}</td><td>{details.professor_name}</td><td>{details.key}</td></tr>}
    </>
  );
};
