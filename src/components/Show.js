import React from "react";

const Show = (props) => {

  const { results, info } = props;

  return (
    <div className="show">
      <div className="show__info">
        {info ? `Total results: ${info.totalResults}` : ""}
      </div>
      {results.length > 0
        ? results.map((result, id) => (
            <div className="show__details" key={id}>
              {result.pagemap ? result.pagemap.cse_image ? (
                <div className="show__image">
                  <img src={result.pagemap.cse_image[0].src} alt="Image" />
                </div>
              ) : "" : ""}
              <div className="show__link">
                <a href={result.displayLink} target="_blank" rel="noopener noreferrer">{result.displayLink}</a>
              </div>
              <div className="show__title">
                <a href={result.link} target="_blank" rel="noopener noreferrer">{result.title}</a>
              </div>
              <div className="show__description">
                <p>{result.snippet}</p>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default Show;
