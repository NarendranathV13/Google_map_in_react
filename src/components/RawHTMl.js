import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HtmlContent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('https://6528e915931d71583df2912d.mockapi.io/HTML')
      .then(response => {
        setData(response.data);   
      })
      .catch(error => {
        console.log(error)
      });
  }, []);


  return (
    <div>
      {data&&data.map(item => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      ))}
    </div>
  );
};

export default HtmlContent;
