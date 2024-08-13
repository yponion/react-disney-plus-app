import axios from "../api/axios";
import React, { useCallback, useEffect, useState, useRef } from "react";
import "./Row.css";
import MovieModal from "./MovieModal";

const Row = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelection] = useState({});

  // 컴포넌트가 다시 렌더링 될 때 함수가 다시 생성되니까 그걸 없애주기 위해 useCallback 사용
  // 새로 생성하는 조건은 fetchUrl이 바뀔 때
  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    setMovies(response.data.results);
  }, [fetchUrl]);

  // fetchMoviewData가 바뀔 때 다시 호출
  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelection(movie);
  };

  /* 강의에선 setModalOpen을 MovieModal에 넘겨줘서 상태를 변경 시켰는데,
  React의 상태 업데이트 규칙을 위반하는 것이라는 경고가 떠서
  handleModalClose를 만들어서 props로 넘겨 Row에서 처리하게 함. */
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() =>
              (document.getElementById(id).scrollLeft -= window.innerWidth - 80)
            }
          >
            {"<"}
          </span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org//t/p/original/${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() =>
              (document.getElementById(id).scrollLeft += window.innerWidth - 80)
            }
          >
            {">"}
          </span>
        </div>
      </div>
      {modalOpen && (
        <MovieModal {...movieSelected} handleModalClose={handleModalClose} />
      )}
    </div>
  );
};

export default Row;
